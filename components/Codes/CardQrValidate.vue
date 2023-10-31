<template>
  <div class="card text-center">
    <Card>
      <template #title>
        {{ code?.rel_users_to_organizations?.organizations?.name }}
      </template>
      <template #content>
        <div class="grid">
          <div class="col-12 mt-0">
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
            <div class="mt-0">
              <h2 class="text-gray-500 mt-0">
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
      <template #footer>
        <Button
          label="Validate Access"
          class="full-width-button"
          @click="validate"
          v-if="code?.state == 'pending'"
        />
        <NuxtLink to="/admin/scanner" v-else>
          <Button
            label="Keep Scanning"
            class="full-width-button"
            severity="secondary"
          />
        </NuxtLink>
      </template>
    </Card>
    <Toast />
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
const toast = useToast();
import { showToast } from "~/utils/toast";

const supabase = useSupabaseClient();

const config = useRuntimeConfig();
const props = defineProps({
  code: {
    type: Object,
    default: {},
  },
});

const session_id = ref();
const profile_id = ref();

onMounted(async () => {
  session_id.value = await JSON.parse(
    localStorage.getItem(`${config.public.SUPABASE_SB}`)
  );

  let { data: profiles, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", session_id.value.user.id);
  profile_id.value = profiles[0].id;
  //   console.log(profile_id.value);
});

const validate = async () => {
  console.log("Validate");

  try {
    const { data, error } = await supabase
      .from("codes")
      .update({
        state: "used",
        approved_date: new Date(),
        approved_by: profile_id.value,
      })
      .eq("id", props.code.id)
      .select();

    if (error) {
      showToast(toast, {
        severity: "warn",
        summary: "Failed",
        detail: `${error}`,
        life: 3000,
      });
    } else {
      const { data: records, error } = await supabase
        .from("records")
        .insert([{ description: props.code.name, code_id: props.code.id }])
        .select();

      showToast(toast, {
        severity: "success",
        summary: "Success",
        detail: "Authorized Access",
        life: 3000,
      });

      // navigateTo("/admin/scanner");
      reloadNuxtApp();
    }
  } catch (error) {
    console.log(error);
    showToast(toast, {
      severity: "warn",
      summary: "Failed",
      detail: `${error}`,
      life: 3000,
    });
  }
};
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
