export default defineNuxtRouteMiddleware(async (to, _from) => {
  const config = useRuntimeConfig();
  const session_id = ref({});

  console.log("middleware");

  onMounted(async () => {
    session_id.value = await JSON.parse(
      localStorage.getItem(`${config.public.SUPABASE_SB}`)
    );

    if (session_id.value === undefined) {
      return navigateTo("/");
    }
  });
});
