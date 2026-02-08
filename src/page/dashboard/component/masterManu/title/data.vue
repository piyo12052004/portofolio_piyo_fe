<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useApi } from "@src/utils/useApi";
import * as H from "@src/utils/Helper";

// primevue
import Skeleton from "primevue/skeleton";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Paginator from "primevue/paginator";
import Button from "primevue/button";

// PROPS
const props = withDefaults(
  defineProps<{
    dataTitle?: any;
    isLoadingTitle?: boolean;
  }>(),
  {
    dataTitle: [],
    isLoadingTitle: false,
  }
);

// data
const dataRoleUser = ref<any[]>([]);
const idRoleUse: any = ref(12);
const is_loading_role_user: any = ref(false);
const products = ref(new Array(10));
// daftar icon PrimeIcons (acak)
const icons = [
  "pi-user",
  "pi-users",
  "pi-id-card",
  "pi-shield",
  "pi-lock",
  "pi-briefcase",
  "pi-star",
  "pi-cog",
];

// helper random icon
const randomIcon = () => {
  return icons[Math.floor(Math.random() * icons.length)];
};

const fetchDataRoleUser = async () => {
  is_loading_role_user.value = true;
  try {
    const response = await useApi().get("/superadmin/path-master/title/get-role-user");
    emit("sendDataRoleUser", response.data);
    dataRoleUser.value = response.data;
    console.log(dataRoleUser.value);
    is_loading_role_user.value = false;
  } catch (err) {
    console.error(err);
    H.alert("error", "Failed to fetch data.");
  }
};

const sendRoleUser = (id: any) => {
  idRoleUse.value = id.role_user_id;
  refresh();
};

// emit
const emit = defineEmits<{
  (e: "refreshDataTitle", value: any): void;
  (e: "sendDataRoleUser", value: any): void;
  (e: "showSubtitle", value: any): void;
  (e: "storageDataEditTitle", value: any): void;
}>();

const refresh = () => {
  emit("refreshDataTitle", idRoleUse);
};

const onPage = (event: any) => {
  emit("refreshDataTitle", {
    value: idRoleUse.value,
    page: event.page + 1,
    per_page: event.rows,
  });
};

const showSubtitle = (params: any) => {
  emit("showSubtitle", params);
};

const editTitle = async (params: any) => {
  emit("storageDataEditTitle", params);
};

onMounted(() => {
  refresh();
  fetchDataRoleUser();
});
</script>

<template>
  <div
    class="flex items-center gap-3 overflow-x-auto whitespace-nowrap p-4 border border-gray-300 rounded-xl shadow-sm scrollbar-thin scrollbar-thumb-gray-300"
  >
    <Skeleton v-if="is_loading_role_user" height="2rem" class="mb-2"></Skeleton>
    <Button
      v-else
      v-for="(item, index) in dataRoleUser"
      @click="sendRoleUser(item)"
      :key="index"
      :label="item.role_user"
      :icon="randomIcon()"
      iconPos="left"
      :severity="idRoleUse == item.role_user_id ? 'info' : 'secondary'"
      :variant="idRoleUse == item.role_user_id ? 'filled' : 'outlined'"
      
      rounded
      class="!px-4 !py-2 text-sm font-medium flex-shrink-0 hover:scale-105 transition-transform"
    />
  </div>

  <div>
    <DataTable
      v-if="props.dataTitle.data"
      :value="props.dataTitle.data"
      paginator
      lazy
      :rows="props.dataTitle.meta?.per_page"
      :totalRecords="props.dataTitle.meta?.total"
      :first="(props.dataTitle.meta?.from - 1) * props.dataTitle.meta?.per_page"
      @page="onPage"
      tableStyle="min-width: 50rem"
    >
      <Column header="No" style="width: 80px">
        <template #body="slotProps">
          <Skeleton v-if="props.isLoadingTitle"></Skeleton>
          {{ props.dataTitle.meta.from + slotProps.index }}
        </template>
      </Column>
      <Column header="Sub Title">
        <template #body="slotProps">
          <Skeleton v-if="props.isLoadingTitle"></Skeleton>
          {{ slotProps.data.sub_title ?? "-" }}
        </template>
      </Column>
      <Column header="Path">
        <template #body="slotProps">
          <Skeleton v-if="props.isLoadingTitle"></Skeleton>
          {{ slotProps.data.path ?? "-" }}
        </template>
      </Column>
      <Column header="Component">
        <template #body="slotProps">
          <Skeleton v-if="props.isLoadingTitle"></Skeleton>
          {{ slotProps.data.component ?? "-" }}
        </template>
      </Column>
      <Column header="Action">
        <template #body="slotProps">
          <Skeleton v-if="props.isLoadingTitle"></Skeleton>
          <Button
            icon="pi pi-trash"
            severity="danger"
            aria-label="Delete"
            v-tooltip.top="'Delete'"
          />
          <Button
            class="ml-2"
            icon="pi pi-file-edit"
            severity="info"
            aria-label="User"
            v-tooltip.top="'Edit'"
            @click="editTitle(slotProps.data)"
          />

          <Button
            class="ml-2"
            icon="pi pi-arrow-right"
            severity="success"
            aria-label="User"
            @click="showSubtitle(slotProps.data)"
            v-tooltip.top="'Sub Title'"
          />
        </template>
      </Column>
    </DataTable>
    <DataTable v-else :value="products">
      <Column field="code" header="Code">
        <template #body>
          <Skeleton></Skeleton>
        </template>
      </Column>
      <Column field="name" header="Name">
        <template #body>
          <Skeleton></Skeleton>
        </template>
      </Column>
      <Column field="category" header="Category">
        <template #body>
          <Skeleton></Skeleton>
        </template>
      </Column>
      <Column field="quantity" header="Quantity">
        <template #body>
          <Skeleton></Skeleton>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
