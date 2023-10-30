<template>
  <div class="card text-center">
    <Card>
      <template #title>
        {{ code?.rel_users_to_organizations?.organizations?.name }}
      </template>
      <template #content>
        <div class="grid">
          <div class="col-12">
            <h1 class="mt-0" v-if="code?.state == 'pending'">
              {{ code?.name }}
            </h1>
            <h1 class="mt-0" v-else>
              <del>{{ code?.name }}</del>
            </h1>
            <Chip :label="code?.state" v-if="code?.state == 'pending'" />
            <Chip :label="code?.state" class="bg-red-600 text-white" v-else />
            <br />
            <img :src="code?.datas" alt="QR Code" id="qr-code" />
            <div class="mt-2">
              <h2 class="text-gray-500">
                {{ code?.just_once == true ? "Single use" : "Repeated" }}
              </h2>
              <h3>
                <span class="line">Start Date</span>
                <span class="line">{{ code?.start_date }}</span>
              </h3>
              <h3>
                <span class="line">Due Date</span>
                <span class="line">{{ code?.end_date }}</span>
                <span class="line text-primary"></span>
              </h3>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const props = defineProps({
  code: {
    type: Object,
    default: {},
  },
});
</script>
<style scoped>
.line {
  display: block;
}

.p-card {
  box-shadow: none !important;
}

del {
  text-decoration: line-through;
  text-decoration-color: red;
}
</style>
