<template>
  <section class="bg-grid p-8">
    <div class="my-4">
      <Card class="my-4">
        <template #title> Dashboard Superadmin </template>

        <template #content>
          <p class="m-0 leading-relaxed text-slate-600">
            Dashboard ini berfungsi untuk menampilkan ringkasan data utama sistem,
            meliputi
            <b>Total Berita</b>, <b>Total Galeri</b>, <b>Total Pengguna</b>, dan
            <b>Total Siswa</b>. Seluruh data ditampilkan secara <b>dinamis</b> dan diambil
            langsung dari <b>database</b> untuk memastikan informasi selalu akurat dan
            terkini.
          </p>

          <p class="mt-3 text-sm text-slate-500">
            Development by <b>Ikhsan Adriansyah</b>
          </p>
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
</style>
