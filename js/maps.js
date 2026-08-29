import { CONFIG } from "./config.js";

// ATALHOS DE NAVEGAÇÃO + Mapa incorporado (Google Maps) por festa.
// Usa coordenadas explícitas para garantir o local exato (o texto do endereço
// rural nem sempre é geocodificado corretamente pelo Google).
export function initMaps() {
  CONFIG.festas.forEach((festa) => {
    const titulo = document.getElementById("titulo-mapa-" + festa.id);
    const linkMaps = document.getElementById("link-maps-" + festa.id);
    const linkWaze = document.getElementById("link-waze-" + festa.id);
    const mapaEmbed = document.getElementById("mapa-embed-" + festa.id);
    const semMapa = document.getElementById("sem-mapa-" + festa.id);

    if (titulo) {
      titulo.textContent = festa.titulo + " · " + festa.nomeLocal;
    }

    // Sem coordenadas ainda: mostra aviso de "em breve" e esconde atalhos/mapa.
    if (!festa.coords) {
      if (mapaEmbed) mapaEmbed.classList.add("hidden");
      if (semMapa) semMapa.classList.remove("hidden");
      if (linkMaps) linkMaps.classList.add("hidden");
      if (linkWaze) linkWaze.classList.add("hidden");
      return;
    }

    const destino = festa.coords.lat + "," + festa.coords.lon;

    if (linkMaps) {
      linkMaps.href = "https://www.google.com/maps/dir/?api=1&destination=" + destino;
    }
    if (linkWaze) {
      linkWaze.href = "https://waze.com/ul?ll=" + destino + "&navigate=yes";
    }
    if (mapaEmbed) {
      mapaEmbed.src = "https://www.google.com/maps?q=" + destino + "&z=15&output=embed";
    }
  });
}
