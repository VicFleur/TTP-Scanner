<template>
    <div class="breadcrumbs">
        <NuxtLink to="/" tabindex="0"><span>Appuntamenti</span></NuxtLink>
        <template v-for="route in routes">
            <NuxtLink v-if="route.slug" :to="route.slug" tabindex="0"><span>{{ route.label }}</span></NuxtLink>
            <span class="lastLink" v-else>{{ route.label }}</span>
        </template>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ routes: { slug?: string, label: string }[] }>()
</script>

<style lang="scss" scoped>
.breadcrumbs {
    position: relative;
    font-size: var(--font-size-footer);
    line-height: var(--font-line-footer);

    display: flex;
    flex-direction: row;
    align-items: baseline;
    flex-wrap: wrap;

    a {
        display: inline-flex;
        color: var(--color-azure-dark);
        font-weight: 600;
        text-decoration: none;
        white-space: nowrap;

        outline: none;

        span {
            display: inline-block;
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &:after {
            content: "\203A";
            font-weight: normal;
            margin: 0 5px;
            opacity: 0.5;
        }

        &:focus-visible span {
            outline: var(--outline-width-default) solid var(--focus-outline, var(--color-azure-dark));
            outline-offset: 2px;
            border-radius: 2px;
        }
    }

    .lastLink {
        display: inline-block;
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

@media screen and (max-width: 1279px) {
    .breadcrumbs {
        a {
            display: none;

            span {
                max-width: calc(100vw - var(--margin-page) * 2 - 24px);
            }

            &:after {
                content: none
            }

            &:last-of-type {
                display: inline-block;
            }
        }

        .lastLink {
            display: none;
        }
    }
}
</style>