import type { MetadataRoute } from "next";

// TODO: Edit URL
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/"],
        },
        sitemap: "https://your-domain.com/sitemap.xml",
    };
}