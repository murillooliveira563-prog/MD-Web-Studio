const whatsappNumber = "5521990487662";
const directMessage = "Ol%C3%A1%2C%20Murillo.%20Vim%20pelo%20site%20da%20MD%20Web%20Studio%20e%20gostaria%20de%20conversar.";

const serviceOptions = document.querySelectorAll("[data-servico]");
const serviceDemos = document.querySelectorAll("[data-demo]");

serviceOptions.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedService = button.dataset.servico;
        serviceOptions.forEach((option) => {
            const selected = option === button;
            option.classList.toggle("selecionado", selected);
            option.setAttribute("aria-pressed", String(selected));
        });
        serviceDemos.forEach((demo) => {
            demo.hidden = demo.dataset.demo !== selectedService;
        });
    });
});

const processStages = [
    {
        title: "Entender antes de criar.",
        description: "A conversa começa pela necessidade, pelo negócio e pelo que a presença digital precisa comunicar.",
        visual: "01"
    },
    {
        title: "Definir a direção visual.",
        description: "A identidade, a estrutura e a linguagem visual são pensadas para combinar com a personalidade do negócio.",
        visual: "02"
    },
    {
        title: "Desenvolver com intenção.",
        description: "O projeto ganha forma com foco em navegação clara, apresentação profissional e adaptação a diferentes telas.",
        visual: "03"
    },
    {
        title: "Revisar e publicar.",
        description: "Depois da revisão do projeto, são feitos os ajustes necessários e a publicação é alinhada com o cliente.",
        visual: "04"
    }
];

const processButtons = document.querySelectorAll("[data-etapa-processo]");
const processPanel = document.querySelector(".processo-painel");

processButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const stageIndex = Number(button.dataset.etapaProcesso);
        const stage = processStages[stageIndex];
        if (!stage) return;

        processButtons.forEach((item) => {
            const selected = item === button;
            item.setAttribute("aria-pressed", String(selected));
            item.classList.toggle("selecionado", selected);
        });

        document.getElementById("processo-indice").textContent = `ETAPA ${stage.visual} / 04`;
        document.getElementById("processo-titulo").textContent = stage.title;
        document.getElementById("processo-descricao").textContent = stage.description;
        processPanel.dataset.etapa = stage.visual;
    });
});

const portfolioModal = document.getElementById("portfolioModal");
const portfolioModalImage = document.getElementById("portfolioModalImagem");
const portfolioModalCaption = document.getElementById("portfolioModalLegenda");

 document.querySelectorAll("[data-perspectiva]").forEach((button) => {
    button.addEventListener("click", () => {
        const frame = button.closest(".case-editorial-imagem");
        const isFront = frame.classList.toggle("imagem-frontal");
        button.textContent = isFront ? "Ver em perspectiva" : "Ver de frente";
        button.setAttribute("aria-pressed", String(isFront));
    });
});

document.querySelectorAll("[data-ampliar]").forEach((button) => {
    if (portfolioModal && portfolioModalImage && portfolioModalCaption) {
        button.addEventListener("click", () => {
            portfolioModalImage.src = button.dataset.ampliar;
            portfolioModalImage.alt = button.closest(".case-editorial-imagem").querySelector("img").alt;
            portfolioModalCaption.textContent = button.dataset.legenda;
            portfolioModal.showModal();
        });
    }
});

const assistantButton = document.getElementById("abrirAssistente");
const assistantWindow = document.getElementById("janelaAssistente");
const assistantClose = document.getElementById("fecharAssistente");
const assistantRestart = document.getElementById("reiniciarAssistenteTopo");
const assistantMessages = document.getElementById("mensagensAssistente");
const assistantOptions = document.getElementById("opcoesAssistente");
const assistantBody = document.querySelector(".assistente-corpo");
const assistantProgress = document.getElementById("assistenteProgresso");
const progressText = document.getElementById("progressoTexto");
const progressPercent = document.getElementById("progressoPorcentagem");
const progressFill = document.getElementById("progressoPreenchimento");
const assistantInvite = document.getElementById("conviteAssistente");

const persistentContact = document.createElement("div");
persistentContact.className = "assistente-direto-persistente";
const persistentContactLink = document.createElement("a");
persistentContactLink.href = `https://wa.me/${whatsappNumber}?text=${directMessage}`;
persistentContactLink.target = "_blank";
persistentContactLink.rel = "noopener noreferrer";
persistentContactLink.textContent = "Falar diretamente com Murillo ↗";
const privacyNotice = document.createElement("p");
privacyNotice.textContent = "As respostas ficam nesta página e serão incluídas na mensagem preparada para o WhatsApp.";
persistentContact.append(persistentContactLink, privacyNotice);
assistantBody?.after(persistentContact);

const flowDefinitions = {
    criar: [
        { key: "nome", label: "Como prefere ser chamado?", type: "text", optional: true },
        { key: "negocio", label: "Qual é o tipo do seu negócio?", type: "text", optional: true },
        { key: "servico", label: "Qual serviço faz mais sentido para você?", type: "choice", options: ["Site profissional", "Landing page", "Ainda não sei"] },
        { key: "objetivo", label: "Qual é o principal objetivo do projeto?", type: "choice", options: ["Apresentar meu negócio", "Conseguir novos clientes", "Vender produtos ou serviços", "Divulgar uma campanha", "Ainda estou definindo"] },
        { key: "siteExiste", label: "Você já tem um site?", type: "choice", options: ["Sim", "Não", "Não tenho certeza"] },
        { key: "endereco", label: "Qual é o endereço do site?", type: "text", optional: true, when: (answers) => answers.siteExiste === "Sim" },
        { key: "funcionalidades", label: "Quais funcionalidades você imagina?", type: "text", optional: true, hint: "Ex.: formulário, catálogo ou contato pelo WhatsApp." },
        { key: "materiais", label: "O que você já possui?", type: "text", optional: true, hint: "Textos, imagens, identidade visual e domínio. Pode listar o que já tem." },
        { key: "prazo", label: "Tem algum prazo desejado?", type: "text", optional: true, hint: "Ex.: mês/ano ou sem data definida." },
        { key: "investimento", label: "Tem uma faixa de investimento em mente?", type: "text", optional: true, hint: "Pode informar uma faixa aproximada ou escrever Ainda não sei." }
    ],
    melhorar: [
        { key: "nome", label: "Como prefere ser chamado?", type: "text", optional: true },
        { key: "negocio", label: "Qual é o tipo do seu negócio?", type: "text", optional: true },
        { key: "servico", label: "O que deseja melhorar?", type: "choice", options: ["Site profissional", "Landing page", "Ainda não sei"] },
        { key: "objetivo", label: "Qual é a principal mudança que procura?", type: "choice", options: ["Apresentar melhor meu negócio", "Facilitar o contato", "Atualizar o visual", "Adicionar funcionalidades", "Ainda estou definindo"] },
        { key: "endereco", label: "Qual é o endereço do site atual?", type: "text", optional: true },
        { key: "funcionalidades", label: "O que gostaria de mudar ou incluir?", type: "text", optional: true },
        { key: "materiais", label: "O que você já possui?", type: "text", optional: true, hint: "Textos, imagens, identidade visual e domínio." },
        { key: "prazo", label: "Tem algum prazo desejado?", type: "text", optional: true, hint: "Ex.: mês/ano ou sem data definida." },
        { key: "investimento", label: "Tem uma faixa de investimento em mente?", type: "text", optional: true, hint: "Pode informar uma faixa aproximada ou escrever Ainda não sei." }
    ],
    automacao: [
        { key: "nome", label: "Como prefere ser chamado?", type: "text", optional: true },
        { key: "negocio", label: "Qual é o tipo do seu negócio?", type: "text", optional: true },
        { key: "canal", label: "Em qual canal gostaria de usar a automação?", type: "choice", options: ["WhatsApp", "Instagram", "Outro canal", "Ainda não sei"] },
        { key: "tarefa", label: "Qual tarefa pretende automatizar?", type: "text", optional: true, hint: "Ex.: organizar pedidos ou responder dúvidas recorrentes." },
        { key: "objetivo", label: "Qual resultado seria mais útil?", type: "choice", options: ["Organizar o atendimento", "Responder mais rápido", "Filtrar contatos", "Reduzir tarefas manuais", "Ainda estou definindo"] },
        { key: "prazo", label: "Tem algum prazo desejado?", type: "text", optional: true, hint: "Ex.: mês/ano ou sem data definida." },
        { key: "investimento", label: "Tem uma faixa de investimento em mente?", type: "text", optional: true, hint: "Pode informar uma faixa aproximada ou escrever Ainda não sei." }
    ]
};

const state = {
    flow: null,
    answers: {},
    currentKey: null,
    planContext: null,
    returnFocus: null,
    pendingTimers: new Set()
};

const flowLabels = {
    criar: "criar um site",
    melhorar: "melhorar um site",
    automacao: "conversar sobre uma automação"
};

function cancelPendingReplies() {
    state.pendingTimers.forEach((timerId) => window.clearTimeout(timerId));
    state.pendingTimers.clear();
}

function getFlowSteps() {
    if (!state.flow) return [];
    const steps = [...flowDefinitions[state.flow]];
    if (state.planContext) {
        steps.unshift({
            key: "plano",
            label: `O plano ${state.planContext} é o ponto de partida. Quer manter ou escolher outro?`,
            type: "choice",
            options: ["Essencial", "Profissional", "Custom", "Ainda não sei"]
        });
    }
    return steps.filter((step) => !step.when || step.when(state.answers));
}

function addMessage(text, sender = "robo") {
    const message = document.createElement("div");
    message.className = sender === "visitante" ? "mensagem-cliente" : "mensagem-robo";
    message.textContent = text;
    assistantMessages.append(message);
    assistantBody.scrollTop = assistantBody.scrollHeight;
    return message;
}

function scrollAssistantBodyToBottom() {
    assistantBody.scrollTop = assistantBody.scrollHeight;
}

function clearOptions() {
    assistantOptions.replaceChildren();
}

function createAction(label, action, value) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.dataset.acao = action;
    if (value !== undefined) button.dataset.valor = value;
    assistantOptions.append(button);
    return button;
}

function updateProgress() {
    const steps = getFlowSteps();
    const index = Math.max(0, steps.findIndex((step) => step.key === state.currentKey));
    const complete = Boolean(state.flow && state.currentKey === null);
    const percentage = complete ? 100 : (steps.length ? Math.round((index / steps.length) * 100) : 0);
    assistantProgress.classList.toggle("ativo", Boolean(state.flow));
    progressText.textContent = complete ? "Resumo do projeto" : (state.flow ? `Etapa ${Math.min(index + 1, steps.length)} de ${steps.length}` : "Atendimento guiado");
    progressPercent.textContent = `${percentage}%`;
    progressFill.style.width = `${percentage}%`;
}

function currentStepIndex() {
    return getFlowSteps().findIndex((step) => step.key === state.currentKey);
}

function addQuestionControls() {
    const index = currentStepIndex();
    if (index > 0) createAction("Voltar à pergunta anterior", "voltar");
    if (Object.keys(state.answers).length) createAction("Corrigir uma resposta", "corrigir");
    createAction("Reiniciar conversa", "reiniciar");
}

function renderQuestion() {
    const steps = getFlowSteps();
    const step = steps.find((item) => item.key === state.currentKey);
    clearOptions();
    updateProgress();

    if (!step) {
        renderSummary();
        return;
    }

    addMessage(step.label);

    if (step.type === "choice") {
        step.options.forEach((option) => createAction(option, "responder", option));
    } else {
        const label = document.createElement("label");
        label.className = "assistente-campo-label";
        label.htmlFor = "respostaAssistente";
        label.textContent = step.hint || "Sua resposta";
        const input = document.createElement("input");
        input.id = "respostaAssistente";
        input.type = step.key === "endereco" ? "url" : "text";
        input.maxLength = step.key === "endereco" ? 180 : 160;
        input.autocomplete = step.key === "nome" ? "nickname" : "off";
        if (step.key === "endereco") input.inputMode = "url";
        input.placeholder = step.optional ? "Você pode pular esta pergunta" : "Digite sua resposta";
        assistantOptions.append(label, input);
        const send = createAction("Continuar", "enviar-texto");
        send.classList.add("assistente-continuar");
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                send.click();
            }
        });
        input.focus({ preventScroll: true });
    }

    if (step.optional) createAction("Pular esta pergunta", "pular");
    addQuestionControls();
    scrollAssistantBodyToBottom();
}

function moveToNextStep() {
    const steps = getFlowSteps();
    const index = steps.findIndex((step) => step.key === state.currentKey);
    state.currentKey = steps.slice(index + 1).find((step) => !Object.hasOwn(state.answers, step.key))?.key || null;
    if (state.currentKey) renderQuestion();
    else renderSummary();
}

function answerCurrent(value) {
    const step = getFlowSteps().find((item) => item.key === state.currentKey);
    if (!step) return;
    const normalized = value.trim();
    if (!normalized && !step.optional) return;

    cancelPendingReplies();
    const previousValue = state.answers[step.key];
    if (step.key === "siteExiste" && previousValue !== normalized) delete state.answers.endereco;
    state.answers[step.key] = normalized;
    if (step.key === "plano") state.planContext = normalized;
    if (normalized) addMessage(normalized, "visitante");
    moveToNextStep();
}

function showCorrectionChoices() {
    clearOptions();
    addMessage("Escolha uma resposta para editar. Se uma informação deixar de se aplicar, ela será removida do resumo.");
    getFlowSteps().filter((step) => Object.hasOwn(state.answers, step.key)).forEach((step) => {
        createAction(step.label, "editar", step.key);
    });
    createAction("Voltar à conversa", "retomar");
    createAction("Reiniciar conversa", "reiniciar");
    scrollAssistantBodyToBottom();
}

function goBack() {
    const steps = getFlowSteps();
    const index = currentStepIndex();
    if (index <= 0) return;
    state.currentKey = steps[index - 1].key;
    renderQuestion();
}

function formatSummary() {
    const selectedService = state.answers.servico;
    const service = state.flow === "automacao"
        ? "Automação"
        : (selectedService && selectedService !== "Ainda não sei"
            ? selectedService
            : `${state.flow === "criar" ? "Criação" : "Melhoria"} de site (serviço a definir)`);
    const lines = ["Olá, Murillo! Vim pelo site da MD Web Studio.", `Quero conversar sobre: ${service}.`];
    const labels = [
        ["plano", "Plano de partida"], ["nome", "Como prefere ser chamado"], ["negocio", "Tipo de negócio"],
        ["objetivo", "Objetivo"], ["siteExiste", "Já tem site"], ["endereco", "Endereço do site"],
        ["funcionalidades", "Funcionalidades"], ["materiais", "Materiais que já possui"], ["canal", "Canal da automação"],
        ["tarefa", "Tarefa para automatizar"], ["prazo", "Prazo desejado"], ["investimento", "Faixa de investimento"]
    ];
    labels.forEach(([key, label]) => {
        const value = state.answers[key];
        if (value) lines.push(`${label}: ${value}`);
    });
    return lines.join("\n");
}

function renderSummary() {
    state.currentKey = null;
    clearOptions();
    updateProgress();
    addMessage(`Resumo do que você compartilhou:\n\n${formatSummary()}\n\nRevise as respostas ou continue no WhatsApp. Você ainda precisa enviar a mensagem para concluir o contato.`);
    createAction("Corrigir uma resposta", "corrigir");

    const whatsappLink = document.createElement("a");
    whatsappLink.className = "assistente-whatsapp";
    whatsappLink.textContent = "Continuar no WhatsApp ↗";
    whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formatSummary())}`;
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";
    assistantOptions.append(whatsappLink);

    createAction("Copiar resumo", "copiar");
    const copyStatus = document.createElement("p");
    copyStatus.className = "assistente-copia-status";
    copyStatus.setAttribute("aria-live", "polite");
    assistantOptions.append(copyStatus);
    scrollAssistantBodyToBottom();
}

function startFlow(flow, plan = null) {
    cancelPendingReplies();
    state.flow = flow;
    state.answers = {};
    state.planContext = plan;
    if (plan) state.answers.plano = plan;
    assistantMessages.replaceChildren();
    if (plan) addMessage(`Plano ${plan} selecionado como ponto de partida. Você poderá alterar essa escolha ao revisar o resumo.`);
    addMessage(`Vamos organizar as informações para ${flowLabels[flow]}. Você pode pular campos opcionais ou falar diretamente com Murillo a qualquer momento.`);
    state.currentKey = getFlowSteps().find((step) => !Object.hasOwn(state.answers, step.key))?.key || null;
    renderQuestion();
}

function resetConversation() {
    cancelPendingReplies();
    state.flow = null;
    state.answers = {};
    state.currentKey = null;
    state.planContext = null;
    assistantMessages.replaceChildren();
    assistantBody.scrollTop = 0;
    addMessage("Olá! Sou o assistente guiado da MD Web Studio. Como posso te ajudar?");
    assistantProgress.classList.remove("ativo");
    clearOptions();
    renderWelcomeOptions();
}

function renderWelcomeOptions() {
    clearOptions();
    [
        ["Quero criar um site", "criar"],
        ["Quero melhorar um site", "melhorar"],
        ["Quero uma automação", "automacao"]
    ].forEach(([label, flow]) => {
        const button = createAction(label, "inicio");
        button.dataset.fluxo = flow;
    });
    createAction("Conhecer serviços e valores", "valores");

}

function showServicesAndPlans() {
    clearOptions();
    addMessage("A MD Web Studio apresenta criação e melhoria de sites, landing pages e automações. Os planos Essencial, Profissional e Custom descrevem pontos de partida e itens incluídos; o site não publica preços. O valor final depende do escopo e é conversado diretamente.");
    createAction("Quero criar um site", "inicio", "criar");
    createAction("Quero melhorar um site", "inicio", "melhorar");
    createAction("Quero uma automação", "inicio", "automacao");
    createAction("Voltar ao início", "inicio-menu");
    scrollAssistantBodyToBottom();
}

assistantOptions.addEventListener("click", async (event) => {
    const control = event.target.closest("button[data-acao]");
    if (!control) return;

    const action = control.dataset.acao;
    if (action === "inicio") {
        startFlow(control.dataset.fluxo || control.dataset.valor, state.planContext);
    } else if (action === "valores") {
        showServicesAndPlans();
    } else if (action === "inicio-menu") {
        resetConversation();
    } else if (action === "responder") {
        answerCurrent(control.dataset.valor || "");
    } else if (action === "enviar-texto") {
        const input = document.getElementById("respostaAssistente");
        answerCurrent(input?.value || "");
    } else if (action === "pular") {
        answerCurrent("");
    } else if (action === "voltar") {
        goBack();
    } else if (action === "corrigir") {
        showCorrectionChoices();
    } else if (action === "editar") {
        const key = control.dataset.valor;
        state.currentKey = key;
        renderQuestion();
    } else if (action === "retomar") {
        renderQuestion();
    } else if (action === "reiniciar") {
        if (Object.keys(state.answers).length && !window.confirm("Reiniciar a conversa e apagar as respostas desta página?")) return;
        resetConversation();
    } else if (action === "copiar") {
        const status = assistantOptions.querySelector(".assistente-copia-status");
        try {
            await navigator.clipboard.writeText(formatSummary());
            status.textContent = "Resumo copiado.";
        } catch {
            status.textContent = "Não foi possível copiar automaticamente. Selecione e copie o resumo exibido acima.";
        }
    }
});

function openAssistant(plan = null) {
    if (plan && state.flow && Object.keys(state.answers).length && !window.confirm("Começar outro atendimento e substituir as respostas atuais?")) return;
    state.returnFocus = document.activeElement;
    assistantWindow.hidden = false;
    assistantWindow.inert = false;
    assistantWindow.classList.add("aberta");
    assistantWindow.setAttribute("aria-hidden", "false");
    assistantButton.setAttribute("aria-expanded", "true");
    assistantButton.classList.add("ativo");
    assistantInvite?.classList.remove("mostrar");

    if (plan) {
        startFlow("criar", plan);
    }
    assistantWindow.getBoundingClientRect();
    window.setTimeout(() => {
        if (assistantWindow.classList.contains("aberta")) assistantClose.focus({ preventScroll: true });
    }, 0);
}

function closeAssistant() {
    assistantWindow.classList.remove("aberta");
    assistantWindow.hidden = true;
    assistantWindow.inert = true;
    assistantWindow.setAttribute("aria-hidden", "true");
    assistantButton.setAttribute("aria-expanded", "false");
    assistantButton.classList.remove("ativo");
    if (state.returnFocus instanceof HTMLElement) state.returnFocus.focus({ preventScroll: true });
}

assistantButton.addEventListener("click", () => {
    if (assistantWindow.classList.contains("aberta")) closeAssistant();
    else openAssistant();
});
assistantClose.addEventListener("click", closeAssistant);

assistantRestart.addEventListener("click", () => {
    if (Object.keys(state.answers).length && !window.confirm("Reiniciar a conversa e apagar as respostas desta página?")) return;
    resetConversation();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && assistantWindow.classList.contains("aberta")) {
        event.preventDefault();
        closeAssistant();
    }
}, true);

assistantWindow.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const focusable = [...assistantWindow.querySelectorAll("button:not([disabled]), a[href], input:not([disabled])")];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
});

document.querySelectorAll("[data-plano]").forEach((button) => {
    button.addEventListener("click", () => openAssistant(button.dataset.plano));
});

document.querySelectorAll("[data-abrir-assistente]").forEach((control) => {
    control.addEventListener("click", (event) => {
        event.preventDefault();
        openAssistant();
    });
});

if (portfolioModal && portfolioModalImage && portfolioModalCaption) {
    portfolioModal.addEventListener("click", (event) => {
        if (event.target === portfolioModal) portfolioModal.close();
    });

    portfolioModal.addEventListener("cancel", (event) => {
        event.preventDefault();
        portfolioModal.close();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && portfolioModal.open) {
            event.preventDefault();
            portfolioModal.close();
        }
    }, true);

    portfolioModal.addEventListener("close", () => {
        portfolioModalImage.removeAttribute("src");
    });
}

const heroLayerButton = document.getElementById("explorarCamadas");
const heroScene = document.getElementById("heroCamadas");
if (heroLayerButton && heroScene) {
    heroLayerButton.hidden = false;
    heroLayerButton.addEventListener("click", () => {
        const expanded = heroLayerButton.getAttribute("aria-expanded") !== "true";
        heroLayerButton.setAttribute("aria-expanded", String(expanded));
        heroLayerButton.textContent = expanded ? "Reunir camadas" : "Explorar camadas";
        heroScene.classList.toggle("camadas-abertas", expanded);
    });
}

const heroPreview = document.querySelector("#heroCamadas .hero-janela img");
const heroPreviewFallback = document.querySelector("#heroCamadas .hero-janela-fallback");
if (heroPreview && heroPreviewFallback) {
    const showHeroPreviewFallback = () => {
        heroPreview.hidden = true;
        heroPreviewFallback.hidden = false;
    };
    heroPreview.addEventListener("error", showHeroPreviewFallback, { once: true });
    if (heroPreview.complete && !heroPreview.naturalWidth) showHeroPreviewFallback();
}

const heroTilt = document.querySelector("[data-hero-tilt]");
const heroCanTilt = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
if (heroTilt && heroCanTilt.matches) {
    const heroFrame = heroTilt.querySelector(".hero-vitrine");
    let heroTiltFrame = null;
    let latestHeroPointer = null;

    heroTilt.addEventListener("pointermove", (event) => {
        latestHeroPointer = { clientX: event.clientX, clientY: event.clientY };
        if (heroTiltFrame !== null) return;

        heroTiltFrame = requestAnimationFrame(() => {
            heroTiltFrame = null;
            if (!latestHeroPointer) return;

            const bounds = heroTilt.getBoundingClientRect();
            const horizontal = (latestHeroPointer.clientX - bounds.left) / bounds.width - 0.5;
            const vertical = (latestHeroPointer.clientY - bounds.top) / bounds.height - 0.5;
            heroFrame.style.setProperty("--hero-rotate-y", `${horizontal * 6}deg`);
            heroFrame.style.setProperty("--hero-rotate-x", `${vertical * -4}deg`);
        });
    });

    heroTilt.addEventListener("pointerleave", () => {
        latestHeroPointer = null;
        if (heroTiltFrame !== null) cancelAnimationFrame(heroTiltFrame);
        heroTiltFrame = null;
        heroFrame.style.removeProperty("--hero-rotate-y");
        heroFrame.style.removeProperty("--hero-rotate-x");
    });
}

function initializeScrollReveals() {
    if (typeof window.IntersectionObserver !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isCompactViewport = window.matchMedia("(max-width: 760px)").matches;
    const cardDelayStep = isCompactViewport ? 60 : 80;
    const cardDelayLimit = isCompactViewport ? 120 : 240;
    const revealGroups = [
        {
            selector: "#servicos .servicos-cabecalho h2, #planos .planos-editorial-topo h2, #portfolio .portfolio-editorial-topo h2, #sobre .sobre-editorial-topo h2, #contato .contato-editorial-centro",
            type: "heading"
        },
        {
            selector: "#servicos .servicos-resumo, #planos .planos-intro, #portfolio .portfolio-intro, #sobre .sobre-intro, #sobre .sobre-manifesto, #contato .contato-texto, #contato .contato-editorial-final",
            type: "copy"
        },
        { selector: "#servicos .servico-opcao", type: "card", stagger: true },
        { selector: "#servicos .servico-demonstracao", type: "surface" },
        { selector: "#planos .plano-faixa", type: "card", stagger: true },
        { selector: "#portfolio .case-editorial", type: "project" },
        { selector: "#portfolio .case-editorial-detalhes", type: "copy" },
        { selector: "#contato .contato-link", type: "callout" }
    ];
    const targets = [];
    let revealObserver;

    try {
        revealGroups.forEach(({ selector, type, stagger }) => {
            document.querySelectorAll(selector).forEach((element, index) => {
                element.dataset.scrollReveal = type;

                if (stagger) {
                    const delay = Math.min(index * cardDelayStep, cardDelayLimit);
                    element.style.setProperty("--scroll-reveal-delay", `${delay}ms`);
                } else if (type === "copy") {
                    element.style.setProperty("--scroll-reveal-delay", "80ms");
                } else if (type === "callout") {
                    element.style.setProperty("--scroll-reveal-delay", "120ms");
                }

                targets.push(element);
            });
        });

        if (!targets.length) return;

        revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("md-scroll-visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

        targets.forEach((element) => revealObserver.observe(element));

        document.addEventListener("focusin", (event) => {
            let focusedElement = event.target;
            while (focusedElement instanceof Element) {
                if (focusedElement.matches("[data-scroll-reveal]")) {
                    focusedElement.classList.add("md-scroll-visible");
                    revealObserver.unobserve(focusedElement);
                }
                focusedElement = focusedElement.parentElement;
            }
        });

        document.documentElement.classList.add("md-scroll-ready");
    } catch {
        revealObserver?.disconnect();
        targets.forEach((element) => {
            element.removeAttribute("data-scroll-reveal");
            element.style.removeProperty("--scroll-reveal-delay");
        });
        document.documentElement.classList.remove("md-scroll-ready");
    }
}

initializeScrollReveals();

if (typeof window.IntersectionObserver === "function") {
    try {
        const menuObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                document.querySelectorAll(".menu a").forEach((link) => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
                });
            });
        }, { rootMargin: "-40% 0px -50% 0px" });
        document.querySelectorAll("section[id]").forEach((section) => menuObserver.observe(section));
    } catch {}
}

const homeEditorial = document.getElementById("inicio");
if (homeEditorial && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("md-motion");
    requestAnimationFrame(() => requestAnimationFrame(() => homeEditorial.classList.add("md-home-visivel")));
}

renderWelcomeOptions();
