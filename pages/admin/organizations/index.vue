<template>
  <h1>Organizations</h1>
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
</template>
<script setup>
definePageMeta({ layout: "admin" });
</script>
<style scoped></style>
