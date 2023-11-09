export default function () {
  const supabase = useSupabaseClient();
  async function getOrganizations() {
    const { data, error } = await supabase.from("organizations").select("*");
    if (error) throw error;
    return data;
  }

  async function searchOrganizationByCode(code) {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("code", code);
    if (error) throw error;
    return data;
  }

  async function getOrganization(id) {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", id)
      .limit(1);
    if (error) throw error;
    return data;
  }

  async function createOrganization(fields) {
    const { data, error } = await supabase
      .from("organizations")
      .insert([fields])
      .select();
    if (error) throw error;
    return data;
  }

  return {
    getOrganizations,
    searchOrganizationByCode,
    getOrganization,
    createOrganization,
  };
}
