import type { NextConfig } from "next";

const htmlPages = ["essays", "books", "notes", "journal", "people", "aiva", "svar"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      ...htmlPages.map((page) => ({
        source: `/${page}.html`,
        destination: `/${page}`,
        permanent: true,
      })),
      {
        source: "/blog.html",
        has: [{ type: "query", key: "post", value: "(?<post>.+)" }],
        destination: "/blog/:post",
        permanent: true,
      },
      { source: "/blog.html", destination: "/essays", permanent: false },
    ];
  },
};

export default nextConfig;
