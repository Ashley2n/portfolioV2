import {AnimatePresence, motion} from "framer-motion";
import {X} from "lucide-react";
import React, {useEffect} from 'react';

type ConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const ConfirmationModal = ({isOpen, onClose, children}: ConfirmationModalProps) => {
    // Close on Escape key.
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Lock page scroll while the modal is open.
    useEffect(() => {
        if (!isOpen) return;

        const {style} = document.body;
        const previousOverflow = style.overflow;
        style.overflow = "hidden";

        return () => {
            style.overflow = previousOverflow;
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-6"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}}
                    role="dialog"
                    aria-modal="true"
                >
                    {/*Overlay*/}
                    <div
                        className="absolute inset-0 bg-overlay backdrop-blur-2xl "
                        onClick={() => onClose()}
                    />

                    {/*Background*/}
                    <motion.div
                        className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-2xl border border-border-subtle bg-surface p-6 backdrop-blur-2xl"
                        initial={{y: -20, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: -20, opacity: 0}}
                        transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
                    >
                        <button
                            type="button"
                            onClick={() => onClose()}
                            aria-label="Close modal"
                            className="absolute top-4 right-4 text-text-muted transition-colors hover:text-foreground cursor-pointer"
                        >
                            <X className="w-5 h-5"/>
                        </button>

                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
