import { CONFIG } from "./config.js";

// FORMULÁRIO DE RSVP — Envio via WhatsApp (wa.me)
export function initRSVP() {
  document.getElementById("form-rsvp").addEventListener("submit", enviarRSVP);

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

    let acompanhantes = "Nenhum";
    if (qtde && parseInt(qtde, 10) > 0) {
      acompanhantes = qtde;
      if (nomes) {
        acompanhantes += " (" + nomes + ")";
      }
    } else if (nomes) {
      acompanhantes = nomes;
    }

    const textoMensagem =
      "🎉 *Confirmação de Presença - Aniversário* 🎉\n\n" +
      "👤 *Nome:* " + nome + "\n" +
      "✅ *Presença:* " + presenca + "\n" +
      "👥 *Acompanhantes:* " + acompanhantes + "\n" +
      "💬 *Recado:* " + (recado || "Sem recado");

    const url = "https://wa.me/" + CONFIG.telefoneAniversariante + "?text=" + encodeURIComponent(textoMensagem);
    window.open(url, "_blank");
  }

  function mostrarErro(msg) {
    const erroEl = document.getElementById("erro-form");
    erroEl.textContent = msg;
    erroEl.classList.remove("hidden");
  }
}
