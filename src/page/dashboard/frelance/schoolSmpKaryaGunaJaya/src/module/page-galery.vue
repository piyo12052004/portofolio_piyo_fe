<template>
  <section class="bg-grid">
    <div>
      <Card class="my-4">
        <template #title> Galeri </template>

        <template #content>
          <p class="m-0 leading-relaxed text-slate-600">
            Fitur <b>Galeri</b> digunakan untuk mengelola dan menampilkan dokumentasi
            kegiatan sekolah. Admin dapat mengunggah foto-foto kegiatan yang akan
            ditampilkan pada halaman galeri website sekolah.
          </p>

          <p class="mt-3 text-sm text-slate-500">
            Development by <b>Ikhsan Adriansyah</b>
          </p>
        </template>
      </Card>
    </div>
    <div class="p-6 space-y-6">
      <!-- HEADER -->
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-slate-800">Kelola Galeri</h1>

        <button
          @click="openModal = true"
          class="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Tambah Galeri
        </button>
      </div>

      <div class="p-6 space-y-6">
        <!-- ALERT -->
        <div
          class="rounded-md border border-green-300 bg-green-100 text-green-800 px-4 py-3"
        >
          Galeri berhasil ditambahkan
        </div>

        <!-- TABLE -->
        <div
          class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <table class="min-w-full text-sm">
            <thead class="bg-slate-50 text-slate-600 uppercase text-xs">
              <tr>
                <th class="px-6 py-4 text-left">Judul</th>
                <th class="px-6 py-4 text-left">Gambar</th>
                <th class="px-6 py-4 text-left">Status</th>
                <th class="px-6 py-4 text-left">Tanggal Publikasi</th>
                <th class="px-6 py-4 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, index) in berita"
                :key="index"
                class="border-t hover:bg-slate-50 transition"
              >
                <!-- JUDUL -->
                <td class="px-6 py-4 font-medium text-slate-800">
                  {{ item.judul }}
                </td>

                <!-- GAMBAR -->
                <td class="px-6 py-4">
                  <img
                    :src="item.gambar"
                    class="w-12 h-12 rounded-md object-cover border"
                  />
                </td>

                <!-- STATUS -->
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    :class="
                      item.status === 'Dipublikasikan'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    "
                  >
                    {{ item.status }}
                  </span>
                </td>

                <!-- TANGGAL -->
                <td class="px-6 py-4 text-slate-600">
                  {{ item.tanggal }}
                </td>

                <!-- AKSI -->
                <td class="px-6 py-4 space-x-3">
                  <button class="text-blue-600 hover:underline">Edit</button>
                  <button class="text-red-600 hover:underline">Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ===== MODAL ===== -->
      <div v-if="openModal" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/40" @click="openModal = false"></div>

        <!-- Modal Card -->
        <div class="relative z-10 w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
          <!-- TITLE -->
          <h2 class="text-lg font-bold text-slate-800 mb-6">Tambah Galeri</h2>

          <!-- FORM -->
          <div class="space-y-5">
            <!-- Judul -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                Judul Galeri
              </label>
              <input
                type="text"
                class="w-full rounded-md border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <!-- Konten -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                Konten Galeri
              </label>
              <textarea
                rows="6"
                class="w-full rounded-md border border-slate-300 px-4 py-2 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
              ></textarea>
            </div>

            <!-- Gambar -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                Gambar Galeri
              </label>

              <input
                type="file"
                class="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-slate-800 file:text-white hover:file:bg-slate-700"
              />

              <p class="mt-1 text-xs text-slate-500">
                Format yang didukung: JPG, JPEG, PNG, GIF. Maksimal 2MB
              </p>
            </div>

            <!-- Tanggal -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                Tanggal Publikasi
              </label>
              <input
                type="date"
                class="w-full rounded-md border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <!-- Publish -->
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                checked
                class="w-4 h-4 text-blue-600 rounded border-slate-300"
              />
              <span class="text-sm text-slate-700"> Publish sekarang </span>
            </div>
          </div>

          <!-- ACTION -->
          <div class="mt-6 flex justify-end gap-3">
            <button
              @click="openModal = false"
              class="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Batal
            </button>

            <button
              class="px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Simpan Galeri
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";

const berita = [
  {
    judul: "Kegiatan Upacara Bendera",
    gambar: "https://i.pravatar.cc/100?img=1",
    status: "Dipublikasikan",
    tanggal: "25 Dec 2025",
  },
  {
    judul: "Lomba Kebersihan Kelas",
    gambar: "https://i.pravatar.cc/100?img=2",
    status: "Dipublikasikan",
    tanggal: "24 Dec 2025",
  },
  {
    judul: "Peringatan Hari Guru",
    gambar: "https://i.pravatar.cc/100?img=3",
    status: "Dipublikasikan",
    tanggal: "23 Dec 2025",
  },
  {
    judul: "Kegiatan Pramuka",
    gambar: "https://i.pravatar.cc/100?img=4",
    status: "Dipublikasikan",
    tanggal: "22 Dec 2025",
  },
  {
    judul: "Class Meeting Semester Ganjil",
    gambar: "https://i.pravatar.cc/100?img=5",
    status: "Dipublikasikan",
    tanggal: "21 Dec 2025",
  },
  {
    judul: "Ujian Akhir Semester",
    gambar: "https://i.pravatar.cc/100?img=6",
    status: "Dipublikasikan",
    tanggal: "20 Dec 2025",
  },
  {
    judul: "Kerja Bakti Sekolah",
    gambar: "https://i.pravatar.cc/100?img=7",
    status: "Dipublikasikan",
    tanggal: "19 Dec 2025",
  },
  {
    judul: "Kunjungan Dinas Pendidikan",
    gambar: "https://i.pravatar.cc/100?img=8",
    status: "Dipublikasikan",
    tanggal: "18 Dec 2025",
  },
  {
    judul: "Pelatihan Guru",
    gambar: "https://i.pravatar.cc/100?img=9",
    status: "Dipublikasikan",
    tanggal: "17 Dec 2025",
  },
  {
    judul: "Penerimaan Siswa Baru",
    gambar: "https://i.pravatar.cc/100?img=10",
    status: "Dipublikasikan",
    tanggal: "16 Dec 2025",
  },
];

const openModal = ref(false);
</script>
<style lang="scss" scoped>
.my-app-dark {
  background-color: #0f172a; // slate-900

  .bg-grid {
    background-image: linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
  }

  /* TEXT */
  h1,
  h2,
  h3,
  h4 {
    color: #f1f5f9;
  }

  p,
  span,
  label {
    color: #cbd5f5;
  }

  /* CARD */
  .p-card {
    background: #020617;
    border: 1px solid #1e293b;

    .p-card-title {
      color: #f8fafc;
    }
  }

  /* ALERT */
  .bg-green-100 {
    background-color: rgba(34, 197, 94, 0.15);
    border-color: rgba(34, 197, 94, 0.4);
    color: #bbf7d0;
  }

  /* TABLE */
  table {
    background: #020617;
    color: #e5e7eb;
  }

  thead {
    background: #020617;
    color: #94a3b8;
  }

  tbody tr {
    border-color: #1e293b;

    &:hover {
      background: rgba(148, 163, 184, 0.06);
    }
  }

  td,
  th {
    border-color: #1e293b;
  }

  /* INPUT */
  input,
  textarea {
    background: #020617;
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
      background: #020617;
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

  .border-slate-300 {
    border-color: #334155;
  }

  .hover\:bg-slate-100:hover {
    background-color: rgba(148, 163, 184, 0.1);
  }
}
.bg-grid {
  background-image: linear-gradient(rgba(137, 26, 162, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(137, 26, 162, 0.15) 1px, transparent 1px);
  background-size: 40px 80px;
}
</style>
