export type UseSubmitOptions = {
    onSuccess?: (result: any) => any;
    onError?: (error: any) => any;
};

export function useSubmit<T>(
    fetchable: () => Promise<T>,
    options: UseSubmitOptions = {}
) {

    const error = ref<any | null>(null);
    const inProgress = ref(false);
    const succeeded = ref<Boolean | null>(null);

    async function submit() {
        error.value = null;
        inProgress.value = true;
        succeeded.value = null;

        try {
            const data = await fetchable();
            succeeded.value = true;
            options?.onSuccess?.(data);
            return data;
        } catch (e: any) {

            if (e.data && e.data.message) error.value = { message: e.data.message }
            else if (e.message) error.value = { message: e.message }
            else error.value = { message: 'GENERIC' }

            succeeded.value = false;
            options?.onError?.(e);
        } finally {
            inProgress.value = false;
        }
    }

    return {
        submit,
        inProgress,
        succeeded,
        error,
    }

}