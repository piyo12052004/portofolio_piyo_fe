<template>
  <!-- =======================
       CONTRIBUTIONS
  ======================== -->
  <section class="min-h-[40vh] bg-surface-0 dark:bg-surface-900 px-6 py-10">
    <div class="w-full space-y-6">
      <!-- Header -->
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
            Contributions
          </h2>
          <p class="text-sm text-surface-600 dark:text-surface-300">
            LinkedIn profiles involved in this project collaboration
          </p>
        </div>

        <span
          class="inline-flex items-center gap-2 rounded-full border border-surface-200 px-3 py-1 text-xs text-surface-600 dark:text-surface-200 dark:border-surface-700"
        >
          <i class="pi pi-linkedin"></i>
          Verified Profiles
        </span>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- Ikhsan -->
        <div
          class="rounded-2xl border border-surface-200 bg-surface-50 p-5 shadow-sm transition hover:shadow-md dark:bg-surface-800 dark:border-surface-700"
        >
          <div class="flex items-center gap-3">
            <div
              class="h-12 w-12 overflow-hidden rounded-xl border border-surface-200 bg-white dark:bg-surface-700"
            >
              <img
                src="@src/assets/img/linkedin-ihksan.jpeg"
                class="h-full w-full object-cover"
                alt="Ikhsan Adriansyah"
              />
            </div>

            <div class="flex-1">
              <p class="font-semibold text-surface-900 dark:text-surface-0">
                Ikhsan Adriansyah
              </p>
              <p class="text-xs text-surface-600 dark:text-surface-300">
                LinkedIn Profile
              </p>
            </div>
          </div>

          <p class="mt-4 text-sm text-surface-700 dark:text-surface-200 break-all">
            linkedin.com/in/ikhsanadriansyah
          </p>

          <div class="mt-4 flex items-center gap-2">
            <Button
              label="Open"
              icon="pi pi-external-link"
              class="!rounded-xl"
              @click="openLink(links.ikhsan)"
            />
            <Button
              label="Copy"
              icon="pi pi-copy"
              severity="secondary"
              class="!rounded-xl"
              @click="copyLink(links.ikhsan)"
            />
          </div>
        </div>

        <!-- Piyo -->
        <div
          class="rounded-2xl border border-surface-200 bg-surface-50 p-5 shadow-sm transition hover:shadow-md dark:bg-surface-800 dark:border-surface-700"
        >
          <div class="flex items-center gap-3">
            <div
              class="h-12 w-12 overflow-hidden rounded-xl border border-surface-200 bg-white dark:bg-surface-700"
            >
              <img
                src="@src/assets/img/piyo.png"
                class="h-full w-full object-cover"
                alt="Piyo Aswandi"
              />
            </div>

            <div class="flex-1">
              <p class="font-semibold text-surface-900 dark:text-surface-0">
                Piyo Aswandi
              </p>
              <p class="text-xs text-surface-600 dark:text-surface-300">
                LinkedIn Profile
              </p>
            </div>
          </div>

          <p class="mt-4 text-sm text-surface-700 dark:text-surface-200 break-all">
            linkedin.com/in/piyo-aswandi-3477812a0
          </p>

          <div class="mt-4 flex items-center gap-2">
            <Button
              label="Open"
              icon="pi pi-external-link"
              class="!rounded-xl"
              @click="openLink(links.piyo)"
            />
            <Button
              label="Copy"
              icon="pi pi-copy"
              severity="secondary"
              class="!rounded-xl"
              @click="copyLink(links.piyo)"
            />
          </div>
        </div>
      </div>

      <!-- Info -->
      <div
        class="rounded-2xl border border-surface-200 p-4 text-sm text-surface-700 dark:bg-surface-900 dark:border-surface-700 dark:text-surface-200"
      >
        <div class="flex items-start gap-3 dark:bg-surface-900">
          <i class="pi pi-info-circle mt-0.5 text-surface-500"></i>
          <p>
            The profiles above represent contributors involved in this project. You may
            open or copy the LinkedIn links for reference.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- =======================
       DOCUMENTATION
  ======================== -->
  <section class="bg-surface-50 dark:bg-surface-900 px-6 py-12">
    <div class="mx-auto space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
          Project Documentation
        </h3>
        <p class="text-sm text-surface-600 dark:text-surface-300">
          The images below are screenshots and visual documentation of the Karya Guna Jaya.
        </p>
      </div>

      <!-- Gallery -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(img, i) in images"
          :key="i"
          class="group overflow-hidden rounded-xl border border-surface-200 bg-white shadow-sm dark:bg-surface-800 dark:border-surface-700"
        >
          <img
            :src="img"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
            alt="Karya Guna Jaya Documentation"
            @click="openImagePreview(i)"
          />
        </div>
      </div>

      <div
        class="rounded-xl border border-surface-200 p-4 text-xs text-surface-600 dark:bg-surface-900 dark:border-surface-700 dark:text-surface-300"
      >
        <i class="pi pi-image mr-1"></i>
        All images shown above are part of project documentation.
      </div>
    </div>
  </section>

  <!-- =======================
       IMAGE PREVIEW DIALOG
  ======================== -->
  <Dialog
    v-model:visible="showImagePreview"
    modal
    dismissableMask
    :style="{ width: '85vw', maxWidth: '1000px' }"
    contentClass="p-0"
  >
    <div class="relative flex items-center justify-center bg-black">
      <!-- LEFT -->
      <button
        v-if="currentIndex > 0"
        class="absolute left-4 z-10 rounded-full bg-black/60 p-3 text-white hover:bg-black"
        @click="prevImage"
      >
        <i class="pi pi-chevron-left text-xl"></i>
      </button>

      <!-- IMAGE -->
      <img
        :src="images[currentIndex]"
        class="max-h-[80vh] w-auto object-contain"
        alt="Preview"
      />

      <!-- RIGHT -->
      <button
        v-if="currentIndex < images.length - 1"
        class="absolute right-4 z-10 rounded-full bg-black/60 p-3 text-white hover:bg-black"
        @click="nextImage"
      >
        <i class="pi pi-chevron-right text-xl"></i>
      </button>
    </div>

    <div class="bg-black px-4 py-2 text-center text-xs text-white/80">
      Image {{ currentIndex + 1 }} of {{ images.length }}
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import * as H from "@src/utils/Helper";

/* IMAGE IMPORTS */
import img1 from "@src/assets/img/kgj/landing-page.png";
import img2 from "@src/assets/img/kgj/landing-page-2.png";
import img3 from "@src/assets/img/kgj/landing-page-3.png";
import img4 from "@src/assets/img/kgj/landing-page-4.png";
import img5 from "@src/assets/img/kgj/landing-page-5.png";
import img6 from "@src/assets/img/kgj/landing-page-6.png";
import img7 from "@src/assets/img/kgj/landing-page-7.png";
import img8 from "@src/assets/img/kgj/landing-page-8.png";
import img9 from "@src/assets/img/kgj/registrasi-1.png";
import img10 from "@src/assets/img/kgj/registrasi-2.png";
import img11 from "@src/assets/img/kgj/registrasi-3.png";
import img12 from "@src/assets/img/kgj/registrasi-4.png";
import img13 from "@src/assets/img/kgj/login.png";
import img14 from "@src/assets/img/kgj/superadmin-1.png";
import img15 from "@src/assets/img/kgj/superadmin-2.png";
import img16 from "@src/assets/img/kgj/superadmin-3.png";
import img17 from "@src/assets/img/kgj/superadmin-4.png";
import img18 from "@src/assets/img/kgj/superadmin-5.png";
import img19 from "@src/assets/img/kgj/superadmin-6.png";
import img20 from "@src/assets/img/kgj/superadmin-7.png";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
];

const links = {
  ikhsan: "https://www.linkedin.com/in/ikhsanadriansyah",
  piyo: "https://www.linkedin.com/in/piyo-aswandi-3477812a0/",
};

/* IMAGE PREVIEW STATE */
const showImagePreview = ref(false);
const currentIndex = ref(0);

function openImagePreview(index: number) {
  currentIndex.value = index;
  showImagePreview.value = true;
}

function nextImage() {
  if (currentIndex.value < images.length - 1) {
    currentIndex.value++;
  }
}

function prevImage() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}

function openLink(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

async function copyLink(url: string) {
  await navigator.clipboard.writeText(url);
  H.alert("success", "Link copied to clipboard", "Copied");
}
</script>
<style lang="scss" scoped>
@use "@src/assets/scss/karyaGunaJaya/dashboard.scss";
</style>
