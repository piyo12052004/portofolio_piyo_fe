<template>
  <section class="volt-stage">
    <div class="volt-bg-grid"></div>

    <div class="mx-auto max-w-[102rem] px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div
          v-for="(img, i) in images"
          :key="i"
          ref="cards"
          class="volt-card volt-border-walk cursor-pointer"
          @click="goProject()"
        >
          <img
            :src="img.src"
            class="volt-logo"
            :class="img.invertOnDark ? 'invert-on-dark' : ''"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import { onMounted, ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import router from "@src/route";

import ImgSatu from "@src/assets/img/img-frelance.svg";
import ImgDua from "@src/assets/img/img-jasa-medika.svg";
import ImgTiga from "@src/assets/img/img-bbpvp-bekasi.svg";
import ImgEmpat from "@src/assets/img/img-frelance.svg";
import ImgLima from "@src/assets/img/img-frelance.svg";
import ImgEnam from "@src/assets/img/img-frelance.svg";

const confirm = useConfirm();
const session = JSON.parse(localStorage.getItem("user_session"));
const images = [
  { src: ImgSatu, invertOnDark: true },
  { src: ImgDua, invertOnDark: true },
  { src: ImgTiga, invertOnDark: true },
  // { src: ImgEmpat, invertOnDark: true },
  // { src: ImgLima, invertOnDark: true },
  // { src: ImgEnam, invertOnDark: true },
];

const cards = ref<HTMLElement[]>([]);
const isModalLogin: any = ref(false);
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-active");
        } else {
          entry.target.classList.remove("is-active");
        }
      });
    },
    {
      threshold: 0.4, // 40% terlihat baru aktif
    }
  );

  cards.value.forEach((el) => observer.observe(el));
});

function goProject(){
  if(!session){
    toggelLogin()
  }else{
    console.log('go ke project');
  }
}


const toggelLogin = () => {
  confirm.require({
    message: "You need to log in first to view this project.",
    header: "Login Required",
    icon: "pi pi-lock",
    position: "topright",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Login",
    },
    accept: () => {
      router.push("/auth-login");
    },
    reject: () => {
      router.push("/");
    },
  });
};

</script>
<style scoped lang="scss">
@use "@src/assets/scss/vlotDash.scss";
</style>
