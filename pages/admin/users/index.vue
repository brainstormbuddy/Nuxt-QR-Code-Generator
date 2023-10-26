<template>
  <h1>Users</h1>
  <div class="grid">
    <div class="col-12" v-for="item in users" :key="item.id">
      <users-list-model :user="item" />
    </div>
  </div>
</template>
<script setup>
const supabase = useSupabaseClient();
const users = ref([]);
definePageMeta({ layout: "admin" });
onMounted(async () => {
  const { data, error } = await supabase.from("profiles").select("*");
  users.value = data;
});
</script>
<style scoped></style>
