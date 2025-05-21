// Efeito de digitação para alternar entre "Seu site" e "Sua landing page"
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.getElementById('typing-text');
    
    if (typingText) {
        const phrases = ["Seu site", "Sua landing page"];
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        let typingSpeed = 100; // Velocidade base de digitação em milissegundos
        
        function typeEffect() {
            // Texto atual a ser mostrado
            const phrase = phrases[currentPhrase];
            
            // Verificar se está deletando ou escrevendo
            if (isDeleting) {
                // Remover um caractere
                typingText.textContent = phrase.substring(0, currentChar - 1);
                currentChar--;
                typingSpeed = 50; // Mais rápido ao deletar
            } else {
                // Adicionar um caractere
                typingText.textContent = phrase.substring(0, currentChar + 1);
                currentChar++;
                typingSpeed = 100; // Normal ao escrever
            }
            
            // Lógica para alternar entre deletar e escrever
            if (!isDeleting && currentChar === phrase.length) {
                // Terminou de escrever, aguarda um pouco antes de começar a deletar
                isDeleting = true;
                typingSpeed = 1500; // Pausa antes de começar a deletar
            } else if (isDeleting && currentChar === 0) {
                // Terminou de deletar, muda para a próxima frase
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                typingSpeed = 500; // Pausa antes de começar a próxima palavra
            }
            
            // Efeito de cursor piscando
            if (typingText.classList.contains('cursor')) {
                typingText.classList.remove('cursor');
            } else {
                typingText.classList.add('cursor');
            }
            
            // Continua o loop
            setTimeout(typeEffect, typingSpeed);
        }
        
        // Iniciar o efeito
        typeEffect();
    }
});
