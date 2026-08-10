import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Applies to every route in the app
        source: "/:path*",
        headers: [
          {
            // Stops browsers from "MIME sniffing" a response into a
            // different content type than the server declared - blocks a
            // class of XSS where an uploaded/returned file gets executed
            // as script instead of treated as plain data.
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Controls how much of your URL gets sent as the "Referer"
            // header when someone clicks a link off your site. This
            // setting sends the full URL to same-origin requests, but only
            // the origin (no path/query) cross-origin - avoids leaking
            // things like query params to third-party sites.
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            // Prevents your pages from being loaded inside an <iframe> on
            // another site, which blocks "clickjacking" (tricking a user
            // into clicking something on your site while it's invisibly
            // framed under different content).
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
