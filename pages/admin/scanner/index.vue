<template>
  <div>
    <h1 class="text-center">Scanner</h1>
    <qrcode-stream @detect="onDetect"></qrcode-stream>
  </div>
</template>
<script setup>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
definePageMeta({ layout: "admin" });
onMounted(async () => {});

const onDetect = (result) => {
  window.location.href = result[0].rawValue;
};
</script>
<style scoped></style>
