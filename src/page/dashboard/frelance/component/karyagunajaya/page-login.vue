<template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2">
    <!-- ================= LEFT SIDE ================= -->
    <div
      class="hidden lg:flex items-center justify-center bg-gradient-to-br from-emerald-200 via-emerald-100 to-white relative overflow-hidden"
    >
      <!-- Decorative shapes -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-20 left-20 w-20 h-20 bg-blue-400/30 rounded-xl"></div>
        <div class="absolute top-40 left-52 w-10 h-10 bg-purple-400/40 rounded-md"></div>
        <div
          class="absolute bottom-32 left-40 w-14 h-14 bg-pink-400/30 rounded-full"
        ></div>
      </div>

      <!-- Illustration -->
      <img
        src="@src/assets/img/kgj/registrasi/img-login.svg"
        alt="Login Illustration"
        class="relative z-10 max-w-lg"
      />
    </div>

    <!-- ================= RIGHT SIDE ================= -->
    <div class="flex items-center justify-center bg-white px-6">
      <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="flex flex-col items-center mb-8">
          <img
            src="@src/assets/img/kgj/registrasi/logo-smp-nav-removebg-preview.png"
            alt="SMP Karya Guna Jaya"
            class="w-24 mb-4"
          />
          <h1 class="text-xl font-bold text-slate-800">SMP Karya Guna Jaya</h1>
          <p class="text-sm text-slate-500">Login to your Account</p>
        </div>

        <!-- Form -->
        <div class="space-y-5">
          <!-- Username -->
          <div>
            <label class="text-sm font-medium text-slate-700"> Username </label>
            <div class="relative mt-1">
              <span class="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <i class="pi pi-user"></i>
              </span>
              <input
                type="text"
                placeholder="Username"
                class="w-full h-11 pl-10 pr-4 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="text-sm font-medium text-slate-700"> Password </label>
            <div class="relative mt-1">
              <span class="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <i class="pi pi-lock"></i>
              </span>
              <input
                type="password"
                placeholder="Password"
                class="w-full h-11 pl-10 pr-4 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          <!-- Login Button -->
          <button
            class="w-full h-11 rounded-md bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </div>

        <!-- Footer -->
        <p class="text-center text-xs text-slate-400 mt-6">
          <!-- © {{ new Date().getFullYear() }} KARYAGUNA -->
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Tidak perlu logic dulu, fokus UI
</script>
<style lang="scss" scoped>
/* ===============================
       DARK MODE – LOGIN PAGE
    ================================ */
.my-app-dark {
  /* ===== PAGE BACKGROUND ===== */
  background-color: #020617;

  /* ================= LEFT SIDE ================= */
  .bg-gradient-to-br {
    background: linear-gradient(135deg, #0f172a, #020617, #020617);
  }

  /* decorative shapes */
  .bg-blue-400\/30 {
    background-color: rgba(96, 165, 250, 0.18);
  }
  .bg-purple-400\/40 {
    background-color: rgba(192, 132, 252, 0.2);
  }
  .bg-pink-400\/30 {
    background-color: rgba(244, 114, 182, 0.18);
  }

  /* illustration */
  img[alt="Login Illustration"] {
    opacity: 0.9;
    filter: brightness(0.9) contrast(1.05);
  }

  /* ================= RIGHT SIDE ================= */
  .bg-white {
    background-color: #020617 !important;
  }

  /* title */
  h1 {
    color: #f8fafc;
  }

  p {
    color: #94a3b8;
  }

  /* ================= FORM ================= */
  label {
    color: #cbd5f5;
  }

  input {
    background-color: #0f172a;
    border-color: rgba(255, 255, 255, 0.08);
    color: #e5e7eb;

    &::placeholder {
      color: #64748b;
    }

    &:focus {
      border-color: #34d399;
      box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.35);
    }
  }

  /* icons */
  .pi {
    color: #94a3b8;
  }

  /* ================= BUTTON ================= */
  button {
    background: linear-gradient(to right, #22c55e, #16a34a);
    box-shadow: 0 8px 24px rgba(34, 197, 94, 0.25);

    &:hover {
      opacity: 0.95;
    }
  }

  /* footer */
  .text-slate-400 {
    color: #64748b;
  }
}
</style>
