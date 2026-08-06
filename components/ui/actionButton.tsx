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
    <button className={`bg-neutral-100 text-neutral-900 px-4 py-1 rounded-xl font-medium cursor-pointer ${otherStyles}`} disabled={isSubmitting}>
      {title}
    </button>
  );
}
