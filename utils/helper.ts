import { TruncatedTextType } from "@/app/types/types";

export const truncatedText = ({ text, maxWords }: TruncatedTextType) => {
  const words = text.split(" ");
  const isTruncated = words.length > maxWords;

  return isTruncated ? words.slice(0, maxWords).join(" ") + "..." : text;
};
