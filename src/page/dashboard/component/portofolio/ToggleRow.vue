<template>
  <div class="flex items-center justify-between">
    <span class="text-sm">{{ label }}</span>
    <InputSwitch v-model="localValue" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import InputSwitch from "primevue/inputswitch";

const props = defineProps({
  label: String,
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const localValue = ref(props.modelValue);

watch(localValue, (val) => {
  emit("update:modelValue", val);
});
</script>
