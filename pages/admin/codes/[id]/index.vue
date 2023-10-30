<template>
  <div class="m-0">
    <h1 class="text-center">QR Code</h1>
    <codes-public-qr-code :code="code" v-if="visible" />
  </div>
</template>
<script setup>
const supabase = useSupabaseClient();
const routes = useRoute();
const id = ref();
const code = ref();
const visible = ref(false);

onMounted(async () => {
  id.value = routes.params.id;
  const { link, u } = routes.query;
  const { data, error } = await supabase
    .from("codes")
    .select(
      "*, rel_users_to_organizations: link_id(*, organizations: organization_id(*), profiles: profile_id(*))"
    )
    .eq("id", id.value)
    .limit(1);

  code.value = await data[0];
  if (code.value.rel_users_to_organizations.id == link) {
    const user = code.value.rel_users_to_organizations.profiles.user_id;
    if (user.split("-")[0] == u) {
      visible.value = true;
    }
  }
});
</script>
<style scoped></style>
