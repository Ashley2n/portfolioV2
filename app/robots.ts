import type { MetadataRoute } from "next";

const _domain = process.env.MY_DOMAIN;
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/"],
        },
        sitemap: _domain + "/sitemap.xml",
    };
}