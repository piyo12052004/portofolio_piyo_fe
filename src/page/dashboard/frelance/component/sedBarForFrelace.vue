<script setup lang="ts">
import { ref, computed, watch, shallowRef } from "vue";
import * as H from "@src/utils/Helper";

// PAGES / MODULES
import Dashboard from "../schoolSmpKaryaGunaJaya/src/dashboard.vue";
import LandingPage from "../schoolSmpKaryaGunaJaya/src/module/landing-page.vue";
import RegistrasiSiswa from "../schoolSmpKaryaGunaJaya/src/module/registrasi-siswa.vue";
import superadminDashboard from "../schoolSmpKaryaGunaJaya/src/module/dashboard-superadmin.vue";
import Berita from "../schoolSmpKaryaGunaJaya/src/module/page-berita.vue";
import Galery from "../schoolSmpKaryaGunaJaya/src/module/page-galery.vue";
import Unggulan from "../schoolSmpKaryaGunaJaya/src/module/page-ungulan.vue";
import Pengguna from "../schoolSmpKaryaGunaJaya/src/module/page-pengguna.vue";
import PageFasilitas from "../schoolSmpKaryaGunaJaya/src/module/page-fasilitas.vue";
// import Taks from "../schoolSmpKaryaGunaJaya/src/taks.vue";

// primevue
import Button from "primevue/button";
import PagePesan from "../schoolSmpKaryaGunaJaya/src/module/page-pesan.vue";
import PagePembayaran from "../schoolSmpKaryaGunaJaya/src/module/page-pembayaran.vue";

/* =============================
     PROPS
  ============================= */
const props = withDefaults(
  defineProps<{
    subTitle?: string;
    title?: string;
    is_token?: boolean;
    is_verifikasi_token?: boolean;
  }>(),
  {
    subTitle: "",
    title: "",
    is_token: false,
    is_verifikasi_token: false,
  }
);

/* =============================
     SESSION
  ============================= */
const session = JSON.parse(localStorage.getItem("user_session") || "null");

/* =============================
     SIDEBAR STATE
  ============================= */
const isSidebarOpen = ref(true);

const openModule = ref(true);
const openManagement = ref(false);
const openSchedule = ref(false);
const openSuperadmin = ref(true);

/* =============================
     ACTIVE PAGE
  ============================= */
type ActiveKey =
  | "dashboard"
  | "berita"
  | "galery"
  | "unggulan"
  | "pengguna"
  | "fasilitas"
  | "pesan"
  | "pembayaran-ppdb"
  | "tasks"
  | "landing"
  | "registrasi"
  | "user-management"
  | "role-permission"
  | "system-settings";

const activeKey = ref<ActiveKey>("dashboard");
const activeComponent = shallowRef<any>(Dashboard);

/* =============================
     METHODS
  ============================= */
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function toggle(key: "module" | "management" | "schedule" | "superadmin") {
  if (key === "module") openModule.value = !openModule.value;
  if (key === "management") openManagement.value = !openManagement.value;
  if (key === "schedule") openSchedule.value = !openSchedule.value;
  if (key === "superadmin") openSuperadmin.value = !openSuperadmin.value;
}

function openPage(key: ActiveKey, component: any) {
  if (props.is_token || props.is_verifikasi_token) {
    H.alert(
      "warning",
      "Access Denied",
      "You do not have permission to access this feature"
    );
    return;
  }
  activeKey.value = key;
  activeComponent.value = component;
}

/* =============================
     USER INITIAL
  ============================= */
const initialName = computed(() => {
  if (!session?.nama_lengkap) return "?";
  return session.nama_lengkap.trim().charAt(0).toUpperCase();
});

/* =============================
     WATCHER
  ============================= */
watch(isSidebarOpen, (val) => {
  if (!val) {
    openModule.value = false;
    openManagement.value = false;
    openSchedule.value = false;
  }
});
</script>

<template>
  <div class="layout">
    <!-- ================= SIDEBAR ================= -->
    <aside class="sidebar" :class="{ 'sidebar--closed': !isSidebarOpen }">
      <!-- BRAND -->
      <div class="brand">
        <div class="brand__logo">{{ initialName }}</div>
        <div class="brand__text">
          <div class="brand__title">{{ props.subTitle }}</div>
          <div class="brand__sub">{{ session?.email }}</div>
        </div>
      </div>

      <!-- MENU -->
      <ul class="menu">
        <!-- DASHBOARD -->
        <li
          class="menu__item"
          :class="{ 'menu__item--active': activeKey === 'dashboard' }"
          @click="openPage('dashboard', Dashboard)"
        >
          <i class="pi pi-home"></i>
          <span>Dashboard</span>
        </li>

        <!-- TASKS -->
        <!-- <li
          class="menu__item"
          :class="{ 'menu__item--active': activeKey === 'tasks' }"
          @click="openPage('tasks', Taks)"
        >
          <i class="pi pi-check-square"></i>
          <span>Tasks</span>
        </li> -->

        <hr class="menu__divider" />

        <!-- MODULE -->
        <li class="menu__group">
          <button class="menu__accordion" @click="toggle('module')">
            <span class="menu__accordion-left">
              <i class="pi pi-sliders-h"></i>
              <span>Module</span>
            </span>
            <i class="pi pi-chevron-down" :class="{ rotate: openModule }"></i>
          </button>

          <ul class="submenu" v-show="openModule">
            <!-- Landing -->
            <li class="submenu__item" :class="{ active: activeKey === 'landing' }">
              <button class="submenu__button" @click="openPage('landing', LandingPage)">
                <i class="pi pi-globe"></i>
                <span>Landing Page</span>
              </button>
            </li>

            <!-- Registrasi -->
            <li class="submenu__item" :class="{ active: activeKey === 'registrasi' }">
              <button
                class="submenu__button"
                @click="openPage('registrasi', RegistrasiSiswa)"
              >
                <i class="pi pi-user-plus"></i>
                <span>Student Registration</span>
              </button>
            </li>

            <!-- Super Admin (Accordion) -->
            <li
              class="submenu__item submenu__item--accordion"
              :class="{ active: openSuperadmin }"
            >
              <button
                class="submenu__button submenu__button--accordion"
                @click="toggle('superadmin')"
              >
                <span class="submenu__item-left">
                  <i class="pi pi-shield"></i>
                  <span>Super Admin</span>
                </span>
                <i class="pi pi-chevron-down" :class="{ rotate: openSuperadmin }"></i>
              </button>
            </li>

            <!-- Super Admin Child -->
            <ul class="submenu submenu--child" v-show="openSuperadmin">
              <!-- Dashboard -->
              <li class="submenu__item" :class="{ active: activeKey === 'dashboard' }">
                <button
                  class="submenu__button"
                  @click.stop="openPage('dashboard', superadminDashboard)"
                >
                  <i class="pi pi-home"></i>
                  <span>Dashboard</span>
                </button>
              </li>

              <!-- Berita -->
              <li class="submenu__item" :class="{ active: activeKey === 'berita' }">
                <button class="submenu__button" @click.stop="openPage('berita', Berita)">
                  <i class="pi pi-file-edit"></i>
                  <span>Berita</span>
                </button>
              </li>

              <!-- Galery -->
              <li class="submenu__item" :class="{ active: activeKey === 'galery' }">
                <button class="submenu__button" @click.stop="openPage('galery', Galery)">
                  <i class="pi pi-images"></i>
                  <span>Galery</span>
                </button>
              </li>

              <!-- Program Unggulan -->
              <li class="submenu__item" :class="{ active: activeKey === 'unggulan' }">
                <button
                  class="submenu__button"
                  @click.stop="openPage('unggulan', Unggulan)"
                >
                  <i class="pi pi-star"></i>
                  <span>Program Unggulan</span>
                </button>
              </li>

              <!-- Pengguna -->
              <li class="submenu__item" :class="{ active: activeKey === 'pengguna' }">
                <button
                  class="submenu__button"
                  @click.stop="openPage('pengguna', Pengguna)"
                >
                  <i class="pi pi-users"></i>
                  <span>Pengguna</span>
                </button>
              </li>

              <!-- Fasilitas -->
              <li class="submenu__item" :class="{ active: activeKey === 'fasilitas' }">
                <button
                  class="submenu__button"
                  @click.stop="openPage('fasilitas', PageFasilitas)"
                >
                  <i class="pi pi-building"></i>
                  <span>Fasilitas</span>
                </button>
              </li>

              <!-- Pesan -->
              <li class="submenu__item" :class="{ active: activeKey === 'pesan' }">
                <button
                  class="submenu__button"
                  @click.stop="openPage('pesan', PagePesan)"
                >
                  <i class="pi pi-envelope"></i>
                  <span>Pesan</span>
                </button>
              </li>
            </ul>
            <li class="submenu__item" :class="{ active: activeKey === 'registrasi' }">
              <button
                class="submenu__button"
                @click="openPage('pembayaran-ppdb', PagePembayaran)"
              >
                <i class="pi pi-user-plus"></i>
                <span>Pembayaran PPDB</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </aside>

    <!-- ================= MAIN ================= -->
    <div class="main">
      <header class="topbar">
        <div>
          <button class="topbar__btn" @click="toggleSidebar">☰</button>
          <span class="topbar__title" style="margin-left: 10px">{{
            props.title || "Dashboard"
          }}</span>
        </div>
        <div style="margin-right: 20px">
          <Button
            as="a"
            label="Repository PPDB Sekolah"
            variant="text"
            severity="contrast"
            icon="pi pi-github"
            href="https://github.com/piyo12052004/frelance_ppdb_sekolah"
            target="_blank"
            rel="noopener"
          />
          <!-- <a href="https://github.com/piyo12052004/frelance_ppdb_sekolah" target="blank">
            <i class="pi pi-github" style="font-size: 2rem"></i> Repository PPDB Sekolah
          </a> -->
        </div>
      </header>

      <main class="content">
        <!-- 🔥 DYNAMIC PAGE -->
        <component :is="activeComponent" />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@src/assets/scss/karyaGunaJaya/seedbar.scss";
</style>
