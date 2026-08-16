# 📄 PRD: Convite de Aniversário Digital com Contagem Regressiva & RSVP via WhatsApp

**Versão:** 1.0

**Status:** Aprovado

**Hospedagem:** GitHub Pages

**Volume Estimado:** Até 50 convidados

**Custo Total de Infraestrutura:** R$ 0,00

---

## 1. Visão Geral do Produto

O projeto consiste em um site estático responsivo de **Convite de Aniversário**, inspirado no visual e no contador regressivo do site do *Rock in Rio*.

O objetivo é centralizar as informações do evento, gerar expectativa com a contagem em tempo real e permitir que os convidados confirmem presença de forma prática. Todas as confirmações (RSVP) são transformadas em uma mensagem formatada e enviadas diretamente para o WhatsApp do aniversariante.

---

## 2. Objetivos e Métricas de Sucesso

* **Experiência sem Fricção:** O convidado deve conseguir confirmar presença em menos de 1 minuto, sem necessidade de cadastro ou login.
* **Recebimento Direto:** O aniversariante recebe as confirmações organizadas no próprio aplicativo do WhatsApp.
* **Custo e Servidor Zero:** Rodar 100% de forma estática no GitHub Pages, sem dependência de banco de dados, APIs pagas ou serviços de formulário de terceiros.
* **Acessibilidade Mobile:** Layout 100% otimizado para celulares (iOS e Android), visto que a divulgação será via mensagens instantâneas.

---

## 3. Requisitos Funcionais (RF)

| ID | Requisito | Descrição |
| --- | --- | --- |
| **RF-01** | **Contagem Regressiva** | Cronômetro dinâmico em tempo real na seção inicial (Hero) exibindo **Dias, Horas, Minutos e Segundos** até o horário de início da festa. |
| **RF-02** | **Informações do Evento** | Exibição clara de Data, Horário, Endereço do local, Dress Code (traje) e avisos gerais. |
| **RF-03** | **Atalhos de Navegação** | Botões diretos para abrir o endereço do evento no **Google Maps** e no **Waze**. |
| **RF-04** | **Formulário de RSVP** | Coleta dos dados do convidado: Nome Completo, Confirmação (*"Sim, vou!"* ou *"Não poderei ir"*), Número de Acompanhantes e Recado/Mensagem (opcional). |
| **RF-05** | **Integração com WhatsApp** | Ao submeter o formulário, o JavaScript gera um link `https://wa.me/` com os dados digitados e abre o WhatsApp direcionado ao número do aniversariante. |
| **RF-06** | **Tratamento de Dados no JS** | Codificação do texto da mensagem usando `encodeURIComponent` para garantir que quebras de linha e caracteres especiais sejam mantidos corretamente no WhatsApp. |
| **RF-07** | **Carrossel de Fotos** | Carrossel de fotos no topo (Hero) em JS Vanilla, exibindo as imagens da pasta `img/`. Em telas médias/grandes o Hero é lado a lado (título/contagem à esquerda, carrossel compacto à direita); em mobile os elementos são empilhados. Transição suave (fade) com auto-avanço a cada 3–4s e indicadores visuais (pontos/barras). |

---

## 4. Requisitos Não Funcionais (RNF)

| ID | Requisito | Descrição |
| --- | --- | --- |
| **RNF-01** | **Hospedagem Estática** | O código deve ser composto unicamente por HTML, CSS e JavaScript estáticos para rodar nativamente no **GitHub Pages**. |
| **RNF-02** | **Design Mobile-First** | Interface pensada prioritariamente para telas de smartphones. |
| **RNF-03** | **Desempenho** | Tempo de carregamento inferior a 2 segundos em conexões móveis (4G/5G). |
| **RNF-04** | **Privacidade** | Sem armazenamento persistente de dados em servidores terceiros ou banco de dados. |
| **RNF-05** | **Compatibilidade** | Funcionamento garantido em navegadores móveis e desktop (Chrome, Safari, Edge, Firefox). |

---

## 5. Arquitetura e Stack Tecnológica

| Camada | Tecnologia Selecionada | Motivo da Escolha |
| --- | --- | --- |
| **Frontend** | **HTML5 + JS Vanilla (ES6+)** | Leve, nativo e sem etapas de compilação ou build complexos. |
| **Estilização (UI)** | **Tailwind CSS (via CDN)** | Permite criar visual escuro estilo festival/evento (estilo Rock in Rio) de forma rápida e responsiva. |
| **Integração RSVP** | **WhatsApp Universal Link (`wa.me`)** | Elimina a necessidade de backend ou envio de e-mails; o próprio app do WhatsApp entrega o formulário preenchido. |
| **Hospedagem** | **GitHub Pages** | Gratuito, disponibilidade alta, HTTPS/SSL automático e hospedagem nativa do repositório Git. |

---

## 6. Fluxo de Experiência do Usuário (User Journey)

```
[Convidado clica no link] 
         │
         ▼
[Acessa o site estático no GitHub Pages]
         │
         ▼
[Visualiza a Contagem Regressiva estilo Rock in Rio]
         │
         ▼
[Rola a página e lê detalhes do evento + Atalho para o Maps]
         │
         ▼
[Preenche o formulário de RSVP (Nome, Presença, Acompanhantes)]
         │
         ▼
[Clica em "Confirmar no WhatsApp"]
         │
         ▼
[Abre o App do WhatsApp com a mensagem já pré-formatada]
         │
         ▼
[Convidado clica no botão 'Enviar' dentro do WhatsApp] ──► [Aniversariante recebe a confirmação]
```

---

## 7. Estrutura do Texto Gerado para o WhatsApp

Quando o convidado clica no botão de enviar, a mensagem enviada ao aniversariante terá o seguinte formato:

```text
🎉 *Confirmação de Presença - Aniversário* 🎉

👤 *Nome:* João Silva
✅ *Presença:* Sim, com certeza vou!
👥 *Acompanhantes:* 1 (Maria Silva)
💬 *Recado:* Parabéns! Nos vemos lá!
```

---

## 8. Layout e Identidade Visual (Inspirado no Rock in Rio)

1. **Cabeçalho / Hero Section:**
   * Fundo escuro (Dark Mode) com destaques em cores quentes/vibrantes (amarelo/neon ou gradientes).
   * Título principal estilizado: *NOME DO ANIVERSARIANTE - CELEBRATION*.
   * Bloco de destaque com os dígitos da contagem regressiva em caixas destacadas.
   * Layout lado a lado em telas médias/grandes: à esquerda o título/subtítulo e a contagem regressiva; à direita um carrossel de fotos compacto (não ocupa a largura inteira). Em mobile, os elementos ficam empilhados na vertical.

2. **Seção de Detalhes:**
   * Ícones para Data, Hora, Local e Traje.
   * Botões de ação rápida para traçar rota no Google Maps ou Waze.

3. **Seção do Formulário:**
   * Formulário limpo com campos bem delimitados.
   * Botão principal em destaque verde/WhatsApp com ícone: **"Confirmar Presença via WhatsApp"**.

---

## 9. Lógica do Código (Exemplo de Implementação)

### **Script da Contagem Regressiva & WhatsApp (JS)**

```javascript
// CONFIGURAÇÕES DO EVENTO
const DATA_EVENTO = new Date("2026-11-20T20:00:00").getTime();
const TELEFONE_ANIVERSARIANTE = "5511999999999"; // Com DDD e Código do País (55)

// CONTAGEM REGRESSIVA
const timer = setInterval(() => {
    const agora = new Date().getTime();
    const diferenca = DATA_EVENTO - agora;

    if (diferenca < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerText = "O evento começou!";
        return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    document.getElementById("dias").innerText = dias;
    document.getElementById("horas").innerText = horas;
    document.getElementById("minutos").innerText = minutos;
    document.getElementById("segundos").innerText = segundos;
}, 1000);

// ENVIO PARA O WHATSAPP
function enviarRSVP(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const presenca = document.getElementById("presenca").value;
    const acompanhantes = document.getElementById("acompanhantes").value || "Nenhum";
    const recado = document.getElementById("recado").value || "Sem recado";

    const textoMensagem = 
`🎉 *Confirmação de Presença - Aniversário* 🎉\n\n` +
`👤 *Nome:* ${nome}\n` +
`✅ *Status:* ${presenca}\n` +
`👥 *Acompanhantes:* ${acompanhantes}\n` +
`💬 *Recado:* ${recado}`;

    const url = `https://wa.me/${TELEFONE_ANIVERSARIANTE}?text=${encodeURIComponent(textoMensagem)}`;
    window.open(url, "_blank");
}
```

---

## 10. Passos para Implantação no GitHub Pages

1. Criar um repositório público no GitHub (ex: `convite-aniversario`).
2. Adicionar o arquivo `index.html` na raiz do repositório contendo o código completo (HTML, CSS via Tailwind CDN e JS).
3. Ir em **Settings** > **Pages** no repositório do GitHub.
4. Em **Build and deployment / Source**, selecionar a branch `main` e a pasta `/ (root)`.
5. Salvar. Em cerca de 1 a 2 minutos, o GitHub disponibilizará o link no formato:
   `https://seu-usuario.github.io/convite-aniversario/`

   *obs*: https://github.com/magicuidesign/magicui](https://github.com/magicuidesign/magicui) Crie um temporizador baseado nos componentes deste repositório.