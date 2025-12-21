import { createRouter, createWebHistory } from "vue-router";

const DefaultLayout = () => import("./layout/DefaultLayout.vue");
const EmptyLayout = () => import("./layout/EmptyLayout.vue");

const NotFound = () => import("./page/NotFound.vue");
const DashboardPage = () => import("./page/dashboard/portofolio.vue");
const Login = () => import("./page/auth/Login.vue");
const SignUp = () => import("./page/dashboard/registrasi/sign-up.vue");
const dashKgj = () => import("./page/dashboard/frelance/schoolSmpKaryaGunaJaya/main.vue");
const generateAccesToken = () => import("./page/dashboard/feature/GenerateAccesToken.vue");

const pageModules = import.meta.glob("/src/page/**/*.vue");

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "DefaultLayout",    // <-- WAJIB AGAR addRoute bekerja
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
                    component: dashKgj,
                },
                {
                    path: "profile",
                    name: "GenerateToken",
                    component: generateAccesToken,
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
                    name: "Regist",
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
   cocokkan otomatis ke file vue
============================== */

function resolveComponentPath(componentName: string) {
    componentName = componentName.replace(/^\//, "");

    for (const key of Object.keys(pageModules)) {
        if (key.endsWith(`${componentName}.vue`)) {
            return key;
        }
    }

    return null;
}

export const addDynamicRoutes = () => {
    const saved = localStorage.getItem("list_menu");
    if (!saved) return;

    const arrRoutes = JSON.parse(saved);
    arrRoutes.forEach((r) => {
        // CASE 1: route langsung
        if (r.path && r.component) {

            const key = resolveComponentPath(r.component);
            const pageComponent = key ? pageModules[key] : NotFound;

            router.addRoute(
                "DefaultLayout",
                {path: "/" + r.path.replace(/^\//, ""),name: r.name ?? r.sub_title,component: pageComponent,}
            );
        }

        // CASE 2: dropdown → route children
        else if (r.paths && r.paths.length > 0) {

            r.paths.forEach((child: any) => {

                const key = resolveComponentPath(child.component);
                const pageComponent = key ? pageModules[key] : NotFound;

                router.addRoute(
                    "DefaultLayout",
                    {path: "/" + child.path.replace(/^\//, ""),name: child.name,component: pageComponent,}
                );
            });
        }
    });
};
