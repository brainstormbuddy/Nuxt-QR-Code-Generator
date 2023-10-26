<template>
  <DataTable :value="rel_users_organizations" tableStyle="min-width: 50rem">
    <Column field="organizations.name" header="Name"></Column>
    <Column field="organizations.description" header="Description"></Column>
    <Column field="is_active" header="Active"></Column>
  </DataTable>
</template>
<script setup>
const supabase = useSupabaseClient();
const rel_users_organizations = ref([]);

onMounted(async () => {
  let { data, error } = await supabase
    .from("rel_users_to_organizations")
    .select("*, organizations:organization_id(*)");

  rel_users_organizations.value = data;
  console.log(rel_users_organizations.value);
});
</script>
<style scoped></style>
