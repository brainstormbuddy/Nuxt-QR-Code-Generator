<template>
  <div>
    <h1>Admin</h1>
    <div class="grid">
      <div class="col-12 xl:col-6">
        <CardStat
          :backgroud="'bg-green-500'"
          :bg_icon="'bg-green-600'"
          :icon="'pi pi-sign-in'"
          :counter="`${counter_inbound}`"
          :label="'Entries '"
          :color_label="'text-green-100'"
        />
      </div>
      <div class="col-12 xl:col-6">
        <CardStat
          :backgroud="'bg-blue-500'"
          :bg_icon="'bg-blue-600'"
          :icon="'pi pi-qrcode'"
          :counter="`${counter_current_codes}`"
          :label="'Pending '"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "admin",
});

const supabase = useSupabaseClient();
const records = ref([]);

const counter_inbound = ref(0);
const counter_outbound = ref(0);

const organization = ref("");
const codes = ref([]);
const current_codes = ref([]);
const counter_current_codes = ref(0);

const load_codes = async () => {
  organization.value = JSON.parse(localStorage.getItem("sb_org_id"));
  const { data, error } = await supabase
    .from("codes")
    .select("*")
    .eq("link_id", organization.value.code);
  codes.value = data;
  current_codes.value = codes.value.filter((code) => code.state === "pending");
  counter_current_codes.value = current_codes.value.length;
};

onMounted(async () => {
  let { data, error } = await supabase
    .from("records")
    .select(
      "*, codes: code_id(*,rel_users_to_organizations: link_id(*, profiles: profile_id(*)) ) "
    );

  records.value = data;
  console.log(data);

  counter_inbound.value = records.value.length;

  console.log(counter_inbound.value);

  await load_codes();
});
</script>
<style scoped></style>
