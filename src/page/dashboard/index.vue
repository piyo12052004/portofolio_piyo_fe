<template>
  <Button label="Menu Dinamis" @click="goToPage('/test')" />
</template>

<script setup lang="ts">
import { Button } from 'primevue';
import { useRouter } from 'vue-router'

const router = useRouter()

function goToPage(url: string) {
  router.push(url)
}
</script>
