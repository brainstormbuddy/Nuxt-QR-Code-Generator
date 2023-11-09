<template>
  <h1>Form</h1>
  <form @submit.prevent="submit">
    <div class="grid">
      <div class="col-12 mt-2">
        <div class="flex flex-column gap-2">
          <label for="name">Name</label>
          <InputText
            v-model="form.name"
            type="text"
            size="large"
            placeholder="Name"
          />
        </div>
      </div>
      <div class="col-12 mt-2">
        <div class="flex flex-column gap-2">
          <label for="description">Description</label>
          <Textarea
            v-model="form.description"
            placeholder="Description"
            rows="5"
            cols="30"
            class="full-width-textarea"
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
          severity="success"
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
const { createOrganization, createLink } = useApi();

// const supabase = useSupabaseClient();
const form = ref({});

const submit = async () => {
  console.log("Submit");
  console.log(form.value);

  try {
    form.value.code = Math.floor(1000 + Math.random() * 9000);
    const fields = JSON.parse(JSON.stringify(form.value));
    // console.log(fields);
    const data = await createOrganization(fields);

    const fields_link = {
      profile_id: JSON.parse(localStorage.getItem("sb_org_id")).profile_id,
      organization_id: data[0].id,
    };

    // console.log(fields_link);

    const result = await createLink(fields_link);
    console.log(result);
    showToast(toast, {
      severity: "success",
      summary: "Success",
      detail: "Authorized access",
      life: 3000,
    });

    navigateTo("/admin/organizations");
  } catch (error) {
    console.error(error);
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
