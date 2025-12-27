import { useToaster } from "@src/utils/toats/toaster";

type typeNotify =
    | "success"
    | "error"
    | "info"
    | "purple"
    | "orange"
    | "primary"
    | "blue"
    | "green"
    | "warning";

export async function saveStorege(row: any) {
    localStorage.setItem("token", row);
}

export async function typeLogin(row: any) {
    localStorage.setItem("type_login", row);
}

export function saveStoregeListMenu(row: any) {
    localStorage.setItem("list_menu", JSON.stringify(row));
}

export function alert(type: typeNotify, message: any, title: any = null): any {
    const toast = useToaster()
    title = title ?? 'Info'

    switch (type) {
        case 'success':
        case 'primary':
        case 'green':
            toast.success(message, title)
            break

        case 'error':
            toast.error(message, title)
            break

        case 'info':
        case 'blue':
            toast.info(message, title)
            break

        case 'warning':
        case 'orange':
            toast.warning(message, title)
            break

        default:
            toast.info(message, title)
    }
}