/* ==========================================================
   BARBERPRO
   SISTEMA DE GESTÃO PARA BARBEARIA
========================================================== */


/* ==========================================================
   CHAVES DO LOCALSTORAGE
========================================================== */

const CHAVES = {

    agendamentos:
        "barberpro_agendamentos",

    clientes:
        "barberpro_clientes",

    servicos:
        "barberpro_servicos"

};


/* ==========================================================
   VARIÁVEIS GLOBAIS
========================================================== */

let telaAtual = "inicio";

let clienteFichaAtual = null;

let agendamentoAtual = null;

let dataAgendaSelecionada =
    dataHojeISO();

let mesAgendaAtual =
    new Date();

mesAgendaAtual.setDate(1);


/* ==========================================================
   FUNÇÕES DE ARMAZENAMENTO
========================================================== */

function obterDados(chave) {

    try {

        const dados =
            localStorage.getItem(chave);

        if (!dados) {

            return [];

        }

        return JSON.parse(dados);

    } catch (erro) {

        console.error(
            "Erro ao obter dados:",
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
            erro
        );

        mostrarMensagem(
            "Não foi possível salvar os dados."
        );

        return false;

    }

}


/* ==========================================================
   TESTAR ARMAZENAMENTO
========================================================== */

function testarArmazenamento() {

    try {

        const teste =
            "__barberpro_teste__";

        localStorage.setItem(
            teste,
            "ok"
        );

        localStorage.removeItem(
            teste
        );

        return true;

    } catch (erro) {

        console.error(
            "LocalStorage indisponível:",
            erro
        );

        return false;

    }

}


/* ==========================================================
   GERAR ID
========================================================== */

function gerarId() {

    return Date.now().toString()
        + "_"
        + Math.random()
            .toString(36)
            .substring(2, 9);

}


/* ==========================================================
   DATA DE HOJE
========================================================== */

function dataHojeISO() {

    const hoje =
        new Date();

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


/* ==========================================================
   FORMATAR DATA
========================================================== */

function formatarData(data) {

    if (!data) {

        return "";

    }

    const partes =
        String(data).split("-");

    if (partes.length !== 3) {

        return data;

    }

    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );

}


/* ==========================================================
   DATA POR EXTENSO
========================================================== */

function formatarDataLonga(data) {

    if (!data) {

        return "";

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

    const dias = [

        "domingo",
        "segunda-feira",
        "terça-feira",
        "quarta-feira",
        "quinta-feira",
        "sexta-feira",
        "sábado"

    ];

    const meses = [

        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro"

    ];

    return (
        dias[objeto.getDay()] +
        ", " +
        objeto.getDate() +
        " de " +
        meses[objeto.getMonth()] +
        " de " +
        objeto.getFullYear()
    );

}


/* ==========================================================
   FORMATAR MOEDA
========================================================== */

function formatarMoeda(valor) {

    const numero =
        Number(valor) || 0;

    return numero.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* ==========================================================
   GERAR INICIAIS
========================================================== */

function gerarIniciais(nome) {

    if (!nome) {

        return "?";

    }

    const partes =
        String(nome)
            .trim()
            .split(/\s+/);

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


/* ==========================================================
   ESCAPAR HTML
========================================================== */

function escaparHTML(valor) {

    if (valor === null ||
        valor === undefined) {

        return "";

    }

    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ==========================================================
   MENSAGEM
========================================================== */

function mostrarMensagem(mensagem) {

    let elemento =
        document.getElementById(
            "mensagemSistema"
        );

    if (!elemento) {

        elemento =
            document.createElement("div");

        elemento.id =
            "mensagemSistema";

        elemento.className =
            "mensagem-sistema";

        document.body.appendChild(
            elemento
        );

    }

    elemento.textContent =
        mensagem;

    elemento.classList.add(
        "mostrar"
    );

    clearTimeout(
        elemento._timeoutBarberPro
    );

    elemento._timeoutBarberPro =
        setTimeout(
            function () {

                elemento.classList.remove(
                    "mostrar"
                );

            },
            2800
        );

}


/* ==========================================================
   TELAS DO SISTEMA
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

    novoAgendamento:
        document.getElementById(
            "telaNovoAgendamento"
        ),

    detalhesAgendamento:
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
        ),

    configuracoes:
        document.getElementById(
            "telaConfiguracoes"
        )

};


/* ==========================================================
   MOSTRAR TELA
========================================================== */

function mostrarTela(nomeTela) {

    Object.keys(telas)
        .forEach(
            function (nome) {

                const tela =
                    telas[nome];

                if (!tela) {

                    return;

                }

                tela.classList.remove(
                    "ativa"
                );

                tela.style.display =
                    "none";

            }
        );


    const telaSelecionada =
        telas[nomeTela];

    if (!telaSelecionada) {

        console.warn(
            "Tela não encontrada:",
            nomeTela
        );

        return;

    }


    telaSelecionada.classList.add(
        "ativa"
    );

    telaSelecionada.style.display =
        "block";


    telaAtual =
        nomeTela;


    atualizarNavegacao();

    window.scrollTo(
        {
            top: 0,
            behavior: "smooth"
        }
    );

}


/* ==========================================================
   ATUALIZAR NAVEGAÇÃO
========================================================== */

function atualizarNavegacao() {

    document
        .querySelectorAll(".nav-item")
        .forEach(
            function (item) {

                item.classList.remove(
                    "ativo"
                );

                if (
                    item.dataset &&
                    item.dataset.tela ===
                    telaAtual
                ) {

                    item.classList.add(
                        "ativo"
                    );

                }

            }
        );


    document
        .querySelectorAll(".menu-item")
        .forEach(
            function (item) {

                item.classList.remove(
                    "ativo"
                );

                if (
                    item.dataset &&
                    item.dataset.menuTela ===
                    telaAtual
                ) {

                    item.classList.add(
                        "ativo"
                    );

                }

            }
        );

}


/* ==========================================================
   SERVIÇOS PADRÃO
========================================================== */

function criarServicosPadrao() {

    const servicos =
        obterDados(
            CHAVES.servicos
        );


    if (
        Array.isArray(servicos) &&
        servicos.length > 0
    ) {

        return;

    }


    const padrao = [

        {
            id: gerarId(),
            nome: "Corte",
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
   RENDERIZAR SERVIÇOS
========================================================== */

function renderizarServicos() {

    const lista =
        document.getElementById(
            "listaServicos"
        );

    if (!lista) {

        return;

    }


    const servicos =
        obterDados(
            CHAVES.servicos
        );


    if (
        !Array.isArray(servicos) ||
        servicos.length === 0
    ) {

        lista.innerHTML = `
            <div class="estado-vazio">
                <div class="estado-vazio-icone">
                    ✂
                </div>

                <h3>
                    Nenhum serviço cadastrado
                </h3>

                <p>
                    Cadastre os serviços da sua barbearia.
                </p>
            </div>
        `;

        return;

    }


    lista.innerHTML =
        servicos
            .filter(
                function (servico) {

                    return servico.ativo !== false;

                }
            )
            .map(
                function (servico) {

                    return `
                        <div
                            class="card-servico"
                            data-id="${escaparHTML(servico.id)}"
                        >

                            <div class="servico-info">

                                <div class="servico-icone">
                                    ✂
                                </div>

                                <div>

                                    <h3>
                                        ${escaparHTML(servico.nome)}
                                    </h3>

                                    <span>
                                        ${formatarDuracao(servico.duracao)}
                                    </span>

                                </div>

                            </div>


                            <div class="servico-direita">

                                <strong>
                                    ${formatarMoeda(servico.preco)}
                                </strong>

                                <div class="servico-acoes">

                                    <button
                                        type="button"
                                        onclick="editarServico('${escaparHTML(servico.id)}')"
                                    >
                                        ✎
                                    </button>

                                    <button
                                        type="button"
                                        onclick="excluirServico('${escaparHTML(servico.id)}')"
                                    >
                                        🗑
                                    </button>

                                </div>

                            </div>

                        </div>
                    `;

                }
            )
            .join("");

}


/* ==========================================================
   FORMATAR DURAÇÃO
========================================================== */

function formatarDuracao(minutos) {

    const valor =
        Number(minutos) || 0;


    if (valor < 60) {

        return `${valor} min`;

    }


    const horas =
        Math.floor(
            valor / 60
        );

    const restante =
        valor % 60;


    if (restante === 0) {

        return (
            horas === 1
                ? "1 hora"
                : `${horas} horas`
        );

    }


    return `${horas}h ${restante}min`;

}


/* ==========================================================
   NOVO SERVIÇO
========================================================== */

function abrirNovoServico() {

    const formulario =
        document.getElementById(
            "formNovoServico"
        );

    if (formulario) {

        formulario.reset();

    }


    const id =
        document.getElementById(
            "servicoId"
        );

    if (id) {

        id.value = "";

    }


    const titulo =
        document.getElementById(
            "tituloNovoServico"
        );

    if (titulo) {

        titulo.textContent =
            "Novo serviço";

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
            function (item) {

                return String(item.id) ===
                    String(id);

            }
        );


    if (!servico) {

        mostrarMensagem(
            "Serviço não encontrado."
        );

        return;

    }


    const campoId =
        document.getElementById(
            "servicoId"
        );

    const campoNome =
        document.getElementById(
            "servicoNome"
        );

    const campoPreco =
        document.getElementById(
            "servicoPreco"
        );

    const campoDuracao =
        document.getElementById(
            "servicoDuracao"
        );


    if (campoId) {

        campoId.value =
            servico.id;

    }

    if (campoNome) {

        campoNome.value =
            servico.nome;

    }

    if (campoPreco) {

        campoPreco.value =
            servico.preco;

    }

    if (campoDuracao) {

        campoDuracao.value =
            servico.duracao;

    }


    const titulo =
        document.getElementById(
            "tituloNovoServico"
        );

    if (titulo) {

        titulo.textContent =
            "Editar serviço";

    }


    mostrarTela(
        "novoServico"
    );

}


/* ==========================================================
   EXCLUIR SERVIÇO
========================================================== */

function excluirServico(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir este serviço?"
        );


    if (!confirmar) {

        return;

    }


    let servicos =
        obterDados(
            CHAVES.servicos
        );


    servicos =
        servicos.filter(
            function (servico) {

                return String(servico.id) !==
                    String(id);

            }
        );


    salvarDados(
        CHAVES.servicos,
        servicos
    );


    atualizarSelectServicos();

    renderizarServicos();


    mostrarMensagem(
        "Serviço excluído."
    );

}


/* ==========================================================
   ATUALIZAR SELECT DE SERVIÇOS
========================================================== */

function atualizarSelectServicos() {

    const select =
        document.getElementById(
            "agendamentoServico"
        );


    if (!select) {

        return;

    }


    const servicos =
        obterDados(
            CHAVES.servicos
        );


    const valorAtual =
        select.value;


    select.innerHTML = `
        <option value="">
            Selecione um serviço
        </option>
    `;


    servicos
        .filter(
            function (servico) {

                return servico.ativo !== false;

            }
        )
        .forEach(
            function (servico) {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    servico.id;

                option.textContent =
                    `${servico.nome} — ${formatarMoeda(servico.preco)}`;

                option.dataset.duracao =
                    servico.duracao || 0;

                option.dataset.preco =
                    servico.preco || 0;

                select.appendChild(
                    option
                );

            }
        );


    if (valorAtual) {

        select.value =
            valorAtual;

    }

}


/* ==========================================================
   CLIENTES
========================================================== */

function renderizarClientes() {

    const lista =
        document.getElementById(
            "listaClientes"
        );

    if (!lista) {

        return;

    }


    const clientes =
        obterDados(
            CHAVES.clientes
        );


    if (
        !Array.isArray(clientes) ||
        clientes.length === 0
    ) {

        lista.innerHTML = `
            <div class="estado-vazio">

                <div class="estado-vazio-icone">
                    👤
                </div>

                <h3>
                    Nenhum cliente cadastrado
                </h3>

                <p>
                    Cadastre seu primeiro cliente.
                </p>

            </div>
        `;

        return;

    }


    const clientesOrdenados =
        [...clientes].sort(
            function (a, b) {

                return String(a.nome || "")
                    .localeCompare(
                        String(b.nome || ""),
                        "pt-BR"
                    );

            }
        );


    lista.innerHTML =
        clientesOrdenados
            .map(
                function (cliente) {

                    const atendimentos =
                        contarAtendimentosCliente(
                            cliente.id
                        );


                    return `
                        <button
                            type="button"
                            class="card-cliente"
                            onclick="abrirFichaCliente('${escaparHTML(cliente.id)}')"
                        >

                            <div class="cliente-avatar">
                                ${gerarIniciais(cliente.nome)}
                            </div>

                            <div class="cliente-info">

                                <strong>
                                    ${escaparHTML(cliente.nome)}
                                </strong>

                                <span>
                                    ${escaparHTML(cliente.telefone || "Sem telefone")}
                                </span>

                            </div>

                            <div class="cliente-atendimentos">

                                <strong>
                                    ${atendimentos}
                                </strong>

                                <span>
                                    atendimentos
                                </span>

                            </div>

                        </button>
                    `;

                }
            )
            .join("");

}


/* ==========================================================
   CONTAR ATENDIMENTOS
========================================================== */

function contarAtendimentosCliente(idCliente) {

    const agendamentos =
        obterDados(
            CHAVES.agendamentos
        );


    return agendamentos.filter(
        function (agendamento) {

            return String(
                agendamento.clienteId
            ) === String(idCliente)

            &&
            agendamento.status !==
                "cancelado";

        }
    ).length;

}


/* ==========================================================
   SUGESTÕES DE CLIENTES
========================================================== */

function atualizarSugestoesClientes() {

    const datalist =
        document.getElementById(
            "sugestoesClientes"
        );


    if (!datalist) {

        return;

    }


    const clientes =
        obterDados(
            CHAVES.clientes
        );


    datalist.innerHTML =
        clientes
            .map(
                function (cliente) {

                    return `
                        <option
                            value="${escaparHTML(cliente.nome)}"
                            data-id="${escaparHTML(cliente.id)}"
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

    const formulario =
        document.getElementById(
            "formNovoCliente"
        );


    if (formulario) {

        formulario.reset();

    }


    const id =
        document.getElementById(
            "clienteId"
        );


    if (id) {

        id.value = "";

    }


    const titulo =
        document.getElementById(
            "tituloNovoCliente"
        );


    if (titulo) {

        titulo.textContent =
            "Novo cliente";

    }


    mostrarTela(
        "novoCliente"
    );

}


/* ==========================================================
   SALVAR CLIENTE
========================================================== */

function salvarCliente() {

    const idCampo =
        document.getElementById(
            "clienteId"
        );

    const nomeCampo =
        document.getElementById(
            "clienteNome"
        );

    const telefoneCampo =
        document.getElementById(
            "clienteTelefone"
        );

    const observacoesCampo =
        document.getElementById(
            "clienteObservacoes"
        );


    const id =
        idCampo?.value ||
        gerarId();

    const nome =
        nomeCampo?.value
            .trim() || "";

    const telefone =
        telefoneCampo?.value
            .trim() || "";

    const observacoes =
        observacoesCampo?.value
            .trim() || "";


    if (!nome) {

        mostrarMensagem(
            "Informe o nome do cliente."
        );

        return;

    }


    let clientes =
        obterDados(
            CHAVES.clientes
        );


    const indice =
        clientes.findIndex(
            function (cliente) {

                return String(cliente.id) ===
                    String(id);

            }
        );


    const cliente = {

        id: id,

        nome: nome,

        telefone: telefone,

        observacoes: observacoes,

        atualizadoEm:
            new Date().toISOString()

    };


    if (indice >= 0) {

        clientes[indice] =
            {
                ...clientes[indice],
                ...cliente
            };

    } else {

        cliente.criadoEm =
            new Date().toISOString();

        clientes.push(
            cliente
        );

    }


    salvarDados(
        CHAVES.clientes,
        clientes
    );


    atualizarSugestoesClientes();

    renderizarClientes();


    mostrarMensagem(
        indice >= 0
            ? "Cliente atualizado."
            : "Cliente cadastrado."
    );


    mostrarTela(
        "clientes"
    );

}


/* ==========================================================
   ABRIR FICHA DO CLIENTE
========================================================== */

function abrirFichaCliente(id) {

    const clientes =
        obterDados(
            CHAVES.clientes
        );


    const cliente =
        clientes.find(
            function (item) {

                return String(item.id) ===
                    String(id);

            }
        );


    if (!cliente) {

        mostrarMensagem(
            "Cliente não encontrado."
        );

        return;

    }


    clienteFichaAtual =
        cliente.id;


    const nome =
        document.getElementById(
            "fichaClienteNome"
        );

    const telefone =
        document.getElementById(
            "fichaClienteTelefone"
        );

    const avatar =
        document.getElementById(
            "fichaClienteAvatar"
        );

    const observacoes =
        document.getElementById(
            "fichaClienteObservacoes"
        );


    if (nome) {

        nome.textContent =
            cliente.nome;

    }

    if (telefone) {

        telefone.textContent =
            cliente.telefone ||
            "Telefone não informado";

    }

    if (avatar) {

        avatar.textContent =
            gerarIniciais(
                cliente.nome
            );

    }

    if (observacoes) {

        observacoes.textContent =
            cliente.observacoes ||
            "Nenhuma observação.";

    }


    atualizarResumoFicha();

    renderizarHistoricoCliente();


    mostrarTela(
        "fichaCliente"
    );

}


/* ==========================================================
   RESUMO DA FICHA
========================================================== */

function atualizarResumoFicha() {

    if (!clienteFichaAtual) {

        return;

    }


    const agendamentos =
        obterDados(
            CHAVES.agendamentos
        );


    const historico =
        agendamentos.filter(
            function (agendamento) {

                return String(
                    agendamento.clienteId
                ) ===
                    String(clienteFichaAtual);

            }
        );


    const realizados =
        historico.filter(
            function (agendamento) {

                return (
                    agendamento.status ===
                    "concluido"
                );

            }
        );


    const total =
        realizados.reduce(
            function (soma, agendamento) {

                return soma +
                    Number(
                        agendamento.preco ||
                        0
                    );

            },
            0
        );


    const quantidade =
        document.getElementById(
            "fichaClienteQuantidade"
        );

    const valor =
        document.getElementById(
            "fichaClienteTotal"
        );


    if (quantidade) {

        quantidade.textContent =
            realizados.length;

    }

    if (valor) {

        valor.textContent =
            formatarMoeda(total);

    }

}


/* ==========================================================
   HISTÓRICO DO CLIENTE
========================================================== */

function renderizarHistoricoCliente() {

    const lista =
        document.getElementById(
            "historicoCliente"
        );


    if (!lista) {

        return;

    }


    if (!clienteFichaAtual) {

        lista.innerHTML = "";

        return;

    }


    const agendamentos =
        obterDados(
            CHAVES.agendamentos
        );


    const historico =
        agendamentos
            .filter(
                function (agendamento) {

                    return String(
                        agendamento.clienteId
                    ) ===
                        String(clienteFichaAtual);

                }
            )
            .sort(
                function (a, b) {

                    return String(
                        b.data || ""
                    ).localeCompare(
                        String(a.data || "")
                    );

                }
            );


    if (historico.length === 0) {

        lista.innerHTML = `
            <div class="estado-vazio pequeno">

                <p>
                    Nenhum atendimento registrado.
                </p>

            </div>
        `;

        return;

    }


    lista.innerHTML =
        historico
            .map(
                function (agendamento) {

                    return `
                        <div class="historico-item">

                            <div>

                                <strong>
                                    ${escaparHTML(agendamento.servicoNome || "Serviço")}
                                </strong>

                                <span>
                                    ${formatarData(agendamento.data)}
                                    às
                                    ${escaparHTML(agendamento.hora || "")}
                                </span>

                            </div>

                            <div>

                                <strong>
                                    ${formatarMoeda(agendamento.preco || 0)}
                                </strong>

                                <span>
                                    ${escaparHTML(agendamento.status || "")}
                                </span>

                            </div>

                        </div>
                    `;

                }
            )
            .join("");

}


/* ==========================================================
   EDITAR CLIENTE ATUAL
========================================================== */

function editarClienteAtual() {

    if (!clienteFichaAtual) {

        return;

    }


    const clientes =
        obterDados(
            CHAVES.clientes
        );


    const cliente =
        clientes.find(
            function (item) {

                return String(item.id) ===
                    String(clienteFichaAtual);

            }
        );


    if (!cliente) {

        return;

    }


    const id =
        document.getElementById(
            "clienteId"
        );

    const nome =
        document.getElementById(
            "clienteNome"
        );

    const telefone =
        document.getElementById(
            "clienteTelefone"
        );

    const observacoes =
        document.getElementById(
            "clienteObservacoes"
        );


    if (id) {

        id.value =
            cliente.id;

    }

    if (nome) {

        nome.value =
            cliente.nome || "";

    }

    if (telefone) {

        telefone.value =
            cliente.telefone || "";

    }

    if (observacoes) {

        observacoes.value =
            cliente.observacoes || "";

    }


    const titulo =
        document.getElementById(
            "tituloNovoCliente"
        );


    if (titulo) {

        titulo.textContent =
            "Editar cliente";

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


    const confirmar =
        confirm(
            "Deseja realmente excluir este cliente?"
        );


    if (!confirmar) {

        return;

    }


    let clientes =
        obterDados(
            CHAVES.clientes
        );


    clientes =
        clientes.filter(
            function (cliente) {

                return String(cliente.id) !==
                    String(clienteFichaAtual);

            }
        );


    salvarDados(
        CHAVES.clientes,
        clientes
    );


    clienteFichaAtual =
        null;


    atualizarSugestoesClientes();

    renderizarClientes();


    mostrarMensagem(
        "Cliente excluído."
    );


    mostrarTela(
        "clientes"
    );

}


/* ==========================================================
   WHATSAPP DO CLIENTE
========================================================== */

function abrirWhatsAppCliente() {

    if (!clienteFichaAtual) {

        return;

    }


    const clientes =
        obterDados(
            CHAVES.clientes
        );


    const cliente =
        clientes.find(
            function (item) {

                return String(item.id) ===
                    String(clienteFichaAtual);

            }
        );


    if (!cliente) {

        return;

    }


    let telefone =
        String(
            cliente.telefone || ""
        )
        .replace(
            /\D/g,
            ""
        );


    if (!telefone) {

        mostrarMensagem(
            "Este cliente não possui telefone."
        );

        return;

    }


    if (
        telefone.length === 10 ||
        telefone.length === 11
    ) {

        telefone =
            "55" +
            telefone;

    }


    const mensagem =
        encodeURIComponent(
            `Olá ${cliente.nome}! Tudo bem?`
        );


    const url =
        `https://wa.me/${telefone}?text=${mensagem}`;


    window.open(
        url,
        "_blank"
    );

}


/* ==========================================================
   AGENDA
========================================================== */

function renderizarCalendario() {

    const container =
        document.getElementById(
            "calendarioDias"
        );


    if (!container) {

        return;

    }


    const ano =
        mesAgendaAtual.getFullYear();

    const mes =
        mesAgendaAtual.getMonth();


    const primeiroDia =
        new Date(
            ano,
            mes,
            1
        );


    const ultimoDia =
        new Date(
            ano,
            mes + 1,
            0
        );


    const totalDias =
        ultimoDia.getDate();


    const inicioSemana =
        primeiroDia.getDay();


    const hoje =
        dataHojeISO();


    let html = "";


    for (
        let i = 0;
        i < inicioSemana;
        i++
    ) {

        html += `
            <div class="dia-calendario vazio"></div>
        `;

    }


    for (
        let dia = 1;
        dia <= totalDias;
        dia++
    ) {

        const data =
            `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;


        const selecionado =
            data ===
            dataAgendaSelecionada
                ? "selecionado"
                : "";


        const hojeClasse =
            data === hoje
                ? "hoje"
                : "";


        html += `
            <button
                type="button"
                class="dia-calendario ${selecionado} ${hojeClasse}"
                onclick="selecionarDataAgenda('${data}')"
            >
                ${dia}
            </button>
        `;

    }


    container.innerHTML =
        html;


    const tituloMes =
        document.getElementById(
            "mesAgenda"
        );


    if (tituloMes) {

        tituloMes.textContent =
            nomeMes(mes) +
            " " +
            ano;

    }

}


/* ==========================================================
   NOME DO MÊS
========================================================== */

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


/* ==========================================================
   NOME DO DIA
========================================================== */

function nomeDiaSemana(data) {

    const partes =
        String(data).split("-");


    if (partes.length !== 3) {

        return "";

    }


    const objeto =
        new Date(
            Number(partes[0]),
            Number(partes[1]) - 1,
            Number(partes[2])
        );


    const dias = [

        "domingo",
        "segunda-feira",
        "terça-feira",
        "quarta-feira",
        "quinta-feira",
        "sexta-feira",
        "sábado"

    ];


    return dias[
        objeto.getDay()
    ];

}


/* ==========================================================
   SELECIONAR DATA
========================================================== */

function selecionarDataAgenda(data) {

    dataAgendaSelecionada =
        data;


    renderizarCalendario();

    renderizarAgenda();

}


/* ==========================================================
   RENDERIZAR AGENDA
========================================================== */

function renderizarAgenda() {

    const lista =
        document.getElementById(
            "listaAgendamentos"
        );


    if (!lista) {

        return;

    }


    renderizarFuncionamentoAgenda();


    const agendamentos =
        obterDados(
            CHAVES.agendamentos
        );


    const doDia =
        agendamentos
            .filter(
                function (agendamento) {

                    return (
                        agendamento.data ===
                        dataAgendaSelecionada
                    );

                }
            )
            .sort(
                function (a, b) {

                    return String(
                        a.hora || ""
                    ).localeCompare(
                        String(
                            b.hora || ""
                        )
                    );

                }
            );


    const titulo =
        document.getElementById(
            "titulo-agenda-dia"
        );


    if (titulo) {

        titulo.textContent =
            formatarDataLonga(
                dataAgendaSelecionada
            );

    }


    if (doDia.length === 0) {

        lista.innerHTML = `

            <div class="estado-vazio">

                <div class="estado-vazio-icone">
                    ✂
                </div>

                <h3>
                    Nenhum agendamento
                </h3>

                <p>
                    Não há atendimentos para este dia.
                </p>

                <button
                    type="button"
                    class="botao-principal"
                    onclick="abrirNovoAgendamento()"
                >
                    + Novo agendamento
                </button>

            </div>

        `;

        return;

    }


    lista.innerHTML =
        doDia
            .map(
                function (agendamento) {

                    const status =
                        agendamento.status ||
                        "agendado";


                    const statusTexto = {

                        agendado:
                            "Agendado",

                        em_atendimento:
                            "Em atendimento",

                        concluido:
                            "Concluído",

                        cancelado:
                            "Cancelado"

                    };


                    return `

                        <button
                            type="button"
                            class="card-agendamento"
                            onclick="abrirDetalhesAgendamento('${escaparHTML(agendamento.id)}')"
                        >

                            <div class="agendamento-hora">

                                <strong>
                                    ${escaparHTML(agendamento.hora || "")}
                                </strong>

                                <span>
                                    ${formatarDuracao(agendamento.duracao || 0)}
                                </span>

                            </div>


                            <div class="agendamento-info">

                                <strong>
                                    ${escaparHTML(agendamento.clienteNome || "Cliente")}
                                </strong>

                                <span>
                                    ${escaparHTML(agendamento.servicoNome || "Serviço")}
                                </span>

                            </div>


                            <span
                                class="status-agendamento status-${escaparHTML(status)}"
                            >
                                ${statusTexto[status] || status}
                            </span>

                        </button>

                    `;

                }
            )
            .join("");

}


/* ==========================================================
   CHAVE DO DIA
========================================================== */

function obterChaveDia(data) {

    const partes =
        String(data).split("-");


    if (
        partes.length !== 3
    ) {

        return null;

    }


    const dataObjeto =
        new Date(
            Number(partes[0]),
            Number(partes[1]) - 1,
            Number(partes[2])
        );


    const dias = [

        "domingo",
        "segunda",
        "terca",
        "quarta",
        "quinta",
        "sexta",
        "sabado"

    ];


    return dias[
        dataObjeto.getDay()
    ];

}


/* ==========================================================
   CONFIGURAÇÃO
========================================================== */

const CONFIG_CHAVE =
    "barberpro_configuracoes";


/* ==========================================================
   HORÁRIOS PADRÃO
========================================================== */

const HORARIOS_PADRAO = {

    segunda: {

        nome: "Segunda-feira",

        aberto: true,

        abertura: "08:00",

        inicioIntervalo: "13:00",

        fimIntervalo: "15:00",

        fechamento: "18:00"

    },


    terca: {

        nome: "Terça-feira",

        aberto: true,

        abertura: "08:00",

        inicioIntervalo: "13:00",

        fimIntervalo: "15:00",

        fechamento: "18:00"

    },


    quarta: {

        nome: "Quarta-feira",

        aberto: true,

        abertura: "09:00",

        inicioIntervalo: "13:00",

        fimIntervalo: "15:00",

        fechamento: "18:00"

    },


    quinta: {

        nome: "Quinta-feira",

        aberto: true,

        abertura: "09:00",

        inicioIntervalo: "13:00",

        fimIntervalo: "15:00",

        fechamento: "18:00"

    },


    sexta: {

        nome: "Sexta-feira",

        aberto: true,

        abertura: "08:00",

        inicioIntervalo: "13:00",

        fimIntervalo: "15:00",

        fechamento: "18:00"

    },


    sabado: {

        nome: "Sábado",

        aberto: true,

        abertura: "08:00",

        inicioIntervalo: "",

        fimIntervalo: "",

        fechamento: "14:00"

    },


    domingo: {

        nome: "Domingo",

        aberto: false,

        abertura: "08:00",

        inicioIntervalo: "",

        fimIntervalo: "",

        fechamento: "12:00"

    }

};


/* ==========================================================
   OBTER HORÁRIO DE FUNCIONAMENTO
========================================================== */

function obterHorarioFuncionamento(data) {

    const dia =
        obterChaveDia(data);


    if (!dia) {

        return null;

    }


    const padrao =
        HORARIOS_PADRAO[dia];


    if (!padrao) {

        return null;

    }


    let configuracoes = {};


    try {

        configuracoes =
            JSON.parse(
                localStorage.getItem(
                    CONFIG_CHAVE
                )
            ) || {};

    } catch (erro) {

        configuracoes = {};

    }


    const horarios =
        configuracoes.horarios || {};


    const salvo =
        horarios[dia] || {};


    return {

        dia: dia,

        nome:
            padrao.nome,

        aberto:
            salvo.aberto !== undefined
                ? salvo.aberto
                : padrao.aberto,

        abertura:
            salvo.abertura ||
            padrao.abertura,

        inicioIntervalo:
            salvo.inicioIntervalo !== undefined
                ? salvo.inicioIntervalo
                : padrao.inicioIntervalo,

        fimIntervalo:
            salvo.fimIntervalo !== undefined
                ? salvo.fimIntervalo
                : padrao.fimIntervalo,

        fechamento:
            salvo.fechamento ||
            padrao.fechamento

    };

}


/* ==========================================================
   VALIDAR HORÁRIO DE FUNCIONAMENTO
========================================================== */

function validarHorarioFuncionamento(
    data,
    hora,
    duracao
) {

    const horario =
        obterHorarioFuncionamento(
            data
        );


    if (!horario) {

        return {

            valido: false,

            mensagem:
                "Horário de funcionamento não definido."

        };

    }


    if (!horario.aberto) {

        return {

            valido: false,

            mensagem:
                `A barbearia está fechada na ${horario.nome.toLowerCase()}.`

        };

    }


    if (
        !hora ||
        !horario.abertura ||
        !horario.fechamento
    ) {

        return {

            valido: false,

            mensagem:
                "Informe um horário válido."

        };

    }


    const minutosHora =
        converterHoraParaMinutos(
            hora
        );


    const abertura =
        converterHoraParaMinutos(
            horario.abertura
        );


    const fechamento =
        converterHoraParaMinutos(
            horario.fechamento
        );


    const duracaoMinutos =
        Number(duracao) || 0;


    const fimAtendimento =
        minutosHora +
        duracaoMinutos;


    if (
        minutosHora <
        abertura
    ) {

        return {

            valido: false,

            mensagem:
                `O atendimento começa às ${horario.abertura}.`

        };

    }


    if (
        minutosHora >=
        fechamento
    ) {

        return {

            valido: false,

            mensagem:
                `O atendimento deve começar antes das ${horario.fechamento}.`

        };

    }


    if (
        fimAtendimento >
        fechamento
    ) {

        return {

            valido: false,

            mensagem:
                "O serviço termina após o horário de fechamento."

        };

    }


    const inicioIntervalo =
        horario.inicioIntervalo
            ? converterHoraParaMinutos(
                horario.inicioIntervalo
            )
            : null;


    const fimIntervalo =
        horario.fimIntervalo
            ? converterHoraParaMinutos(
                horario.fimIntervalo
            )
            : null;


    if (
        inicioIntervalo !== null &&
        fimIntervalo !== null
    ) {

        if (
            minutosHora >=
                inicioIntervalo &&
            minutosHora <
                fimIntervalo
        ) {

            return {

                valido: false,

                mensagem:
                    `Esse horário está no intervalo da barbearia (${horario.inicioIntervalo} às ${horario.fimIntervalo}).`

            };

        }


        if (
            minutosHora <
                inicioIntervalo &&
            fimAtendimento >
                inicioIntervalo
        ) {

            return {

                valido: false,

                mensagem:
                    "O serviço atravessa o intervalo da barbearia."

            };

        }

    }


    return {

        valido: true,

        mensagem: ""

    };

}


/* ==========================================================
   CONVERTER HORA PARA MINUTOS
========================================================== */

function converterHoraParaMinutos(hora) {

    if (!hora) {

        return 0;

    }


    const partes =
        String(hora).split(":");


    if (partes.length < 2) {

        return 0;

    }


    return (
        Number(partes[0]) * 60 +
        Number(partes[1])
    );

}


/* ==========================================================
   FUNCIONAMENTO NA AGENDA
========================================================== */

function renderizarFuncionamentoAgenda() {

    const status =
        document.getElementById(
            "funcionamentoStatus"
        );


    const indicador =
        document.getElementById(
            "funcionamentoIndicador"
        );


    const horarioFuncionamento =
        document.getElementById(
            "horarioFuncionamento"
        );


    const intervaloFuncionamento =
        document.getElementById(
            "intervaloFuncionamento"
        );


    const horarioIntervalo =
        document.getElementById(
            "horarioIntervalo"
        );


    if (
        !status ||
        !indicador ||
        !horarioFuncionamento
    ) {

        return;

    }


    const horario =
        obterHorarioFuncionamento(
            dataAgendaSelecionada
        );


    if (!horario) {

        status.textContent =
            "Indisponível";

        indicador.textContent =
            "●";

        horarioFuncionamento.textContent =
            "Horário não definido";


        if (intervaloFuncionamento) {

            intervaloFuncionamento.style.display =
                "none";

        }

        return;

    }


    if (!horario.aberto) {

        status.textContent =
            "Fechado";

        indicador.textContent =
            "●";

        horarioFuncionamento.textContent =
            "Não há atendimento neste dia";


        if (intervaloFuncionamento) {

            intervaloFuncionamento.style.display =
                "none";

        }

        return;

    }


    status.textContent =
        "Aberto";


    indicador.textContent =
        "●";


    horarioFuncionamento.textContent =
        `${horario.abertura} às ${horario.fechamento}`;


    const temIntervalo =
        horario.inicioIntervalo &&
        horario.fimIntervalo;


    if (
        intervaloFuncionamento &&
        horarioIntervalo
    ) {

        if (temIntervalo) {

            intervaloFuncionamento.style.display =
                "flex";

            horarioIntervalo.textContent =
                `${horario.inicioIntervalo} às ${horario.fimIntervalo}`;

        } else {

            intervaloFuncionamento.style.display =
                "none";

        }

    }

}

/* ==========================================================
   NOVO AGENDAMENTO
========================================================== */

function abrirNovoAgendamento() {

    agendamentoAtual = null;


    const formulario =
        document.getElementById(
            "formNovoAgendamento"
        );


    if (formulario) {

        formulario.reset();

    }


    const id =
        document.getElementById(
            "agendamentoId"
        );


    if (id) {

        id.value = "";

    }


    const data =
        document.getElementById(
            "agendamentoData"
        );


    if (data) {

        data.value =
            dataAgendaSelecionada ||
            dataHojeISO();

    }


    atualizarSelectServicos();

    atualizarSugestoesClientes();


    const titulo =
        document.getElementById(
            "tituloNovoAgendamento"
        );


    if (titulo) {

        titulo.textContent =
            "Novo agendamento";

    }


    atualizarValorServico();

    mostrarTela(
        "novoAgendamento"
    );

}


/* ==========================================================
   ABRIR EDIÇÃO DE AGENDAMENTO
========================================================== */

function editarAgendamento(id) {

    const agendamentos =
        obterDados(
            CHAVES.agendamentos
        );


    const agendamento =
        agendamentos.find(
            function (item) {

                return String(item.id) ===
                    String(id);

            }
        );


    if (!agendamento) {

        mostrarMensagem(
            "Agendamento não encontrado."
        );

        return;

    }


    agendamentoAtual =
        agendamento.id;


    const campoId =
        document.getElementById(
            "agendamentoId"
        );

    const campoCliente =
        document.getElementById(
            "agendamentoCliente"
        );

    const campoTelefone =
        document.getElementById(
            "agendamentoTelefone"
        );

    const campoData =
        document.getElementById(
            "agendamentoData"
        );

    const campoHora =
        document.getElementById(
            "agendamentoHora"
        );

    const campoServico =
        document.getElementById(
            "agendamentoServico"
        );

    const campoObservacoes =
        document.getElementById(
            "agendamentoObservacoes"
        );


    if (campoId) {

        campoId.value =
            agendamento.id;

    }


    if (campoCliente) {

        campoCliente.value =
            agendamento.clienteNome || "";

    }


    if (campoTelefone) {

        campoTelefone.value =
            agendamento.clienteTelefone || "";

    }


    if (campoData) {

        campoData.value =
            agendamento.data || "";

    }


    if (campoHora) {

        campoHora.value =
            agendamento.hora || "";

    }


    atualizarSelectServicos();


    if (campoServico) {

        campoServico.value =
            agendamento.servicoId || "";

    }


    if (campoObservacoes) {

        campoObservacoes.value =
            agendamento.observacoes || "";

    }


    const titulo =
        document.getElementById(
            "tituloNovoAgendamento"
        );


    if (titulo) {

        titulo.textContent =
            "Editar agendamento";

    }


    atualizarValorServico();

    mostrarTela(
        "novoAgendamento"
    );

}


/* ==========================================================
   ATUALIZAR VALOR DO SERVIÇO
========================================================== */

function atualizarValorServico() {

    const select =
        document.getElementById(
            "agendamentoServico"
        );


    const campoPreco =
        document.getElementById(
            "agendamentoPreco"
        );


    const campoDuracao =
        document.getElementById(
            "agendamentoDuracao"
        );


    if (!select) {

        return;

    }


    const option =
        select.options[
            select.selectedIndex
        ];


    if (
        !option ||
        !option.value
    ) {

        if (campoPreco) {

            campoPreco.value =
                "";

        }


        if (campoDuracao) {

            campoDuracao.value =
                "";

        }

        return;

    }


    const preco =
        Number(
            option.dataset.preco
        ) || 0;


    const duracao =
        Number(
            option.dataset.duracao
        ) || 0;


    if (campoPreco) {

        campoPreco.value =
            preco;

    }


    if (campoDuracao) {

        campoDuracao.value =
            duracao;

    }

}


/* ==========================================================
   ENCONTRAR CLIENTE PELO NOME
========================================================== */

function encontrarClientePorNome(nome) {

    const clientes =
        obterDados(
            CHAVES.clientes
        );


    if (!nome) {

        return null;

    }


    const nomeNormalizado =
        String(nome)
            .trim()
            .toLowerCase();


    return clientes.find(
        function (cliente) {

            return String(
                cliente.nome || ""
            )
            .trim()
            .toLowerCase() ===
                nomeNormalizado;

        }
    ) || null;

}


/* ==========================================================
   PREENCHER TELEFONE DO CLIENTE
========================================================== */

function preencherTelefoneCliente() {

    const campoCliente =
        document.getElementById(
            "agendamentoCliente"
        );


    const campoTelefone =
        document.getElementById(
            "agendamentoTelefone"
        );


    if (
        !campoCliente ||
        !campoTelefone
    ) {

        return;

    }


    const cliente =
        encontrarClientePorNome(
            campoCliente.value
        );


    if (cliente) {

        campoTelefone.value =
            cliente.telefone || "";

    }

}


/* ==========================================================
   VERIFICAR CONFLITO DE HORÁRIO
========================================================== */

function verificarConflitoHorario(
    data,
    hora,
    duracao,
    idIgnorar
) {

    const agendamentos =
        obterDados(
            CHAVES.agendamentos
        );


    const inicioNovo =
        converterHoraParaMinutos(
            hora
        );


    const fimNovo =
        inicioNovo +
        (Number(duracao) || 0);


    const conflito =
        agendamentos.find(
            function (agendamento) {

                if (
                    agendamento.data !==
                    data
                ) {

                    return false;

                }


                if (
                    idIgnorar &&
                    String(agendamento.id) ===
                    String(idIgnorar)
                ) {

                    return false;

                }


                if (
                    agendamento.status ===
                    "cancelado"
                ) {

                    return false;

                }


                const inicioExistente =
                    converterHoraParaMinutos(
                        agendamento.hora
                    );


                const fimExistente =
                    inicioExistente +
                    (
                        Number(
                            agendamento.duracao
                        ) || 0
                    );


                return (
                    inicioNovo <
                    fimExistente
                )
                &&
                (
                    fimNovo >
                    inicioExistente
                );

            }
        );


    return conflito || null;

}


/* ==========================================================
   SALVAR AGENDAMENTO
========================================================== */

function salvarAgendamento() {

    const campoId =
        document.getElementById(
            "agendamentoId"
        );


    const campoCliente =
        document.getElementById(
            "agendamentoCliente"
        );


    const campoTelefone =
        document.getElementById(
            "agendamentoTelefone"
        );


    const campoData =
        document.getElementById(
            "agendamentoData"
        );


    const campoHora =
        document.getElementById(
            "agendamentoHora"
        );


    const campoServico =
        document.getElementById(
            "agendamentoServico"
        );


    const campoPreco =
        document.getElementById(
            "agendamentoPreco"
        );


    const campoDuracao =
        document.getElementById(
            "agendamentoDuracao"
        );


    const campoObservacoes =
        document.getElementById(
            "agendamentoObservacoes"
        );


    const id =
        campoId?.value ||
        gerarId();


    const clienteNome =
        campoCliente?.value
            .trim() || "";


    const clienteTelefone =
        campoTelefone?.value
            .trim() || "";


    const data =
        campoData?.value || "";


    const hora =
        campoHora?.value || "";


    const servicoId =
        campoServico?.value || "";


    const preco =
        Number(
            campoPreco?.value
        ) || 0;


    const duracao =
        Number(
            campoDuracao?.value
        ) || 0;


    const observacoes =
        campoObservacoes?.value
            .trim() || "";


    if (!clienteNome) {

        mostrarMensagem(
            "Informe o cliente."
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


    if (!servicoId) {

        mostrarMensagem(
            "Selecione um serviço."
        );

        return;

    }


    if (duracao <= 0) {

        mostrarMensagem(
            "O serviço precisa ter uma duração válida."
        );

        return;

    }


    /* ======================================================
       VALIDAR HORÁRIO DE FUNCIONAMENTO
    ====================================================== */

    const duracaoSelecionada =
        campoServico
            ?.options[
                campoServico.selectedIndex
            ]
            ?.dataset
            ?.duracao || 0;


    const validacaoHorario =
        validarHorarioFuncionamento(
            data,
            hora,
            Number(
                duracaoSelecionada
            )
        );


    if (
        !validacaoHorario.valido
    ) {

        mostrarMensagem(
            validacaoHorario.mensagem
        );

        return;

    }


    /* ======================================================
       VERIFICAR CONFLITO
    ====================================================== */

    const conflito =
        verificarConflitoHorario(
            data,
            hora,
            duracao,
            id
        );


    if (conflito) {

        mostrarMensagem(
            `Já existe um atendimento entre ${conflito.hora} e ${calcularHoraFinal(conflito.hora, conflito.duracao)}.`
        );

        return;

    }


    let clientes =
        obterDados(
            CHAVES.clientes
        );


    let cliente =
        encontrarClientePorNome(
            clienteNome
        );


    /* ======================================================
       CRIAR CLIENTE AUTOMATICAMENTE
    ====================================================== */

    if (!cliente) {

        cliente = {

            id: gerarId(),

            nome: clienteNome,

            telefone:
                clienteTelefone,

            observacoes: "",

            criadoEm:
                new Date().toISOString(),

            atualizadoEm:
                new Date().toISOString()

        };


        clientes.push(
            cliente
        );


        salvarDados(
            CHAVES.clientes,
            clientes
        );

    } else {

        if (
            clienteTelefone &&
            cliente.telefone !==
                clienteTelefone
        ) {

            cliente.telefone =
                clienteTelefone;

            cliente.atualizadoEm =
                new Date().toISOString();


            salvarDados(
                CHAVES.clientes,
                clientes
            );

        }

    }


    const servicos =
        obterDados(
            CHAVES.servicos
        );


    const servico =
        servicos.find(
            function (item) {

                return String(
                    item.id
                ) ===
                    String(servicoId);

            }
        );


    if (!servico) {

        mostrarMensagem(
            "Serviço não encontrado."
        );

        return;

    }


    let agendamentos =
        obterDados(
            CHAVES.agendamentos
        );


    const indice =
        agendamentos.findIndex(
            function (item) {

                return String(
                    item.id
                ) ===
                    String(id);

            }
        );


    const agendamentoAnterior =
        indice >= 0
            ? agendamentos[indice]
            : null;


    const agendamento = {

        id: id,

        clienteId:
            cliente.id,

        clienteNome:
            cliente.nome,

        clienteTelefone:
            cliente.telefone ||
            clienteTelefone,

        data: data,

        hora: hora,

        servicoId:
            servico.id,

        servicoNome:
            servico.nome,

        preco:
            preco || Number(
                servico.preco
            ) || 0,

        duracao:
            duracao || Number(
                servico.duracao
            ) || 0,

        observacoes:
            observacoes,

        status:
            agendamentoAnterior?.status ||
            "agendado",

        criadoEm:
            agendamentoAnterior?.criadoEm ||
            new Date().toISOString(),

        atualizadoEm:
            new Date().toISOString()

    };


    if (indice >= 0) {

        agendamentos[indice] =
            agendamento;

    } else {

        agendamentos.push(
            agendamento
        );

    }


    const salvo =
        salvarDados(
            CHAVES.agendamentos,
            agendamentos
        );


    if (!salvo) {

        return;

    }


    dataAgendaSelecionada =
        data;


    const partes =
        String(data)
            .split("-");


    if (
        partes.length === 3
    ) {

        mesAgendaAtual =
            new Date(
                Number(partes[0]),
                Number(partes[1]) - 1,
                1
            );

    }


    atualizarSugestoesClientes();

    renderizarCalendario();

    renderizarAgenda();

    renderizarClientes();

    atualizarResumoHome();

    renderizarFinanceiro();


    mostrarMensagem(
        indice >= 0
            ? "Agendamento atualizado."
            : "Agendamento realizado com sucesso."
    );


    mostrarTela(
        "agenda"
    );

}


/* ==========================================================
   CALCULAR HORA FINAL
========================================================== */

function calcularHoraFinal(
    hora,
    duracao
) {

    const minutos =
        converterHoraParaMinutos(
            hora
        );


    const final =
        minutos +
        (
            Number(duracao) || 0
        );


    const horas =
        Math.floor(
            final / 60
        ) % 24;


    const minutosFinais =
        final % 60;


    return (
        String(horas)
            .padStart(2, "0") +
        ":" +
        String(minutosFinais)
            .padStart(2, "0")
    );

}


/* ==========================================================
   ABRIR DETALHES DO AGENDAMENTO
========================================================== */

function abrirDetalhesAgendamento(id) {

    const agendamentos =
        obterDados(
            CHAVES.agendamentos
        );


    const agendamento =
        agendamentos.find(
            function (item) {

                return String(
                    item.id
                ) ===
                    String(id);

            }
        );


    if (!agendamento) {

        mostrarMensagem(
            "Agendamento não encontrado."
        );

        return;

    }


    agendamentoAtual =
        agendamento.id;


    const cliente =
        document.getElementById(
            "detalhesClienteNome"
        );


    const telefone =
        document.getElementById(
            "detalhesClienteTelefone"
        );


    const servico =
        document.getElementById(
            "detalhesServico"
        );


    const data =
        document.getElementById(
            "detalhesData"
        );


    const hora =
        document.getElementById(
            "detalhesHora"
        );


    const preco =
        document.getElementById(
            "detalhesPreco"
        );


    const duracao =
        document.getElementById(
            "detalhesDuracao"
        );


    const observacoes =
        document.getElementById(
            "detalhesObservacoes"
        );


    const status =
        document.getElementById(
            "detalhesStatus"
        );


    const avatar =
        document.getElementById(
            "detalhesClienteAvatar"
        );


    if (cliente) {

        cliente.textContent =
            agendamento.clienteNome ||
            "Cliente";

    }


    if (telefone) {

        telefone.textContent =
            agendamento.clienteTelefone ||
            "Telefone não informado";

    }


    if (servico) {

        servico.textContent =
            agendamento.servicoNome ||
            "Serviço";

    }


    if (data) {

        data.textContent =
            formatarData(
                agendamento.data
            );

    }


    if (hora) {

        hora.textContent =
            agendamento.hora || "";

    }


    if (preco) {

        preco.textContent =
            formatarMoeda(
                agendamento.preco || 0
            );

    }


    if (duracao) {

        duracao.textContent =
            formatarDuracao(
                agendamento.duracao || 0
            );

    }


    if (observacoes) {

        observacoes.textContent =
            agendamento.observacoes ||
            "Nenhuma observação.";

    }


    if (status) {

        status.textContent =
            formatarStatus(
                agendamento.status
            );

        status.className =
            "status-agendamento status-" +
            (
                agendamento.status ||
                "agendado"
            );

    }


    if (avatar) {

        avatar.textContent =
            gerarIniciais(
                agendamento.clienteNome
            );

    }


    atualizarBotoesStatus(
        agendamento
    );


    mostrarTela(
        "detalhesAgendamento"
    );

}


/* ==========================================================
   FORMATAR STATUS
========================================================== */

function formatarStatus(status) {

    const nomes = {

        agendado:
            "Agendado",

        em_atendimento:
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
   ATUALIZAR BOTÕES DE STATUS
========================================================== */

function atualizarBotoesStatus(
    agendamento
) {

    const botaoIniciar =
        document.getElementById(
            "btnIniciarAtendimento"
        );


    const botaoConcluir =
        document.getElementById(
            "btnConcluirAtendimento"
        );


    const botaoCancelar =
        document.getElementById(
            "btnCancelarAgendamento"
        );


    const botaoReabrir =
        document.getElementById(
            "btnReabrirAgendamento"
        );


    if (botaoIniciar) {

        botaoIniciar.style.display =
            (
                agendamento.status ===
                "agendado"
            )
                ? "block"
                : "none";

    }


    if (botaoConcluir) {

        botaoConcluir.style.display =
            (
                agendamento.status ===
                "em_atendimento"
            )
                ? "block"
                : "none";

    }


    if (botaoCancelar) {

        botaoCancelar.style.display =
            (
                agendamento.status !==
                "concluido" &&
                agendamento.status !==
                "cancelado"
            )
                ? "block"
                : "none";

    }


    if (botaoReabrir) {

        botaoReabrir.style.display =
            (
                agendamento.status ===
                "cancelado"
            )
                ? "block"
                : "none";

    }

}


/* ==========================================================
   ALTERAR STATUS DO AGENDAMENTO
========================================================== */

function alterarStatusAgendamento(
    novoStatus
) {

    if (!agendamentoAtual) {

        mostrarMensagem(
            "Agendamento não selecionado."
        );

        return;

    }


    let agendamentos =
        obterDados(
            CHAVES.agendamentos
        );


    const indice =
        agendamentos.findIndex(
            function (item) {

                return String(
                    item.id
                ) ===
                    String(
                        agendamentoAtual
                    );

            }
        );


    if (indice < 0) {

        mostrarMensagem(
            "Agendamento não encontrado."
        );

        return;

    }


    agendamentos[indice].status =
        novoStatus;


    agendamentos[indice].atualizadoEm =
        new Date().toISOString();


    salvarDados(
        CHAVES.agendamentos,
        agendamentos
    );


    atualizarResumoHome();

    renderizarAgenda();

    renderizarClientes();

    renderizarFinanceiro();


    abrirDetalhesAgendamento(
        agendamentoAtual
    );


    mostrarMensagem(
        `Status alterado para ${formatarStatus(novoStatus)}.`
    );

}


/* ==========================================================
   INICIAR ATENDIMENTO
========================================================== */

function iniciarAtendimento() {

    alterarStatusAgendamento(
        "em_atendimento"
    );

}


/* ==========================================================
   CONCLUIR ATENDIMENTO
========================================================== */

function concluirAtendimento() {

    alterarStatusAgendamento(
        "concluido"
    );

}


/* ==========================================================
   CANCELAR AGENDAMENTO
========================================================== */

function cancelarAgendamento() {

    if (!agendamentoAtual) {

        return;

    }


    const confirmar =
        confirm(
            "Deseja realmente cancelar este agendamento?"
        );


    if (!confirmar) {

        return;

    }


    alterarStatusAgendamento(
        "cancelado"
    );

}


/* ==========================================================
   REABRIR AGENDAMENTO
========================================================== */

function reabrirAgendamento() {

    alterarStatusAgendamento(
        "agendado"
    );

}


/* ==========================================================
   EXCLUIR AGENDAMENTO
========================================================== */

function excluirAgendamento() {

    if (!agendamentoAtual) {

        return;

    }


    const confirmar =
        confirm(
            "Deseja realmente excluir este agendamento?\n\nEssa ação não poderá ser desfeita."
        );


    if (!confirmar) {

        return;

    }


    let agendamentos =
        obterDados(
            CHAVES.agendamentos
        );


    agendamentos =
        agendamentos.filter(
            function (agendamento) {

                return String(
                    agendamento.id
                ) !==
                    String(
                        agendamentoAtual
                    );

            }
        );


    salvarDados(
        CHAVES.agendamentos,
        agendamentos
    );


    agendamentoAtual =
        null;


    renderizarAgenda();

    atualizarResumoHome();

    renderizarClientes();

    renderizarFinanceiro();


    mostrarMensagem(
        "Agendamento excluído."
    );


    mostrarTela(
        "agenda"
    );

}


/* ==========================================================
   PRÓXIMO MÊS
========================================================== */

function proximoMesAgenda() {

    mesAgendaAtual.setMonth(
        mesAgendaAtual.getMonth() + 1
    );


    renderizarCalendario();

}


/* ==========================================================
   MÊS ANTERIOR
========================================================== */

function mesAnteriorAgenda() {

    mesAgendaAtual.setMonth(
        mesAgendaAtual.getMonth() - 1
    );


    renderizarCalendario();

}


/* ==========================================================
   IR PARA HOJE
========================================================== */

function irParaHojeAgenda() {

    const hoje =
        dataHojeISO();


    dataAgendaSelecionada =
        hoje;


    const partes =
        hoje.split("-");


    mesAgendaAtual =
        new Date(
            Number(partes[0]),
            Number(partes[1]) - 1,
            1
        );


    renderizarCalendario();

    renderizarAgenda();

}


/* ==========================================================
   ATUALIZAR RESUMO DA HOME
========================================================== */

function atualizarResumoHome() {

    const agendamentos =
        obterDados(
            CHAVES.agendamentos
        );


    const hoje =
        dataHojeISO();


    const agendamentosHoje =
        agendamentos.filter(
            function (agendamento) {

                return (
                    agendamento.data ===
                    hoje
                )
                &&
                agendamento.status !==
                    "cancelado";

            }
        );


    const concluidosHoje =
        agendamentos.filter(
            function (agendamento) {

                return (
                    agendamento.data ===
                    hoje
                )
                &&
                agendamento.status ===
                    "concluido";

            }
        );


    const faturamentoHoje =
        concluidosHoje.reduce(
            function (total, agendamento) {

                return total +
                    Number(
                        agendamento.preco ||
                        0
                    );

            },
            0
        );


    const totalClientes =
        obterDados(
            CHAVES.clientes
        ).length;


    const elementoAgendamentos =
        document.getElementById(
            "resumoAgendamentos"
        );


    const elementoClientes =
        document.getElementById(
            "resumoClientes"
        );


    const elementoFaturamento =
        document.getElementById(
            "resumoFaturamento"
        );


    if (elementoAgendamentos) {

        elementoAgendamentos.textContent =
            agendamentosHoje.length;

    }


    if (elementoClientes) {

        elementoClientes.textContent =
            totalClientes;

    }


    if (elementoFaturamento) {

        elementoFaturamento.textContent =
            "••••••";

    }

}


/* ==========================================================
   FINANCEIRO
========================================================== */

function renderizarFinanceiro() {

    const agendamentos =
        obterDados(
            CHAVES.agendamentos
        );


    const hoje =
        new Date();


    const ano =
        hoje.getFullYear();


    const mes =
        hoje.getMonth();


    const inicioMes =
        new Date(
            ano,
            mes,
            1
        );


    const fimMes =
        new Date(
            ano,
            mes + 1,
            0
        );


    const faturamento =
        agendamentos
            .filter(
                function (agendamento) {

                    if (
                        agendamento.status !==
                        "concluido"
                    ) {

                        return false;

                    }


                    const data =
                        String(
                            agendamento.data
                        ).split("-");


                    if (
                        data.length !== 3
                    ) {

                        return false;

                    }


                    const objeto =
                        new Date(
                            Number(data[0]),
                            Number(data[1]) - 1,
                            Number(data[2])
                        );


                    return (
                        objeto >=
                        inicioMes &&
                        objeto <=
                        fimMes
                    );

                }
            )
            .reduce(
                function (
                    total,
                    agendamento
                ) {

                    return total +
                        Number(
                            agendamento.preco ||
                            0
                        );

                },
                0
            );


    const elemento =
        document.getElementById(
            "financeiroTotal"
        );


    if (elemento) {

        elemento.textContent =
            formatarMoeda(
                faturamento
            );

    }


    const quantidade =
        document.getElementById(
            "financeiroAtendimentos"
        );


    const atendimentos =
        agendamentos
            .filter(
                function (agendamento) {

                    if (
                        agendamento.status !==
                        "concluido"
                    ) {

                        return false;

                    }


                    const partes =
                        String(
                            agendamento.data
                        ).split("-");


                    if (
                        partes.length !== 3
                    ) {

                        return false;

                    }


                    return (
                        Number(partes[0]) ===
                            ano &&
                        Number(partes[1]) - 1 ===
                            mes
                    );

                }
            )
            .length;


    if (quantidade) {

        quantidade.textContent =
            atendimentos;

    }


    renderizarResumoServicosFinanceiro(
        agendamentos
    );

}


/* ==========================================================
   RESUMO POR SERVIÇO
========================================================== */

function renderizarResumoServicosFinanceiro(
    agendamentos
) {

    const lista =
        document.getElementById(
            "listaResumoServicos"
        );


    if (!lista) {

        return;

    }


    const hoje =
        new Date();


    const ano =
        hoje.getFullYear();


    const mes =
        hoje.getMonth();


    const concluido =
        agendamentos.filter(
            function (agendamento) {

                if (
                    agendamento.status !==
                    "concluido"
                ) {

                    return false;

                }


                const partes =
                    String(
                        agendamento.data
                    ).split("-");


                return (
                    partes.length === 3 &&
                    Number(partes[0]) === ano &&
                    Number(partes[1]) - 1 === mes
                );

            }
        );


    const agrupado = {};


    concluido.forEach(
        function (agendamento) {

            const nome =
                agendamento.servicoNome ||
                "Serviço";


            if (!agrupado[nome]) {

                agrupado[nome] = {

                    quantidade: 0,

                    valor: 0

                };

            }


            agrupado[nome].quantidade += 1;


            agrupado[nome].valor +=
                Number(
                    agendamento.preco ||
                    0
                );

        }
    );


    const nomes =
        Object.keys(
            agrupado
        );


    if (nomes.length === 0) {

        lista.innerHTML = `
            <div class="estado-vazio pequeno">

                <p>
                    Nenhum atendimento concluído neste mês.
                </p>

            </div>
        `;

        return;

    }


    lista.innerHTML =
        nomes
            .sort(
                function (a, b) {

                    return (
                        agrupado[b].valor -
                        agrupado[a].valor
                    );

                }
            )
            .map(
                function (nome) {

                    const item =
                        agrupado[nome];


                    return `

                        <div class="financeiro-servico">

                            <div>

                                <strong>
                                    ${escaparHTML(nome)}
                                </strong>

                                <span>
                                    ${item.quantidade}
                                    atendimento(s)
                                </span>

                            </div>

                            <strong>
                                ${formatarMoeda(item.valor)}
                            </strong>

                        </div>

                    `;

                }
            )
            .join("");

}


/* ==========================================================
   BOTÃO INÍCIO → RELATÓRIOS / FINANCEIRO
========================================================== */

const btnInicioRelatorios =
    document.getElementById(
        "btnInicioRelatorios"
    );


if (btnInicioRelatorios) {

    btnInicioRelatorios.addEventListener(
        "click",
        function () {

            renderizarFinanceiro();

            mostrarTela(
                "financeiro"
            );

        }
    );

}


/* ==========================================================
   MENU LATERAL
========================================================== */
function abrirMenu() {

    if (!menuLateral) {
        alert("ERRO: menuLateral não encontrado!");
        return;
    }

    menuLateral.classList.add("ativo");

    menuLateral.style.setProperty(
        "display",
        "block",
        "important"
    );

    menuLateral.style.setProperty(
        "visibility",
        "visible",
        "important"
    );

    menuLateral.style.setProperty(
        "opacity",
        "1",
        "important"
    );

    menuLateral.style.setProperty(
        "transform",
        "translateX(0)",
        "important"
    );

    menuLateral.style.setProperty(
        "left",
        "0",
        "important"
    );

    menuLateral.style.setProperty(
        "top",
        "0",
        "important"
    );

    menuLateral.style.setProperty(
        "bottom",
        "0",
        "important"
    );

    menuLateral.style.setProperty(
        "z-index",
        "999999",
        "important"
    );


    if (menuOverlay) {

        menuOverlay.classList.add("ativo");

        menuOverlay.style.setProperty(
            "display",
            "block",
            "important"
        );

        menuOverlay.style.setProperty(
            "visibility",
            "visible",
            "important"
        );

        menuOverlay.style.setProperty(
            "opacity",
            "1",
            "important"
        );

        menuOverlay.style.setProperty(
            "z-index",
            "999998",
            "important"
        );
    }

    document.body.classList.add("menu-aberto");
}

/* ==========================================================
   FECHAR MENU
========================================================== */

function fecharMenu() {

    if (menuLateral) {

        menuLateral.classList.remove("ativo");

        menuLateral.style.setProperty(
            "transform",
            "translateX(-110%)",
            "important"
        );

        menuLateral.style.setProperty(
            "visibility",
            "hidden",
            "important"
        );
    }

    if (menuOverlay) {

        menuOverlay.classList.remove("ativo");

        menuOverlay.style.setProperty(
            "opacity",
            "0",
            "important"
        );

        menuOverlay.style.setProperty(
            "visibility",
            "hidden",
            "important"
        );
    }

    document.body.classList.remove("menu-aberto");
}

/* ==========================================================
   BOTÃO MENU
========================================================== */

const btnMenu =
    document.getElementById(
        "btnMenu"
    );


if (btnMenu) {

    btnMenu.addEventListener(
        "click",
        function () {

            const menu =
                document.getElementById(
                    "menuLateral"
                );


            if (
                menu &&
                menu.classList.contains(
                    "aberto"
                )
            ) {

                fecharMenu();

            } else {

                abrirMenu();

            }

        }
    );

}


/* ==========================================================
   OVERLAY DO MENU
========================================================== */

const menuOverlay =
    document.getElementById(
        "menuOverlay"
    );


if (menuOverlay) {

    menuOverlay.addEventListener(
        "click",
        fecharMenu
    );

}


/* ==========================================================
   ITENS DO MENU
========================================================== */

document
    .querySelectorAll(".menu-item")
    .forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    const tela =
                        item.dataset.menuTela;


                    if (!tela) {

                        return;

                    }


                    fecharMenu();


                    setTimeout(
                        function () {

                            if (
                                tela ===
                                "agenda"
                            ) {

                                renderizarCalendario();

                                renderizarAgenda();

                            }


                            if (
                                tela ===
                                "clientes"
                            ) {

                                renderizarClientes();

                            }


                            if (
                                tela ===
                                "servicos"
                            ) {

                                renderizarServicos();

                            }


                            if (
                                tela ===
                                "financeiro"
                            ) {

                                renderizarFinanceiro();

                            }


                            if (
                                tela ===
                                "configuracoes"
                            ) {

                                carregarConfiguracoes();

                            }


                            mostrarTela(
                                tela
                            );

                        },
                        150
                    );

                }
            );

        }
    );


/* ==========================================================
   BOTÕES DE VOLTAR
========================================================== */

document
    .querySelectorAll("[data-voltar]")
    .forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function () {

                    const destino =
                        botao.dataset.voltar ||
                        "inicio";


                    mostrarTela(
                        destino
                    );

                }
            );

        }
    );


/* ==========================================================
   BOTÕES DE NOVO AGENDAMENTO
========================================================== */

document
    .querySelectorAll(
        "[data-acao='novo-agendamento']"
    )
    .forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                abrirNovoAgendamento
            );

        }
    );


/* ==========================================================
   BOTÃO NOVO CLIENTE
========================================================== */

const btnNovoCliente =
    document.getElementById(
        "btnNovoCliente"
    );


if (btnNovoCliente) {

    btnNovoCliente.addEventListener(
        "click",
        abrirNovoCliente
    );

}


/* ==========================================================
   BOTÃO NOVO SERVIÇO
========================================================== */

const btnNovoServico =
    document.getElementById(
        "btnNovoServico"
    );


if (btnNovoServico) {

    btnNovoServico.addEventListener(
        "click",
        abrirNovoServico
    );

}


/* ==========================================================
   FORMULÁRIO DE CLIENTE
========================================================== */

const formNovoCliente =
    document.getElementById(
        "formNovoCliente"
    );


if (formNovoCliente) {

    formNovoCliente.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();

            salvarCliente();

        }
    );

}


/* ==========================================================
   FORMULÁRIO DE SERVIÇO
========================================================== */

const formNovoServico =
    document.getElementById(
        "formNovoServico"
    );


if (formNovoServico) {

    formNovoServico.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const campoId =
                document.getElementById(
                    "servicoId"
                );


            const campoNome =
                document.getElementById(
                    "servicoNome"
                );


            const campoPreco =
                document.getElementById(
                    "servicoPreco"
                );


            const campoDuracao =
                document.getElementById(
                    "servicoDuracao"
                );


            const id =
                campoId?.value ||
                gerarId();


            const nome =
                campoNome?.value
                    .trim() || "";


            const preco =
                Number(
                    campoPreco?.value
                ) || 0;


            const duracao =
                Number(
                    campoDuracao?.value
                ) || 0;


            if (!nome) {

                mostrarMensagem(
                    "Informe o nome do serviço."
                );

                return;

            }


            if (preco <= 0) {

                mostrarMensagem(
                    "Informe um preço válido."
                );

                return;

            }


            if (duracao <= 0) {

                mostrarMensagem(
                    "Informe a duração do serviço."
                );

                return;

            }


            let servicos =
                obterDados(
                    CHAVES.servicos
                );


            const indice =
                servicos.findIndex(
                    function (servico) {

                        return String(
                            servico.id
                        ) ===
                            String(id);

                    }
                );


            const servico = {

                id: id,

                nome: nome,

                preco: preco,

                duracao: duracao,

                ativo: true,

                atualizadoEm:
                    new Date().toISOString()

            };


            if (indice >= 0) {

                servicos[indice] =
                    {
                        ...servicos[indice],
                        ...servico
                    };

            } else {

                servico.criadoEm =
                    new Date().toISOString();

                servicos.push(
                    servico
                );

            }


            salvarDados(
                CHAVES.servicos,
                servicos
            );


            atualizarSelectServicos();

            renderizarServicos();


            mostrarMensagem(
                indice >= 0
                    ? "Serviço atualizado."
                    : "Serviço cadastrado."
            );


            mostrarTela(
                "servicos"
            );

        }
    );

}


/* ==========================================================
   FORMULÁRIO DE AGENDAMENTO
========================================================== */

const formNovoAgendamento =
    document.getElementById(
        "formNovoAgendamento"
    );


if (formNovoAgendamento) {

    formNovoAgendamento.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();

            salvarAgendamento();

        }
    );

}


/* ==========================================================
   SELECT DE SERVIÇO
========================================================== */

const selectAgendamentoServico =
    document.getElementById(
        "agendamentoServico"
    );


if (selectAgendamentoServico) {

    selectAgendamentoServico.addEventListener(
        "change",
        atualizarValorServico
    );

}


/* ==========================================================
   CLIENTE DO AGENDAMENTO
========================================================== */

const campoAgendamentoCliente =
    document.getElementById(
        "agendamentoCliente"
    );


if (campoAgendamentoCliente) {

    campoAgendamentoCliente.addEventListener(
        "change",
        preencherTelefoneCliente
    );

    campoAgendamentoCliente.addEventListener(
        "blur",
        preencherTelefoneCliente
    );

}


/* ==========================================================
   CALENDÁRIO — BOTÕES
========================================================== */

const btnMesAnterior =
    document.getElementById(
        "btnMesAnterior"
    );


if (btnMesAnterior) {

    btnMesAnterior.addEventListener(
        "click",
        mesAnteriorAgenda
    );

}


const btnProximoMes =
    document.getElementById(
        "btnProximoMes"
    );


if (btnProximoMes) {

    btnProximoMes.addEventListener(
        "click",
        proximoMesAgenda
    );

}


const btnHojeAgenda =
    document.getElementById(
        "btnHojeAgenda"
    );


if (btnHojeAgenda) {

    btnHojeAgenda.addEventListener(
        "click",
        irParaHojeAgenda
    );

}

/* ==========================================================
   BOTÕES DA HOME
========================================================== */

const btnHomeAgenda =
    document.getElementById(
        "btnHomeAgenda"
    );


if (btnHomeAgenda) {

    btnHomeAgenda.addEventListener(
        "click",
        function () {

            renderizarCalendario();

            renderizarAgenda();

            mostrarTela(
                "agenda"
            );

        }
    );

}


/* ==========================================================
   BOTÃO HOME — CLIENTES
========================================================== */

const btnHomeClientes =
    document.getElementById(
        "btnHomeClientes"
    );


if (btnHomeClientes) {

    btnHomeClientes.addEventListener(
        "click",
        function () {

            renderizarClientes();

            mostrarTela(
                "clientes"
            );

        }
    );

}


/* ==========================================================
   BOTÃO HOME — SERVIÇOS
========================================================== */

const btnHomeServicos =
    document.getElementById(
        "btnHomeServicos"
    );


if (btnHomeServicos) {

    btnHomeServicos.addEventListener(
        "click",
        function () {

            renderizarServicos();

            mostrarTela(
                "servicos"
            );

        }
    );

}


/* ==========================================================
   BOTÃO HOME — NOVO AGENDAMENTO
========================================================== */

const btnHomeNovoAgendamento =
    document.getElementById(
        "btnHomeNovoAgendamento"
    );


if (btnHomeNovoAgendamento) {

    btnHomeNovoAgendamento.addEventListener(
        "click",
        abrirNovoAgendamento
    );

}


/* ==========================================================
   BOTÃO HOME — NOVO CLIENTE
========================================================== */

const btnHomeNovoCliente =
    document.getElementById(
        "btnHomeNovoCliente"
    );


if (btnHomeNovoCliente) {

    btnHomeNovoCliente.addEventListener(
        "click",
        abrirNovoCliente
    );

}


/* ==========================================================
   BOTÃO HOME — CONFIGURAÇÕES
========================================================== */

const btnHomeConfiguracoes =
    document.getElementById(
        "btnHomeConfiguracoes"
    );


if (btnHomeConfiguracoes) {

    btnHomeConfiguracoes.addEventListener(
        "click",
        function () {

            carregarConfiguracoes();

            mostrarTela(
                "configuracoes"
            );

        }
    );

}


/* ==========================================================
   BOTÃO NOTIFICAÇÃO
========================================================== */

const btnNotificacao =
    document.getElementById(
        "btnNotificacao"
    );


if (btnNotificacao) {

    btnNotificacao.addEventListener(
        "click",
        function () {

            mostrarMensagem(
                "Você está em dia! Nenhuma nova notificação."
            );

        }
    );

}


/* ==========================================================
   BUSCA DE CLIENTES
========================================================== */

const buscaClientes =
    document.getElementById(
        "buscaClientes"
    );


if (buscaClientes) {

    buscaClientes.addEventListener(
        "input",
        function () {

            const termo =
                buscaClientes.value
                    .trim()
                    .toLowerCase();


            const lista =
                document.getElementById(
                    "listaClientes"
                );


            if (!lista) {

                return;

            }


            const clientes =
                obterDados(
                    CHAVES.clientes
                );


            const filtrados =
                clientes.filter(
                    function (cliente) {

                        const nome =
                            String(
                                cliente.nome || ""
                            )
                            .toLowerCase();


                        const telefone =
                            String(
                                cliente.telefone || ""
                            )
                            .toLowerCase();


                        return (
                            nome.includes(termo) ||
                            telefone.includes(termo)
                        );

                    }
                );


            if (
                filtrados.length === 0
            ) {

                lista.innerHTML = `

                    <div class="estado-vazio">

                        <div class="estado-vazio-icone">
                            🔎
                        </div>

                        <h3>
                            Nenhum cliente encontrado
                        </h3>

                        <p>
                            Tente pesquisar por outro nome ou telefone.
                        </p>

                    </div>

                `;

                return;

            }


            lista.innerHTML =
                filtrados
                    .sort(
                        function (a, b) {

                            return String(
                                a.nome || ""
                            ).localeCompare(
                                String(
                                    b.nome || ""
                                ),
                                "pt-BR"
                            );

                        }
                    )
                    .map(
                        function (cliente) {

                            return `

                                <button
                                    type="button"
                                    class="card-cliente"
                                    onclick="abrirFichaCliente('${escaparHTML(cliente.id)}')"
                                >

                                    <div class="cliente-avatar">
                                        ${gerarIniciais(cliente.nome)}
                                    </div>

                                    <div class="cliente-info">

                                        <strong>
                                            ${escaparHTML(cliente.nome)}
                                        </strong>

                                        <span>
                                            ${escaparHTML(cliente.telefone || "Sem telefone")}
                                        </span>

                                    </div>

                                    <div class="cliente-atendimentos">

                                        <strong>
                                            ${contarAtendimentosCliente(cliente.id)}
                                        </strong>

                                        <span>
                                            atendimentos
                                        </span>

                                    </div>

                                </button>

                            `;

                        }
                    )
                    .join("");

        }
    );

}


/* ==========================================================
   MÁSCARA DE TELEFONE
========================================================== */

function aplicarMascaraTelefone(campo) {

    if (!campo) {

        return;

    }


    let valor =
        campo.value.replace(
            /\D/g,
            ""
        );


    if (valor.length > 11) {

        valor =
            valor.substring(
                0,
                11
            );

    }


    if (valor.length <= 10) {

        if (valor.length >= 7) {

            valor =
                valor.replace(
                    /^(\d{2})(\d{4})(\d{0,4}).*/,
                    "($1) $2-$3"
                );

        } else if (valor.length >= 3) {

            valor =
                valor.replace(
                    /^(\d{2})(\d{0,4}).*/,
                    "($1) $2"
                );

        }

    } else {

        valor =
            valor.replace(
                /^(\d{2})(\d{5})(\d{0,4}).*/,
                "($1) $2-$3"
            );

    }


    campo.value =
        valor;

}


/* ==========================================================
   MÁSCARA DE TELEFONE — CAMPOS
========================================================== */

const camposTelefone =
    document.querySelectorAll(
        "#clienteTelefone, #agendamentoTelefone, #configWhatsApp"
    );


camposTelefone.forEach(
    function (campo) {

        campo.addEventListener(
            "input",
            function () {

                aplicarMascaraTelefone(
                    campo
                );

            }
        );

    }
);


/* ==========================================================
   CONFIGURAÇÕES DA BARBEARIA
========================================================== */

function carregarConfiguracoes() {

    let configuracoes = {};


    try {

        configuracoes =
            JSON.parse(
                localStorage.getItem(
                    CONFIG_CHAVE
                )
            ) || {};

    } catch (erro) {

        configuracoes = {};

    }


    const nomeBarbearia =
        document.getElementById(
            "configNomeBarbearia"
        );


    const nomeBarbeiro =
        document.getElementById(
            "configNomeBarbeiro"
        );


    const whatsapp =
        document.getElementById(
            "configWhatsApp"
        );


    const endereco =
        document.getElementById(
            "configEndereco"
        );


    if (nomeBarbearia) {

        nomeBarbearia.value =
            configuracoes.nomeBarbearia ||
            "";

    }


    if (nomeBarbeiro) {

        nomeBarbeiro.value =
            configuracoes.nomeBarbeiro ||
            "";

    }


    if (whatsapp) {

        whatsapp.value =
            configuracoes.whatsapp ||
            "";

    }


    if (endereco) {

        endereco.value =
            configuracoes.endereco ||
            "";

    }


    const horarios =
        configuracoes.horarios ||
        {};


    document
        .querySelectorAll(
            ".dia-aberto"
        )
        .forEach(
            function (campo) {

                const dia =
                    campo.dataset.dia;


                if (
                    horarios[dia] &&
                    horarios[dia].aberto !==
                        undefined
                ) {

                    campo.checked =
                        horarios[dia].aberto;

                } else if (
                    HORARIOS_PADRAO[dia]
                ) {

                    campo.checked =
                        HORARIOS_PADRAO[dia]
                            .aberto;

                }

            }
        );


    document
        .querySelectorAll(
            ".hora-abertura"
        )
        .forEach(
            function (campo) {

                const dia =
                    campo.dataset.dia;


                campo.value =
                    horarios[dia]?.abertura ||
                    HORARIOS_PADRAO[dia]
                        ?.abertura ||
                    "";

            }
        );


    document
        .querySelectorAll(
            ".hora-inicio-intervalo"
        )
        .forEach(
            function (campo) {

                const dia =
                    campo.dataset.dia;


                campo.value =
                    horarios[dia]
                        ?.inicioIntervalo ??
                    HORARIOS_PADRAO[dia]
                        ?.inicioIntervalo ??
                    "";

            }
        );


    document
        .querySelectorAll(
            ".hora-fim-intervalo"
        )
        .forEach(
            function (campo) {

                const dia =
                    campo.dataset.dia;


                campo.value =
                    horarios[dia]
                        ?.fimIntervalo ??
                    HORARIOS_PADRAO[dia]
                        ?.fimIntervalo ??
                    "";

            }
        );


    document
        .querySelectorAll(
            ".hora-fechamento"
        )
        .forEach(
            function (campo) {

                const dia =
                    campo.dataset.dia;


                campo.value =
                    horarios[dia]?.fechamento ||
                    HORARIOS_PADRAO[dia]
                        ?.fechamento ||
                    "";

            }
        );


    atualizarEstadoHorarios();

}


/* ==========================================================
   ATUALIZAR ESTADO DOS HORÁRIOS
========================================================== */

function atualizarEstadoHorarios() {

    document
        .querySelectorAll(
            ".dia-config"
        )
        .forEach(
            function (bloco) {

                const checkbox =
                    bloco.querySelector(
                        ".dia-aberto"
                    );


                if (!checkbox) {

                    return;

                }


                const campos =
                    bloco.querySelectorAll(
                        "input[type='time']"
                    );


                campos.forEach(
                    function (campo) {

                        campo.disabled =
                            !checkbox.checked;

                    }
                );


                bloco.classList.toggle(
                    "dia-fechado",
                    !checkbox.checked
                );

            }
        );

}


/* ==========================================================
   SALVAR CONFIGURAÇÕES
========================================================== */

function salvarConfiguracoes() {

    const nomeBarbearia =
        document.getElementById(
            "configNomeBarbearia"
        )
        ?.value
        .trim() || "";


    const nomeBarbeiro =
        document.getElementById(
            "configNomeBarbeiro"
        )
        ?.value
        .trim() || "";


    const whatsapp =
        document.getElementById(
            "configWhatsApp"
        )
        ?.value
        .trim() || "";


    const endereco =
        document.getElementById(
            "configEndereco"
        )
        ?.value
        .trim() || "";


    const horarios = {};


    document
        .querySelectorAll(
            ".dia-aberto"
        )
        .forEach(
            function (checkbox) {

                const dia =
                    checkbox.dataset.dia;


                const abertura =
                    document.querySelector(
                        `.hora-abertura[data-dia="${dia}"]`
                    );


                const inicioIntervalo =
                    document.querySelector(
                        `.hora-inicio-intervalo[data-dia="${dia}"]`
                    );


                const fimIntervalo =
                    document.querySelector(
                        `.hora-fim-intervalo[data-dia="${dia}"]`
                    );


                const fechamento =
                    document.querySelector(
                        `.hora-fechamento[data-dia="${dia}"]`
                    );


                horarios[dia] = {

                    aberto:
                        checkbox.checked,

                    abertura:
                        abertura?.value ||
                        "",

                    inicioIntervalo:
                        inicioIntervalo?.value ||
                        "",

                    fimIntervalo:
                        fimIntervalo?.value ||
                        "",

                    fechamento:
                        fechamento?.value ||
                        ""

                };

            }
        );


    const configuracoes = {

        nomeBarbearia:
            nomeBarbearia,

        nomeBarbeiro:
            nomeBarbeiro,

        whatsapp:
            whatsapp,

        endereco:
            endereco,

        horarios:
            horarios,

        atualizadoEm:
            new Date().toISOString()

    };


    try {

        localStorage.setItem(
            CONFIG_CHAVE,
            JSON.stringify(
                configuracoes
            )
        );


        mostrarMensagem(
            "Configurações salvas com sucesso."
        );


        renderizarFuncionamentoAgenda();

    } catch (erro) {

        console.error(
            "Erro ao salvar configurações:",
            erro
        );


        mostrarMensagem(
            "Não foi possível salvar as configurações."
        );

    }

}


/* ==========================================================
   BOTÃO SALVAR CONFIGURAÇÕES
========================================================== */

const btnSalvarConfiguracoes =
    document.getElementById(
        "btnSalvarConfiguracoes"
    );


if (btnSalvarConfiguracoes) {

    btnSalvarConfiguracoes.addEventListener(
        "click",
        salvarConfiguracoes
    );

}


/* ==========================================================
   CHECKBOXES DOS DIAS
========================================================== */

document
    .querySelectorAll(
        ".dia-aberto"
    )
    .forEach(
        function (checkbox) {

            checkbox.addEventListener(
                "change",
                atualizarEstadoHorarios
            );

        }
    );


/* ==========================================================
   VALIDAR INTERVALO DE HORÁRIO
========================================================== */

function validarConfiguracaoHorario(
    abertura,
    inicioIntervalo,
    fimIntervalo,
    fechamento
) {

    const a =
        converterHoraParaMinutos(
            abertura
        );


    const i =
        inicioIntervalo
            ? converterHoraParaMinutos(
                inicioIntervalo
            )
            : null;


    const f =
        fimIntervalo
            ? converterHoraParaMinutos(
                fimIntervalo
            )
            : null;


    const c =
        converterHoraParaMinutos(
            fechamento
        );


    if (
        !abertura ||
        !fechamento
    ) {

        return {

            valido: false,

            mensagem:
                "Informe abertura e fechamento."

        };

    }


    if (a >= c) {

        return {

            valido: false,

            mensagem:
                "A abertura deve ser antes do fechamento."

        };

    }


    if (
        i !== null &&
        f !== null
    ) {

        if (i <= a) {

            return {

                valido: false,

                mensagem:
                    "O início do intervalo deve ser depois da abertura."

            };

        }


        if (f <= i) {

            return {

                valido: false,

                mensagem:
                    "O fim do intervalo deve ser depois do início."

            };

        }


        if (f >= c) {

            return {

                valido: false,

                mensagem:
                    "O intervalo deve terminar antes do fechamento."

            };

        }

    }


    return {

        valido: true,

        mensagem: ""

    };

}


/* ==========================================================
   VALIDAÇÃO ANTES DE SALVAR CONFIGURAÇÕES
========================================================== */

function validarTodosHorariosConfiguracao() {

    let valido =
        true;


    let mensagem =
        "";


    document
        .querySelectorAll(
            ".dia-aberto"
        )
        .forEach(
            function (checkbox) {

                if (!valido) {

                    return;

                }


                if (!checkbox.checked) {

                    return;

                }


                const dia =
                    checkbox.dataset.dia;


                const abertura =
                    document.querySelector(
                        `.hora-abertura[data-dia="${dia}"]`
                    )?.value || "";


                const inicioIntervalo =
                    document.querySelector(
                        `.hora-inicio-intervalo[data-dia="${dia}"]`
                    )?.value || "";


                const fimIntervalo =
                    document.querySelector(
                        `.hora-fim-intervalo[data-dia="${dia}"]`
                    )?.value || "";


                const fechamento =
                    document.querySelector(
                        `.hora-fechamento[data-dia="${dia}"]`
                    )?.value || "";


                const resultado =
                    validarConfiguracaoHorario(
                        abertura,
                        inicioIntervalo,
                        fimIntervalo,
                        fechamento
                    );


                if (!resultado.valido) {

                    valido =
                        false;


                    const nome =
                        HORARIOS_PADRAO[dia]
                            ?.nome ||
                        dia;


                    mensagem =
                        `${nome}: ${resultado.mensagem}`;

                }

            }
        );


    if (!valido) {

        mostrarMensagem(
            mensagem
        );

    }


    return valido;

}


/* ==========================================================
   SUBSTITUIR SALVAMENTO ORIGINAL POR VALIDAÇÃO
========================================================== */

if (btnSalvarConfiguracoes) {

    btnSalvarConfiguracoes.onclick =
        function () {

            if (
                !validarTodosHorariosConfiguracao()
            ) {

                return;

            }


            salvarConfiguracoes();

        };

}


/* ==========================================================
   ATUALIZAR NOME DA BARBEARIA NA INTERFACE
========================================================== */

function atualizarIdentidadeBarbearia() {

    let configuracoes = {};


    try {

        configuracoes =
            JSON.parse(
                localStorage.getItem(
                    CONFIG_CHAVE
                )
            ) || {};

    } catch (erro) {

        configuracoes = {};

    }


    const nomeBarbearia =
        configuracoes.nomeBarbearia ||
        "Barbearia";


    document
        .querySelectorAll(
            "[data-nome-barbearia]"
        )
        .forEach(
            function (elemento) {

                elemento.textContent =
                    nomeBarbearia;

            }
        );


    document
        .querySelectorAll(
            "[data-nome-barbeiro]"
        )
        .forEach(
            function (elemento) {

                elemento.textContent =
                    configuracoes.nomeBarbeiro ||
                    "";

            }
        );

}


/* ==========================================================
   DATA DA AGENDA — ATUALIZAÇÃO AUTOMÁTICA
========================================================== */

function atualizarDataAgendaHome() {

    const elemento =
        document.getElementById(
            "dataAgendaHome"
        );


    if (!elemento) {

        return;

    }


    elemento.textContent =
        formatarDataLonga(
            dataAgendaSelecionada
        );

}


/* ==========================================================
   RESUMO DA AGENDA NA HOME
========================================================== */

function renderizarAgendaHome() {

    const lista =
        document.getElementById(
            "listaAgendaHome"
        );


    if (!lista) {

        return;

    }


    const hoje =
        dataHojeISO();


    const agendamentos =
        obterDados(
            CHAVES.agendamentos
        );


    const agendaHoje =
        agendamentos
            .filter(
                function (agendamento) {

                    return (
                        agendamento.data ===
                        hoje
                    )
                    &&
                    agendamento.status !==
                        "cancelado";

                }
            )
            .sort(
                function (a, b) {

                    return String(
                        a.hora || ""
                    ).localeCompare(
                        String(
                            b.hora || ""
                        )
                    );

                }
            )
            .slice(
                0,
                5
            );


    if (
        agendaHoje.length === 0
    ) {

        lista.innerHTML = `

            <div class="estado-agenda-home">

                <div class="estado-agenda-home-icone">
                    ✂
                </div>

                <div>

                    <strong>
                        Agenda livre
                    </strong>

                    <span>
                        Nenhum atendimento marcado para hoje.
                    </span>

                </div>

            </div>

        `;

        return;

    }


    lista.innerHTML =
        agendaHoje
            .map(
                function (agendamento) {

                    return `

                        <button
                            type="button"
                            class="item-agenda-home"
                            onclick="abrirDetalhesAgendamento('${escaparHTML(agendamento.id)}')"
                        >

                            <div class="item-agenda-home-hora">

                                <strong>
                                    ${escaparHTML(agendamento.hora || "")}
                                </strong>

                            </div>


                            <div class="item-agenda-home-info">

                                <strong>
                                    ${escaparHTML(agendamento.clienteNome || "Cliente")}
                                </strong>

                                <span>
                                    ${escaparHTML(agendamento.servicoNome || "Serviço")}
                                </span>

                            </div>


                            <span
                                class="status-agendamento status-${escaparHTML(agendamento.status || "agendado")}"
                            >
                                ${formatarStatus(agendamento.status)}
                            </span>

                        </button>

                    `;

                }
            )
            .join("");

}


/* ==========================================================
   ATUALIZAR HOME COMPLETA
========================================================== */

function atualizarHomeCompleta() {

    atualizarResumoHome();

    renderizarAgendaHome();

    atualizarIdentidadeBarbearia();

    atualizarDataAgendaHome();

}


/* ==========================================================
   ATUALIZAR AO VOLTAR PARA HOME
========================================================== */

const menuInicio =
    document.querySelector(
        ".menu-item[data-menu-tela='inicio']"
    );


if (menuInicio) {

    menuInicio.addEventListener(
        "click",
        function () {

            setTimeout(
                function () {

                    atualizarHomeCompleta();

                },
                180
            );

        }
    );

}


/* ==========================================================
   ATALHOS DE TECLADO
========================================================== */

document.addEventListener(
    "keydown",
    function (evento) {

        if (
            evento.key ===
            "Escape"
        ) {

            fecharMenu();

        }

    }
);


/* ==========================================================
   BACKUP E RESTAURAÇÃO — BARBERPRO
========================================================== */

function obterDadosBackupBarberPro() {

    const dados = {};


    for (
        let i = 0;
        i < localStorage.length;
        i++
    ) {

        const chave =
            localStorage.key(i);


        if (
            chave &&
            chave.startsWith(
                "barberpro_"
            )
        ) {

            try {

                const valor =
                    localStorage.getItem(
                        chave
                    );


                dados[chave] =
                    JSON.parse(
                        valor
                    );

            } catch (erro) {

                dados[chave] =
                    localStorage.getItem(
                        chave
                    );

            }

        }

    }


    return dados;

}


/* ==========================================================
   FAZER BACKUP
========================================================== */

async function fazerBackupBarberPro() {

    try {

        const dados =
            obterDadosBackupBarberPro();


        const backup = {

            aplicativo:
                "BarberPro",

            versaoBackup:
                "1.0",

            dataBackup:
                new Date().toISOString(),

            dados:
                dados

        };


        const conteudo =
            JSON.stringify(
                backup,
                null,
                2
            );


        const arquivo =
            new Blob(
                [
                    conteudo
                ],
                {
                    type:
                        "application/json"
                }
            );


        const agora =
            new Date();


        const ano =
            agora.getFullYear();


        const mes =
            String(
                agora.getMonth() + 1
            )
            .padStart(
                2,
                "0"
            );


        const dia =
            String(
                agora.getDate()
            )
            .padStart(
                2,
                "0"
            );


        const hora =
            String(
                agora.getHours()
            )
            .padStart(
                2,
                "0"
            );


        const minuto =
            String(
                agora.getMinutes()
            )
            .padStart(
                2,
                "0"
            );


        const nomeArquivo =
            `BarberPro_Backup_${ano}-${mes}-${dia}_${hora}-${minuto}.json`;


        if (
            navigator.share &&
            navigator.canShare
        ) {

            const arquivoBackup =
                new File(
                    [
                        arquivo
                    ],
                    nomeArquivo,
                    {
                        type:
                            "application/json"
                    }
                );


            const dadosCompartilhamento = {

                title:
                    "Backup do BarberPro",

                text:
                    "Backup dos dados da minha barbearia.",

                files:
                    [
                        arquivoBackup
                    ]

            };


            if (
                navigator.canShare(
                    dadosCompartilhamento
                )
            ) {

                await navigator.share(
                    dadosCompartilhamento
                );


                mostrarMensagem(
                    "Backup pronto para compartilhamento."
                );


                return;

            }

        }


        const url =
            URL.createObjectURL(
                arquivo
            );


        const link =
            document.createElement(
                "a"
            );


        link.href =
            url;


        link.download =
            nomeArquivo;


        document.body.appendChild(
            link
        );


        link.click();


        document.body.removeChild(
            link
        );


        URL.revokeObjectURL(
            url
        );


        mostrarMensagem(
            "Backup salvo no dispositivo."
        );

    } catch (erro) {

        if (
            erro &&
            erro.name ===
                "AbortError"
        ) {

            return;

        }


        console.error(
            "Erro ao fazer backup:",
            erro
        );


        mostrarMensagem(
            "Não foi possível realizar o backup."
        );

    }

}


/* ==========================================================
   SELECIONAR BACKUP
========================================================== */

function selecionarBackupBarberPro() {

    const input =
        document.getElementById(
            "inputBackupBarberPro"
        );


    if (!input) {

        mostrarMensagem(
            "Campo de backup não encontrado."
        );

        return;

    }


    input.click();

}


/* ==========================================================
   RESTAURAR BACKUP
========================================================== */

function restaurarBackupBarberPro(
    event
) {

    const arquivo =
        event.target.files[0];


    if (!arquivo) {

        return;

    }


    if (
        !arquivo.name
            .toLowerCase()
            .endsWith(".json")
    ) {

        alert(
            "Selecione um arquivo de backup válido do BarberPro."
        );


        event.target.value =
            "";


        return;

    }


    const leitor =
        new FileReader();


    leitor.onload =
        function (e) {

            try {

                const backup =
                    JSON.parse(
                        e.target.result
                    );


                if (
                    !backup ||
                    backup.aplicativo !==
                        "BarberPro" ||
                    !backup.dados ||
                    typeof backup.dados !==
                        "object"
                ) {

                    alert(
                        "Este arquivo não é um backup válido do BarberPro."
                    );


                    return;

                }


                const chaves =
                    Object.keys(
                        backup.dados
                    );


                if (
                    chaves.length ===
                    0
                ) {

                    alert(
                        "O backup não possui dados para restaurar."
                    );


                    return;

                }


                const confirmar =
                    confirm(
                        "⚠️ RESTAURAR BACKUP\n\n" +
                        "A restauração substituirá os dados atuais " +
                        "do BarberPro.\n\n" +
                        "Dados encontrados: " +
                        chaves.length +
                        "\n\n" +
                        "Deseja continuar?"
                    );


                if (!confirmar) {

                    event.target.value =
                        "";


                    return;

                }


                chaves.forEach(
                    function (chave) {

                        const valor =
                            backup.dados[
                                chave
                            ];


                        if (
                            typeof valor ===
                            "string"
                        ) {

                            localStorage.setItem(
                                chave,
                                valor
                            );

                        } else {

                            localStorage.setItem(
                                chave,
                                JSON.stringify(
                                    valor
                                )
                            );

                        }

                    }
                );


                alert(
                    "Backup restaurado com sucesso!\n\n" +
                    "O BarberPro será atualizado agora."
                );


                window.location.reload();

            } catch (erro) {

                console.error(
                    "Erro ao restaurar backup:",
                    erro
                );


                alert(
                    "Não foi possível ler o arquivo de backup."
                );

            }


            event.target.value =
                "";

        };


    leitor.readAsText(
        arquivo
    );

}

/* ==========================================================
   CONFIGURAÇÃO — ATUALIZAR CAMPOS VISUAIS
========================================================== */

function atualizarCamposConfiguracao() {

    const configuracoes =
        obterConfiguracoes();


    const nomeBarbearia =
        document.getElementById(
            "configNomeBarbearia"
        );


    const nomeBarbeiro =
        document.getElementById(
            "configNomeBarbeiro"
        );


    const whatsapp =
        document.getElementById(
            "configWhatsApp"
        );


    const endereco =
        document.getElementById(
            "configEndereco"
        );


    if (nomeBarbearia) {

        nomeBarbearia.value =
            configuracoes.nomeBarbearia || "";

    }


    if (nomeBarbeiro) {

        nomeBarbeiro.value =
            configuracoes.nomeBarbeiro || "";

    }


    if (whatsapp) {

        whatsapp.value =
            configuracoes.whatsapp || "";

    }


    if (endereco) {

        endereco.value =
            configuracoes.endereco || "";

    }

}


/* ==========================================================
   OBTER CONFIGURAÇÕES
========================================================== */

function obterConfiguracoes() {

    try {

        const dados =
            localStorage.getItem(
                CONFIG_CHAVE
            );


        if (!dados) {

            return {

                nomeBarbearia: "",

                nomeBarbeiro: "",

                whatsapp: "",

                endereco: "",

                horarios: {}

            };

        }


        const configuracoes =
            JSON.parse(
                dados
            );


        return {

            nomeBarbearia:
                configuracoes.nomeBarbearia ||
                "",

            nomeBarbeiro:
                configuracoes.nomeBarbeiro ||
                "",

            whatsapp:
                configuracoes.whatsapp ||
                "",

            endereco:
                configuracoes.endereco ||
                "",

            horarios:
                configuracoes.horarios ||
                {}

        };

    } catch (erro) {

        console.error(
            "Erro ao obter configurações:",
            erro
        );


        return {

            nomeBarbearia: "",

            nomeBarbeiro: "",

            whatsapp: "",

            endereco: "",

            horarios: {}

        };

    }

}


/* ==========================================================
   ATUALIZAR INTERFACE DA BARBEARIA
========================================================== */

function atualizarInterfaceBarbearia() {

    const configuracoes =
        obterConfiguracoes();


    const nome =
        configuracoes.nomeBarbearia ||
        "BarberPro";


    document
        .querySelectorAll(
            "[data-nome-barbearia]"
        )
        .forEach(
            function (elemento) {

                elemento.textContent =
                    nome;

            }
        );


    document
        .querySelectorAll(
            "[data-nome-barbeiro]"
        )
        .forEach(
            function (elemento) {

                elemento.textContent =
                    configuracoes.nomeBarbeiro ||
                    "";

            }
        );

}


/* ==========================================================
   FORMATAÇÃO DE TELEFONE PARA WHATSAPP
========================================================== */

function formatarTelefoneWhatsApp(
    telefone
) {

    let numero =
        String(
            telefone || ""
        )
        .replace(
            /\D/g,
            ""
        );


    if (!numero) {

        return "";

    }


    if (
        numero.length === 10 ||
        numero.length === 11
    ) {

        numero =
            "55" +
            numero;

    }


    return numero;

}


/* ==========================================================
   WHATSAPP DA BARBEARIA
========================================================== */

function abrirWhatsAppBarbearia() {

    const configuracoes =
        obterConfiguracoes();


    const numero =
        formatarTelefoneWhatsApp(
            configuracoes.whatsapp
        );


    if (!numero) {

        mostrarMensagem(
            "Cadastre o WhatsApp da barbearia nas configurações."
        );

        return;

    }


    const mensagem =
        encodeURIComponent(
            "Olá! Gostaria de agendar um horário."
        );


    window.open(
        `https://wa.me/${numero}?text=${mensagem}`,
        "_blank"
    );

}


/* ==========================================================
   RESUMO DO DIA
========================================================== */

function obterResumoDia(
    data
) {

    const agendamentos =
        obterDados(
            CHAVES.agendamentos
        );


    const doDia =
        agendamentos.filter(
            function (agendamento) {

                return (
                    agendamento.data ===
                    data
                );

            }
        );


    const ativos =
        doDia.filter(
            function (agendamento) {

                return (
                    agendamento.status !==
                    "cancelado"
                );

            }
        );


    const concluidos =
        doDia.filter(
            function (agendamento) {

                return (
                    agendamento.status ===
                    "concluido"
                );

            }
        );


    const faturamento =
        concluidos.reduce(
            function (
                total,
                agendamento
            ) {

                return total +
                    Number(
                        agendamento.preco ||
                        0
                    );

            },
            0
        );


    return {

        total:
            ativos.length,

        concluidos:
            concluidos.length,

        faturamento:
            faturamento

    };

}


/* ==========================================================
   ATUALIZAR CARDS DA HOME
========================================================== */

function atualizarCardsHome() {

    const hoje =
        dataHojeISO();


    const resumo =
        obterResumoDia(
            hoje
        );


    const total =
        document.getElementById(
            "resumoAgendamentos"
        );


    const clientes =
        document.getElementById(
            "resumoClientes"
        );


    const faturamento =
        document.getElementById(
            "resumoFaturamento"
        );


    if (total) {

        total.textContent =
            resumo.total;

    }


    if (clientes) {

        clientes.textContent =
            obterDados(
                CHAVES.clientes
            ).length;

    }


    /* ======================================================
       PRIVACIDADE FINANCEIRA
       O valor permanece oculto na HOME.
    ====================================================== */

    if (faturamento) {

        faturamento.textContent =
            "••••••";

    }

}


/* ==========================================================
   MOSTRAR FATURAMENTO
========================================================== */

function mostrarFinanceiro() {

    renderizarFinanceiro();

    mostrarTela(
        "financeiro"
    );

}


/* ==========================================================
   BOTÕES DE NAVEGAÇÃO DOS DETALHES
========================================================== */

const btnEditarAgendamento =
    document.getElementById(
        "btnEditarAgendamento"
    );


if (btnEditarAgendamento) {

    btnEditarAgendamento.addEventListener(
        "click",
        function () {

            if (
                agendamentoAtual
            ) {

                editarAgendamento(
                    agendamentoAtual
                );

            }

        }
    );

}


/* ==========================================================
   BOTÃO EXCLUIR AGENDAMENTO
========================================================== */

const btnExcluirAgendamento =
    document.getElementById(
        "btnExcluirAgendamento"
    );


if (btnExcluirAgendamento) {

    btnExcluirAgendamento.addEventListener(
        "click",
        excluirAgendamento
    );

}


/* ==========================================================
   BOTÃO INICIAR ATENDIMENTO
========================================================== */

const btnIniciarAtendimento =
    document.getElementById(
        "btnIniciarAtendimento"
    );


if (btnIniciarAtendimento) {

    btnIniciarAtendimento.addEventListener(
        "click",
        iniciarAtendimento
    );

}


/* ==========================================================
   BOTÃO CONCLUIR ATENDIMENTO
========================================================== */

const btnConcluirAtendimento =
    document.getElementById(
        "btnConcluirAtendimento"
    );


if (btnConcluirAtendimento) {

    btnConcluirAtendimento.addEventListener(
        "click",
        concluirAtendimento
    );

}


/* ==========================================================
   BOTÃO CANCELAR AGENDAMENTO
========================================================== */

const btnCancelarAgendamento =
    document.getElementById(
        "btnCancelarAgendamento"
    );


if (btnCancelarAgendamento) {

    btnCancelarAgendamento.addEventListener(
        "click",
        cancelarAgendamento
    );

}


/* ==========================================================
   BOTÃO REABRIR AGENDAMENTO
========================================================== */

const btnReabrirAgendamento =
    document.getElementById(
        "btnReabrirAgendamento"
    );


if (btnReabrirAgendamento) {

    btnReabrirAgendamento.addEventListener(
        "click",
        reabrirAgendamento
    );

}


/* ==========================================================
   BOTÃO WHATSAPP — DETALHES
========================================================== */

const btnWhatsAppAgendamento =
    document.getElementById(
        "btnWhatsAppAgendamento"
    );


if (btnWhatsAppAgendamento) {

    btnWhatsAppAgendamento.addEventListener(
        "click",
        function () {

            if (!agendamentoAtual) {

                return;

            }


            const agendamentos =
                obterDados(
                    CHAVES.agendamentos
                );


            const agendamento =
                agendamentos.find(
                    function (item) {

                        return String(
                            item.id
                        ) ===
                            String(
                                agendamentoAtual
                            );

                    }
                );


            if (!agendamento) {

                return;

            }


            const telefone =
                formatarTelefoneWhatsApp(
                    agendamento.clienteTelefone
                );


            if (!telefone) {

                mostrarMensagem(
                    "O cliente não possui WhatsApp cadastrado."
                );

                return;

            }


            const mensagem =
                encodeURIComponent(
                    `Olá ${agendamento.clienteNome}! Seu atendimento está agendado para ${formatarData(agendamento.data)} às ${agendamento.hora}.`
                );


            window.open(
                `https://wa.me/${telefone}?text=${mensagem}`,
                "_blank"
            );

        }
    );

}


/* ==========================================================
   BOTÃO WHATSAPP — FICHA DO CLIENTE
========================================================== */

const btnWhatsAppCliente =
    document.getElementById(
        "btnWhatsAppCliente"
    );


if (btnWhatsAppCliente) {

    btnWhatsAppCliente.addEventListener(
        "click",
        abrirWhatsAppCliente
    );

}


/* ==========================================================
   BOTÃO EDITAR CLIENTE
========================================================== */

const btnEditarCliente =
    document.getElementById(
        "btnEditarCliente"
    );


if (btnEditarCliente) {

    btnEditarCliente.addEventListener(
        "click",
        editarClienteAtual
    );

}


/* ==========================================================
   BOTÃO EXCLUIR CLIENTE
========================================================== */

const btnExcluirCliente =
    document.getElementById(
        "btnExcluirCliente"
    );


if (btnExcluirCliente) {

    btnExcluirCliente.addEventListener(
        "click",
        excluirClienteAtual
    );

}


/* ==========================================================
   BOTÃO VOLTAR DA FICHA
========================================================== */

const btnVoltarFichaCliente =
    document.getElementById(
        "btnVoltarFichaCliente"
    );


if (btnVoltarFichaCliente) {

    btnVoltarFichaCliente.addEventListener(
        "click",
        function () {

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
   BOTÃO VOLTAR DOS DETALHES
========================================================== */

const btnVoltarDetalhes =
    document.getElementById(
        "btnVoltarDetalhes"
    );


if (btnVoltarDetalhes) {

    btnVoltarDetalhes.addEventListener(
        "click",
        function () {

            agendamentoAtual =
                null;

            renderizarAgenda();

            mostrarTela(
                "agenda"
            );

        }
    );

}


/* ==========================================================
   BOTÃO VOLTAR NOVO AGENDAMENTO
========================================================== */

const btnVoltarNovoAgendamento =
    document.getElementById(
        "btnVoltarNovoAgendamento"
    );


if (btnVoltarNovoAgendamento) {

    btnVoltarNovoAgendamento.addEventListener(
        "click",
        function () {

            agendamentoAtual =
                null;

            renderizarAgenda();

            mostrarTela(
                "agenda"
            );

        }
    );

}


/* ==========================================================
   BOTÃO VOLTAR NOVO CLIENTE
========================================================== */

const btnVoltarNovoCliente =
    document.getElementById(
        "btnVoltarNovoCliente"
    );


if (btnVoltarNovoCliente) {

    btnVoltarNovoCliente.addEventListener(
        "click",
        function () {

            renderizarClientes();

            mostrarTela(
                "clientes"
            );

        }
    );

}


/* ==========================================================
   BOTÃO VOLTAR NOVO SERVIÇO
========================================================== */

const btnVoltarNovoServico =
    document.getElementById(
        "btnVoltarNovoServico"
    );


if (btnVoltarNovoServico) {

    btnVoltarNovoServico.addEventListener(
        "click",
        function () {

            renderizarServicos();

            mostrarTela(
                "servicos"
            );

        }
    );

}


/* ==========================================================
   BOTÃO VOLTAR CONFIGURAÇÕES
========================================================== */

const botoesVoltarConfiguracoes =
    document.querySelectorAll(
        "[data-voltar='inicio']"
    );


botoesVoltarConfiguracoes.forEach(
    function (botao) {

        botao.addEventListener(
            "click",
            function () {

                atualizarHomeCompleta();

            }
        );

    }
);


/* ==========================================================
   FECHAR MENU AO CLICAR EM TELA
========================================================== */

document.addEventListener(
    "click",
    function (evento) {

        const menu =
            document.getElementById(
                "menuLateral"
            );


        if (!menu) {

            return;

        }


        if (
            !menu.classList.contains(
                "aberto"
            )
        ) {

            return;

        }


        const dentroMenu =
            menu.contains(
                evento.target
            );


        const botaoMenu =
            document.getElementById(
                "btnMenu"
            );


        const clicouBotao =
            botaoMenu &&
            botaoMenu.contains(
                evento.target
            );


        if (
            !dentroMenu &&
            !clicouBotao
        ) {

            fecharMenu();

        }

    }
);


/* ==========================================================
   PREVENIR SUBMISSÃO ACIDENTAL
========================================================== */

document
    .querySelectorAll(
        "form"
    )
    .forEach(
        function (formulario) {

            formulario.addEventListener(
                "keydown",
                function (evento) {

                    if (
                        evento.key ===
                        "Enter"
                    ) {

                        const elemento =
                            evento.target;


                        if (
                            elemento.tagName ===
                            "TEXTAREA"
                        ) {

                            return;

                        }

                    }

                }
            );

        }
    );


/* ==========================================================
   MANTER A DATA DA AGENDA
========================================================== */

function atualizarDataAgendaSelecionada() {

    if (!dataAgendaSelecionada) {

        dataAgendaSelecionada =
            dataHojeISO();

    }


    const partes =
        dataAgendaSelecionada
            .split("-");


    if (
        partes.length !== 3
    ) {

        dataAgendaSelecionada =
            dataHojeISO();

    }

}


/* ==========================================================
   ATUALIZAÇÃO GERAL DO SISTEMA
========================================================== */

function atualizarSistema() {

    atualizarDataAgendaSelecionada();

    atualizarSelectServicos();

    atualizarSugestoesClientes();

    renderizarCalendario();

    renderizarAgenda();

    renderizarClientes();

    renderizarServicos();

    atualizarCardsHome();

    renderizarAgendaHome();

    renderizarFinanceiro();

    atualizarInterfaceBarbearia();

}


/* ==========================================================
   VISIBILIDADE DO FINANCEIRO
========================================================== */

function protegerResumoFinanceiroHome() {

    const elemento =
        document.getElementById(
            "resumoFaturamento"
        );


    if (!elemento) {

        return;

    }


    elemento.textContent =
        "••••••";

}


/* ==========================================================
   VOLTAR PARA HOME
========================================================== */

function voltarParaInicio() {

    atualizarHomeCompleta();

    protegerResumoFinanceiroHome();

    mostrarTela(
        "inicio"
    );

}


/* ==========================================================
   BOTÕES COM AÇÃO VOLTAR
========================================================== */

document
    .querySelectorAll(
        "[data-acao='inicio']"
    )
    .forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                voltarParaInicio
            );

        }
    );


/* ==========================================================
   ATUALIZAÇÃO QUANDO A ABA VOLTA A FICAR VISÍVEL
========================================================== */

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.visibilityState ===
            "visible"
        ) {

            atualizarSistema();

        }

    }
);


/* ==========================================================
   ATUALIZAÇÃO AO RETORNAR PARA A JANELA
========================================================== */

window.addEventListener(
    "focus",
    function () {

        atualizarSistema();

    }
);


/* ==========================================================
   INÍCIO DA PARTE 4
========================================================== */
/* ==========================================================
   CONFIGURAÇÕES — HORÁRIOS
========================================================== */

function prepararConfiguracoesHorarios() {

    document
        .querySelectorAll(
            ".dia-config"
        )
        .forEach(
            function (bloco) {

                const checkbox =
                    bloco.querySelector(
                        ".dia-aberto"
                    );


                if (!checkbox) {

                    return;

                }


                checkbox.addEventListener(
                    "change",
                    function () {

                        atualizarEstadoHorarios();

                    }
                );

            }
        );


    atualizarEstadoHorarios();

}


/* ==========================================================
   BOTÃO CANCELAR CONFIGURAÇÕES
========================================================== */

const btnCancelarConfiguracoes =
    document.getElementById(
        "btnCancelarConfiguracoes"
    );


if (btnCancelarConfiguracoes) {

    btnCancelarConfiguracoes.addEventListener(
        "click",
        function () {

            carregarConfiguracoes();

            mostrarTela(
                "inicio"
            );

        }
    );

}


/* ==========================================================
   CONFIGURAÇÃO — TESTAR WHATSAPP
========================================================== */

const btnTestarWhatsApp =
    document.getElementById(
        "btnTestarWhatsApp"
    );


if (btnTestarWhatsApp) {

    btnTestarWhatsApp.addEventListener(
        "click",
        function () {

            abrirWhatsAppBarbearia();

        }
    );

}


/* ==========================================================
   CONFIGURAÇÃO — LIMPAR DADOS
========================================================== */

function limparDadosBarberPro() {

    const confirmar =
        confirm(
            "⚠️ ATENÇÃO\n\n" +
            "Isso apagará os agendamentos, clientes e serviços cadastrados neste aparelho.\n\n" +
            "Essa ação não poderá ser desfeita sem um backup.\n\n" +
            "Deseja continuar?"
        );


    if (!confirmar) {

        return;

    }


    const confirmarNovamente =
        confirm(
            "Tem certeza que deseja apagar os dados do BarberPro?"
        );


    if (!confirmarNovamente) {

        return;

    }


    localStorage.removeItem(
        CHAVES.agendamentos
    );


    localStorage.removeItem(
        CHAVES.clientes
    );


    localStorage.removeItem(
        CHAVES.servicos
    );


    mostrarMensagem(
        "Dados apagados."
    );


    setTimeout(
        function () {

            criarServicosPadrao();

            atualizarSistema();

            mostrarTela(
                "inicio"
            );

        },
        300
    );

}


/* ==========================================================
   BOTÃO LIMPAR DADOS
========================================================== */

const btnLimparDados =
    document.getElementById(
        "btnLimparDados"
    );


if (btnLimparDados) {

    btnLimparDados.addEventListener(
        "click",
        limparDadosBarberPro
    );

}


/* ==========================================================
   EXPORTAR DADOS EM TEXTO
========================================================== */

function gerarResumoBackup() {

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


    const configuracoes =
        obterConfiguracoes();


    return {

        agendamentos:
            agendamentos.length,

        clientes:
            clientes.length,

        servicos:
            servicos.length,

        nomeBarbearia:
            configuracoes.nomeBarbearia ||
            "Não informado"

    };

}


/* ==========================================================
   INFORMAÇÕES DO BACKUP
========================================================== */

function atualizarInformacoesBackup() {

    const elemento =
        document.getElementById(
            "informacoesBackup"
        );


    if (!elemento) {

        return;

    }


    const resumo =
        gerarResumoBackup();


    elemento.innerHTML = `

        <div class="backup-info-linha">

            <span>
                Clientes
            </span>

            <strong>
                ${resumo.clientes}
            </strong>

        </div>


        <div class="backup-info-linha">

            <span>
                Agendamentos
            </span>

            <strong>
                ${resumo.agendamentos}
            </strong>

        </div>


        <div class="backup-info-linha">

            <span>
                Serviços
            </span>

            <strong>
                ${resumo.servicos}
            </strong>

        </div>

    `;

}


/* ==========================================================
   ATUALIZAR INFORMAÇÕES AO ABRIR CONFIGURAÇÕES
========================================================== */

const menuConfiguracoes =
    document.querySelector(
        ".menu-item[data-menu-tela='configuracoes']"
    );


if (menuConfiguracoes) {

    menuConfiguracoes.addEventListener(
        "click",
        function () {

            setTimeout(
                function () {

                    carregarConfiguracoes();

                    atualizarInformacoesBackup();

                },
                180
            );

        }
    );

}


/* ==========================================================
   ATUALIZAR INFORMAÇÕES AO FAZER BACKUP
========================================================== */

const botaoBackup =
    document.querySelector(
        "[onclick='fazerBackupBarberPro()']"
    );


if (botaoBackup) {

    botaoBackup.addEventListener(
        "click",
        function () {

            setTimeout(
                function () {

                    atualizarInformacoesBackup();

                },
                500
            );

        }
    );

}


/* ==========================================================
   INSTALAÇÃO COMO PWA
========================================================== */

let eventoInstalacaoPWA = null;


/* ==========================================================
   CAPTURAR EVENTO DE INSTALAÇÃO
========================================================== */

window.addEventListener(
    "beforeinstallprompt",
    function (evento) {

        evento.preventDefault();

        eventoInstalacaoPWA =
            evento;


        const botao =
            document.getElementById(
                "btnInstalarApp"
            );


        if (botao) {

            botao.style.display =
                "flex";

        }

    }
);


/* ==========================================================
   INSTALAR APP
========================================================== */

async function instalarBarberPro() {

    if (!eventoInstalacaoPWA) {

        mostrarMensagem(
            "A instalação ainda não está disponível neste navegador."
        );

        return;

    }


    eventoInstalacaoPWA.prompt();


    const resultado =
        await eventoInstalacaoPWA
            .userChoice;


    console.log(
        "Resultado da instalação:",
        resultado.outcome
    );


    eventoInstalacaoPWA =
        null;


    const botao =
        document.getElementById(
            "btnInstalarApp"
        );


    if (botao) {

        botao.style.display =
            "none";

    }

}


/* ==========================================================
   BOTÃO INSTALAR
========================================================== */

const btnInstalarApp =
    document.getElementById(
        "btnInstalarApp"
    );


if (btnInstalarApp) {

    btnInstalarApp.addEventListener(
        "click",
        instalarBarberPro
    );

}


/* ==========================================================
   DETECTAR APP JÁ INSTALADO
========================================================== */

window.addEventListener(
    "appinstalled",
    function () {

        eventoInstalacaoPWA =
            null;


        const botao =
            document.getElementById(
                "btnInstalarApp"
            );


        if (botao) {

            botao.style.display =
                "none";

        }


        mostrarMensagem(
            "BarberPro instalado com sucesso!"
        );

    }
);


/* ==========================================================
   MODO STANDALONE
========================================================== */

function verificarModoInstalado() {

    const instalado =
        window.matchMedia &&
        window.matchMedia(
            "(display-mode: standalone)"
        ).matches;


    if (instalado) {

        document.body.classList.add(
            "barberpro-instalado"
        );

    }

}


/* ==========================================================
   VERIFICAR CONEXÃO
========================================================== */

function atualizarStatusConexao() {

    const indicador =
        document.getElementById(
            "statusConexao"
        );


    if (!indicador) {

        return;

    }


    if (navigator.onLine) {

        indicador.textContent =
            "Online";

        indicador.classList.remove(
            "offline"
        );

    } else {

        indicador.textContent =
            "Offline";

        indicador.classList.add(
            "offline"
        );

    }

}


/* ==========================================================
   EVENTOS DE CONEXÃO
========================================================== */

window.addEventListener(
    "online",
    function () {

        atualizarStatusConexao();

        mostrarMensagem(
            "Conexão restabelecida."
        );

    }
);


window.addEventListener(
    "offline",
    function () {

        atualizarStatusConexao();

        mostrarMensagem(
            "Você está offline. Os dados continuam salvos neste aparelho."
        );

    }
);


/* ==========================================================
   RELÓGIO DO SISTEMA
========================================================== */

function atualizarRelogioBarberPro() {

    const elemento =
        document.getElementById(
            "relogioBarberPro"
        );


    if (!elemento) {

        return;

    }


    const agora =
        new Date();


    const hora =
        String(
            agora.getHours()
        )
        .padStart(
            2,
            "0"
        );


    const minuto =
        String(
            agora.getMinutes()
        )
        .padStart(
            2,
            "0"
        );


    elemento.textContent =
        `${hora}:${minuto}`;

}


setInterval(
    atualizarRelogioBarberPro,
    30000
);


/* ==========================================================
   DATA ATUAL NO SISTEMA
========================================================== */

function atualizarDataSistema() {

    const elementos =
        document.querySelectorAll(
            "[data-data-atual]"
        );


    if (!elementos.length) {

        return;

    }


    const hoje =
        dataHojeISO();


    elementos.forEach(
        function (elemento) {

            elemento.textContent =
                formatarData(
                    hoje
                );

        }
    );

}


/* ==========================================================
   ATUALIZAÇÃO DO STATUS DA AGENDA
========================================================== */

function atualizarStatusAgendaAtual() {

    const horario =
        obterHorarioFuncionamento(
            dataAgendaSelecionada
        );


    const elemento =
        document.getElementById(
            "statusAgendaAtual"
        );


    if (!elemento) {

        return;

    }


    if (!horario) {

        elemento.textContent =
            "Horário não definido";

        return;

    }


    if (!horario.aberto) {

        elemento.textContent =
            "Fechado";

        return;

    }


    elemento.textContent =
        `${horario.abertura} às ${horario.fechamento}`;

}


/* ==========================================================
   ATUALIZAR TODAS AS INFORMAÇÕES VISUAIS
========================================================== */

function atualizarInterfaceCompleta() {

    atualizarDataAgendaSelecionada();

    atualizarInterfaceBarbearia();

    atualizarDataSistema();

    atualizarRelogioBarberPro();

    atualizarStatusConexao();

    atualizarStatusAgendaAtual();

    atualizarCardsHome();

    renderizarAgendaHome();

    renderizarFuncionamentoAgenda();

}


/* ==========================================================
   MUDANÇA DE DATA NA AGENDA
========================================================== */

function aoMudarDataAgenda() {

    atualizarDataAgendaSelecionada();

    atualizarStatusAgendaAtual();

    renderizarFuncionamentoAgenda();

    renderizarAgenda();

}


/* ==========================================================
   OBSERVAR ALTERAÇÕES DE DATA
========================================================== */

const campoDataAgenda =
    document.getElementById(
        "agendamentoData"
    );


if (campoDataAgenda) {

    campoDataAgenda.addEventListener(
        "change",
        function () {

            if (
                campoDataAgenda.value
            ) {

                const partes =
                    campoDataAgenda
                        .value
                        .split("-");


                if (
                    partes.length ===
                    3
                ) {

                    dataAgendaSelecionada =
                        campoDataAgenda.value;


                    mesAgendaAtual =
                        new Date(
                            Number(partes[0]),
                            Number(partes[1]) - 1,
                            1
                        );

                }

            }

        }
    );

}


/* ==========================================================
   OBSERVAR ALTERAÇÃO DE SERVIÇO
========================================================== */

document.addEventListener(
    "change",
    function (evento) {

        if (
            evento.target &&
            evento.target.id ===
                "agendamentoServico"
        ) {

            atualizarValorServico();

        }

    }
);


/* ==========================================================
   ATUALIZAR AGENDA APÓS QUALQUER ALTERAÇÃO
========================================================== */

function atualizarDepoisDeSalvar() {

    atualizarSelectServicos();

    atualizarSugestoesClientes();

    renderizarCalendario();

    renderizarAgenda();

    renderizarClientes();

    renderizarServicos();

    atualizarHomeCompleta();

    renderizarFinanceiro();

    atualizarInformacoesBackup();

}


/* ==========================================================
   EVENTO STORAGE
========================================================== */

window.addEventListener(
    "storage",
    function (evento) {

        if (
            !evento.key
        ) {

            return;

        }


        if (
            evento.key.startsWith(
                "barberpro_"
            )
        ) {

            atualizarDepoisDeSalvar();

        }

    }
);


/* ==========================================================
   PROTEÇÃO CONTRA DUPLO CLIQUE
========================================================== */

let ultimoCliqueFormulario =
    0;


function podeEnviarFormulario() {

    const agora =
        Date.now();


    if (
        agora -
        ultimoCliqueFormulario <
        700
    ) {

        return false;

    }


    ultimoCliqueFormulario =
        agora;


    return true;

}


/* ==========================================================
   PROTEÇÃO DOS FORMULÁRIOS
========================================================== */

document
    .querySelectorAll(
        "form"
    )
    .forEach(
        function (formulario) {

            formulario.addEventListener(
                "submit",
                function (evento) {

                    if (
                        !podeEnviarFormulario()
                    ) {

                        evento.preventDefault();

                    }

                }
            );

        }
    );


/* ==========================================================
   GARANTIR SERVIÇOS PADRÃO
========================================================== */

function garantirServicosPadrao() {

    const servicos =
        obterDados(
            CHAVES.servicos
        );


    if (
        !Array.isArray(servicos) ||
        servicos.length === 0
    ) {

        criarServicosPadrao();

    }

}


/* ==========================================================
   GARANTIR DATA INICIAL
========================================================== */

function garantirDataInicial() {

    if (
        !dataAgendaSelecionada
    ) {

        dataAgendaSelecionada =
            dataHojeISO();

    }


    const partes =
        dataAgendaSelecionada
            .split("-");


    if (
        partes.length !== 3
    ) {

        dataAgendaSelecionada =
            dataHojeISO();

    }


    const data =
        dataAgendaSelecionada
            .split("-");


    mesAgendaAtual =
        new Date(
            Number(data[0]),
            Number(data[1]) - 1,
            1
        );

}


/* ==========================================================
   VERIFICAR ELEMENTOS ESSENCIAIS
========================================================== */

function verificarEstruturaBarberPro() {

    const elementosObrigatorios = [

        "telaInicio",

        "telaAgenda",

        "telaNovoAgendamento",

        "telaClientes",

        "telaServicos",

        "telaFinanceiro",

        "telaConfiguracoes"

    ];


    const ausentes =
        elementosObrigatorios.filter(
            function (id) {

                return !document.getElementById(
                    id
                );

            }
        );


    if (
        ausentes.length > 0
    ) {

        console.warn(
            "Elementos ausentes:",
            ausentes
        );

        return false;

    }


    return true;

}


/* ==========================================================
   PREPARAR APLICAÇÃO
========================================================== */

function prepararBarberPro() {

    verificarEstruturaBarberPro();

    garantirDataInicial();

    garantirServicosPadrao();

    prepararConfiguracoesHorarios();

    atualizarEstadoHorarios();

    atualizarInterfaceCompleta();

}


/* ==========================================================
   FINAL DA PARTE 5
========================================================== */
/* ==========================================================
   INICIALIZAÇÃO — BARBERPRO
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


    /* ======================================================
       TESTAR LOCALSTORAGE
    ====================================================== */

    if (
        !testarArmazenamento()
    ) {

        console.error(
            "LocalStorage não disponível."
        );


        mostrarMensagem(
            "Atenção: armazenamento indisponível."
        );

    }


    /* ======================================================
       PREPARAR SISTEMA
    ====================================================== */

    prepararBarberPro();


    /* ======================================================
       SERVIÇOS
    ====================================================== */

    criarServicosPadrao();

    atualizarSelectServicos();


    /* ======================================================
       CLIENTES
    ====================================================== */

    atualizarSugestoesClientes();


    /* ======================================================
       AGENDA
    ====================================================== */

    garantirDataInicial();

    renderizarCalendario();

    renderizarAgenda();


    /* ======================================================
       CLIENTES / SERVIÇOS
    ====================================================== */

    renderizarClientes();

    renderizarServicos();


    /* ======================================================
       HOME
    ====================================================== */

    atualizarResumoHome();

    atualizarCardsHome();

    renderizarAgendaHome();


    /* ======================================================
       FINANCEIRO
       
       O valor real fica disponível somente
       dentro da tela Financeiro.
    ====================================================== */

    renderizarFinanceiro();


    /* ======================================================
       CONFIGURAÇÕES
    ====================================================== */

    carregarConfiguracoes();

    atualizarInterfaceBarbearia();

    atualizarIdentidadeBarbearia();

    atualizarInformacoesBackup();


    /* ======================================================
       STATUS DO SISTEMA
    ====================================================== */

    atualizarStatusConexao();

    atualizarDataSistema();

    atualizarRelogioBarberPro();

    verificarModoInstalado();


    /* ======================================================
       GARANTIR ESTADO INICIAL
    ====================================================== */

    protegerResumoFinanceiroHome();


    /* ======================================================
       MOSTRAR HOME
    ====================================================== */

    mostrarTela(
        "inicio"
    );


    /* ======================================================
       ATUALIZAR HOME NOVAMENTE
       
       Garante que os dados apareçam depois
       de toda a preparação do sistema.
    ====================================================== */

    setTimeout(
        function () {

            atualizarHomeCompleta();

            protegerResumoFinanceiroHome();

        },
        100
    );


    /* ======================================================
       LOGS DE TESTE
    ====================================================== */

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
        "Configurações:",
        obterConfiguracoes()
    );


    console.log(
        "================================"
    );

    console.log(
        "BARBERPRO PRONTO."
    );

    console.log(
        "================================"
    );

}


/* ==========================================================
   INICIAR QUANDO O HTML ESTIVER PRONTO
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


/* ==========================================================
   FIM DO BARBERPRO
========================================================== */
