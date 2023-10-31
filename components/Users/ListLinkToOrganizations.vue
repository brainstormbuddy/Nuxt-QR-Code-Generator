<template>
  <!-- <pre>
    {{ user_id }}
    {{ rel_users_organizations }}
  </pre> -->
  <DataTable :value="rel_users_organizations" tableStyle="min-width: 50rem">
    <Column field="organizations.name" header="Name"></Column>
    <Column field="organizations.description" header="Description"></Column>
    <Column field="is_active" header="Active"></Column>
  </DataTable>
</template>
<script setup>
const supabase = useSupabaseClient();
const rel_users_organizations = ref([]);

const props = defineProps({
  user_id: {
    type: String,
    default: "",
  },
});

onMounted(async () => {
  let { data, error } = await supabase
    .from("rel_users_to_organizations")
    .select("*, organizations:organization_id(*), profiles:profile_id(*)")
    .eq("profiles.user_id", props.user_id);

  // .eq("profiles.user_id", props.user_id)

  // rel_users_organizations.value = data;

  const result = data.map((item) => {
    if (item.profiles.user_id == props.user_id) {
      return { ...item };
    }
  });
  rel_users_organizations.value = result;
  console.log(rel_users_organizations.value);
});
</script>
<style scoped></style>
