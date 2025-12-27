export default defineNuxtRouteMiddleware(async (to, _from) => {
    const { fetchUser, setUser } = useDirectusAuth();

    try {
        const tryFetchUser = await fetchUser();
        if (tryFetchUser.value) {
            setUser(tryFetchUser.value);
        } else return navigateTo({ name: 'login' });
    } catch (error) {
        return navigateTo({ name: 'login' });
    }
});