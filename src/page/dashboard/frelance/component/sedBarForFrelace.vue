<script setup lang="ts">
import { ref, watch, computed } from "vue";

const props = withDefaults(
  defineProps<{
    subTitle?: string;
    title?: string;
  }>(),
  {
    subTitle: "",
    title: "",
  }
);

const session = JSON.parse(localStorage.getItem("user_session") || "null");

const isSidebarOpen = ref(true);

const openRole = ref(true);
const openManagement = ref(false);
const openSchedule = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const toggle = (key: "role" | "management" | "schedule") => {
  if (key === "role") openRole.value = !openRole.value;
  if (key === "management") openManagement.value = !openManagement.value;
  if (key === "schedule") openSchedule.value = !openSchedule.value;
};

const initialName = computed(() => {
  if (!session?.nama_lengkap) return "?";
  return session.nama_lengkap.trim().charAt(0).toUpperCase();
});

// optional: kalau sidebar ditutup, tutup semua dropdown
watch(isSidebarOpen, (val) => {
  if (!val) {
    openRole.value = false;
    openManagement.value = false;
    openSchedule.value = false;
  }
});
</script>

<template>
  <!-- kasih class my-app-dark di wrapper luar atau body (lihat catatan bawah) -->
  <div class="layout">
    <!-- SIDEBAR -->
    <aside class="sidebar" :class="{ 'sidebar--closed': !isSidebarOpen }">
      <div class="brand">
        <div class="brand__logo">
          {{ initialName }}
        </div>
        <div class="brand__text">
          <div class="brand__title">{{ props.subTitle }}</div>
          <div class="brand__sub">{{ session?.email }}</div>
        </div>
      </div>

      <ul class="menu">
        <li class="menu__item menu__item--active">
          <i class="pi pi-home"></i>
          <span>Dashboard</span>
        </li>

        <li class="menu__item">
          <i class="pi pi-check-square"></i>
          <span>Tasks</span>
        </li>

        <li class="menu__item">
          <i class="pi pi-bars"></i>
          <span>Kanban Board</span>
        </li>

        <li class="menu__item">
          <i class="pi pi-chart-line"></i>
          <span>Project Monitoring</span>
        </li>

        <li class="menu__item">
          <i class="pi pi-th-large"></i>
          <span>Custom Dashboard</span>
        </li>

        <hr class="menu__divider" />

        <!-- Role Dashboards (Accordion) -->
        <li class="menu__group">
          <button class="menu__accordion" type="button" @click="toggle('role')">
            <span class="menu__accordion-left">
              <i class="pi pi-sliders-h"></i>
              <span>Role Dashboards</span>
            </span>

            <i class="pi pi-chevron-down" :class="{ rotate: openRole }"></i>
          </button>

          <ul class="submenu" v-show="openRole">
            <li class="submenu__item">
              <i class="pi pi-users is-blue"></i><span>Human Resource</span>
            </li>
            <li class="submenu__item">
              <i class="pi pi-user is-purple"></i><span>Koordinator</span>
            </li>
            <li class="submenu__item">
              <i class="pi pi-shield is-green"></i><span>Implementer</span>
            </li>
            <li class="submenu__item">
              <i class="pi pi-lock is-red"></i><span>Administrator</span>
            </li>
            <li class="submenu__item">
              <i class="pi pi-briefcase is-pink"></i><span>Client</span>
            </li>
            <li class="submenu__item">
              <i class="pi pi-chart-line is-emerald"></i><span>Sales & Marketing</span>
            </li>
            <li class="submenu__item">
              <i class="pi pi-building is-indigo"></i><span>Rekanan</span>
            </li>
          </ul>
        </li>

        <!-- Management -->
        <li class="menu__group">
          <button class="menu__accordion" type="button" @click="toggle('management')">
            <span class="menu__accordion-left">
              <i class="pi pi-objects-column"></i>
              <span>Management</span>
            </span>
            <i class="pi pi-chevron-down" :class="{ rotate: openManagement }"></i>
          </button>
        </li>

        <!-- Schedules -->
        <li class="menu__group">
          <button class="menu__accordion" type="button" @click="toggle('schedule')">
            <span class="menu__accordion-left">
              <i class="pi pi-calendar"></i>
              <span>Schedules</span>
            </span>
            <i class="pi pi-chevron-down" :class="{ rotate: openSchedule }"></i>
          </button>
        </li>

        <!-- Log Task -->
        <li class="menu__item">
          <i class="pi pi-book"></i>
          <span>Log Task</span>
        </li>
      </ul>
    </aside>

    <!-- MAIN -->
    <div class="main">
      <header class="topbar">
        <button class="topbar__btn" type="button" @click="toggleSidebar">☰</button>
        <span class="topbar__title">Dashboard</span>
      </header>

      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@src/assets/scss/karyaGunaJaya/seedbar.scss";
</style>
