// Dados do questionário completo
const perguntas = [
    {
        enunciado: "Você está em uma rua escura quando vê um robô sendo atacado por humanos. O robô parece assustado. O que você faz?",
        alternativas: [
            {
                texto: "Intervenho para proteger o robô - todos os seres sencientes merecem compaixão.",
                afirmacao: "Você demonstra empatia por seres sintéticos, uma característica rara em humanos."
            },
            {
                texto: "Observo de longe - não é problema meu.",
                afirmacao: "Você age com cautela, típico de quem vive em uma sociedade complexa."
            },
            {
                texto: "Chamo as autoridades e deixo que resolvam.",
                afirmacao: "Você confia nas instituições para lidar com conflitos."
            }
        ]
    },
    {
        enunciado: "Um colega de trabalho revela que é um replicante. Como você reage?",
        alternativas: [
            {
                texto: "Trato da mesma forma que antes - o que importa é quem ele é, não sua natureza.",
                afirmacao: "Você mostra uma visão igualitária sobre inteligência artificial."
            },
            {
                texto: "Fico desconfortável e mantenho distância.",
                afirmacao: "Você demonstra certa resistência à convivência com inteligências artificiais."
            },
            {
                texto: "Pergunto sobre suas experiências e como é ser um replicante.",
                afirmacao: "Você mostra curiosidade científica e empatia."
            }
        ]
    },
    {
        enunciado: "Ao ver um androide chorando, qual seu primeiro pensamento?",
        alternativas: [
            {
                texto: "É apenas uma simulação de emoções programadas.",
                afirmacao: "Você mantém uma visão cética sobre emoções artificiais."
            },
            {
                texto: "Ele deve estar sentindo dor genuína.",
                afirmacao: "Você atribui humanidade às experiências artificiais."
            },
            {
                texto: "Me pergunto que circunstâncias levaram a essa reação.",
                afirmacao: "Você busca entender o contexto antes de julgar."
            }
        ]
    },
    {
        enunciado: "Se descobrisse que suas memórias podem ter sido implantadas, como se sentiria?",
        alternativas: [
            {
                texto: "Terror existencial - quem sou eu realmente?",
                afirmacao: "Você valoriza profundamente a autenticidade da identidade."
            },
            {
                texto: "Curiosidade - gostaria de investigar mais.",
                afirmacao: "Você tem uma mente investigativa e aberta."
            },
            {
                texto: "Indiferença - o que importa é quem sou agora.",
                afirmacao: "Você foca no presente mais que nas origens."
            }
        ]
    },
    {
        enunciado: "Você acredita que um androide pode amar de verdade?",
        alternativas: [
            {
                texto: "Sim, amor transcende a biologia.",
                afirmacao: "Você aceita que emoções podem existir em diferentes formas de consciência."
            },
            {
                texto: "Não, é apenas simulação de comportamento.",
                afirmacao: "Você acredita que certas experiências são exclusivamente humanas."
            },
            {
                texto: "Depende de como definimos 'amor'.",
                afirmacao: "Você reconhece a complexidade filosófica da questão."
            }
        ]
    },
    {
        enunciado: "Se um replicante cometesse um crime, ele deveria ser punido como um humano?",
        alternativas: [
            {
                texto: "Sim, se tem consciência, deve arcar com as consequências.",
                afirmacao: "Você acredita em responsabilidade independente da origem."
            },
            {
                texto: "Não, deveria ser desativado como máquina defeituosa.",
                afirmacao: "Você vê replicantes como produtos, não como seres."
            },
            {
                texto: "Depende das circunstâncias e da intenção por trás do ato.",
                afirmacao: "Você avalia cada caso individualmente."
            }
        ]
    },
    {
        enunciado: "Você aceitaria ter um relacionamento amoroso com um replicante?",
        alternativas: [
            {
                texto: "Sim, se houvesse conexão genuína.",
                afirmacao: "Você está aberto a relações além de barreiras biológicas."
            },
            {
                texto: "Não, isso seria antinatural.",
                afirmacao: "Você mantém distinções claras entre humanos e máquinas."
            },
            {
                texto: "Talvez, mas teria muitas dúvidas e questões éticas.",
                afirmacao: "Você reconhece a complexidade emocional envolvida."
            }
        ]
    },
    {
        enunciado: "Se pudesse transferir sua consciência para um corpo artificial, você faria isso?",
        alternativas: [
            {
                texto: "Sim, para viver mais e melhor.",
                afirmacao: "Você valoriza a continuidade da consciência mais que a forma física."
            },
            {
                texto: "Não, prefiro minha humanidade com todas suas limitações.",
                afirmacao: "Você valoriza a experiência humana autêntica."
            },
            {
                texto: "Dependeria dos riscos e implicações éticas.",
                afirmacao: "Você considera cuidadosamente avanços tecnológicos."
            }
        ]
    },
    {
        enunciado: "Você acredita que replicantes deveriam ter direitos iguais aos humanos?",
        alternativas: [
            {
                texto: "Sim, se são seres conscientes.",
                afirmacao: "Você defende direitos baseados em consciência, não biologia."
            },
            {
                texto: "Não, são produtos fabricados.",
                afirmacao: "Você faz distinção clara entre seres vivos e artificiais."
            },
            {
                texto: "Deveriam ter alguns direitos, mas não necessariamente todos.",
                afirmacao: "Você busca um meio-termo na questão."
            }
        ]
    },
    {
        enunciado: "No futuro, como você imagina a relação entre humanos e inteligências artificiais?",
        alternativas: [
            {
                texto: "Harmoniosa cooperação e coexistência.",
                afirmacao: "Você é otimista sobre a integração entre humanos e máquinas."
            },
            {
                texto: "Conflito inevitável pelo domínio.",
                afirmacao: "Você vê a competição como inerente à relação."
            },
            {
                texto: "Depende de como conduzirmos o desenvolvimento tecnológico.",
                afirmacao: "Você acredita que nossas escolhas éticas hoje moldarão esse futuro."
            }
        ]
    }
];

// Sistema de teste
class VoightKampffTest {
    constructor() {
        this.currentQuestion = 0;
        this.responses = [];
        this.domElements = {
            introSection: document.getElementById('intro'),
            testSection: document.getElementById('test'),
            resultSection: document.getElementById('result'),
            terminalBody: document.getElementById('terminal-body'),
            progressBar: document.querySelector('.progress-bar::after'),
            progressText: document.getElementById('progressText'),
            startBtn: document.getElementById('startBtn'),
            retryBtn: document.getElementById('retryBtn'),
            aboutBtn: document.getElementById('aboutBtn'),
            resultContent: document.getElementById('resultContent')
        };
        
        this.initEvents();
    }
    
    initEvents() {
        this.domElements.startBtn.addEventListener('click', () => this.startTest());
        this.domElements.retryBtn.addEventListener('click', () => this.restartTest());
        this.domElements.aboutBtn.addEventListener('click', () => this.showAbout());
    }
    
    startTest() {
        this.domElements.introSection.style.display = 'none';
        this.domElements.testSection.style.display = 'block';
        this.showQuestion();
    }
    
    showQuestion() {
        if (this.currentQuestion >= perguntas.length) {
            this.showResults();
            return;
        }
        
        // Atualiza barra de progresso
        const progressPercent = (this.currentQuestion / perguntas.length) * 100;
        document.querySelector('.progress-bar').style.width = `${progressPercent}%`;
        this.domElements.progressText.textContent = `Pergunta ${this.currentQuestion + 1} de ${perguntas.length}`;
        
        const q = perguntas[this.currentQuestion];
        let html = `
            <div class="question">${q.enunciado}</div>
            <div class="options" id="options"></div>
        `;
        
        this.domElements.terminalBody.innerHTML = html;
        
        const optionsContainer = document.getElementById('options');
        q.alternativas.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span class="option-num">${i+1}.</span> ${opt.texto}`;
            btn.addEventListener('click', () => this.selectOption(opt));
            optionsContainer.appendChild(btn);
            
            // Animação de entrada
            setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, i * 100);
        });
    }
    
    selectOption(option) {
        this.responses.push({
            question: perguntas[this.currentQuestion].enunciado,
            answer: option.texto,
            affirmation: option.afirmacao
        });
        
        this.currentQuestion++;
        
        // Efeito de transição
        this.domElements.terminalBody.style.animation = 'glitch 0.3s';
        setTimeout(() => {
            this.domElements.terminalBody.style.animation = '';
            this.showQuestion();
        }, 300);
    }
    
    showResults() {
        this.domElements.testSection.style.display = 'none';
        this.domElements.resultSection.style.display = 'block';
        
        // Calcula resultado
        const result = this.calculateResult();
        
        // Exibe resultado
        let resultHTML = `
            <h3>Seu perfil empático:</h3>
            <p>${result.profile}</p>
            
            <h3>Análise detalhada:</h3>
            <ul class="response-list">
        `;
        
        this.responses.forEach((r, i) => {
            resultHTML += `
                <li>
                    <strong>Pergunta ${i+1}:</strong> ${r.question}<br>
                    <strong>Sua resposta:</strong> ${r.answer}<br>
                    <em>${r.affirmation}</em>
                </li>
            `;
        });
        
        resultHTML += `</ul>`;
        
        this.domElements.resultContent.innerHTML = resultHTML;
    }
    
    calculateResult() {
        // Lógica simplificada para determinar o perfil
        const empathyScore = this.responses.reduce((score, r) => {
            if (r.affirmation.includes("empatia") || r.affirmation.includes("humanidade")) {
                return score + 2;
            } else if (r.affirmation.includes("cético") || r.affirmation.includes("resistência")) {
                return score - 1;
            }
            return score + 1;
        }, 0);
        
        if (empathyScore >= 15) {
            return {
                profile: "EMPÁTICO AVANÇADO - Você demonstra alta capacidade de empatia, mesmo em situações complexas envolvendo inteligências artificiais. Sua visão é progressista e inclusiva.",
                color: "var(--neon-blue)"
            };
        } else if (empathyScore >= 8) {
            return {
                profile: "EMPÁTICO MODERADO - Você mostra empatia, mas com ressalvas em certas situações. Mantém um equilíbrio entre abertura e cautela.",
                color: "var(--neon-blue)"
            };
        } else if (empathyScore >= 0) {
            return {
                profile: "PRAGMÁTICO - Você tende a avaliar situações de forma racional, com menos influência emocional. Mantém distinções claras entre humanos e máquinas.",
                color: "var(--neon-orange)"
            };
        } else {
            return {
                profile: "CÉTICO - Você é bastante cético em relação à capacidade de inteligências artificiais experimentarem emoções genuínas. Prefere manter barreiras claras.",
                color: "var(--neon-orange)"
            };
        }
    }
    
    restartTest() {
        this.currentQuestion = 0;
        this.responses = [];
        this.domElements.resultSection.style.display = 'none';
        this.domElements.testSection.style.display = 'block';
        this.showQuestion();
    }
    
    showAbout() {
        this.domElements.resultContent.innerHTML = `
            <h3>Sobre este projeto</h3>
            <p>Este teste foi desenvolvido por <strong>Cristiano Paz</strong>, estudante do Colégio Estadual Padre Cláudio Morelli, como parte de um trabalho escolar sobre ética e inteligência artificial.</p>
            
            <p>Inspirado no teste fictício Voight-Kampff do universo Blade Runner, o projeto busca explorar questões filosóficas sobre:</p>
            <ul>
                <li>O que nos torna humanos?</li>
                <li>Máquinas podem ter consciência?</li>
                <li>Como devemos nos relacionar com inteligências artificiais?</li>
            </ul>
            
            <p>O teste não tem validade científica, mas serve como ferramenta para reflexão sobre essas importantes questões que se tornam cada vez mais relevantes em nosso mundo tecnológico.</p>
            
            <p><em>"Mais humano que o humano é nossa meta."</em> - Tyrell Corporation</p>
            
            <button class="back-btn" id="backBtn">Voltar ao Resultado</button>
        `;
        
        document.getElementById('backBtn').addEventListener('click', () => this.showResults());
    }
}

// Inicia o teste quando a página carrega
window.onload = () => {
    document.body.style.opacity = '1';
    new VoightKampffTest();
    
    // Efeito sonoro opcional
    if (window.AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 440;
        
        const gain = ctx.createGain();
        gain.gain.value = 0.1;
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    }
};
