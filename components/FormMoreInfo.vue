<template>
  <div class="surface-section text-center">
    <div class="grid">
      <div class="col-12 xl:col-4"></div>
      <div class="col-12 xl:col-4">
        <label for="email" class="mt-0 mb-5 text-700 line-height-3 text-xl"
          >For more information</label
        >
        <InputText
          id="email"
          v-model="email"
          type="text"
          size="large"
          placeholder="Enter your email"
          class="w-full mt-3 text-center"
        />
      </div>
      <div class="col-12 xl:col-4"></div>
    </div>
    <div class="grid lg:mt-2">
      <div class="col-12 xl:col-4"></div>
      <div class="col-12 xl:col-4">
        <Button type="submit" label="Send" class="w-full" size="large" />
      </div>
      <div class="col-12 xl:col-4"></div>
    </div>
  </div>
</template>
<script setup>
const email = ref("");
onMounted(async () => {});
</script>
<style scoped></style>
