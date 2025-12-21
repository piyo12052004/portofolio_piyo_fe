<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import Card from "primevue/card";
import Avatar from "primevue/avatar";

import Profile from "../component/profile/profile.vue";
import TokenDashParking from "../component/profile/tokenDashParking.vue";
import TokenKaryaGunaJaya from "../component/profile/tokenKaryaGunaJaya.vue";

import { fecthSession } from "@src/utils/usersSesion";

/* =============================
     SESSION (REAKTIF)
  ============================= */
const session = ref<any>(JSON.parse(localStorage.getItem("user_session") || "null"));

/* =============================
     NOTE JSON
  ============================= */
const noteJson = computed(() => {
  try {
    return JSON.parse(session.value?.note_json || "{}");
  } catch {
    return {};
  }
});

/* =============================
     MENU CONFIG
  ============================= */
const menus = [
  {
    key: "profile",
    title: "Profile",
    desc: "Account profile information",
    component: Profile,
  },
  {
    key: "kgj",
    title: "Karya Guna Jaya",
    desc: "Access token for Karya Guna Jaya integration",
    component: TokenKaryaGunaJaya,
  },
  {
    key: "dashparking",
    title: "Dash Parking",
    desc: "Access token for Dash Parking integration",
    component: TokenDashParking,
  },
];

/* =============================
     ACTIVE COMPONENT
  ============================= */
const activeComponent = ref(menus[0].component);

/* =============================
     REFRESH SESSION
  ============================= */
const refresToken = async () => {
  // 1. fetch dari server
  const updatedSession = await fecthSession();

  // 2. update state (ini yang bikin UI update)
  session.value = updatedSession;

  // 3. sync ke localStorage (opsional tapi bagus)
  localStorage.setItem("user_session", JSON.stringify(updatedSession));
};

/* =============================
     CLICK HANDLER
  ============================= */
const goFile = (menu: any) => {
  activeComponent.value = menu.component;
};

/* =============================
     INIT
  ============================= */
onMounted(() => {
  refresToken();
});
</script>

<template>
  <!-- HEADER -->
  <div class="m-9">
    <Card class="p-5">
      <template #content>
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold">Welcome to Admin Profile</h3>
            <p class="text-sm text-gray-500">
              Manage your personal information and settings
            </p>
          </div>

          <div class="text-right">
            <p class="text-sm font-medium">
              Role User : {{ session.role_user.role_user }}
            </p>
            <p class="text-xs text-gray-400">{{ session.email }}</p>
          </div>
        </div>
      </template>
    </Card>
  </div>

  <!-- MAIN GRID -->
  <div class="grid grid-cols-1 md:grid-cols-[480px_1fr] gap-6 m-9">
    <!-- ================= LEFT COLUMN ================= -->
    <div class="flex flex-col gap-6">
      <!-- LEFT CARD 1 -->
      <Card class="p-5">
        <template #title>Profile Overview</template>
        <template #content>
          <div class="flex items-center gap-4 mb-4">
            <Avatar image="https://i.pravatar.cc/100" size="large" shape="circle" />
            <div>
              <p class="font-medium">{{ session.nama_lengkap }}</p>
              <p class="text-sm text-gray-500">{{ session.role_user.role_user }}</p>
            </div>
          </div>
          <ul
            v-if="!noteJson?.aksesTokenKaryaGunaJaya?.access_tokens?.length"
            class="space-y-2 text-sm text-red-600"
          >
            <li>• You do not have a Karya Guna Jaya access token yet.</li>
          </ul>

          <ul v-else class="space-y-2 text-sm text-green-600">
            <li>• A Karya Guna Jaya access token already exists.</li>
          </ul>

          <ul
            v-if="!noteJson?.aksesTokenDashparking?.access_tokens?.length"
            class="space-y-2 text-sm text-red-600"
          >
            <li>• You do not have a Dash Parking access token yet.</li>
          </ul>

          <ul v-else class="space-y-2 text-sm text-green-600">
            <li>• A Dash Parking access token already exists.</li>
          </ul>
        </template>
      </Card>

      <!-- LEFT CARD 2 -->
      <Card class="p-5">
        <template #title>Account Settings</template>

        <template #content>
          <p class="text-sm text-gray-500 mb-4">
            Manage your access tokens for integrated services.
          </p>

          <div class="space-y-4">
            <div
              v-for="menu in menus"
              :key="menu.key"
              class="flex items-center justify-between gap-4 rounded-lg border p-4 cursor-pointer transition hover:border-primary-400 hover:bg-primary-50 active:scale-[0.98]"
              @click="goFile(menu)"
            >
              <div>
                <p class="font-medium">{{ menu.title }}</p>
                <p class="text-xs text-gray-500">{{ menu.desc }}</p>
              </div>

              <i class="pi pi-chevron-right text-gray-400"></i>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- ================= RIGHT COLUMN ================= -->
    <div class="flex flex-col gap-6">
      <component :is="activeComponent" @refresToken="refresToken" />
    </div>
  </div>
</template>
