<template>
  <h1 class="text-center">QR Code Status</h1>
  <!-- <pre>
    {{ code }}
  </pre> -->
  <codes-card-qr-validate :code="code" v-if="visible" />
</template>
<script setup>
definePageMeta({ layout: "admin" });
const supabase = useSupabaseClient();
const config = useRuntimeConfig();
const routes = useRoute();
const id = ref();
const code = ref();
const visible = ref(false);
const session_id = ref({});

const validate_access = async () => {
  console.log("validate_access");

  session_id.value = await JSON.parse(
    localStorage.getItem(`${config.public.SUPABASE_SB}`)
  );

  if (session_id.value == undefined) {
    return navigateTo("/");
  }
};

onMounted(async () => {
  await validate_access();
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
