<template>
  <Card class="my-4">
    <template #title> Pembayaran PPDB </template>

    <template #content>
      <p class="m-0 leading-relaxed text-slate-600">
        Fitur <b>Pembayaran PPDB</b> digunakan untuk mengelola proses pembayaran
        pendaftaran peserta didik baru secara
        <b>online dan terintegrasi dengan Midtrans</b>. Melalui fitur ini, calon siswa
        dapat melakukan pembayaran formulir PPDB dengan aman menggunakan berbagai metode
        pembayaran seperti <b>Transfer Bank, E-Wallet, QRIS, dan Virtual Account</b>.
      </p>

      <p class="mt-2 leading-relaxed text-slate-600">
        Sistem ini mendukung pencatatan status pembayaran secara real-time (<b
          >Pending, Berhasil, atau Gagal</b
        >), serta terhubung langsung dengan database untuk memastikan validasi pembayaran
        sebelum proses pendaftaran dilanjutkan.
      </p>

      <p class="mt-3 text-sm text-slate-500">Development by <b>Piyo Aswandi</b></p>
    </template>
  </Card>

  <section class="payment-page">
    <!-- TAB HEADER -->
    <div class="tabs">
      <span class="tab">Calon Siswa</span>
      <span class="tab active">Pembayaran</span>
    </div>

    <!-- CARD -->
    <div class="payment-card">
      <h2 class="title">Detail Pembayaran Formulir</h2>

      <div class="form-grid">
        <div class="field">
          <label>Username</label>
          <input type="text" value="hanina" disabled />
        </div>

        <div class="field">
          <label>Nama Lengkap</label>
          <input type="text" value="Hanina Nurfaizah" disabled />
        </div>

        <div class="field">
          <label>Jalur Masuk</label>
          <input type="text" value="Online" disabled />
        </div>

        <div class="field">
          <label>No Handphone</label>
          <input type="text" value="08312873618273" disabled />
        </div>

        <div class="field full">
          <label>Total Pembayaran Formulir</label>
          <input type="text" value="Rp. 30.000" disabled />
        </div>
      </div>

      <!-- ACTION -->
      <button class="btn-pay">Bayar</button>
    </div>
  </section>
</template>
<script lang="ts" setup>
import Vue from "vue";
import Card from "primevue/card";
</script>
<style scoped lang="scss">
.payment-page {
  padding: 24px;
  min-height: 100vh;
  background: #f8fafc;
}

.tabs {
  display: flex;
  gap: 24px;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 20px;

  .tab {
    padding: 12px 0;
    font-weight: 500;
    color: #64748b;

    &.active {
      color: #2563eb;
      border-bottom: 3px solid #2563eb;
    }
  }
}

.payment-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  .full {
    grid-column: span 2;
  }
}

.field {
  display: flex;
  flex-direction: column;

  label {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  input {
    border-radius: 10px;
    border: 1px solid #d1d5db;
    padding: 10px 14px;
    background: #f9fafb;
    font-size: 14px;
  }
}

.btn-pay {
  margin-top: 24px;
  width: 100%;
  background: #2563eb;
  color: white;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  transition: background 0.2s ease;

  &:hover {
    background: #1e40af;
  }
}

/* ================= DARK MODE ================= */
.my-app-dark {
  .payment-page {
    background: #020617;
  }

  .tabs {
    border-color: #1e293b;

    .tab {
      color: #94a3b8;

      &.active {
        color: #60a5fa;
        border-color: #60a5fa;
      }
    }
  }

  .payment-card {
    background: #020617;
    border: 1px solid #1e293b;
    box-shadow: none;
  }

  .title {
    color: #f1f5f9;
  }

  .field {
    label {
      color: #cbd5f5;
    }

    input {
      background: #020617;
      border-color: #334155;
      color: #e5e7eb;
    }
  }

  .btn-pay {
    background: #3b82f6;

    &:hover {
      background: #2563eb;
    }
  }
}
</style>
