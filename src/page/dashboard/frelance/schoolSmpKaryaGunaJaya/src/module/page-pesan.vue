<template>
  <Card class="my-4">
    <template #title> Messages </template>

    <template #content>
      <p class="m-0 leading-relaxed text-slate-600">
        The <b>Messages</b> feature is used to manage messages, feedback, and suggestions
        submitted by users through the school website. Through this feature,
        administrators can view message details, read message content, and provide
        <b>direct replies</b> as an official response from the school.
      </p>

      <p class="mt-2 leading-relaxed text-slate-600">
        Each message is stored in the <b>database</b> and includes sender information such
        as name, email, subject, and reply status, making it easier to monitor and follow
        up on communications.
      </p>

      <p class="mt-3 text-sm text-slate-500">Developed by <b>Piyo Aswandi</b></p>
    </template>
  </Card>

  <div class="p-6 space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-semibold">PESAN</h2>
      <p class="text-sm text-slate-500">Pesan dan Kritik</p>
    </div>

    <!-- Card Table -->
    <div class="card">
      <table class="min-w-full text-sm">
        <thead class="border-b text-slate-500">
          <tr>
            <th class="p-3 text-left w-12">No</th>
            <th class="p-3 text-left">Nama</th>
            <th class="p-3 text-left">Email</th>
            <th class="p-3 text-left">Subjek</th>
            <th class="p-3 text-left">Pesan</th>
            <th class="p-3 text-left w-24">Balasan</th>
            <th class="p-3 text-left w-64">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in pesanList"
            :key="item.id"
            class="border-b last:border-0"
          >
            <td class="p-3">{{ index + 1 }}</td>

            <td class="p-3 font-medium">{{ item.nama }}</td>

            <td class="p-3 text-slate-600">
              {{ item.email }}
            </td>

            <td class="p-3">
              {{ item.subjek }}
            </td>

            <td class="p-3 text-slate-700">
              {{ item.pesan }}
            </td>

            <td class="p-3 text-center">
              <span v-if="item.balasan">✔</span>
              <span v-else>-</span>
            </td>

            <td class="p-3">
              <div class="space-y-2">
                <textarea
                  v-model="item.balasanInput"
                  rows="2"
                  class="input w-full"
                  placeholder="Tulis balasan..."
                ></textarea>

                <button class="btn-primary w-full" @click="balasPesan(item)">
                  Balas
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";

const pesanList = ref([
  {
    id: 1,
    nama: "ikhsan",
    email: "email@exsampel.com",
    subjek: "Testimoni",
    pesan: "Ikut Kontribusi Pembangunan Aplikasi",
    balasan: null,
    balasanInput: "",
  },
  {
    id: 2,
    nama: "Piyo Aswadi",
    email: "piyoaswandi@gmail.com",
    subjek: "Testimoni",
    pesan: "Pembuat Aplikasi",
    balasan: null,
    balasanInput: "",
  },
]);

function balasPesan(item: any) {
  if (!item.balasanInput) return;

  item.balasan = item.balasanInput;
  item.balasanInput = "";

  // 🔥 nanti bisa ganti API
  // axios.post('/pesan/balas', { id: item.id, balasan: item.balasan })
}
</script>
<style scoped lang="scss">
.card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
}

.input {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 13px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
  }
}

.btn-primary {
  background: #2563eb;
  color: white;
  border-radius: 8px;
  padding: 8px;
  font-size: 13px;
  font-weight: 600;
  transition: background 0.2s ease;

  &:hover {
    background: #1e40af;
  }
}
/* ===============================
   DARK MODE – PESAN
=============================== */
.my-app-dark {
  /* Card */
  .card {
    background: #020617; // slate-950
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  }

  /* Header */
  h2 {
    color: #f8fafc;
  }

  .text-slate-500 {
    color: #94a3b8 !important;
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

    .text-slate-600 {
      color: #cbd5f5 !important;
    }

    .text-slate-700 {
      color: #e5e7eb !important;
    }
  }

  /* Input / Textarea */
  .input {
    background: #020617;
    border-color: rgba(255, 255, 255, 0.15);
    color: #f8fafc;

    &::placeholder {
      color: #64748b;
    }

    &:focus {
      border-color: #60a5fa;
      box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.25);
    }
  }

  /* Button */
  .btn-primary {
    background: #2563eb;

    &:hover {
      background: #1d4ed8;
    }
  }

  /* Status icon */
  span {
    color: #e5e7eb;
  }
}
</style>
