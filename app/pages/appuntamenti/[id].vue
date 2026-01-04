<template>
    <div v-if="dataAppuntamento">

        <NModal v-model:show="showModal" preset="card" :mask-closable="false" @close="closeModal">
            <template #header>
                <div>Codice valido</div>
            </template>
            <div class="modalContent">
                <div class="paragraph">
                    <p>Nome Cognome<br>Prenotazione per 2 posti</p>
                </div>
                <div class="buttons">
                    <NButton type="primary" size="large" round>Valida biglietto</NButton>
                    <NButton secondary size="large" round>Valida tutti i biglietti</NButton>
                </div>
            </div>
        </NModal>
        <NModal v-model:show="showErrorModal" preset="card" :mask-closable="false" @close="closeModal">
            <template #header>
                <div>Codice già validato</div>
            </template>
            <div class="modalContent">
                <div class="paragraph">
                    <p>Nome Cognome<br>Prenotazione per 2 posti<br>Codice validato il 04/01/2026 alle 10:00</p>
                </div>
                <div class="buttons">
                    <NButton secondary size="large" round>Chiudi</NButton>
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
                    <div class="title1blight"><strong>0</strong> di 120</div>
                </div>
                <div class="scannerCont" @click="showModal = true">
                    <NSpin :show="searching">
                        <ClientOnly>
                            <Scanner :qrbox="{ width: 250, height: 125 }" @detect="handleDetect" ref="scannerRef" />
                        </ClientOnly>
                    </NSpin>
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { NModal, NButton, NSpin } from 'naive-ui';

definePageMeta({
    middleware: ['private-area']
})

const { getItemById } = useDirectusItems();
const { formatoDataOraLungo } = useOrari();
const route = useRoute();

const showModal = ref(false);
const showErrorModal = ref(false);
const scannerRef = ref<any>(null);
const searching = ref(false);

const { data: dataAppuntamento } = useAsyncData<DateAppuntamento>(`dateAppuntamenti-${route.params.id}`, () => getItemById({
    collection: 'date_appuntamenti',
    id: route.params.id as string,
    params: {
        fields: [
            'id',
            'appuntamento.nome',
            'data'
        ]
    }
}));

const breadcrumbItems = computed(() => {
    return [{
        label: dataAppuntamento.value?.appuntamento?.nome ?? 'Appuntamento senza nome',
    }]
})

const handleDetect = (decodedText: string, decodedResult: any) => {
    scannerRef.value.pauseScanner();
    searching.value = true;
    //console.log(decodedText, decodedResult);

    setTimeout(() => {
        searching.value = false;
        showModal.value = true;
    }, 2000);
}
const closeModal = () => {
    scannerRef.value.resumeScanner();
}

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
    aspect-ratio: 1.3333;
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