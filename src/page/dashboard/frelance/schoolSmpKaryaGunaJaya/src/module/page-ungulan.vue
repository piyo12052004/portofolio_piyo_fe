<template>
  <!-- INFO CARD -->
  <Card class="my-4">
    <template #title> Featured Programs </template>
    <template #content>
      <p class="m-0 leading-relaxed text-slate-600">
        The <b>Featured Programs</b> feature is used to manage the list of the school’s
        featured programs displayed on the website. Administrators can perform
        <b>Create, Read, Update, and Delete (CRUD)</b> operations on program data.
      </p>
      <p class="mt-3 text-sm text-slate-500">Developed by <b>Ikhsan Adriansyah</b></p>
    </template>
  </Card>

  <div class="p-6 space-y-6">
    <!-- HEADER -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Program Unggulan</h1>
        <p class="text-sm text-slate-500">Daftar program unggulan sekolah</p>
      </div>

      <Button
        label="Tambah Program"
        icon="pi pi-plus"
        class="bg-blue-600 border-none"
        @click="openCreate"
      />
    </div>

    <!-- TABLE -->
    <Card>
      <template #content>
        <DataTable :value="programs" stripedRows responsiveLayout="scroll">
          <Column header="No">
            <template #body="{ index }">{{ index + 1 }}</template>
          </Column>

          <Column field="title" header="Judul" />

          <Column header="Gambar">
            <template #body="{ data }">
              <img :src="data.image" class="w-12 h-12 rounded-md object-cover" />
            </template>
          </Column>

          <Column header="Status">
            <template #body="{ data }">
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold"
                :class="
                  data.status === 'Aktif'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                "
              >
                {{ data.status }}
              </span>
            </template>
          </Column>

          <Column field="order" header="Urutan" />

          <Column header="Aksi">
            <template #body="{ index }">
              <Button label="Edit" text class="text-blue-600" @click="openEdit(index)" />
              <Button label="Hapus" severity="danger" text class="text-red-600" @click="askRemove(index)" />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>

  <!-- ===== DIALOG ADD / EDIT ===== -->
  <Dialog
    v-model:visible="showDialog"
    modal
    :header="mode === 'create' ? 'Tambah Program Unggulan' : 'Edit Program Unggulan'"
    :style="{ width: '40rem' }"
  >
    <div class="space-y-4">
      <!-- IMAGE (DISABLED) -->
      <div>
        <label class="text-sm font-medium">Image</label>
        <input
          type="text"
          :value="DEFAULT_IMAGE"
          disabled
          class="w-full mt-1 rounded-md border px-3 py-2 bg-slate-100 text-slate-500 cursor-not-allowed"
        />
        <p class="text-xs text-slate-500 mt-1">
          Image is automatically set by the system
        </p>
      </div>

      <InputText v-model="form.title" placeholder="Judul Program *" class="w-full" />

      <Textarea
        v-model="form.description"
        rows="4"
        placeholder="Deskripsi Program"
        class="w-full"
      />

      <InputNumber v-model="form.order" placeholder="Urutan Tampilan" class="w-full" />

      <div class="flex gap-4 items-center">
        <RadioButton v-model="form.status" value="Aktif" />
        <label>Aktif</label>

        <RadioButton v-model="form.status" value="Nonaktif" />
        <label>Nonaktif</label>
      </div>
    </div>

    <template #footer>
      <Button label="Batal" text @click="showDialog = false" />
      <Button
        :label="mode === 'create' ? 'Simpan' : 'Update'"
        class="bg-blue-600 border-none"
        @click="saveProgram"
      />
    </template>
  </Dialog>

  <!-- ===== DIALOG CONFIRM DELETE ===== -->
  <Dialog
    v-model:visible="confirmRemoveDialog"
    modal
    header="Confirm Delete"
    :style="{ width: '25rem' }"
  >
    <p>Are you sure you want to delete this program?</p>

    <template #footer>
      <Button label="Cancel" text @click="confirmRemoveDialog = false" />
      <Button label="Delete" severity="danger" @click="confirmRemove" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as H from "@src/utils/Helper";

import Card from "primevue/card";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import InputNumber from "primevue/inputnumber";
import RadioButton from "primevue/radiobutton";

/* ================= DEFAULT IMAGE ================= */
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200&q=80";

/* ================= DATA ================= */
const programs: any = ref([
  { id: 1, title: "Program Tahfidz", image: DEFAULT_IMAGE, status: "Aktif", order: 1 },
  { id: 2, title: "Program IT", image: DEFAULT_IMAGE, status: "Aktif", order: 2 },
  { id: 3, title: "Bahasa Inggris", image: DEFAULT_IMAGE, status: "Aktif", order: 3 },
]);

/* ================= STATE ================= */
const showDialog = ref(false);
const confirmRemoveDialog = ref(false);
const mode = ref<"create" | "edit">("create");
const editIndex = ref<number | null>(null);
const removeIndex = ref<number | null>(null);

/* ================= FORM ================= */
const form: any = ref({
  title: "",
  description: "",
  image: DEFAULT_IMAGE,
  status: "Aktif",
  order: 0,
});

/* ================= METHODS ================= */
function openCreate() {
  mode.value = "create";
  resetForm();
  showDialog.value = true;
}

function openEdit(index: number) {
  mode.value = "edit";
  editIndex.value = index;
  form.value = { ...programs.value[index] };
  showDialog.value = true;
}

function saveProgram() {
  if (!form.value.title) {
    H.alert("warning", "Judul program wajib diisi", "warning");
    return;
  }

  const payload = { ...form.value, image: DEFAULT_IMAGE };

  if (mode.value === "create") {
    programs.value.push({ ...payload, id: Date.now() });
    H.alert("success", "Program berhasil ditambahkan", "success");
  } else if (editIndex.value !== null) {
    programs.value[editIndex.value] = payload;
    H.alert("success", "Program berhasil diperbarui", "success");
  }

  showDialog.value = false;
  resetForm();
}

function askRemove(index: number) {
  removeIndex.value = index;
  confirmRemoveDialog.value = true;
}

function confirmRemove() {
  if (removeIndex.value !== null) {
    programs.value.splice(removeIndex.value, 1);
    H.alert("success", "Program berhasil dihapus", "success");
  }
  confirmRemoveDialog.value = false;
  removeIndex.value = null;
}

function resetForm() {
  form.value = {
    title: "",
    description: "",
    image: DEFAULT_IMAGE,
    status: "Aktif",
    order: 0,
  };
}
</script>

<style scoped lang="scss">
.my-app-dark {
  background-color: #0f172a;

  h1,
  h2 {
    color: #f8fafc;
  }

  table,
  .p-card {
    background: #020617;
    color: #e5e7eb;
  }

  input,
  textarea {
    background: #020617;
    border-color: #334155;
    color: #f8fafc;
  }

  .bg-green-100 {
    background-color: rgba(34, 197, 94, 0.15);
    color: #86efac;
  }

  .bg-red-100 {
    background-color: rgba(239, 68, 68, 0.15);
    color: #fca5a5;
  }
}

/* ===============================
   📱 MOBILE RESPONSIVE – PROGRAM UNGGULAN
================================ */
@media (max-width: 768px) {
  /* Padding section diperkecil */
  .p-6 {
    padding: 1rem !important;
  }

  /* Header stack */
  .flex.items-center.justify-between {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  h1 {
    font-size: 1.25rem;
  }

  /* Button full width */
  .p-button {
    width: 100%;
  }

  /* ===============================
     PRIMEVUE DATATABLE SCROLL
  ================================ */
  .p-datatable-wrapper {
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
  }

  .p-datatable-table {
    min-width: 800px; /* paksa scroll */
    white-space: nowrap;
  }

  .p-datatable-thead > tr > th,
  .p-datatable-tbody > tr > td {
    padding: 0.75rem !important;
  }

  /* Image lebih kecil */
  .p-datatable img {
    width: 40px;
    height: 40px;
  }

  /* Dialog full width */
  .p-dialog {
    width: 95vw !important;
    margin: 0 auto;
  }

  .p-dialog-content {
    padding: 1rem !important;
  }

  .p-dialog-footer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .p-dialog-footer .p-button {
    width: 100%;
  }
}

/* ===============================
   🌙 DARK MODE – MOBILE DATATABLE
================================ */
.my-app-dark {
  @media (max-width: 768px) {
    .p-datatable-table {
      background-color: #020617;
    }

    .p-datatable-thead th {
      color: #94a3b8;
    }

    .p-datatable-tbody td {
      color: #e5e7eb;
    }
  }
}
</style>
