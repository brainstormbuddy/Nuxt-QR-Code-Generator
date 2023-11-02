export default function () {
  const supabase = useSupabaseClient();

  async function getProfile() {
    const { data, error } = await supabase.auth.getUser();

    // supabase.auth.getUser().then((user) => {
    //   console.log(user.data.user);
    //   return user.data.user;
    // });

    const { data: profile, error: err } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", data.user.id);
    if (err) throw err;

    const result = {
      ...data.user,
      profile: { ...profile[0] },
    };
    return result;
  }

  return {
    getProfile,
  };
}
