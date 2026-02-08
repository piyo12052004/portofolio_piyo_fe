<template>
  <div
    v-if="dataSubTitle.is_aktiv_img == false"
    class="flex flex-col items-center justify-center"
  >
    <!-- EMPTY STATE -->
    <div class="flex flex-col items-center gap-4">
      <img
        src="@src/assets/img/search-1-dark.svg"
        alt="Empty Data"
        class="w-88 opacity-80"
      />
      <p class="text-gray-500 text-sm">Data masih kosong</p>
    </div>
  </div>

  <div v-else>
    <DataTable
      v-if="dataSubTitle.is_loading_skeleton"
      :value="load_skeleton"
      class="w-full"
    >
      <Column field="code" header="No">
        <template #body>
          <Skeleton></Skeleton>
        </template>
      </Column>
      <Column field="name" header="Path">
        <template #body>
          <Skeleton></Skeleton>
        </template>
      </Column>
      <Column field="category" header="Name">
        <template #body>
          <Skeleton></Skeleton>
        </template>
      </Column>
      <Column field="quantity" header="Component">
        <template #body>
          <Skeleton></Skeleton>
        </template>
      </Column>
    </DataTable>
    <DataTable
      v-else
      :value="dataSubTitle.data"
      paginator
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50]"
      tableStyle="min-width: 50rem"
    >
      <Column header="No" style="width: 80px">
        <template #body="slotProps">
          {{ slotProps.index + 1 }}
        </template>
      </Column>
      <Column field="name" header="Name" style="width: 25%"></Column>
      <Column field="path" header="Path" style="width: 25%"></Column>
      <Column field="component" header="Component" style="width: 25%"></Column>
      <Column header="Action" style="width: 25%">
        <template #body="slotProps">
          <Button icon="pi pi-file-edit" severity="info" aria-label="User"  v-tooltip.top="'Edit'" @click="delateDataSubTitle(slotProps.data)" />

          <Button
            v-tooltip.top="'Delete'"
            class="ml-2"
            icon="pi pi-trash"
            severity="danger"
            aria-label="User"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import Vue from "vue";
import { ref, computed, watch } from "vue";
import { useApi } from "@src/utils/useApi";
import * as H from "@src/utils/Helper";

// primevue
import Skeleton from "primevue/skeleton";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

// emit
const emit = defineEmits<{
  (e: "toggelUpdataDataSubTitle", value: any): void;
}>();

const load_skeleton = ref(new Array(10));
const dataSubTitle: any = ref({
  is_aktiv_img: false,
  is_loading_skeleton: false,
  data: [],
});

const props = withDefaults(
  defineProps<{
    dataShowTitle?: any;
  }>(),
  {
    dataShowTitle: {},
  }
);

const fetchDataSubTitle = async () => {
  dataSubTitle.value.is_loading_skeleton = true;
  try {
    const response = await useApi().get(
      `/superadmin/path-master/sub-title/get-data-by-id/${props.dataShowTitle.id}`
    );
    dataSubTitle.value.data = response.data;
    dataSubTitle.value.is_loading_skeleton = false;
  } catch (err) {
    dataSubTitle.value.is_aktiv_img = false;
    const status = err?.response?.status;
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Failed to fetch data.";
    if (status === 404) {
      H.alert("warning", message || "Data not found");
    } else if (status === 500) {
      H.alert("error", "Internal server error");
    } else {
      H.alert("error", message);
    }
  } finally {
    // optional: loading.value = false
  }
};

const delateDataSubTitle = (data:any)=>{
  emit('toggelUpdataDataSubTitle',data);
}

/**
 * cek apakah data ada
 */
watch(
  () => props.dataShowTitle,
  (val) => {
    if (val?.id) {
      fetchDataSubTitle();
      dataSubTitle.value.is_aktiv_img = true;
    }
  },
  { immediate: true }
);
</script>
