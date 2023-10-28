<template>
  <div class="card">
    <Card>
      <template #title>
        {{ code.name }}
      </template>
      <template #content>
        <div class="grid text-center">
          <div class="col-12 lg:col-3 md:col-4">
            <Chip :label="code.state" :class="style" />
            <br />
            <img :src="code.datas" alt="QR Code" id="qr-code" />
            <br />
            <span class="p-buttonset mt-2" v-if="code.state == 'pending'">
              <Button label="Share" icon="pi pi-share-alt" @click="share" />
              <Button
                label="Download"
                icon="pi pi-download"
                @click="download"
              />
            </span>
          </div>
          <div class="col-12 lg:col-9 md:col-8">
            <h2 class="text-gray-500">
              {{ code.just_once == true ? "Single use" : "Repeated" }}
            </h2>
            <h3>
              <span class="line">Start Date</span>
              <span class="line">{{ code.start_date }}</span>
            </h3>
            <h3
              class="text-primary"
              v-if="code.state == 'used' && code.just_once == true"
            >
              <span class="line">Used</span>
              <span class="line">{{ code.approved_date }}</span>
              <span class="line text-primary"></span>
            </h3>
            <h3>
              <span class="line">Due Date</span>
              <span class="line">{{ code.end_date }}</span>
              <span class="line text-primary"></span>
            </h3>
            <Button
              label="Delete"
              icon="pi pi-trash"
              severity="danger"
              v-if="code.state == 'pending'"
              @click="deleted"
            />
          </div>
        </div>
      </template>
      <template #footer></template>
    </Card>
  </div>
</template>
<script setup>
const config = useRuntimeConfig();
const props = defineProps({
  code: {
    type: Object,
    default: {},
  },
});

const session_id = ref();
const user_id = ref("");
const link = ref("");
session_id.value = await JSON.parse(
  localStorage.getItem(`${config.public.SUPABASE_SB}`)
);
user_id.value = session_id.value.user.id;
user_id.value = user_id.value.split("-")[0];
link.value = JSON.parse(localStorage.getItem("sb_org_id"));

const formatDate = (date) => {
  const d = new Date(date);
  const new_date = d.toISOString().slice(0, 10);
  const new_hours = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${new_date} ${new_hours}`;
};
props.code.start_date = formatDate(props.code.start_date);
props.code.end_date = formatDate(props.code.end_date);

const style = ref("bg-primary text-white mb-2");
if (props.code.state == "pending") {
  style.value = "bg-primary-600 text-white mb-2";
} else if (props.code.state == "overdue") {
  style.value = "bg-warning text-white mb-2";
} else if (props.code.state == "used") {
  style.value = "bg-blue-600 text-white mb-2";
} else {
  style.value = "bg-red-600 text-white mb-2";
}

const share = async () => {
  console.log("Share");
  const url = `${config.public.APP_URL_BASE}/admin/codes/${props.code.id}/?link=${link.value.code}&u=${user_id.value}`;
  console.log(url);
  if (navigator.share) {
    await navigator.share({
      title: props.code.name,
      text: `QR generated for access to organization, from 2023-10-10 to 2023-10-12`,
      url: url,
    });
  }
};

const download = () => {
  console.log("Download");
  console.log(props.code.datas);
  //   console.log(props.code.datas._value);
  var source = props.code.datas;

  var a = document.createElement("a");

  a.download = `QR_AMOSO_${props.code.id}.png`;
  a.target = "_blank";
  a.href = source;

  a.click();
  //
  //   const element_image = props.code.datas;
  //   if (element_image != undefined) {
  //     // Crear un elemento de lienzo para dibujar la imagen
  //     const canvas = document.createElement("canvas");
  //     const context = canvas.getContext("2d");
  //     canvas.width = element_image.width;
  //     canvas.height = element_image.height;
  //     context.drawImage(element_image, 0, 0);

  //     // Obtener la URL de datos de la imagen en formato PNG
  //     const urlDatosImagen = canvas.toDataURL("image/png");

  //     // Crear un enlace de descarga y simular un clic
  //     const enlaceDescarga = document.createElement("a");
  //     enlaceDescarga.href = urlDatosImagen;
  //     enlaceDescarga.download = "mi_imagen.png";
  //     enlaceDescarga.click();
  //   }
};

const deleted = async () => {
  console.log("Deleted");
};
</script>
<style scoped>
.line {
  display: block;
}

.bg-warning {
  background-color: #f59e0b !important;
}
</style>
