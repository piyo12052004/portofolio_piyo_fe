<template>
  <section>
    <FILTER @insertData="openInsertModal" @refresh="fetchData" :filterData="storegeData"/>

    <!-- MODAL INSERT / UPDATE -->
    <InsertOrUpdate
      v-if="is_insert_or_update"
      :title_insert_or_update="title_insert_or_update"
      :is_loading="is_loading"
      @insertOrUpdate="insertOrUpdate"
      @cencelFunctionSave="cencelFunctionSave"
      @refresh="fetchData"
    />

    <DATA :sendData="storegeData" @fetchDeletDataById="fetchDeletDataById"  @refresh="fetchData" />
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Button from "primevue/button";
import { useApi } from "@src/utils/useApi";
import * as H from "@src/utils/Helper";
import FILTER from "@src/page/dashboard/component/roleUser/filter.vue";
import InsertOrUpdate from "@src/page/dashboard/component/roleUser/modalInsertOrUpdate.vue";
import DATA from "@src/page/dashboard/component/roleUser/data.vue";

const is_loading = ref(false);
const is_insert_or_update = ref(false);
const title_insert_or_update = ref("");
const storegeData:any = ref([]);

function openInsertModal(value: string) {
  title_insert_or_update.value = value || "Tambah Role";
  is_insert_or_update.value = true;
}

function cencelFunctionSave(){
  is_loading.value = false;
  is_insert_or_update.value = false;
}
async function insertOrUpdate(nama_role: string) {
  if (!nama_role || nama_role.trim() === "") {
    H.alert("warning", "The input field cannot be empty.");
    return;
  }
  is_loading.value = true;
  try {
    await useApi().post("/superadmin/role-user/save-data", { role_user: nama_role });
  } catch (err) {
    H.alert("error", "Failed to save data.");
  } finally {
    is_loading.value = false;
    is_insert_or_update.value = false;
  }
}

async function fetchData(row: any) {
  let params = {
    'search' : row?.search ?? '',
    'role_ids' : Array.isArray(row?.role) ? row?.role.join(",") : ''
  }
  try {
     let respones = await useApi().get("/superadmin/role-user/get-data", params);
     storegeData.value = respones.data
  } catch (err) {
    H.alert("error", "Failed to save data.");
  } finally {
  }
}

async function fetchDeletDataById(row:any){
  try {
     let respones = await useApi().delete(`/superadmin/role-user/${row.role_user_id}`);
     storegeData.value = respones.data
  } catch (err) {
    H.alert("error", "Failed to delete data.");
  } finally {
  }
}
</script>

<style lang="scss">
@use "@src/assets/scss/login.scss";
</style>
