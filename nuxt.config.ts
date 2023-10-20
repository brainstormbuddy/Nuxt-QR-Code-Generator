// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-primevue"],
  css: ["primevue/resources/themes/lara-light-teal/theme.css"],
  primevue: {
    /* Options */
    usePrimeVue: true,

    components: {
      include: ["Button", "DataTable"],
    },
  },
});
