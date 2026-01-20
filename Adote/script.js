// ============================================
// CORTINA DE TEATRO - PRELOADER
// ============================================

window.addEventListener('load', function() {
    const theaterCurtain = document.querySelector('.theater-curtain');
    
    // Aguardar um pouco para que a página esteja totalmente carregada
    setTimeout(() => {
        if (theaterCurtain) {
            // Adicionar classe para iniciar a animação de abertura
            theaterCurtain.classList.add('open');
            
            // Remover a cortina após a animação terminar
            setTimeout(() => {
                theaterCurtain.classList.add('hidden');
            }, 1500); // Tempo da animação em ms
        }
    }, 300); // Pequeno delay antes de começar a animação
});

// ============================================
// MENU MOBILE - HAMBURGER
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Adiciona um pequeno delay para o scroll suave funcionar antes de fechar o menu
            setTimeout(() => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }, 300);
        });
    });
});

// ============================================
// SCROLL SUAVE
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ============================================
// EFEITO DE FADE-IN AO SCROLL (Mais orgânico)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar observer a elementos que queremos animar
document.querySelectorAll('.course-card, .portfolio-card, .testimonial-card, .team-member, .tribute-card, .performance-section').forEach(el => {
    el.classList.add('animate-hidden');
    observer.observe(el);
});

// Adicionar estilos de animação no CSS:
// .animate-hidden { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
// .animate-visible { opacity: 1; transform: translateY(0); }

// ============================================
// NAVBAR STICKY COM EFEITO DE SOMBRA
// ============================================

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    }
});

console.log('Script carregado com sucesso!');