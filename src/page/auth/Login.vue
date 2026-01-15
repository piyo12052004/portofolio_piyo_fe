<template>
  <div class="login-wrapper">
    <div class="left-side">
      <!-- <img :src="ImgEnam" alt="illustration" /> -->
    </div>

    <div class="right-side">
      <div class="top-action hidden md:block">
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
            <div class="google-btn-wrapper">
              <div id="googleBtn"></div>
            </div>

            <!-- Tombol GitHub -->
            <!-- <Button severity="secondary" class="github-btn" @click="loginWithGithub"> -->
            <!-- <Button severity="secondary" class="github-btn">
              <i class="pi pi-github github-icon"></i>
              <span>Continue with GitHub</span>
            </Button> -->
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
    toaster.warning("Email and password cannot be empty", "warning");
    return;
  }
  let prePare = {
    email: form.value.email,
    password: form.value.password,
  };
  try {
    const res = await useApi().post("/login", prePare);
    H.saveStorege(res.data.token);
    H.typeLogin("login");
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

.google-btn-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;

  /* 🔥 PERBESAR TOMBOL SECARA VISUAL */
  transform: scale(1.15);
  transform-origin: center;
}

/* optional: responsive */
@media (max-width: 768px) {
  .google-btn-wrapper {
    transform: scale(1.05);
  }
}

/* ===============================
   📱 MOBILE RESPONSIVE LOGIN
================================ */
@media (max-width: 768px) {
  .login-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* Sembunyikan ilustrasi kiri */
  .left-side {
    display: none;
  }

  .right-side {
    width: 100%;
    min-height: 100vh;
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* Top dark mode button */
  .top-action {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  /* Logo */
  .logo-box {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }

  .logo-3d {
    font-size: 48px;
  }

  /* Title */
  .login-title {
    text-align: center;
    font-size: 1.25rem;
    margin-bottom: 20px;
  }

  /* Form */
  .login-form {
    width: 100%;
  }

  .input-box {
    width: 100%;
  }

  .input-box input {
    width: 100%;
  }

  /* Bottom options */
  .bottom-options {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .forgot-link {
    font-size: 14px;
  }

  /* Login button */
  .confirm-btn {
    width: 100%;
    margin-top: 8px;
  }

  /* Social login */
  .social-buttons {
    width: 100%;
  }

  .google-btn-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    transform: scale(1);
  }
}
.my-app-dark {
  @media (max-width: 768px) {
    .right-side {
      background-color: #020617;
    }

    .login-title {
      color: #f8fafc;
    }
  }
}
</style>
