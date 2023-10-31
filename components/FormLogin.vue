<template>
  <div>
    <div class="grid">
      <div class="col-12 text-center">
        <img
          src="~/assets/img/primary-qr-code-image.png"
          alt="Image"
          class="h-full"
          width="320px"
        />
      </div>
    </div>
    <form @submit.prevent="submit">
      <div class="grid">
        <div class="col-12 mt-2">
          <div class="flex flex-column gap-2">
            <label for="email">Email</label>
            <InputText
              v-model="email"
              type="email"
              size="large"
              placeholder="Email"
            />
          </div>
          <div class="col-12 mt-2">
            <div class="flex flex-column gap-2">
              <label for="password">Password</label>
              <InputText
                v-model="password"
                type="password"
                size="large"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="col-12 mt-1">
            <Button
              label="Enviar"
              icon="pi pi-send"
              class="full-width-button"
              size="large"
              type="submit"
            />
          </div>
        </div>
      </div>
    </form>
    <Toast />
  </div>
</template>
<script setup>
import { useToast } from "primevue/usetoast";
const toast = useToast();
import { showToast } from "~/utils/toast";

const supabase = useSupabaseClient();

const email = ref("");
const password = ref("");

onMounted(async () => {});

const submit = async () => {
  console.log("Submit");
  try {
    const { user, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) {
      console.error("Error de registro:", error);
      showToast(toast, {
        severity: "warn",
        summary: "Requires confirmation via email",
        detail: "Confirm your registration via email",
        life: 3000,
      });
    } else {
      showToast(toast, {
        severity: "success",
        summary: "Success",
        detail: "Authorized access",
        life: 3000,
      });
      // Redirigir al usuario a otra página (por ejemplo, la página de inicio)
      navigateTo("/admin");
    }
  } catch (error) {
    console.error(error);
    showToast(toast, {
      severity: "error",
      summary: "Failed",
      detail: `${error}`,
      life: 3000,
    });
  } finally {
    console.log("finally");
  }
};
</script>
<style scoped></style>
