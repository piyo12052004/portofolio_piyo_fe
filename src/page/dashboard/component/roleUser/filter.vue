<template>
  <div class="filter-bar">
    <!-- Search Input -->
    <IconField class="pill-input">
      <InputIcon class="pi pi-search" />
      <InputText v-model="form.search" placeholder="Search" />
    </IconField>

    <!-- Dropdown Pegawai -->

    <MultiSelect
      v-model="form.role"
      display="chip"
      class="pill-dropdown"
      :options="props.filterData"
      optionLabel="role_user"
      optionValue="role_user_id"
      filter
      placeholder="Select Data"
      :maxSelectedLabels="3"
    />

    <!-- Tombol Search -->
    <Button icon="pi pi-search" @click="refresh"  rounded class="btn-search" />

    <!-- Tombol Baru -->
    <Button icon="pi pi-plus" rounded class="btn-add" @click="toggelForInsertData" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";

const props = withDefaults(
  defineProps<{
    filterData?: any[];
  }>(),
  {
    filterData: () => [],
  }
);


const emit = defineEmits<{
  (e: "insertData", value: any): void;
  (e: "refresh", value: any): void;
}>();

const form:any = ref({});

const listPegawai = ref([
  { label: "Pegawai A", value: 1 },
  { label: "Pegawai B", value: 2 },
]);

function toggelForInsertData(){
    emit('insertData','Created')
}

function refresh(){
    emit('refresh',form.value)
}

refresh();
</script>
<style scoped lang="scss">
@use "@src/assets/scss/roleUser/filterRoleUser";
</style>
