// ==================== ESTRELAS DA HERO ====================

function criarEstrelas() {
    const hero = document.querySelector('#home');
    if (!hero) return; // proteção caso o elemento não exista

    // evita duplicar estrelas se a função rodar mais de uma vez
    const existente = hero.querySelector('.stars');
    if (existente) existente.remove();

    // cria a camada que vai receber as estrelas
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars');
    hero.appendChild(starsContainer);

    // quantidade de estrelas
    const quantidade = 600;

    for (let i = 0; i < quantidade; i++) {

        const estrela = document.createElement('span');
        estrela.classList.add('star');

        // posição horizontal aleatória
        const x = Math.random() * 100;

        // posição vertical aleatória
        const y = Math.random() * 100;

        // tamanho entre aproximadamente 0.5px e 2px
        const tamanho = Math.random() * 1.5 + 0.5;

        // transparência
        const opacity = Math.random() * 1 + 0.25;

        // duração diferente para cada estrela
        const duration = Math.random() * 4 + 3;

        // atraso diferente
        const delay = Math.random() * 4;

        estrela.style.left = `${x}%`;
        estrela.style.top = `${y}%`;

        estrela.style.setProperty('--size', `${tamanho}px`);
        estrela.style.setProperty('--opacity', opacity);
        estrela.style.setProperty('--duration', `${duration}s`);
        estrela.style.setProperty('--delay', `-${delay}s`);

        /*
           Aproximadamente 8% das estrelas
           terão um brilho um pouco maior
        */
        if (Math.random() < 0.08) {
            estrela.classList.add('glow');
            estrela.style.setProperty('--size', `${Math.random() * 1.5 + 1.5}px`);
        }

        starsContainer.appendChild(estrela);
    }
}

// roda assim que o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', criarEstrelas);
} else {
    criarEstrelas();
}