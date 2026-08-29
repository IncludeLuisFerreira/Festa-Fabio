import { CONFIG } from "./config.js";

// INFORMAÇÕES DO EVENTO — gera um card para cada festa definida em CONFIG.festas.

const ICONE_CALENDARIO =
  '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>';

const pad = (n) => String(n).padStart(2, "0");

function capitalizar(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatarDataCompleta(festa) {
  const d = new Date(festa.data);
  const diaSemana = capitalizar(d.toLocaleDateString("pt-BR", { weekday: "long" }));
  const data = d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  return diaSemana + ", " + data;
}

function formatarHorario(festa) {
  const d = new Date(festa.data);
  return pad(d.getHours()) + "h" + pad(d.getMinutes());
}

function criarLinha(rotulo, valor) {
  const div = document.createElement("div");
  div.innerHTML =
    '<dt class="font-titling text-xs font-semibold uppercase tracking-widest text-white/40">' + rotulo + "</dt>" +
    '<dd class="mt-1 font-semibold text-white">' + valor + "</dd>";
  return div;
}

function criarCard(festa) {
  const card = document.createElement("div");
  card.className =
    "group rounded-2xl border border-white/10 bg-festival-panel/60 p-6 transition hover:border-yellow-400/40 hover:bg-festival-panel";

  const cabecalho = document.createElement("div");
  cabecalho.className = "flex items-center gap-4";

  const icone = document.createElement("div");
  icone.className =
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400/15 text-yellow-400 transition group-hover:shadow-neon";
  icone.innerHTML = ICONE_CALENDARIO;

  const titulo = document.createElement("h3");
  titulo.className = "font-titling text-lg font-bold uppercase tracking-widest text-white/90";
  titulo.textContent = festa.titulo;

  cabecalho.appendChild(icone);
  cabecalho.appendChild(titulo);

  const lista = document.createElement("dl");
  lista.className = "mt-6 space-y-4 text-sm";

  lista.appendChild(criarLinha("Data", formatarDataCompleta(festa)));
  lista.appendChild(criarLinha("Horário", formatarHorario(festa)));

  const linhaLocal = criarLinha("Local", festa.nomeLocal);
  const endereco = document.createElement("dd");
  endereco.className = "mt-1 text-white/60";
  endereco.textContent = festa.endereco;
  linhaLocal.appendChild(endereco);
  lista.appendChild(linhaLocal);

  card.appendChild(cabecalho);
  card.appendChild(lista);

  return card;
}

export function initEvento() {
  const container = document.getElementById("evento-cards");
  if (!container) return;

  CONFIG.festas.forEach((festa) => {
    container.appendChild(criarCard(festa));
  });
}
