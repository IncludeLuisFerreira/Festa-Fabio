import { CONFIG } from "./config.js";

// CONTAGEM REGRESSIVA (estilo Flip Clock do magicui)
const unidades = {
  dias:   { top: "dias-top",    bottom: "dias-bottom",    card: "card-dias" },
  horas:  { top: "horas-top",   bottom: "horas-bottom",   card: "card-horas" },
  minutos:{ top: "minutos-top", bottom: "minutos-bottom", card: "card-minutos" },
  segundos:{top: "segundos-top",bottom: "segundos-bottom",card: "card-segundos" }
};

const pad = (n) => String(n).padStart(2, "0");

function criarFlap(kind, valor) {
  const flap = document.createElement("div");
  flap.className = "flap flap-" + kind + "-anim";
  const num = document.createElement("span");
  num.className = "num";
  num.textContent = pad(valor);
  flap.appendChild(num);
  return flap;
}

function atualizarUnidade(chave, valor) {
  const u = unidades[chave];
  const topEl = document.getElementById(u.top);
  const bottomEl = document.getElementById(u.bottom);
  const card = document.getElementById(u.card);
  const novoValor = pad(valor);

  if (topEl.textContent === novoValor) return;

  const valorAntigo = topEl.textContent;
  topEl.textContent = novoValor;

  // Remove flaps anteriores (caso o timer dispare antes do fim da animação)
  card.querySelectorAll(".flap").forEach(f => f.remove());

  // Metade de cima: "cai para fora" revelando o novo valor
  const flapTop = criarFlap("top", valorAntigo);
  // Metade de baixo: "entra" mostrando a parte inferior do novo valor
  const flapBottom = criarFlap("bottom", novoValor);

  card.appendChild(flapTop);
  card.appendChild(flapBottom);

  bottomEl.textContent = novoValor;

  setTimeout(() => {
    flapTop.remove();
    flapBottom.remove();
  }, 520);
}

function inicializarContagem() {
  const agora = new Date().getTime();
  const diff = CONFIG.dataEvento - agora;

  if (diff < 0) {
    const container = document.getElementById("countdown");
    container.innerHTML =
      '<div class="w-full rounded-2xl border border-yellow-400/40 bg-yellow-400/10 px-6 py-8">' +
      '<p class="font-display text-2xl sm:text-4xl text-yellow-300">🎉 O evento começou!</p>' +
      '<p class="mt-2 text-white/60">Chegue logo e venha celebrar!</p></div>';
    document.getElementById("mensagem-dias").textContent = "";
    return;
  }

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diff % (1000 * 60)) / 1000);

  atualizarUnidade("dias", dias);
  atualizarUnidade("horas", horas);
  atualizarUnidade("minutos", minutos);
  atualizarUnidade("segundos", segundos);

  document.getElementById("mensagem-dias").textContent =
    dias > 0
      ? "Faltam apenas " + dias + (dias === 1 ? " dia" : " dias") + " para a festa de " + CONFIG.nomeAniversariante + "!"
      : "É hoje! A festa começa em instantes!";
}

export function initCountdown() {
  inicializarContagem();
  setInterval(inicializarContagem, 1000);
}
