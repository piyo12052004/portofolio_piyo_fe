<template>
  <section class="landing-templates theme-dark py-20">
    <section
      :class="[
        'templates flex justify-center items-center flex-col mt-7',
        { 'templates-animation': setAnimation },
      ]"
    >
      <div class="flex md:flex-row flex-col gap-6 lg:gap-0 ">
        <div
          class="template-block block-5 mr-2 lg:mb-0 flex justify-center items-center cursor-pointer"
          :style="{ backgroundImage: img1() }" @click="goToPortofolio"
        >
          <span class="templates-btn">Portfolio</span>
        </div>
        <div
          class="template-block block-2 ml-2 flex justify-center items-center cursor-pointer"
          :style="{ backgroundImage: img2() }" @click="GoToPage($event,'data')"
        >
          <a class="templates-btn" target="_blank" href="https://freya.primevue.org"
            >Parking Dashboard</a
          >
        </div>
      </div>
      <div class="flex my-6 md:flex-row flex-col gap-6 lg:gap-0 ">
        <div
          class="template-block block-3 mr-2 lg:mb-0 flex justify-center items-center cursor-pointer"
          :style="{ backgroundImage: img3() } " @click="GoToPage($event,'data')"
        >
          <a class="templates-btn" target="_blank" href="https://atlantis.primevue.org/"
            >School Registration App</a
          >
        </div>
        <div
          class="template-block block-middle mr-2 hidden lg:flex justify-center items-center flex-col"
        >
          <img class="img-1" :src="templateImg()" height="110" />
        </div>
        <div
          class="template-block block-4 ml-2 flex justify-center items-center cursor-pointer"
          :style="{ backgroundImage: imageBg('apollo') }" @click="GoToPage($event,'data')"
        >
          <a class="templates-btn" target="_blank" href="https://apollo.primevue.org"
            >Apollo Preview</a
          >
        </div>
      </div>
      <div class="flex md:flex-row flex-col gap-6 lg:gap-0">
        <div
          class="template-block block-1 mr-2 lg:mb-0 flex justify-center items-center cursor-pointer"
          :style="{ backgroundImage: imageBg('diamond') }" @click="GoToPage($event,'data')"
        >
          <a class="templates-btn" target="_blank" href="https://diamond.primevue.org"
            >Diamond Preview</a
          >
        </div>
        <div
          class="template-block block-6 ml-2 flex justify-center items-center cursor-pointer"
          :style="{ backgroundImage: imageBg('ultima') }" @click="GoToPage($event,'data')"
        >
          <a class="templates-btn" target="_blank" href="https://ultima.primevue.org"
            >Ultima Preview</a
          >
        </div>
      </div>
      <div class="lines">
        <div class="top">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="left">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped lang="scss">
@use "@src/assets/scss/landingPage.scss";
</style>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

// images
import ImgSatuLign from "@src/assets/img/img-frelance-layout-lign.svg";
import ImgSatuDark from "@src/assets/img/img-frelance-layout-dark.svg";

import prjectDark1 from "@src/assets/img/project_dark_1.png";
import prjectLign1 from "@src/assets/img/project_lign_1.png";
import prjectLign2 from "@src/assets/img/project_lign_2.png";
import prjectLign3 from "@src/assets/img/project_lign_3.png";
import { useConfirm } from "primevue/useconfirm";

import router from "@src/route";
import * as H from "@src/utils/Helper";


const confirm = useConfirm();
// session
const session = JSON.parse(localStorage.getItem("user_session"));
// state
const setAnimation = ref(false);
const isDarkMode = ref(false);

let observer: MutationObserver | null = null;

// detect theme
const detectTheme = () => {
  const root = document.documentElement;
  isDarkMode.value =
    root.classList.contains("my-app-dark") || root.classList.contains("p-dark");
};

// lifecycle
onMounted(() => {
  setAnimation.value = true;
  detectTheme();

  observer = new MutationObserver(detectTheme);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
});

onBeforeUnmount(() => {
  observer?.disconnect();
});

// helpers
const imageBg = (template: string) => {
  const url = template === "templates-text" ? "png" : "jpg";
  return `url('https://primefaces.org/cdn/primevue/images/landing/templates/${template}-${
    isDarkMode.value ? "dark" : "light"
  }.${url}')`;
};

const templateImg = () => {
  return isDarkMode.value ? ImgSatuDark : ImgSatuLign;
};

const img1 = () => {
  return `url('${isDarkMode.value ? prjectDark1 : prjectLign1}')`;
};

const img2 = () => {
  return `url('${prjectLign2}')`;
};

const img3 = () => {
  return `url('${prjectLign3}')`;
};

// navigation (opsional)
const goToPortofolio = () => {
  // router.push('/');
  window.location.href = "/";
};

function GoToPage(event:any,row:any){
  if(!session){
    toggelLoginConfirmDialog(event)
  }else{
    console.log('go ke project');
  }
}


const toggelLoginConfirmDialog = (event: Event) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    message: 'You need to log in first to view this project.',
    header: 'Login Required',
    icon: 'pi pi-lock',
    position: 'right', // ⬅ pojok kanan relatif ke target
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Login',
    },
    accept: () => {
      router.push('/auth-login')
    },
  })
}

</script>
