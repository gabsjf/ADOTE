/* ============================================
   CORTINA DE TEATRO - PRELOADER
   ============================================ */
window.addEventListener('load', function() {
    const theaterCurtain = document.querySelector('.theater-curtain');
    
    setTimeout(() => {
        if (theaterCurtain) {
            theaterCurtain.classList.add('open');
            setTimeout(() => {
                theaterCurtain.classList.add('hidden');
            }, 1500); 
        }
    }, 300);
});

/* ============================================
   MENU MOBILE - HAMBURGER
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(() => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }, 300);
        });
    });
});

/* ============================================
   SCROLL SUAVE
   ============================================ */
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

/* ============================================
   EFEITO DE FADE-IN AO SCROLL
   ============================================ */
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

document.querySelectorAll('.course-card, .portfolio-card, .testimonial-card, .team-member, .tribute-card, .performance-section').forEach(el => {
    el.classList.add('animate-hidden');
    observer.observe(el);
});

/* ============================================
   HERO SLIDER (FADE AUTOMÁTICO)
   ============================================ */
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

/* ============================================
   SLIDER GALERIA (NOSSOS MOMENTOS)
   ============================================ */
function initGallerySlider() {
    const container = document.querySelector('.portfolio'); // Ou a classe pai da galeria
    if (!container) return;

    const track = container.querySelector('.slider-track');
    const nextBtn = container.querySelector('.next-slide');
    const prevBtn = container.querySelector('.prev-slide');
    const slides = container.querySelectorAll('.photo-slide');
    
    let index = 0;

    function update() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
        track.style.transform = `translateX(-${index * (slideWidth + gap)}px)`;
    }

    nextBtn?.addEventListener('click', () => {
        // Mostra 3 por vez no desktop, 1 no mobile
        const visibleSlides = window.innerWidth > 768 ? 3 : 1;
        index = (index < slides.length - visibleSlides) ? index + 1 : 0;
        update();
    });

    prevBtn?.addEventListener('click', () => {
        const visibleSlides = window.innerWidth > 768 ? 3 : 1;
        index = (index > 0) ? index - 1 : slides.length - visibleSlides;
        update();
    });

    window.addEventListener('resize', update);
}

/* ============================================
   SLIDER NOTÍCIAS (EM CARTAZ - ESTILO GSHOW)
   ============================================ */
// --- SLIDER DE NOTÍCIAS COM CÁLCULO DINÂMICO ---
function initNewsSlider() {
    const container = document.querySelector('.photo-slider-section');
    if (!container) return;

    const track = container.querySelector('.slider-track');
    const slides = container.querySelectorAll('.news-item');
    const nextBtn = container.querySelector('.next-slide');
    const prevBtn = container.querySelector('.prev-slide');
    
    let index = 0;

    function move() {
        if (slides.length === 0) return;
        
        // Pega a largura exata do card no momento (independente de ser desktop ou mobile)
        const slideWidth = slides[0].offsetWidth;
        
        // Pega o gap definido no CSS (30px no desktop, 0 no mobile)
        const gap = parseInt(window.getComputedStyle(track).gap) || 0;
        
        // Calcula o deslocamento
        track.style.transform = `translateX(-${index * (slideWidth + gap)}px)`;
    }

    nextBtn?.addEventListener('click', () => {
        index = (index < slides.length - 1) ? index + 1 : 0;
        move();
    });

    prevBtn?.addEventListener('click', () => {
        index = (index > 0) ? index - 1 : slides.length - 1;
        move();
    });

    // Recalcula a posição se a tela mudar de tamanho
    window.addEventListener('resize', move);
}

// Chame a função no DOMContentLoaded
document.addEventListener('DOMContentLoaded', initNewsSlider);
/* ============================================
   INICIALIZAÇÃO GLOBAL
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initGallerySlider();
    initNewsSlider();
    
    // Sticky Header Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            header.style.boxShadow = window.scrollY > 50 
                ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
                : '0 4px 16px rgba(0, 0, 0, 0.15)';
        }
    });
});
