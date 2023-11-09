<template>
  <h1>Form</h1>
  <form @submit.prevent="submit">
    <div class="grid">
      <div class="col-12 mt-2">
        <div class="flex flex-column gap-2">
          <label for="code">Invitation code</label>
          <InputText
            v-model="code"
            type="text"
            size="large"
            placeholder="Enter the invitation code"
          />
        </div>
      </div>
      <div class="col-12 mt-1">
        <Button
          label="Guardar"
          icon="pi pi-save"
          class="full-width-button"
          size="large"
          type="submit"
        />
      </div>
    </div>
  </form>
  <Toast />
</template>
<script setup>
import { useToast } from "primevue/usetoast";
const toast = useToast();
import { showToast } from "~/utils/toast";

import useApi from "@/composables/useApi";
const { searchOrganizationByCode, searchLinkExist, createLink } = useApi();

// const config = useRuntimeConfig();

// const supabase = useSupabaseClient();
const code = ref("");
// const session_id = ref("");
const profile_id = ref("");

onMounted(async () => {
  // session_id.value = await JSON.parse(
  //   localStorage.getItem(`${config.public.SUPABASE_SB}`)
  // );
  // const { data: profile, error } = await supabase
  //   .from("profiles")
  //   .select("*")
  //   .eq("user_id", session_id.value.user.id);

  profile_id.value = JSON.parse(localStorage.getItem("sb_org_id")).profile_id;
  // console.log(profile_id.value);
});

const submit = async () => {
  console.log("Submit");
  try {
    console.log(code.value);
    const organizations = await searchOrganizationByCode(code.value);
    if (organizations.length === 0) {
      console.log("Not found");
      showToast(toast, {
        severity: "warn",
        summary: "Not found",
        detail: `Code not found`,
        life: 3000,
      });
    } else {
      console.log("Found");

      const rel = await searchLinkExist(profile_id.value, organizations[0].id);

      if (rel.length === 0) {
        const fields = {
          profile_id: profile_id.value,
          organization_id: organizations[0].id,
        };
        console.log(fields);
        const data = await createLink(fields);
        console.log(data);
        showToast(toast, {
          severity: "success",
          summary: "Link success",
          detail: `Account has been linked successfully`,
          life: 3000,
        });
        window.location.href = "/admin";
      } else {
        showToast(toast, {
          severity: "warn",
          summary: "Link already exists",
          detail: `The organization has already been linked to the account`,
          life: 3000,
        });
      }
    }
  } catch (error) {
    console.log(error);
    showToast(toast, {
      severity: "error",
      summary: "Failed",
      detail: `${error}`,
      life: 3000,
    });
  }
};
</script>
<style scoped></style>
