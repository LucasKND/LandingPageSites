document.addEventListener('DOMContentLoaded', function() {
    // Seleciona a seção de desenvolvimento e seus elementos
    const developmentSection = document.getElementById('development-process');
    const timeline = document.querySelector('.timeline');
    const timelineContainers = document.querySelectorAll('.timeline-container');
    const timelineLine = document.querySelector('.timeline-loading-line');
      // Função de criação de partículas removida
    
    // Função para aplicar o efeito parallax vertical
    function verticalParallax() {
        // Verifica se a seção está visível na tela
        const sectionRect = developmentSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Se a seção estiver visível na tela
        if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
            // Calcula a porcentagem de scroll pela seção (0 quando no topo, 1 quando no final)
            const scrollProgress = (windowHeight - sectionRect.top) / (windowHeight + sectionRect.height);
            const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
            
            // Atualiza a altura da linha de loading com uma interpolação suave
            timelineLine.style.height = `${clampedProgress * 100}%`;
              // Partículas removidas
            
            // Aplica efeito parallax nos containers da timeline
            timelineContainers.forEach((container, index) => {
                const containerRect = container.getBoundingClientRect();
                
                // Só anima quando o container está visível
                if (containerRect.top < windowHeight && containerRect.bottom > 0) {                    // Calcula a posição relativa do container na janela
                    const containerProgress = (windowHeight - containerRect.top) / (windowHeight + containerRect.height);
                    
                    // Determina se o container está em foco baseado na sua posição no viewport
                    // Agora usamos uma faixa mais ampla para ativar cards sequencialmente
                    const isInFocus = containerProgress > 0.3 && containerProgress < 0.85;
                    
                    // Adicionamos uma verificação baseada no índice para ativar os cards sequencialmente
                    // conforme o scroll avança mais para baixo na página
                    const sequentialActivation = scrollProgress > 0.1 + (index * 0.1);
                    
                    // Movimento vertical baseado na posição com variação por índice
                    const translateY = 30 * (0.5 - containerProgress) * (index % 2 === 0 ? 1 : -1);
                    // Adiciona movimento horizontal suave
                    const translateX = 5 * Math.sin(containerProgress * Math.PI) * (index % 2 === 0 ? 1 : -1);
                    
                    // Aplica transformação - movimento vertical, horizontal, rotação sutil e escala
                    const visibility = containerProgress > 0.1 ? 1 : containerProgress * 10;
                    container.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${translateX * 0.1}deg)`;
                    container.style.opacity = Math.min(1, visibility);                    // Adiciona ou remove classe 'active' com base no foco e na ativação sequencial
                    if (isInFocus && sequentialActivation) {
                        container.classList.add('active');
                        
                        // Adiciona classe hover-effect para simular o efeito hover quando em foco
                        const content = container.querySelector('.timeline-content');
                        if (content) {
                            content.classList.add('hover-effect');
                            
                            // Programar a remoção da classe após 2 segundos para criar um efeito pulsante
                            setTimeout(() => {
                                if (container.classList.contains('active')) {
                                    content.classList.remove('hover-effect');
                                    
                                    // Adicionar novamente após um pequeno delay para criar um efeito pulsante
                                    setTimeout(() => {
                                        if (container.classList.contains('active')) {
                                            content.classList.add('hover-effect');
                                        }
                                    }, 1500);
                                }
                            }, 2000);
                        }
                    } else {
                        container.classList.remove('active');
                        
                        // Remove a classe hover-effect quando não estiver em foco
                        const content = container.querySelector('.timeline-content');
                        if (content) {
                            content.classList.remove('hover-effect');
                        }
                    }
                      
                    // Removido o efeito de rotação dos ícones, mantendo-os estáticos
                    const icon = container.querySelector('.timeline-icon');
                    if (icon) {
                        // Apenas ajusta a escala sutilmente se estiver em foco
                        icon.style.transform = `scale(${isInFocus ? 1.05 : 1})`;
                    }
                    
                    // Anima o número da timeline
                    const number = container.querySelector('.timeline-number');
                    if (number) {
                        if (isInFocus) {
                            number.classList.add('active');
                        } else {
                            number.classList.remove('active');
                        }
                    }}
            });
            
            // Aplicar efeito parallax ao próprio elemento da timeline
            const timelineScrollOffset = (0.5 - clampedProgress) * 20;
            timeline.style.transform = `translateY(${timelineScrollOffset}px)`;
        }
    }
    
    // Função para limitar a frequência de execução
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
      // Removido o efeito de movimento baseado na posição do mouse
    // Mantemos apenas variáveis para uso futuro se necessário
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        // Efeito de mouse removido conforme solicitado
    });
    
    // Iniciar animação suave de flutuação para todos os containers
    function startFloatingAnimation() {
        timelineContainers.forEach((container, index) => {
            const delay = index * 0.2;
            const duration = 3 + Math.random() * 2;
            
            container.style.animation = `floating ${duration}s ease-in-out ${delay}s infinite alternate`;
        });
    }
      // Adicionar animação de flutuação ao CSS - mais sutil para não interferir com o efeito 3D de hover
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floating {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-3px); }
        }
    `;
    document.head.appendChild(style);
    
    // Adiciona evento de scroll com throttling
    window.addEventListener('scroll', throttle(verticalParallax, 10));
    
    // Executa a função uma vez para inicializar
    verticalParallax();
    startFloatingAnimation();
    
    // Também executa quando a janela é redimensionada
    window.addEventListener('resize', throttle(verticalParallax, 100));
});
