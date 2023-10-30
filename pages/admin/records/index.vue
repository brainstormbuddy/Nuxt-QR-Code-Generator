<template>
  <div>
    <h1>Records</h1>
    <records-table-list-records :records="records" />
  </div>
</template>
<script setup>
definePageMeta({ layout: "admin" });
const supabase = useSupabaseClient();

const records = ref([]);

onMounted(async () => {
  let { data, error } = await supabase
    .from("records")
    .select(
      "*, codes: code_id(*,rel_users_to_organizations: link_id(*, profiles: profile_id(*)) ) "
    );

  records.value = data;
  console.log(data);
});
</script>
<style scoped></style>
