export async function setTokenUserLogin(id: string): Promise<void> {
    let baseUrl = import.meta.env.VITE_API_BASE_URL
    try {
        const response = await axios.get(`${baseUrl}gizi/temp-user-login/show/${id}`)

        if (response.data) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user_session', response.data.user_login)
        }
    } catch (error) {
        console.error('Gagal ambil data temp user login:', error)
        throw error // optional: untuk menghentikan proses selanjutnya jika gagal
    }
}

export async function saveStorege(row: any) {
    localStorage.setItem("token", row);
}

export function saveStoregeListMenu(row: any) {
    localStorage.setItem("list_menu", JSON.stringify(row));
}