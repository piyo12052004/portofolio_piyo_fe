import { useApi } from "@src/utils/useApi";

export async function fecthSession() {
    const { data } = await useApi().get(`/profile`);
    localStorage.setItem("user_session", JSON.stringify(data));
}