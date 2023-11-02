<template>
  <h1 v-if="link_id != null">Codes</h1>
  <div class="mt-4 mb-4">
    <codes-form-generate-qr v-if="link_id != null" />
  </div>
  <div class="card" v-if="link_id != null">
    <TabView>
      <TabPanel>
        <template #header>
          <div class="flex align-items-center gap-2">
            <span class="font-bold white-space-nowrap">
              Current <Badge :value="current_codes.length"></Badge>
            </span>
          </div>
        </template>
        <div class="m-0">
          <div class="grid">
            <div class="col-12" v-for="item in current_codes" :key="item.id">
              <codes-card-qr-code :code="item" />
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <template #header>
          <div class="flex align-items-center gap-2">
            <span class="font-bold white-space-nowrap">
              Overdue
              <Badge :value="overdue_codes.length" severity="warning"></Badge>
            </span>
          </div>
        </template>
        <div class="m-0">
          <div class="grid">
            <div class="col-12" v-for="item in overdue_codes" :key="item.id">
              <codes-card-qr-code :code="item" />
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <template #header>
          <div class="flex align-items-center gap-2">
            <span class="font-bold white-space-nowrap">
              Used <Badge :value="used_codes.length" severity="info"></Badge>
            </span>
          </div>
        </template>
        <div class="m-0">
          <div class="grid">
            <div class="col-12" v-for="item in used_codes" :key="item.id">
              <codes-card-qr-code :code="item" />
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <template #header>
          <div class="flex align-items-center gap-2">
            <span class="font-bold white-space-nowrap">
              Trash
              <Badge :value="deleted_codes.length" severity="danger"></Badge>
            </span>
          </div>
        </template>
        <div class="m-0">
          <div class="grid">
            <div class="col-12" v-for="item in deleted_codes" :key="item.id">
              <codes-card-qr-code :code="item" />
            </div>
          </div>
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>
<script setup>
definePageMeta({ layout: "admin", auth: true, middleware: "session" });
import useApi from "@/composables/useApi";
const { getCodes } = useApi();
const codes = ref([]);
const current_codes = ref([]);
const overdue_codes = ref([]);
const used_codes = ref([]);
const deleted_codes = ref([]);

const link_id = ref();

onMounted(async () => {
  link_id.value = JSON.parse(localStorage.getItem("sb_org_id"));

  codes.value = await getCodes(link_id.value.code);
  current_codes.value = codes.value.filter((code) => code.state === "pending");
  overdue_codes.value = codes.value.filter((code) => code.state === "overdue");
  used_codes.value = codes.value.filter((code) => code.state === "used");
  deleted_codes.value = codes.value.filter((code) => code.state === "deleted");
});
</script>
<style scoped></style>
