// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    const navLinks = document.querySelectorAll('.nav-link');

    // Function to open mobile menu
    function openMobileMenu() {
        console.log('Opening mobile menu');
        mobileToggle.classList.add('active');
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent body scroll
    }

    // Function to close mobile menu
    function closeMobileMenu() {
        console.log('Closing mobile menu');
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore body scroll
    }

    // Toggle mobile menu when hamburger is clicked
    mobileToggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close mobile menu when close button is clicked
    mobileMenuClose.addEventListener('click', function (e) {
        e.preventDefault();
        closeMobileMenu();
    });

    // Close mobile menu when overlay is clicked
    mobileMenuOverlay.addEventListener('click', function () {
        closeMobileMenu();
    });

    // Close mobile menu when clicking on mobile menu links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeMobileMenu();

            // Remove active class from all mobile links
            mobileMenuLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            // Also update desktop nav active state
            const href = this.getAttribute('href');
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
                if (navLink.getAttribute('href') === href) {
                    navLink.classList.add('active');
                }
            });
        });
    });

    // Close mobile menu when clicking on desktop nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeMobileMenu();

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link (except CTA button)
            if (!this.classList.contains('cta-button')) {
                this.classList.add('active');

                // Also update mobile nav active state
                const href = this.getAttribute('href');
                mobileMenuLinks.forEach(mobileLink => {
                    mobileLink.classList.remove('active');
                    if (mobileLink.getAttribute('href') === href) {
                        mobileLink.classList.add('active');
                    }
                });
            }
        });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Navbar scroll effect - Remove auto-hide, keep it sticky
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar-container');
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove scroll class for styling changes if needed
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add hover effect to floating circles
    const floatingCircles = document.querySelectorAll('.floating-circle');
    floatingCircles.forEach(circle => {
        circle.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.2)';
        });

        circle.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 992 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});

const scrollButton = document.querySelector('.scroll-button');
const projectsSection = document.querySelector('#projetos');

if (scrollButton && projectsSection) {
    scrollButton.addEventListener('click', function () {
        projectsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

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

const hero = document.querySelector('.home-container');

function criarEstrelas() {

    // cria a camada que vai receber as estrelas
    const starsContainer = document.createElement('div');

    starsContainer.classList.add('stars');

    hero.appendChild(starsContainer);


    // quantidade de estrelas
    const quantidade = 180;


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
        const opacity = Math.random() * 0.6 + 0.25;


        // duração diferente para cada estrela
        const duration = Math.random() * 4 + 3;


        // atraso diferente
        const delay = Math.random() * 5;


        estrela.style.left = `${x}%`;
        estrela.style.top = `${y}%`;

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
           Aproximadamente 8% das estrelas
           terão um brilho um pouco maior
        */

        if (Math.random() < 0.08) {

            estrela.classList.add('glow');

            estrela.style.setProperty(
                '--size',
                `${Math.random() * 1.5 + 1.5}px`
            );
        }


        starsContainer.appendChild(estrela);
    }
}
criarEstrelas();