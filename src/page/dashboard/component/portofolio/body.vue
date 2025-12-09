<script setup lang="ts">
import { ref, onMounted } from "vue";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";

const fadeIn = ref(false);

// Animasi muncul
onMounted(() => {
  setTimeout(() => {
    fadeIn.value = true;
  }, 150);
});
</script>

<template>
  <div class="portfolio-page" :class="{ show: fadeIn }">
    <!-- ================= HERO ================= -->
    <section class="hero">
      <h1>
        Hello, I'm <span class="primary">Piyo Aswandi</span><br />
        Full-Stack Developer & Creative Engineer
      </h1>

      <p class="subtitle">
        I craft digital solutions with clean architecture, modern UI, and efficient
        engineering — transforming ideas into powerful products.
      </p>
    </section>
    <section>
       <div class="hero-section-page-2">

       </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use "@src/assets/scss/boydPort.scss";
@use "@src/assets/scss/boydPortPage_2.scss";
</style>
