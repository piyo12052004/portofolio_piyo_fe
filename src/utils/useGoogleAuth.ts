import { useApi } from "@src/utils/useApi";
import { fecthSession } from "@src/utils/usersSesion";
import * as H from "@src/utils/Helper";

declare global {
    interface Window {
        google: any;
    }
}
export function loadGoogleGsi(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (window.google?.accounts?.id) return resolve();

        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

export async function initGoogleLogin() {
    await loadGoogleGsi();

    const api = useApi();

    // 🔑 BIAR GOOGLE BOLEH PAKAI SESSION BROWSER
    window.google.accounts.id.disableAutoSelect();

    window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async ({ credential }: { credential: string }) => {
            const res = await api.post("/login-google", { credential });

            localStorage.setItem("token", res.data.token);
            await fecthSession();
            H.typeLogin('google');
            window.location.href = "/";
        },
    });

    const el = document.getElementById("googleBtn");
    if (el) {
        window.google.accounts.id.renderButton(el, {
            type: "standard",
            theme: "outline",
            size: "large",
            shape: "pill",
        });
    }

    // ❌ JANGAN pakai prompt() kalau mau Canva-style
}
