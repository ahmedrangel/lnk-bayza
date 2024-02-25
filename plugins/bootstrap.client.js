import Tooltip from "bootstrap/js/dist/tooltip";

class Bootstrap {
  initializeTooltip () {
    const tooltipTriggerList = document.querySelectorAll("[data-bs-toggle=\"tooltip\"]");
    [...tooltipTriggerList].map(e => new Tooltip(e));
  }
}

const bootstrap = new Bootstrap();

export default defineNuxtPlugin(() => {
  return {
    provide: { bootstrap, Tooltip }
  };
});