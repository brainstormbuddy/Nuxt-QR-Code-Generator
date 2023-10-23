<template>
  <div>
    <h1>Admin</h1>
    <div class="grid">
      <div class="col-12 xl:col-4">
        <CardStat
          :backgroud="'bg-green-500'"
          :bg_icon="'bg-green-600'"
          :icon="'pi pi-sign-in'"
          :counter="'123K'"
          :label="'Entries '"
          :color_label="'text-green-100'"
        />
      </div>
      <div class="col-12 xl:col-4">
        <CardStat
          :backgroud="'bg-blue-500'"
          :bg_icon="'bg-blue-600'"
          :icon="'pi pi-qrcode'"
          :counter="'123K'"
          :label="'Pending '"
        />
      </div>
      <div class="col-12 xl:col-4">
        <CardStat
          :backgroud="'bg-orange-500'"
          :bg_icon="'bg-orange-600'"
          :icon="'pi pi-sign-out'"
          :counter="'123K'"
          :label="'Exits'"
          :color_label="'text-orange-100'"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "admin",
});
</script>
<style scoped></style>
