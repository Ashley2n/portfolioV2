import {
  Chela_One,
  Geist,
  Geist_Mono,
  Poppins,
  Titan_One,
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

export const titanOne = Titan_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-titan-one",
});

export const poppins = Poppins({
  weight: ["300", "400", "600", "700", "900"],
  style: ["italic", "normal"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
