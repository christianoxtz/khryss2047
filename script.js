/*
=====================================================================================
    SCRIPT.JS: INTERATIVIDADE AVANÇADA
    Funcionalidades: Menu Hamburger, Smooth Scroll, Preloader, Contador Regressivo,
    Animações ao Scroll (Intersection Observer), Carrosséis (Retrospectiva e Equipe),
    Lightbox de Galeria, Formulário (Validação/Feedback).
    Arquitetura: Modularizada com ES6+.
=====================================================================================
*/

/**
 * ================================================================================
 * 1. MÓDULO DE UTILIDADES E INICIALIZAÇÃO DO DOM
 * ================================================================================
 */

const DOM = {
    // Header e Navegação
    header: document.getElementById('mainHeader'),
    hamburger: document.getElementById('hamburgerToggle'),
    mobileMenu: document.getElementById('mobileMenuOverlay'),
    navLinks: document.querySelectorAll('.nav-link, .mobile-nav-link'),
    
    // Animações
    animatedElements: document.querySelectorAll('[data-animation]'),
    
    // Preloader
    preloader: document.getElementById('preloader'),
    
    // Contador Regressivo
    countdownTimer: document.getElementById('countdownTimer'),
    
    // Carrossel Retrospectiva
    retrospectiveCarousel: document.getElementById('retrospectiveCarousel'),
    retrospectiveDots: document.getElementById('retrospectiveDots'),
    retrospectivePrev: document.querySelector('.carousel-prev'),
    retrospectiveNext: document.querySelector('.carousel-next'),
    
    // Carrossel Equipe
    teamCarousel: document.getElementById('teamCarousel'),
    teamPrev: document.querySelector('.team-carousel-prev'),
    teamNext: document.querySelector('.team-carousel-next'),
    teamCurrentSlideIndicator: document.querySelector('.current-slide-indicator'),
    teamTotalSlidesIndicator: document.querySelector('.total-slides-indicator'),
    teamCards: document.querySelectorAll('#teamCarousel .team-member-card'),
    
    // Galeria e Lightbox
    mainGallery: document.getElementById('mainGallery'),
    galleryItems: document.querySelectorAll('.gallery-item'),
    lightboxModal: document.getElementById('lightboxModal'),
    lightboxImage: document.getElementById('lightboxImage'),
    lightboxCaption: document.getElementById('lightboxCaption'),
    lightboxCounter: document.getElementById('lightboxCounter'),
    lightboxClose: document.querySelector('.lightbox-close-btn'),
    lightboxPrev: document.querySelector('.lightbox-prev-btn'),
    lightboxNext: document.querySelector('.lightbox-next-btn'),
    
    // Formulário
    rsvpForm: document.getElementById('rsvpForm'),
    formMessage: document.getElementById('formMessage'),
};

/**
 * Função para configurar o ano atual no footer (microanimação)
 */
const setYear = () => {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
};

/**
 * ================================================================================
 * 2. MÓDULO DE NAVEGAÇÃO E SCROLL
 * ================================================================================
 */

const NavigationModule = (() => {
    
    /**
     * Alterna o estado do menu hamburger/mobile.
     */
    const toggleMobileMenu = () => {
        DOM.hamburger.classList.toggle('is-active');
        DOM.mobileMenu.classList.toggle('is-open');
        document.body.classList.toggle('no-scroll'); // Previne scroll no body
    };

    /**
     * Manipula a classe do header ao rolar.
     */
    const handleScrollHeader = () => {
        if (window.scrollY > 50) {
            DOM.header.setAttribute('data-scroll-state', 'scrolled');
        } else {
            DOM.header.setAttribute('data-scroll-state', 'top');
        }
    };
    
    /**
     * Smooth Scroll para âncoras internas.
     */
    const handleSmoothScroll = (event) => {
        if (event.target.closest('.smooth-scroll')) {
            event.preventDefault();
            const targetId = event.target.closest('.smooth-scroll').getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Fechar menu mobile se estiver aberto
                if (DOM.mobileMenu.classList.contains('is-open')) {
                    toggleMobileMenu();
                }
                
                // Opções de scroll suave e moderno
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Adicionar o hash na URL sem pular
                history.pushState(null, '', `#${targetId}`);
            }
        }
    };
    
    /**
     * Marca o link ativo no menu (opcional: mais complexo e precisa de IntersectionObserver)
     */
    const setActiveLink = () => {
        const sections = document.querySelectorAll('main section');
        let currentActive = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - DOM.header.offsetHeight - 20; // Ajuste para header
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActive = section.id;
            }
        });

        DOM.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActive)) {
                link.classList.add('active');
            }
        });
    };
    
    /**
     * Inicializa eventos de navegação.
     */
    const init = () => {
        // Eventos do Menu Hamburger
        DOM.hamburger.addEventListener('click', toggleMobileMenu);
        
        // Eventos de Scroll
        window.addEventListener('scroll', handleScrollHeader);
        window.addEventListener('scroll', setActiveLink);
        
        // Evento de Smooth Scroll
        document.addEventListener('click', handleSmoothScroll);
        
        // Ativação inicial
        handleScrollHeader();
        setActiveLink();
    };

    return { init };
})();

/**
 * ================================================================================
 * 3. MÓDULO DE ANIMAÇÕES AO SCROLL (INTERSECTION OBSERVER)
 * ================================================================================
 */

const ScrollAnimationModule = (() => {
    
    /**
     * Callback para o Intersection Observer.
     */
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe 'is-visible' para iniciar a transição CSS
                entry.target.classList.add('is-visible');
                
                // Se houver delay, usa setTimeout
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    setTimeout(() => {
                         entry.target.classList.add('is-visible');
                    }, parseFloat(delay) * 1000);
                } else {
                    entry.target.classList.add('is-visible');
                }
                
                // Opcional: Para animações que só devem ocorrer uma vez
                observer.unobserve(entry.target);
            }
        });
    };
    
    /**
     * Configuração do Intersection Observer.
     */
    const setupObserver = () => {
        // Opções de observação: 15% do elemento visível
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.15 // 15% do elemento precisa estar visível
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observa todos os elementos que possuem a classe de animação
        document.querySelectorAll('.animate-fade-up, .animate-fade-left, .animate-fade-right, .animate-blur-in').forEach(element => {
            observer.observe(element);
        });
        
        // Observa as seções com data-animation (para efeitos de fundo ou mudanças de estado)
        DOM.animatedElements.forEach(element => {
            observer.observe(element);
        });
    };
    
    const init = () => {
        setupObserver();
    };

    return { init };
})();

/**
 * ================================================================================
 * 4. MÓDULO DE CONTADOR REGRESSIVO
 * ================================================================================
 */

const CountdownModule = (() => {
    
    // Data alvo: Exemplo 12 de Dezembro de 2025 às 20:00:00 (Fuso Brasil -3)
    const targetDate = new Date('2025-12-12T20:00:00-03:00').getTime();

    /**
     * Formata um número para ter sempre 2 dígitos.
     */
    const formatTime = (value) => String(value).padStart(2, '0');

    /**
     * Atualiza o contador regressivo.
     */
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            clearInterval(countdownInterval);
            DOM.countdownTimer.innerHTML = '<span class="timer-final-message">EVENTO EM ANDAMENTO!</span>';
            document.querySelector('.countdown-message').textContent = 'Celebre Conosco! O ano letivo está encerrado.';
            return;
        }

        // Atualiza o DOM
        DOM.countdownTimer.querySelector('[data-unit="d"]').textContent = formatTime(days);
        DOM.countdownTimer.querySelector('[data-unit="h"]').textContent = formatTime(hours);
        DOM.countdownTimer.querySelector('[data-unit="m"]').textContent = formatTime(minutes);
        DOM.countdownTimer.querySelector('[data-unit="s"]').textContent = formatTime(seconds);
    };

    let countdownInterval;

    const init = () => {
        if (DOM.countdownTimer) {
            updateCountdown(); // Chamada imediata para evitar "flash"
            countdownInterval = setInterval(updateCountdown, 1000);
        }
    };

    return { init };
})();

/**
 * ================================================================================
 * 5. MÓDULO DE CARROSSÉIS
 * ================================================================================
 */

const CarouselModule = (() => {

    /**
     * Controlador de Carrossel Reutilizável
     * @param {HTMLElement} container - O elemento pai do carrossel (que contém os slides)
     * @param {HTMLElement} prevBtn - Botão de slide anterior
     * @param {HTMLElement} nextBtn - Botão de próximo slide
     * @param {HTMLElement} dotContainer - Container para os pontos de navegação
     * @param {boolean} isAutoplay - Define se deve haver autoplay
     * @param {number} interval - Intervalo de autoplay em ms
     * @param {HTMLElement} paginationIndicator - Elemento opcional para paginação 'X de Y'
     */
    class Carousel {
        constructor(container, prevBtn, nextBtn, dotContainer, isAutoplay = false, interval = 5000, paginationIndicator = null) {
            this.container = container;
            this.slides = Array.from(container.children);
            this.currentIndex = 0;
            this.prevBtn = prevBtn;
            this.nextBtn = nextBtn;
            this.dotContainer = dotContainer;
            this.isAutoplay = isAutoplay;
            this.interval = interval;
            this.paginationIndicator = paginationIndicator;
            this.autoplayTimer = null;

            if (this.slides.length > 0) {
                this.setupDots();
                this.updateUI();
                this.addEventListeners();
                if (this.isAutoplay) {
                    this.startAutoplay();
                }
            }
        }

        setupDots() {
            if (!this.dotContainer) return;
            this.dotContainer.innerHTML = '';
            this.slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.setAttribute('data-index', index);
                dot.addEventListener('click', () => this.goToSlide(index));
                this.dotContainer.appendChild(dot);
            });
            this.dots = Array.from(this.dotContainer.children);
        }

        goToSlide(index) {
            // Lógica para controle de limites
            if (index < 0) {
                this.currentIndex = this.slides.length - 1;
            } else if (index >= this.slides.length) {
                this.currentIndex = 0;
            } else {
                this.currentIndex = index;
            }

            this.updateUI();
            
            // Se houver autoplay, resetar o timer ao navegar manualmente
            if (this.isAutoplay) {
                this.stopAutoplay();
                this.startAutoplay();
            }
        }

        nextSlide() {
            this.goToSlide(this.currentIndex + 1);
        }

        prevSlide() {
            this.goToSlide(this.currentIndex - 1);
        }

        updateUI() {
            // 1. Atualizar visibilidade/posição dos slides
            // Para Retrospectiva (opacity/class-based):
            if (this.container.id === 'retrospectiveCarousel') {
                this.slides.forEach((slide, index) => {
                    slide.classList.remove('slide-active');
                    if (index === this.currentIndex) {
                        slide.classList.add('slide-active');
                    }
                });
            } 
            // Para Equipe (transform/scroll-based):
            else if (this.container.id === 'teamCarousel') {
                // Scroll para a posição do slide atual
                const scrollPosition = this.currentIndex * this.slides[0].offsetWidth + (this.currentIndex * 40); // 40px de gap
                this.container.scroll({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            }


            // 2. Atualizar Dots
            if (this.dotContainer) {
                this.dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === this.currentIndex);
                });
            }

            // 3. Atualizar Paginação (se existir)
            if (this.paginationIndicator) {
                this.paginationIndicator.current.textContent = this.currentIndex + 1;
                this.paginationIndicator.total.textContent = this.slides.length;
            }
        }

        startAutoplay() {
            if (this.isAutoplay) {
                this.autoplayTimer = setInterval(() => this.nextSlide(), this.interval);
            }
        }

        stopAutoplay() {
            if (this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
                this.autoplayTimer = null;
            }
        }

        addEventListeners() {
            if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
            if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());

            // Pausa o autoplay ao passar o mouse (UX premium)
            this.container.addEventListener('mouseenter', () => this.stopAutoplay());
            this.container.addEventListener('mouseleave', () => this.startAutoplay());
        }
    }

    const init = () => {
        // Inicializar Carrossel de Retrospectiva (Autoplay)
        if (DOM.retrospectiveCarousel) {
             new Carousel(
                DOM.retrospectiveCarousel, 
                DOM.retrospectivePrev, 
                DOM.retrospectiveNext, 
                DOM.retrospectiveDots, 
                true, // Autoplay ativo
                8000 // Intervalo de 8 segundos
            );
        }

        // Inicializar Carrossel de Equipe (Manual)
        if (DOM.teamCarousel) {
            const teamPagination = {
                current: DOM.teamCurrentSlideIndicator,
                total: DOM.teamTotalSlidesIndicator
            };
            new Carousel(
                DOM.teamCarousel, 
                DOM.teamPrev, 
                DOM.teamNext, 
                null, // Sem dots para este carrossel
                false, 
                0, 
                teamPagination
            );
        }
    };

    return { init };
})();

/**
 * ================================================================================
 * 6. MÓDULO DE GALERIA E LIGHTBOX
 * ================================================================================
 */

const LightboxModule = (() => {

    let currentGalleryIndex = 0;
    const galleryImages = Array.from(DOM.galleryItems);
    
    /**
     * Abre o lightbox na imagem específica.
     */
    const openLightbox = (index) => {
        currentGalleryIndex = index;
        const item = galleryImages[currentGalleryIndex];
        
        DOM.lightboxImage.src = item.querySelector('.gallery-img').getAttribute('data-full-src');
        DOM.lightboxCaption.textContent = item.querySelector('.overlay-lightbox').getAttribute('data-title');
        DOM.lightboxCounter.textContent = `${currentGalleryIndex + 1} de ${galleryImages.length}`;

        DOM.lightboxModal.classList.add('is-open');
        document.body.classList.add('no-scroll');
        
        // Foco no modal para acessibilidade
        DOM.lightboxModal.focus(); 
    };

    /**
     * Fecha o lightbox.
     */
    const closeLightbox = () => {
        DOM.lightboxModal.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
    };
    
    /**
     * Navega para a próxima imagem.
     */
    const nextImage = () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        openLightbox(currentGalleryIndex);
    };
    
    /**
     * Navega para a imagem anterior.
     */
    const prevImage = () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        openLightbox(currentGalleryIndex);
    };

    /**
     * Adiciona ouvintes de evento para a galeria e o lightbox.
     */
    const addEventListeners = () => {
        // Evento de clique na galeria para abrir o lightbox
        galleryImages.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });
        
        // Eventos do Modal
        DOM.lightboxClose.addEventListener('click', closeLightbox);
        DOM.lightboxNext.addEventListener('click', nextImage);
        DOM.lightboxPrev.addEventListener('click', prevImage);
        
        // Fechar ao clicar fora (no fundo do modal)
        DOM.lightboxModal.addEventListener('click', (e) => {
            if (e.target === DOM.lightboxModal) {
                closeLightbox();
            }
        });
        
        // Fechar com a tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && DOM.lightboxModal.classList.contains('is-open')) {
                closeLightbox();
            }
            if (e.key === 'ArrowRight' && DOM.lightboxModal.classList.contains('is-open')) {
                nextImage();
            }
            if (e.key === 'ArrowLeft' && DOM.lightboxModal.classList.contains('is-open')) {
                prevImage();
            }
        });
        
        // Lógica de "Carregar Mais" (simulação)
        const loadMoreBtn = document.getElementById('loadMoreGallery');
        if (loadMoreBtn) {
             loadMoreBtn.addEventListener('click', () => {
                loadMoreBtn.textContent = 'Novos 12 Itens Carregados!';
                loadMoreBtn.disabled = true;
                // Em um projeto real, aqui estaria a chamada AJAX para carregar mais itens no DOM
                console.log('Simulação: Carregando mais itens de galeria...');
            });
        }
    };

    const init = () => {
        if (DOM.mainGallery) {
            addEventListeners();
        }
    };

    return { init };
})();

/**
 * ================================================================================
 * 7. MÓDULO DE FORMULÁRIO (RSVP)
 * ================================================================================
 */

const FormModule = (() => {

    /**
     * Validação básica do formulário.
     */
    const validateForm = (form) => {
        let isValid = true;
        const requiredInputs = form.querySelectorAll('input[required], select[required]');
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('input-error');
                isValid = false;
            } else {
                input.classList.remove('input-error');
            }
            
            if (input.type === 'email' && input.value.trim() && !/\S+@\S+\.\S+/.test(input.value)) {
                 input.classList.add('input-error');
                 isValid = false;
                 // Em um projeto real, esta validação seria mais robusta
            }
        });
        
        return isValid;
    };

    /**
     * Lida com o envio do formulário.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validateForm(DOM.rsvpForm)) {
            displayMessage('Por favor, preencha todos os campos obrigatórios corretamente.', 'error');
            return;
        }

        // Desabilita o botão para evitar múltiplos envios
        const submitBtn = DOM.rsvpForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            // Simulação de envio AJAX (fetch API moderno)
            const formData = new FormData(DOM.rsvpForm);
            
            // Aqui estaria a chamada real para o servidor
            // const response = await fetch(DOM.rsvpForm.action, {
            //     method: DOM.rsvpForm.method,
            //     body: formData
            // });
            
            // Simulação de delay de rede
            await new Promise(resolve => setTimeout(resolve, 1500)); 

            // Simulação de resposta bem-sucedida
            const success = Math.random() > 0.1; // 90% de chance de sucesso
            
            if (success) {
                 displayMessage('Confirmação de presença enviada com sucesso! Obrigado.', 'success');
                 DOM.rsvpForm.reset();
            } else {
                 throw new Error('Erro de Conexão. Tente novamente.');
            }

        } catch (error) {
            console.error('Erro de envio:', error);
            displayMessage(`Falha ao enviar: ${error.message || 'Verifique sua conexão.'}`, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Confirmação';
        }
    };
    
    /**
     * Exibe a mensagem de feedback.
     */
    const displayMessage = (message, type) => {
        DOM.formMessage.textContent = message;
        DOM.formMessage.className = `form-feedback-message form-feedback-${type}`;
        DOM.formMessage.style.display = 'block';

        // Oculta a mensagem após 5 segundos
        setTimeout(() => {
            DOM.formMessage.style.display = 'none';
        }, 5000);
    };

    const init = () => {
        if (DOM.rsvpForm) {
            DOM.rsvpForm.addEventListener('submit', handleSubmit);
        }
    };

    return { init };
})();


/**
 * ================================================================================
 * 8. MÓDULO DE PRELOADER
 * ================================================================================
 */

const PreloaderModule = (() => {

    /**
     * Oculta o preloader após o carregamento da página.
     */
    const hidePreloader = () => {
        if (DOM.preloader) {
            // Garante que o CSS está carregado e que o DOM está pronto para a transição
            setTimeout(() => {
                DOM.preloader.classList.add('hidden');
                document.body.style.overflow = ''; // Permite o scroll
            }, 500); // Meio segundo de delay para garantir que a transição CSS funcione
            
            // Remove o preloader do DOM após a transição
            setTimeout(() => {
                DOM.preloader.remove();
            }, 1000);
        }
    };
    
    // A função init será chamada no evento 'load' da janela.
    const init = () => {
        window.addEventListener('load', hidePreloader);
    };

    return { init };
})();


/**
 * ================================================================================
 * 9. INICIALIZAÇÃO GERAL
 * ================================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Configurações básicas
    setYear();
    
    // Inicialização dos Módulos
    NavigationModule.init();
    CountdownModule.init();
    CarouselModule.init();
    LightboxModule.init();
    FormModule.init();
    
    // A ativação das animações de scroll deve ser a última, para garantir que todos os elementos estejam no DOM
    ScrollAnimationModule.init();

    // O preloader deve ser inicializado no DOMContentLoaded, mas a ação principal é no 'load'
    PreloaderModule.init();
    
    // Inicializa o Tilt.js para os Cards 3D (se a biblioteca estiver carregada)
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".card-3d"), {
            max: 10,
            speed: 800,
            perspective: 1000,
            glare: true,
            "max-glare": 0.3
        });
    } else {
        console.warn("Vanilla-Tilt.js não carregado. O efeito 3D dos cards será desativado.");
    }
    
    console.log("Sistema de Site Corporativo Premium Inicializado com Sucesso. (v1.0)");
});

/* --- FIM DO ARQUIVO SCRIPT.JS --- */
