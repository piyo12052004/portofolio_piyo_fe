<template>
  <div>
    <Card class="my-4">
      <template #title> Program Unggulan </template>

      <template #content>
        <p class="m-0 leading-relaxed text-slate-600">
          Fitur <b>Program Unggulan</b> digunakan untuk mengelola daftar program unggulan
          sekolah yang ditampilkan pada website. Melalui fitur ini, admin dapat melakukan
          proses <b>Create, Read, Update, dan Delete (CRUD)</b> terhadap data program,
          termasuk pengelolaan gambar, deskripsi, status aktif/nonaktif, serta pengaturan
          urutan tampilan program.
        </p>

        <p class="mt-3 text-sm text-slate-500">Development by <b>Ikhsan Adriansyah</b></p>
      </template>
    </Card>
  </div>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Program Unggulan</h1>
        <p class="text-sm text-slate-500">Daftar program unggulan sekolah</p>
      </div>

      <button
        @click="showDialog = true"
        class="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Tambah Program
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-slate-600">
          <tr>
            <th class="px-4 py-3 text-left">No</th>
            <th class="px-4 py-3 text-left">Judul</th>
            <th class="px-4 py-3 text-left">Gambar</th>
            <th class="px-4 py-3 text-left">Status</th>
            <th class="px-4 py-3 text-left">Urutan</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in programs"
            :key="item.id"
            class="border-t hover:bg-slate-50"
          >
            <td class="px-4 py-3">{{ i + 1 }}</td>
            <td class="px-4 py-3 font-medium">{{ item.title }}</td>
            <td class="px-4 py-3">
              <img :src="item.image" class="w-12 h-12 rounded-md object-cover" />
            </td>
            <td class="px-4 py-3">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  item.status === 'Aktif'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700',
                ]"
              >
                {{ item.status }}
              </span>
            </td>
            <td class="px-4 py-3">{{ item.order }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Dialog -->
    <div v-if="showDialog" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/40" @click="showDialog = false"></div>

      <!-- Card -->
      <div class="relative w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-bold mb-6">Tambah Program Unggulan</h2>

        <div class="space-y-4">
          <!-- Image -->
          <div>
            <label class="font-medium text-sm">Gambar Program</label>
            <input type="file" class="mt-2 block w-full text-sm" />
            <p class="text-xs text-slate-500 mt-1">PNG, JPG, JPEG (Max. 2MB)</p>
          </div>

          <!-- Title -->
          <div>
            <label class="font-medium text-sm">Judul Program</label>
            <input
              type="text"
              class="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="font-medium text-sm">Deskripsi Program</label>
            <textarea
              rows="4"
              class="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            ></textarea>
          </div>

          <!-- Order -->
          <div>
            <label class="font-medium text-sm">Urutan Tampilan</label>
            <input
              type="number"
              class="mt-1 w-full border rounded-md px-3 py-2"
              value="0"
            />
          </div>

          <!-- Status -->
          <div class="flex items-center gap-6">
            <label class="flex items-center gap-2">
              <input type="radio" checked />
              <span>Aktif</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" />
              <span>Nonaktif</span>
            </label>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-between items-center mt-6">
          <button
            class="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Simpan Program
          </button>

          <button
            @click="showDialog = false"
            class="text-slate-500 hover:underline text-sm"
          >
            Kembali ke Daftar Program
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";

const showDialog = ref(false);

// 🔥 10 DATA DUMMY
const programs = ref([
  {
    id: 1,
    title: "Program Tahfidz",
    image: "https://picsum.photos/100?1",
    status: "Aktif",
    order: 1,
  },
  {
    id: 2,
    title: "Program IT",
    image: "https://picsum.photos/100?2",
    status: "Aktif",
    order: 2,
  },
  {
    id: 3,
    title: "Bahasa Inggris",
    image: "https://picsum.photos/100?3",
    status: "Aktif",
    order: 3,
  },
  {
    id: 4,
    title: "Olahraga Prestasi",
    image: "https://picsum.photos/100?4",
    status: "Aktif",
    order: 4,
  },
  {
    id: 5,
    title: "Karya Ilmiah",
    image: "https://picsum.photos/100?5",
    status: "Nonaktif",
    order: 5,
  },
  {
    id: 6,
    title: "Robotik",
    image: "https://picsum.photos/100?6",
    status: "Aktif",
    order: 6,
  },
  {
    id: 7,
    title: "Pramuka",
    image: "https://picsum.photos/100?7",
    status: "Aktif",
    order: 7,
  },
  {
    id: 8,
    title: "Desain Grafis",
    image: "https://picsum.photos/100?8",
    status: "Aktif",
    order: 8,
  },
  {
    id: 9,
    title: "Public Speaking",
    image: "https://picsum.photos/100?9",
    status: "Nonaktif",
    order: 9,
  },
  {
    id: 10,
    title: "Entrepreneur",
    image: "https://picsum.photos/100?10",
    status: "Aktif",
    order: 10,
  },
]);
</script>
<style lang="scss" scoped>
/* =========================
   DARK MODE – PROGRAM UNGGULAN
========================= */
.my-app-dark {
  background-color: #0f172a; // slate-900

  /* TEXT */
  h1,
  h2,
  h3 {
    color: #f8fafc;
  }

  p,
  span,
  label {
    color: #cbd5e1;
  }

  /* CARD */
  .p-card,
  .bg-white {
    background-color: #020617;
    border: 1px solid #1e293b;
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
      background-color: rgba(148, 163, 184, 0.08);
    }
  }

  th,
  td {
    border-color: #1e293b;
  }

  /* STATUS BADGE */
  .bg-green-100 {
    background-color: rgba(34, 197, 94, 0.15);
    color: #86efac;
  }

  .bg-red-100 {
    background-color: rgba(239, 68, 68, 0.15);
    color: #fca5a5;
  }

  /* INPUT & TEXTAREA */
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

  /* MODAL */
  .fixed {
    .bg-white {
      background-color: #020617;
      border: 1px solid #1e293b;
    }
  }

  /* BUTTON */
  .bg-blue-600 {
    background-color: #2563eb;

    &:hover {
      background-color: #1d4ed8;
    }
  }

  /* OVERLAY */
  .bg-black\/40 {
    background-color: rgba(0, 0, 0, 0.7);
  }
}
</style>
