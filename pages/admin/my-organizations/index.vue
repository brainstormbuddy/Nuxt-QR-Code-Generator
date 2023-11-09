<template>
  <h1>My Organizations</h1>
  <div class="grid">
    <div class="col-12">
      <NuxtLink to="/admin/organizations/add">
        <Button
          label="Add"
          icon="pi pi-plus"
          size="large"
          class="full-width-button"
        />
      </NuxtLink>
    </div>
  </div>
  <div class="grid">
    <div class="col-12" v-for="item in link_organizations" :key="item.id">
      <organizations-list-model :organization="item" />
    </div>
  </div>
</template>
<script setup>
const config = useRuntimeConfig();
import useApi from "@/composables/useApi";
const { getLinksOrganizations } = useApi();
const session_id = ref();
const link_organizations = ref([]);
definePageMeta({ layout: "admin" });

onMounted(async () => {
  session_id.value = await JSON.parse(
    localStorage.getItem(`${config.public.SUPABASE_SB}`)
  );

  const data = await getLinksOrganizations(session_id.value.user.id);
  data.forEach((element) => {
    link_organizations.value.push(element.organizations);
  });
});
</script>
<style scoped></style>
