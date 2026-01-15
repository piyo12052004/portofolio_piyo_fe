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
  <!-- ================= DESTOP LAYOUT ================= -->
  <div class="hidden md:block">
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
                  <button
                    class="submenu__button"
                    @click.stop="openPage('berita', Berita)"
                  >
                    <i class="pi pi-file-edit"></i>
                    <span>Berita</span>
                  </button>
                </li>

                <!-- Galery -->
                <li class="submenu__item" :class="{ active: activeKey === 'galery' }">
                  <button
                    class="submenu__button"
                    @click.stop="openPage('galery', Galery)"
                  >
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
  </div>
  <!-- ================= MOBILE LAYOUT ================= -->

  <div class="block md:hidden">
    <!-- ===== TOPBAR ===== -->
    <nav class="fixed top-12 left-0 z-20 w-full h-14 bg-white border-b border-slate-200">
      <div class="h-full px-3 flex items-center justify-between">
        <!-- LEFT -->
        <Button
          icon="pi pi-align-justify"
          severity="secondary"
          variant="text"
          class="!p-2"
          @click="toggleSidebar"
        />

        <!-- RIGHT -->
        <div style="margin-top: 10px">
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
      </div>
    </nav>

    <!-- ===== OVERLAY ===== -->
    <div
      v-show="isSidebarOpen"
      class="fixed inset-0 z-10 bg-black/40"
      @click="toggleSidebar"
    />

    <!-- ===== SIDEBAR ===== -->
    <aside
      class="fixed top-26 left-0 z-20 w-64 h-screen bg-white border-r border-slate-200 transition-transform duration-300"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="h-full px-3 py-4 overflow-y-auto">
        <!-- BRAND -->
        <div class="flex items-center gap-3 mb-6">
          <div class="brand__logo">{{ initialName }}</div>
          <div class="leading-tight">
            <div class="text-sm font-semibold">
              {{ props.subTitle || "Dashboard" }}
            </div>
            <div class="text-[11px] text-slate-500 truncate max-w-[160px]">
              {{ session?.email }}
            </div>
          </div>
        </div>

        <!-- MENU -->
        <ul class="space-y-1 text-sm font-medium">
          <!-- DASHBOARD -->
          <li>
            <button
              class="flex items-center w-full px-3 py-2 rounded-md hover:bg-slate-100 transition"
              :class="activeKey === 'dashboard' ? 'bg-slate-100 font-semibold' : ''"
              @click="openPage('dashboard', Dashboard)"
            >
              <i class="pi pi-home mr-3 text-base"></i>
              <span>Dashboard</span>
            </button>
          </li>

          <hr class="my-2 border-slate-200" />

          <!-- MODULE -->
          <li>
            <!-- PARENT -->
            <button
              class="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-slate-100 transition"
              @click="toggle('module')"
            >
              <div class="flex items-center">
                <i class="pi pi-sliders-h mr-3"></i>
                <span>Module</span>
              </div>
              <i
                class="pi pi-chevron-down text-xs transition-transform"
                :class="openModule ? 'rotate-180' : ''"
              />
            </button>

            <!-- SUBMENU -->
            <ul v-show="openModule" class="mt-1 ml-6 space-y-1 border-l pl-3">
              <!-- Landing -->
              <li>
                <button
                  class="flex items-center w-full px-3 py-2 rounded-md hover:bg-slate-100 transition"
                  :class="activeKey === 'landing' ? 'bg-slate-100 font-semibold' : ''"
                  @click="openPage('landing', LandingPage)"
                >
                  <i class="pi pi-globe mr-3 text-sm"></i>
                  <span>Landing Page</span>
                </button>
              </li>

              <!-- Registrasi -->
              <li>
                <button
                  class="flex items-center w-full px-3 py-2 rounded-md hover:bg-slate-100 transition"
                  :class="activeKey === 'registrasi' ? 'bg-slate-100 font-semibold' : ''"
                  @click="openPage('registrasi', RegistrasiSiswa)"
                >
                  <i class="pi pi-user-plus mr-3 text-sm"></i>
                  <span>Student Registration</span>
                </button>
              </li>

              <!-- SUPER ADMIN -->
              <li>
                <button
                  class="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-slate-100 transition"
                  @click="toggle('superadmin')"
                >
                  <div class="flex items-center">
                    <i class="pi pi-shield mr-3 text-sm"></i>
                    <span>Super Admin</span>
                  </div>
                  <i
                    class="pi pi-chevron-down text-xs transition-transform"
                    :class="openSuperadmin ? 'rotate-180' : ''"
                  />
                </button>

                <!-- SUPER ADMIN CHILD -->
                <ul v-show="openSuperadmin" class="mt-1 ml-4 space-y-1 border-l pl-3">
                  <li
                    v-for="item in [
                      {
                        key: 'dashboard',
                        label: 'Dashboard',
                        icon: 'pi-home',
                        comp: superadminDashboard,
                      },
                      {
                        key: 'berita',
                        label: 'Berita',
                        icon: 'pi-file-edit',
                        comp: Berita,
                      },
                      { key: 'galery', label: 'Galery', icon: 'pi-images', comp: Galery },
                      {
                        key: 'unggulan',
                        label: 'Program Unggulan',
                        icon: 'pi-star',
                        comp: Unggulan,
                      },
                      {
                        key: 'pengguna',
                        label: 'Pengguna',
                        icon: 'pi-users',
                        comp: Pengguna,
                      },
                      {
                        key: 'fasilitas',
                        label: 'Fasilitas',
                        icon: 'pi-building',
                        comp: PageFasilitas,
                      },
                      {
                        key: 'pesan',
                        label: 'Pesan',
                        icon: 'pi-envelope',
                        comp: PagePesan,
                      },
                    ]"
                    :key="item.key"
                  >
                    <button
                      class="flex items-center w-full px-3 py-2 rounded-md hover:bg-slate-100 transition"
                      :class="activeKey === item.key ? 'bg-slate-100 font-semibold' : ''"
                      @click.stop="openPage(item.key as any, item.comp)"
                    >
                      <i :class="['pi', item.icon, 'mr-3 text-sm']"></i>
                      <span>{{ item.label }}</span>
                    </button>
                  </li>
                </ul>
              </li>

              <!-- PEMBAYARAN -->
              <li>
                <button
                  class="flex items-center w-full px-3 py-2 rounded-md hover:bg-slate-100 transition"
                  :class="
                    activeKey === 'pembayaran-ppdb' ? 'bg-slate-100 font-semibold' : ''
                  "
                  @click="openPage('pembayaran-ppdb', PagePembayaran)"
                >
                  <i class="pi pi-wallet mr-3 text-sm"></i>
                  <span>Pembayaran PPDB</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>

    <!-- ===== CONTENT ===== -->
    <main class="pt-24 p-4">
      <component :is="activeComponent" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use "@src/assets/scss/karyaGunaJaya/seedbar.scss";
</style>
