document.addEventListener('DOMContentLoaded', function () {

    /* =========================================
       ELEMENTOS DA NAVBAR
    ========================================= */

    const navbarContainer = document.querySelector('.navbar-container');

    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    const navLinks = document.querySelectorAll('.nav-link');

    const sections = document.querySelectorAll(
        '#home, #projetos, #sobre-mim, #contato'
    );


    /* =========================================
       MENU MOBILE
    ========================================= */

    function abrirMenuMobile() {

        mobileToggle.classList.add('active');
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');

        mobileToggle.setAttribute('aria-expanded', 'true');

        document.body.style.overflow = 'hidden';
    }


    function fecharMenuMobile() {

        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');

        mobileToggle.setAttribute('aria-expanded', 'false');

        document.body.style.overflow = '';
    }


    /* ABRIR / FECHAR PELO HAMBÚRGUER */

    mobileToggle.addEventListener('click', function (event) {

        event.preventDefault();

        const menuEstaAberto =
            mobileMenu.classList.contains('active');

        if (menuEstaAberto) {
            fecharMenuMobile();
        } else {
            abrirMenuMobile();
        }

    });


    /* BOTÃO X */

    mobileMenuClose.addEventListener('click', function () {
        fecharMenuMobile();
    });


    /* CLICAR NO FUNDO */

    mobileMenuOverlay.addEventListener('click', function () {
        fecharMenuMobile();
    });


    /* ESC */

    document.addEventListener('keydown', function (event) {

        if (
            event.key === 'Escape' &&
            mobileMenu.classList.contains('active')
        ) {
            fecharMenuMobile();
        }

    });


    /* =========================================
       NAVEGAÇÃO SUAVE
    ========================================= */

    const todosLinksInternos =
        document.querySelectorAll('a[href^="#"]');


    todosLinksInternos.forEach(link => {

        link.addEventListener('click', function (event) {

            const href =
                this.getAttribute('href');

            if (!href || href === '#') {
                return;
            }

            const destino =
                document.querySelector(href);

            if (!destino) {
                return;
            }

            event.preventDefault();

            /* Fecha menu caso esteja no mobile */

            if (mobileMenu.classList.contains('active')) {
                fecharMenuMobile();
            }


            /* Scroll */

            destino.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        });

    });


    /* =========================================
       NAVBAR AO FAZER SCROLL
    ========================================= */

    function atualizarNavbarScroll() {

        if (window.scrollY > 40) {

            navbarContainer.classList.add('scrolled');

        } else {

            navbarContainer.classList.remove('scrolled');

        }

    }


    atualizarNavbarScroll();


    window.addEventListener(
        'scroll',
        atualizarNavbarScroll,
        {
            passive: true
        }
    );


    /* =========================================
       LINK ATIVO
       DESKTOP + MOBILE
    ========================================= */

    function definirLinkAtivo(id) {

        const hrefAtual = `#${id}`;


        /* DESKTOP */

        navLinks.forEach(link => {

            const ativo =
                link.getAttribute('href') === hrefAtual;

            link.classList.toggle(
                'active',
                ativo
            );

        });


        /* MOBILE */

        mobileMenuLinks.forEach(link => {

            const ativo =
                link.getAttribute('href') === hrefAtual;

            link.classList.toggle(
                'active',
                ativo
            );

        });

    }


    /* =========================================
       DETECTAR SEÇÃO ATUAL
    ========================================= */

    function atualizarSecaoAtiva() {

        /*
            Linha imaginária usada para decidir
            qual seção está ativa.

            35% da altura da tela.
        */

        const pontoDeLeitura =
            window.scrollY +
            window.innerHeight * 0.35;


        let secaoAtual = 'home';


        sections.forEach(section => {

            if (
                pontoDeLeitura >= section.offsetTop
            ) {

                secaoAtual = section.id;

            }

        });


        /*
            Se chegou praticamente no final
            da página, ativa Contato.
        */

        const chegouAoFinal =
            window.innerHeight +
            window.scrollY >=
            document.documentElement.scrollHeight - 20;


        if (chegouAoFinal) {
            secaoAtual = 'contato';
        }


        definirLinkAtivo(secaoAtual);

    }


    atualizarSecaoAtiva();


    window.addEventListener(
        'scroll',
        atualizarSecaoAtiva,
        {
            passive: true
        }
    );


    /* =========================================
       BOTÃO SCROLL DA HERO
    ========================================= */

    const scrollButton =
        document.querySelector('.scroll-button');

    const projectsSection =
        document.querySelector('#projetos');


    if (
        scrollButton &&
        projectsSection
    ) {

        scrollButton.addEventListener(
            'click',
            function () {

                projectsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

            }
        );

    }


    /* =========================================
       RESPONSIVIDADE
    ========================================= */

    window.addEventListener('resize', function () {

        /*
            Se o menu mobile estiver aberto
            e a tela voltar para desktop,
            fecha o menu.
        */

        if (
            window.innerWidth > 992 &&
            mobileMenu.classList.contains('active')
        ) {

            fecharMenuMobile();

        }

    });


    /* =========================================
       ESTRELAS DA HERO
    ========================================= */

    const hero =
        document.querySelector('.home-container');


    function criarEstrelas() {

        if (!hero) {
            return;
        }


        /*
            Evita criar estrelas novamente
            caso a função seja chamada duas vezes.
        */

        if (hero.querySelector('.stars')) {
            return;
        }


        const starsContainer =
            document.createElement('div');


        starsContainer.classList.add('stars');

        starsContainer.setAttribute(
            'aria-hidden',
            'true'
        );


        hero.appendChild(starsContainer);


        /* Quantidade de estrelas */

        const quantidade = 180;


        for (
            let i = 0;
            i < quantidade;
            i++
        ) {

            const estrela =
                document.createElement('span');


            estrela.classList.add('star');


            /* Posição */

            const x =
                Math.random() * 100;

            const y =
                Math.random() * 100;


            /* Tamanho */

            const tamanho =
                Math.random() * 1.5 + 0.5;


            /* Transparência */

            const opacity =
                Math.random() * 0.6 + 0.25;


            /* Duração */

            const duration =
                Math.random() * 4 + 3;


            /* Delay */

            const delay =
                Math.random() * 5;


            estrela.style.left =
                `${x}%`;

            estrela.style.top =
                `${y}%`;


            estrela.style.setProperty(
                '--size',
                `${tamanho}px`
            );


            estrela.style.setProperty(
                '--opacity',
                opacity
            );


            estrela.style.setProperty(
                '--duration',
                `${duration}s`
            );


            estrela.style.setProperty(
                '--delay',
                `-${delay}s`
            );


            /*
                Aproximadamente 8% recebem
                um brilho maior.
            */

            if (
                Math.random() < 0.08
            ) {

                estrela.classList.add('glow');


                estrela.style.setProperty(
                    '--size',
                    `${Math.random() * 1.5 + 1.5}px`
                );

            }


            starsContainer.appendChild(
                estrela
            );

        }

    }


    criarEstrelas();

});

/* =========================================
   AJUSTE DA NAVBAR POR TAMANHO DE TELA
========================================= */

const navbar = document.querySelector('.navbar');

function ajustarNavbar() {

    if (window.innerWidth < 992) {

        navbar.classList.remove('navbar');

    } else {

        navbar.classList.add('navbar');

    }

}

ajustarNavbar();

window.addEventListener('resize', ajustarNavbar);