export default function () {
  const supabase = useSupabaseClient();
  async function getLinksOrganizations(user_id) {
    const { data, error } = await supabase
      .from("rel_users_to_organizations")
      .select("*, profiles!inner(*), organizations!inner(*)")
      .eq("profiles.user_id", user_id);
    if (error) throw error;
    return data;
  }

  async function createLink(fields) {
    const { data, error } = await supabase
      .from("rel_users_to_organizations")
      .insert([fields]);
    if (error) throw error;
    return data;
  }

  return {
    getLinksOrganizations,
    createLink,
  };
}
