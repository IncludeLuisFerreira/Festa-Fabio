import { CONFIG } from "./config.js";

// ATALHOS DE NAVEGAÇÃO (Google Maps e Waze)
export function initMaps() {
  const enderecoCodificado = encodeURIComponent(CONFIG.nomeLocal + ", " + CONFIG.endereco);
  document.getElementById("link-maps").href =
    "https://www.google.com/maps/dir/?api=1&destination=" + enderecoCodificado;
  document.getElementById("link-waze").href =
    "https://waze.com/ul?q=" + enderecoCodificado + "&navigate=yes";
}
