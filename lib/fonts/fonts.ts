import {
  Chela_One,
  Teko,
  Geist,
  Geist_Mono,
  Poppins,
} from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const chelaOne = Chela_One({
  variable: "--font-chela-one",
  subsets: ["latin"],
  weight: ["400"],
});

export const teko = Teko({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-teko",
});

export const poppins = Poppins({
  weight: ["300", "400", "600", "700", "900"],
  style: ["italic", "normal"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
