<template>
  <div>
    <h1>Admin</h1>
    <pre>
      {{ data_test }}
    </pre>
    <!-- <div class="grid">
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
    </div> -->
  </div>
</template>
<script setup>
import useApi from "@/composables/useApi";
const { getRecords } = useApi();

definePageMeta({
  layout: "admin",
});

const config = useRuntimeConfig();
const supabase = useSupabaseClient();
const records = ref([]);

const counter_inbound = ref(0);
const counter_outbound = ref(0);

const organization = ref("");
const codes = ref([]);
const current_codes = ref([]);
const counter_current_codes = ref(0);

const org_id = ref({});
const link_id = ref();
const session_id = ref();

const data_test = ref([]);

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

const load_records = async () => {
  let { data, error } = await supabase
    .from("records")
    .select(
      "*, codes: code_id(*,rel_users_to_organizations: link_id(*, profiles: profile_id(*)))"
    )
    .eq("codes.rel_users_to_organizations.id", org_id.value.code);

  records.value = data;

  records.value = data.map((item) => {
    if (
      item.codes.rel_users_to_organizations.profiles.user_id ==
      session_id.value.user.id
    ) {
      return {
        ...item,
      };
    }
  });

  counter_inbound.value = records.value.length;
};

// const test_query = async () => {
//   const { data, error } = await supabase
//     .from("records")
//     .select("*,codes!inner(name))")
//     .eq("codes.name", "Alana");

//   data_test.value = data;
//   console.log(data_test.value);
// };

onMounted(async () => {
  // session_id.value = await JSON.parse(
  //   localStorage.getItem(`${config.public.SUPABASE_SB}`)
  // );

  link_id.value = await JSON.parse(localStorage.getItem("sb_org_id"));
  console.log(link_id.value);
  // await load_records();
  // await load_codes();
  // await test_query();
  data_test.value = await getRecords(link_id.value.code);
});
</script>
<style scoped></style>
