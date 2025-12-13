<template>
  <section class="volt-stage">
    <div class="volt-bg-grid"></div>

    <div class="mx-auto max-w-[102rem] px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <button
          v-for="(img, i) in images"
          :key="i"
          ref="cards"
          class="volt-card volt-border-walk"
        >
          <img
            :src="img.src"
            class="volt-logo"
            :class="img.invertOnDark ? 'invert-on-dark' : ''"
          />
        </button>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

import ImgSatu from "@src/assets/img/gitHub.png";
import ImgDua from "@src/assets/vue.svg";
import ImgTiga from "@src/assets/img/Laravel.png";
import ImgEmpat from "@src/assets/img/nextJs.png";
import ImgLima from "@src/assets/img/pgsql.webp";
import ImgEnam from "@src/assets/img/mysql.png";

const images = [
  { src: ImgSatu, invertOnDark: true },
  { src: ImgDua, invertOnDark: false },
  { src: ImgTiga, invertOnDark: false },
  { src: ImgEmpat, invertOnDark: true },
  { src: ImgLima, invertOnDark: false },
  { src: ImgEnam, invertOnDark: false },
];

const cards = ref<HTMLElement[]>([]);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-active");
        } else {
          entry.target.classList.remove("is-active");
        }
      });
    },
    {
      threshold: 0.4, // 40% terlihat baru aktif
    }
  );

  cards.value.forEach((el) => observer.observe(el));
});
</script>
<style scoped lang="scss">
@use "@src/assets/scss/vlotDash.scss";
</style>
