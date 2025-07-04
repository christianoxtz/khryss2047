// script.js
// Dados do questionário completo sobre IA na Educação
const perguntas = [
    {
        enunciado: "Assim que saiu da escola você se depara com uma nova tecnologia, um chat que consegue responder todas as dúvidas que uma pessoa pode ter, ele também gera imagens e áudios hiper-realistas. Qual o primeiro pensamento?",
        alternativas: [
            {
                texto: "Que incrível! Vou testar imediatamente para ajudar nos meus estudos.",
                afirmacao: "Você demonstra entusiasmo e abertura para novas tecnologias educacionais."
            },
            {
                texto: "Interessante, mas prefiro esperar para ver como funciona direito antes de usar.",
                afirmacao: "Você mostra cautela e desejo de entender antes de adotar novas ferramentas."
            },
            {
                texto: "Isso vai acabar com a capacidade das pessoas pensarem por si mesmas.",
                afirmacao: "Você expressa preocupação com os impactos cognitivos da tecnologia."
            }
        ]
    },
    {
        enunciado: "Com a descoberta desta tecnologia, chamada Inteligência Artificial, uma professora de tecnologia da escola decidiu fazer uma sequência de aulas sobre esta tecnologia. No fim de uma aula ela pede que você escreva um trabalho sobre o uso de IA em sala de aula. Qual atitude você toma?",
        alternativas: [
            {
                texto: "Pesquiso em fontes confiáveis e escrevo com minhas próprias palavras, usando a IA apenas para tirar dúvidas pontuais.",
                afirmacao: "Você demonstra equilíbrio no uso da tecnologia, mantendo sua autoria."
            },
            {
                texto: "Peço para a IA gerar um texto completo e só faço pequenos ajustes antes de entregar.",
                afirmacao: "Você prioriza a praticidade, mas pode estar abrindo mão da aprendizagem."
            },
            {
                texto: "Recuso fazer o trabalho, argumentando que o uso de IA na educação é antiético.",
                afirmacao: "Você tem uma posição crítica radical sobre o uso de IA na educação."
            }
        ]
    },
    {
        enunciado: "Após a elaboração do trabalho escrito, a professora realizou um debate entre a turma para entender como foi realizada a pesquisa e escrita. Nessa conversa também foi levantado um ponto muito importante: como a IA impacta o trabalho do futuro. Nesse debate, como você se posiciona?",
        alternativas: [
            {
                texto: "A IA vai transformar muitas profissões, mas vai criar novas oportunidades que exigirão habilidades humanas únicas.",
                afirmacao: "Você tem uma visão equilibrada e prospectiva sobre o impacto da IA."
            },
            {
                texto: "A IA vai substituir a maioria dos trabalhos humanos, precisamos nos preparar para um futuro desafiador.",
                afirmacao: "Você expressa preocupação com os impactos disruptivos da tecnologia."
            },
            {
                texto: "A IA é apenas uma ferramenta que vai nos ajudar a ser mais produtivos, não vai substituir o humano.",
                afirmacao: "Você vê a IA como assistente, não como substituta da capacidade humana."
            }
        ]
    },
    {
        enunciado: "Ao final da discussão, você precisou criar uma imagem no computador que representasse o que pensa sobre IA. E agora?",
        alternativas: [
            {
                texto: "Uso um gerador de imagens por IA, ajustando os prompts até ficar como imagino.",
                afirmacao: "Você adota novas tecnologias criativas de forma prática."
            },
            {
                texto: "Desenho manualmente no computador, mesmo que fique menos 'perfeito'.",
                afirmacao: "Você valoriza a expressão pessoal acima do resultado técnico."
            },
            {
                texto: "Pesquiso imagens prontas na internet e faço uma colagem digital.",
                afirmacao: "Você encontra soluções práticas dentro de seus recursos atuais."
            }
        ]
    },
    {
        enunciado: "Você tem um trabalho em grupo de biologia para entregar na semana seguinte, o andamento do trabalho está um pouco atrasado e uma pessoa do seu grupo decidiu fazer com ajuda da IA. O problema é que o trabalho está totalmente igual ao do chat. O que você faz?",
        alternativas: [
            {
                texto: "Reescrevo as partes copiadas, mantendo as ideias mas com minhas próprias palavras.",
                afirmacao: "Você busca equilibrar eficiência com integridade acadêmica."
            },
            {
                texto: "Confronto o colega e insisto para refazerem o trabalho sem IA.",
                afirmacao: "Você prioriza a aprendizagem genuína acima da conveniência."
            },
            {
                texto: "Deixo como está, afinal o conteúdo está correto e o prazo está apertado.",
                afirmacao: "Você prioriza a entrega no prazo, mesmo com riscos acadêmicos."
            }
        ]
    },
    {
        enunciado: "Você percebe que um amigo seu está usando IA para fazer todas as tarefas da escola, sem entender o conteúdo. O que você faz?",
        alternativas: [
            {
                texto: "Converso com ele sobre os riscos dessa prática e ofereço ajuda para estudar junto.",
                afirmacao: "Você demonstra preocupação genuína com o aprendizado do colega."
            },
            {
                texto: "Denuncio para o professor, pois isso é trapaça e prejudicial para todos.",
                afirmacao: "Você valoriza a justiça acadêmica e age contra práticas desleais."
            },
            {
                texto: "Não interfiro, cada um é responsável por seu próprio aprendizado.",
                afirmacao: "Você respeita a autonomia individual, mesmo não concordando."
            }
        ]
    },
    {
        enunciado: "Durante uma prova, você vê alguém usando um assistente de IA escondido no celular. Qual sua reação?",
        alternativas: [
            {
                texto: "Chamo a atenção da pessoa discretamente durante a prova.",
                afirmacao: "Você age contra a desonestidade, mas de forma discreta."
            },
            {
                texto: "Comunico ao professor assim que possível, sem expor publicamente o colega.",
                afirmacao: "Você prioriza a integridade acadêmica com discrição."
            },
            {
                texto: "Ignoro, pois não quero problemas ou retaliações.",
                afirmacao: "Você evita conflitos, mesmo reconhecendo a situação problemática."
            }
        ]
    },
    {
        enunciado: "Você precisa apresentar um trabalho para a turma e pensa em usar um vídeo criado por uma IA para explicar o tema. Você faria isso?",
        alternativas: [
            {
                texto: "Sim, desde que eu mesmo edite e personalize o conteúdo gerado.",
                afirmacao: "Você vê a IA como ferramenta criativa que ainda exige curadoria humana."
            },
            {
                texto: "Não, prefiro criar minha própria apresentação para mostrar meu real entendimento.",
                afirmacao: "Você valoriza a autenticidade e demonstração do aprendizado real."
            },
            {
                texto: "Sim, e explicaria para a turma como a IA me ajudou na produção.",
                afirmacao: "Você adota a tecnologia de forma transparente e educativa."
            }
        ]
    },
    {
        enunciado: "Uma empresa anuncia que vai substituir parte dos funcionários por IA para reduzir custos. Como você se sente?",
        alternativas: [
            {
                texto: "Preocupado, pois muitas famílias serão impactadas sem preparo adequado.",
                afirmacao: "Você demonstra empatia e preocupação com os impactos sociais."
            },
            {
                texto: "Entendo como um avanço inevitável da tecnologia no mercado de trabalho.",
                afirmacao: "Você aceita a transformação tecnológica como processo natural."
            },
            {
                texto: "Motivado a me qualificar em áreas que a IA não pode substituir.",
                afirmacao: "Você vê a situação como incentivo para desenvolver habilidades únicas."
            }
        ]
    },
    {
        enunciado: "Você descobriu que uma notícia importante sobre IA que você leu é falsa. Como você age?",
        alternativas: [
            {
                texto: "Verifico em fontes confiáveis e compartilho a correção com quem recebeu a informação errada.",
                afirmacao: "Você age com responsabilidade digital e combate à desinformação."
            },
            {
                texto: "Aprendo a lição e no futuro checo melhor antes de acreditar em notícias.",
                afirmacao: "Você usa a experiência para melhorar sua crítica à informação."
            },
            {
                texto: "Denuncio a publicação nas redes sociais para evitar que outros caiam no mesmo erro.",
                afirmacao: "Você toma atitude ativa contra a disseminação de falsidades."
            }
        ]
    },
    {
        enunciado: "Seu professor sugere usar IA para ajudar na correção dos trabalhos da turma. Você acha que isso é justo?",
        alternativas: [
            {
                texto: "Sim, desde que haja revisão humana em casos limítrofes.",
                afirmacao: "Você aceita a inovação com salvaguardas para garantir justiça."
            },
            {
                texto: "Não, a avaliação deve ser sempre humana para entender nuances do aprendizado.",
                afirmacao: "Você valoriza o julgamento humano em processos educacionais."
            },
            {
                texto: "Depende do tipo de trabalho - para tarefas objetivas pode funcionar.",
                afirmacao: "Você faz distinções baseadas na natureza da avaliação."
            }
        ]
    }
];

// Sistema de teste
class IaEduTest {
    constructor() {
        this.currentQuestion = 0;
        this.responses = [];
        this.domElements = {
            introSection: document.getElementById('intro'),
            testSection: document.getElementById('test'),
            resultSection: document.getElementById('result'),
            terminalBody: document.getElementById('terminal-body'),
            progressBar: document.getElementById('progressBar'),
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
        this.domElements.progressBar.style.width = `${progressPercent}%`;
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
            <div class="result-profile" style="border-left: 4px solid ${result.color}; padding-left: 15px; margin-bottom: 20px;">
                <h3>Seu perfil em relação à IA na educação:</h3>
                <p style="font-size: 1.1rem;">${result.profile}</p>
            </div>
            
            <h3 style="margin-bottom: 15px;">Análise detalhada:</h3>
            <ul class="response-list">
        `;
        
        this.responses.forEach((r, i) => {
            resultHTML += `
                <li>
                    <strong>Pergunta ${i+1}:</strong> ${r.question}<br>
                    <strong>Sua resposta:</strong> ${r.answer}<br>
                    <em style="color: ${result.color};">${r.affirmation}</em>
                </li>
            `;
        });
        
        resultHTML += `</ul>`;
        
        this.domElements.resultContent.innerHTML = resultHTML;
    }
    
    calculateResult() {
        // Lógica para determinar o perfil baseado nas respostas
        const score = this.responses.reduce((total, r) => {
            if (r.affirmation.includes("equilíbrio") || r.affirmation.includes("transparente") || r.affirmation.includes("curadoria")) {
                return total + 2; // Postura equilibrada
            } else if (r.affirmation.includes("crític") || r.affirmation.includes("preocupação") || r.affirmation.includes("riscos")) {
                return total + 1; // Postura cautelosa
            } else if (r.affirmation.includes("entusiasmo") || r.affirmation.includes("adota") || r.affirmation.includes("inovação")) {
                return total + 3; // Postura adotante
            }
            return total;
        }, 0);
        
        const maxScore = perguntas.length * 3;
        const percent = (score / maxScore) * 100;
        
        if (percent >= 70) {
            return {
                profile: "ADOTANTE TECNOLÓGICO - Você abraça ativamente as ferramentas de IA na educação, vendo-as como aliadas no processo de aprendizagem. Sua postura é de experimentação e integração das novas tecnologias no seu fluxo de estudos.",
                color: "var(--neon-green)"
            };
        } else if (percent >= 40) {
            return {
                profile: "EQUILIBRADO CRÍTICO - Você reconhece o potencial da IA na educação, mas adota uma postura reflexiva sobre quando e como usá-la. Preza pela autenticidade do aprendizado e está atento aos possíveis excessos.",
                color: "var(--neon-blue)"
            };
        } else {
            return {
                profile: "PRECAVIDO ÉTICO - Você tem reservas significativas sobre o uso de IA na educação, preocupado com impactos na aprendizagem, autoria e justiça acadêmica. Valoriza métodos tradicionais e o esforço intelectual direto.",
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
            <p>Este teste foi desenvolvido por <strong>Cristiano Paz</strong>, estudante do Colégio Estadual Padre Cláudio Morelli, como parte de um trabalho escolar sobre ética e inteligência artificial na educação.</p>
            
            <p>O objetivo é promover reflexão sobre:</p>
            <ul style="margin: 15px 0;">
                <li>O papel da IA no processo de aprendizagem</li>
                <li>Autoria e originalidade na era digital</li>
                <li>Preparação para o futuro do trabalho</li>
                <li>Equilíbrio entre tecnologia e desenvolvimento humano</li>
            </ul>
            
            <p>As questões foram elaboradas para avaliar diferentes posturas em relação à adoção de ferramentas de IA no contexto educacional.</p>
            
            <p style="margin-top: 20px; font-style: italic; color: var(--neon-green);">"A educação precisa evoluir junto com a tecnologia, sem perder de vista seus valores fundamentais."</p>
            
            <button class="back-btn" id="backBtn" style="margin-top: 20px; padding: 8px 20px; background: var(--neon-orange); color: white; border: none; border-radius: 4px; cursor: pointer;">Voltar ao Resultado</button>
        `;
        
        document.getElementById('backBtn').addEventListener('click', () => this.showResults());
    }
}

// Inicia o teste quando a página carrega
window.onload = () => {
    document.body.style.opacity = '1';
    new IaEduTest();
    
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
