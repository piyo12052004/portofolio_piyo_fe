<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Button from "primevue/button";
// import OverlayPanel from "primevue/overlaypanel";
import Popover from "primevue/popover";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import Avatar from "primevue/avatar";
import Tag from "primevue/tag";

import { useApi } from "@src/utils/useApi";
import { useToaster } from "@src/utils/toats/toaster";
import router, { addDynamicRoutes } from "@src/route";
import * as H from "@src/utils/Helper";

import imgProfilePria from "@src/assets/img/img-profile-boys.svg";
import imgProfilePerempuan from "@src/assets/img/img-profile-girs.svg";
import { useSessionStore } from "@src/utils/usersSesion";

/* =========================
     STATE
  ========================= */
//
//
// function sesion ada dua yang satu get saja yang satu pinia
//
//
const sessionStore = useSessionStore();
// const sessionPinia = computed(() => sessionStore.session);
// const tokens = computed(() => sessionStore.accessTokens);
const session = JSON.parse(localStorage.getItem("user_session") || "null");

const collectionPath = ref<any[]>([]);
const isDark = ref(false);
const popUpNotifikasi = ref();
const activeDropdown = ref<number | null>(null);

const toaster = useToaster();
const profilePanel = ref<any>(null);

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

const toggleProfile = (event: Event) => {
  profilePanel.value?.toggle(event);
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
  const user = JSON.parse(localStorage.getItem("user_session") || "{}");
  try {
    await useApi().post("/logout", "");

    localStorage.removeItem("token");
    localStorage.removeItem("list_menu");
    localStorage.removeItem("user_session");
    localStorage.removeItem("type_login");

    if (user?.email && window.google?.accounts?.id) {
      window.google.accounts.id.revoke(user.email, () => {
        // console.log("Google account revoked:", user.email);
      });
    }
    window.location.href = "/";
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("list_menu");
    localStorage.removeItem("user_session");
    localStorage.removeItem("type_login");

    if (user?.email && window.google?.accounts?.id) {
      window.google.accounts.id.revoke(user.email, () => {
        // console.log("Google account revoked:", user.email);
      });
    }
    // toaster.error("Logout failed, local session cleared");
    window.location.href = "/";
  }
}

const openLink = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const toggleNotifikasi = (event: any) => {
  popUpNotifikasi.value.toggle(event);
};

// function isToday(dateString: string) {
//   const today = new Date();
//   const date = new Date(dateString);

//   return (
//     date.getDate() === today.getDate() &&
//     date.getMonth() === today.getMonth() &&
//     date.getFullYear() === today.getFullYear()
//   );
// }

const initialName = computed(() => {
  return sessionStore.accessTokens.map((item: any) => {
    const createdDate = new Date(item.tanggal_buat_token);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      token: item.token,
      is_active: item.is_aktif,
      tanggal_buat_token: item.tanggal_buat_token,
      is_today: createdDate >= today,
      is_expired: createdDate < today,
    };
  });
});

const showSidebar = ref(false);
const openIndex = ref(null);

const toggleGroup = (i:any) => {
  openIndex.value = openIndex.value === i ? null : i;
};

const go = (path:any) => {
  showSidebar.value = false;
  router.push(path);
};

onMounted(loadRoutes);
</script>

<template>
  <!--  -->
  <!--  -->
  <!-- destop -->
  <!--  -->
  <!--  -->
  <div
    class="hidden md:flex justify-between items-center sticky top-0 z-[12] bg-transparent backdrop-blur-md transition-[background,border-color] duration-300"
  >
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
          icon="pi pi-linkedin"
          class="p-button-sm"
          variant="outlined"
          @click="openLink('https://www.linkedin.com/in/piyo-aswandi-3477812a0/')"
        />

        <Button
          icon="pi pi-github"
          class="p-button-sm"
          variant="outlined"
          @click="openLink('https://github.com/piyo12052004/portofolio_piyo_fe')"
        />
        <div class="relative">
          <Button
            v-on:click="toggleNotifikasi"
            icon="pi pi-bell"
            class="p-button-sm"
            variant="outlined"
          />
          <span v-on:click="toggleNotifikasi" class="notification-dot"></span>
        </div>

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
                :src="
                  session.jenis_kelamin_id === 1 ? imgProfilePria : imgProfilePerempuan
                "
              />
            </template>
          </Button>
        </div>

        <!-- PROFILE MENU -->
        <Popover ref="profilePanel" class="profile-menu">
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

          <div class="item logout" @click="logout">
            <i class="pi pi-sign-out" /> Logout
          </div>
        </Popover>

        <Popover ref="popUpNotifikasi">
          <div class="w-[320px] max-h-[420px] overflow-y-auto">
            <Tabs value="0">
              <TabList>
                <Tab value="0" class="text-sm">Access Token</Tab>
              </TabList>

              <TabPanels>
                <TabPanel value="0" class="p-0">
                  <ul
                    class="flex flex-col divide-y divide-surface-200 dark:divide-surface-700"
                  >
                    <li
                      v-for="(data, index) in initialName"
                      :key="index"
                      class="flex items-start gap-3 px-4 py-3 hover:bg-surface-100 dark:hover:bg-surface-800 transition cursor-pointer"
                    >
                      <!-- Avatar -->
                      <Avatar
                        label="KGJ"
                        shape="circle"
                        size="small"
                        :style="{
                          backgroundColor: data.is_today
                            ? '#dcfce7'
                            : data.is_expired
                            ? '#fee2e2'
                            : '#e0e7ff',
                          color: data.is_today
                            ? '#166534'
                            : data.is_expired
                            ? '#991b1b'
                            : '#1e3a8a',
                        }"
                      />

                      <!-- Content -->
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between gap-2">
                          <span class="text-sm font-medium truncate">
                            Karya Guna Jaya Token
                          </span>

                          <Tag
                            v-if="data.is_today && data.is_active"
                            value="Today"
                            severity="success"
                            rounded
                            class="!text-xs"
                          />
                          <Tag
                            v-else-if="data.is_expired"
                            value="Expired"
                            severity="danger"
                            rounded
                            class="!text-xs"
                          />
                        </div>

                        <div class="text-xs text-surface-500 dark:text-surface-400">
                          {{ data.tanggal_buat_token }}
                        </div>
                      </div>
                    </li>

                    <!-- Empty State -->
                    <li
                      v-if="!initialName.length"
                      class="py-6 text-center text-sm text-surface-500 dark:text-surface-400"
                    >
                      No access token available
                    </li>
                  </ul>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </Popover>
      </div>
    </nav>
  </div>
  <!--  -->
  <!--  -->
  <!-- mobile -->
  <!--  -->
  <!--  -->
  <div
    class="block md:hidden fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200"
  >
    <nav class="flex items-center justify-between px-4 h-14 w-full">
      <!-- LEFT -->
      <Button
        icon="pi pi-align-justify"
        class="p-button-sm"
        variant="outlined"
        @click="showSidebar = true"
      />

      <!-- RIGHT -->
      <div class="flex items-center gap-2">
        <Button
          icon="pi pi-linkedin"
          class="p-button-sm"
          variant="outlined"
          @click="openLink('https://www.linkedin.com/in/piyo-aswandi-3477812a0/')"
        />
        <Button
          icon="pi pi-github"
          class="p-button-sm"
          variant="outlined"
          @click="openLink('https://github.com/piyo12052004/portofolio_piyo_fe')"
        />

        <!-- <Button
          :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'"
          class="p-button-sm"
          variant="outlined"
          @click="toggleDarkMode"
        /> -->
        <div class="relative">
          <Button
            v-on:click="toggleNotifikasi"
            icon="pi pi-bell"
            class="p-button-sm"
            variant="outlined"
          />
          <span v-on:click="toggleNotifikasi" class="notification-dot"></span>
        </div>

        <Button
          v-if="!session"
          label="Sign In"
          text
          class="signin-btn"
          @click="goToLogin"
        />
        
        <div v-if="session" class="profile-trigger mt-2 ml-2" @click="toggleProfile">
          <Button severity="info" rounded variant="outlined">
            <template #icon>
              <img
                :src="
                  session.jenis_kelamin_id === 1 ? imgProfilePria : imgProfilePerempuan
                "
              />
            </template>
          </Button>
        </div>
      </div>
    </nav>
  </div>

  <!-- OVERLAY -->
  <div
    v-show="showSidebar"
    class="fixed inset-0 z-40 bg-black/40 md:hidden"
    @click="showSidebar = false"
  />

  <!-- SIDEBAR -->
  <aside
    class="fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200 transition-transform duration-300 md:hidden"
    :class="showSidebar ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- HEADER -->
    <div class="flex items-center justify-between px-4 h-14 border-b">
      <span class="font-semibold">Menu</span>
      <Button icon="pi pi-times" text @click="showSidebar = false" />
    </div>

    <!-- MENU -->
    <div class="h-full px-3 py-4 overflow-y-auto">
      <ul class="space-y-2 text-sm font-medium">
        <template v-for="(m, i) in collectionPath" :key="i">
          <!-- SINGLE MENU -->
          <li v-if="m.path">
            <button
              @click="go(m.path)"
              class="flex items-center w-full px-2 py-1.5 rounded-md hover:bg-slate-100"
            >
              <i v-if="m.icon" :class="['pi', m.icon]" />
              <span class="ml-3">{{ m.sub_title }}</span>
            </button>
          </li>

          <!-- DROPDOWN MENU -->
          <li v-else>
            <button
              @click="toggleGroup(i)"
              class="flex items-center justify-between w-full px-2 py-1.5 rounded-md hover:bg-slate-100"
            >
              <div class="flex items-center">
                <i v-if="m.icon" :class="['pi', m.icon]" />
                <span class="ml-3">{{ m.sub_title }}</span>
              </div>
              <i
                class="pi pi-chevron-down transition-transform duration-200"
                :class="openIndex === i ? 'rotate-180' : ''"
              />
            </button>

            <ul v-show="openIndex === i" class="mt-1 ml-7 space-y-1">
              <li v-for="(child, j) in m.paths" :key="j">
                <button
                  @click="go(child.path)"
                  class="flex w-full px-2 py-1.5 rounded-md hover:bg-slate-100"
                >
                  {{ child.name }}
                </button>
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </div>
  </aside>
</template>

<style lang="scss">
@use "@src/assets/scss/navbarGlobal.scss";
</style>
