<template>
  <div>
    <h1>Records</h1>
    <records-table-list-records :records="records" />
  </div>
</template>
<script setup>
definePageMeta({ layout: "admin" });
const supabase = useSupabaseClient();
const link = ref();
const records = ref([]);

onMounted(async () => {
  link.value = JSON.parse(localStorage.getItem("sb_org_id"));

  let { data, error } = await supabase
    .from("records")
    .select(
      "*, codes: code_id(*,rel_users_to_organizations: link_id(*, profiles: profile_id(*)) ) "
    )
    .eq("codes.rel_users_to_organizations.id", link.value.code);

  const result = data.map((item) => {
    if (item.codes.rel_users_to_organizations?.id == link.value.code) {
      return {
        ...item,
      };
    }

    // return { ...item };
  });

  records.value = result;
  console.log(result);
});
</script>
<style scoped></style>
