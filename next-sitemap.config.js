/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://water-rostov.ru",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*"],
};
