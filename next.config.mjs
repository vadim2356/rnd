/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      { source: "/dlya-doma", destination: "/solutions/dlya-chastnogo-doma", permanent: true },
      { source: "/dlya-kvartiry", destination: "/solutions/dlya-kvartiry", permanent: true },
      { source: "/skvazhina", destination: "/solutions/iz-skvazhiny", permanent: true },
      { source: "/dlya-biznesa", destination: "/solutions/dlya-biznesa-horeca", permanent: true },
    ];
  },
};

export default nextConfig;
