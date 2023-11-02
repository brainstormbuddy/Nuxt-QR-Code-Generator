export default function () {
  const supabase = useSupabaseClient();
  async function getRecords(link_id) {
    const { data, error } = await supabase
      .from("records")
      .select("*, codes!inner(*, rel_users_to_organizations!inner(*))")
      .eq("codes.rel_users_to_organizations.id", link_id);
    if (error) throw error;
    return data;
  }

  async function createRecords(fields) {
    const { data, error } = await supabase.from("records").insert([fields]);
    if (error) throw error;
    return data;
  }

  return {
    getRecords,
    createRecords,
  };
}
