import type {Metadata} from "next";
import "./globals.css";
import Footer from "@/components/layout/footer";
import {poppins, teko,} from "@/lib/fonts/fonts";
import {Geist} from "next/font/google";
import {cn} from "@/lib/utils";
import Header from "@/components/layout/header";
import {ToastProvider} from "@/hooks/useToast";
import {ToastContainer} from "@/components/ui/Toast";
import "dotenv/config";

const geist = Geist({subsets: ['latin'], variable: '--font-sans'});
const _domain = process.env.MY_DOMAIN;
export const metadata: Metadata = {
    metadataBase: new URL("https://portfolio.aabongwa.dev"),

    title: {
        default: "Ashley Abongwa — Full-Stack Software Developer",
        template: "%s | Ashley Abongwa",
    },
    description:
        "Portfolio of Ashley Abongwa, a full-stack developer building with React, Python, and .NET. Based in Iowa. View projects, tech stack, and get in touch.",
    keywords: ["Ashley Abongwa", "Full-Stack Developer", "React Developer", "Iowa Software Developer"],
    openGraph: {
        title: "Ashley Abongwa — Full-Stack Software Developer",
        description: "Portfolio, projects, and tech stack of Ashley Abongwa.",
        url: _domain,
        siteName: "Ashley Abongwa",
        images: [{ url: "/og-image.png", width: 1200, height: 630 }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ashley Abongwa — Full-Stack Software Developer",
        description: "Portfolio, projects, and tech stack of Ashley Abongwa.",
        images: ["/og-image.png"],
    },
};

export function PersonJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Ashley Abongwa",
        url: _domain,
        jobTitle: "Full-Stack Software Developer",
        address: {
            "@type": "PostalAddress",
            addressRegion: "IA",
            addressCountry: "US",
        },
        alumniOf: "Indian Hills Community College",
        knowsAbout: ["React", "Python", "Flask", "C#", ".NET", "Java", "Tailwind CSS"],
        sameAs: [
            "https://github.com/Ashley2n",
            "https://www.linkedin.com/in/ashley-abongwa-1567822b2/",
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
        />
    );
}

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
            <PersonJsonLd/>
            <Header/>
            {children}
            <Footer/>
            <ToastContainer/>
        </ToastProvider>
        </body>
        </html>
    );
}
