// CARROSSEL DE FOTOS (Hero)
export function initCarousel() {
  const slides = Array.prototype.slice.call(document.querySelectorAll("#carousel-track .carousel-slide"));
  const dots = Array.prototype.slice.call(document.querySelectorAll("#carousel-dots button"));
  if (slides.length === 0 || dots.length === 0) return;

  let indice = 0;
  let timerId = null;
  const INTERVALO = 4000; // 4 segundos por foto

  function mostrar(i) {
    indice = (i + slides.length) % slides.length;
    slides.forEach((slide, k) => {
      if (k === indice) {
        slide.classList.add("z-10", "scale-100", "opacity-100");
        slide.classList.remove("z-0", "scale-105", "opacity-0");
      } else {
        slide.classList.add("z-0", "scale-105", "opacity-0");
        slide.classList.remove("z-10", "scale-100", "opacity-100");
      }
    });
    dots.forEach((dot, k) => {
      if (k === indice) {
        dot.classList.add("bg-yellow-400", "w-6");
        dot.classList.remove("bg-white/30", "w-2");
      } else {
        dot.classList.add("bg-white/30", "w-2");
        dot.classList.remove("bg-yellow-400", "w-6");
      }
    });
  }

  function parar() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  }

  function agendar() {
    parar(); // garante que só exista UM timer por vez
    timerId = setTimeout(avancar, INTERVALO);
  }

  function avancar() {
    mostrar(indice + 1);
    agendar();
  }

  dots.forEach((dot, k) => {
    dot.addEventListener("click", () => {
      mostrar(k);
      agendar();
    });
  });

  // Sem pausa por hover/toque: as fotos trocam sempre no tempo fixo.
  // Ao voltar para a aba, recalcula o temporizador para evitar que a foto
  // mude imediatamente (o navegador atrasa timers quando a página fica oculta).
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      agendar();
    } else {
      parar();
    }
  });

  mostrar(0);
  agendar();
}
