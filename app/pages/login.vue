<template>
<div>
    <main>
        <div class="cont">
            <div class="loginBox">
                <div class="innerCont">
                    <div class="title1b">Login</div>
                    <NForm ref="loginForm" label-placement="top" :model="data" :rules="rules" @submit.prevent="validateForm">
                        <NFormItem label="Email" path="email">
                            <NInput size="large" v-model:value="data.email" type="text" :input-props="{ type: 'email', autocomplete: 'email' }" placeholder="Indirizzo email" required autofocus />
                        </NFormItem>
                        <NFormItem label="Password" path="password">
                            <NInput size="large" v-model:value="data.password" type="password" :input-props="{ autocomplete: 'current-password' }" placeholder="Password" required show-password-on="mousedown" />
                        </NFormItem>
                        <div class="buttonCont">
                            <NButton size="medium" type="primary" round :loading="inProgress" attr-type="submit">Accedi</NButton>
                        </div>
                    </NForm>
                </div>
            </div>
        </div>
    </main>
</div>
</template>

<script lang="ts" setup>
import type { FormInst, FormItemRule } from 'naive-ui'
import { NButton, NInput, NForm, NFormItem, useDialog } from 'naive-ui'

const { validateEmail } = useValidation()
const { login } = useDirectusAuth()
//const dialog = useDialog()

const loginForm = ref<FormInst | null>(null)

const data = reactive<LoginCredentials>({
    email: '',
    password: '',
    //remember: false
})

const rules = {
    email: {
        required: true,
        validator: (rule: FormItemRule, value: string) => {
            if (value == '') return Error('Email obbligatoria')
            else {
                if (validateEmail(value)) return true
                else return Error('Email non valida')
            }
        }
    },
    password: {
        required: true,
        message: 'Password non valida'
    }
}

const { submit, inProgress, error } = useSubmit(
    () => {
        return login(data);
    },
    {
        onSuccess: async () => {
            await navigateTo({ name: 'index' })
        },
        onError: () => {
            /* dialog.error({
                class: 'errorDialog',
                title: 'Credenziali non valide',
                iconPlacement: 'top',
                positiveText: 'OK'
            }) */
        }
    }
)
const validateForm = (e: Event) => {
    e.preventDefault()
    loginForm.value?.validate((formErrors: any) => {
        if (!formErrors) { submit() }
        //else $scrollToY(0)
    })
}
</script>

<style lang="scss" scoped>
main {
    position: relative;
    height: 100vh;
    height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 var(--margin-page);

    .loginBox {
        border-radius: var(--size-header-radius);
        background-color: var(--color-background-box);

        .title1b {
            margin-bottom: var(--margin-article);
        }

        .innerCont {
            padding: var(--margin-default);
        }

        .buttonCont {
            padding: var(--margin-default) 0;

            &:deep(button) {
                min-width: 200px;
            }
        }

        &:deep(.n-form-item-label__asterisk) {
            display: none !important;
        }

        &:deep(.n-input) {
            --n-border: 1px solid var(--color-border);
            --n-border-hover: 1px solid var(--color-border);
            --n-border-focus: 1px solid var(--color-border);

            .n-input__prefix {
                margin-right: 20px;
            }
        }
    }
}
</style>