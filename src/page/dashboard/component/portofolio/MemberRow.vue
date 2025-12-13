<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <Avatar :label="initial" shape="circle" size="small" />
      <span class="text-sm">{{ name }}</span>
    </div>

    <Dropdown :options="roles" v-model="selectedRole" class="w-28" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Avatar from "primevue/avatar";
import Dropdown from "primevue/dropdown";

const props = defineProps({
  name: String,
  role: String,
});

const roles = ["Owner", "Editor", "Viewer"];

const selectedRole = ref(props.role);

const initial = computed(() => props.name?.charAt(0) ?? "?");
</script>
