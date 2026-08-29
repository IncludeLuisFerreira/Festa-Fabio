import { CONFIG } from "./config.js";

// FORMULÁRIO DE RSVP — Envio via WhatsApp (wa.me)
export function initRSVP() {
  const form = document.getElementById("form-rsvp");
  const blocoAcompanhantes = document.getElementById("bloco-acompanhantes");
  const radiosPresenca = document.querySelectorAll('input[name="presenca"]');

  function atualizarAcompanhantes() {
    const presenca = document.querySelector('input[name="presenca"]:checked').value;
    const vai = presenca !== "Não poderei ir";
    if (blocoAcompanhantes) {
      blocoAcompanhantes.classList.toggle("hidden", !vai);
    }
  }

  radiosPresenca.forEach((radio) => {
    radio.addEventListener("change", atualizarAcompanhantes);
  });

  atualizarAcompanhantes();

  form.addEventListener("submit", enviarRSVP);

  function enviarRSVP(event) {
    event.preventDefault();

    const erroEl = document.getElementById("erro-form");
    erroEl.classList.add("hidden");

    const nome = document.getElementById("nome").value.trim();
    const presenca = document.querySelector('input[name="presenca"]:checked').value;
    const qtde = document.getElementById("acompanhantes").value.trim();
    const nomes = document.getElementById("nomes-acompanhantes").value.trim();
    const recado = document.getElementById("recado").value.trim();

    // Validação simples
    if (!nome) {
      mostrarErro("Por favor, informe seu nome completo.");
      document.getElementById("nome").focus();
      return;
    }

    const dataFormatada = new Date(CONFIG.dataEvento).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

    const linhas = [
      "🎉 *Confirmação de Presença - Aniversário* 🎉",
      "",
      "📅 *Data:* " + dataFormatada,
      "👤 *Nome:* " + nome,
      "✅ *Presença:* " + presenca
    ];

    if (presenca !== "Não poderei ir") {
      let acompanhantes = "Nenhum";
      if (qtde && parseInt(qtde, 10) > 0) {
        acompanhantes = qtde;
        if (nomes) {
          acompanhantes += " (" + nomes + ")";
        }
      } else if (nomes) {
        acompanhantes = nomes;
      }
      linhas.push("👥 *Acompanhantes:* " + acompanhantes);
    }

    linhas.push("💬 *Recado:* " + (recado || "Sem recado"));

    const textoMensagem = linhas.join("\n");

    const url = "https://wa.me/" + CONFIG.telefoneAniversariante + "?text=" + encodeURIComponent(textoMensagem);
    window.open(url, "_blank");
  }

  function mostrarErro(msg) {
    const erroEl = document.getElementById("erro-form");
    erroEl.textContent = msg;
    erroEl.classList.remove("hidden");
  }
}
