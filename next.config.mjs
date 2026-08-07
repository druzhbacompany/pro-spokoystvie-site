/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * Legacy/preview-версии главной страницы больше не отдаются публично.
   * Файлы страниц оставлены в репозитории, запрос редиректится до рендера.
   */
  async redirects() {
    return [
      { source: "/old-home", destination: "/", permanent: true },
      { source: "/hero-v2", destination: "/", permanent: true },
      { source: "/hero-v3", destination: "/", permanent: true },
      { source: "/hero-v4", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
