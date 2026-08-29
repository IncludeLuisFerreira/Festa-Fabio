import { CONFIG } from "./config.js";

// FORMULÁRIO DE RSVP — Envio via WhatsApp (wa.me)
// O convidado pode confirmar para uma, as duas ou nenhuma festa.
export function initRSVP() {
  const form = document.getElementById("form-rsvp");
  const blocoAcompanhantes = document.getElementById("bloco-acompanhantes");
  const checkboxNenhuma = document.getElementById("presenca-nenhuma");
  const checkboxesFesta = CONFIG.festas.map((f) =>
    document.querySelector('input[name="presenca"][value="' + f.id + '"]')
  );

  function festasSelecionadas() {
    return CONFIG.festas.filter((f) => {
      const cb = document.querySelector('input[name="presenca"][value="' + f.id + '"]');
      return cb && cb.checked;
    });
  }

  function atualizarAcompanhantes() {
    const vai = festasSelecionadas().length > 0;
    if (blocoAcompanhantes) {
      blocoAcompanhantes.classList.toggle("hidden", !vai);
    }
  }

  checkboxesFesta.forEach((cb) => {
    if (!cb) return;
    cb.addEventListener("change", () => {
      if (cb.checked && checkboxNenhuma) {
        checkboxNenhuma.checked = false;
      }
      atualizarAcompanhantes();
    });
  });

  if (checkboxNenhuma) {
    checkboxNenhuma.addEventListener("change", () => {
      if (checkboxNenhuma.checked) {
        checkboxesFesta.forEach((cb) => {
          if (cb) cb.checked = false;
        });
      }
      atualizarAcompanhantes();
    });
  }

  atualizarAcompanhantes();

  form.addEventListener("submit", enviarRSVP);

  function formatarData(festa) {
    return new Date(festa.data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  function enviarRSVP(event) {
    event.preventDefault();

    const erroEl = document.getElementById("erro-form");
    erroEl.classList.add("hidden");

    const nome = document.getElementById("nome").value.trim();
    const qtde = document.getElementById("acompanhantes").value.trim();
    const nomes = document.getElementById("nomes-acompanhantes").value.trim();
    const recado = document.getElementById("recado").value.trim();
    const selecionadas = festasSelecionadas();

    // Validação simples
    if (!nome) {
      mostrarErro("Por favor, informe seu nome completo.");
      document.getElementById("nome").focus();
      return;
    }

    const linhas = [
      "*Confirmação de Presença - Aniversário*",
      "",
      "*Nome:* " + nome
    ];

    if (selecionadas.length === 0) {
      linhas.push("*Presença:* Não poderei ir");
    } else {
      linhas.push("*Presença:* Sim, vou!");
      linhas.push("*Festa(s):* " + selecionadas.map((f) => f.titulo).join(" e "));
      selecionadas.forEach((f) => {
        linhas.push("  " + f.titulo + ": " + formatarData(f) + " - " + f.nomeLocal);
      });

      let acompanhantes = "Nenhum";
      if (qtde && parseInt(qtde, 10) > 0) {
        acompanhantes = qtde;
        if (nomes) {
          acompanhantes += " (" + nomes + ")";
        }
      } else if (nomes) {
        acompanhantes = nomes;
      }
      linhas.push("*Acompanhantes:* " + acompanhantes);
    }

    linhas.push("*Recado:* " + (recado || "Sem recado"));

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
