<template>
  <Card class="my-4">
    <template #title> Fasilitas </template>

    <template #content>
      <p class="m-0 leading-relaxed text-slate-600">
        Fitur <b>Fasilitas</b> digunakan untuk mengelola data fasilitas yang dimiliki oleh
        sekolah, baik fasilitas akademik maupun non-akademik. Melalui fitur ini, admin
        dapat melakukan proses <b>Create, Read, Update, dan Delete (CRUD)</b> data
        fasilitas, termasuk pengelolaan nama fasilitas, kategori, deskripsi, serta gambar
        pendukung yang akan ditampilkan pada website sekolah.
      </p>

      <p class="mt-3 text-sm text-slate-500">Development by <b>Ikhsan Adriansyah</b></p>
    </template>
  </Card>

  <div class="p-6 space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold">Daftar Fasilitas</h2>

      <Button
        label="Tambah Fasilitas"
        icon="pi pi-plus"
        class="!bg-blue-600"
        @click="showDialog = true"
      />
    </div>

    <!-- Table -->
    <div class="card">
      <table class="min-w-full text-sm">
        <thead class="border-b text-slate-500">
          <tr>
            <th class="p-3 text-left">Gambar</th>
            <th class="p-3 text-left">Nama</th>
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

            <td class="p-3 text-slate-600">
              {{ item.deskripsi }}
            </td>

            <td class="p-3 space-x-3">
              <button class="text-blue-600 hover:underline">Edit</button>
              <button class="text-red-600 hover:underline">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Dialog -->
    <Dialog
      v-model:visible="showDialog"
      modal
      header="Tambah Fasilitas"
      :style="{ width: '40rem' }"
    >
      <form class="space-y-4">
        <div>
          <label class="text-sm font-medium">Nama Fasilitas</label>
          <input
            v-model="form.nama"
            class="w-full mt-1 input"
            placeholder="Contoh: Laboratorium Komputer"
          />
        </div>

        <div>
          <label class="text-sm font-medium">Kategori</label>
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

        <div>
          <label class="text-sm font-medium">Gambar</label>
          <input type="file" class="mt-1" />
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <Button label="Batal" severity="secondary" @click="showDialog = false" />
          <Button label="Simpan" class="!bg-blue-600" @click.prevent="submit" />
        </div>
      </form>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Card from "primevue/card";

const showDialog = ref(false);

const fasilitas = ref([
  {
    nama: "UI UX",
    deskripsi: "Fasilitas desain UI UX modern",
    gambar: "https://picsum.photos/100?1",
  },
  {
    nama: "AI",
    deskripsi: "Laboratorium Artificial Intelligence",
    gambar: "https://picsum.photos/100?2",
  },
  {
    nama: "Programmer Engineering",
    deskripsi: "Ruang belajar pemrograman",
    gambar: "https://picsum.photos/100?3",
  },
  {
    nama: "Badminton",
    deskripsi: "Lapangan badminton indoor",
    gambar: "https://picsum.photos/100?4",
  },
  {
    nama: "Voli",
    deskripsi: "Lapangan voli sekolah",
    gambar: "https://picsum.photos/100?5",
  },
  {
    nama: "Futsal",
    deskripsi: "Lapangan futsal standar",
    gambar: "https://picsum.photos/100?6",
  },
  {
    nama: "Perpustakaan",
    deskripsi: "Perpustakaan digital & fisik",
    gambar: "https://picsum.photos/100?7",
  },
  {
    nama: "Laboratorium IPA",
    deskripsi: "Praktikum sains lengkap",
    gambar: "https://picsum.photos/100?8",
  },
  {
    nama: "Aula Sekolah",
    deskripsi: "Kegiatan besar & event",
    gambar: "https://picsum.photos/100?9",
  },
  {
    nama: "UKS",
    deskripsi: "Unit kesehatan sekolah",
    gambar: "https://picsum.photos/100?10",
  },
]);

const form = ref({
  nama: "",
  kategori: "Akademik",
  deskripsi: "",
});

function submit() {
  showDialog.value = false;
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
/* ===============================
   DARK MODE – FASILITAS
=============================== */
.my-app-dark {
  /* Card wrapper */
  .card {
    background: #020617; // slate-950
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  }

  /* Header text */
  h2 {
    color: #f8fafc;
  }

  /* Table */
  table {
    color: #e5e7eb;

    thead {
      border-color: rgba(255, 255, 255, 0.08);
      color: #94a3b8;
    }

    tbody tr {
      border-color: rgba(255, 255, 255, 0.08);

      &:hover {
        background: rgba(255, 255, 255, 0.04);
      }
    }

    td {
      color: #e5e7eb;
    }
  }

  /* Description text */
  .text-slate-600 {
    color: #cbd5f5 !important;
  }

  .text-slate-500 {
    color: #94a3b8 !important;
  }

  /* Input / Select / Textarea */
  .input {
    background: #020617;
    border-color: rgba(255, 255, 255, 0.15);
    color: #f8fafc;

    &:focus {
      border-color: #60a5fa;
      box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.25);
    }
  }

  /* Dialog */
  .p-dialog {
    background: #020617;
    color: #e5e7eb;

    .p-dialog-header {
      background: #020617;
      color: #f8fafc;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .p-dialog-content {
      background: #020617;
    }
  }
}
</style>
