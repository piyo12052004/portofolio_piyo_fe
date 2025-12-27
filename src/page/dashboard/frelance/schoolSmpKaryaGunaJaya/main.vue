<script setup lang="ts">
import { ref, onMounted } from "vue";
import SedBar from "@src/page/dashboard/frelance/component/sedBarForFrelace.vue";
import { useApi } from "@src/utils/useApi";
import * as H from "@src/utils/Helper";
import Dialog from "primevue/dialog";
import NotifikasiAlertToken from "@src/page/dashboard/component/notifikasiGenerateAccestoken.vue";

import { fecthSession } from "@src/utils/usersSesion";

// PrimeVue
import InputText from "primevue/inputtext";
import Button from "primevue/button";

/* =============================
     SESSION
  ============================= */
const session = JSON.parse(localStorage.getItem("user_session") || "null");

/* =============================
     DIALOG STATES
  ============================= */
const showAccessDeniedDialog = ref(false);
const showInactiveTokenDialog = ref(false);
const showGenerateTokenDialog = ref(false);
const showVerifyTokenDialog = ref(false);
const is_notifikasi_expayert_token = ref(false);
const is_verifikasi_token: any = ref(false);
const is_nulable_token: any = ref(false);

const dialogMessage = ref("");
const verifyTokenForm = ref<{ token?: string }>({});
const dialogClosedBy = ref<"verify" | "cancel" | null>(null);

/* =============================
     CHECK ACCESS TOKEN
  ============================= */
function checkKgjAccessToken() {
  if (!session) {
    return {
      allowed: false,
      message: "Session not found. Please log in again.",
    };
  }

  if (!session.note_json) {
    return {
      allowed: false,
      message: "You do not have any access token yet. Please create one first.",
    };
  }

  let noteJson: any;
  try {
    noteJson = JSON.parse(session.note_json);
  } catch {
    return {
      allowed: false,
      message: "Invalid or corrupted token data.",
    };
  }

  const kgjTokenData = noteJson?.aksesTokenKaryaGunaJaya;

  if (!kgjTokenData || !Array.isArray(kgjTokenData.access_tokens)) {
    return {
      allowed: false,
      message: "You do not have a Karya Guna Jaya access token yet.",
    };
  }

  const tokens = kgjTokenData.access_tokens;

  // Check token for today
  const today = new Date().toISOString().slice(0, 10);
  const todayToken = tokens.find((t: any) => t?.tanggal_buat_token?.startsWith(today));

  if (!todayToken) {
    return {
      allowed: false,
      message: "Please generate an access token for today before continuing.",
    };
  }

  // Token exists but inactive
  if (todayToken.is_aktif !== true || !todayToken.token) {
    return {
      allowed: true,
      canSendToken: false,
      message: "Your access token for today is inactive. Please verify or activate it.",
    };
  }

  // Token valid
  return {
    allowed: true,
    canSendToken: true,
    token: todayToken.token,
  };
}

/* =============================
     LOAD ROUTES
  ============================= */
const loadRoutes = async () => {
  try {
    await useApi().get("admin/karya-guna-jaya/get-path");
  } catch {
    H.alert("error", "Failed to fetch data from the server.");
  }
};

/* =============================
     ON MOUNT
  ============================= */
onMounted(() => {
  const result = checkKgjAccessToken();

  if (!result.allowed) {
    dialogMessage.value = result.message;
    showAccessDeniedDialog.value = true;
    return;
  }

  if (!result.canSendToken) {
    dialogMessage.value = result.message;
    showInactiveTokenDialog.value = true;
    return;
  }

  // Token valid
  // loadRoutes();
});

/* =============================
     DIALOG HANDLERS
  ============================= */
function onAccessDeniedClose() {
  is_nulable_token.value = true;
  showGenerateTokenDialog.value = true;
}

function onInactiveTokenClose() {
  showVerifyTokenDialog.value = true;
}

function onGenerateTokenClose(value: boolean) {
  showGenerateTokenDialog.value = value;
}

/* =============================
     VERIFY TOKEN
  ============================= */
async function verifyToken() {
  if (!verifyTokenForm.value.token) {
    H.alert("warning", "Please enter your access token.");
    return;
  }
  try {
    dialogClosedBy.value = "verify";
    const result = await useApi().put(
      "/profile/token/verfikasi-acces-token-karya-guna-jaya",
      {
        token: verifyTokenForm.value.token,
      }
    );
    const updatedSession = await fecthSession();
    session.value = updatedSession;
    localStorage.setItem("user_session", JSON.stringify(updatedSession));

    showVerifyTokenDialog.value = false;
    is_verifikasi_token.value = false;
    is_nulable_token.value= false
    
    is_notifikasi_expayert_token.value = true;
    setTimeout(() => {
      is_notifikasi_expayert_token.value = false;
    }, 5000);
  } catch {
    H.alert("error", "Token verification failed. Please check your token and try again.");
  }
}

function closeModalVerfikasiToken() {
  if (dialogClosedBy.value === "verify") {
    dialogClosedBy.value = null;
    return; // jangan jalankan logic cancel
  }
  is_verifikasi_token.value = true;
  showVerifyTokenDialog.value = false;
}
</script>
<template>
  <NotifikasiAlertToken
    :is_aktif_true="showGenerateTokenDialog"
    @is_aktif_false="onGenerateTokenClose"
  />

  <!-- Access Denied -->
  <Dialog
    v-model:visible="showAccessDeniedDialog"
    modal
    header="Access Denied"
    :style="{ width: '25rem' }"
    @hide="onAccessDeniedClose"
  >
    <p class="text-sm leading-relaxed">
      {{ dialogMessage }}
    </p>
  </Dialog>

  <Dialog
    v-model:visible="is_notifikasi_expayert_token"
    modal
    header="Information"
    :style="{ width: '25rem' }"
  >
    <p class="text-sm leading-relaxed">This access token is only valid for today.</p>
  </Dialog>

  <!-- Inactive Token -->
  <Dialog
    v-model:visible="showInactiveTokenDialog"
    modal
    header="Inactive Token"
    :style="{ width: '25rem' }"
    @hide="onInactiveTokenClose"
  >
    <p class="text-sm leading-relaxed">
      {{ dialogMessage }}
    </p>
  </Dialog>

  <!-- Verify Token -->
  <Dialog
    v-model:visible="showVerifyTokenDialog"
    modal
    header="Verify Access Token"
    :style="{ width: '25rem' }"
    @hide="closeModalVerfikasiToken"
  >
    <InputText
      v-model="verifyTokenForm.token"
      class="w-full mb-3"
      placeholder="Enter Karya Guna Jaya access token"
    />

    <div class="flex justify-end gap-2">
      <Button label="Cancel" severity="secondary" @click="closeModalVerfikasiToken" />
      <Button label="Verify" @click="verifyToken" />
    </div>
  </Dialog>

  <SedBar
    :is_token="is_nulable_token"
    :is_verifikasi_token="is_verifikasi_token"
    :subTitle="'Karya Guna Jaya'"
    :title="'Piyo Aswandi'"
  />
</template>
