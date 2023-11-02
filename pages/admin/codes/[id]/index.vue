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

import useApi from "@/composables/useApi";
const { getCode } = useApi();

onMounted(async () => {
  id.value = routes.params.id;
  const { link, u } = routes.query;
  code.value = await getCode(id.value);
  if (code.value.rel_users_to_organizations.id == link) {
    const user = code.value.rel_users_to_organizations.profiles.user_id;
    if (user.split("-")[0] == u) {
      visible.value = true;
    }
  }
});
</script>
<style scoped></style>
