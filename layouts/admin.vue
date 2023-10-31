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
const supabase = useSupabaseClient();
const config = useRuntimeConfig();
const visible = ref(false);
const org_id = ref({});
const started = ref(false);
const organizations = ref([]);
const rel_users_organizations = ref([]);

const session_id = ref();

const profile_id = ref();

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
  session_id.value = await JSON.parse(
    localStorage.getItem(`${config.public.SUPABASE_SB}`)
  );

  // console.log(session_id.value);
  // console.log(session_id.value.user.id);

  // let { data: profiles, err } = await supabase
  //   .from("profiles")
  //   .select("id")
  //   .eq("user_id", session_id.value.user.id);

  // profile_id.value = profiles[0].id;
  // console.log(profile_id.value);

  let { data, error } = await supabase
    .from("rel_users_to_organizations")
    .select("*, organizations:organization_id(*), profiles:profile_id(*)")
    .eq("profiles.user_id", session_id.value.user.id);
  rel_users_organizations.value = data;

  const payload = rel_users_organizations.value;

  const result = payload.map((item) => {
    if (item.profiles.user_id == session_id.value.user.id) {
      return {
        code: item.id,
        name: item.organizations.name,
      };
    }
  });

  organizations.value = result;

  if (rel_users_organizations.value.length > 0) {
    started.value = true;
    if (localStorage.getItem("sb_org_id") == null) {
      console.log("No org");
      // console.log(organizations.value[0].code);
      localStorage.setItem("sb_org_id", JSON.stringify(organizations.value[0]));
    }
    org_id.value = JSON.parse(localStorage.getItem("sb_org_id"));
  } else {
    console.log("No org");
  }

  // console.log(localStorage.getItem("sb_org_id"));
  // console.log(org_id.value);
});

const selected_org = async () => {
  localStorage.setItem("sb_org_id", JSON.stringify(org_id.value));

  // reloadNuxtApp();
  window.location.reload();
};

const logout = async () => {
  // localStorage.removeItem("sb_org_id");
  // localStorage.removeItem(`${config.public.SUPABASE_SB}`);
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
