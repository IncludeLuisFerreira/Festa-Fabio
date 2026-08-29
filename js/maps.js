import { CONFIG } from "./config.js";

// ATALHOS DE NAVEGAÇÃO + Mapa incorporado (Google Maps)
// Usa coordenadas explícitas para garantir o local exato (o texto do endereço
// rural nem sempre é geocodificado corretamente pelo Google).
export function initMaps() {
  const destino = CONFIG.coords.lat + "," + CONFIG.coords.lon;

  const linkMaps = document.getElementById("link-maps");
  if (linkMaps) {
    linkMaps.href = "https://www.google.com/maps/dir/?api=1&destination=" + destino;
  }

  const linkWaze = document.getElementById("link-waze");
  if (linkWaze) {
    linkWaze.href = "https://waze.com/ul?ll=" + destino + "&navigate=yes";
  }

  const mapaEmbed = document.getElementById("mapa-embed");
  if (mapaEmbed) {
    mapaEmbed.src = "https://www.google.com/maps?q=" + destino + "&z=15&output=embed";
  }
}
