<template>
  <div class="login-wrapper">
    <div class="left-side">
      <!-- <img :src="ImgEnam" alt="illustration" /> -->
    </div>

    <div class="right-side">
      <div class="top-action">
        <Button
          :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'"
          class="p-button-sm"
          variant="outlined"
          @click="toggleDarkMode"
        />
      </div>

      <div class="logo-box">
        <div class="logo-3d">P</div>
      </div>

      <h3 class="login-title">Login to your Account</h3>

      <div class="login-form">
        <IconField class="p-input-icon-left input-box">
          <InputIcon class="pi pi-envelope" />
          <InputText placeholder="Email" v-model="form.email" />
        </IconField>

        <IconField class="p-input-icon-left input-box">
          <InputIcon class="pi pi-lock" />
          <Password
            v-model="form.password"
            toggleMask
            :feedback="false"
            placeholder="Password"
            style="width: 100%"
          />
        </IconField>

        <div class="bottom-options">
          <div class="remember-wrap">
            <!-- <InputSwitch v-model="form.remember" />
            <span>Remember Me</span> -->
          </div>

          <a class="forgot-link" @click="goToSignUp">Sign Up?</a>
        </div>

        <Button
          label="Login"
          @click="toggelForLogin"
          icon="pi pi-arrow-right"
          iconPos="right"
          class="confirm-btn"
        />
        <div class="bottom-options">
          <div class="remember-wrap"></div>

          <div class="social-buttons">
            <!-- Tombol Google -->
            <!-- <Button severity="secondary" class="google-btn" @click="loginWithGoogle"> -->
            <!-- <Button severity="secondary" class="google-btn" >
              <img src="@src/assets/img/google-logo.svg" class="google-icon" />
              <span>Continue with Google</span>
            </Button> -->
            <div id="googleBtn"></div>

            <!-- Tombol GitHub -->
            <!-- <Button severity="secondary" class="github-btn" @click="loginWithGithub"> -->
            <Button severity="secondary" class="github-btn">
              <i class="pi pi-github github-icon"></i>
              <span>Continue with GitHub</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import InputSwitch from "primevue/inputswitch";
import Button from "primevue/button";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import ImgEnam from "@src/assets/img/image-login-2.png";
import { useApi } from "@src/utils/useApi";
import router from "@src/route";
import { useToaster } from "@src/utils/toats/toaster";
import * as H from "@src/utils/Helper";
import { fecthSession } from "@src/utils/usersSesion";
import { initGoogleLogin } from "@src/utils/useGoogleAuth";

const toaster = useToaster();

const form = ref({
  username: "",
  password: "",
  remember: false,
});

const isDark = ref(false);
function toggleDarkMode() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("my-app-dark");
}

async function toggelForLogin() {
  if (form.value.email == "" || form.value.password == "") {
    toaster.warning("Email and password cannot be empty",'warning');
    return;
  }
  let prePare = {
    email: form.value.email,
    password: form.value.password,
  };
  try {
    const res = await useApi().post("/login", prePare);
    H.saveStorege(res.data.token);
    H.typeLogin('login');
    getSession();
  } catch (err) {
    // Jika backend mengirim response
    if (err.response) {
      const status = err.response.status;
      const message =
        err.response.data?.message || err.response.data?.error || "Login failed";

      if (status === 401) {
        toaster.error("Invalid email or password");
      } else if (status === 422) {
        toaster.warning(message);
      } else {
        toaster.error(message);
      }
    }
    // Jika tidak ada response (server down / network error)
    else {
      toaster.error("Unable to connect to server");
    }
  }
}

async function getSession() {
  try {
    await fecthSession();
    window.location.href = "/";
  } catch (err) {
    toaster.error("Gagal mengambil data dari server");
  }
}

function goToSignUp() {
  window.location.href = "/auth-registrasi";
}

onMounted(() => {
  initGoogleLogin();
});
</script>

<style lang="scss">
@use "@src/assets/scss/login.scss";
</style>
