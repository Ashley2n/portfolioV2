"use client";

import React, {createContext, useCallback, useContext, useRef, useState} from "react";

type ToastType = "success" | "error" | "info" | "loading";

type ToastItem = {
    id: string;
    type: ToastType;
    message: string;
};

type ToastOptions = {
    duration?: number;
};

type ToastPatch = Partial<Pick<ToastItem, "type" | "message">> & ToastOptions;

type ToastContextValue = {
    toasts: ToastItem[];
    success: (message: string, options?: ToastOptions) => string;
    error: (message: string, options?: ToastOptions) => string;
    info: (message: string, options?: ToastOptions) => string;
    loading: (message: string, options?: ToastOptions) => string;
    update: (id: string, patch: ToastPatch) => void;
    dismiss: (id: string) => void;
};

const DEFAULT_DURATION = 4000;

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({children}: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const idCounter = useRef(0);
    const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

    const clearTimer = useCallback((id: string) => {
        const timer = timers.current.get(id);
        if (timer) {
            clearTimeout(timer);
            timers.current.delete(id);
        }
    }, []);

    const dismiss = useCallback((id: string) => {
        clearTimer(id);
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, [clearTimer]);

    const scheduleDismiss = useCallback((id: string, duration?: number) => {
        clearTimer(id);
        // `duration: Infinity` (the loading default) means "stay open until updated/dismissed".
        if (duration === Infinity) return;

        const timer = setTimeout(() => dismiss(id), duration ?? DEFAULT_DURATION);
        timers.current.set(id, timer);
    }, [clearTimer, dismiss]);

    const addToast = useCallback((type: ToastType, message: string, options?: ToastOptions) => {
        const id = String(++idCounter.current);
        const duration = options?.duration ?? (type === "loading" ? Infinity : DEFAULT_DURATION);

        setToasts((prev) => [...prev, {id, type, message}]);
        scheduleDismiss(id, duration);

        return id;
    }, [scheduleDismiss]);

    const update = useCallback((id: string, patch: ToastPatch) => {
        setToasts((prev) => prev.map((toast) => (toast.id === id ? {...toast, ...patch} : toast)));
        scheduleDismiss(id, patch.duration ?? (patch.type === "loading" ? Infinity : DEFAULT_DURATION));
    }, [scheduleDismiss]);

    const value: ToastContextValue = {
        toasts,
        success: (message, options) => addToast("success", message, options),
        error: (message, options) => addToast("error", message, options),
        info: (message, options) => addToast("info", message, options),
        loading: (message, options) => addToast("loading", message, options),
        update,
        dismiss,
    };

    return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within a ToastProvider");
    return context;
};
