<template>
  <DataTable :value="rel_users_organizations" tableStyle="min-width: 50rem">
    <Column field="organizations.name" header="Name"></Column>
    <Column field="organizations.description" header="Description"></Column>
    <Column field="is_active" header="Active"></Column>
  </DataTable>
</template>
<script setup>
import useApi from "@/composables/useApi";
const { getLinksOrganizations } = useApi();
const rel_users_organizations = ref([]);

const props = defineProps({
  user_id: {
    type: String,
    default: "",
  },
});

onMounted(async () => {
  const data = await getLinksOrganizations(props.user_id);
  const result = data.map((item) => {
    if (item.profiles.user_id == props.user_id) {
      return { ...item };
    }
  });
  rel_users_organizations.value = result;
});
</script>
<style scoped></style>
