<template>
  <section class="role-user-section">
    <div class="header-box">
      <h3 class="title">Role User List</h3>
    </div>

    <!-- G anti Card → gunakan div sebagai wrapper -->
    <div class="table-wrapper">
      <DataTable
        :value="props.sendData || []"
        paginator
        :rows="8"
        stripedRows
        tableStyle="min-width: 50rem"
        size="small"
      >
        <Column field="role_user" header="Role User" style="min-width: 200px" />

        <Column header="Actions" bodyClass="text-center" style="width: 120px">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-text p-button-info"
              @click="editRole(slotProps.data)"
              v-tooltip="'Edit'"
            />

            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-text p-button-danger"
              @click="deleteRole(slotProps.data)"
              v-tooltip="'Delete'"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from "vue";

// IMPORT PRIMEVUE KOMPUTER
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

const props = withDefaults(
  defineProps<{
    sendData?: any[];
  }>(),
  {
    sendData: () => [],
  }
);

// ACTION FUNCTIONS
function editRole(row: any) {
  console.log("Edit:", row);
}

function deleteRole(row: any) {
  console.log("Delete:", row);
}
</script>

<style scoped lang="scss">
@use "@src/assets/scss/roleUser/DataRoleUser";
</style>
