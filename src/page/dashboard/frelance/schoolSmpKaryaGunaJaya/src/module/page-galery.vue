<template>
  <section class="bg-grid min-h-screen p-6">
    <!-- INFO CARD -->
    <Card class="my-4">
      <template #title> Gallery </template>
      <template #content>
        <p class="m-0 leading-relaxed text-slate-600">
          The <b>Gallery</b> feature is used to manage and display documentation of school
          activities.
        </p>
        <p class="mt-3 text-sm text-slate-500">Developed by <b>Ikhsan Adriansyah</b></p>
      </template>
    </Card>

    <!-- HEADER -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-slate-800">Kelola Galeri</h1>
      <button
        @click="openCreate"
        class="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Tambah Galeri
      </button>
    </div>

    <!-- TABLE -->
    <div class="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white">
      <table class="min-w-full text-sm">
        <thead class="bg-slate-50 text-slate-600 uppercase text-xs">
          <tr>
            <th class="px-6 py-4 text-left">Judul</th>
            <th class="px-6 py-4 text-left">Gambar</th>
            <th class="px-6 py-4 text-left">Status</th>
            <th class="px-6 py-4 text-left">Tanggal</th>
            <th class="px-6 py-4 text-left">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in galeri"
            :key="index"
            class="border-t hover:bg-slate-50 transition"
          >
            <td class="px-6 py-4 font-medium text-slate-800">
              {{ item.judul }}
            </td>

            <td class="px-6 py-4">
              <img :src="item.gambar" class="w-12 h-12 rounded-md object-cover border" />
            </td>

            <td class="px-6 py-4">
              <span
                class="inline-flex px-3 py-1 rounded-full text-xs font-semibold"
                :class="
                  item.status
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                "
              >
                {{ item.status ? "Published" : "Draft" }}
              </span>
            </td>

            <td class="px-6 py-4 text-slate-600">
              {{ item.tanggal }}
            </td>

            <td class="px-6 py-4 space-x-3">
              <button @click="openEdit(index)" class="text-blue-600 hover:underline">
                Edit
              </button>
              <button @click="askRemove(index)" class="text-red-600 hover:underline">
                Hapus
              </button>
            </td>
          </tr>

          <tr v-if="galeri.length === 0">
            <td colspan="5" class="text-center py-6 text-slate-500">No data available</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ===== DIALOG ADD / EDIT ===== -->
    <Dialog
      v-model:visible="openModal"
      modal
      :header="mode === 'create' ? 'Tambah Galeri' : 'Edit Galeri'"
      :style="{ width: '45rem' }"
    >
      <div class="space-y-5">
        <div>
          <label class="block text-sm font-medium mb-1">Judul *</label>
          <input
            v-model="form.judul"
            type="text"
            class="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea
            v-model="form.deskripsi"
            rows="4"
            class="w-full rounded-md border px-4 py-2 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
          ></textarea>
        </div>

        <!-- Image disabled -->
        <div>
          <label class="block text-sm font-medium mb-1">Image</label>
          <input
            type="text"
            :value="DEFAULT_IMAGE"
            disabled
            class="w-full rounded-md border px-4 py-2 bg-slate-100 text-slate-500 cursor-not-allowed"
          />
          <p class="mt-1 text-xs text-slate-500">
            Image is automatically set by the system
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Tanggal *</label>
          <input
            v-model="form.tanggal"
            type="date"
            class="w-full rounded-md border px-4 py-2"
          />
        </div>

        <div class="flex items-center gap-2">
          <input type="checkbox" v-model="form.status" />
          <span class="text-sm">Publish sekarang</span>
        </div>
      </div>

      <template #footer>
        <button
          @click="openModal = false"
          class="px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-100"
        >
          Batal
        </button>

        <button
          @click="submit"
          class="px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          {{ mode === "create" ? "Simpan" : "Update" }}
        </button>
      </template>
    </Dialog>

    <!-- ===== DIALOG CONFIRM REMOVE ===== -->
    <Dialog
      v-model:visible="is_verifikasi_remove"
      modal
      header="Confirm Delete"
      :style="{ width: '25rem' }"
    >
      <p class="text-slate-700">Are you sure you want to delete this gallery item?</p>

      <template #footer>
        <button
          @click="is_verifikasi_remove = false"
          class="px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          @click="confirmRemove"
          class="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700"
        >
          Delete
        </button>
      </template>
    </Dialog>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";
import Dialog from "primevue/dialog";
import * as H from "@src/utils/Helper";

/* DEFAULT IMAGE */
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200&q=80";

/* DATA */
const galeri = ref([
  {
    judul: "Kegiatan Upacara Bendera",
    deskripsi: "Upacara rutin hari Senin",
    gambar: DEFAULT_IMAGE,
    tanggal: "2025-12-25",
    status: true,
  },
]);

const openModal = ref(false);
const mode = ref<"create" | "edit">("create");
const editIndex = ref<number | null>(null);

const is_verifikasi_remove = ref(false);
const removeIndex = ref<number | null>(null);

/* FORM */
const form = ref({
  judul: "",
  deskripsi: "",
  gambar: DEFAULT_IMAGE,
  tanggal: "",
  status: true,
});

/* METHODS */
function openCreate() {
  mode.value = "create";
  resetForm();
  openModal.value = true;
}

function openEdit(index: number) {
  mode.value = "edit";
  editIndex.value = index;
  form.value = { ...galeri.value[index] };
  openModal.value = true;
}

function submit() {
  if (!form.value.judul || !form.value.tanggal) {
    H.alert("warning", "Judul dan tanggal wajib diisi", "warning");
    return;
  }

  const payload = { ...form.value, gambar: DEFAULT_IMAGE };

  if (mode.value === "create") {
    galeri.value.unshift(payload);
    H.alert("success", "Galeri berhasil ditambahkan", "success");
  } else if (editIndex.value !== null) {
    galeri.value[editIndex.value] = payload;
    H.alert("success", "Galeri berhasil diperbarui", "success");
  }

  openModal.value = false;
  resetForm();
}

function askRemove(index: number) {
  removeIndex.value = index;
  is_verifikasi_remove.value = true;
}

function confirmRemove() {
  if (removeIndex.value !== null) {
    galeri.value.splice(removeIndex.value, 1);
    H.alert("success", "Galeri berhasil dihapus", "success");
  }
  is_verifikasi_remove.value = false;
  removeIndex.value = null;
}

function resetForm() {
  form.value = {
    judul: "",
    deskripsi: "",
    gambar: DEFAULT_IMAGE,
    tanggal: "",
    status: true,
  };
}
</script>

<style lang="scss" scoped>
.bg-grid {
  background-image: linear-gradient(rgba(137, 26, 162, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(137, 26, 162, 0.15) 1px, transparent 1px);
  background-size: 40px 80px;
}
/* =========================
   LIGHT MODE FIX
========================= */
.p-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
}

.p-card-body {
  background-color: #ffffff;
}

.p-card-title {
  color: #0f172a;
}

.p-card-content {
  color: #475569;
}

/* TABLE */
table {
  background-color: #ffffff;
}

thead {
  background-color: #f8fafc;
}

tbody tr:hover {
  background-color: #f1f5f9;
}

/* DARK MODE */
/* =========================
   DARK MODE – GALLERY
========================= */
.my-app-dark {
  background-color: #020617;

  /* TEXT */
  h1,
  h2 {
    color: #f8fafc;
  }

  p,
  span,
  label {
    color: #cbd5f5;
  }

  /* CARD */
  .p-card {
    background-color: #020617 !important;
    border: 1px solid #1e293b;
  }

  .p-card-body {
    background-color: #020617 !important;
  }

  .p-card-title {
    color: #f8fafc !important;
  }

  .p-card-content {
    color: #cbd5f5 !important;
  }

  /* TABLE */
  table {
    background-color: #020617;
    color: #e5e7eb;
  }

  thead {
    background-color: #020617;
    color: #94a3b8;
  }

  tbody tr {
    border-color: #1e293b;

    &:hover {
      background-color: rgba(148, 163, 184, 0.06);
    }
  }

  td,
  th {
    border-color: #1e293b;
  }

  /* INPUT */
  input,
  textarea {
    background-color: #020617;
    border-color: #334155;
    color: #f8fafc;

    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 1px #3b82f6;
    }
  }

  /* DIALOG PRIMEVUE */
  .p-dialog {
    background-color: #020617;
    border: 1px solid #1e293b;
  }

  .p-dialog-header {
    background-color: #020617;
    color: #f8fafc;
    border-bottom: 1px solid #1e293b;
  }

  .p-dialog-content {
    background-color: #020617;
  }

  .p-dialog-footer {
    background-color: #020617;
    border-top: 1px solid #1e293b;
  }
}
</style>
