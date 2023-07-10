const { pathTranslations } = require("./src/translations/pathTranslations");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
  },
  trailingSlash: true,

  async rewrites() {
    const translationsCodes = Object.keys(pathTranslations);
    return translationsCodes.map((translationCode) => {
      const defaultTranslationPath = Object.keys(
        pathTranslations[translationCode]
      )[0];
      const translatedPath =
        pathTranslations[translationCode][defaultTranslationPath];

      return {
        source: `/de${translatedPath}`,
        destination: `/de${defaultTranslationPath}`,
        locale: false,
      };
    });
    // return [
    //   {
    //     source: "/de/geschichten",
    //     destination: "/de/blog",
    //     locale: false,
    //   },
    // ];
  },
  //? to handle language switch link we use redirects, but redirects only triggered by regular <a>
  async redirects() {
    const translationsCodes = Object.keys(pathTranslations);
    return translationsCodes.map((translationCode) => {
      const defaultTranslationPath = Object.keys(
        pathTranslations[translationCode]
      )[0];
      const translatedPath =
        pathTranslations[translationCode][defaultTranslationPath];

      return {
        source: `/de${defaultTranslationPath}`,
        destination: `/de${translatedPath}`,
        locale: false,
        permanent: true,
      };
    });
    // return [
    //   {
    //     source: "/de/blog",
    //     destination: "/de/geschichten",
    //     locale: false,
    //     permanent: true,
    //   },
    // ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "people.pic1.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
