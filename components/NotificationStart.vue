<template>
  <div>
    <Message severity="info">
      To start you must link an organization.
      <NuxtLink to="/admin/organizations/link"> Click here to start. </NuxtLink>
    </Message>
  </div>
</template>
<script setup>
onMounted(async () => {});
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
