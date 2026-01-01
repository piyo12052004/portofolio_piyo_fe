<template>
  <div class="min-h-screen bg-white px-6 py-10">
    <div class="max-w-6xl mx-auto">
      <!-- TITLE -->
      <h1 class="text-2xl font-bold text-slate-800 mb-8">Registrasi</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <!-- Username -->
        <div>
          <label class="form-label">Username *</label>
          <input
            v-model="form.username"
            type="text"
            class="form-input"
            :class="{ 'input-error': missingFields.includes('username') }"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="form-label">Password *</label>
          <input
            v-model="form.password"
            type="password"
            class="form-input"
            :class="{ 'input-error': missingFields.includes('password') }"
          />
        </div>

        <!-- Nama Lengkap -->
        <div>
          <label class="form-label">Nama Lengkap *</label>
          <input
            v-model="form.nama_lengkap"
            type="text"
            class="form-input"
            :class="{ 'input-error': missingFields.includes('nama_lengkap') }"
          />
        </div>

        <!-- Nama Panggilan -->
        <div>
          <label class="form-label">Nama Panggilan</label>
          <input v-model="form.nama_panggilan" type="text" class="form-input" />
        </div>

        <!-- Jenis Kelamin -->
        <div>
          <label class="form-label">Jenis Kelamin *</label>
          <select
            v-model="form.jenis_kelamin"
            class="form-input"
            :class="{ 'input-error': missingFields.includes('jenis_kelamin') }"
          >
            <option value="">Pilih</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>

        <!-- Tanggal Lahir -->
        <div>
          <label class="form-label">Tanggal Lahir *</label>
          <input
            v-model="form.tanggal_lahir"
            type="date"
            class="form-input"
            :class="{ 'input-error': missingFields.includes('tanggal_lahir') }"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="form-label">Email *</label>
          <input
            v-model="form.email"
            type="email"
            class="form-input"
            :class="{ 'input-error': missingFields.includes('email') }"
          />
        </div>

        <!-- Jalur Masuk -->
        <div>
          <label class="form-label">Jalur Masuk *</label>
          <select
            v-model="form.jalur_masuk"
            class="form-input"
            :class="{ 'input-error': missingFields.includes('jalur_masuk') }"
          >
            <option value="">Pilih</option>
            <option value="reguler">Reguler</option>
            <option value="prestasi">Prestasi</option>
          </select>
        </div>

        <!-- NISN -->
        <div>
          <label class="form-label">NISN *</label>
          <input
            v-model="form.nisn"
            type="text"
            class="form-input"
            :class="{ 'input-error': missingFields.includes('nisn') }"
          />
        </div>

        <!-- No HP -->
        <div>
          <label class="form-label">No HP *</label>
          <input
            v-model="form.no_hp"
            type="text"
            class="form-input"
            :class="{ 'input-error': missingFields.includes('no_hp') }"
          />
        </div>

        <!-- BUTTON -->
        <div class="md:col-span-2 pt-4">
          <button
            @click="submit"
            class="w-full h-12 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import * as H from "@src/utils/Helper";

const form = ref({
  username: "",
  password: "",
  nama_lengkap: "",
  nama_panggilan: "",
  jenis_kelamin: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  agama: "",
  email: "",
  alamat: "",
  jalur_masuk: "",
  nisn: "",
  no_hp: "",
});

/**
 * Label field untuk notifikasi
 */
const fieldLabels: Record<string, string> = {
  username: "Username",
  password: "Password",
  nama_lengkap: "Nama Lengkap",
  jenis_kelamin: "Jenis Kelamin",
  tanggal_lahir: "Tanggal Lahir",
  email: "Email",
  jalur_masuk: "Jalur Masuk",
  nisn: "NISN",
  no_hp: "No HP",
};

/**
 * Field yang masih kosong
 */
const missingFields = computed(() => {
  return Object.keys(fieldLabels).filter(
    (key) => !form.value[key as keyof typeof form.value]
  );
});

/**
 * Valid jika tidak ada field kosong
 */
const isValid = computed(() => missingFields.value.length === 0);

function submit() {
  if (!isValid.value) {
    const message =
      "Please complete the following required fields:\n\n• " +
      missingFields.value.map((k) => fieldLabels[k]).join("\n• ");

    H.alert("warning", message, "warning");
    return;
  }

  console.log("FORM DATA:", form.value);
  H.alert("success", "Registration data is valid", "success");
}
</script>

<style lang="scss" scoped>
.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
  margin-bottom: 0.25rem;
}

.form-input {
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.15s ease;
}

.form-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

/* ERROR STATE */
.input-error {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.25);
}

/* =========================================
   DARK MODE
========================================= */
.my-app-dark {
  background-color: #020617;

  .bg-white {
    background-color: #020617 !important;
  }

  h1 {
    color: #f8fafc;
  }

  .form-label {
    color: #cbd5f5;
  }

  .form-input {
    background-color: #0f172a;
    border-color: rgba(255, 255, 255, 0.08);
    color: #e5e7eb;

    &::placeholder {
      color: #64748b;
    }

    &:focus {
      border-color: #60a5fa;
      box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.35);
    }
  }

  button {
    background-color: #2563eb;

    &:hover {
      background-color: #1d4ed8;
    }
  }
}
</style>
