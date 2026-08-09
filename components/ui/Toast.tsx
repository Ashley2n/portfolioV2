"use client";

import {AnimatePresence, motion} from "framer-motion";
import {CheckCircle2, Info, Loader2, X, XCircle} from "lucide-react";
import React from "react";
import {useToast} from "@/app/hooks/useToast";

const ICONS = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400"/>,
    error: <XCircle className="w-5 h-5 text-red-400"/>,
    info: <Info className="w-5 h-5 text-sky-400"/>,
    loading: <Loader2 className="w-5 h-5 text-text-muted animate-spin"/>,
};

export const ToastContainer = () => {
    const {toasts, dismiss} = useToast();

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex w-[calc(100%-3rem)] max-w-sm flex-col gap-3">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        layout
                        initial={{opacity: 0, y: 20, scale: 0.95}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: 20, scale: 0.95}}
                        transition={{duration: 0.25, ease: [0.22, 1, 0.36, 1]}}
                        className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface p-4 backdrop-blur-2xl shadow-lg"
                        role="status"
                    >
                        <div className="mt-0.5 shrink-0">{ICONS[toast.type]}</div>
                        <p className="flex-1 text-sm text-foreground">{toast.message}</p>
                        {toast.type !== "loading" && (
                            <button
                                type="button"
                                onClick={() => dismiss(toast.id)}
                                aria-label="Dismiss notification"
                                className="shrink-0 text-text-faint transition-colors hover:text-foreground cursor-pointer"
                            >
                                <X className="w-4 h-4"/>
                            </button>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
