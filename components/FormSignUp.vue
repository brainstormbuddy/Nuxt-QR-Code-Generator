<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="submit">
      <div class="grid">
        <div class="col-12 mt-2">
          <div class="flex flex-column gap-2">
            <label for="name">Nombre</label>
            <InputText
              v-model="name"
              type="text"
              size="large"
              placeholder="Name"
            />
          </div>
        </div>
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
  </div>
</template>
<script setup>
const supabase = useSupabaseClient();

const name = ref("");
const email = ref("");
const password = ref("");

onMounted(async () => {});

const submit = async () => {
  console.log("Submit");
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) {
      console.error("Error de registro:", error);
    } else {
      console.log("Registro exitoso:", data);
      const { data: profile, error } = await supabase
        .from("profiles")
        .insert([
          { name: name.value, email: email.value, user_id: data.user.id },
        ])
        .select();
      console.log(profile);
      // Redirigir al usuario a otra página (por ejemplo, la página de inicio)
      navigateTo("/admin");
    }
  } catch (error) {
    console.error(error);
  } finally {
    console.log("finally");
  }
};
</script>
<style scoped></style>
