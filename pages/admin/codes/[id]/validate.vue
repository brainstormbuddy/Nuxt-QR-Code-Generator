<template>
  <h1 class="text-center">QR Code Status</h1>
  <codes-card-qr-validate :code="code" v-if="visible" />
</template>
<script setup>
definePageMeta({ layout: "admin", auth: true, middleware: "session" });
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
