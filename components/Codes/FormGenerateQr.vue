<template>
  <Card>
    <template #title> Generate QR </template>
    <template #content>
      <div class="grid text-center">
        <div class="col-12">
          <img
            :src="image_qrcode"
            alt="QR Code"
            id="qr-code"
            v-if="generate == true"
          />
          <img
            :src="images[image]"
            width="150"
            alt="QR Code"
            id="qr-code"
            v-else
          />
        </div>
        <div class="col-12" v-if="generate == true">
          <Button
            label="Clear"
            icon="pi pi-refresh"
            class="ml-1 mr-1"
            severity="secondary"
            outlined
            @click="clear"
          />
          <Button label="Download" icon="pi pi-download" class="ml-1 mr-1" />
        </div>
      </div>
      <form @submit.prevent="generateQR">
        <div class="grid">
          <div class="col-12 text-center">
            <Chip
              :label="organization.name"
              icon="pi pi-flag-fill"
              class="mt-4"
            />
          </div>
          <div class="col-12 mt-2">
            <div class="flex flex-column gap-2">
              <label for="name">Guest name</label>
              <InputText
                v-model="form.name"
                type="text"
                size="large"
                placeholder="Guest name"
              />
            </div>
          </div>
          <div class="col-6 mt-2">
            <div class="flex flex-column gap-2">
              <label for="name">Start date</label>
              <Calendar
                v-model="form.start_date"
                showTime
                hourFormat="24"
                placeholder="Start date"
                class="w-full p-inputtext-lg"
              />
            </div>
          </div>
          <div class="col-6 mt-2">
            <div class="flex flex-column gap-2">
              <label for="name">End date</label>
              <Calendar
                v-model="form.end_date"
                showTime
                hourFormat="24"
                placeholder="Start date"
                class="w-full p-inputtext-lg"
              />
            </div>
          </div>
          <div class="col-12 mt-2">
            <div class="flex align-items-center">
              <Checkbox
                v-model="form.just_once"
                inputId="just_once"
                name="just_once"
                :binary="true"
              />
              <label for="just_once" class="ml-2"> Just once </label>
            </div>
          </div>
          <div class="col-12 mt-1">
            <Button
              label="Generate"
              icon="pi pi-qrcode"
              class="full-width-button"
              size="large"
              type="submit"
              :disabled="generate"
            />
          </div>
        </div>
      </form>
      <Toast />
    </template>
  </Card>
</template>
<script setup>
import QRCode from "qrcode";
import { filename } from "pathe/utils";
import { useToast } from "primevue/usetoast";
const toast = useToast();
import { showToast } from "~/utils/toast";

const config = useRuntimeConfig();
const supabase = useSupabaseClient();
const text = ref("");
const image_qrcode = ref("");

const image = "primary-qr-code-image";
const glob = import.meta.glob("~/assets/img/*.png", { eager: true });
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);
// const session_id = ref();
const form = ref({});
const organization = ref({});

const generate = ref(false);
const session_id = ref();
const user_id = ref("");

onMounted(async () => {
  organization.value = JSON.parse(localStorage.getItem("sb_org_id"));
  form.value.just_once = true;
  session_id.value = await JSON.parse(
    localStorage.getItem(`${config.public.SUPABASE_SB}`)
  );
  user_id.value = session_id.value.user.id;
  user_id.value = user_id.value.split("-")[0];
});

const generateQR = async () => {
  try {
    //
    form.value.link_id = organization.value.code;
    const fields = JSON.parse(JSON.stringify(form.value));
    console.log(fields);
    const { data, error } = await supabase
      .from("codes")
      .insert([fields])
      .select();
    //
    if (error) {
      showToast(toast, {
        severity: "warn",
        summary: "Failed",
        detail: `${error}`,
        life: 3000,
      });
    } else {
      const code_id = await data[0].id;
      text.value = `${config.public.APP_URL_BASE}/admin/codes/${code_id}/validate?link=${form.value.link_id}&u=${user_id.value}`;
      image_qrcode.value = await QRCode.toDataURL(text.value);

      const { error } = await supabase
        .from("codes")
        .update({ datas: image_qrcode.value })
        .eq("id", code_id);

      showToast(toast, {
        severity: "success",
        summary: "Success",
        detail: "Qr Code Generated",
        life: 3000,
      });

      generate.value = true;
    }
  } catch (err) {
    console.error(err);
  }
};

const clear = () => {
  generate.value = false;
  form.value = {};
};
</script>
<style scoped></style>
