// Menu móvel toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Adiciona classe para animar o ícone
            menuToggle.classList.toggle('active');
            
            // Alterna entre ícones de menu e fechar
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Fecha o menu quando clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Efeitos de scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
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
    }
});