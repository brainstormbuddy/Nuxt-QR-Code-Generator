export default function () {
  const supabase = useSupabaseClient();
  async function getCodes(link_id) {
    const { data, error } = await supabase
      .from("codes")
      .select("*")
      .eq("link_id", link_id);
    if (error) throw error;
    return data;
  }

  async function getCodesStatePending(link_id) {
    const { data, error } = await supabase
      .from("codes")
      .select("*")
      .eq("link_id", link_id)
      .eq("state", "pending");
    if (error) throw error;
    return data;
  }

  async function createCode(fields) {
    const { data, error } = await supabase
      .from("codes")
      .insert([fields])
      .select();
    if (error) throw error;
    return data;
  }

  async function updateCode(id, fields) {
    const { data, error } = await supabase
      .from("codes")
      .update(fields)
      .eq("id", id);
    if (error) throw error;
    return data;
  }

  async function getCode(id) {
    const { data, error } = await supabase
      .from("codes")
      .select(
        "*, rel_users_to_organizations!inner(*, organizations!inner(*), profiles!inner(*))"
      )
      .eq("id", id)
      .limit(1);

    if (error) throw error;
    return data[0];
  }

  return {
    getCodes,
    getCodesStatePending,
    createCode,
    updateCode,
    getCode,
  };
}
