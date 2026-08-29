// Ponto de entrada da aplicação: inicializa todos os módulos.
import { initCarousel } from "./carousel.js";
import { initCountdowns } from "./countdown.js";
import { initEvento } from "./evento.js";
import { initMaps } from "./maps.js";
import { initRSVP } from "./rsvp.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ano").textContent = new Date().getFullYear();
  initCountdowns();
  initEvento();
  initMaps();
  initRSVP();
  initCarousel();
});
