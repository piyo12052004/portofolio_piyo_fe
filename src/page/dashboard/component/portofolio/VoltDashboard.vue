<template>
  <div class="m-6">
    <div style="background-color: whitesmoke; border-radius: 50px" class="p-4 dark-mode-card">
      <div
        style="border-radius: 50px; max-height: 500px"
        class="overflow-hidden mb-8 flex items-center"
      >
        <!-- <img alt="PrimeVue Figma UI Kit" :src="coverImage" class="w-full" /> -->
      </div>
      <div class="font-bold text-5xl mb-6 text-center">Work Experience</div>
      <div class="mb-6 text-center leading-normal text-lg">From 2023 to present</div>
      <hr class="my-6" />
      <div class="card !mb-8" style="border-radius: 50px">
        <div class="flex flex-col md:flex-row items-center gap-6 md:gap-20 mb-20">
          <div class="w-full md:w-6/12">
            <img
              v-animateonscroll.once="{
                enterClass:
                  'animate-enter fade-in-10 slide-in-from-l-4 animate-duration-1000',
              }"
              alt="PrimeVue UI Kit"
              src="https://primefaces.org/cdn/primevue/images/uikit/uikit-figma.png"
              class="w-full"
            />
          </div>
          <div
            v-animateonscroll.once="{
              enterClass:
                'animate-enter fade-in-10 slide-in-from-r-4 animate-duration-1000',
            }"
            class="w-full md:w-6/12"
          >
            <div class="text-primary font-bold mb-2">
              Junior Web Developer (Training) | Aug 28 – Oct 11, 2023
            </div>

            <div class="text-5xl font-bold mb-4">BBPVP Bekasi</div>

            <p class="mb-4 text-lg">
              Participated in an intensive web development training program at BBPVP
              Bekasi, focusing on both practical and theoretical fundamentals of web
              programming. As part of the program, I developed a final project in the form
              of an online shop website featuring a product catalog and ordering system.
            </p>

            <ul class="flex flex-wrap m-0 p-0 text-lg">
              <li class="flex items-center w-6/12 p-4">
                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                <span class="font-bold">HTML, CSS & JavaScript Fundamentals</span>
              </li>

              <li class="flex items-center w-6/12 p-4">
                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                <span class="font-bold">PHP (Native) Web Development</span>
              </li>

              <li class="flex items-center w-6/12 p-4">
                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                <span class="font-bold">Online Shop Project Development</span>
              </li>

              <li class="flex items-center w-6/12 p-4">
                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                <span class="font-bold">Product Catalog & Ordering System</span>
              </li>

              <li class="flex items-center w-6/12 p-4">
                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                <span class="font-bold">UI Design with Figma & Flowcharts</span>
              </li>

              <li class="flex items-center w-6/12 p-4">
                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                <span class="font-bold">Training & Competency Certification</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col md:flex-row items-center gap-6 md:gap-20 mb-20">
          <div
            v-animateonscroll.once="{
              enterClass:
                'animate-enter fade-in-10 slide-in-from-l-4 animate-duration-1000',
            }"
            class="w-full md:w-6/12"
          >
            <div class="text-primary font-bold mb-2">
              Full-Stack Developer | May 2024 – December 2025
            </div>

            <div class="text-5xl font-bold mb-4">Jasa Medika</div>

            <p class="mb-4 text-lg">
              Developed and maintained a Hospital Management Information System
              (HMIS/SIMRS) using PHP (Laravel) and Vue.js. Responsible for translating
              hospital user requirements into system features, optimizing database
              performance, and providing technical support to ensure smooth system
              operation.
            </p>

            <ul class="flex flex-wrap m-0 p-0 text-lg">
              <li class="flex items-center w-6/12 p-4">
                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                <span class="font-bold">
                  HMIS / SIMRS Development (Laravel & Vue.js)
                </span>
              </li>

              <li class="flex items-center w-6/12 p-4">
                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                <span class="font-bold">
                  Database Query Optimization & Performance Tuning
                </span>
              </li>

              <li class="flex items-center w-6/12 p-4">
                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                <span class="font-bold"> Financial Reporting & Analytics Modules </span>
              </li>

              <li class="flex items-center w-6/12 p-4">
                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                <span class="font-bold">
                  Technical Support, Troubleshooting & User Training
                </span>
              </li>
            </ul>
          </div>

          <div class="w-full md:w-6/12">
            <img
              v-animateonscroll.once="{
                enterClass:
                  'animate-enter fade-in-10 slide-in-from-r-4 animate-duration-1000',
              }"
              alt="Hospital Management System Dashboard"
              src="https://primefaces.org/cdn/primevue/images/uikit/uikit-system.png"
              class="w-full"
            />
          </div>
        </div>

        <div class="flex flex-col md:flex-row items-center gap-6 md:gap-20 mb-20">
          <div class="w-full md:w-6/12">
            <img
              v-animateonscroll.once="{
                enterClass:
                  'animate-enter fade-in-10 slide-in-from-l-4 animate-duration-1000',
              }"
              alt="Freelance Web Development"
              src="https://primefaces.org/cdn/primevue/images/uikit/uikit-themes.png"
              class="w-full"
            />
          </div>

          <div
            v-animateonscroll.once="{
              enterClass:
                'animate-enter fade-in-10 slide-in-from-r-4 animate-duration-1000',
            }"
            class="w-full md:w-6/12"
          >
            <div class="text-primary font-bold mb-2">
              Freelance Web Developer | January 2025 – Present
            </div>

            <div class="text-5xl font-bold mb-4">Freelance Web Developer</div>

            <p class="mb-4 text-lg">
              Developing and maintaining various web-based projects using PHP (Native and
              Laravel), MySQL, JavaScript, and modern frameworks such as Vue.js.
              Experienced in building scalable and responsive applications tailored to
              client needs.
            </p>

            <ul class="flex flex-wrap m-0 p-0 text-lg">
              <li class="flex items-center w-6/12 p-4">
                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                <span class="font-bold"> Landing Pages & Admin Dashboards </span>
              </li>

              <li class="flex items-center w-6/12 p-4">
                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                <span class="font-bold"> E-Commerce & CRUD-Based Applications </span>
              </li>

              <li class="flex items-center w-6/12 p-4">
                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                <span class="font-bold">
                  API Integration, File Uploads & Authentication
                </span>
              </li>

              <li class="flex items-center w-6/12 p-4">
                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                <span class="font-bold"> Responsive & Mobile-Friendly Layouts </span>
              </li>

              <li class="flex items-center w-6/12 p-4">
                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                <span class="font-bold">
                  Custom Solutions for Students, SMEs & Online Businesses
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// export default {
//   computed: {
//       coverImage() {
//           const image = this.$appState.darkTheme ? 'images/uikit/primeone-cover-dark.jpeg' : 'images/uikit/primeone-cover-light.jpeg';

//           return 'https://primefaces.org/cdn/primevue/' + image;
//       }
//   }
// };
</script>

<style lang="scss" scoped>
/* =========================
   WORK EXPERIENCE – DARK MODE
   ========================= */
.my-app-dark {
  .dark-mode-card{
       background-color: #0f172a !important;
  }
  /* OUTER WRAPPER (override whitesmoke inline) */
  [style*="background-color: whitesmoke"] {
    background-color: #0f172a !important;
  }

  /* MAIN CONTAINER */
  .m-6 {
    color: #e5e7eb;
  }

  /* CARD / SECTION */
  .card,
  .p-4 {
    background-color: #0f172a;
    border-radius: 50px;
  }

  /* HEADINGS */
  .text-5xl,
  .font-bold {
    color: #f9fafb;
  }

  /* PARAGRAPH & META TEXT */
  p,
  .text-lg {
    color: #d1d5db;
  }

  /* PRIMARY TEXT (DATE / ROLE) */
  .text-primary {
    color: #60a5fa;
  }

  /* DIVIDER */
  hr {
    border-color: rgba(255, 255, 255, 0.08);
  }

  /* LIST TEXT */
  ul li span {
    color: #e5e7eb;
  }

  /* ICON CHECK */
  .pi-check-circle {
    color: #22c55e;
  }

  /* IMAGES */
  img {
    filter: brightness(0.92) contrast(1.05);
  }
}
</style>
