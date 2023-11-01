<template>
  <div>
    <h1>Admin</h1>
    <div class="grid">
      <div class="col-12 xl:col-6">
        <CardStat
          :backgroud="'bg-green-500'"
          :bg_icon="'bg-green-600'"
          :icon="'pi pi-sign-in'"
          :counter="`${records.length}`"
          :label="'Entries '"
          :color_label="'text-green-100'"
        />
      </div>
      <div class="col-12 xl:col-6">
        <CardStat
          :backgroud="'bg-blue-500'"
          :bg_icon="'bg-blue-600'"
          :icon="'pi pi-qrcode'"
          :counter="`${codes_pending.length}`"
          :label="'Pending '"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import useApi from "@/composables/useApi";
const { getRecords, getCodesStatePending } = useApi();

definePageMeta({
  layout: "admin",
});

const link_id = ref();

const records = ref([]);
const codes_pending = ref([]);

onMounted(async () => {
  link_id.value = await JSON.parse(localStorage.getItem("sb_org_id"));
  records.value = await getRecords(link_id.value.code);
  codes_pending.value = await getCodesStatePending(link_id.value.code);
});
</script>
<style scoped></style>
