// Inicialização e controle do carrossel
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrossel do Bootstrap
    const carrossel = document.getElementById('portfolioCarousel');
    if (carrossel) {
        const portfolioCarousel = new bootstrap.Carousel(carrossel, {
            interval: 5000,
            pause: 'hover',
            wrap: true
        });
        
        // Mostrar captions em dispositivos móveis também
        const captions = document.querySelectorAll('.carousel-caption.d-none.d-md-block');
        if (window.innerWidth <= 768) {
            captions.forEach(caption => {
                caption.classList.remove('d-none');
                caption.classList.remove('d-md-block');
            });
        }
        
        // Adicionar animação ao trocar slides
        carrossel.addEventListener('slide.bs.carousel', function(e) {
            const activeItem = this.querySelector('.active');
            if (activeItem) {
                activeItem.classList.add('animated', 'fadeOut');
            }
        });
        
        carrossel.addEventListener('slid.bs.carousel', function(e) {
            const activeItem = this.querySelector('.active');
            if (activeItem) {
                activeItem.classList.add('animated', 'fadeIn');
            }
        });
    }
});
