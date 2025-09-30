import Link from "next/link";
import React from "react";

export default function actionButton({
  title,
  otherStyles,
}: {
  title: string;
  otherStyles?: string;
}) {
  return (
    <button className={`bg-neutral-100 text-neutral-900 px-4 py-1 rounded-xl font-medium cursor-pointer w-fit ${otherStyles}`}>
      {title}
    </button>
  );
}
