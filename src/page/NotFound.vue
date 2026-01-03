<template>
  <div
    class="min-h-screen flex items-center justify-center bg-slate-900 dark:bg-slate-900 px-6"
  >
    <div class="max-w-md w-full text-center">
      <!-- Code -->
      <h1 class="text-7xl font-extrabold text-red-500">404</h1>

      <!-- Title -->
      <p class="mt-4 text-2xl font-semibold text-slate-800 dark:text-slate-100">
        Page Not Found
      </p>

      <!-- Description -->
      <p class="mt-2 text-slate-600 dark:text-slate-400">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </p>

      <!-- Actions -->
      <div class="mt-6 flex flex-col sm:flex-row justify-center gap-3">
        <button
          @click="$router.back()"
          class="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition"
        >
          ← Go Back
        </button>

        <RouterLink
          to="/"
          class="px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
        >
          Go to Home
        </RouterLink>
      </div>
    </div>
  </div>
</template>
