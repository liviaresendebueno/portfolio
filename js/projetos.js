const projetos = [
    {
        nome: "TaskFlow",
        data: "Junho 2024",
        categoria: "Web App",
        descricao: "Aplicação para gerenciamento de tarefas, com foco em produtividade e organização.",
        imagem: "imgs/projetos/projeto1.png",
        link: ""
    },

    {
        nome: "Analytics Hub",
        data: "Março 2024",
        categoria: "Dashboard",
        descricao: "Dashboard com gráficos e métricas em tempo real consumindo uma API REST.",
        imagem: "/imgs/projetos/projeto2.png",
        link: ""
    },

    {
        nome: "ClimaTempo",
        data: "Janeiro 2024",
        categoria: "Web App",
        descricao: "Aplicação para consulta da previsão do tempo utilizando uma API externa.",
        imagem: "/imgs/projetos/projeto3.png",
        link: ""
    }
];

const containerProjetos = document.getElementById("projetos-container");
const quantidadeProjetos = document.getElementById("quantidade-projetos");

function carregarProjetos() {

    quantidadeProjetos.textContent = `${projetos.length} projetos`;

    projetos.forEach(projeto => {

        const card = document.createElement("article");

        card.classList.add("projeto-card");

        card.innerHTML = `
            <div class="projeto-imagem">
                <img 
                    src="${projeto.imagem}" 
                    alt="Imagem do projeto ${projeto.nome}"
                >
            </div>

            <div class="projeto-conteudo">

                <div class="projeto-info">
                    <span class="projeto-categoria">
                        ${projeto.categoria}
                    </span>

                    <span class="projeto-data">
                        ${projeto.data}
                    </span>
                </div>

                <h3>${projeto.nome}</h3>

                <p>
                    ${projeto.descricao}
                </p>

                <a 
                    href="${projeto.link}" 
                    target="_blank"
                    class="projeto-button"
                >
                    View More
                    <span>→</span>
                </a>

            </div>
        `;

        containerProjetos.appendChild(card);
    });
}

carregarProjetos();