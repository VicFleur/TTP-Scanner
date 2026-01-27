<template>
<div v-if="dataAppuntamento">

    <NModal v-model:show="showModal" preset="card" :mask-closable="false" @close="closeModal">
        <template #header>
            <div>Codice valido</div>
        </template>
        <div class="modalContent">
            <div class="paragraph">
                <p>{{ scanResult?.owner_first_name }} {{ scanResult?.owner_last_name }}<br>Prenotazione per {{ scanResult?.posti_count }} posti</p>
            </div>
            <div class="buttons">
                <NButton type="primary" size="large" round :loading="validatingSingle" @click="validateSingle">Valida biglietto</NButton>
                <NButton secondary size="large" round :loading="validatingAll" @click="validateAll">Valida tutti i biglietti</NButton>
            </div>
        </div>
    </NModal>
    <NModal v-model:show="showErrorModal" preset="card" :mask-closable="false" @close="closeModal">
        <template #header>
            <div>{{ errorTitle }}</div>
        </template>
        <div class="modalContent">
            <div class="paragraph">
                <p>{{ errorMessage }}</p>
            </div>
            <div class="buttons">
                <NButton secondary size="large" round @click="closeModal">Chiudi</NButton>
            </div>
        </div>
    </NModal>

    <main>
        <div class="cont">
            <div class="breadcrumb">
                <OggettoBreadcrumbText :routes="breadcrumbItems" />
            </div>
            <!-- <div class="title3b">{{ dataAppuntamento.appuntamento?.nome }}</div>
                <div class="title3light">{{ formatoDataOraLungo(new Date(dataAppuntamento.data)) }}</div> -->

            <div class="counter">
                <div class="title1blight"><strong>{{ postiValidati }}</strong> di {{ totalePosti }}</div>
            </div>
            <div class="scannerCont">
                <NSpin :show="searching">
                    <ClientOnly>
                        <Scanner :qrbox="{ width: 300, height: 100 }" @detect="handleDetect" ref="scannerRef" />
                    </ClientOnly>
                </NSpin>
            </div>
        </div>
    </main>
</div>
</template>

<script lang="ts" setup>
import { NModal, NButton, NSpin } from 'naive-ui';

interface ScanResult {
    valid: boolean
    message: string
    posto_id?: string
    prenotazione_id?: string
    posti_count?: number
    owner_first_name?: string
    owner_last_name?: string
    data_appuntamento?: string
    nome_appuntamento?: string
    date_scanned?: string
}

definePageMeta({
    middleware: ['private-area']
})

const { $directus } = useNuxtApp();
const { getItemById } = useDirectusItems();
const { formatoDataOraLungo } = useOrari();
const directus = useDirectus()
const route = useRoute();

const showModal = ref(false);
const showErrorModal = ref(false);
const scannerRef = ref<any>(null);
const searching = ref(false);
const validatingSingle = ref(false);
const validatingAll = ref(false);

const scanResult = ref<ScanResult | null>(null);
const errorTitle = ref('Errore');
const errorMessage = ref('');

const posti = ref<PrenotazioniAppuntamentiPosti[]>([]);

const { data: dataAppuntamento } = useAsyncData<DateAppuntamento>(`dateAppuntamenti-${route.params.id}`, () => getItemById({
    collection: 'date_appuntamenti',
    id: route.params.id as string,
    params: {
        fields: [
            'id',
            'appuntamento.nome',
            'data',

            'prenotazioni_appuntamenti.prenotazioni_appuntamenti_posti.status',
            'prenotazioni_appuntamenti.prenotazioni_appuntamenti_posti.annullato',
        ],
        deep: {
            prenotazioni_appuntamenti: {
                limit: -1,
                prenotazioni_appuntamenti_posti: {
                    limit: -1
                }
            }
        }
    }
}));

const breadcrumbItems = computed(() => {
    return [{
        label: dataAppuntamento.value?.appuntamento?.nome ?? 'Appuntamento senza nome',
    }]
})
const totalePosti = computed(() => {
    const listaPosti = dataAppuntamento.value?.prenotazioni_appuntamenti?.map((prenotazione) => prenotazione.prenotazioni_appuntamenti_posti).flat()
    return listaPosti?.filter((posto) => posto.status !== 'revoked' && !posto.annullato).length ?? 0;
})
const postiValidati = computed(() => {
    return posti.value.filter((posto) => posto.status === 'scanned' && !posto.annullato).length;
})

const handleDetect = async (decodedText: string, decodedResult: any) => {
    scannerRef.value.pauseScanner();
    searching.value = true;

    try {
        const response = await directus<ScanResult>('/appuntamenti/scan', {
            method: 'POST',
            body: { code: decodedText, data_appuntamento: route.params.id as string }
        });

        searching.value = false;

        if (response.valid) {
            scanResult.value = response;
            showModal.value = true;
        } else {
            errorTitle.value = 'Codice non valido';
            if (response.date_scanned) {
                const localDate = new Date(response.date_scanned).toLocaleString('it-IT', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                errorMessage.value = `Biglietto già utilizzato in data ${localDate}`;
            } else {
                errorMessage.value = response.message;
            }
            showErrorModal.value = true;
        }
    } catch (e: any) {
        searching.value = false;
        errorTitle.value = 'Errore';
        errorMessage.value = e?.data?.message ?? 'Si è verificato un errore durante la scansione';
        showErrorModal.value = true;
    }
}

const validateSingle = async () => {
    if (!scanResult.value?.posto_id) return;
    validatingSingle.value = true;

    try {
        await directus('/appuntamenti/scan/validate', {
            method: 'POST',
            body: { posto_id: scanResult.value.posto_id, data_appuntamento: route.params.id as string }
        });
        closeModal();
    } catch (e: any) {
        showModal.value = false;
        errorTitle.value = 'Errore validazione';
        errorMessage.value = e?.data?.message ?? 'Si è verificato un errore durante la validazione';
        showErrorModal.value = true;
    } finally {
        validatingSingle.value = false;
    }
}

const validateAll = async () => {
    if (!scanResult.value?.prenotazione_id) return;
    validatingAll.value = true;

    try {
        await directus('/appuntamenti/scan/validate', {
            method: 'POST',
            body: { prenotazione_id: scanResult.value.prenotazione_id, data_appuntamento: route.params.id as string }
        });
        closeModal();
    } catch (e: any) {
        showModal.value = false;
        errorTitle.value = 'Errore validazione';
        errorMessage.value = e?.data?.message ?? 'Si è verificato un errore durante la validazione';
        showErrorModal.value = true;
    } finally {
        validatingAll.value = false;
    }
}

const closeModal = () => {
    showModal.value = false;
    showErrorModal.value = false;
    scanResult.value = null;
    scannerRef.value.resumeScanner();
}

onMounted(async () => {

    await $directus.connect();

    const { subscription } = await $directus.subscribe('prenotazioni_appuntamenti_posti', {
        uid: `prenotazioni_appuntamenti_posti_${route.params.id}`,
        query: {
            fields: [
                'id',
                'status',
                'annullato'
            ],
            filter: {
                prenotazione: {
                    data_appuntamento: route.params.id as string
                }
            }
        },
    });

    for await (const item of subscription) {
        switch (item.event) {
            case 'init':
                posti.value = item.data as any[];
                break;
            case 'create':
                posti.value.push(item.data as any);
                break;
            case 'update':
                for (const posto of item.data) {
                    const indexUpdate = posti.value.findIndex((p) => p.id === posto.id);
                    if (indexUpdate !== -1) {
                        posti.value[indexUpdate] = posto as any;
                    }
                }
                break;
            /* case 'delete':
                for (const posto of item.data) {
                    const indexDelete = posti.value.findIndex((p) => p.id === posto.id);
                    if (indexDelete !== -1) {
                        posti.value.splice(indexDelete, 1);
                    }
                } */

        }

    }
})
onBeforeUnmount(() => {
    $directus.disconnect();
});

useSeoMeta({
    title: () => `${dataAppuntamento.value?.appuntamento?.nome ?? 'Appuntamento senza nome'} - Scanner`,
})
</script>

<style lang="scss" scoped>
main {
    position: relative;
    padding: var(--margin-page);

    .cont {
        position: relative;
        display: flex;
        flex-direction: column;
    }
}

.counter {
    margin-top: 8px;
    margin-bottom: var(--margin-article);
}

.scannerCont {
    background-color: black;
    border-radius: var(--size-card-radius);
    overflow: hidden;
    aspect-ratio: 3 / 4;

    &:deep(.n-spin-container) {
        position: relative;
        height: 100%;
        width: 100%;

        .n-spin-content {
            position: relative;
            height: 100%;
            width: 100%;
        }
    }
}

.modalContent {
    display: flex;
    flex-direction: column;
    gap: var(--margin-article);

    .buttons {
        display: flex;
        flex-direction: column;
        gap: 8px;

        &:deep(.n-button--secondary) {
            --n-color: var(--color-background-page)
        }
    }
}
</style>