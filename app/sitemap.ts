import type { MetadataRoute } from "next";
const _domain = process.env.MY_DOMAIN;
const BASE_URL = _domain;

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ["", "/about", "/projects", "/contact"];

    return routes.map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.8,
    }));
}