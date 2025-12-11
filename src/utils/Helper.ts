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

export function saveStoregeListMenu(row: any) {
    localStorage.setItem("list_menu", JSON.stringify(row));
}

export function alert(type: typeNotify, message: any, title: any = null): any {
    const toast = useToaster();
    title = title ? title : "Info";
    if (type == "success") {
        toast.success(message, title);
    } else if (type == "error") {
        toast.error(message, title);
    } else if (type == "info") {
        toast.info(message, title);
    } else if (type == "purple") {
    } else if (type == "orange") {
    } else if (type == "primary") {
        toast.success(message, title);
    } else if (type == "blue") {
    } else if (type == "green") {
    } else if (type == "warning") {
        toast.warn(message, title);
    } else {
    }
}