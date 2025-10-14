
document.addEventListener('DOMContentLoaded', () => {
    const openNavBtn = document.getElementById('open-nav');
    const closeNavBtn = document.getElementById('close-nav');
    const offcanvasMenu = document.getElementById('offcanvas-menu');
    const offcanvasOverlay = document.getElementById('offcanvas-overlay');
    const offcanvasLinks = document.querySelectorAll('.offcanvas-link');

    function openOffCanvas() {
        offcanvasMenu.classList.add('active');
        offcanvasOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    function closeOffCanvas() {
        offcanvasMenu.classList.remove('active');
        offcanvasOverlay.classList.remove('active');
        document.body.style.overflow = ''; 
    }

    openNavBtn.addEventListener('click', openOffCanvas);
    closeNavBtn.addEventListener('click', closeOffCanvas);
    offcanvasOverlay.addEventListener('click', closeOffCanvas); 
    offcanvasLinks.forEach(link => {
        link.addEventListener('click', closeOffCanvas);
    });

    // Close on ESC key press
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && offcanvasMenu.classList.contains('active')) {
            closeOffCanvas();
        }
    });
});
