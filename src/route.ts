import { createRouter, createWebHistory } from "vue-router";
import type { Component } from "vue";
import type { RouteRecordRaw } from "vue-router";

/* =============================
   STATIC COMPONENTS
============================== */
const DefaultLayout = () => import("./layout/DefaultLayout.vue");
const EmptyLayout = () => import("./layout/EmptyLayout.vue");

const NotFound = () => import("./page/NotFound.vue");
const DashboardPage = () => import("./page/dashboard/portofolio.vue");
const Login = () => import("./page/auth/Login.vue");
const SignUp = () => import("./page/dashboard/registrasi/sign-up.vue");
const DashKgj = () =>
  import("./page/dashboard/frelance/schoolSmpKaryaGunaJaya/main.vue");
const GenerateAccessToken = () =>
  import("./page/dashboard/feature/GenerateAccesToken.vue");
const CallbackGoogle = () =>
  import("./components/google/OAuthCallback.vue");

/* =============================
   DYNAMIC PAGE MODULES
============================== */
const pageModules: any = import.meta.glob(
  "/src/page/**/*.vue"
) as Record<string, () => Promise<{ default: Component }>>;

/* =============================
   ROUTER
============================== */
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "DefaultLayout",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "Home",
          component: DashboardPage,
        },
        {
          path: "karya-guna-jaya",
          name: "DashKaryaGunaJaya",
          component: DashKgj,
        },
        {
          path: "profile",
          name: "GenerateToken",
          component: GenerateAccessToken,
        },
        {
          path: "oauth/callback",
          name: "CallbackGoogle",
          component: CallbackGoogle,
        },
      ],
    },

    {
      path: "/auth-login",
      component: EmptyLayout,
      children: [
        {
          path: "",
          name: "Login",
          component: Login,
        },
      ],
    },

    {
      path: "/auth-registrasi",
      component: EmptyLayout,
      children: [
        {
          path: "",
          name: "Register",
          component: SignUp,
        },
      ],
    },

    {
      path: "/:pathMatch(.*)*",
      component: EmptyLayout,
      children: [
        {
          path: "",
          name: "NotFound",
          component: NotFound,
        },
      ],
    },
  ],
});

export default router;

/* =============================
   DYNAMIC ROUTE GENERATOR
============================== */

function resolveComponentPath(componentName: string): string | null {
  if (!componentName) return null;

  const normalized = componentName
    .replace(/^\/+/, "")     // hapus slash depan
    .replace(/\.vue$/, "")   // hapus .vue jika ada
    .toLowerCase();

  for (const key in pageModules) {   // ✅ TANPA .value
    const normalizedKey = key
      .replace("/src/page/", "")
      .replace(".vue", "")
      .toLowerCase();

    if (normalizedKey === normalized) {
      return key;
    }
  }

  return null;
}


export const addDynamicRoutes = () => {
  const saved = localStorage.getItem("list_menu");
  if (!saved) return;

  const routes = JSON.parse(saved);

  routes.forEach((r: any) => {
    // CASE 1: SINGLE ROUTE
    if (r.path && r.component) {
      const key = resolveComponentPath(r.component);

      if (!key || !pageModules[key]) {
        return;
      }

      const route: RouteRecordRaw = {
        path: "/" + r.path.replace(/^\//, ""),
        name: r.name ?? r.sub_title,
        component: () =>
          pageModules[key]().then((m: any) => m.default),
      };

      router.addRoute("DefaultLayout", route);
    }

    // CASE 2: DROPDOWN ROUTES
    if (r.paths?.length) {
      r.paths.forEach((child: any) => {
        const key = resolveComponentPath(child.component);

        if (!key || !pageModules[key]) {
          return;
        }

        const route: RouteRecordRaw = {
          path: "/" + child.path.replace(/^\//, ""),
          name: child.name,
          component: () =>
            pageModules[key]().then((m: any) => m.default),
        };

        router.addRoute("DefaultLayout", route);
      });
    }
  });
};

