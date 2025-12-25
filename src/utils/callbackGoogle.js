import { fecthSession } from "@src/utils/usersSesion"

export async function handleGoogleCallback() {
    const code = new URLSearchParams(window.location.search).get('code')

    if (!code) {
        alert('Login gagal')
        return
    }

    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/exchange`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
        }
    )

    if (!res.ok) {
        alert('Exchange token gagal')
        return
    }

    const data = await res.json()

    localStorage.setItem('token', data.access_token)

    await fecthSession()
    // bersihkan URL
    window.history.replaceState({}, document.title, '/')

    // redirect
    window.location.href = '/'
}
