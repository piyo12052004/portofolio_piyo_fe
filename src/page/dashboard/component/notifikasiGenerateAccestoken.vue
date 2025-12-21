<template>
   <div v-if="props.is_aktif_true" class="custom-notif">
    <div class="notif-header">
      <strong>Access Required</strong>
      <span class="close" @click="is_aktif_false">×</span>
    </div>

    <p class="notif-body">
      You need to generate an access token in the Profile menu first.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const props = withDefaults(
  defineProps<{
    is_aktif_true?: boolean;
  }>(),
  {
    is_aktif_true: false,
  }
);

const emit = defineEmits<{
  (e: "is_aktif_false",value:boolean): void;
}>();

function is_aktif_false(){
    emit('is_aktif_false',false);
}

</script>

<style lang="scss" scoped>
    .custom-notif {
      position: fixed;
      top: 80px;
      right: 20px;
      width: 320px;
      background: var(--surface-card);
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      padding: 14px;
      z-index: 99;
      animation: slideIn 0.25s ease-out;
    }
    
    .notif-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .close {
      cursor: pointer;
      font-size: 18px;
      line-height: 1;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(20px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    </style>
    