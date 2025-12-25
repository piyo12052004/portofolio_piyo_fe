<template>
  <div class="bg-white rounded-xl shadow-sm p-6 space-y-4 manage-card">
    <h3 class="text-lg font-semibold text-slate-800">
      {{ title }}
    </h3>

    <button
      :class="[
        ' w-full h-11 rounded-lg text-white font-semibold transition',
        primaryColor,
      ]"
    >
      {{ primaryLabel }}
    </button>

    <button
      class="btn-secondary w-full h-11 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition"
    >
      {{ secondaryLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  primaryLabel: string;
  secondaryLabel: string;
  primaryColor: string;
}>();
</script>

<style lang="scss" scoped>
.my-app-dark {
  .manage-card {
    background-color: #020617;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: none;

    h3 {
      color: #f8fafc;
    }

    .btn-secondary {
      background-color: #1e293b;
      color: #e5e7eb;

      &:hover {
        background-color: #334155;
      }
    }
  }
}
</style>
