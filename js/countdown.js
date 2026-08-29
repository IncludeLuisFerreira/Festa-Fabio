import { CONFIG } from "./config.js";

// CONTAGEM REGRESSIVA (estilo Flip Clock do magicui)
// Gera um cronômetro para cada festa definida em CONFIG.festas.

const UNIDADES = [
  { chave: "dias", label: "Dias" },
  { chave: "horas", label: "Horas" },
  { chave: "minutos", label: "Minutos" },
  { chave: "segundos", label: "Segundos" }
];

const pad = (n) => String(n).padStart(2, "0");

function formatarDataCurta(festa) {
  const d = new Date(festa.data);
  return pad(d.getDate()) + "/" + pad(d.getMonth() + 1);
}

function criarFlap(kind, valor) {
  const flap = document.createElement("div");
  flap.className = "flap flap-" + kind + "-anim";
  const num = document.createElement("span");
  num.className = "num";
  num.textContent = pad(valor);
  flap.appendChild(num);
  return flap;
}

function criarUnidade(unidade) {
  const unit = document.createElement("div");
  unit.className = "flip-unit";

  const card = document.createElement("div");
  card.className = "flip-card";

  const top = document.createElement("div");
  top.className = "flip-half flip-top";
  const numTop = document.createElement("span");
  numTop.className = "num";
  numTop.textContent = "00";
  top.appendChild(numTop);

  const bottom = document.createElement("div");
  bottom.className = "flip-half flip-bottom";
  const numBottom = document.createElement("span");
  numBottom.className = "num";
  numBottom.textContent = "00";
  bottom.appendChild(numBottom);

  card.appendChild(top);
  card.appendChild(bottom);

  const label = document.createElement("p");
  label.className = "mt-3 whitespace-nowrap font-titling text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow-400";
  label.textContent = unidade.label;

  unit.appendChild(card);
  unit.appendChild(label);

  return { card, top: numTop, bottom: numBottom, unit };
}

function criarContagem(container, dataEvento, nomeAniversariante) {
  const refs = {};
  const wrapper = document.createElement("div");
  wrapper.className = "flex items-start justify-center gap-2 sm:gap-3";

  UNIDADES.forEach((u, i) => {
    const { card, top, bottom, unit } = criarUnidade(u);
    refs[u.chave] = { card, top, bottom };
    wrapper.appendChild(unit);
    if (i < UNIDADES.length - 1) {
      const sep = document.createElement("span");
      sep.className = "pt-6 font-display text-2xl text-white/30 sm:text-3xl";
      sep.textContent = ":";
      wrapper.appendChild(sep);
    }
  });

  container.appendChild(wrapper);

  const mensagem = document.createElement("p");
  mensagem.className = "mt-6 text-center font-body text-sm text-white/60";
  container.appendChild(mensagem);

  function atualizarUnidade(chave, valor) {
    const u = refs[chave];
    const novoValor = pad(valor);
    if (u.top.textContent === novoValor) return;

    const valorAntigo = u.top.textContent;
    u.top.textContent = novoValor;

    // Remove flaps anteriores (caso o timer dispare antes do fim da animação)
    u.card.querySelectorAll(".flap").forEach((f) => f.remove());

    const flapTop = criarFlap("top", valorAntigo);
    const flapBottom = criarFlap("bottom", novoValor);

    u.card.appendChild(flapTop);
    u.card.appendChild(flapBottom);

    u.bottom.textContent = novoValor;

    setTimeout(() => {
      flapTop.remove();
      flapBottom.remove();
    }, 520);
  }

  function tick() {
    const agora = new Date().getTime();
    const diff = dataEvento - agora;

    if (diff < 0) {
      container.innerHTML =
        '<div class="w-full rounded-2xl border border-yellow-400/40 bg-yellow-400/10 px-6 py-8">' +
        '<p class="font-display text-2xl sm:text-4xl text-yellow-300">🎉 A festa começou!</p>' +
        '<p class="mt-2 text-white/60">Chegue logo e venha celebrar!</p></div>';
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

    mensagem.textContent =
      dias > 0
        ? "Faltam " + dias + (dias === 1 ? " dia" : " dias") + " para a festa de " + nomeAniversariante + "!"
        : "É hoje! A festa começa em instantes!";
  }

  tick();
  setInterval(tick, 1000);
}

export function initCountdowns() {
  CONFIG.festas.forEach((festa) => {
    const titulo = document.getElementById("titulo-" + festa.id);
    const container = document.getElementById("countdown-" + festa.id);
    if (!container) return;

    if (titulo) {
      titulo.textContent = festa.titulo + " · " + formatarDataCurta(festa);
    }

    const dataEvento = new Date(festa.data).getTime();
    criarContagem(container, dataEvento, CONFIG.nomeAniversariante);
  });
}
