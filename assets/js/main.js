// JavaScript personalizado para el sitio de Ciencia, Tecnologia y Sociedad

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para enlaces internos
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animación de entrada para las cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observar todas las cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Navbar activo según la página
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Tooltip inicialización
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Loading state para botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('btn-outline-light') && !this.href) {
                this.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Cargando...';
                setTimeout(() => {
                    this.innerHTML = this.dataset.originalText || 'Cargar';
                }, 1000);
            }
        });
    });
});

// Función para inicializar Timeline.js
function initializeTimeline(timelineData) {
    if (typeof TL !== 'undefined') {
        const timeline = new TL.Timeline('timeline-embed', timelineData, {
            language: 'es',
            height: '600px',
            initial_zoom: 1,
            zoom_sequence: [0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
        });
        return timeline;
    }
}

// Función para cargar datos de referencias
function loadReferencias() {
    // Datos de ejemplo - en una implementación real, esto vendría de una API o archivo JSON
    return {
        'capitulo-1': [
            {
                numero: 1,
                pagina: 15,
                titulo: 'Historia de la Tecnología',
                resumen: 'Evolución de la tecnología desde sus inicios hasta la era moderna.',
                wikipedia: 'https://es.wikipedia.org/wiki/Historia_de_la_tecnolog%C3%ADa'
            },
            {
                numero: 2,
                pagina: 23,
                titulo: 'Revolución Industrial',
                resumen: 'Transformación económica y social ocurrida entre 1760 y 1840.',
                wikipedia: 'https://es.wikipedia.org/wiki/Revoluci%C3%B3n_Industrial'
            }
        ],
        'capitulo-2': [
            {
                numero: 3,
                pagina: 45,
                titulo: 'Inteligencia Artificial',
                resumen: 'Desarrollo de sistemas que pueden realizar tareas que requieren inteligencia humana.',
                wikipedia: 'https://es.wikipedia.org/wiki/Inteligencia_artificial'
            }
        ]
    };
}

// Función para renderizar referencias
function renderReferencias(capitulo) {
    const referencias = loadReferencias();
    const container = document.getElementById('referencias-content');
    
    if (!container || !referencias[capitulo]) return;
    
    container.innerHTML = '';
    
    referencias[capitulo].forEach(ref => {
        const card = `
            <div class="referencia-card card fade-in-up">
                <div class="card-header bg-transparent border-0 d-flex align-items-center">
                    <div class="referencia-number">${ref.numero}</div>
                    <div>
                        <h6 class="mb-0 fw-bold">Referencia ${ref.numero}</h6>
                        <small class="text-muted">Página ${ref.pagina}</small>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${ref.titulo}</h5>
                    <p class="card-text text-muted">${ref.resumen}</p>
                    <a href="${ref.wikipedia}" target="_blank" class="btn btn-outline-primary">
                        <i class="bi bi-wikipedia"></i> Ver en Wikipedia
                    </a>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Utility functions
const utils = {
    // Formato de fecha
    formatDate: function(date) {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    },
    
    // Scroll suave a elemento
    scrollToElement: function(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    },
    
    // Mostrar toast de notificación
    showToast: function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type} border-0`;
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        toast.addEventListener('hidden.bs.toast', () => {
            document.body.removeChild(toast);
        });
    }
};
