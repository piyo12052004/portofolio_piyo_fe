<template>
  <Card class="my-4">
    <template #title> PPDB Payment </template>

    <template #content>
      <p class="m-0 leading-relaxed text-slate-600">
        The <b>PPDB Payment</b> feature is designed to manage the online payment process
        for new student admissions and is <b>integrated with Midtrans</b>. Through this
        feature, prospective students can securely pay the PPDB registration form fee
        using various payment methods such as
        <b>Bank Transfer, E-Wallets, QRIS, and Virtual Accounts</b>.
      </p>

      <p class="mt-2 leading-relaxed text-slate-600">
        This system supports real-time payment status tracking (<b
          >Pending, Successful, or Failed</b
        >) and is directly connected to the database to ensure payment validation before
        the registration process continues.
      </p>

      <p class="mt-3 text-sm text-slate-500">Developed by <b>Piyo Aswandi</b></p>
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
// import Vue from "vue";
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
