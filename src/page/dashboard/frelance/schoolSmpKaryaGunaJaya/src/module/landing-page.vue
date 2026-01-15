<template>
  <section class="p-4 sm:p-6">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <!-- ================= LEFT : IMAGE GRID ================= -->
      <div class="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div
          v-for="(img, i) in images"
          :key="i"
          class="relative group overflow-hidden rounded-lg sm:rounded-xl shadow bg-white ring-1 ring-black/5"
          :class="i % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''"
        >
          <img
            :src="img.src"
            :alt="img.title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <!-- overlay -->
          <div
            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-2 sm:p-3"
          >
            <div class="text-white">
              <p class="text-xs sm:text-sm font-semibold">
                {{ img.title }}
              </p>
              <p class="text-[10px] sm:text-xs opacity-80">
                {{ img.category }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= RIGHT : DETAIL ================= -->
      <div
        class="rounded-xl shadow p-4 sm:p-6 space-y-3 sm:space-y-4 bg-white ring-1 ring-black/5 lg:sticky lg:top-24"
      >
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h2 class="text-lg sm:text-2xl font-bold text-slate-900">Landing Page</h2>

          <span class="text-[11px] sm:text-xs text-slate-500">
            Developed by
            <span class="font-medium text-slate-700"> Ikhsan Adriansyah </span>
          </span>
        </div>

        <p class="leading-relaxed text-sm sm:text-base text-slate-600">
          This landing page was developed using
          <span class="font-semibold text-slate-500">Tailwind CSS</span>
          with a modern, performance-oriented approach. All content is
          <span class="font-semibold text-slate-500">dynamic</span>
          and integrated with the
          <span class="font-semibold text-slate-500">database</span>.
        </p>

        <ul class="space-y-2 sm:space-y-3 text-xs sm:text-sm">
          <li class="flex gap-2 text-slate-700">
            <span class="text-blue-600">•</span>
            <span>
              <b>Scholarship Programs</b> are dynamically managed via database.
            </span>
          </li>

          <li class="flex gap-2 text-slate-700">
            <span class="text-blue-600">•</span>
            <span>
              <b>School Facilities</b> categorized into Academic, Sports, and Technology.
            </span>
          </li>

          <li class="flex gap-2 text-slate-700">
            <span class="text-blue-600">•</span>
            <span> <b>News & Activities</b> presented in article format. </span>
          </li>

          <li class="flex gap-2 text-slate-700">
            <span class="text-blue-600">•</span>
            <span> <b>Gallery</b> content retrieved dynamically. </span>
          </li>

          <li class="flex gap-2 text-slate-700">
            <span class="text-blue-600">•</span>
            <span> <b>Interactive Map</b> integration for school location. </span>
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
