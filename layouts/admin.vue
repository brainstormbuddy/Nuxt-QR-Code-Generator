<template>
  <div class="grid">
    <div class="col-1 xl:col-6">
      <Button icon="pi pi-bars" @click="visible = true" />
    </div>
    <div class="col-11 xl:col-6">
      <Dropdown
        v-model="org_id"
        :options="organizations"
        optionLabel="name"
        placeholder="Select an Organization"
        class="w-full"
      />
    </div>
  </div>
  <div class="card flex justify-content-center">
    <Sidebar v-model:visible="visible">
      <h2 class="text-center">Panel Admin</h2>
      <div class="text-center">
        <Avatar label="U" class="" size="xlarge" shape="circle" />
        <p>Info user</p>
        <Button
          label="Log out"
          severity="danger"
          outlined
          class="mt-2 mb-4"
          icon="pi pi-power-off"
        />
      </div>

      <PanelMenu :model="items"> </PanelMenu>
    </Sidebar>
  </div>
  <div class="grid">
    <div class="col-12">
      <NotificationStart v-if="started == false" />
    </div>
  </div>
  <slot />
</template>
<script setup>
const visible = ref(false);
const org_id = ref();
const started = ref(false);
const organizations = ref([]);
//{ name: "New York", code: "NY" }

const items = ref([
  { label: "Home", icon: "pi pi-fw pi-home", url: "/admin" },
  { label: "QR Scanner ", icon: "pi pi-fw pi-shield", url: "/admin/scanner" },
  { label: "My QRs codes", icon: "pi pi-fw pi-qrcode", url: "/admin/codes" },
  { label: "Records", icon: "pi pi-fw pi-list", url: "/admin/records" },
  { label: "Users", icon: "pi pi-fw pi-users", url: "/admin/users" },
  {
    label: "Organizations",
    icon: "pi pi-fw pi-building",
    url: "/admin/organizations",
  },
]);

onMounted(async () => {
  if (organizations.value.length > 0) {
    started.value = true;
  }
});
</script>
<style>
.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content {
  border: none !important;
  background: transparent !important;
}

.full-width-button {
  width: 100%;
}

.full-width-textarea {
  width: 100%;
}
</style>
