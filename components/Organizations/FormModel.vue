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

const supabase = useSupabaseClient();
const form = ref({});

const submit = async () => {
  console.log("Submit");
  console.log(form.value);

  try {
    form.value.code = Math.floor(1000 + Math.random() * 9000);
    const fields = JSON.parse(JSON.stringify(form.value));
    console.log(fields);
    const { data, error } = await supabase
      .from("organizations")
      .insert([fields])
      .select();
    console.log(data);
    if (error) {
      showToast(toast, {
        severity: "warn",
        summary: "Failed",
        detail: `${error}`,
        life: 3000,
      });
    } else {
      showToast(toast, {
        severity: "success",
        summary: "Success",
        detail: "Authorized access",
        life: 3000,
      });

      navigateTo("/admin/organizations");
    }
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
