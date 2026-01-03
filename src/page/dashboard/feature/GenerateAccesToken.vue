<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import Card from "primevue/card";
import Avatar from "primevue/avatar";
import Button from "primevue/button";

import Profile from "../component/profile/profile.vue";
// import TokenDashParking from "../component/profile/tokenDashParking.vue";
import TokenKaryaGunaJaya from "../component/profile/tokenKaryaGunaJaya.vue";

import { fecthSession, useSessionStore } from "@src/utils/usersSesion";
import * as H from "@src/utils/Helper";
import { useApi } from "@src/utils/useApi";

/* =============================
     SESSION (REAKTIF)
  ============================= */
//
//
// function sesion ada dua yang satu get saja yang satu pinia
//
//
const session = ref<any>(JSON.parse(localStorage.getItem("user_session") || "null"));
const sessionStore = useSessionStore();
const typeLogin = ref<any>(localStorage.getItem("type_login") || "null");

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
const menus:any = [
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
  // {
  //   key: "dashparking",
  //   title: "Dash Parking",
  //   desc: "Access token for Dash Parking integration",
  //   component: TokenDashParking,
  // },
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

  await sessionStore.fetchSession();

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

const hasAvatar = computed(() => {
  return (
    !!session.value?.avatar_google ||
    !!session.value?.avatar_github ||
    !!session.value?.avatar
  );
});

const userAvatar = computed(() => {
  return (
    session.value?.avatar ||
    session.value?.avatar_google ||
    session.value?.avatar_github ||
    null
  );
});

const avatarInput = ref<HTMLInputElement | null>(null);
const openCreateAvatar = () => {
  avatarInput.value?.click();
};

const openEditAvatar = () => {
  avatarInput.value?.click();
};

const onAvatarSelected = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    H.alert("warning", "Please select an image file", "warning");
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    H.alert("warning", "Image size must be under 2MB", "warning");
    return;
  }
  await uploadAvatar(file);
  input.value = "";
};

const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);
  formData.append("type_login", String(typeLogin.value));

  try {
    await useApi().post("/profile/referensi/update-profile", formData);
    // refresh session
    await refresToken();
  } catch (err) {
    // H.alert("error", "Failed to upload avatar", "error");
  }
};

/* =============================
     INIT
  ============================= */
onMounted(() => {
  refresToken();
});
</script>

<template>
  <input
    ref="avatarInput"
    type="file"
    accept="image/*"
    class="hidden"
    @change="onAvatarSelected"
  />
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
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-4">
              <!-- AVATAR -->
              <Avatar v-if="userAvatar" :image="userAvatar" size="large" shape="circle" />

              <Avatar
                v-else
                :label="session?.nama_lengkap?.charAt(0)"
                size="large"
                shape="circle"
              />

              <!-- USER INFO -->
              <div>
                <p class="font-medium">{{ session?.nama_lengkap }}</p>
                <p class="text-sm text-gray-500">
                  {{ session?.role_user?.role_user }}
                </p>
              </div>
            </div>

            <!-- ACTION BUTTON -->
            <Button
              v-if="!hasAvatar"
              label="Create Avatar"
              icon="pi pi-plus"
              severity="success"
              size="small"
              @click="openCreateAvatar"
            />

            <Button
              v-else
              label="Edit Avatar"
              icon="pi pi-pencil"
              severity="secondary"
              size="small"
              @click="openEditAvatar"
            />
          </div>

          <!-- TOKEN STATUS -->
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
            class="space-y-2 text-sm text-red-600 mt-2"
          >
            <li>• You do not have a Dash Parking access token yet.</li>
          </ul>
          <ul v-else class="space-y-2 text-sm text-green-600 mt-2">
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
