/* ==========================================================
   BARBERPRO
   APP.JS
   VERSÃO ESTÁVEL + FINANCEIRO
========================================================== */


/* ==========================================================
   CONFIGURAÇÕES
========================================================== */

const CHAVES = {
    agendamentos: "barberpro_agendamentos",
    clientes: "barberpro_clientes",
    servicos: "barberpro_servicos"
};


/* ==========================================================
   CONTROLE DO SISTEMA
========================================================== */

let telaAtual = "inicio";
let clienteFichaAtual = null;
let agendamentoAtual = null;

let dataAgendaSelecionada = dataHojeISO();

let mesAgendaAtual = new Date();
mesAgendaAtual.setDate(1);


/* ==========================================================
   LOCAL STORAGE
========================================================== */

function obterDados(chave) {

    try {

        const dados =
            localStorage.getItem(chave);

        if (!dados) {
            return [];
        }

        const resultado =
            JSON.parse(dados);

        if (!Array.isArray(resultado)) {
            return [];
        }

        return resultado;

    } catch (erro) {

        console.error(
            "Erro ao carregar dados:",
            chave,
            erro
        );

        return [];
    }
}


function salvarDados(chave, dados) {

    try {

        localStorage.setItem(
            chave,
            JSON.stringify(dados)
        );

        return true;

    } catch (erro) {

        console.error(
            "Erro ao salvar dados:",
            chave,
            erro
        );

        mostrarMensagem(
            "Não foi possível salvar os dados."
        );

        return false;
    }
}


/* ==========================================================
   TESTE DO ARMAZENAMENTO
========================================================== */

function testarArmazenamento() {

    try {

        const chaveTeste =
            "__barberpro_teste__";

        localStorage.setItem(
            chaveTeste,
            "ok"
        );

        const resultado =
            localStorage.getItem(
                chaveTeste
            );

        localStorage.removeItem(
            chaveTeste
        );

        return resultado === "ok";

    } catch (erro) {

        console.error(
            "LocalStorage indisponível:",
            erro
        );

        return false;
    }
}


/* ==========================================================
   FUNÇÕES AUXILIARES
========================================================== */

function gerarId() {

    return (
        Date.now().toString() +
        Math.random()
            .toString(36)
            .substring(2, 9)
    );
}


function dataHojeISO() {

    const hoje = new Date();

    const ano =
        hoje.getFullYear();

    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            hoje.getDate()
        ).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}


function formatarData(data) {

    if (!data) {
        return "—";
    }

    const partes =
        String(data).split("-");

    if (partes.length !== 3) {
        return data;
    }

    return (
        `${partes[2]}/` +
        `${partes[1]}/` +
        `${partes[0]}`
    );
}


function formatarDataLonga(data) {

    if (!data) {
        return "—";
    }

    const partes =
        String(data).split("-");

    if (partes.length !== 3) {
        return data;
    }

    const objeto =
        new Date(
            Number(partes[0]),
            Number(partes[1]) - 1,
            Number(partes[2])
        );

    return objeto.toLocaleDateString(
        "pt-BR",
        {
            weekday: "long",
            day: "numeric",
            month: "long"
        }
    );
}


function formatarMoeda(valor) {

    return Number(valor || 0)
        .toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );
}


function gerarIniciais(nome) {

    if (!nome) {
        return "--";
    }

    const partes =
        String(nome)
            .trim()
            .split(/\s+/)
            .filter(Boolean);

    if (partes.length === 1) {

        return partes[0]
            .substring(0, 2)
            .toUpperCase();
    }

    return (
        partes[0][0] +
        partes[partes.length - 1][0]
    ).toUpperCase();
}


function escaparHTML(valor) {

    if (
        valor === null ||
        valor === undefined
    ) {
        return "";
    }

    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function mostrarMensagem(texto) {

    const toast =
        document.getElementById("toast");

    if (!toast) {
        alert(texto);
        return;
    }

    toast.textContent = texto;

    toast.classList.add("mostrar");

    clearTimeout(
        window.barberProToast
    );

    window.barberProToast =
        setTimeout(() => {

            toast.classList.remove(
                "mostrar"
            );

        }, 2500);
}


/* ==========================================================
   TELAS
========================================================== */

const telas = {

    inicio:
        document.getElementById(
            "telaInicio"
        ),

    agenda:
        document.getElementById(
            "telaAgenda"
        ),

    novo:
        document.getElementById(
            "telaNovoAgendamento"
        ),

    detalhes:
        document.getElementById(
            "telaDetalhesAgendamento"
        ),

    clientes:
        document.getElementById(
            "telaClientes"
        ),

    novoCliente:
        document.getElementById(
            "telaNovoCliente"
        ),

    fichaCliente:
        document.getElementById(
            "telaFichaCliente"
        ),

    servicos:
        document.getElementById(
            "telaServicos"
        ),

    novoServico:
        document.getElementById(
            "telaNovoServico"
        ),

    financeiro:
        document.getElementById(
            "telaFinanceiro"
        )
};


function mostrarTela(nome) {

    Object.keys(telas).forEach(
        chave => {

            if (telas[chave]) {

                telas[chave]
                    .classList
                    .remove("ativa");
            }
        }
    );

    if (telas[nome]) {

        telas[nome]
            .classList
            .add("ativa");

        telaAtual = nome;
    }

    atualizarNavegacao(nome);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function atualizarNavegacao(nome) {

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove(
                "ativo"
            );

            const destino =
                item.dataset.tela;

            if (
                destino === nome ||

                (
                    destino === "agenda" &&
                    (
                        nome === "novo" ||
                        nome === "detalhes"
                    )
                ) ||

                (
                    destino === "clientes" &&
                    (
                        nome === "novoCliente" ||
                        nome === "fichaCliente"
                    )
                ) ||

                (
                    destino === "servicos" &&
                    nome === "novoServico"
                )
            ) {

                item.classList.add(
                    "ativo"
                );
            }
        });
}


/* ==========================================================
   SERVIÇOS PADRÃO
========================================================== */

function criarServicosPadrao() {

    const servicos =
        obterDados(
            CHAVES.servicos
        );

    if (servicos.length > 0) {
        return;
    }

    const padrao = [

        {
            id: gerarId(),
            nome: "Corte masculino",
            preco: 30,
            duracao: 30,
            ativo: true
        },

        {
            id: gerarId(),
            nome: "Barba",
            preco: 20,
            duracao: 20,
            ativo: true
        },

        {
            id: gerarId(),
            nome: "Corte + Barba",
            preco: 45,
            duracao: 50,
            ativo: true
        }

    ];

    salvarDados(
        CHAVES.servicos,
        padrao
    );
}


/* ==========================================================
   SERVIÇOS
========================================================== */

function renderizarServicos() {

    const lista =
        document.getElementById(
            "listaServicos"
        );

    const vazio =
        document.getElementById(
            "estadoVazioServicos"
        );

    if (!lista) {
        return;
    }

    const servicos =
        obterDados(
            CHAVES.servicos
        );

    const ativos =
        servicos.filter(
            item =>
                item.ativo !== false
        );

    const total =
        document.getElementById(
            "totalServicos"
        );

    const totalAtivos =
        document.getElementById(
            "servicosAtivos"
        );

    if (total) {
        total.textContent =
            servicos.length;
    }

    if (totalAtivos) {
        totalAtivos.textContent =
            ativos.length;
    }

    if (servicos.length === 0) {

        lista.innerHTML = "";

        if (vazio) {
            vazio.style.display =
                "block";
        }

        return;
    }

    if (vazio) {
        vazio.style.display =
            "none";
    }

    lista.innerHTML =
        servicos.map(
            servico => {

                const ativo =
                    servico.ativo !== false;

                return `

                <div class="
                    servico-card
                    ${ativo ? "" : "desativado"}
                ">

                    <div class="servico-info">

                        <div class="servico-icone">
                            ✂
                        </div>

                        <div>

                            <h3>
                                ${escaparHTML(
                                    servico.nome
                                )}
                            </h3>

                            <p>
                                ${formatarDuracao(
                                    servico.duracao
                                )}
                            </p>

                        </div>

                    </div>

                    <div class="servico-direita">

                        <strong>
                            ${formatarMoeda(
                                servico.preco
                            )}
                        </strong>

                        <div class="servico-acoes">

                            <button
                                class="botao-mini"
                                data-editar-servico="${servico.id}"
                                type="button"
                            >
                                ✎
                            </button>

                            <button
                                class="botao-mini"
                                data-excluir-servico="${servico.id}"
                                type="button"
                            >
                                🗑
                            </button>

                        </div>

                    </div>

                </div>

                `;
            }
        ).join("");

    document
        .querySelectorAll(
            "[data-editar-servico]"
        )
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () =>
                    editarServico(
                        botao.dataset
                            .editarServico
                    )
            );
        });

    document
        .querySelectorAll(
            "[data-excluir-servico]"
        )
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () =>
                    excluirServico(
                        botao.dataset
                            .excluirServico
                    )
            );
        });
}


function formatarDuracao(minutos) {

    minutos =
        Number(minutos || 0);

    if (minutos < 60) {

        return `${minutos} min`;
    }

    const horas =
        Math.floor(
            minutos / 60
        );

    const resto =
        minutos % 60;

    if (resto === 0) {

        return `${horas}h`;
    }

    return `${horas}h ${resto}min`;
}


/* ==========================================================
   NOVO SERVIÇO
========================================================== */

function abrirNovoServico() {

    const form =
        document.getElementById(
            "formServico"
        );

    if (form) {

        form.reset();

        delete form.dataset.editando;
    }

    const ativo =
        document.getElementById(
            "novoServicoAtivo"
        );

    if (ativo) {
        ativo.checked = true;
    }

    const titulo =
        document.querySelector(
            "#telaNovoServico h1"
        );

    if (titulo) {
        titulo.textContent =
            "Novo Serviço";
    }

    mostrarTela(
        "novoServico"
    );
}


/* ==========================================================
   EDITAR SERVIÇO
========================================================== */

function editarServico(id) {

    const servicos =
        obterDados(
            CHAVES.servicos
        );

    const servico =
        servicos.find(
            item =>
                String(item.id) ===
                String(id)
        );

    if (!servico) {
        return;
    }

    document.getElementById(
        "novoServicoNome"
    ).value =
        servico.nome || "";

    document.getElementById(
        "novoServicoPreco"
    ).value =
        servico.preco || "";

    document.getElementById(
        "novoServicoDuracao"
    ).value =
        servico.duracao || "";

    document.getElementById(
        "novoServicoAtivo"
    ).checked =
        servico.ativo !== false;

    const form =
        document.getElementById(
            "formServico"
        );

    if (form) {
        form.dataset.editando =
            servico.id;
    }

    const titulo =
        document.querySelector(
            "#telaNovoServico h1"
        );

    if (titulo) {
        titulo.textContent =
            "Editar Serviço";
    }

    mostrarTela(
        "novoServico"
    );
}


/* ==========================================================
   EXCLUIR SERVIÇO
========================================================== */

function excluirServico(id) {

    const servicos =
        obterDados(
            CHAVES.servicos
        );

    const servico =
        servicos.find(
            item =>
                String(item.id) ===
                String(id)
        );

    if (!servico) {
        return;
    }

    if (
        !confirm(
            `Excluir "${servico.nome}"?`
        )
    ) {
        return;
    }

    const novos =
        servicos.filter(
            item =>
                String(item.id) !==
                String(id)
        );

    if (
        !salvarDados(
            CHAVES.servicos,
            novos
        )
    ) {
        return;
    }

    renderizarServicos();

    atualizarSelectServicos();

    mostrarMensagem(
        "Serviço excluído."
    );
}


/* ==========================================================
   SELECT SERVIÇOS
========================================================== */

function atualizarSelectServicos() {

    const select =
        document.getElementById(
            "servico"
        );

    if (!select) {
        return;
    }

    const servicos =
        obterDados(
            CHAVES.servicos
        ).filter(
            item =>
                item.ativo !== false
        );

    select.innerHTML = `

        <option value="">
            Selecione um serviço
        </option>

        ${
            servicos.map(
                servico => `

                <option
                    value="${escaparHTML(
                        servico.nome
                    )}"
                    data-preco="${Number(
                        servico.preco || 0
                    )}"
                    data-duracao="${Number(
                        servico.duracao || 0
                    )}"
                >

                    ${escaparHTML(
                        servico.nome
                    )}

                </option>

                `
            ).join("")
        }

    `;
}

/* ==========================================================
   CLIENTES
========================================================== */

function renderizarClientes(filtro = "") {

    const lista =
        document.getElementById("listaClientes");

    const vazio =
        document.getElementById("estadoVazioClientes");

    if (!lista) {
        return;
    }

    const clientes =
        obterDados(CHAVES.clientes);

    const busca =
        String(filtro)
            .trim()
            .toLowerCase();

    const filtrados =
        clientes.filter(cliente => {

            const nome =
                String(cliente.nome || "")
                    .toLowerCase();

            const telefone =
                String(cliente.telefone || "")
                    .toLowerCase();

            return (
                nome.includes(busca) ||
                telefone.includes(busca)
            );
        });

    const total =
        document.getElementById("totalClientes");

    const ativos =
        document.getElementById("clientesAtivos");

    if (total) {
        total.textContent =
            clientes.length;
    }

    if (ativos) {
        ativos.textContent =
            clientes.length;
    }

    if (filtrados.length === 0) {

        lista.innerHTML = "";

        if (vazio) {
            vazio.style.display = "block";
        }

        return;
    }

    if (vazio) {
        vazio.style.display = "none";
    }

    lista.innerHTML =
        filtrados.map(cliente => `

            <button
                class="cliente-card"
                data-cliente="${cliente.id}"
                type="button"
            >

                <div class="cliente-avatar">
                    ${gerarIniciais(cliente.nome)}
                </div>

                <div class="cliente-info">

                    <strong>
                        ${escaparHTML(cliente.nome)}
                    </strong>

                    <span>
                        ${escaparHTML(
                            cliente.telefone ||
                            "Sem telefone"
                        )}
                    </span>

                </div>

                <div class="cliente-total">
                    ${contarAtendimentosCliente(cliente.id)}
                </div>

                <span class="cliente-seta">
                    ›
                </span>

            </button>

        `).join("");

    document
        .querySelectorAll("[data-cliente]")
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () =>
                    abrirFichaCliente(
                        botao.dataset.cliente
                    )
            );
        });
}


function contarAtendimentosCliente(id) {

    return obterDados(
        CHAVES.agendamentos
    ).filter(
        item =>
            String(item.clienteId) ===
            String(id)
    ).length;
}


/* ==========================================================
   SUGESTÕES DE CLIENTES
========================================================== */

function atualizarSugestoesClientes() {

    const input =
        document.getElementById(
            "clienteNome"
        );

    const lista =
        document.getElementById(
            "clientesSugestoes"
        );

    if (!input || !lista) {
        return;
    }

    const clientes =
        obterDados(
            CHAVES.clientes
        );

    lista.innerHTML =
        clientes
            .sort(
                (a, b) =>
                    String(a.nome || "")
                        .localeCompare(
                            String(b.nome || ""),
                            "pt-BR"
                        )
            )
            .map(
                cliente => {

                    const telefone =
                        cliente.telefone || "";

                    return `
                        <option
                            value="${escaparHTML(
                                cliente.nome
                            )}"
                            label="${escaparHTML(
                                telefone
                            )}"
                        ></option>
                    `;
                }
            )
            .join("");
}


/* ==========================================================
   NOVO CLIENTE
========================================================== */

function abrirNovoCliente() {

    const form =
        document.getElementById(
            "formCliente"
        );

    if (form) {

        form.reset();

        delete form.dataset.editando;
    }

    const titulo =
        document.querySelector(
            "#telaNovoCliente h1"
        );

    if (titulo) {

        titulo.textContent =
            "Novo Cliente";
    }

    mostrarTela(
        "novoCliente"
    );
}


/* ==========================================================
   SALVAR CLIENTE
========================================================== */

function salvarCliente(event) {

    event.preventDefault();

    const form =
        event.currentTarget;

    const nome =
        document.getElementById(
            "novoClienteNome"
        );

    const telefone =
        document.getElementById(
            "novoClienteTelefone"
        );

    const email =
        document.getElementById(
            "novoClienteEmail"
        );

    const observacao =
        document.getElementById(
            "novoClienteObservacao"
        );

    if (
        !nome ||
        !nome.value.trim()
    ) {

        mostrarMensagem(
            "Digite o nome do cliente."
        );

        return;
    }

    const clientes =
        obterDados(
            CHAVES.clientes
        );

    const editando =
        form.dataset.editando;

    if (editando) {

        const index =
            clientes.findIndex(
                cliente =>
                    String(cliente.id) ===
                    String(editando)
            );

        if (index === -1) {

            mostrarMensagem(
                "Cliente não encontrado."
            );

            return;
        }

        clientes[index].nome =
            nome.value.trim();

        clientes[index].telefone =
            telefone
                ? telefone.value.trim()
                : "";

        clientes[index].email =
            email
                ? email.value.trim()
                : "";

        clientes[index].observacao =
            observacao
                ? observacao.value.trim()
                : "";

        mostrarMensagem(
            "Cliente atualizado."
        );

    } else {

        clientes.push({

            id:
                gerarId(),

            nome:
                nome.value.trim(),

            telefone:
                telefone
                    ? telefone.value.trim()
                    : "",

            email:
                email
                    ? email.value.trim()
                    : "",

            observacao:
                observacao
                    ? observacao.value.trim()
                    : "",

            criadoEm:
                new Date().toISOString()

        });

        mostrarMensagem(
            "Cliente cadastrado."
        );
    }

    if (
        !salvarDados(
            CHAVES.clientes,
            clientes
        )
    ) {
        return;
    }

    delete form.dataset.editando;

    renderizarClientes();

    atualizarSugestoesClientes();

    mostrarTela(
        "clientes"
    );
}


/* ==========================================================
   FICHA DO CLIENTE
========================================================== */

function abrirFichaCliente(id) {

    const clientes =
        obterDados(
            CHAVES.clientes
        );

    const cliente =
        clientes.find(
            item =>
                String(item.id) ===
                String(id)
        );

    if (!cliente) {
        return;
    }

    clienteFichaAtual =
        cliente;

    const avatar =
        document.getElementById(
            "fichaAvatar"
        );

    const nome =
        document.getElementById(
            "fichaNome"
        );

    const telefone =
        document.getElementById(
            "fichaTelefone"
        );

    const observacao =
        document.getElementById(
            "fichaObservacao"
        );

    if (avatar) {

        avatar.textContent =
            gerarIniciais(
                cliente.nome
            );
    }

    if (nome) {

        nome.textContent =
            cliente.nome;
    }

    if (telefone) {

        telefone.textContent =
            cliente.telefone ||
            "Sem telefone";
    }

    if (observacao) {

        observacao.textContent =
            cliente.observacao ||
            "Nenhuma observação cadastrada.";
    }

    atualizarResumoFicha(
        cliente
    );

    renderizarHistoricoCliente(
        cliente
    );

    mostrarTela(
        "fichaCliente"
    );
}


function atualizarResumoFicha(cliente) {

    const agendamentos =
        obterDados(
            CHAVES.agendamentos
        ).filter(
            item =>
                String(item.clienteId) ===
                String(cliente.id)
        );

    const atendimentos =
        document.getElementById(
            "fichaAtendimentos"
        );

    const total =
        document.getElementById(
            "fichaTotalGasto"
        );

    const ultimo =
        document.getElementById(
            "fichaUltimoAtendimento"
        );

    if (atendimentos) {

        atendimentos.textContent =
            agendamentos.length;
    }

    const valorTotal =
        agendamentos.reduce(
            (soma, item) =>
                soma +
                Number(item.valor || 0),
            0
        );

    if (total) {

        total.textContent =
            formatarMoeda(
                valorTotal
            );
    }

    const concluidos =
        agendamentos
            .filter(
                item =>
                    normalizarStatus(
                        item.status
                    ) === "concluido"
            )
            .sort(
                (a, b) =>
                    `${b.data}${b.hora}`
                        .localeCompare(
                            `${a.data}${a.hora}`
                        )
            );

    if (ultimo) {

        ultimo.textContent =
            concluidos.length
                ? formatarData(
                    concluidos[0].data
                )
                : "—";
    }
}


function renderizarHistoricoCliente(cliente) {

    const lista =
        document.getElementById(
            "historicoCliente"
        );

    if (!lista) {
        return;
    }

    const agendamentos =
        obterDados(
            CHAVES.agendamentos
        )
        .filter(
            item =>
                String(item.clienteId) ===
                String(cliente.id)
        )
        .sort(
            (a, b) =>
                `${b.data}${b.hora}`
                    .localeCompare(
                        `${a.data}${a.hora}`
                    )
        );

    if (agendamentos.length === 0) {

        lista.innerHTML = `

            <div class="estado-vazio pequeno">

                <div class="vazio-icone">
                    ✂
                </div>

                <p>
                    Nenhum atendimento registrado.
                </p>

            </div>

        `;

        return;
    }

    lista.innerHTML =
        agendamentos.map(
            item => `

            <div class="historico-item">

                <div>

                    <strong>
                        ${escaparHTML(
                            item.servico
                        )}
                    </strong>

                    <span>
                        ${formatarData(
                            item.data
                        )}
                        ·
                        ${escaparHTML(
                            item.hora
                        )}
                    </span>

                </div>

                <strong>
                    ${formatarMoeda(
                        item.valor
                    )}
                </strong>

            </div>

            `
        ).join("");
}


/* ==========================================================
   EDITAR CLIENTE
========================================================== */

function editarClienteAtual() {

    if (!clienteFichaAtual) {
        return;
    }

    const form =
        document.getElementById(
            "formCliente"
        );

    if (!form) {
        return;
    }

    document.getElementById(
        "novoClienteNome"
    ).value =
        clienteFichaAtual.nome || "";

    document.getElementById(
        "novoClienteTelefone"
    ).value =
        clienteFichaAtual.telefone || "";

    document.getElementById(
        "novoClienteEmail"
    ).value =
        clienteFichaAtual.email || "";

    document.getElementById(
        "novoClienteObservacao"
    ).value =
        clienteFichaAtual.observacao || "";

    form.dataset.editando =
        clienteFichaAtual.id;

    const titulo =
        document.querySelector(
            "#telaNovoCliente h1"
        );

    if (titulo) {

        titulo.textContent =
            "Editar Cliente";
    }

    mostrarTela(
        "novoCliente"
    );
}


/* ==========================================================
   EXCLUIR CLIENTE
========================================================== */

function excluirClienteAtual() {

    if (!clienteFichaAtual) {
        return;
    }

    if (
        !confirm(
            `Excluir o cliente "${clienteFichaAtual.nome}"?`
        )
    ) {
        return;
    }

    const clientes =
        obterDados(
            CHAVES.clientes
        );

    const novos =
        clientes.filter(
            cliente =>
                String(cliente.id) !==
                String(
                    clienteFichaAtual.id
                )
        );

    if (
        !salvarDados(
            CHAVES.clientes,
            novos
        )
    ) {
        return;
    }

    clienteFichaAtual = null;

    renderizarClientes();

    atualizarSugestoesClientes();

    mostrarMensagem(
        "Cliente excluído."
    );

    mostrarTela(
        "clientes"
    );
}


/* ==========================================================
   WHATSAPP
========================================================== */

function abrirWhatsAppCliente() {

    if (!clienteFichaAtual) {
        return;
    }

    let telefone =
        clienteFichaAtual.telefone ||
        "";

    telefone =
        telefone.replace(
            /\D/g,
            ""
        );

    if (!telefone) {

        mostrarMensagem(
            "Cliente sem telefone."
        );

        return;
    }

    if (
        !telefone.startsWith("55")
    ) {

        telefone =
            "55" + telefone;
    }

    window.open(
        `https://wa.me/${telefone}`,
        "_blank"
    );
}


/* ==========================================================
   AGENDA — CALENDÁRIO
========================================================== */

function renderizarCalendario() {

    const container =
        document.getElementById(
            "datasAgenda"
        );

    const mesTitulo =
        document.getElementById(
            "mesAgenda"
        );

    if (!container) {
        return;
    }

    const ano =
        mesAgendaAtual.getFullYear();

    const mes =
        mesAgendaAtual.getMonth();

    if (mesTitulo) {

        mesTitulo.textContent =
            `${nomeMes(mes)} ${ano}`;
    }

    const ultimoDia =
        new Date(
            ano,
            mes + 1,
            0
        ).getDate();

    let html = "";

    for (
        let dia = 1;
        dia <= ultimoDia;
        dia++
    ) {

        const data =
            `${ano}-` +
            `${String(mes + 1).padStart(2, "0")}-` +
            `${String(dia).padStart(2, "0")}`;

        const selecionada =
            data ===
            dataAgendaSelecionada;

        const hoje =
            data ===
            dataHojeISO();

        html += `

            <button
                class="
                    data-agenda
                    ${selecionada ? "selecionada" : ""}
                    ${hoje ? "hoje" : ""}
                "
                data-data="${data}"
                type="button"
            >

                <span>
                    ${nomeDiaSemana(data)}
                </span>

                <strong>
                    ${dia}
                </strong>

            </button>

        `;
    }

    container.innerHTML =
        html;

    container
        .querySelectorAll(
            "[data-data]"
        )
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () => {

                    dataAgendaSelecionada =
                        botao.dataset.data;

                    renderizarCalendario();

                    renderizarAgenda();
                }
            );
        });
}


function nomeMes(mes) {

    const meses = [

        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"

    ];

    return meses[mes];
}


function nomeDiaSemana(data) {

    const partes =
        data.split("-");

    const objeto =
        new Date(
            Number(partes[0]),
            Number(partes[1]) - 1,
            Number(partes[2])
        );

    const dias = [

        "Dom",
        "Seg",
        "Ter",
        "Qua",
        "Qui",
        "Sex",
        "Sáb"

    ];

    return dias[
        objeto.getDay()
    ];
}


/* ==========================================================
   AGENDA — RENDERIZAÇÃO
========================================================== */

function renderizarAgenda() {

    const lista =
        document.getElementById(
            "listaAgenda"
        );

    const titulo =
        document.getElementById(
            "tituloDataAgenda"
        );

    if (!lista) {
        return;
    }

    if (titulo) {

        if (
            dataAgendaSelecionada ===
            dataHojeISO()
        ) {

            titulo.textContent =
                "Hoje";

        } else {

            titulo.textContent =
                formatarDataLonga(
                    dataAgendaSelecionada
                );
        }
    }

    const agendamentos =
        obterDados(
            CHAVES.agendamentos
        )
        .filter(
            item =>
                item.data ===
                dataAgendaSelecionada
        )
        .sort(
            (a, b) =>
                String(a.hora || "")
                    .localeCompare(
                        String(b.hora || "")
                    )
        );

    if (
        agendamentos.length === 0
    ) {

        lista.innerHTML = `

            <div class="estado-vazio">

                <div class="estado-icone">
                    📅
                </div>

                <h3>
                    Agenda livre
                </h3>

                <p>
                    Nenhum horário marcado para este dia.
                </p>

            </div>

        `;

        return;
    }

    lista.innerHTML =
        agendamentos.map(
            item => {

                const status =
                    normalizarStatus(
                        item.status
                    );

                return `

                <button
                    class="item-agenda"
                    data-agendamento="${item.id}"
                    type="button"
                >

                    <div class="hora-agenda">

                        <strong>
                            ${escaparHTML(
                                item.hora ||
                                "--:--"
                            )}
                        </strong>

                    </div>

                    <div class="avatar-agenda">

                        ${gerarIniciais(
                            item.cliente
                        )}

                    </div>

                    <div class="info-agenda">

                        <strong>
                            ${escaparHTML(
                                item.cliente ||
                                "Cliente"
                            )}
                        </strong>

                        <span>
                            ${escaparHTML(
                                item.servico ||
                                "Serviço"
                            )}
                        </span>

                    </div>

                    <span
                        class="
                            status
                            status-${status}
                        "
                    >
                        ${textoStatus(status)}
                    </span>

                </button>

                `;
            }
        ).join("");

    lista
        .querySelectorAll(
            "[data-agendamento]"
        )
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () =>
                    abrirDetalhesAgendamento(
                        botao.dataset
                            .agendamento
                    )
            );
        });
}


/* ==========================================================
   STATUS
========================================================== */

function normalizarStatus(status) {

    if (
        status === "atendimento" ||
        status === "em_atendimento"
    ) {

        return "atendimento";
    }

    if (
        status === "concluido"
    ) {

        return "concluido";
    }

    if (
        status === "cancelado"
    ) {

        return "cancelado";
    }

    return "agendado";
}


function textoStatus(status) {

    const nomes = {

        agendado:
            "Agendado",

        atendimento:
            "Em atendimento",

        concluido:
            "Concluído",

        cancelado:
            "Cancelado"

    };

    return (
        nomes[status] ||
        "Agendado"
    );
}

/* ==========================================================
   NOVO AGENDAMENTO
========================================================== */

function abrirNovoAgendamento() {

    const form =
        document.getElementById(
            "formAgendamento"
        );

    if (form) {
        form.reset();
    }

    atualizarSelectServicos();
    atualizarSugestoesClientes();

    const data =
        document.getElementById(
            "dataAgendamento"
        );

    if (data) {

        data.value =
            dataAgendaSelecionada ||
            dataHojeISO();
    }

    const valor =
        document.getElementById(
            "valor"
        );

    if (valor) {
        valor.value = "";
    }

    mostrarTela("novo");
}


/* ==========================================================
   SALVAR AGENDAMENTO
========================================================== */

function salvarAgendamento(event) {

    event.preventDefault();

    try {

        const form =
            document.getElementById(
                "formAgendamento"
            );

        const clienteInput =
            document.getElementById(
                "clienteNome"
            );

        const servicoSelect =
            document.getElementById(
                "servico"
            );

        const dataInput =
            document.getElementById(
                "dataAgendamento"
            );

        const horaInput =
            document.getElementById(
                "horaAgendamento"
            );

        const valorInput =
            document.getElementById(
                "valor"
            );

        const observacaoInput =
            document.getElementById(
                "observacao"
            );

        if (
            !form ||
            !clienteInput ||
            !servicoSelect ||
            !dataInput ||
            !horaInput
        ) {

            mostrarMensagem(
                "Erro no formulário."
            );

            return;
        }

        const clienteNome =
            clienteInput.value.trim();

        const servicoNome =
            servicoSelect.value.trim();

        const data =
            dataInput.value;

        const hora =
            horaInput.value;

        if (!clienteNome) {

            mostrarMensagem(
                "Digite o nome do cliente."
            );

            clienteInput.focus();

            return;
        }

        if (!servicoNome) {

            mostrarMensagem(
                "Selecione um serviço."
            );

            return;
        }

        if (!data) {

            mostrarMensagem(
                "Informe a data."
            );

            return;
        }

        if (!hora) {

            mostrarMensagem(
                "Informe o horário."
            );

            return;
        }

        if (!testarArmazenamento()) {

            mostrarMensagem(
                "O armazenamento está indisponível."
            );

            return;
        }

        const agendamentos =
            obterDados(
                CHAVES.agendamentos
            );

        const clientes =
            obterDados(
                CHAVES.clientes
            );

        const servicos =
            obterDados(
                CHAVES.servicos
            );


        /* HORÁRIO DUPLICADO */

        const horarioOcupado =
            agendamentos.some(item => {

                const mesmoDia =
                    item.data === data;

                const mesmaHora =
                    item.hora === hora;

                const cancelado =
                    normalizarStatus(
                        item.status
                    ) === "cancelado";

                return (
                    mesmoDia &&
                    mesmaHora &&
                    !cancelado
                );
            });

        if (horarioOcupado) {

            mostrarMensagem(
                "Este horário já está ocupado."
            );

            return;
        }


        /* LOCALIZAR CLIENTE */

        let cliente =
            clientes.find(item =>
                String(
                    item.nome || ""
                )
                .trim()
                .toLowerCase() ===
                clienteNome.toLowerCase()
            );


        /* CRIAR CLIENTE AUTOMATICAMENTE */

        if (!cliente) {

            cliente = {

                id:
                    gerarId(),

                nome:
                    clienteNome,

                telefone:
                    "",

                email:
                    "",

                observacao:
                    "",

                criadoEm:
                    new Date()
                        .toISOString()

            };

            clientes.push(cliente);

            if (
                !salvarDados(
                    CHAVES.clientes,
                    clientes
                )
            ) {

                mostrarMensagem(
                    "Não foi possível criar o cliente."
                );

                return;
            }
        }


        /* LOCALIZAR SERVIÇO */

        const servico =
            servicos.find(item =>
                String(
                    item.nome || ""
                ).trim() ===
                servicoNome
            );


        /* VALOR */

        let valor = 0;

        if (
            valorInput &&
            valorInput.value !== ""
        ) {

            valor =
                Number(
                    String(
                        valorInput.value
                    )
                    .trim()
                    .replace(",", ".")
                );
        }

        if (!Number.isFinite(valor)) {

            valor =
                servico
                    ? Number(
                        servico.preco || 0
                    )
                    : 0;
        }


        /* DURAÇÃO */

        const duracao =
            servico
                ? Number(
                    servico.duracao || 0
                )
                : 0;


        /* OBSERVAÇÃO */

        const observacao =
            observacaoInput
                ? observacaoInput.value.trim()
                : "";


        /* NOVO AGENDAMENTO */

        const novoAgendamento = {

            id:
                gerarId(),

            clienteId:
                cliente.id,

            cliente:
                cliente.nome,

            telefone:
                cliente.telefone || "",

            servico:
                servicoNome,

            data:
                data,

            hora:
                hora,

            valor:
                valor,

            duracao:
                duracao,

            observacao:
                observacao,

            status:
                "agendado",

            criadoEm:
                new Date()
                    .toISOString()

        };


        agendamentos.push(
            novoAgendamento
        );


        if (
            !salvarDados(
                CHAVES.agendamentos,
                agendamentos
            )
        ) {

            mostrarMensagem(
                "Não foi possível salvar o agendamento."
            );

            return;
        }


        /* CONFERÊNCIA */

        const conferidos =
            obterDados(
                CHAVES.agendamentos
            );

        const encontrado =
            conferidos.some(
                item =>
                    String(item.id) ===
                    String(
                        novoAgendamento.id
                    )
            );

        if (!encontrado) {

            mostrarMensagem(
                "O agendamento não foi gravado."
            );

            return;
        }


        /* ATUALIZAR AGENDA */

        dataAgendaSelecionada =
            data;

        const partes =
            data.split("-");

        if (partes.length === 3) {

            mesAgendaAtual =
                new Date(
                    Number(partes[0]),
                    Number(partes[1]) - 1,
                    1
                );
        }


        renderizarCalendario();
        renderizarAgenda();
        renderizarClientes();
        atualizarSugestoesClientes();
        atualizarResumoHome();
        renderizarFinanceiro();


        if (form) {
            form.reset();
        }

        mostrarTela("agenda");

        mostrarMensagem(
            "Agendamento salvo com sucesso!"
        );

    } catch (erro) {

        console.error(
            "BARBERPRO ERRO:",
            erro
        );

        mostrarMensagem(
            "Erro ao salvar o agendamento."
        );
    }
}


/* ==========================================================
   DETALHES DO AGENDAMENTO
========================================================== */

function abrirDetalhesAgendamento(id) {

    const agendamentos =
        obterDados(
            CHAVES.agendamentos
        );

    const agendamento =
        agendamentos.find(
            item =>
                String(item.id) ===
                String(id)
        );

    if (!agendamento) {
        return;
    }

    agendamentoAtual =
        agendamento;

    const clientes =
        obterDados(
            CHAVES.clientes
        );

    const cliente =
        clientes.find(
            item =>
                String(item.id) ===
                String(
                    agendamento.clienteId
                )
        );

    const servicos =
        obterDados(
            CHAVES.servicos
        );

    const servico =
        servicos.find(
            item =>
                item.nome ===
                agendamento.servico
        );

    const nome =
        agendamento.cliente ||
        cliente?.nome ||
        "Cliente";

    const telefone =
        cliente?.telefone ||
        agendamento.telefone ||
        "Sem telefone";

    const duracao =
        Number(
            agendamento.duracao ||
            servico?.duracao ||
            0
        );

    const valor =
        Number(
            agendamento.valor ??
            servico?.preco ??
            0
        );

    const status =
        normalizarStatus(
            agendamento.status
        );


    const avatar =
        document.getElementById(
            "detalheAvatar"
        );

    const nomeEl =
        document.getElementById(
            "detalheCliente"
        );

    const telefoneEl =
        document.getElementById(
            "detalheTelefone"
        );

    const servicoEl =
        document.getElementById(
            "detalheServico"
        );

    const dataEl =
        document.getElementById(
            "detalheData"
        );

    const horaEl =
        document.getElementById(
            "detalheHora"
        );

    const duracaoEl =
        document.getElementById(
            "detalheDuracao"
        );

    const valorEl =
        document.getElementById(
            "detalheValor"
        );

    const statusEl =
        document.getElementById(
            "detalheStatus"
        );

    const observacaoEl =
        document.getElementById(
            "detalheObservacao"
        );


    if (avatar) {
        avatar.textContent =
            gerarIniciais(nome);
    }

    if (nomeEl) {
        nomeEl.textContent =
            nome;
    }

    if (telefoneEl) {
        telefoneEl.textContent =
            telefone;
    }

    if (servicoEl) {
        servicoEl.textContent =
            agendamento.servico || "—";
    }

    if (dataEl) {
        dataEl.textContent =
            formatarData(
                agendamento.data
            );
    }

    if (horaEl) {
        horaEl.textContent =
            agendamento.hora || "—";
    }

    if (duracaoEl) {
        duracaoEl.textContent =
            formatarDuracao(duracao);
    }

    if (valorEl) {
        valorEl.textContent =
            formatarMoeda(valor);
    }

    if (statusEl) {

        statusEl.className =
            `status status-${status}`;

        statusEl.textContent =
            textoStatus(status);
    }

    if (observacaoEl) {

        observacaoEl.textContent =
            agendamento.observacao ||
            "Nenhuma observação.";
    }

    atualizarBotoesAtendimento(
        status
    );

    mostrarTela("detalhes");
}


/* ==========================================================
   BOTÕES DE ATENDIMENTO
========================================================== */

function atualizarBotoesAtendimento(status) {

    const iniciar =
        document.getElementById(
            "btnIniciarAtendimento"
        );

    const concluir =
        document.getElementById(
            "btnConcluirAtendimento"
        );

    const cancelar =
        document.getElementById(
            "btnCancelarAtendimento"
        );

    if (iniciar) {

        iniciar.style.display =
            status === "agendado"
                ? "flex"
                : "none";
    }

    if (concluir) {

        concluir.style.display =
            status === "atendimento"
                ? "flex"
                : "none";
    }

    if (cancelar) {

        cancelar.style.display =
            (
                status === "concluido" ||
                status === "cancelado"
            )
                ? "none"
                : "flex";
    }
}


/* ==========================================================
   ALTERAR STATUS
========================================================== */

function alterarStatusAgendamento(
    novoStatus
) {

    if (!agendamentoAtual) {
        return;
    }

    const agendamentos =
        obterDados(
            CHAVES.agendamentos
        );

    const index =
        agendamentos.findIndex(
            item =>
                String(item.id) ===
                String(
                    agendamentoAtual.id
                )
        );

    if (index === -1) {
        return;
    }

    agendamentos[index].status =
        novoStatus;

    agendamentos[index].atualizadoEm =
        new Date()
            .toISOString();

    if (
        !salvarDados(
            CHAVES.agendamentos,
            agendamentos
        )
    ) {
        return;
    }

    agendamentoAtual =
        agendamentos[index];

    atualizarBotoesAtendimento(
        novoStatus
    );

    const statusEl =
        document.getElementById(
            "detalheStatus"
        );

    if (statusEl) {

        statusEl.className =
            `status status-${novoStatus}`;

        statusEl.textContent =
            textoStatus(
                novoStatus
            );
    }

    renderizarAgenda();
    renderizarClientes();
    atualizarResumoHome();
    renderizarFinanceiro();

    mostrarMensagem(
        textoStatus(novoStatus)
    );
}


/* ==========================================================
   MÊS ANTERIOR
========================================================== */

function mesAnterior() {

    mesAgendaAtual.setMonth(
        mesAgendaAtual.getMonth() - 1
    );

    ajustarDataParaMes();

    renderizarCalendario();
    renderizarAgenda();
}


/* ==========================================================
   MÊS PRÓXIMO
========================================================== */

function mesProximo() {

    mesAgendaAtual.setMonth(
        mesAgendaAtual.getMonth() + 1
    );

    ajustarDataParaMes();

    renderizarCalendario();
    renderizarAgenda();
}


/* ==========================================================
   AJUSTAR DATA AO MÊS
========================================================== */

function ajustarDataParaMes() {

    const ano =
        mesAgendaAtual.getFullYear();

    const mes =
        mesAgendaAtual.getMonth();

    const partes =
        dataAgendaSelecionada.split("-");

    let dia =
        Number(partes[2]);

    const ultimo =
        new Date(
            ano,
            mes + 1,
            0
        ).getDate();

    if (dia > ultimo) {
        dia = ultimo;
    }

    dataAgendaSelecionada =
        `${ano}-` +
        `${String(mes + 1).padStart(2, "0")}-` +
        `${String(dia).padStart(2, "0")}`;
}


/* ==========================================================
   IR PARA HOJE
========================================================== */

function irParaHoje() {

    const hoje =
        new Date();

    dataAgendaSelecionada =
        dataHojeISO();

    mesAgendaAtual =
        new Date(
            hoje.getFullYear(),
            hoje.getMonth(),
            1
        );

    renderizarCalendario();
    renderizarAgenda();
}


/* ==========================================================
   RESUMO DA HOME
========================================================== */

function atualizarResumoHome() {

    const hoje =
        dataHojeISO();

    const agendamentos =
        obterDados(
            CHAVES.agendamentos
        );

    const clientes =
        obterDados(
            CHAVES.clientes
        );

    const hojeAgendamentos =
        agendamentos.filter(
            item =>
                item.data === hoje &&
                normalizarStatus(
                    item.status
                ) !== "cancelado"
        );

    const concluidos =
        hojeAgendamentos.filter(
            item =>
                normalizarStatus(
                    item.status
                ) === "concluido"
        );

    const faturamento =
        concluidos.reduce(
            (soma, item) =>
                soma +
                Number(item.valor || 0),
            0
        );

    const cards =
        document.querySelectorAll(
            "#telaInicio .card-resumo"
        );

    if (cards.length >= 3) {

        const atendimento =
            cards[0].querySelector("strong");

        const faturamentoEl =
            cards[1].querySelector("strong");

        const clientesEl =
            cards[2].querySelector("strong");


        if (atendimento) {

            atendimento.textContent =
                hojeAgendamentos.length;
        }

        if (faturamentoEl) {

            faturamentoEl.textContent =
                formatarMoeda(
                    faturamento
                ).replace(
                    "R$ ",
                    ""
                );
        }

        if (clientesEl) {

            clientesEl.textContent =
                clientes.length;
        }
    }
}


/* ==========================================================
   FINANCEIRO
========================================================== */

function obterDataObjeto(data) {

    if (!data) {
        return null;
    }

    const partes =
        String(data).split("-");

    if (partes.length !== 3) {
        return null;
    }

    return new Date(
        Number(partes[0]),
        Number(partes[1]) - 1,
        Number(partes[2])
    );
}


/* ==========================================================
   VERIFICAR SE É MESMO DIA
========================================================== */

function mesmoDia(data1, data2) {

    return data1 === data2;
}


/* ==========================================================
   VERIFICAR SEMANA ATUAL
========================================================== */

function pertenceSemanaAtual(data) {

    const objeto =
        obterDataObjeto(data);

    if (!objeto) {
        return false;
    }

    const hoje =
        obterDataObjeto(
            dataHojeISO()
        );

    if (!hoje) {
        return false;
    }

    const diaSemana =
        hoje.getDay();

    const inicio =
        new Date(hoje);

    inicio.setDate(
        hoje.getDate() -
        diaSemana
    );

    inicio.setHours(
        0, 0, 0, 0
    );

    const fim =
        new Date(inicio);

    fim.setDate(
        inicio.getDate() + 6
    );

    fim.setHours(
        23, 59, 59, 999
    );

    return (
        objeto >= inicio &&
        objeto <= fim
    );
}


/* ==========================================================
   FILTRAR CONCLUÍDOS
========================================================== */

function obterAtendimentosConcluidos() {

    return obterDados(
        CHAVES.agendamentos
    ).filter(
        item =>
            normalizarStatus(
                item.status
            ) === "concluido"
    );
}


/* ==========================================================
   RENDERIZAR FINANCEIRO
========================================================== */

function renderizarFinanceiro() {

    const tela =
        document.getElementById(
            "telaFinanceiro"
        );

    if (!tela) {
        return;
    }

    const concluidos =
        obterAtendimentosConcluidos();

    const hoje =
        dataHojeISO();

    const anoAtual =
        new Date().getFullYear();

    const mesAtual =
        new Date().getMonth();


    /* ------------------------------------------
       FATURAMENTO HOJE
    ------------------------------------------ */

    const hojeLista =
        concluidos.filter(
            item =>
                mesmoDia(
                    item.data,
                    hoje
                )
        );

    const faturamentoHoje =
        hojeLista.reduce(
            (total, item) =>
                total +
                Number(item.valor || 0),
            0
        );


    /* ------------------------------------------
       FATURAMENTO SEMANA
    ------------------------------------------ */

    const semanaLista =
        concluidos.filter(
            item =>
                pertenceSemanaAtual(
                    item.data
                )
        );

    const faturamentoSemana =
        semanaLista.reduce(
            (total, item) =>
                total +
                Number(item.valor || 0),
            0
        );


    /* ------------------------------------------
       FATURAMENTO MÊS
    ------------------------------------------ */

    const mesLista =
        concluidos.filter(item => {

            const data =
                obterDataObjeto(
                    item.data
                );

            if (!data) {
                return false;
            }

            return (
                data.getFullYear() ===
                anoAtual &&
                data.getMonth() ===
                mesAtual
            );
        });

    const faturamentoMes =
        mesLista.reduce(
            (total, item) =>
                total +
                Number(item.valor || 0),
            0
        );


    /* ------------------------------------------
       TOTAL DE ATENDIMENTOS
    ------------------------------------------ */

    const totalAtendimentos =
        mesLista.length;


    /* ------------------------------------------
       TICKET MÉDIO
    ------------------------------------------ */

    const ticketMedio =
        totalAtendimentos > 0
            ? faturamentoMes /
              totalAtendimentos
            : 0;


    /* ------------------------------------------
       ATUALIZAR HTML
    ------------------------------------------ */

    const elementoHoje =
        document.getElementById(
            "faturamentoHoje"
        );

    const elementoSemana =
        document.getElementById(
            "faturamentoSemana"
        );

    const elementoMes =
        document.getElementById(
            "faturamentoMes"
        );

    const elementoAtendimentos =
        document.getElementById(
            "totalAtendimentosFinanceiro"
        );

    const elementoTicket =
        document.getElementById(
            "ticketMedio"
        );


    if (elementoHoje) {

        elementoHoje.textContent =
            formatarMoeda(
                faturamentoHoje
            );
    }

    if (elementoSemana) {

        elementoSemana.textContent =
            formatarMoeda(
                faturamentoSemana
            );
    }

    if (elementoMes) {

        elementoMes.textContent =
            formatarMoeda(
                faturamentoMes
            );
    }

    if (elementoAtendimentos) {

        elementoAtendimentos.textContent =
            totalAtendimentos;
    }

    if (elementoTicket) {

        elementoTicket.textContent =
            formatarMoeda(
                ticketMedio
            );
    }


    renderizarServicosFinanceiro(
        mesLista
    );

    renderizarHistoricoFinanceiro(
        mesLista
    );


    const vazio =
        document.getElementById(
            "estadoVazioFinanceiro"
        );

    if (vazio) {

        vazio.style.display =
            mesLista.length === 0
                ? "block"
                : "none";
    }
}


/* ==========================================================
   SERVIÇOS DO FINANCEIRO
========================================================== */

function renderizarServicosFinanceiro(
    atendimentos
) {

    const lista =
        document.getElementById(
            "listaFinanceiroServicos"
        );

    if (!lista) {
        return;
    }

    if (!atendimentos.length) {

        lista.innerHTML = "";

        return;
    }


    const agrupados = {};


    atendimentos.forEach(item => {

        const nome =
            item.servico ||
            "Serviço";

        if (!agrupados[nome]) {

            agrupados[nome] = {

                quantidade: 0,

                total: 0

            };
        }

        agrupados[nome].quantidade++;

        agrupados[nome].total +=
            Number(item.valor || 0);
    });


    const servicos =
        Object.entries(
            agrupados
        )
        .sort(
            (a, b) =>
                b[1].quantidade -
                a[1].quantidade
        );


    lista.innerHTML =
        servicos.map(
            ([nome, dados]) => `

            <div class="financeiro-servico-item">

                <div class="financeiro-servico-info">

                    <div class="financeiro-servico-icone">
                        ✂
                    </div>

                    <div>

                        <strong>
                            ${escaparHTML(nome)}
                        </strong>

                        <span>
                            ${dados.quantidade}
                            ${
                                dados.quantidade === 1
                                    ? "atendimento"
                                    : "atendimentos"
                            }
                        </span>

                    </div>

                </div>

                <div class="financeiro-servico-total">

                    <strong>
                        ${formatarMoeda(
                            dados.total
                        )}
                    </strong>

                    <small>
                        faturado
                    </small>

                </div>

            </div>

            `
        )
        .join("");
}


/* ==========================================================
   HISTÓRICO FINANCEIRO
========================================================== */

function renderizarHistoricoFinanceiro(
    atendimentos
) {

    const lista =
        document.getElementById(
            "historicoFinanceiro"
        );

    if (!lista) {
        return;
    }

    const ordenados =
        [...atendimentos]
            .sort(
                (a, b) =>
                    `${b.data}${b.hora}`
                        .localeCompare(
                            `${a.data}${a.hora}`
                        )
            );


    if (!ordenados.length) {

        lista.innerHTML = "";

        return;
    }


    lista.innerHTML =
        ordenados.map(
            item => `

            <div class="financeiro-historico-item">

                <div class="financeiro-historico-info">

                    <strong>
                        ${escaparHTML(
                            item.cliente ||
                            "Cliente"
                        )}
                    </strong>

                    <span>
                        ${escaparHTML(
                            item.servico ||
                            "Serviço"
                        )}
                        ·
                        ${formatarData(
                            item.data
                        )}
                        ·
                        ${escaparHTML(
                            item.hora ||
                            "--:--"
                        )}
                    </span>

                </div>

                <strong
                    class="financeiro-historico-valor"
                >
                    ${formatarMoeda(
                        item.valor
                    )}
                </strong>

            </div>

            `
        )
        .join("");
}


/* ==========================================================
   NAVEGAÇÃO
========================================================== */

document
    .querySelectorAll(".nav-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const destino =
                    item.dataset.tela;

                if (
                    destino === "mais"
                ) {

                    renderizarFinanceiro();

                    mostrarTela(
                        "financeiro"
                    );

                    return;
                }


                if (
                    destino === "agenda"
                ) {

                    renderizarCalendario();

                    renderizarAgenda();
                }


                if (
                    destino === "clientes"
                ) {

                    renderizarClientes();
                }


                if (
                    destino === "servicos"
                ) {

                    renderizarServicos();
                }


                if (
                    destino === "financeiro"
                ) {

                    renderizarFinanceiro();
                }


                mostrarTela(
                    destino
                );
            }
        );
    });


/* ==========================================================
   HOME — NOVO AGENDAMENTO
========================================================== */

const btnInicioAgendamento =
    document.getElementById(
        "btnInicioAgendamento"
    );

if (btnInicioAgendamento) {

    btnInicioAgendamento
        .addEventListener(
            "click",
            abrirNovoAgendamento
        );
}


/* ==========================================================
   HOME — NOVO CLIENTE
========================================================== */

const btnInicioCliente =
    document.getElementById(
        "btnInicioCliente"
    );

if (btnInicioCliente) {

    btnInicioCliente
        .addEventListener(
            "click",
            abrirNovoCliente
        );
}


/* ==========================================================
   HOME — SERVIÇOS
========================================================== */

const btnInicioServicos =
    document.getElementById(
        "btnInicioServicos"
    );

if (btnInicioServicos) {

    btnInicioServicos
        .addEventListener(
            "click",
            () => {

                renderizarServicos();

                mostrarTela(
                    "servicos"
                );
            }
        );
}


/* ==========================================================
   HOME — FINANCEIRO
========================================================== */

const btnInicioRelatorios =
    document.getElementById(
        "btnInicioRelatorios"
    );

if (btnInicioRelatorios) {

    btnInicioRelatorios
        .addEventListener(
            "click",
            () => {

                renderizarFinanceiro();

                mostrarTela(
                    "financeiro"
                );
            }
        );
}


/* ==========================================================
   HOME — VER AGENDA
========================================================== */

const btnVerAgenda =
    document.getElementById(
        "btnVerAgenda"
    );

if (btnVerAgenda) {

    btnVerAgenda
        .addEventListener(
            "click",
            () => {

                irParaHoje();

                mostrarTela(
                    "agenda"
                );
            }
        );
}


/* ==========================================================
   HOME — NOVO AGENDAMENTO
========================================================== */

const btnNovoAgendamento =
    document.getElementById(
        "btnNovoAgendamento"
    );

if (btnNovoAgendamento) {

    btnNovoAgendamento
        .addEventListener(
            "click",
            abrirNovoAgendamento
        );
}


/* ==========================================================
   AGENDA — BOTÃO +
========================================================== */

const btnAdicionarAgendamento =
    document.getElementById(
        "btnAdicionarAgendamento"
    );

if (btnAdicionarAgendamento) {

    btnAdicionarAgendamento
        .addEventListener(
            "click",
            abrirNovoAgendamento
        );
}


/* ==========================================================
   AGENDA — NOVO
========================================================== */

const btnNovoAgendamentoAgenda =
    document.getElementById(
        "btnNovoAgendamentoAgenda"
    );

if (btnNovoAgendamentoAgenda) {

    btnNovoAgendamentoAgenda
        .addEventListener(
            "click",
            abrirNovoAgendamento
        );
}


/* ==========================================================
   AGENDA — MÊS
========================================================== */

const btnMesAnterior =
    document.getElementById(
        "btnMesAnterior"
    );

if (btnMesAnterior) {

    btnMesAnterior
        .addEventListener(
            "click",
            mesAnterior
        );
}


const btnMesProximo =
    document.getElementById(
        "btnMesProximo"
    );

if (btnMesProximo) {

    btnMesProximo
        .addEventListener(
            "click",
            mesProximo
        );
}


/* ==========================================================
   AGENDA — HOJE
========================================================== */

const btnHojeAgenda =
    document.getElementById(
        "btnHojeAgenda"
    );

if (btnHojeAgenda) {

    btnHojeAgenda
        .addEventListener(
            "click",
            irParaHoje
        );
}


/* ==========================================================
   VOLTAR AGENDA
========================================================== */

const voltarAgenda =
    document.getElementById(
        "voltarAgenda"
    );

if (voltarAgenda) {

    voltarAgenda
        .addEventListener(
            "click",
            () =>
                mostrarTela("inicio")
        );
}


/* ==========================================================
   VOLTAR FINANCEIRO
========================================================== */

const voltarFinanceiro =
    document.getElementById(
        "voltarFinanceiro"
    );

if (voltarFinanceiro) {

    voltarFinanceiro
        .addEventListener(
            "click",
            () =>
                mostrarTela("inicio")
        );
}


/* ==========================================================
   FORMULÁRIO DE AGENDAMENTO
========================================================== */

const formAgendamento =
    document.getElementById(
        "formAgendamento"
    );

if (formAgendamento) {

    formAgendamento
        .addEventListener(
            "submit",
            salvarAgendamento
        );
}


/* ==========================================================
   CLIENTE — SUGESTÕES
========================================================== */

const clienteNome =
    document.getElementById(
        "clienteNome"
    );

if (clienteNome) {

    clienteNome
        .addEventListener(
            "focus",
            atualizarSugestoesClientes
        );
}


/* ==========================================================
   SERVIÇO → PREÇO AUTOMÁTICO
========================================================== */

const servicoSelect =
    document.getElementById(
        "servico"
    );

if (servicoSelect) {

    servicoSelect
        .addEventListener(
            "change",
            () => {

                const opcao =
                    servicoSelect
                        .options[
                            servicoSelect
                                .selectedIndex
                        ];

                const valor =
                    document.getElementById(
                        "valor"
                    );

                if (
                    valor &&
                    opcao &&
                    opcao.dataset.preco
                ) {

                    valor.value =
                        Number(
                            opcao.dataset.preco
                        ).toFixed(2);
                }
            }
        );
}


/* ==========================================================
   VOLTAR NOVO AGENDAMENTO
========================================================== */

const voltarNovoAgendamento =
    document.getElementById(
        "voltarNovoAgendamento"
    );

if (voltarNovoAgendamento) {

    voltarNovoAgendamento
        .addEventListener(
            "click",
            () =>
                mostrarTela("agenda")
        );
}


/* ==========================================================
   DETALHES — VOLTAR
========================================================== */

const voltarDetalhes =
    document.getElementById(
        "voltarDetalhesAgendamento"
    );

if (voltarDetalhes) {

    voltarDetalhes
        .addEventListener(
            "click",
            () => {

                renderizarAgenda();

                mostrarTela(
                    "agenda"
                );
            }
        );
}


/* ==========================================================
   INICIAR ATENDIMENTO
========================================================== */

const btnIniciar =
    document.getElementById(
        "btnIniciarAtendimento"
    );

if (btnIniciar) {

    btnIniciar
        .addEventListener(
            "click",
            () =>
                alterarStatusAgendamento(
                    "atendimento"
                )
        );
}


/* ==========================================================
   CONCLUIR ATENDIMENTO
========================================================== */

const btnConcluir =
    document.getElementById(
        "btnConcluirAtendimento"
    );

if (btnConcluir) {

    btnConcluir
        .addEventListener(
            "click",
            () =>
                alterarStatusAgendamento(
                    "concluido"
                )
        );
}


/* ==========================================================
   CANCELAR ATENDIMENTO
========================================================== */

const btnCancelar =
    document.getElementById(
        "btnCancelarAtendimento"
    );

if (btnCancelar) {

    btnCancelar
        .addEventListener(
            "click",
            () => {

                if (
                    !confirm(
                        "Cancelar este atendimento?"
                    )
                ) {
                    return;
                }

                alterarStatusAgendamento(
                    "cancelado"
                );
            }
        );
}


/* ==========================================================
   CLIENTES — BUSCA
========================================================== */

const buscaCliente =
    document.getElementById(
        "buscaCliente"
    );

if (buscaCliente) {

    buscaCliente
        .addEventListener(
            "input",
            () =>
                renderizarClientes(
                    buscaCliente.value
                )
        );
}


/* ==========================================================
   CLIENTES — ADICIONAR
========================================================== */

const btnAdicionarCliente =
    document.getElementById(
        "btnAdicionarCliente"
    );

if (btnAdicionarCliente) {

    btnAdicionarCliente
        .addEventListener(
            "click",
            abrirNovoCliente
        );
}


const btnCadastrarPrimeiroCliente =
    document.getElementById(
        "btnCadastrarPrimeiroCliente"
    );

if (btnCadastrarPrimeiroCliente) {

    btnCadastrarPrimeiroCliente
        .addEventListener(
            "click",
            abrirNovoCliente
        );
}


/* ==========================================================
   CLIENTES — FORM
========================================================== */

const formCliente =
    document.getElementById(
        "formCliente"
    );

if (formCliente) {

    formCliente
        .addEventListener(
            "submit",
            salvarCliente
        );
}


/* ==========================================================
   CLIENTES — VOLTAR
========================================================== */

const voltarClientes =
    document.getElementById(
        "voltarClientes"
    );

if (voltarClientes) {

    voltarClientes
        .addEventListener(
            "click",
            () =>
                mostrarTela("inicio")
        );
}


const voltarNovoCliente =
    document.getElementById(
        "voltarNovoCliente"
    );

if (voltarNovoCliente) {

    voltarNovoCliente
        .addEventListener(
            "click",
            () =>
                mostrarTela("clientes")
        );
}


const voltarFichaCliente =
    document.getElementById(
        "voltarFichaCliente"
    );

if (voltarFichaCliente) {

    voltarFichaCliente
        .addEventListener(
            "click",
            () => {

                clienteFichaAtual =
                    null;

                renderizarClientes();

                mostrarTela(
                    "clientes"
                );
            }
        );
}


/* ==========================================================
   EDITAR CLIENTE
========================================================== */

const btnEditarCliente =
    document.getElementById(
        "btnEditarCliente"
    );

if (btnEditarCliente) {

    btnEditarCliente
        .addEventListener(
            "click",
            editarClienteAtual
        );
}


/* ==========================================================
   EXCLUIR CLIENTE
========================================================== */

const btnExcluirCliente =
    document.getElementById(
        "btnExcluirCliente"
    );

if (btnExcluirCliente) {

    btnExcluirCliente
        .addEventListener(
            "click",
            excluirClienteAtual
        );
}


/* ==========================================================
   WHATSAPP
========================================================== */

const btnWhatsAppCliente =
    document.getElementById(
        "btnWhatsAppCliente"
    );

if (btnWhatsAppCliente) {

    btnWhatsAppCliente
        .addEventListener(
            "click",
            abrirWhatsAppCliente
        );
}


/* ==========================================================
   SERVIÇOS — BOTÕES
========================================================== */

const btnAdicionarServico =
    document.getElementById(
        "btnAdicionarServico"
    );

if (btnAdicionarServico) {

    btnAdicionarServico
        .addEventListener(
            "click",
            abrirNovoServico
        );
}


const btnCadastrarPrimeiroServico =
    document.getElementById(
        "btnCadastrarPrimeiroServico"
    );

if (btnCadastrarPrimeiroServico) {

    btnCadastrarPrimeiroServico
        .addEventListener(
            "click",
            abrirNovoServico
        );
}


/* ==========================================================
   SERVIÇOS — VOLTAR
========================================================== */

const voltarServicos =
    document.getElementById(
        "voltarServicos"
    );

if (voltarServicos) {

    voltarServicos
        .addEventListener(
            "click",
            () =>
                mostrarTela("inicio")
        );
}


const voltarNovoServico =
    document.getElementById(
        "voltarNovoServico"
    );

if (voltarNovoServico) {

    voltarNovoServico
        .addEventListener(
            "click",
            () =>
                mostrarTela("servicos")
        );
}


/* ==========================================================
   FORMULÁRIO DE SERVIÇO
========================================================== */

const formServico =
    document.getElementById(
        "formServico"
    );

if (formServico) {

    formServico
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const nome =
                    document.getElementById(
                        "novoServicoNome"
                    );

                const preco =
                    document.getElementById(
                        "novoServicoPreco"
                    );

                const duracao =
                    document.getElementById(
                        "novoServicoDuracao"
                    );

                const ativo =
                    document.getElementById(
                        "novoServicoAtivo"
                    );

                if (
                    !nome ||
                    !nome.value.trim()
                ) {

                    mostrarMensagem(
                        "Digite o nome do serviço."
                    );

                    return;
                }

                const servicos =
                    obterDados(
                        CHAVES.servicos
                    );

                const editando =
                    formServico
                        .dataset
                        .editando;


                if (editando) {

                    const index =
                        servicos.findIndex(
                            item =>
                                String(
                                    item.id
                                ) ===
                                String(
                                    editando
                                )
                        );

                    if (
                        index === -1
                    ) {

                        mostrarMensagem(
                            "Serviço não encontrado."
                        );

                        return;
                    }

                    servicos[index].nome =
                        nome.value.trim();

                    servicos[index].preco =
                        Number(
                            preco?.value || 0
                        );

                    servicos[index].duracao =
                        Number(
                            duracao?.value || 0
                        );

                    servicos[index].ativo =
                        ativo
                            ? ativo.checked
                            : true;

                    mostrarMensagem(
                        "Serviço atualizado."
                    );

                } else {

                    servicos.push({

                        id:
                            gerarId(),

                        nome:
                            nome.value.trim(),

                        preco:
                            Number(
                                preco?.value || 0
                            ),

                        duracao:
                            Number(
                                duracao?.value || 0
                            ),

                        ativo:
                            ativo
                                ? ativo.checked
                                : true,

                        criadoEm:
                            new Date()
                                .toISOString()

                    });

                    mostrarMensagem(
                        "Serviço cadastrado."
                    );
                }


                if (
                    !salvarDados(
                        CHAVES.servicos,
                        servicos
                    )
                ) {
                    return;
                }

                delete formServico
                    .dataset
                    .editando;

                renderizarServicos();

                atualizarSelectServicos();

                mostrarTela(
                    "servicos"
                );
            }
        );
}


/* =====================================================
   MENU LATERAL
   ===================================================== */

const menuLateral = document.getElementById("menuLateral");
const menuOverlay = document.getElementById("menuOverlay");
const btnMenu = document.getElementById("btnMenu");
const btnFecharMenu = document.getElementById("btnFecharMenu");


function abrirMenu() {

    if (!menuLateral || !menuOverlay) return;

    menuLateral.classList.add("ativo");
    menuOverlay.classList.add("ativo");

    document.body.classList.add("menu-aberto");
}


function fecharMenu() {

    if (!menuLateral || !menuOverlay) return;

    menuLateral.classList.remove("ativo");
    menuOverlay.classList.remove("ativo");

    document.body.classList.remove("menu-aberto");
}


/* BOTÃO HAMBÚRGUER */

if (btnMenu) {

    btnMenu.addEventListener("click", function () {

        abrirMenu();

    });

}


/* BOTÃO X */

if (btnFecharMenu) {

    btnFecharMenu.addEventListener("click", function () {

        fecharMenu();

    });

}


/* CLICAR FORA */

if (menuOverlay) {

    menuOverlay.addEventListener("click", function () {

        fecharMenu();

    });

}


/* ITENS DO MENU */

document.querySelectorAll(".menu-item").forEach(function (item) {

    item.addEventListener("click", function () {

        const tela = item.dataset.menuTela;

        if (!tela) return;

        fecharMenu();

        setTimeout(function () {

            mostrarTela(tela);

        }, 150);

    });

});


/* ==========================================================
   NOTIFICAÇÕES
========================================================== */

const btnNotificacao =
    document.getElementById(
        "btnNotificacao"
    );

if (btnNotificacao) {

    btnNotificacao
        .addEventListener(
            "click",
            () =>
                mostrarMensagem(
                    "Nenhuma nova notificação."
                )
        );
}


/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

function iniciarBarberPro() {

    console.log(
        "================================"
    );

    console.log(
        "BARBERPRO INICIANDO..."
    );

    console.log(
        "================================"
    );


    if (!testarArmazenamento()) {

        console.error(
            "LocalStorage não disponível."
        );

        mostrarMensagem(
            "Atenção: armazenamento indisponível."
        );
    }


    criarServicosPadrao();

    atualizarSelectServicos();

    atualizarSugestoesClientes();

    renderizarCalendario();

    renderizarAgenda();

    renderizarClientes();

    renderizarServicos();

    atualizarResumoHome();

    renderizarFinanceiro();

    mostrarTela(
        "inicio"
    );


    console.log(
        "Agendamentos:",
        obterDados(
            CHAVES.agendamentos
        )
    );

    console.log(
        "Clientes:",
        obterDados(
            CHAVES.clientes
        )
    );

    console.log(
        "Serviços:",
        obterDados(
            CHAVES.servicos
        )
    );

    console.log(
        "BARBERPRO pronto."
    );
}


/* ==========================================================
   INICIAR
========================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        iniciarBarberPro
    );

} else {

    iniciarBarberPro();
}
