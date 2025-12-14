<template>
  <div class="login-wrapper">
    <div class="left-side"></div>

    <div class="right-side">
      <!-- DARK MODE TOGGLE -->
      <div class="top-action">
        <Button
          :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'"
          class="p-button-sm"
          variant="outlined"
          @click="toggleDarkMode"
        />
      </div>

      <!-- TITLE + SIGN IN LINK -->
      <div class="flex justify-between items-center">
        <h3 class="login-title">User Registration</h3>
        <a class="forgot-link" @click="goToSignIn">Sign In?</a>
      </div>

      <div class="card">
        <Stepper value="1">
          <!-- ======================== STEP 1 ========================= -->
          <StepItem value="1">
            <Step>Identity</Step>

            <StepPanel v-slot="{ activateCallback }">
              <ScrollPanel style="width: 100%; height: 200px">
                <div class="flex flex-col gap-4">
                  <div class="input-group">
                    <label>Full Name</label>
                    <InputText
                      v-model="form.full_name"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div class="input-group">
                    <label>Email</label>
                    <InputText
                      v-model="form.email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div class="input-group">
                    <label>Phone Number</label>
                    <InputText v-model="form.phone" placeholder="08xxxxxxxxxx" />
                  </div>

                  <div class="input-group">
                    <label>From Country</label>
                    <Dropdown
                      v-model="form.country"
                      :options="listCountry"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="Select Country"
                      filter
                      filterPlaceholder="Search country..."
                      showClear
                      class="w-full"
                    />
                  </div>
                </div>
              </ScrollPanel>

              <div class="p-2 text-right">
                <Button
                  icon="pi pi-chevron-right"
                  iconPos="right"
                  label="Next"
                  severity="info"
                  rounded
                  @click="goToStep2(activateCallback)"
                />
              </div>
            </StepPanel>
          </StepItem>

          <!-- ======================== STEP 2 ========================= -->
          <StepItem value="2">
            <Step>Hobby</Step>

            <StepPanel v-slot="{ activateCallback }">
              <ScrollPanel style="width: 100%; height: 200px">
                <div class="flex flex-wrap justify-center gap-3 p-4">
                  <div v-for="(item, index) in listHobby" :key="index">
                    <ToggleButton
                      :modelValue="form.hobby.includes(item.value)"
                      @update:modelValue="(val) => toggleHobby(val, item.value)"
                      :onLabel="item.label"
                      :offLabel="item.label"
                    />
                  </div>
                </div>
              </ScrollPanel>

              <div class="flex py-6 justify-between">
                <Button
                  icon="pi pi-chevron-left"
                  label="Back"
                  severity="info"
                  rounded
                  @click="activateCallback('1')"
                />
                <Button
                  icon="pi pi-chevron-right"
                  iconPos="right"
                  label="Next"
                  severity="info"
                  rounded
                  @click="goToStep3(activateCallback)"
                />
              </div>
            </StepPanel>
          </StepItem>

          <!-- ======================== STEP 3 ========================= -->
          <StepItem value="3">
            <Step>Create Account</Step>

            <StepPanel v-slot="{ activateCallback }">
              <div class="flex flex-col gap-4">
                <div class="input-group">
                  <label>Username</label>
                  <InputText v-model="form.username" placeholder="Enter username" />
                </div>

                <div class="input-group">
                  <label>Password</label>
                  <Password v-model="form.password" toggleMask :feedback="false" />
                </div>

                <div class="input-group">
                  <label>Confirm Password</label>
                  <Password
                    v-model="form.confirm_password"
                    toggleMask
                    :feedback="false"
                  />
                </div>
              </div>

              <div class="flex py-6 justify-between">
                <Button
                  icon="pi pi-chevron-left"
                  label="Back"
                  severity="info"
                  rounded
                  @click="activateCallback('2')"
                />
                <Button label="Sign Up" severity="info" rounded @click="submitForm" />
              </div>
            </StepPanel>
          </StepItem>
        </Stepper>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* ============================
   IMPORTS
============================ */
import { ref } from "vue";

// PrimeVue Components
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import ToggleButton from "primevue/togglebutton";
import ScrollPanel from "primevue/scrollpanel";
import Stepper from "primevue/stepper";
import StepItem from "primevue/stepitem";
import Step from "primevue/step";
import StepPanel from "primevue/steppanel";

// Utils
import { useApi } from "@src/utils/useApi";
import { useToaster } from "@src/utils/toats/toaster";

const toaster = useToaster();

/* ============================
   DARK MODE
============================ */
const isDark = ref(false);
function toggleDarkMode() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("my-app-dark");
}

/* ============================
   FORM DATA
============================ */
const form: any = ref({
  full_name: "",
  email: "",
  phone: "",
  hobby: [],
  country: null,
  username: "",
  password: "",
  confirm_password: "",
});

/* ============================
   MASTER DATA
============================ */
const listHobby: any = ref([]);
const listCountry: any = ref([]);

/* ============================
   FETCH MASTER DATA
============================ */
async function fetchGetDataMaster() {
  try {
    const res = await useApi().get(
      "/get-data-for-sign-up?setData=$2y$12$WbsKoFgCA2X1r1QP0PcdLe9kvtuFFZoQUatbGjf081"
    );

    listHobby.value = res?.data?.hobi || [];
    listCountry.value = res?.data?.negara || [];
  } catch (err) {
    toaster.error("Failed to fetch master data.");
  }
}

/* ============================
   HOBBY MULTI SELECT
============================ */
function toggleHobby(isSelected: boolean, value: number) {
  if (isSelected) {
    if (!form.value.hobby.includes(value)) {
      form.value.hobby.push(value);
    }
  } else {
    form.value.hobby = form.value.hobby.filter((h) => h !== value);
  }
}

/* ============================
   STEP VALIDATION
============================ */
function goToStep2(next: any) {
  if (
    !form.value.full_name ||
    !form.value.email ||
    !form.value.phone ||
    !form.value.country
  ) {
    toaster.warning("Please complete all identity fields.");
    return;
  }
  next("2");
}

function goToStep3(next: any) {
  if (form.value.hobby.length === 0) {
    toaster.warning("Please select at least one hobby.");
    return;
  }
  next("3");
}

/* ============================
   FINAL SUBMIT
============================ */
async function submitForm() {
  if (!form.value.username || !form.value.password || !form.value.confirm_password) {
    toaster.warning("Please complete all account fields.");
    return;
  }

  if (form.value.password !== form.value.confirm_password) {
    toaster.error("Password confirmation does not match.");
    return;
  }
  try {
    const res = await useApi().post("/save-data-registrasi", form.value);
    window.location.href = "/auth-login";
  } catch (err: any) {
    const status = err?.response?.status;
    const data = err?.response?.data;
    if (status === 422 && data?.errors) {
      const errs = data.errors;
      Object.keys(errs).forEach((key) => {
        toaster.warning(errs[key][0]);
      });
      return;
    }
    if (status === 404) {
      toaster.warning("Endpoint not found (404)");
      return;
    }
    if (status === 401 || status === 403) {
      toaster.warning("You are not authorized.");
      return;
    }
    if (status === 500) {
      toaster.error("Internal server error (500)");
      return;
    }
    if (data?.message) {
      toaster.error(data.message);
    } else {
      toaster.error("Unexpected error occurred.");
    }
  }
}

/* ============================
   NAVIGATION
============================ */
function goToSignIn() {
  window.location.href = "/auth-login";
}

fetchGetDataMaster();
</script>

<style lang="scss">
@use "@src/assets/scss/signUp.scss";
</style>
