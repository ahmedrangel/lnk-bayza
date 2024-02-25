import { SITE } from "~/utils/site-info";

export default defineEventHandler(async() => {
  const fanlinks = await $fetch(SITE.main_url + "/api/fanlinks");
  const routeRules = [];
  for (const key in fanlinks) {
    routeRules.push({ loc: `/${key}`, lastmod: new Date().toISOString() });
  }
  return routeRules;
});