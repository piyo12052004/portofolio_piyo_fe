<template>
  <section class="p-6">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- ================= LEFT : IMAGE GRID ================= -->
      <div class="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="(img, i) in images"
          :key="i"
          class="relative group overflow-hidden rounded-xl shadow bg-white dark:bg-slate-800 ring-1 ring-black/5 dark:ring-white/10"
          :class="i % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''"
        >
          <img
            :src="img.src"
            :alt="img.title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <!-- overlay -->
          <div
            class="absolute inset-0 bg-black/40 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-end p-3"
          >
            <div class="text-white">
              <p class="text-sm font-semibold">{{ img.title }}</p>
              <p class="text-xs opacity-80">{{ img.category }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= RIGHT : DETAIL ================= -->
      <div
        class="rounded-xl shadow p-6 space-y-4 bg-white  ring-1 ring-black/5 "
      >
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-slate-900 ">
            Landing Page
          </h2>

          <span class="text-xs text-slate-500 ">
            Developed by
            <span class="font-medium text-slate-700 ">
              Ikhsan Adriansyah
            </span>
          </span>
        </div>

        <p class="leading-relaxed text-slate-600 ">
          Landing Page ini dikembangkan menggunakan
          <span class="font-semibold text-slate-500 ">
            Tailwind CSS
          </span>
          dengan pendekatan modern, responsif, dan berorientasi pada performa. Seluruh
          konten yang ditampilkan bersifat
          <span class="font-semibold text-slate-500 "> dinamis </span>
          serta terintegrasi langsung dengan
          <span class="font-semibold text-slate-500 "> database </span
          >.
        </p>

        <ul class="space-y-3 text-sm">
          <li class="flex gap-2 text-slate-700 ">
            <span class="text-blue-600 ">•</span>
            <span>
              <b>Program Beasiswa</b> ditampilkan secara dinamis dan dikelola langsung
              melalui database.
            </span>
          </li>

          <li class="flex gap-2 text-slate-700 ">
            <span class="text-blue-600 ">•</span>
            <span>
              <b>Fasilitas Sekolah</b> diklasifikasikan ke dalam kategori Akademik,
              Olahraga, Teknologi, dan Penunjang.
            </span>
          </li>

          <li class="flex gap-2 text-slate-700 ">
            <span class="text-blue-600 ">•</span>
            <span>
              <b>Berita & Kegiatan</b> disajikan dalam format artikel dan dapat diakses
              pada halaman detail.
            </span>
          </li>

          <li class="flex gap-2 text-slate-700 ">
            <span class="text-blue-600 ">•</span>
            <span>
              <b>Galeri Sekolah</b> menampilkan dokumentasi kegiatan dari database.
            </span>
          </li>

          <li class="flex gap-2 text-slate-700 ">
            <span class="text-blue-600 ">•</span>
            <span>
              <b>Lokasi Sekolah</b> terintegrasi dengan peta untuk memudahkan akses.
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import img1 from "@src/assets/img/kgj/landing-page.png";
import img2 from "@src/assets/img/kgj/landing-page-2.png";
import img3 from "@src/assets/img/kgj/landing-page-3.png";
import img4 from "@src/assets/img/kgj/landing-page-4.png";
import img5 from "@src/assets/img/kgj/landing-page-5.png";
import img6 from "@src/assets/img/kgj/landing-page-6.png";
import img7 from "@src/assets/img/kgj/landing-page-7.png";
import img8 from "@src/assets/img/kgj/landing-page-8.png";

const images = [
  { src: img1, title: "Landing Page", category: "Landing" },
  { src: img2, title: "Landing Page", category: "Landing" },
  { src: img3, title: "Landing Page", category: "Landing" },
  { src: img4, title: "Landing Page", category: "Landing" },
  { src: img5, title: "Landing Page", category: "Landing" },
  { src: img6, title: "Landing Page", category: "Landing" },
  { src: img7, title: "Landing Page", category: "Landing" },
  { src: img8, title: "Landing Page", category: "Landing" },
];
</script>
<style lang="scss" scoped>
.my-app-dark {
  /* =========================
     IMAGE GRID (DIMMED)
  ========================= */
  .group {
    background-color: #1e293b; // slate-800
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);

    img {
      filter: brightness(0.75) contrast(0.95);
      opacity: 0.9;
      transition: filter 0.3s ease, opacity 0.3s ease;
    }

    &:hover img {
      filter: brightness(1);
      opacity: 1;
    }
  }

  /* overlay image */
  .group > div.absolute {
    background-color: rgba(0, 0, 0, 0.6);
  }

  /* =========================
     RIGHT DETAIL CARD
  ========================= */
  .bg-white {
    background-color: #020617 !important;
    color: #e5e7eb;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }

  h2 {
    color: #f8fafc;
  }

  p {
    color: #cbd5f5;
  }

  /* =========================
     LIST CONTENT
  ========================= */
  ul li {
    color: #e5e7eb;

    b {
      color: #f8fafc;
    }

    span.text-blue-600 {
      color: #60a5fa !important;
    }
  }

  /* =========================
     BORDER / RING FEEL
  ========================= */
  .rounded-xl {
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
}
</style>
