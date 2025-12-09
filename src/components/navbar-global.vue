<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "primevue/button";
import { useApi } from "@src/utils/useApi";
import router, { addDynamicRoutes } from "@src/route";
import { useToaster } from "@src/utils/toats/toaster";
import * as H from "@src/utils/Helper";

const collectionPath = ref([]);

const toaster = useToaster();
const isDark = ref(false);

const activeDropdown = ref<number | null>(null);
let hideTimer: any = null;

/* === DROPDOWN LOGIC === */

// Saat mouse masuk → buka dropdown
function openDropdown(index: number) {
  clearTimeout(hideTimer);
  activeDropdown.value = index;
}

// Saat mouse keluar → tutup dropdown setelah delay 250ms
function closeDropdownWithDelay() {
  hideTimer = setTimeout(() => {
    activeDropdown.value = null;
  }, 250);
}

// Untuk mencegah dropdown tertutup ketika mouse masuk ke dropdown-menu
function stopHide() {
  clearTimeout(hideTimer);
}

// Klik child submenu
function selectChild(path: string) {
  activeDropdown.value = null;
  router.push(path);
}

/* === LOAD ROUTES === */
async function loadRoutes() {
  try {
    const res = await useApi().get("/path");
    collectionPath.value = res.data;
    H.saveStoregeListMenu(res.data)
    addDynamicRoutes();
  } catch (err) {
    toaster.error("Gagal mengambil data dari server");
  }
}

/* === DARK MODE === */
function toggleDarkMode() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("my-app-dark");
}

function goToLogin(){
  router.push('/auth-login');
}

onMounted(() => {
  loadRoutes();
});
</script>

<template>
  <nav class="behance-navbar">
    <!-- LEFT SECTION -->
    <div class="left">
      <div class="logo">Pîyo Aswandi</div>

      <div class="menu">
        <!-- LOOP MENU DINAMIS -->
        <template v-for="(m, i) in collectionPath" :key="i">
          <!-- MENU BIASA (ADA PATH) -->
          <span v-if="m.path" class="menu-item" @click="router.push(m.path)">
            {{ m.sub_title }}
          </span>

          <!-- DROPDOWN (path null) -->
          <span
            v-else
            class="menu-item dropdown"
            :class="{ active: activeDropdown === i }"
            @mouseover="openDropdown(i)"
            @mouseleave="closeDropdownWithDelay"
          >
            {{ m.sub_title }}
            <i class="pi pi-chevron-down"></i>

            <!-- dropdown container -->
            <div
              class="dropdown-menu"
              v-show="activeDropdown === i"
              @mouseover="stopHide"
              @mouseleave="closeDropdownWithDelay"
            >
              <span
                class="menu-item"
                v-for="(child, j) in m.paths"
                :key="j"
                @click="selectChild(child.path)"
              >
                {{ child.name }}
              </span>
            </div>
          </span>
        </template>
      </div>
    </div>

    <!-- RIGHT SECTION -->
    <div class="right">
      <Button
        :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'"
        class="p-button-sm"
        variant="outlined"
        @click="toggleDarkMode"
      />

      <Button label="Sign In" @click="goToLogin" text class="signin-btn" />

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_logo_and_wordmark.svg/640px-Adobe_logo_and_wordmark.svg.png"
        alt="Adobe"
        class="adobe-logo"
      />
    </div>
  </nav>
</template>
<style lang="scss">
@use "@src/assets/scss/navbarGlobal.scss";
</style>
