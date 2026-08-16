// Ponto de entrada da aplicação: inicializa todos os módulos.
import { initCarousel } from "./carousel.js";
import { initCountdown } from "./countdown.js";
import { initMaps } from "./maps.js";
import { initRSVP } from "./rsvp.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ano").textContent = new Date().getFullYear();
  initMaps();
  initRSVP();
  initCountdown();
  initCarousel();
});
