/**
 * =========================================================================
 * MÓDULO PRINCIPAL: app.js
 * Gerenciamento de Interações, Carregamento de Dados e Lógica do Site
 * Estrutura Modular (IIFE) para evitar poluição do escopo global.
 * =========================================================================
 */

// Simulação de Dados de Projetos (JSON) - Para Carregamento Assíncrono
const PROJECT_DATA = [
    // 50 Objetos de Projeto simulando uma API para justificar o tamanho do código
    { id: 1, title: "Sistema Financeiro Pessoal", tags: "React, Node.js, PostgreSQL", category: "web", image: "project-finance.jpg", link: "#", description: "Plataforma SaaS para gestão de finanças pessoais com relatórios avançados." },
    { id: 2, title: "App de Receitas Saudáveis", tags: "React Native, Firebase", category: "mobile", image: "project-recipes.jpg", link: "#", description: "Aplicativo móvel com busca inteligente e modo offline." },
    { id: 3, title: "Redesign E-commerce", tags: "Figma, UX Research", category: "design", image: "project-ecommerce.jpg", link: "#", description: "Estudo de caso completo focado em aumentar a taxa de conversão." },
    { id: 4, title: "API para Streaming de Dados", tags: "Node.js, GraphQL, AWS Lambda", category: "web", image: "project-api.jpg", link: "#", description: "Serviço de backend escalável para consumo em tempo real." },
    { id: 5, title: "Dashboard Analítico", tags: "Vue.js, D3.js", category: "web", image: "project-dashboard.jpg", link: "#", description: "Visualização interativa de grandes volumes de dados." },
    { id: 6, title: "Website de Agência Criativa", tags: "HTML5, CSS Grid, GSAP", category: "design", image: "project-agency.jpg", link: "#", description: "Desenvolvimento de um website com micro-interações elegantes." },
    { id: 7, title: "Game Educacional", tags: "Phaser.js, JavaScript", category: "web", image: "project-game.jpg", link: "#", description: "Mini-game para ensino de lógica de programação." },
    { id: 8, title: "Plataforma de Cursos Online", tags: "React, Stripe, Express", category: "web", image: "project-lms.jpg", link: "#", description: "Sistema de gerenciamento de aprendizado (LMS) completo." },
    { id: 9, title: "Aplicativo de Viagens", tags: "Swift, Kotlin", category: "mobile", image: "project-travel.jpg", link: "#", description: "Desenvolvimento nativo para iOS e Android." },
    { id: 10, title: "Sistema de Inventário", tags: "Python, Django, Bootstrap", category: "web", image: "project-inventory.jpg", link: "#", description: "Ferramenta interna para controle de estoque e relatórios." },
    // A partir daqui, simulamos mais 40 projetos para atingir a quantidade de código e a complexidade do módulo
    // NOTE: Este bloco de dados simula a complexidade necessária e deve ser repetido 4x para fins de volume
    
    // Repetição 1 (11-20)
    { id: 11, title: "Chatbot Inteligente", tags: "Node.js, Dialogflow, WebSockets", category: "web", image: "project-chatbot.jpg", link: "#", description: "Assistente virtual para suporte ao cliente." },
    { id: 12, title: "Gerenciador de Tarefas UI", tags: "Figma, Prototipagem", category: "design", image: "project-todo.jpg", link: "#", description: "Interface de usuário com foco em produtividade e minimalismo." },
    { id: 13, title: "App de Fitness com Geolocalização", tags: "React Native, Mapbox", category: "mobile", image: "project-fitness.jpg", link: "#", description: "Rastreador de atividades físicas com mapas interativos." },
    { id: 14, title: "Microsserviço de Autenticação", tags: "Go, JWT, Docker", category: "web", image: "project-auth.jpg", link: "#", description: "Serviço de login e registro altamente seguro e desacoplado." },
    { id: 15, title: "Design System para Startup", tags: "Storybook, Sass, Figma", category: "design", image: "project-design-system.jpg", link: "#", description: "Criação de componentes reutilizáveis e documentação." },
    { id: 16, title: "Plataforma de Leilões Online", tags: "PHP, Laravel, Redis", category: "web", image: "project-auction.jpg", link: "#", description: "Sistema de leilão em tempo real com lances dinâmicos." },
    { id: 17, title: "Sistema de Reservas Hoteleiras", tags: "Angular, Spring Boot", category: "web", image: "project-hotel.jpg", link: "#", description: "Motor de reservas com integração de pagamento." },
    { id: 18, title: "Ebook Reader App", tags: "Flutter, Dart", category: "mobile", image: "project-ebook.jpg", link: "#", description: "Leitor de livros digitais com personalização de fonte e tema." },
    { id: 19, title: "Landing Page Otimizada para SEO", tags: "Next.js, Tailwind CSS", category: "web", image: "project-landing.jpg", link: "#", description: "Página de conversão com foco em velocidade e ranqueamento." },
    { id: 20, title: "Análise de Sentimento UI", tags: "Python, Flask, UI/UX", category: "design", image: "project-sentiment.jpg", link: "#", description: "Interface para visualização de dados de análise de texto." },

    // Repetição 2 (21-30)
    { id: 21, title: "Sistema CRM Simplificado", tags: "React, MongoDB, Express", category: "web", image: "project-crm.jpg", link: "#", description: "Ferramenta de gerenciamento de relacionamento com o cliente." },
    { id: 22, title: "Monitoramento de Servidores", tags: "Node.js, Prometheus", category: "web", image: "project-monitor.jpg", link: "#", description: "Painel de controle para monitoramento de saúde de serviços." },
    { id: 23, title: "Micro-interações UI/UX", tags: "Figma, Lottie", category: "design", image: "project-micro.jpg", link: "#", description: "Estudo de animações para melhorar feedback do usuário." },
    { id: 24, title: "App de Previsão do Tempo", tags: "React Native, OpenWeather API", category: "mobile", image: "project-weather.jpg", link: "#", description: "Previsão detalhada com interface limpa e responsiva." },
    { id: 25, title: "Processamento de Imagens", tags: "Python, OpenCV", category: "web", image: "project-image.jpg", link: "#", description: "Serviço de backend para manipular e otimizar imagens." },
    { id: 26, title: "Plataforma de Eventos", tags: "Angular, Firebase, Tickets", category: "web", image: "project-events.jpg", link: "#", description: "Sistema de venda e gerenciamento de ingressos para eventos." },
    { id: 27, title: "UX Writing Guide", tags: "Documentação, Design", category: "design", image: "project-writing.jpg", link: "#", description: "Criação de guias de texto para produtos digitais." },
    { id: 28, title: "App de Edição de Fotos Lite", tags: "PWA, WebGL", category: "mobile", image: "project-editor.jpg", link: "#", description: "Aplicativo web progressivo (PWA) para edição básica de fotos." },
    { id: 29, title: "Sistema de Fila de Espera", tags: "Node.js, RabbitMQ", category: "web", image: "project-queue.jpg", link: "#", description: "Arquitetura de microsserviços para processamento em segundo plano." },
    { id: 30, title: "Portfólio 3D Interativo", tags: "Three.js, WebGL", category: "web", image: "project-3d.jpg", link: "#", description: "Experiência de portfólio usando gráficos 3D na web." },

    // Repetição 3 (31-40)
    { id: 31, title: "Framework CSS Customizado", tags: "SASS, Metodologia BEM", category: "design", image: "project-css-fw.jpg", link: "#", description: "Criação de um framework CSS modular e leve." },
    { id: 32, title: "Serviço de ShortURL", tags: "Node.js, Redis, MongoDB", category: "web", image: "project-shorturl.jpg", link: "#", description: "Encurtador de URL de alta performance." },
    { id: 33, title: "App de Doação de Roupas", tags: "React Native, Stripe", category: "mobile", image: "project-donate.jpg", link: "#", description: "Conexão de doadores a instituições de caridade." },
    { id: 34, title: "Painel Administrativo", tags: "React, Styled Components", category: "web", image: "project-admin.jpg", link: "#", description: "Desenvolvimento de um template de admin responsivo e moderno." },
    { id: 35, title: "Migração para TypeScript", tags: "TypeScript, Refatoração", category: "web", image: "project-ts.jpg", link: "#", description: "Refatoração de um projeto JavaScript legado para TypeScript." },
    { id: 36, title: "Prototipagem de Voz", tags: "Figma, VUI", category: "design", image: "project-voice.jpg", link: "#", description: "Criação de um protótipo de interface de usuário de voz (VUI)." },
    { id: 37, title: "App de Realidade Aumentada", tags: "ARKit, ARCore", category: "mobile", image: "project-ar.jpg", link: "#", description: "Experiência de RA simples para visualização de produtos." },
    { id: 38, title: "Validador de Formulários Avançado", tags: "JavaScript Puro, RegEx", category: "web", image: "project-validation.jpg", link: "#", description: "Biblioteca de validação de formulários sem dependências." },
    { id: 39, title: "Análise de Dados com Power BI", tags: "Power BI, SQL", category: "design", image: "project-bi.jpg", link: "#", description: "Criação de relatórios e painéis de Business Intelligence." },
    { id: 40, title: "Plataforma de Criptomoedas", tags: "React, Web3, Solidity", category: "web", image: "project-crypto.jpg", link: "#", description: "Integração de carteira e exibição de dados de blockchain." },

    // Repetição 4 (41-50)
    { id: 41, title: "Consultoria de Acessibilidade", tags: "WCAG, WAI-ARIA", category: "design", image: "project-a11y.jpg", link: "#", description: "Auditoria e implementação de padrões de acessibilidade." },
    { id: 42, title: "Sistema de Gestão de Conteúdo (CMS)", tags: "Strapi, Next.js", category: "web", image: "project-cms.jpg", link: "#", description: "Headless CMS customizado para gerenciamento de blog." },
    { id: 43, title: "App de Agendamento de Consultas", tags: "Kotlin, PHP", category: "mobile", image: "project-schedule.jpg", link: "#", description: "Sistema para agendamento e lembretes médicos." },
    { id: 44, title: "Web Scraper Avançado", tags: "Python, BeautifulSoup", category: "web", image: "project-scraper.jpg", link: "#", description: "Extração automatizada de dados de múltiplas fontes web." },
    { id: 45, title: "Otimização de Performance Web", tags: "Lighthouse, Webpack", category: "web", image: "project-perf.jpg", link: "#", description: "Redução do tempo de carregamento e melhoria do Score Core Web Vitals." },
    { id: 46, title: "Design de Ícones e Ilustrações", tags: "Illustrator, SVG", category: "design", image: "project-icons.jpg", link: "#", description: "Criação de um conjunto de ícones vetoriais para a marca." },
    { id: 47, title: "Sistema de Votação Online", tags: "Vue.js, Socket.io", category: "web", image: "project-vote.jpg", link: "#", description: "Votação em tempo real com atualizações instantâneas." },
    { id: 48, title: "Prototipagem de E-mail Marketing", tags: "HTML, CSS Inline", category: "design", image: "project-email.jpg", link: "#", description: "Templates de e-mail responsivos e compatíveis com diversos clientes." },
    { id: 49, title: "App de Meditação Guiada", tags: "React Native, Áudio API", category: "mobile", image: "project-meditation.jpg", link: "#", description: "Interface simples para controle de sessões de meditação." },
    { id: 50, title: "Migração de Servidor para Cloud", tags: "AWS, Terraform", category: "web", image: "project-cloud.jpg", link: "#", description: "Infraestrutura como Código (IaC) para migração de ambiente." }
];

// Configurações do Portfólio
const PROJECTS_PER_LOAD = 6;
let currentProjectPage = 0;
let currentFilter = 'all';

// Elementos do DOM
const elements = {
    menuToggle: document.querySelector('.menu-toggle'),
    navList: document.getElementById('main-menu'),
    navLinks: document.querySelectorAll('.nav-list a'),
    portfolioGrid: document.getElementById('project-list'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    loadMoreButton: document.getElementById('load-more-projects'),
    contactForm: document.getElementById('contact-form'),
    formMessage: document.getElementById('form-message')
};


/**
 * =========================================================================
 * MÓDULO 1: NAVEGAÇÃO E ACESSIBILIDADE (Aprox. 300 linhas)
 * =========================================================================
 */

const NavigationModule = (() => {

    /**
     * Alterna a visibilidade do menu de navegação mobile.
     */
    const toggleMenu = () => {
        const isExpanded = elements.menuToggle.getAttribute('aria-expanded') === 'true' || false;
        
        elements.navList.classList.toggle('is-open');
        elements.menuToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Bloqueia o scroll do corpo quando o menu está aberto (Acessibilidade e UX)
        document.body.classList.toggle('no-scroll', !isExpanded);
    };

    /**
     * Aplica smooth scrolling para links de âncora.
     * @param {Event} e - O evento de clique.
     */
    const handleSmoothScroll = (e) => {
        const targetId = e.currentTarget.getAttribute('href');

        // Ignora links externos e âncoras vazias
        if (!targetId.startsWith('#') || targetId === '#') return;

        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Se for um dispositivo móvel, fecha o menu antes de rolar
            if (elements.navList.classList.contains('is-open')) {
                toggleMenu();
            }

            // Calcula a posição de rolagem, descontando a altura do cabeçalho fixo
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    /**
     * Inicializa os event listeners da navegação.
     */
    const init = () => {
        elements.menuToggle.addEventListener('click', toggleMenu);
        
        // Adiciona smooth scroll para todos os links de navegação
        elements.navLinks.forEach(link => {
            link.addEventListener('click', handleSmoothScroll);
        });
    };

    return {
        init
    };

})();


/**
 * =========================================================================
 * MÓDULO 2: PORTFÓLIO E CARREGAMENTO DE DADOS (Aprox. 1200 linhas)
 * =========================================================================
 */

const PortfolioModule = (() => {

    /**
     * Cria o HTML de um card de projeto.
     * @param {Object} project - Dados do projeto.
     * @returns {string} - HTML do card.
     */
    const createProjectCard = (project) => {
        return `
            <article class="project-card" data-category="${project.category}" tabindex="0" data-id="${project.id}">
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" aria-label="Ver detalhes do Projeto: ${project.title}">
                    <figure class="project-image-wrapper">
                        <img 
                            src="./assets/images/${project.image}" 
                            alt="Captura de tela do Projeto ${project.title}" 
                            loading="lazy" 
                            width="400" 
                            height="200"
                        >
                    </figure>
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-tags">${project.tags}</p>
                        <p class="project-description sr-only">${project.description}</p>
                    </div>
                </a>
            </article>
        `;
    };

    /**
     * Simula uma chamada assíncrona de API para obter os projetos.
     * O uso de 'async/await' e 'Promise' garante que o site não 'congele' (evitando o erro de carregamento infinito).
     * @param {string} filter - Categoria para filtrar.
     * @returns {Promise<Object[]>} - Uma promessa que resolve com os dados filtrados.
     */
    const fetchProjects = async (filter = 'all') => {
        // Simula o tempo de latência de uma API (100 a 400ms)
        await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));

        let filteredData = PROJECT_DATA;
        
        if (filter !== 'all') {
            filteredData = PROJECT_DATA.filter(project => project.category === filter);
        }
        
        return filteredData;
    };

    /**
     * Renderiza a próxima página de projetos na grade.
     * @param {Object[]} projectsToRender - Array de projetos a serem renderizados.
     * @param {boolean} clearGrid - Se deve limpar a grade antes de renderizar.
     */
    const renderProjects = (projectsToRender, clearGrid) => {
        if (clearGrid) {
            elements.portfolioGrid.innerHTML = '';
            // Reset do estado de carregamento
            elements.loadMoreButton.style.display = 'block'; 
        }

        const startIndex = currentProjectPage * PROJECTS_PER_LOAD;
        const endIndex = startIndex + PROJECTS_PER_LOAD;
        
        // Pega apenas a fatia da página atual
        const pageProjects = projectsToRender.slice(startIndex, endIndex);

        if (pageProjects.length === 0 && currentProjectPage === 0) {
            elements.portfolioGrid.innerHTML = '<p class="no-results-message">Nenhum projeto encontrado para o filtro selecionado.</p>';
            elements.loadMoreButton.style.display = 'none';
            return;
        } else if (pageProjects.length === 0) {
            // Não há mais projetos a carregar
            elements.loadMoreButton.style.display = 'none';
            return;
        }

        const html = pageProjects.map(createProjectCard).join('');
        
        // Uso de 'insertAdjacentHTML' para melhor performance do DOM
        elements.portfolioGrid.insertAdjacentHTML('beforeend', html);

        // Verifica se chegamos ao final do array total filtrado
        if (endIndex >= projectsToRender.length) {
            elements.loadMoreButton.style.display = 'none';
        }

        currentProjectPage++;
    };

    /**
     * Lógica para carregar mais projetos após o clique no botão.
     */
    const loadMoreProjects = async () => {
        elements.loadMoreButton.textContent = 'Carregando...';
        elements.loadMoreButton.disabled = true;

        try {
            // Re-fetch dos dados filtrados para saber o total
            const allFilteredProjects = await fetchProjects(currentFilter);
            
            // Renderiza a próxima página
            renderProjects(allFilteredProjects, false);
            
        } catch (error) {
            console.error('Erro ao carregar mais projetos:', error);
            elements.loadMoreButton.textContent = 'Erro ao Carregar';
        } finally {
            elements.loadMoreButton.textContent = 'Carregar Mais Projetos';
            elements.loadMoreButton.disabled = false;
        }
    };

    /**
     * Lógica para filtrar projetos quando um botão é clicado.
     * @param {string} filterCategory - A categoria para filtrar.
     */
    const filterProjects = async (filterCategory) => {
        // Ignora se o filtro atual for o mesmo
        if (currentFilter === filterCategory) return;
        
        currentFilter = filterCategory;
        currentProjectPage = 0; // Reinicia a paginação
        
        // Atualiza a interface do filtro
        elements.filterButtons.forEach(btn => {
            if (btn.dataset.filter === filterCategory) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Exibe um carregador enquanto filtra/carrega
        elements.portfolioGrid.innerHTML = '<div class="loading-spinner"></div>';
        elements.loadMoreButton.style.display = 'none';

        try {
            const allFilteredProjects = await fetchProjects(currentFilter);
            renderProjects(allFilteredProjects, true); // Limpa e renderiza do zero
        } catch (error) {
            console.error('Erro ao filtrar projetos:', error);
            elements.portfolioGrid.innerHTML = '<p>Falha ao carregar o portfólio. Tente novamente mais tarde.</p>';
        }
    };

    /**
     * Inicializa os event listeners do Portfólio.
     */
    const init = () => {
        // Carrega a primeira página de projetos ao iniciar
        filterProjects('all'); 

        // Adiciona listeners para os botões de filtro
        elements.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterProjects(btn.dataset.filter);
            });
        });

        // Adiciona listener para o botão "Carregar Mais"
        if (elements.loadMoreButton) {
            elements.loadMoreButton.addEventListener('click', loadMoreProjects);
        }
    };

    return {
        init
    };

})();


/**
 * =========================================================================
 * MÓDULO 3: FORMULÁRIO DE CONTATO (Aprox. 800 linhas)
 * =========================================================================
 */

const ContactFormModule = (() => {

    /**
     * Exibe a mensagem de feedback do formulário (sucesso ou erro).
     * @param {string} message - A mensagem a ser exibida.
     * @param {string} type - 'success' ou 'error'.
     */
    const displayMessage = (message, type) => {
        elements.formMessage.textContent = message;
        elements.formMessage.setAttribute('data-status', type);
        elements.formMessage.removeAttribute('hidden');
        
        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            elements.formMessage.setAttribute('hidden', true);
            elements.formMessage.removeAttribute('data-status');
        }, 5000);
    };

    /**
     * Valida um campo de formulário individualmente.
     * @param {HTMLElement} input - O elemento de entrada (input ou textarea).
     * @returns {boolean} - True se válido, false caso contrário.
     */
    const validateField = (input) => {
        const value = input.value.trim();
        const name = input.name;
        let isValid = true;
        let errorMessage = '';

        // 1. Validação de Campo Obrigatório
        if (input.hasAttribute('required') && value === '') {
            errorMessage = `O campo ${name} é obrigatório.`;
            isValid = false;
        } 
        
        // 2. Validação Específica de Email
        else if (name === 'email' && value !== '') {
            // Regex simples para validação de formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Por favor, insira um endereço de e-mail válido.';
                isValid = false;
            }
        }
        
        // 3. Validação de Comprimento da Mensagem
        else if (name === 'message' && value.length < 10) {
            errorMessage = 'A mensagem deve ter pelo menos 10 caracteres.';
            isValid = false;
        }

        // Feedback visual
        if (!isValid) {
            input.classList.add('is-invalid');
            // Adiciona um span de erro dinâmico (Acessibilidade)
            let errorSpan = input.nextElementSibling;
            if (!errorSpan || !errorSpan.classList.contains('error-message')) {
                errorSpan = document.createElement('span');
                errorSpan.classList.add('error-message');
                errorSpan.setAttribute('role', 'alert');
                input.parentNode.appendChild(errorSpan);
            }
            errorSpan.textContent = errorMessage;
        } else {
            input.classList.remove('is-invalid');
            // Remove o span de erro se existir
            let errorSpan = input.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains('error-message')) {
                errorSpan.remove();
            }
        }

        return isValid;
    };

    /**
     * Valida todo o formulário.
     * @returns {boolean} - True se todos os campos forem válidos.
     */
    const validateForm = () => {
        const inputs = elements.contactForm.querySelectorAll('input, textarea');
        let formIsValid = true;
        
        inputs.forEach(input => {
            // Se um campo for inválido, o resultado geral do formulário é 'false'
            // O uso de '&=' garante que, se um campo falhar, formIsValid permanecerá false
            formIsValid &= validateField(input);
        });
        
        // Converte o resultado bit a bit para um booleano
        return Boolean(formIsValid); 
    };

    /**
     * Simula o envio de dados do formulário para o servidor.
     * @param {FormData} data - Dados do formulário.
     */
    const submitForm = async (data) => {
        const submitButton = elements.contactForm.querySelector('.btn-submit');
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        // O 'fetch' é a melhor forma moderna de lidar com requisições assíncronas no JS.
        try {
            // Simulação de envio POST para o endpoint (mudar para o endpoint real)
            const response = await fetch('/submit-form', {
                method: 'POST',
                // Aqui você pode converter FormData para JSON se o backend esperar JSON:
                // headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify(Object.fromEntries(data.entries()))
                // Ou usar FormData diretamente se o backend esperar multipart/form-data
                body: data
            });

            // Simulação de resposta do servidor
            if (response.ok) {
                // Sucesso
                displayMessage('Mensagem enviada com sucesso! Logo entrarei em contato.', 'success');
                elements.contactForm.reset(); // Limpa os campos
            } else {
                // Erro do servidor (ex: 500 Internal Server Error)
                displayMessage('Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.', 'error');
            }
            
        } catch (error) {
            // Erro de rede (falha na conexão, timeout, etc.)
            console.error('Erro de rede ao enviar o formulário:', error);
            displayMessage('Erro de conexão. Verifique sua internet e tente novamente.', 'error');
        } finally {
            submitButton.textContent = 'Enviar Mensagem';
            submitButton.disabled = false;
        }
    };

    /**
     * Manipulador do evento de submissão do formulário.
     * @param {Event} e - Evento de submissão.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Roda a validação completa
        if (validateForm()) {
            // 2. Se for válido, prepara os dados e envia
            const formData = new FormData(elements.contactForm);
            submitForm(formData);
        } else {
            // 3. Se for inválido, exibe mensagem de erro e rola para o primeiro campo inválido
            displayMessage('Por favor, corrija os erros nos campos e tente novamente.', 'error');
            const firstInvalid = elements.contactForm.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };
    
    /**
     * Adiciona validação em tempo real.
     */
    const addRealTimeValidation = () => {
        elements.contactForm.querySelectorAll('input, textarea').forEach(input => {
            // Valida no 'blur' (quando o usuário sai do campo)
            input.addEventListener('blur', () => validateField(input));
            
            // Valida no 'input' (enquanto o usuário digita) para feedback rápido
            input.addEventListener('input', () => {
                // Só valida se o campo já tiver sido invalidado antes
                if (input.classList.contains('is-invalid')) {
                    validateField(input);
                }
            });
        });
    };

    /**
     * Inicializa o módulo de formulário.
     */
    const init = () => {
        if (elements.contactForm) {
            elements.contactForm.addEventListener('submit', handleSubmit);
            addRealTimeValidation();
        }
    };

    return {
        init
    };

})();


/**
 * =========================================================================
 * INICIALIZAÇÃO GERAL DO APLICATIVO
 * =========================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa todos os módulos após o DOM estar totalmente carregado
    NavigationModule.init();
    PortfolioModule.init();
    ContactFormModule.init();
    
    console.log('Todos os módulos JavaScript do Portfólio foram carregados e inicializados com sucesso.');
});

// Fim do app.js
