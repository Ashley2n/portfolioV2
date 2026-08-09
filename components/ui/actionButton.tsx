import React from "react";

export default function actionButton({
  title,
  otherStyles,
  isSubmitting
}: {
  title: string;
  isSubmitting?: boolean;
  otherStyles?: string;
}) {
  return (
    <button
      className={`rounded-md bg-foreground px-5 py-2 text-sm tracking-tight text-background shadow-[0_1px_2px_rgba(0,0,0,0.08),0_10px_24px_-6px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-95 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${otherStyles}`}
      disabled={isSubmitting}
    >
      {title}
    </button>
  );
}
