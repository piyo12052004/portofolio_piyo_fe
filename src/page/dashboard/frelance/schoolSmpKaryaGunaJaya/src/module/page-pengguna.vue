<template>
  <!-- INFO CARD -->
  <Card class="my-4">
    <template #title> Users </template>
    <template #content>
      <p class="m-0 leading-relaxed text-slate-600">
        The <b>Users</b> feature is used to manage user account data with access to the
        system. Administrators can perform
        <b>Create, Read, Update, and Delete (CRUD)</b> operations on user data.
      </p>
      <p class="mt-3 text-sm text-slate-500">Developed by <b>Ikhsan Adriansyah</b></p>
    </template>
  </Card>

  <div class="p-6 space-y-6">
    <!-- HEADER -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold">Pengguna</h1>

      <Button
        label="Tambah Pengguna"
        icon="pi pi-plus"
        class="bg-blue-600 border-none"
        @click="openCreate"
      />
    </div>

    <!-- TABLE -->
    <Card>
      <template #content>
        <DataTable :value="users" stripedRows responsiveLayout="scroll">
          <Column field="name" header="Nama" />
          <Column field="username" header="Username" />
          <Column field="email" header="Email" />

          <Column header="Role">
            <template #body="{ data }">
              <span class="badge badge-blue">{{ data.role }}</span>
            </template>
          </Column>

          <Column header="Status">
            <template #body="{ data }">
              <span
                class="badge"
                :class="data.status === 'Aktif' ? 'badge-green' : 'badge-gray'"
              >
                {{ data.status }}
              </span>
            </template>
          </Column>

          <Column header="Verifikasi">
            <template #body="{ data }">
              <span class="badge badge-green">{{ data.verify }}</span>
            </template>
          </Column>

          <Column header="Aksi">
            <template #body="{ index }">
              <Button label="Edit" text class="text-blue-600" @click="openEdit(index)" />
              <Button label="Hapus" text class="text-red-600" @click="askRemove(index)" />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>

  <!-- ===== DIALOG ADD / EDIT ===== -->
  <Dialog
    v-model:visible="showDialog"
    modal
    :header="mode === 'create' ? 'Tambah Pengguna' : 'Edit Pengguna'"
    :style="{ width: '600px' }"
  >
    <div class="space-y-4">
      <!-- FOTO (dummy) -->
      <div class="flex gap-4 items-center">
        <div class="avatar">?</div>
        <p class="text-xs text-slate-500">Profile photo handled by system</p>
      </div>

      <InputText v-model="form.name" placeholder="Nama Lengkap *" class="w-full" />
      <InputText v-model="form.username" placeholder="Username *" class="w-full" />
      <InputText v-model="form.email" placeholder="Email *" class="w-full" />

      <Password
        v-if="mode === 'create'"
        v-model="form.password"
        toggleMask
        placeholder="Password *"
      />

      <Dropdown
        v-model="form.role"
        :options="roles"
        placeholder="Pilih Role *"
        class="w-full"
      />

      <div class="flex gap-4 items-center">
        <RadioButton v-model="form.status" value="Aktif" />
        <label>Aktif</label>

        <RadioButton v-model="form.status" value="Nonaktif" />
        <label>Nonaktif</label>
      </div>
    </div>

    <template #footer>
      <Button label="Batal" text @click="showDialog = false" />
      <Button
        :label="mode === 'create' ? 'Simpan' : 'Update'"
        class="bg-blue-600 border-none"
        @click="saveUser"
      />
    </template>
  </Dialog>

  <!-- ===== DIALOG CONFIRM DELETE ===== -->
  <Dialog
    v-model:visible="confirmRemoveDialog"
    modal
    header="Confirm Delete"
    :style="{ width: '25rem' }"
  >
    <p>Are you sure you want to delete this user?</p>

    <template #footer>
      <Button label="Cancel" text @click="confirmRemoveDialog = false" />
      <Button label="Delete" severity="danger" @click="confirmRemove" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as H from "@src/utils/Helper";

import Button from "primevue/button";
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Dropdown from "primevue/dropdown";
import RadioButton from "primevue/radiobutton";

/* ================= DATA ================= */
const users = ref([
  {
    name: "Super Admin",
    username: "superadmin",
    email: "admin@gmail.com",
    role: "Superadmin",
    status: "Aktif",
    verify: "Aktif",
  },
  {
    name: "Admin 1",
    username: "admin1",
    email: "admin1@gmail.com",
    role: "Admin",
    status: "Aktif",
    verify: "Aktif",
  },
]);

const roles = ["Superadmin", "Admin", "User"];

/* ================= DIALOG STATE ================= */
const showDialog = ref(false);
const confirmRemoveDialog = ref(false);
const mode = ref<"create" | "edit">("create");
const editIndex = ref<number | null>(null);
const removeIndex = ref<number | null>(null);

/* ================= FORM ================= */
const form:any = ref({
  name: "",
  username: "",
  email: "",
  password: "",
  role: "",
  status: "Aktif",
});

/* ================= METHODS ================= */
function openCreate() {
  mode.value = "create";
  resetForm();
  showDialog.value = true;
}

function openEdit(index: number) {
  mode.value = "edit";
  editIndex.value = index;
  form.value = { ...users.value[index], password: "" };
  showDialog.value = true;
}

function saveUser() {
  if (!form.value.name || !form.value.username || !form.value.email || !form.value.role) {
    H.alert("warning", "Please complete all required fields", "warning");
    return;
  }

  if (mode.value === "create") {
    users.value.push({
      name: form.value.name,
      username: form.value.username,
      email: form.value.email,
      role: form.value.role,
      status: form.value.status,
      verify: "Aktif",
    });
    H.alert("success", "User successfully added", "success");
  } else if (editIndex.value !== null) {
    users.value[editIndex.value] = {
      ...users.value[editIndex.value],
      ...form.value,
      verify: "Aktif",
    };
    H.alert("success", "User successfully updated", "success");
  }

  showDialog.value = false;
  resetForm();
}

function askRemove(index: number) {
  removeIndex.value = index;
  confirmRemoveDialog.value = true;
}

function confirmRemove() {
  if (removeIndex.value !== null) {
    users.value.splice(removeIndex.value, 1);
    H.alert("success", "User successfully deleted", "success");
  }
  confirmRemoveDialog.value = false;
  removeIndex.value = null;
}

function resetForm() {
  form.value = {
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    status: "Aktif",
  };
}
</script>

<style scoped lang="scss">
.badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
}

.badge-blue {
  background: #e0e7ff;
  color: #1d4ed8;
}

.badge-green {
  background: #dcfce7;
  color: #166534;
}

.badge-gray {
  background: #e5e7eb;
  color: #374151;
}

.avatar {
  width: 64px;
  height: 64px;
  background: #e5e7eb;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
}
</style>
