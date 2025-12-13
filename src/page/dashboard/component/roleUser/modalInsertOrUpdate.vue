<template>
  <section class="modal-role-wrapper">
    <div class="role-form-card">
      <h3 class="title">{{ props.title_insert_or_update }}</h3>

      <div class="form-group">
        <label>Name Role</label>
        <InputText v-model="nama" placeholder="User role" class="input-text" />
      </div>

      <div class="form-actions">
        <Button
          label="Save"
          icon="pi pi-save"
          class="btn-save"
          :loading="props.is_loading"
          @click="submitForm"
        />
      </div>
      <div class="form-actions">
        <Button
          severity="danger"
          label="Cencel"
          icon="pi pi-save"
          class="btn-cencel"
          :loading="props.is_loading"
          @click="cencelFunctionSave"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

// PROPS
const props = withDefaults(
  defineProps<{
    title_insert_or_update?: string;
    is_loading?: boolean;
  }>(),
  {
    title_insert_or_update: "",
    is_loading: false,
  }
);

// EMITS
const emit = defineEmits<{
  (e: "insertOrUpdate", value: string): void;
  (e: "cencelFunctionSave"): void;
  (e: "refresh"): void;
}>();

// STATE
const nama = ref(null);

// FUNCTION
function submitForm() {
  emit("insertOrUpdate", nama.value);
  emit("refresh");
}
function cencelFunctionSave() {
  emit("cencelFunctionSave");
}
</script>

<style scoped lang="scss">
@use "@src/assets/scss/roleUser/ModalRoleUser";
</style>
