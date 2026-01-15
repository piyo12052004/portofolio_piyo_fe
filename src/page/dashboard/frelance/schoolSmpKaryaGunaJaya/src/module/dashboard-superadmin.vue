<template>
  <section class="bg-grid p-8">
    <div class="my-4">
      <Card class="my-4">
        <template #title> Dashboard Superadmin </template>

        <template #content>
          <p class="m-0 leading-relaxed text-slate-600">
            This dashboard is designed to display a summary of the system’s core data,
            including
            <b>Total News</b>, <b>Total Galleries</b>, <b>Total Users</b>, and
            <b>Total Students</b>. All data is displayed <b>dynamically</b> and retrieved
            directly from the <b>database</b> to ensure the information remains accurate
            and up to date.
          </p>

          <p class="mt-3 text-sm text-slate-500">Developed by <b>Ikhsan Adriansyah</b></p>
        </template>
      </Card>
    </div>
    <div class="p-6 space-y-6">
      <!-- ================= STAT CARDS ================= -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Berita"
          :value="0"
          bg="bg-blue-100"
          icon="pi pi-file"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Total Galeri"
          :value="0"
          bg="bg-green-100"
          icon="pi pi-image"
          iconColor="text-green-600"
        />

        <StatCard
          title="Total Pengguna"
          :value="1"
          bg="bg-purple-100"
          icon="pi pi-users"
          iconColor="text-purple-600"
        />

        <StatCard
          title="Total Siswa"
          :value="1"
          bg="bg-yellow-100"
          icon="pi pi-book"
          iconColor="text-yellow-600"
        />
      </div>

      <!-- ================= MANAGEMENT CARDS ================= -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Berita -->
        <ManageCard
          title="Manajemen Berita"
          primaryLabel="Tambah Berita Baru"
          secondaryLabel="Lihat Semua Berita"
          primaryColor="bg-blue-600 hover:bg-blue-700"
        />

        <!-- Galeri -->
        <ManageCard
          title="Manajemen Galeri"
          primaryLabel="Tambah Foto Baru"
          secondaryLabel="Lihat Semua Foto"
          primaryColor="bg-green-600 hover:bg-green-700"
        />

        <!-- Pengguna -->
        <ManageCard
          title="Manajemen Pengguna"
          primaryLabel="Tambah Pengguna Baru"
          secondaryLabel="Lihat Semua Pengguna"
          primaryColor="bg-purple-600 hover:bg-purple-700"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import StatCard from "@src/page/dashboard/frelance/component/karyagunajaya/StatCard.vue";
import ManageCard from "@src/page/dashboard/frelance/component/karyagunajaya/ManageCard.vue";
import Card from "primevue/card";
</script>
<style lang="scss" scoped>
.my-app-dark {
  .p-6 {
    background-color: transparent;
  }
  .bg-grid {
    background-image: linear-gradient(rgba(137, 26, 162, 0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(137, 26, 162, 0.15) 1px, transparent 1px);
    background-size: 40px 80px;
  }
}
.bg-grid {
  background-image: linear-gradient(rgba(137, 26, 162, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(137, 26, 162, 0.15) 1px, transparent 1px);
  background-size: 40px 80px;
}

/* ===============================
   📱 MOBILE RESPONSIVE
================================ */
@media (max-width: 640px) {
  /* Section padding diperkecil */
  section {
    padding: 1rem !important;
  }

  /* Wrapper p-6 jangan terlalu besar */
  .p-6 {
    padding: 1rem !important;
  }

  /* Card PrimeVue */
  .p-card {
    border-radius: 0.75rem;
  }

  /* Stat & Manage grid spacing */
  .grid {
    gap: 1rem !important;
  }

  /* Text lebih readable di mobile */
  p {
    font-size: 0.875rem;
    line-height: 1.5;
  }

  /* Title Card */
  .p-card-title {
    font-size: 1rem;
  }
}

</style>
