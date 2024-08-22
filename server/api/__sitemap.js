import { SITE } from "~/utils/site-info";

export default defineEventHandler(async () => {
  const fanlinks = await $fetch(SITE.main_url + "/api/fanlinks");
  const routeRules = [];
  for (const f of fanlinks) {
    routeRules.push({ loc: `/${f.fanlinkId || f.id?.replace(/-/g, "")}`, lastmod: new Date().toISOString() });
  }
  return routeRules;
});
