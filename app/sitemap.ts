import type { MetadataRoute } from "next";
// TODO: Edite domain Url
const BASE_URL = "https://your-domain.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ["", "/about", "/projects", "/contact"];

    return routes.map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.8,
    }));
}