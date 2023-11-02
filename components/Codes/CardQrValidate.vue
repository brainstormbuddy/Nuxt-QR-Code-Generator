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

import useApi from "@/composables/useApi";
const { getProfile, updateCode, createRecords } = useApi();
const props = defineProps({
  code: {
    type: Object,
    default: {},
  },
});

const user = ref();

onMounted(async () => {
  const data_user = await getProfile();
  user.value = data_user;
});

const validate = async () => {
  console.log("Validate");

  try {
    const update_code = await updateCode(props.code.id, {
      state: "used",
      approved_date: new Date(),
      approved_by: user.value.profile.id,
    });

    const record = await createRecords({
      description: props.code.name,
      code_id: props.code.id,
    });

    showToast(toast, {
      severity: "success",
      summary: "Success",
      detail: "Authorized Access",
      life: 3000,
    });

    reloadNuxtApp();
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
