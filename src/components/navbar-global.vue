<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "primevue/button";
import OverlayPanel from "primevue/overlaypanel";

import { useApi } from "@src/utils/useApi";
import { useToaster } from "@src/utils/toats/toaster";
import router, { addDynamicRoutes } from "@src/route";
import * as H from "@src/utils/Helper";

import imgProfilePria from "@src/assets/img/img-profile-boys.svg";
import imgProfilePerempuan from "@src/assets/img/img-profile-girs.svg";

/* =========================
     STATE
  ========================= */
const session = JSON.parse(localStorage.getItem("user_session") || "null");
const collectionPath = ref<any[]>([]);
const isDark = ref(false);
const activeDropdown = ref<number | null>(null);

const toaster = useToaster();
const profilePanel = ref<OverlayPanel | null>(null);

let hideTimer: ReturnType<typeof setTimeout> | null = null;

/* =========================
     DROPDOWN MENU
  ========================= */
const openDropdown = (index: number) => {
  if (hideTimer) clearTimeout(hideTimer);
  activeDropdown.value = index;
};

const closeDropdownWithDelay = () => {
  hideTimer = setTimeout(() => {
    activeDropdown.value = null;
  }, 250);
};

const stopHide = () => {
  if (hideTimer) clearTimeout(hideTimer);
};

const selectChild = (path: string) => {
  activeDropdown.value = null;
  router.push(path);
};

/* =========================
     ROUTES
  ========================= */
const loadRoutes = async () => {
  try {
    const endpoint = session ? "/path/get-path" : "/get-path";
    const res = await useApi().get(endpoint);

    collectionPath.value = res.data;
    H.saveStoregeListMenu(res.data);
    addDynamicRoutes();
  } catch {
    toaster.error("Gagal mengambil data dari server");
  }
};

/* =========================
     DARK MODE
  ========================= */
const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("my-app-dark");
};

/* =========================
     AUTH & PROFILE
  ========================= */
const goToLogin = () => router.push("/auth-login");

const toggleProfile = (e: Event) => {
  profilePanel.value?.toggle(e);
};

const goProfile = () => {
  profilePanel.value?.hide();
  router.push("/profile");
};

// const goGenerateAccesToken = () => {
//   profilePanel.value?.hide();
//   router.push("/profile");
// };

async function logout() {
  try {
    await useApi().post('/logout','');

    // 🔥 HAPUS SEMUA DATA SESSION
    localStorage.removeItem('token');
    localStorage.removeItem('list_menu');
    localStorage.removeItem('user_session');

    // (opsional) bersihkan storage lain
    // sessionStorage.clear();

    // 🔁 redirect ke home
    window.location.href = '/';
  } catch (error) {
    // walaupun API gagal, tetap logout lokal
    localStorage.removeItem('token');
    localStorage.removeItem('list_menu');
    localStorage.removeItem('user_session');

    toaster.error('Logout failed, local session cleared');
    window.location.href = '/';
  }
}

onMounted(loadRoutes);
</script>

<template>
  <nav class="behance-navbar">
    <!-- LEFT -->
    <div class="left">
      <div class="logo">Pîyo Aswandi</div>

      <div class="menu">
        <template v-for="(m, i) in collectionPath" :key="i">
          <!-- NORMAL MENU -->
          <span v-if="m.path" class="menu-item" @click="router.push(m.path)">
            {{ m.sub_title }}
          </span>

          <!-- DROPDOWN -->
          <span
            v-else
            class="menu-item dropdown"
            :class="{ active: activeDropdown === i }"
            @mouseover="openDropdown(i)"
            @mouseleave="closeDropdownWithDelay"
          >
            {{ m.sub_title }}
            <i class="pi pi-chevron-down" />

            <div
              class="dropdown-menu"
              v-show="activeDropdown === i"
              @mouseover="stopHide"
              @mouseleave="closeDropdownWithDelay"
            >
              <span
                v-for="(child, j) in m.paths"
                :key="j"
                class="menu-item"
                @click="selectChild(child.path)"
              >
                {{ child.name }}
              </span>
            </div>
          </span>
        </template>
      </div>
    </div>

    <!-- RIGHT -->
    <div class="right">
      <!-- DARK MODE -->
      <Button
        :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'"
        class="p-button-sm"
        variant="outlined"
        @click="toggleDarkMode"
      />

      <!-- LOGIN -->
      <Button
        v-if="!session"
        label="Sign In"
        text
        class="signin-btn"
        @click="goToLogin"
      />

      <!-- PROFILE AREA -->
      <div v-if="session" class="profile-trigger" @click="toggleProfile">
        <div class="user-info">
          <div class="name">{{ session.role_user?.role_user }}</div>
          <div class="email">{{ session.nama_lengkap }}</div>
        </div>
        <Button severity="info" rounded variant="outlined">
          <template #icon>
            <img
              :src="session.jenis_kelamin_id === 1 ? imgProfilePria : imgProfilePerempuan"
            />
          </template>
        </Button>
      </div>

      <!-- PROFILE MENU -->
      <OverlayPanel ref="profilePanel" class="profile-menu">
        <div class="profile-header">
          <div class="avatar">
            {{ session?.nama_lengkap?.charAt(0) }}
          </div>
          <div class="info">
            <div class="name">{{ session?.nama_lengkap }}</div>
            <div class="email">{{ session?.email }}</div>
          </div>
        </div>

        <div class="divider" />

        <div class="menu">
          <div class="item" @click="goProfile"><i class="pi pi-user" /> Profile</div>
          <!-- <div class="item" @click="goGenerateAccesToken"><i class="pi pi-lock-open" /> Generate Acces Token </div> -->
          <!-- <div class="item" @click="goDaily">
            <i class="pi pi-calendar" /> Daily Activity
          </div>
          <div class="item" @click="goTeam">
            <i class="pi pi-chart-bar" /> Tim Daily Activity
          </div> -->
        </div>

        <div class="divider" />

        <div class="item logout" @click="logout"><i class="pi pi-sign-out" /> Logout</div>
      </OverlayPanel>
    </div>
  </nav>
</template>

<style lang="scss">
@use "@src/assets/scss/navbarGlobal.scss";
</style>
