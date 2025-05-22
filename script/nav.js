// Menu móvel e navegação
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
            
            // Remover classe active de todos os links
            navLinks.forEach(item => item.classList.remove('active'));
            // Adicionar classe active ao link clicado
            this.classList.add('active');
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
        
        // Destaca a seção atual no menu
        highlightCurrentSection();
    });
    
    // Função para destacar a seção atual durante a rolagem
    function highlightCurrentSection() {
        // Seções que queremos monitorar
        const sections = [
            document.querySelector('section.hero'),
            document.querySelector('#portfolio'),
            document.querySelector('#why-choose-us'),
            document.querySelector('#development-process'),
            document.querySelector('#contato')
        ];
        
        // Obter posição de rolagem atual
        const scrollPosition = window.scrollY + 150; // Adicionando offset para melhor UX
        
        // Verificar qual seção está visível
        sections.forEach((section, index) => {
            if (!section) return;
            
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remover classe active de todos os links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Adicionar classe active ao link correspondente
                // Índice 0 é a seção hero (início)
                if (index === 0) {
                    navLinks[0].classList.add('active');
                } else {
                    // Os outros índices correspondem às outras seções
                    navLinks[index].classList.add('active');
                }
            }
        });
    }
    
    // Inicializar o destaque de seção ao carregar a página
    highlightCurrentSection();
});
