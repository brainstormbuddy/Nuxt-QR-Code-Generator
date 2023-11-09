export default function () {
  const supabase = useSupabaseClient();
  async function getOrganizations() {
    const { data, error } = await supabase.from("organizations").select("*");
    if (error) throw error;
    return data;
  }

  async function getMyOrganizations() {
    const { data, error } = await supabase.from("organizations").select("*");
    if (error) throw error;
    return data;
  }

  async function getOrganization(id) {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", id)
      .limit(1);
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
    getMyOrganizations,
    getOrganization,
    createOrganization,
  };
}
