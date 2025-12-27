import { useApi } from "@src/utils/useApi";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export async function fecthSession() {
    const { data } = await useApi().get(`/profile`);
    localStorage.setItem("user_session", JSON.stringify(data));
    return data;
}

export const useSessionStore = defineStore("session", () => {
    // ===============================
    // STATE
    // ===============================
    const session = ref<any>(
      JSON.parse(localStorage.getItem("user_session") || "null")
    );
  
    // ===============================
    // GETTERS
    // ===============================
    const isLoggedIn = computed(() => !!session.value);
  
    const accessTokens = computed(() => {
      if (!session.value?.note_json) return [];
  
      try {
        const parsed = JSON.parse(session.value.note_json);
        return parsed?.aksesTokenKaryaGunaJaya?.access_tokens ?? [];
      } catch {
        return [];
      }
    });
  
    // ===============================
    // ACTIONS
    // ===============================
    async function fetchSession() {
      const { data } = await useApi().get("/profile");
  
      session.value = data;
      localStorage.setItem("user_session", JSON.stringify(data));
  
      return data;
    }
  
    function setSession(data: any) {
      session.value = data;
      localStorage.setItem("user_session", JSON.stringify(data));
    }
  
    function clearSession() {
      session.value = null;
      localStorage.removeItem("user_session");
    }
  
    // ===============================
    return {
      session,
      isLoggedIn,
      accessTokens,
      fetchSession,
      setSession,
      clearSession,
    };
  });