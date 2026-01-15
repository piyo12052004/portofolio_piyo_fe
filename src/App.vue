<script setup lang="ts">
import Toast from "primevue/toast";
</script>

<template>
  <!-- <div id="mobile-blocker">
    <div class="mobile-box">
      <div class="icon">🚧</div>
      <h1>Still in Development</h1>
      <p>
        This application is currently optimized for desktop view. Please open it on a
        laptop or PC.
      </p>
    </div>
  </div> -->
  <!-- <div id="desktop-app"> -->
  <Toast group="desktop" position="top-right" />
  <Toast group="mobile" position="top-center" class="w-[95vw]" />

  <!-- <ConfirmDialog /> -->
  <ConfirmPopup />
  <router-view />
  <!-- </div> -->
</template>

<style scoped></style>
