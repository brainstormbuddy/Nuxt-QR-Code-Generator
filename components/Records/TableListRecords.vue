<template>
  <DataTable :value="records" tableStyle="min-width: 50rem">
    <Column field="created_at" header="Date"></Column>
    <Column field="type" header="Name"></Column>
    <Column field="description" header="Description"></Column>
    <Column
      field="codes.rel_users_to_organizations.profiles.name"
      header="Owner"
    ></Column>
  </DataTable>
</template>
<script setup>
const props = defineProps({
  records: {
    type: Array,
    default: [],
  },
});
</script>
<style scoped></style>
