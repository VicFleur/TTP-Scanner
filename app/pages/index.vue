<template>
<div>
    <main>
        <div class="cont">
            <div class="title1b">Appuntamenti</div>
            <ul>
                <li v-for="dateAppuntamento in dateAppuntamenti">
                    <NuxtLink :to="`/appuntamenti/${dateAppuntamento.id}`">
                        <span class="title3b">{{ dateAppuntamento.appuntamento.nome }}</span>
                        <span class="title3light">{{ formatoDataOraLungo(new Date(dateAppuntamento.data)) }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                            <path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42c.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 0 0 0-1.41l-6.58-6.6a.996.996 0 1 0-1.41 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z" fill="currentColor"></path>
                        </svg>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </main>
</div>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: ['private-area']
})

const { getItems } = useDirectusItems();
const { formatoDataOraLungo } = useOrari();

const { data: dateAppuntamenti } = useAsyncData<DateAppuntamento[]>('dateAppuntamenti', () => getItems({
    collection: 'date_appuntamenti',
    params: {
        fields: [
            'id',
            'appuntamento.nome',
            'data'
        ],
        sort: '-data'
    }
}));
</script>

<style lang="scss" scoped>
main {
    position: relative;
    padding: 0 var(--margin-page);

    .cont {
        display: flex;
        flex-direction: column;
        gap: var(--margin-article);
    }
}

ul {
    list-style: none;

    display: flex;
    flex-direction: column;
    gap: var(--margin-default);

    li {
        a {
            text-decoration: none;
            padding: var(--margin-default);
            border-radius: var(--size-card-radius);
            background-color: var(--color-background-box);

            display: grid;
            grid-template-columns: 1fr 24px;
            gap: 0 var(--margin-default);

            text-wrap: balance;

            svg {
                grid-column: 2;
                grid-row: 1 / span 2;
                height: 24px;
                width: 24px;
            }
        }
    }
}
</style>