<script setup lang="ts">
import Button from "primevue/button";
import { ref, onMounted, nextTick } from "vue";
import ImgSatu from "@src/assets/img/gitHub.png";
import ImgDua from "@src/assets/vue.svg";
import ImgTiga from "@src/assets/img/Laravel.png";
import ImgEmpat from "@src/assets/img/nextJs.png";
import ImgLima from "@src/assets/img/pgsql.webp";
import ImgEnam from "@src/assets/img/mysql.png";
import router from "@src/route";

const show = ref(false);

const session = JSON.parse(localStorage.getItem("user_session") || "null");
onMounted(async () => {
  show.value = false; // reset animasi
  await nextTick(); // tunggu elemen render

  void document.body.offsetHeight; // paksa reflow (WAJIB)

  requestAnimationFrame(() => {
    show.value = true; // mulai animasi
  });
});

// DAFTAR GAMBAR
const images = [
  { src: ImgSatu, x: 80, y: 40, dark: true },                
  { src: ImgDua, x: 150, y: 260, dark: false },              
  { src: ImgTiga, x: 100, y: 500, dark: false },
  { src: ImgEmpat, x: "calc(100% - 500px)", y: 40, dark: true }, 
  { src: ImgLima, x: "calc(100% - 300px)", y: 270, dark: false },
  { src: ImgEnam, x: "calc(100% - 450px)", y: 520, dark: false },
];

function goToLogin() {
  router.push("/auth-login");
}
</script>

<template>
  <div class="hero-container">
    <!-- FLOATING IMAGES -->
    <div class="floating-wrapper">
      <div
        v-for="(img, i) in images"
        :key="i"
        class="floating-img"
        :class="{ show }"
        :style="{
          top: img.y + 'px',
          left: typeof img.x === 'string' ? img.x : img.x + 'px',
          animationDelay: i * 0.18 + 's',
        }"
      >
      <img :src="img.src" :class="{ 'dark-invert': img.dark }"/>
      </div>
    </div>

    <!-- CENTER HERO -->
    <div class="hero-content">
      <h1>
        Discover The<br />
        <span class="blue">Creative Works</span><br />
        of Piyo Aswandi
      </h1>

      <p>
        A showcase of modern engineering, digital craftsmanship, and creative development
        — where design meets technology to create meaningful experiences.
      </p>

      <div class="btn-group">
        <Button
          v-if="!session"
          label="Please Login"
          rounded
          size="large"
          @click="goToLogin"
        />

        <Button
          v-if="session"
          :label="`Hello, Welcome ` + session.nama_lengkap"
          rounded
          size="large"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "@src/assets/scss/portofolio.scss";
</style>
