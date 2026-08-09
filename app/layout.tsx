import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/footer";
import { poppins, teko,  } from "@/lib/fonts/fonts";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header";
import { ToastProvider } from "@/app/hooks/useToast";
import { ToastContainer } from "@/components/ui/Toast";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${teko.variable} ${poppins.variable} antialiased`}
      >
        <ToastProvider>
          <Header />
          {children}
          <Footer />
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
