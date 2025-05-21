// Funcionalidades para a seção CTA

document.addEventListener('DOMContentLoaded', function() {
    // Efeito de partículas flutuantes
    createParticles();
    
    // Adicionar event listener para o botão CTA
    const ctaMainBtn = document.querySelector('.cta-main-btn');
    if (ctaMainBtn) {
        ctaMainBtn.addEventListener('click', function(e) {
            // Implementação da ação do botão - pode ser personalizado conforme necessário
            // Exemplo: abrir formulário, rolar para uma seção específica, etc.
        });
    }
});

// Função para criar partículas flutuantes na seção CTA
function createParticles() {
    const ctaSection = document.querySelector('.cta-section');
    
    if (ctaSection) {
        // Cria 50 partículas
        for (let i = 0; i < 50; i++) {
            createParticle(ctaSection);
        }
    }
}

// Função para criar uma única partícula
function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Define posição aleatória
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Define tamanho aleatório
    const size = Math.random() * 6 + 2;
    
    // Define opacidade aleatória
    const opacity = Math.random() * 0.5 + 0.3;
    
    // Aplica os estilos
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity.toString();
    
    // Adiciona ao container
    container.appendChild(particle);
    
    // Anima a partícula
    animateParticle(particle);
}

// Função para animar uma partícula
function animateParticle(particle) {
    // Define duração e direção aleatórias
    const duration = Math.random() * 20 + 10; // Entre 10 e 30 segundos
    const directionX = Math.random() > 0.5 ? 1 : -1;
    const directionY = Math.random() > 0.5 ? 1 : -1;
    
    // Define distância aleatória
    const distanceX = Math.random() * 100 * directionX;
    const distanceY = Math.random() * 100 * directionY;
    
    // Cria a animação
    const animation = particle.animate(
        [
            { transform: 'translate(0, 0)', opacity: particle.style.opacity },
            { transform: `translate(${distanceX}px, ${distanceY}px)`, opacity: 0 }
        ],
        {
            duration: duration * 1000,
            easing: 'ease-out',
            fill: 'forwards'
        }
    );
    
    // Quando a animação terminar, recria a partícula
    animation.onfinish = function() {
        particle.remove();
        createParticle(particle.parentElement);
    };
}
