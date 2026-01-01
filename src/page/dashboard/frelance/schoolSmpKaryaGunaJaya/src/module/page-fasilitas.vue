<template>
  <!-- INFO CARD -->
  <Card class="my-4">
    <template #title> Facilities </template>
    <template #content>
      <p class="m-0 leading-relaxed text-slate-600">
        The <b>Facilities</b> feature is used to manage data related to the school’s
        facilities. Administrators can perform
        <b>Create, Read, Update, and Delete (CRUD)</b> operations on facility data.
      </p>
      <p class="mt-3 text-sm text-slate-500">Developed by <b>Ikhsan Adriansyah</b></p>
    </template>
  </Card>

  <div class="p-6 space-y-4">
    <!-- HEADER -->
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold">Daftar Fasilitas</h2>

      <Button
        label="Tambah Fasilitas"
        icon="pi pi-plus"
        class="!bg-blue-600"
        @click="openCreate"
      />
    </div>

    <!-- TABLE -->
    <div class="card">
      <table class="min-w-full text-sm">
        <thead class="border-b text-slate-500">
          <tr>
            <th class="p-3 text-left">Gambar</th>
            <th class="p-3 text-left">Nama</th>
            <th class="p-3 text-left">Kategori</th>
            <th class="p-3 text-left">Deskripsi</th>
            <th class="p-3 text-left">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, i) in fasilitas" :key="i" class="border-b last:border-0">
            <td class="p-3">
              <img :src="item.gambar" class="w-14 h-14 rounded object-cover" />
            </td>

            <td class="p-3 font-medium">
              {{ item.nama }}
            </td>

            <td class="p-3">
              {{ item.kategori }}
            </td>

            <td class="p-3 text-slate-600">
              {{ item.deskripsi }}
            </td>

            <td class="p-3 space-x-3">
              <button class="text-blue-600 hover:underline" @click="openEdit(i)">
                Edit
              </button>
              <button class="text-red-600 hover:underline" @click="askRemove(i)">
                Hapus
              </button>
            </td>
          </tr>

          <tr v-if="fasilitas.length === 0">
            <td colspan="5" class="p-6 text-center text-slate-500">No data available</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ===== DIALOG ADD / EDIT ===== -->
  <Dialog
    v-model:visible="showDialog"
    modal
    :header="mode === 'create' ? 'Tambah Fasilitas' : 'Edit Fasilitas'"
    :style="{ width: '40rem' }"
  >
    <div class="space-y-4">
      <div>
        <label class="text-sm font-medium">Nama Fasilitas *</label>
        <input
          v-model="form.nama"
          class="w-full mt-1 input"
          placeholder="Contoh: Laboratorium Komputer"
        />
      </div>

      <div>
        <label class="text-sm font-medium">Kategori *</label>
        <select v-model="form.kategori" class="w-full mt-1 input">
          <option>Akademik</option>
          <option>Olahraga</option>
          <option>Umum</option>
        </select>
      </div>

      <div>
        <label class="text-sm font-medium">Deskripsi</label>
        <textarea v-model="form.deskripsi" rows="3" class="w-full mt-1 input" />
      </div>

      <!-- IMAGE DISABLED -->
      <div>
        <label class="text-sm font-medium">Gambar</label>
        <input
          type="text"
          :value="DEFAULT_IMAGE"
          disabled
          class="w-full mt-1 input bg-slate-100 text-slate-500 cursor-not-allowed"
        />
        <p class="text-xs text-slate-500 mt-1">
          Image is automatically set by the system
        </p>
      </div>
    </div>

    <template #footer>
      <Button label="Batal" severity="secondary" @click="showDialog = false" />
      <Button
        :label="mode === 'create' ? 'Simpan' : 'Update'"
        class="!bg-blue-600"
        @click="submit"
      />
    </template>
  </Dialog>

  <!-- ===== DIALOG CONFIRM REMOVE ===== -->
  <Dialog
    v-model:visible="confirmRemoveDialog"
    modal
    header="Confirm Delete"
    :style="{ width: '25rem' }"
  >
    <p>Are you sure you want to delete this facility?</p>

    <template #footer>
      <Button label="Cancel" text @click="confirmRemoveDialog = false" />
      <Button label="Delete" severity="danger" @click="confirmRemove" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as H from "@src/utils/Helper";

import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Card from "primevue/card";

/* DEFAULT IMAGE */
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200&q=80";

/* DATA */
const fasilitas = ref([
  {
    nama: "UI UX",
    kategori: "Akademik",
    deskripsi: "Fasilitas desain UI UX modern",
    gambar: DEFAULT_IMAGE,
  },
  {
    nama: "AI",
    kategori: "Akademik",
    deskripsi: "Laboratorium Artificial Intelligence",
    gambar: DEFAULT_IMAGE,
  },
]);

/* STATE */
const showDialog = ref(false);
const confirmRemoveDialog = ref(false);
const mode = ref<"create" | "edit">("create");
const editIndex = ref<number | null>(null);
const removeIndex = ref<number | null>(null);

/* FORM */
const form = ref({
  nama: "",
  kategori: "Akademik",
  deskripsi: "",
  gambar: DEFAULT_IMAGE,
});

/* METHODS */
function openCreate() {
  mode.value = "create";
  resetForm();
  showDialog.value = true;
}

function openEdit(index: number) {
  mode.value = "edit";
  editIndex.value = index;
  form.value = { ...fasilitas.value[index] };
  showDialog.value = true;
}

function submit() {
  if (!form.value.nama || !form.value.kategori) {
    H.alert("warning", "Nama dan kategori wajib diisi", "warning");
    return;
  }

  const payload = { ...form.value, gambar: DEFAULT_IMAGE };

  if (mode.value === "create") {
    fasilitas.value.push(payload);
    H.alert("success", "Fasilitas berhasil ditambahkan", "success");
  } else if (editIndex.value !== null) {
    fasilitas.value[editIndex.value] = payload;
    H.alert("success", "Fasilitas berhasil diperbarui", "success");
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
    fasilitas.value.splice(removeIndex.value, 1);
    H.alert("success", "Fasilitas berhasil dihapus", "success");
  }
  confirmRemoveDialog.value = false;
  removeIndex.value = null;
}

function resetForm() {
  form.value = {
    nama: "",
    kategori: "Akademik",
    deskripsi: "",
    gambar: DEFAULT_IMAGE,
  };
}
</script>

<style scoped lang="scss">
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 16px;
}

.input {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
  }
}

/* DARK MODE */
.my-app-dark {
  .card {
    background: #020617;
  }

  h2 {
    color: #f8fafc;
  }

  table {
    color: #e5e7eb;
  }

  .text-slate-600 {
    color: #cbd5f5 !important;
  }

  .input {
    background: #020617;
    border-color: rgba(255, 255, 255, 0.15);
    color: #f8fafc;
  }

  .p-dialog {
    background: #020617;
    color: #e5e7eb;
  }
}
</style>
