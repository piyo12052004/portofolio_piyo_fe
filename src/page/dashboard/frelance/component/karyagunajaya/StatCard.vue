<template>
  <div class="stat-card bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
    <div :class="['w-14 h-14 rounded-full flex items-center justify-center', bg]">
      <i :class="[icon, iconColor, 'text-xl']"></i>
    </div>

    <div>
      <p class="text-sm text-slate-500 stat-title">{{ title }}</p>
      <p class="text-2xl font-bold text-slate-800 stat-value">{{ value }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: number;
  bg: string;
  icon: string;
  iconColor: string;
}>();
</script>
<style lang="scss" scoped>
.my-app-dark {
  .stat-card {
    background-color: #0f172a; // slate-900
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: none;

    p {
      color: #cbd5f5;
    }

    .stat-title {
      color: #94a3b8;
    }

    .stat-value {
      color: #f8fafc;
    }

    /* icon background */
    &.blue {
      background: linear-gradient(to right, rgba(59, 130, 246, 0.15), transparent);
    }

    &.green {
      background: linear-gradient(to right, rgba(34, 197, 94, 0.15), transparent);
    }

    &.purple {
      background: linear-gradient(to right, rgba(168, 85, 247, 0.15), transparent);
    }

    &.yellow {
      background: linear-gradient(to right, rgba(234, 179, 8, 0.15), transparent);
    }
  }
}
</style>
