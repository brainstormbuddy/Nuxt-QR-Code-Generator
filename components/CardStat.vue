<template>
  <div :class="`p-3 text-center ${backgroud}`" style="border-radius: 12px">
    <span
      :class="`inline-flex justify-content-center align-items-center ${bg_icon} border-circle mb-3 p-3`"
    >
      <i :class="`${icon} text-xl text-white`"></i>
    </span>
    <div class="text-2xl font-medium text-white mb-2">{{ counter }}</div>
    <span :class="`${color_label} font-medium`">{{ label }}</span>
  </div>
</template>
<script setup>
const props = defineProps({
  backgroud: {
    type: String,
    default: "bg-blue-500",
  },
  bg_icon: {
    type: String,
    default: "bg-blue-600",
  },
  icon: {
    type: String,
    default: "pi pi-inbox",
  },
  counter: {
    type: String,
    default: "123K",
  },
  color_label: {
    type: String,
    default: "text-blue-100",
  },
  label: {
    type: String,
    default: "Messages",
  },
});
</script>
<style scoped></style>
