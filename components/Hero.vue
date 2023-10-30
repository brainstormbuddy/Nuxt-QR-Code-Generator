<template>
  <section class="surface-section px-4 py-8 md:px-6 lg:px-8 overflow-hidden">
    <div class="flex flex-wrap">
      <article
        class="w-full mt-8 xl:mt-0 xl:mb-0 xl:w-8 flex flex-column flex-order-1 xl:flex-order-0 justify-content-center align-items-center xl:align-items-start"
      >
        <span class="text-blue-500 font-semibold text-lg mb-2"
          >Unlocking New Horizons, One Scan at a Time</span
        >
        <h2 class="font-bold text-4xl sm:text-7xl mt-0 mb-4">Amoso App</h2>
        <p class="mt-0 mb-5 text-700 line-height-3 text-xl">
          Creating secure QR codes for seamless access to your destinations.
        </p>
        <div class="flex gap-3">
          <NuxtLink to="/register">
            <Button label="Sign Up" icon="pi pi-arrow-right" size="large" />
          </NuxtLink>
          <NuxtLink to="/login">
            <Button label="Sign In" outlined size="large" />
          </NuxtLink>
        </div>
      </article>
      <div
        class="w-full xl:w-4 relative flex justify-content-center align-items-center"
      >
        <img
          src="~/assets/img/primary-qr-code-image.png"
          alt="Image"
          class="md:ml-auto block md:h-full"
          width="320px"
        />
      </div>
    </div>
  </section>
  <!-- <section
    class="surface-section px-4 py-0 lg:py-8 md:px-6 lg:px-8 overflow-hidden"
  >
    <div class="grid">
      <div class="col-12 lg:col-6 md:col-6">
        <article
          class="w-full mt-8 xl:mt-0 xl:mb-0 xl:w-8 flex flex-column flex-order-1 xl:flex-order-0 justify-content-center align-items-center xl:align-items-start"
        >
          <span class="text-blue-500 font-semibold text-lg mb-2"
            >Unlocking New Horizons, One Scan at a Time</span
          >
          <h2 class="font-bold text-4xl sm:text-7xl mt-0 mb-4">Amoso App</h2>
          <p class="mt-0 mb-5 text-700 line-height-3 text-xl">
            Creating secure QR codes for seamless access to your destinations.
          </p>
          <div class="flex gap-3">
            <Button label="Sign Up" icon="pi pi-arrow-right" />
            <Button label="Sign In" outlined />
          </div>
        </article>
      </div>
      <div class="col-12 lg:col-6 md:col-6">
        <article
          class="w-full mt-8 xl:mt-0 xl:mb-0 xl:w-8 flex flex-column flex-order-1 xl:flex-order-0 justify-content-center align-items-center xl:align-items-start"
        >
          <img
            src="~/assets/img/qr-wellcome.png"
            alt="Image"
            class="md:ml-auto block md:h-full"
            width="200px"
          />
        </article>
      </div>
    </div>
  </section> -->
</template>
<script setup></script>
<style scoped></style>
