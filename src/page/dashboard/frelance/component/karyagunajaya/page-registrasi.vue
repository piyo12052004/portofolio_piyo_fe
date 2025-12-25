<template>
  <div class="min-h-screen bg-white px-6 py-10">
    <div class="max-w-6xl mx-auto">
      <!-- TITLE -->
      <h1 class="text-2xl font-bold text-slate-800 mb-8">Registrasi</h1>

      <!-- FORM -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <!-- LEFT COLUMN -->
        <div>
          <label class="form-label">Username</label>
          <input type="text" class="form-input" />
        </div>

        <div>
          <label class="form-label">Password</label>
          <input type="password" class="form-input" />
        </div>

        <div>
          <label class="form-label">Nama Lengkap</label>
          <input type="text" class="form-input" />
        </div>

        <div>
          <label class="form-label">Nama Panggilan</label>
          <input type="text" class="form-input" />
        </div>

        <div>
          <label class="form-label">Jenis Kelamin</label>
          <select class="form-input">
            <option>Pilih</option>
            <option>Laki-laki</option>
            <option>Perempuan</option>
          </select>
        </div>

        <div>
          <label class="form-label">Tempat Lahir</label>
          <input type="text" class="form-input" />
        </div>

        <div>
          <label class="form-label">Tanggal Lahir</label>
          <input type="date" class="form-input" />
        </div>

        <div>
          <label class="form-label">Agama</label>
          <input type="text" class="form-input" />
        </div>

        <div>
          <label class="form-label">Email</label>
          <input type="email" class="form-input" />
        </div>

        <div>
          <label class="form-label">Alamat</label>
          <input type="text" class="form-input" />
        </div>

        <div>
          <label class="form-label">Jalur Masuk</label>
          <select class="form-input">
            <option>Pilih</option>
            <option>Reguler</option>
            <option>Prestasi</option>
          </select>
        </div>

        <div>
          <label class="form-label">NISN</label>
          <input type="text" class="form-input" />
        </div>

        <div>
          <label class="form-label">No HP</label>
          <input type="text" class="form-input" />
        </div>

        <!-- BUTTON -->
        <div class="md:col-span-2 pt-4">
          <button
            type="submit"
            class="w-full h-12 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Fokus UI dulu – nanti bisa ditambah v-model & API
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
/* =========================================
   DARK MODE – REGISTRASI PAGE
========================================= */
.my-app-dark {
  background-color: #020617;

  /* PAGE */
  .bg-white {
    background-color: #020617 !important;
  }

  /* TITLE */
  h1 {
    color: #f8fafc;
  }

  /* LABEL */
  .form-label {
    color: #cbd5f5;
  }

  /* INPUT & SELECT */
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

  /* SELECT ARROW */
  select.form-input {
    background-image: none;
  }

  /* BUTTON */
  button {
    background-color: #2563eb;
    color: #ffffff;

    &:hover {
      background-color: #1d4ed8;
    }
  }
}
</style>
