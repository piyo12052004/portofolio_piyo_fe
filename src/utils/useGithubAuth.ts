// @src/composable/useGithubAuth.ts
import { fecthSession } from "@src/utils/usersSesion";

export function useGithubAuth() {
    const openPopup = () => {
        const width = 520;
        const height = 620;

        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        return window.open(
            `${import.meta.env.VITE_API_URL}/auth/github`,
            "GitHub Login",
            `width=${width},height=${height},left=${left},top=${top}`
        );
    };

    const login = () =>
        new Promise(async (resolve, reject) => {
            const popup = openPopup();
            if (!popup) return reject("Popup blocked");

            const timer = setInterval(() => {
                if (popup.closed) {
                    clearInterval(timer);
                    reject("Popup closed");
                }
            }, 500);

            const onMessage = async (event: MessageEvent) => {
                if (event.origin !== import.meta.env.VITE_API_URL) return;

                if (event.data?.token) {
                    clearInterval(timer);
                    window.removeEventListener("message", onMessage);

                    localStorage.setItem("token", event.data.token);
                    localStorage.setItem("provider", "github");

                    await fecthSession();
                    resolve(event.data);
                }
            };

            window.addEventListener("message", onMessage);
        });

    return { login };
}
