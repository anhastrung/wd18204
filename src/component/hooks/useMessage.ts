import { ToastPosition, Zoom, toast } from "react-toastify";

export const successMessage = (message: string, position?: ToastPosition | "top-right") => {
    return toast.success(message, {
        position: position,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
    });
}

export const errorMessage = (message: string, position?: ToastPosition | "top-right") => {
    return toast.error(message, {
        position: position,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
        className: 'toast-error'
    });
}

export const infoMessage = (message: string, position?: ToastPosition | "top-right") => {
    return toast.info(message, {
        position: position,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
        className: 'toast-info'
    });
}

export const warningMessage = (message: string, position?: ToastPosition | "top-right") => {
    return toast.warning(message, {
        position: position,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
        className: 'toast-warning'
    });
}

export const clearMessage = () => {
    toast.dismiss();
}