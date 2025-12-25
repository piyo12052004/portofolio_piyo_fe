<template>
  <section>
    <div class="card">
      <DataTable tableStyle="min-width: 50rem">
        <Column field="Tanggal Pengerjaan" header="Tanggal Pengerjaan"></Column>
        <Column field="name" header="Author"></Column>
        <Column field="Taks" header="Taks"></Column>
        <Column field="status" header="Status"></Column>
      </DataTable>
    </div>
  </section>
</template>

<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
</script>
