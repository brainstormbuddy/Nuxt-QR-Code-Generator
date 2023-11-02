export default defineNuxtRouteMiddleware(async (to, _from) => {
  const supabase = useSupabaseClient();
  console.log("middleware");
  supabase.auth.getUser().then((user) => {
    console.log(user);
    if (user.data.user === null) {
      return navigateTo("/");
    }
  });
});
