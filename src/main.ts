// import { useApi } from './utils/useApi';
import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import './style.css'
import './assets/tailwind.css'
import 'primeicons/primeicons.css';

import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from "primevue/tooltip";


import Toast from 'primevue/toast' 
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmPopup from 'primevue/confirmpopup';

import { definePreset } from '@primeuix/themes';
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

import router from "./route";
import { addDynamicRoutes } from './route';

const BlueModern = definePreset(Aura, {
    semantic: {
        primary: {
            50:  '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}',
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{blue.600}',
                    inverseColor: '#ffffff',
                    hoverColor: '{blue.700}',
                    activeColor: '{blue.800}',
                },
                highlight: {
                    background: '{blue.100}',
                    focusBackground: '{blue.200}',
                    color: '{blue.800}',
                    focusColor: '{blue.900}',
                }
            },
            dark: {
                primary: {
                    color: '{blue.300}',
                    inverseColor: '{blue.950}',
                    hoverColor: '{blue.200}',
                    activeColor: '{blue.100}',
                },
                highlight: {
                    background: 'rgba(59,130,246,0.20)',
                    focusBackground: 'rgba(59,130,246,0.35)',
                    color: '#ffffff',
                    focusColor: '#ffffff',
                }
            }
        }
    }
});

const app = createApp(App);
const pinia = createPinia();
app.use(PrimeVue, {
    theme: {
        preset: BlueModern,
        options: {
            darkModeSelector: ".my-app-dark",
            cssLayer: {
                theme: {
                    fonts: false // <<< MATIKAN FONT THEME
                }
            }
        }
    }
});


addDynamicRoutes();

app.use(ToastService)
app.use(ConfirmationService)
app.component("Toast", Toast)
app.component("ConfirmDialog", ConfirmDialog);
app.component("ConfirmPopup", ConfirmPopup);
app.use(router); 
app.use(pinia);
app.directive("tooltip", Tooltip);
app.mount("#app");
