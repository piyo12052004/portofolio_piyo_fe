<template>
  <Card class="my-4">
    <template #title> Pengguna </template>

    <template #content>
      <p class="m-0 leading-relaxed text-slate-600">
        Fitur <b>Pengguna</b> digunakan untuk mengelola data akun pengguna yang memiliki
        akses ke sistem. Melalui fitur ini, admin dapat melakukan proses
        <b>Create, Read, Update, dan Delete (CRUD)</b> terhadap data pengguna, termasuk
        pengaturan foto profil, username, email, role pengguna, status aktif/nonaktif,
        serta verifikasi akun.
      </p>

      <p class="mt-3 text-sm text-slate-500">Development by <b>Ikhsan Adriansyah</b></p>
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
        @click="showDialog = true"
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
            <template #body>
              <Button label="Edit" text class="text-blue-600" />
              <Button label="Hapus" text class="text-red-600" />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- DIALOG TAMBAH PENGGUNA -->
    <Dialog
      v-model:visible="showDialog"
      modal
      header="Tambah Pengguna Baru"
      :style="{ width: '600px' }"
    >
      <div class="space-y-4">
        <!-- FOTO -->
        <div class="flex gap-4 items-center">
          <div class="avatar">?</div>
          <div>
            <input type="file" />
            <p class="text-xs text-slate-500">PNG, JPG, JPEG (Max 2MB)</p>
          </div>
        </div>

        <!-- INPUT -->
        <InputText v-model="form.name" placeholder="Nama Lengkap" class="w-full" />
        <InputText v-model="form.username" placeholder="Username" class="w-full" />
        <InputText v-model="form.email" placeholder="Email" class="w-full" />

        <Password v-model="form.password" toggleMask placeholder="Password" />
        <Password
          v-model="form.password_confirmation"
          toggleMask
          placeholder="Konfirmasi Password"
        />

        <Dropdown
          v-model="form.role"
          :options="roles"
          placeholder="Pilih Role"
          class="w-full"
        />

        <!-- STATUS -->
        <div class="flex gap-4">
          <RadioButton v-model="form.status" value="Aktif" />
          <label>Aktif</label>

          <RadioButton v-model="form.status" value="Nonaktif" />
          <label>Nonaktif</label>
        </div>

        <!-- ACTION -->
        <div class="flex justify-between items-center mt-4">
          <Button
            label="Simpan Pengguna"
            class="bg-blue-600 border-none"
            @click="saveUser"
          />

          <Button label="Kembali" text @click="showDialog = false" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Dropdown from "primevue/dropdown";
import RadioButton from "primevue/radiobutton";

/* ================= SAMPLE DATA ================= */
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
  {
    name: "Admin 2",
    username: "admin2",
    email: "admin2@gmail.com",
    role: "Admin",
    status: "Aktif",
    verify: "Aktif",
  },
  {
    name: "User 1",
    username: "user1",
    email: "user1@gmail.com",
    role: "User",
    status: "Aktif",
    verify: "Aktif",
  },
  {
    name: "User 2",
    username: "user2",
    email: "user2@gmail.com",
    role: "User",
    status: "Aktif",
    verify: "Aktif",
  },
  {
    name: "User 3",
    username: "user3",
    email: "user3@gmail.com",
    role: "User",
    status: "Nonaktif",
    verify: "Aktif",
  },
  {
    name: "User 4",
    username: "user4",
    email: "user4@gmail.com",
    role: "User",
    status: "Aktif",
    verify: "Aktif",
  },
  {
    name: "User 5",
    username: "user5",
    email: "user5@gmail.com",
    role: "User",
    status: "Aktif",
    verify: "Aktif",
  },
  {
    name: "User 6",
    username: "user6",
    email: "user6@gmail.com",
    role: "User",
    status: "Nonaktif",
    verify: "Aktif",
  },
  {
    name: "User 7",
    username: "user7",
    email: "user7@gmail.com",
    role: "User",
    status: "Aktif",
    verify: "Aktif",
  },
]);

/* ================= DIALOG ================= */
const showDialog = ref(false);

const roles = ["Superadmin", "Admin", "User"];

const form = ref({
  name: "",
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
  role: "",
  status: "Aktif",
});

const saveUser = () => {
  users.value.push({
    name: form.value.name,
    username: form.value.username,
    email: form.value.email,
    role: form.value.role,
    status: form.value.status,
    verify: "Aktif",
  });

  showDialog.value = false;
};
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
