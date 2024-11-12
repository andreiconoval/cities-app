export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Cities app",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Search",
      href: "/search",
    },
    {
      label: "Cities",
      href: "/cities",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Search",
      href: "/search",
    },
    {
      label: "Cities",
      href: "/cities",
    },
  ],
  links: {
    github: "https://github.com/andreiconoval/cities-app",
    discord: "https://discord.gg/FKYZZXWe",
    sponsor: "/favorites",
  },
};
