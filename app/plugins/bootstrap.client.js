import Tooltip from "bootstrap/js/dist/tooltip";

class Bootstrap {
  initializeTooltip () {
    const tooltipTriggerList = document.querySelectorAll("[data-bs-toggle=\"tooltip\"]");
    [...tooltipTriggerList].map(e => new Tooltip(e, { trigger: "hover" }));
  }
}

const bootstrap = new Bootstrap();

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:suspense:resolve", () => {
    bootstrap.initializeTooltip();
  });

  return {
    provide: { bootstrap, Tooltip }
  };
});
