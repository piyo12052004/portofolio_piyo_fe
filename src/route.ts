import { createRouter, createWebHistory } from "vue-router";

// ==== LAYOUTS ====
const DefaultLayout = () => import("./layout/DefaultLayout.vue");
// const AuthLayout = () => import("./layout/AuthLayout.vue");
const EmptyLayout = () => import("./layout/EmptyLayout.vue");

const NotFound = () => import("./page/NotFound.vue");
const DashboardPage = () => import("./page/dashboard/index.vue");

const pageModules = import.meta.glob("./page/**/*.vue");

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // {
        //     path: "/login",
        //     component: AuthLayout,
        //     children: [
        //         {
        //             path: "",
        //             name: "Login",
        //             component: () => import("./page/Login.vue"),
        //         },
        //     ],
        // },
        {
            path: "/",
            component: DefaultLayout,
            children: [
                {
                    path: "",
                    name: "Home",
                    component: DashboardPage,
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

export const addDynamicRoutes = (arrRoutes: any[]) => {

    arrRoutes.forEach((r) => {

        // ===============================
        // CASE 1: Parent menu punya path → route biasa
        // ===============================
        if (r.path && r.component) {

            const filePath = `./page/${r.component}.vue`;
            const componentFile = pageModules[filePath];
            const pageComponent = componentFile ?? NotFound;

            router.addRoute(
                "/",  
                {
                    path: r.path,
                    name: r.name ?? r.sub_title,
                    component: pageComponent,
                }
            );

        }
        // ===============================
        // CASE 2: Parent path NULL → gunakan children paths
        // ===============================
        else if (r.paths && r.paths.length > 0) {

            r.paths.forEach((child: any) => {
                
                const filePath = `./page/${child.component}.vue`;
                const componentFile = pageModules[filePath];
                const pageComponent = componentFile ?? NotFound;

                router.addRoute(
                    "/",
                    {
                        path: child.path,
                        name: child.name,
                        component: pageComponent,
                    }
                );
            });

        }

    });
};
