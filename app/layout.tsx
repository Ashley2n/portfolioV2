import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer";
import { chelaOne, geistMono, geistSans, poppins, titanOne } from "@/lib/fonts/fonts";



export const metadata: Metadata = {
  title: "Ashley's Portfolio",
  description:
    "This is a portfolio made by Ashley Abongwa. Please do use this as a resource to reach out to me.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${chelaOne.variable} ${titanOne.variable} ${poppins.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
