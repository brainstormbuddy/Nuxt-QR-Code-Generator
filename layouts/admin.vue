<template>
  <!-- <pre>
    {{ listLinksOrganizations }}

    {{ link_id }}
  </pre> -->
  <div class="grid">
    <div class="col-1 xl:col-6">
      <Button icon="pi pi-bars" @click="visible = true" />
    </div>
    <div class="col-11 xl:col-6">
      <Dropdown
        v-model="link_id"
        :options="listLinksOrganizations"
        optionLabel="name"
        placeholder="Select an Organization"
        class="w-full"
        @change="selected_org"
      />
    </div>
  </div>
  <div class="card flex justify-content-center">
    <Sidebar v-model:visible="visible">
      <h2 class="text-center">Panel Admin</h2>
      <div class="text-center">
        <Avatar
          :label="session_id?.user?.email[0]"
          class=""
          size="xlarge"
          shape="circle"
          style="background-color: #10b981; color: #ffffff"
        />
        <p>{{ session_id?.user?.email }}</p>
        <Button
          label="Log out"
          severity="danger"
          outlined
          class="mt-2 mb-4"
          icon="pi pi-power-off"
          @click="logout"
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
const config = useRuntimeConfig();

import useApi from "@/composables/useApi";
const { getLinksOrganizations } = useApi();

const visible = ref(false);
const started = ref(false);
const session_id = ref();

const profile_id = ref();

const hidden_profile = ref("hidden");

const listLinksOrganizations = ref([]);
const link_id = ref({});

const items = ref([
  { label: "Home", icon: "pi pi-fw pi-home", url: "/admin" },
  { label: "QR Scanner ", icon: "pi pi-fw pi-shield", url: "/admin/scanner" },
  { label: "My QRs codes", icon: "pi pi-fw pi-qrcode", url: "/admin/codes" },
  { label: "Records", icon: "pi pi-fw pi-list", url: "/admin/records" },
  {
    label: "Add invitation code",
    icon: "pi pi-fw pi-bolt",
    url: "/admin/organizations/link",
  },
  {
    label: "My organizations",
    icon: "pi pi-fw pi-building",
    url: "/admin/my-organizations/",
  },
  {
    label: "Users",
    icon: "pi pi-fw pi-users",
    url: "/admin/users",
    class: hidden_profile,
  },
  {
    label: "Organizations",
    icon: "pi pi-fw pi-building",
    url: "/admin/organizations",
    class: hidden_profile,
  },
]);

onMounted(async () => {
  session_id.value = await JSON.parse(
    localStorage.getItem(`${config.public.SUPABASE_SB}`)
  );

  const results = await getLinksOrganizations(session_id.value.user.id);

  listLinksOrganizations.value = results.map((item) => {
    return {
      code: item.id,
      name: item.organizations.name,
      org_id: item.organizations.id,
      profile_id: item.profiles.id,
      role: item.profiles.role,
    };
  });

  if (listLinksOrganizations.value.length > 0) {
    started.value = true;

    if (localStorage.getItem("sb_org_id") === null) {
      localStorage.setItem(
        "sb_org_id",
        JSON.stringify(listLinksOrganizations.value[0])
      );
    }

    link_id.value = JSON.parse(localStorage.getItem("sb_org_id"));

    if (link_id.value.role == "admin") {
      hidden_profile.value = "";
    }
  }
});

const selected_org = async () => {
  localStorage.setItem("sb_org_id", JSON.stringify(link_id.value));
  window.location.reload();
};

const logout = async () => {
  localStorage.clear();
  navigateTo("/");
};
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
