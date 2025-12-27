<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import * as H from "@src/utils/Helper";
import { useApi } from "@src/utils/useApi";

import Card from "primevue/card";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Select from "primevue/select";
import Password from "primevue/password";
import Button from "primevue/button";

const is_loading: any = ref(false);

const listNegara: any = ref([]);
const listHobi: any = ref([]);
const fromProfile: any = ref({});

const fecthGetProfile = async () => {
  try {
    const res = await useApi().get("/profile/referensi/data-profile");
    if (res.data) {
      fromProfile.value.nama_lengkap = res.data.nama_lengkap;
      fromProfile.value.email = res.data.email;
      fromProfile.value.no_hp = res.data.no_hp;
      fromProfile.value.negara_id = res.data.user_negara
        ? res.data.user_negara.value
        : null;
      fromProfile.value.username = res.data.username;
      fromProfile.value.hobi_ids =
        res.data.user_hobi?.map((uh: any) => uh.hobi.value) ?? [];
    }
    // refresh session
  } catch (err) {
    // H.alert("error", "Failed to upload avatar", "error");
  }
};

const fecthGetCountryAndHobbies = async () => {
  try {
    const res = await useApi().get("/profile/referensi/get-country-and-hobies");
    if (res.data) {
      listNegara.value = res.data.country;
      listHobi.value = res.data.hobbie;
    }
  } catch (err) {
    // H.alert("error", "Failed to upload avatar", "error");
  }
};

const saveProfileDetail = async () => {
  is_loading.value = true;
  const emptyFields: string[] = [];

  if (!fromProfile.value.nama_lengkap) {
    emptyFields.push("Full Name");
  }

  if (!fromProfile.value.email) {
    emptyFields.push("Email");
  }

  if (!fromProfile.value.negara_id) {
    emptyFields.push("Country");
  }

  if (
    !Array.isArray(fromProfile.value.hobi_ids) ||
    fromProfile.value.hobi_ids.length === 0
  ) {
    emptyFields.push("Hobbies");
  }
  if (emptyFields.length > 0) {
    H.alert(
      "warning",
      `Please fill in the following fields: ${emptyFields.join(", ")}`,
      "warning"
    );
    return;
  }
  let params = {
    full_name: fromProfile.value.nama_lengkap,
    email: fromProfile.value.email,
    negara_id: fromProfile.value.negara_id,
    hobbies: fromProfile.value.hobi_ids,
    no_hp: fromProfile.value.no_hp,
  };

  try {
    const res = await useApi().post("/profile/referensi/update-profile-user", params);
    is_loading.value = false;
  } catch (err) {
    is_loading.value = false;
    // H.alert("error", "Failed to upload avatar", "error");
  }
};

const saveNewPassword = async () => {
  try {
    is_loading.value = true;
    if (!fromProfile.value.username || fromProfile.value.username.trim() === "") {
      H.alert("warning", "Username is required", "warning");
      is_loading.value = false;
      return;
    }
    const password = fromProfile.value.password;
    const confirmPassword = fromProfile.value.password_confirmation;
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        H.alert("warning", "Password confirmation does not match", "warning");
        is_loading.value = false;
        return;
      }
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*()_+~{}|:"?><])[A-Za-z\d@!#$%^&*()_+~{}|:"?><]{8,22}$/;

      if (!passwordRegex.test(password)) {
        H.alert(
          "warning",
          "Password must be at least 8 characters and include an uppercase letter, a number, and a symbol",
          "warning"
        );
        is_loading.value = false;
        return;
      }
    }

    const payload: any = {
      username: fromProfile.value.username,
    };

    if (password) {
      payload.password = password;
      payload.password_confirmation = confirmPassword;
    }

    await useApi().post("/profile/referensi/update-credential", payload);
    fromProfile.value.password = "";
    fromProfile.value.password_confirmation = "";
    is_loading.value = false;
  } catch (err: any) {
    is_loading.value = false;
    H.alert("error", "Failed to update username or password", "error");
  }
};

// const passwordStrong = computed(() => {
//   const p = fromProfile.value.password || "";

//   return (
//     /[A-Z]/.test(p) &&
//     /\d/.test(p) &&
//     /[@!#$%^&*()_+~{}|:"?><]/.test(p) &&
//     p.length >= 8
//   );
// });

onMounted(() => {
  fecthGetProfile();
  fecthGetCountryAndHobbies();
});
</script>

<template>
  <!-- ================= PROFILE DETAILS ================= -->
  <Card class="p-5">
    <template #title>
      <div class="flex items-center justify-between w-full">
        <span class="text-lg font-semibold"> Profile Details </span>
        <Button
          :loading="is_loading"
          label="Save"
          severity="info"
          variant="outlined"
          size="small"
          @click="saveProfileDetail"
        />
      </div>
    </template>

    <template #content>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Full Name -->
        <div class="flex flex-col gap-2">
          <label for="nama_lengkap" class="text-sm font-medium"> Full Name </label>
          <InputText
            id="nama_lengkap"
            v-model="fromProfile.nama_lengkap"
            placeholder="Enter full name"
          />
        </div>

        <!-- Phone Number -->
        <div class="flex flex-col gap-2">
          <label for="no_hp" class="text-sm font-medium"> Phone Number </label>
          <InputText id="no_hp" v-model="fromProfile.no_hp" placeholder="08xxxxxxxxxx" />
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-2">
          <label for="email" class="text-sm font-medium"> Email Address </label>
          <InputText
            id="email"
            v-model="fromProfile.email"
            placeholder="email@example.com"
            disabled
          />
        </div>

        <!-- Country -->
        <div class="flex flex-col gap-2">
          <label for="negara" class="text-sm font-medium"> Country </label>
          <Select
            id="negara"
            v-model="fromProfile.negara_id"
            :options="listNegara"
            optionLabel="label"
            optionValue="value"
            placeholder="Select country"
            class="w-full"
            filter
            filterPlaceholder="Search country..."
          />
        </div>

        <!-- Hobbies -->
        <div class="flex flex-col gap-2 md:col-span-2">
          <label for="hobi" class="text-sm font-medium"> Hobbies </label>
          <MultiSelect
            id="hobi"
            v-model="fromProfile.hobi_ids"
            :options="listHobi"
            optionLabel="label"
            optionValue="value"
            placeholder="Select hobbies"
            class="w-full"
            display="chip"
            filter
            filterPlaceholder="Search Hobbies..."
          />
        </div>
      </div>
    </template>
  </Card>

  <!-- ================= ACCOUNT CREDENTIALS ================= -->
  <Card class="p-5">
    <template #title>
      <div class="flex items-center justify-between w-full">
        <span class="text-lg font-semibold">Username & Password</span>
        <Button
          :loading="is_loading"
          label="Save"
          @click="saveNewPassword"
          severity="info"
          variant="outlined"
          size="small"
        />
      </div>
    </template>

    <template #content>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Username -->
        <div class="flex flex-col gap-2 md:col-span-2">
          <label for="username" class="text-sm font-medium"> Username </label>
          <InputText
            id="username"
            v-model="fromProfile.username"
            placeholder="Enter username"
            autocomplete="username"
          />
        </div>

        <!-- New Password -->
        <div class="flex flex-col gap-2">
          <div>
            <label for="password" class="text-sm font-medium"> New Password </label>
          </div>
          <div>
            <Password
              id="password"
              v-model="fromProfile.password"
              placeholder="Enter new password"
              toggleMask
              :feedback="true"
              autocomplete="new-password"
              class="w-full"
              inputClass="w-full"
            />
            <p class="text-xs mt-1 text-slate-500">
              Must be at least 8 characters and include an uppercase letter, a number, and
              a symbol (e.g. <span class="font-mono">Piyo12121!A</span>).
            </p>
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="flex flex-col gap-2">
          <div>
            <label for="password_confirmation" class="text-sm font-medium">
              Confirm Password
            </label>
          </div>
          <div>
            <Password
              id="password_confirmation"
              v-model="fromProfile.password_confirmation"
              placeholder="Re-enter password"
              class="w-full"
              inputClass="w-full"
              toggleMask
              :feedback="false"
              autocomplete="new-password"
            />
          </div>
        </div>
      </div>

      <!-- Helper Text -->
      <p class="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Leave the password fields empty if you do not want to change your password.
      </p>
    </template>
  </Card>
</template>
