<template>
  <div class="card">
    <Card>
      <template #title>
        <div class="text-center">{{ user.name }}</div>
      </template>
      <template #content>
        <div class="grid">
          <div class="col-12 lg:col-2 text-center">
            <Avatar
              :label="user.name[0]"
              class="mr-2"
              size="xlarge"
              style="background-color: #10b981; color: #ffffff"
            />
          </div>
          <div class="col-12 lg:col-10">
            <span class="line">
              <strong>Profile ID: </strong>
              {{ user.id }}
            </span>
            <span class="line">
              <strong>Name: </strong>
              {{ user.name }}
            </span>
            <span class="line">
              <strong>Email: </strong>
              {{ user.email }}
            </span>
            <span class="line">
              <strong>Role: </strong>
              {{ user.role }}
            </span>
            <span class="line">
              <strong>active: </strong>
              {{ user.is_active }}
            </span>
            <span class="line">
              <strong>User ID: </strong>
              {{ user.user_id }}
            </span>
            <span class="line">
              <strong>created: </strong>
              {{ user.created_at }}
            </span>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="grid text-center">
          <div class="col-12">
            <div class="card">
              <h3>Organizations</h3>
              <users-list-link-to-organizations :user_id="user.user_id" />
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
<script setup>
const props = defineProps({
  user: {
    type: Object,
    default: {},
  },
});
</script>
<style scoped>
.line {
  display: block;
}
</style>
