// ==============================
// MD WEB STUDIO
// JavaScript
// ==============================

console.log("MD Web Studio carregado com sucesso!");


// ==============================
// ANIMAÇÕES AO ROLAR A PÁGINA
// ==============================

const elementos = document.querySelectorAll(
    ".servico, .plano, .projeto, .destaque"
);

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {
            entrada.target.classList.add("aparecer");
        }

    });

}, {
    threshold: 0.15
});


elementos.forEach((elemento) => {
    observador.observe(elemento);
});


// ==============================
// MENU ATIVO DURANTE A ROLAGEM
// ==============================

const secoes = document.querySelectorAll(
    "section[id]"
);

const linksMenu = document.querySelectorAll(
    ".menu a"
);


const observadorMenu = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {

            linksMenu.forEach((link) => {
                link.classList.remove("ativo");
            });


            const linkAtivo = document.querySelector(
                `.menu a[href="#${entrada.target.id}"]`
            );


            if (linkAtivo) {
                linkAtivo.classList.add("ativo");
            }

        }

    });

}, {
    rootMargin: "-40% 0px -50% 0px"
});


secoes.forEach((secao) => {
    observadorMenu.observe(secao);
});


// ==============================
// ABRIR E FECHAR ASSISTENTE
// ==============================

const botaoAssistente =
    document.getElementById("abrirAssistente");

const janelaAssistente =
    document.getElementById("janelaAssistente");

const fecharAssistente =
    document.getElementById("fecharAssistente");


botaoAssistente.addEventListener("click", () => {

    janelaAssistente.classList.toggle("aberta");

    botaoAssistente.classList.toggle(
        "ativo",
        janelaAssistente.classList.contains("aberta")
    );

    conviteAssistente.classList.remove("mostrar");

});


fecharAssistente.addEventListener("click", () => {

    janelaAssistente.classList.remove("aberta");

    botaoAssistente.classList.remove("ativo");

});


// ==============================
// ELEMENTOS DO ASSISTENTE
// ==============================

const caixaOpcoes =
    document.getElementById("opcoesAssistente");

const mensagemRobo =
    document.querySelector(".mensagem-robo");

const mensagensAssistente =
    document.getElementById("mensagensAssistente");

    const conviteAssistente =
    document.getElementById("conviteAssistente");

    // ==============================
// CONVITE AUTOMÁTICO DO ASSISTENTE
// ==============================

setTimeout(() => {

    if (
        conviteAssistente &&
        !janelaAssistente.classList.contains("aberta")
    ) {

        conviteAssistente.classList.add("mostrar");

        setTimeout(() => {

            conviteAssistente.classList.remove("mostrar");

        }, 5000);

    }

}, 3000);

// ==============================
// DADOS DO CLIENTE
// ==============================

let tipoNegocio = "";

let tipoSite = "";

let objetivoSite = "";


// ==============================
// SEGURANÇA DO TEXTO DIGITADO
// ==============================

function escaparHTML(texto) {

    const elemento =
        document.createElement("div");

    elemento.textContent = texto;

    return elemento.innerHTML;

}


// ==============================
// MENSAGEM DO CLIENTE
// ==============================

function adicionarMensagemCliente(texto) {

    const mensagem =
        document.createElement("div");

    mensagem.classList.add(
        "mensagem-cliente"
    );

    mensagem.textContent = texto;

    mensagensAssistente.appendChild(
        mensagem
    );

    mensagensAssistente.scrollTop =
        mensagensAssistente.scrollHeight;

}


// ==============================
// MENSAGEM DO ROBÔ
// ==============================

function adicionarMensagemRobo(texto) {

    const mensagem =
        document.createElement("div");

    mensagem.classList.add(
        "mensagem-robo"
    );

    mensagem.innerHTML = texto;

    mensagensAssistente.appendChild(
        mensagem
    );

    mensagensAssistente.scrollTop =
        mensagensAssistente.scrollHeight;

}


// ==============================
// ASSISTENTE DIGITANDO
// ==============================

function mostrarDigitando() {

    const digitando =
        document.createElement("div");

    digitando.classList.add(
        "mensagem-robo",
        "digitando"
    );

    digitando.textContent =
        "Assistente MD está digitando...";

    mensagensAssistente.appendChild(
        digitando
    );

    mensagensAssistente.scrollTop =
        mensagensAssistente.scrollHeight;

    return digitando;

}


// ==============================
// RESPOSTA COM ATRASO
// ==============================

function responderComAtraso(texto, depois) {

    const digitando =
        mostrarDigitando();

    setTimeout(() => {

        digitando.remove();

        adicionarMensagemRobo(texto);

        if (depois) {
            depois();
        }

    }, 700);

}


// ==============================
// PERGUNTA SOBRE TIPO DE SITE
// ==============================

function mostrarPerguntaTipoSite() {

    const negocioSeguro =
        escaparHTML(tipoNegocio);


    adicionarMensagemRobo(`
        ✅ Perfeito!

        <br><br>

        Seu negócio é:
        <strong>${negocioSeguro}</strong>.

        <br><br>

        Agora me conta:
        que tipo de site você procura?
    `);


    caixaOpcoes.innerHTML = `

        <button
            data-acao="tipo-site"
            data-valor="Site simples">

            🚀 Site simples

        </button>


        <button
            data-acao="tipo-site"
            data-valor="Site profissional">

            💻 Site profissional

        </button>


        <button
            data-acao="tipo-site"
            data-valor="Site personalizado">

            💎 Site personalizado

        </button>


        <button
            data-acao="tipo-site"
            data-valor="Ainda não sei">

            🤔 Ainda não sei

        </button>

    `;

}


// ==============================
// REINICIAR ASSISTENTE
// ==============================

function reiniciarAssistente() {

    // Apaga os dados antigos

    tipoNegocio = "";
    tipoSite = "";
    objetivoSite = "";


    // Apaga o histórico

    mensagensAssistente.innerHTML = "";


    // Coloca novamente a mensagem inicial

    mensagensAssistente.appendChild(
        mensagemRobo
    );


    mensagemRobo.innerHTML = `
        👋 Olá! Sou o assistente da MD Web Studio.

        <br><br>

        Como posso te ajudar?
    `;


    // Volta com as opções iniciais

    caixaOpcoes.innerHTML = `

        <button data-acao="criar">
            🚀 Quero criar um site
        </button>


        <button data-acao="planos">
            ⭐ Conhecer os planos
        </button>


        <button data-acao="servicos">
            🌐 Ver os serviços
        </button>


        <button data-acao="contato">
            💬 Falar com o MD
        </button>

    `;

}


// ==============================
// CLIQUES NO ASSISTENTE
// ==============================

caixaOpcoes.addEventListener("click", (evento) => {

    const botao =
        evento.target.closest("button");


    // Se não clicou em botão, para aqui

    if (!botao) {
        return;
    }


    const acao =
        botao.dataset.acao;


    // ==========================
    // QUERO CRIAR UM SITE
    // ==========================

    if (acao === "criar") {

        adicionarMensagemCliente(
            "Quero criar um site"
        );


        // Esconde as opções enquanto responde

        caixaOpcoes.innerHTML = "";


        responderComAtraso(`
            🚀 Perfeito!

            <br><br>

            Vamos entender um pouco
            sobre o seu projeto.

            <br><br>

            Qual é o seu tipo de negócio?
        `, () => {


            caixaOpcoes.innerHTML = `

                <button
                    data-acao="tipo-negocio"
                    data-valor="Barbearia">

                    💈 Barbearia

                </button>


                <button
                    data-acao="tipo-negocio"
                    data-valor="Restaurante">

                    🍽️ Restaurante

                </button>


                <button
                    data-acao="tipo-negocio"
                    data-valor="Loja">

                    🛍️ Loja

                </button>


                <button
                    data-acao="tipo-negocio"
                    data-valor="Empresa">

                    🏢 Empresa

                </button>


                <button
                    data-acao="tipo-negocio"
                    data-valor="Outro">

                    ✨ Outro

                </button>

            `;

        });


        return;
    }


    // ==========================
    // TIPO DE NEGÓCIO
    // ==========================

    if (acao === "tipo-negocio") {

        const negocioEscolhido =
            botao.dataset.valor;


        adicionarMensagemCliente(
            negocioEscolhido
        );


        // CASO ESCOLHA "OUTRO"

        if (negocioEscolhido === "Outro") {

            adicionarMensagemRobo(`
                ✨ Sem problema!

                <br><br>

                Qual é o seu tipo de negócio?
            `);


            caixaOpcoes.innerHTML = `

                <input
                    type="text"
                    id="negocioPersonalizado"
                    placeholder="Ex: Academia, Clínica, Oficina..."
                    maxlength="60"
                >


                <button
                    data-acao="salvar-negocio-outro">

                    CONTINUAR

                </button>

            `;


            const campoNegocio =
                document.getElementById(
                    "negocioPersonalizado"
                );


            campoNegocio.focus();


            return;
        }


        // OPÇÃO PRONTA

      tipoNegocio =
    negocioEscolhido;

caixaOpcoes.innerHTML = "";

const digitando =
    mostrarDigitando();

setTimeout(() => {

    digitando.remove();

    mostrarPerguntaTipoSite();

}, 700);

return;
    }


    // ==========================
    // NEGÓCIO PERSONALIZADO
    // ==========================

    if (acao === "salvar-negocio-outro") {

        const campoNegocio =
            document.getElementById(
                "negocioPersonalizado"
            );


        const textoDigitado =
            campoNegocio.value.trim();


        // VERIFICA CAMPO VAZIO

        if (textoDigitado === "") {

            adicionarMensagemRobo(`
                ⚠️ Digite o tipo do seu negócio
                para continuar.
            `);

            campoNegocio.focus();

            return;
        }


        tipoNegocio =
            textoDigitado;


        adicionarMensagemCliente(
            tipoNegocio
        );


        mostrarPerguntaTipoSite();


        console.log(
            "Negócio escolhido:",
            tipoNegocio
        );


        return;
    }


    // ==========================
    // TIPO DE SITE
    // ==========================

    if (acao === "tipo-site") {

        tipoSite =
            botao.dataset.valor;


        adicionarMensagemCliente(
            tipoSite
        );


        adicionarMensagemRobo(`
            🔥 Ótimo!

            <br><br>

            Agora quero entender uma coisa:

            <br><br>

            Qual é o principal objetivo
            do seu site?
        `);


        caixaOpcoes.innerHTML = `

            <button
                data-acao="objetivo-site"
                data-valor="Conseguir novos clientes">

                🎯 Conseguir novos clientes

            </button>


            <button
                data-acao="objetivo-site"
                data-valor="Apresentar minha empresa">

                🏢 Apresentar minha empresa

            </button>


            <button
                data-acao="objetivo-site"
                data-valor="Vender produtos ou serviços">

                💰 Vender produtos ou serviços

            </button>


            <button
                data-acao="objetivo-site"
                data-valor="Ainda não sei">

                🤔 Ainda não sei

            </button>

        `;


        return;
    }


    // ==========================
    // OBJETIVO DO SITE
    // ==========================

    if (acao === "objetivo-site") {

        objetivoSite =
            botao.dataset.valor;


        adicionarMensagemCliente(
            objetivoSite
        );


        const negocioSeguro =
            escaparHTML(tipoNegocio);

        const tipoSeguro =
            escaparHTML(tipoSite);

        const objetivoSeguro =
            escaparHTML(objetivoSite);


        adicionarMensagemRobo(`
            ✅ Perfeito!

            <br><br>

            Já tenho uma ideia inicial
            do seu projeto.

            <br><br>

            <strong>Negócio:</strong>
            ${negocioSeguro}

            <br>

            <strong>Tipo de site:</strong>
            ${tipoSeguro}

            <br>

            <strong>Objetivo:</strong>
            ${objetivoSeguro}
        `);


        caixaOpcoes.innerHTML = `

            <button data-acao="finalizar">

                💬 Falar com o MD no WhatsApp

            </button>


            <button data-acao="reiniciar">

                ↻ Começar novamente

            </button>

        `;


        return;
    }


    // ==========================
    // WHATSAPP
    // ==========================

    if (acao === "finalizar") {

        const numeroWhatsApp =
            "5521990487662";


        const mensagem = `
Olá! Vim pelo site da MD Web Studio.

Meu negócio é: ${tipoNegocio}
Estou procurando: ${tipoSite}
Objetivo principal: ${objetivoSite}

Gostaria de conversar sobre o projeto.
        `;


        const mensagemCodificada =
            encodeURIComponent(mensagem);


        const linkWhatsApp =
            `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;


        window.open(
            linkWhatsApp,
            "_blank"
        );


        return;
    }


    // ==========================
    // REINICIAR
    // ==========================

    if (acao === "reiniciar") {

        reiniciarAssistente();

        return;
    }


    // ==========================
    // PLANOS
    // ==========================

    if (acao === "planos") {

        adicionarMensagemCliente(
            "Conhecer os planos"
        );


        adicionarMensagemRobo(`
            ⭐ Temos opções para diferentes
            tipos de projetos.

            <br><br>

            Vou te mostrar nossos planos.
        `);


        document
            .getElementById("planos")
            .scrollIntoView({
                behavior: "smooth"
            });


        return;
    }


    // ==========================
    // SERVIÇOS
    // ==========================

    if (acao === "servicos") {

        adicionarMensagemCliente(
            "Ver os serviços"
        );


        adicionarMensagemRobo(`
            🌐 Claro!

            <br><br>

            Vou te mostrar o que a
            MD Web Studio pode fazer
            pelo seu negócio.
        `);


        document
            .getElementById("servicos")
            .scrollIntoView({
                behavior: "smooth"
            });


        return;
    }


    // ==========================
    // CONTATO
    // ==========================

    if (acao === "contato") {

        adicionarMensagemCliente(
            "Falar com o MD"
        );


        adicionarMensagemRobo(`
            💬 Perfeito!

            <br><br>

            Vou te levar até nossa
            área de contato.
        `);


        document
            .getElementById("contato")
            .scrollIntoView({
                behavior: "smooth"
            });


        return;
    }

});


// ==============================
// ENTER NO CAMPO "OUTRO"
// ==============================

caixaOpcoes.addEventListener("keydown", (evento) => {

    if (
        evento.key === "Enter" &&
        evento.target.id === "negocioPersonalizado"
    ) {

        evento.preventDefault();


        const botaoContinuar =
            caixaOpcoes.querySelector(
                '[data-acao="salvar-negocio-outro"]'
            );


        if (botaoContinuar) {
            botaoContinuar.click();
        }

    }

});