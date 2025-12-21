<template>
  <div class="min-h-screen bg-surface-0 dark:bg-surface-900 px-6 py-10">
    <div class="mx-auto max-w-4xl space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
            Generate Token
          </h2>
          <p class="text-sm text-surface-600 dark:text-surface-300">
            Generate secure token and manage history
          </p>
        </div>

        <Button
          label="Generate Token"
          icon="pi pi-bolt"
          class="!rounded-xl"
          :loading="loading"
          @click="generate"
        />
      </div>

      <!-- Generated Token -->
      <Card class="!rounded-2xl shadow-sm">
        <template #title>
          <div class="flex items-center justify-between">
            <span class="flex items-center gap-2">
              <i class="pi pi-key" />
              Generated Token
            </span>

            <Button
              icon="pi pi-copy"
              severity="secondary"
              text
              :disabled="!token"
              @click="copy(token)"
            />
          </div>
        </template>

        <template #content>
          <div
            class="font-mono text-sm break-all rounded-xl border border-surface-200 p-4 bg-surface-50 dark:bg-surface-800 dark:border-surface-700"
          >
            <span v-if="token">{{ token }}</span>
            <span v-else class="text-surface-500">
              Click <b>Generate Token</b> to create token
            </span>
          </div>

          <div v-if="token" class="mt-2 text-xs text-surface-500">
            Generated at {{ createdAt }}
          </div>
        </template>
      </Card>

      <!-- History -->
      <Card class="!rounded-2xl shadow-sm">
        <template #title>
          <div class="flex items-center justify-between">
            <span class="flex items-center gap-2">
              <i class="pi pi-history" />
              Token History
            </span>
          </div>
        </template>

        <template #content>
          <DataTable
            :value="history"
            dataKey="id"
            class="text-sm"
            responsiveLayout="scroll"
            :rows="6"
            :paginator="history.length > 6"
          >
            <Column header="Token">
              <template #body="{ data }">
                <div class="font-mono break-all">
                  {{ data.preview }}
                </div>
              </template>
            </Column>

            <Column field="createdAt" header="Created At" style="width: 180px" />

            <Column style="width: 90px">
              <template #body="{ data }">
                <Button
                  icon="pi pi-copy"
                  text
                  severity="secondary"
                  @click="copy(data.token)"
                />
              </template>
            </Column>

            <template #empty>
              <div class="py-6 text-center text-surface-500">No token history</div>
            </template>
          </DataTable>
        </template>
      </Card>
    </div>

    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "primevue/button";
import Card from "primevue/card";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useApi } from "@src/utils/useApi";

/* =============================
     STATE
  ============================= */
const toast = useToast();

const token = ref<string>("");
const createdAt = ref<string>("");
const loading = ref<boolean>(false);
const history = ref<any[]>([]);

/* =============================
     DATE HELPERS
  ============================= */
const getToday = (): string => new Date().toISOString().slice(0, 10);

const getNow = (): string => new Date().toISOString().replace("T", " ").slice(0, 19);

/* =============================
     TOKEN GENERATOR
  ============================= */
const generateRandomToken = (length = 40): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomArray = new Uint32Array(length);
  crypto.getRandomValues(randomArray);

  return Array.from(randomArray, (n) => chars[n % chars.length]).join("");
};

/* =============================
     API HELPERS
  ============================= */
const getUserSession = async () => {
  const res = await useApi().get("/profile/token/get-acces-token-karya-guna-jaya");
  return res.data;
};

const insertDataToken = async (payload: any) => {
  return await useApi().post("/profile/token/insert-acces-token-karya-guna-jaya", {
    token: payload,
  });
};

/* =============================
     JSON PARSER
  ============================= */
const parseNoteJson = (noteJson: string | null) => {
  try {
    return JSON.parse(noteJson || "{}");
  } catch {
    return {};
  }
};

/* =============================
     MAIN GENERATE LOGIC
  ============================= */
const generate = async () => {
  loading.value = true;

  try {
    const session = await getUserSession();
    if (!session) {
      notify("error", "Session not found", "User session not available");
      return;
    }

    const noteJson = parseNoteJson(session.note_json);

    // ensure path exists
    noteJson.aksesTokenKaryaGunaJaya ??= { access_tokens: [] };

    const accessTokens = noteJson.aksesTokenKaryaGunaJaya.access_tokens;

    /* 🔒 CHECK TODAY TOKEN */
    const alreadyGeneratedToday = accessTokens.some((item: any) =>
      item?.tanggal_buat_token?.startsWith(getToday())
    );

    if (alreadyGeneratedToday) {
      notify(
        "warn",
        "Token already generated",
        "You have already generated a token today"
      );
      return;
    }

    /* ✅ CREATE TOKEN */
    const newToken = generateRandomToken();
    const now = getNow();

    const tokenPayload = {
      token: newToken,
      is_aktif: false,
      tanggal_buat_token: now,
    };

    accessTokens.unshift(tokenPayload);

    /* 🔄 SAVE TO SERVER */
    const fetchToken = await insertDataToken(noteJson)
    emit('refresToken',fetchToken);

    /* 🧾 UPDATE UI */
    token.value = newToken;
    createdAt.value = now;

    history.value.unshift({
      token: newToken,
      preview: `${newToken.slice(0, 8)}...${newToken.slice(-8)}`,
      createdAt: now,
    });

  } catch (err) {
    notify("error", "Error", "Failed to generate token");
  } finally {
    loading.value = false;
  }
};

/* =============================
     HISTORY
  ============================= */
const fetchHistory = async () => {
  const res = await useApi().get(
    "/profile/token/get-history-acces-token-karya-guna-jaya"
  );

  const result = parseNoteJson(res.data.note_json);

  const tokens = result?.aksesTokenKaryaGunaJaya?.access_tokens || [];

  history.value = tokens.map((item: any) => ({
    token: item.token,
    preview: `${item.token.slice(0, 8)}...${item.token.slice(-8)}`,
    createdAt: item.tanggal_buat_token,
  }));
};

/* =============================
     ACTIONS
  ============================= */
const copy = async (text: string) => {
  if (!text) return;
  await navigator.clipboard.writeText(text);
  notify("success", "Copied", "Token copied to clipboard");
};

/* =============================
     TOAST
  ============================= */
const notify = (
  severity: "success" | "info" | "warn" | "error",
  summary: string,
  detail: string
) => {
  toast.add({
    severity,
    summary,
    detail,
    life: 2000,
  });
};

const emit = defineEmits<{
  (e: "refresToken",value:boolean): void;
}>();
/* =============================
     INIT
  ============================= */
onMounted(() => {
  fetchHistory();
});
</script>
