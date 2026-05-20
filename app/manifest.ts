import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YotoKi",
    short_name: "YotoKi",
    description: "Монгол хадмалтай аниме, кино үзэх хөнгөн платформ.",
    start_url: "/",
    display: "standalone",
    background_color: "#050506",
    theme_color: "#050506",
    icons: [
      {
        src: "/images/yotoki-icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/images/yotoki-icon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
