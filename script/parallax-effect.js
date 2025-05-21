document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os feature-cards
    const featureCards = document.querySelectorAll('.feature-card');
    // Seleciona a seção "Por que nos escolher"
    const whyChooseUsSection = document.querySelector('.why-choose-us');
    // Seleciona o grid de cards
    const featureCardsGrid = document.querySelector('.feature-cards-grid');
    
    // Armazena os ouvintes de eventos para remover depois
    const hoverListeners = {};
    
    // Cria o efeito parallax
    function horizontalParallax() {
        // Verifica se a seção está visível na tela
        const sectionTop = whyChooseUsSection.getBoundingClientRect().top;
        const sectionBottom = whyChooseUsSection.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // Se a seção estiver visível na tela
        if (sectionTop < windowHeight && sectionBottom > 0) {
            // Calcula a posição relativa da seção na janela
            // Ajusta a progressão para ser mais gradual
            let sectionProgress = (windowHeight - sectionTop) / (windowHeight + whyChooseUsSection.offsetHeight);
            // Limita a progressão entre 0 e 1 para movimento mais suave
            sectionProgress = Math.max(0, Math.min(1, sectionProgress * 1.5));
            
            // Valor base para o movimento (posição inicial à direita)
            const initialPosition = 50; // Reduzido para movimento mais sutil
            
            // Calcula um movimento consistente para todos os cards
            const baseMovement = initialPosition * (1 - sectionProgress);
              // Aplica o efeito em cada card
            featureCards.forEach((card, index) => {
                // Remove manipuladores de eventos antigos para evitar duplicação
                if (hoverListeners[index]) {
                    card.removeEventListener('mouseenter', hoverListeners[index].enter);
                    card.removeEventListener('mouseleave', hoverListeners[index].leave);
                }
                
                // Calcula a linha e coluna do grid (para layout 3x2)
                const row = Math.floor(index / 3) + 1; // 1 ou 2
                const col = (index % 3) + 1; // 1, 2, ou 3
                
                // Adiciona variação de movimento baseada na posição no grid
                // Cards das extremidades se movem mais, mantendo a estrutura de grid
                const rowFactor = row === 1 ? 1.1 : 0.9; // linha superior se move mais
                const colFactor = col === 2 ? 0.9 : 1.1; // coluna do meio se move menos
                
                // Calcula o movimento do card com base em sua posição no grid
                let cardMovement = baseMovement * rowFactor * colFactor;
                
                // Aplica a transformação - mantém apenas o movimento horizontal
                card.style.transform = `translateX(${cardMovement}px)`;
                
                // Mantém opacidade total o tempo todo
                card.style.opacity = 1;
                
                // Define os novos manipuladores para hover
                const enterHandler = function() {
                    this.style.transform = `translateX(${cardMovement}px) translateY(-10px)`;
                };
                
                const leaveHandler = function() {
                    this.style.transform = `translateX(${cardMovement}px)`;
                };
                
                // Armazena os manipuladores para remoção posterior
                hoverListeners[index] = {
                    enter: enterHandler,
                    leave: leaveHandler
                };
                
                // Adiciona ouvintes de eventos
                card.addEventListener('mouseenter', enterHandler);
                card.addEventListener('mouseleave', leaveHandler);
            });
        }
    }
    
    // Função para limitar a frequência de execução (throttling)
    function throttle(callback, limit) {
        let waiting = false;
        return function() {
            if (!waiting) {
                callback.apply(this, arguments);
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, limit);
            }
        };
    }
    
    // Adiciona evento de scroll com throttling
    window.addEventListener('scroll', throttle(horizontalParallax, 10));
    
    // Executa a função uma vez para inicializar
    horizontalParallax();
    
    // Também executa quando a janela é redimensionada
    window.addEventListener('resize', throttle(horizontalParallax, 100));
});