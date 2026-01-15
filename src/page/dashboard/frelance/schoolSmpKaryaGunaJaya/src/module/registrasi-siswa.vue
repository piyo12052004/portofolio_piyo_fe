<template>
  <div class="">
    <table class="min-w-full border-separate border-spacing-0">
      <tbody class="text-sm text-slate-700">
        <tr>
          <td class="td-border-run bg-grid p-4" colspan="3">
            <svg class="border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect x="0.5" y="0.5" width="99" height="99" />
            </svg>
            <ScrollPanel style="width: 100%; height: 200px">
              <Card>
                <template #title> Student Login & Registration Information </template>

                <template #content>
                  <p class="m-0 leading-relaxed text-slate-600">
                    The student login and registration feature was developed using
                    <b>Laravel Blade</b> as the templating engine, with
                    <b>database</b> integration for user data storage and management. The
                    entire authentication and registration flow was designed based on
                    client requirements, supported by a modern, intuitive, and
                    user-friendly interface (UI).
                  </p>

                  <p class="mt-3 text-sm text-slate-500">
                    Developed by <b>Piyo Aswandi</b>
                  </p>
                </template>
              </Card>
            </ScrollPanel>
          </td>
        </tr>
        <tr>
          <td class="td-border-run bg-grid p-4" style="height: 50px">
            <svg class="border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect x="0.5" y="0.5" width="99" height="99" />
            </svg>
          </td>
          <td class="td-border-run" style="width: 90%">
            <svg class="border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect x="0.5" y="0.5" width="99" height="99" />
            </svg>
            <div>
              <InformasiPendaftaran />
            </div>
          </td>

          <td class="td-border-run bg-grid p-4" style="height: 50px">
            <svg class="border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect x="0.5" y="0.5" width="99" height="99" />
            </svg>

            <div class="relative z-10 rounded-xl">
              <!-- <p class="font-semibold">Info Alur Pendaftaran</p> -->
            </div>
          </td>
        </tr>

        <tr>
          <td class="td-border-run bg-grid p-4" colspan="3">
            <svg class="border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect x="0.5" y="0.5" width="99" height="99" />
            </svg>

            <div>
              <div class="card flex flex-wrap gap-4">
                <Button
                  @click="togelFeature('login')"
                  label="Login"
                  severity="info"
                  rounded
                />
                <Button
                  @click="togelFeature('registrasi')"
                  label="Registrasi"
                  severity="info"
                  rounded
                />
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td class="td-border-run bg-grid p-4">
            <svg class="border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect x="0.5" y="0.5" width="99" height="99" />
            </svg>
          </td>

          <td class="td-border-run p-4">
            <svg class="border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect x="0.5" y="0.5" width="99" height="99" />
            </svg>

            <div>
              <div>
                <component :is="activeComponent" />
              </div>
            </div>
          </td>
          <td class="td-border-run bg-grid p-4">
            <svg class="border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect x="0.5" y="0.5" width="99" height="99" />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef } from "vue";
import InformasiPendaftaran from "@src/page/dashboard/frelance/component/karyagunajaya/informasi-pendaftaran.vue";
import Login from "@src/page/dashboard/frelance/component/karyagunajaya/page-login.vue";
import Registrasi from "@src/page/dashboard/frelance/component/karyagunajaya/page-registrasi.vue";

// primevue
import ScrollPanel from "primevue/scrollpanel";
import Button from "primevue/button";
import Card from "primevue/card";

/* 🔥 STATE UNTUK HALAMAN AKTIF */
const activeComponent = shallowRef<any>(Login);

/* 🔥 TOGGLE FEATURE */
const togelFeature = (type: "login" | "registrasi") => {
  if (type === "login") {
    activeComponent.value = Login;
  }

  if (type === "registrasi") {
    activeComponent.value = Registrasi;
  }
};
</script>

<style lang="scss" scoped>
.td-border-run {
  position: relative;
  border: 1px solid rgba(137, 26, 162, 0.15);
  overflow: hidden;
  background: #ffffff;

  /* supaya konten aman */
  > *:not(.border-svg) {
    position: relative;
    z-index: 1;
  }
}

/* SVG overlay */
.border-svg {
  position: absolute;
  inset: -1px;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  pointer-events: none;
  z-index: 2;
}

/* BORDER PATH */
.border-svg rect {
  fill: none;
  stroke: rgba(137, 26, 162, 0.15);
  stroke-width: 0.2;

  /* garis panjang berjalan */
  stroke-dasharray: 80 20;
  stroke-dashoffset: 0;

  opacity: 0;
  transition: opacity 0.25s ease;
}

/* hover aktif */
.td-border-run:hover .border-svg rect {
  opacity: 1;
  animation: border-walk 1.4s linear infinite;
}

.bg-grid {
  background-color: #ffffff;
  background-image: linear-gradient(rgba(137, 26, 162, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(137, 26, 162, 0.15) 1px, transparent 1px);
  background-size: 40px 80px;
}

/* animasi muter */
@keyframes border-walk {
  to {
    stroke-dashoffset: -100;
  }
}
.my-app-dark {
  .td-border-run {
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: #020617; // slate-950
  }

  .border-svg rect {
    stroke: rgba(96, 165, 250, 0.9); // blue-400
  }

  .td-border-run:hover .border-svg rect {
    opacity: 1;
  }

  /* konten dalam td */
  .td-border-run .bg-slate-50 {
    background: #0f172a; // slate-900
    color: #e5e7eb;
  }

  .td-border-run p {
    color: #e5e7eb;
  }

  .td-border-run .text-slate-500 {
    color: #94a3b8;
  }

  .bg-grid {
    background-image: linear-gradient(rgba(137, 26, 162, 0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(137, 26, 162, 0.15) 1px, transparent 1px);
    background-size: 40px 80px;
  }

  .td-border-run img {
    filter: brightness(0.85) contrast(1.05);
  }
}

@media (max-width: 640px) {
  table {
    display: block;
    width: 100%;
  }

  tbody {
    display: block;
  }

  tr {
    display: block;
    margin-bottom: 1rem;
  }

  td {
    display: block;
    width: 100% !important;
    box-sizing: border-box;
  }

  /* td tinggi kecil jadi auto */
  td[style*="height"] {
    height: auto !important;
  }

  /* padding lebih ramah mobile */
  .td-border-run {
    padding: 1rem !important;
    border-radius: 0.75rem;
  }

  /* SVG border jangan overflow */
  .border-svg {
    inset: 0;
  }

  /* ScrollPanel lebih pendek di mobile */
  .p-scrollpanel {
    height: 160px !important;
  }

  /* tombol center & wrap */
  .card.flex {
    justify-content: center;
  }
}
</style>
