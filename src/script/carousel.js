document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('carouselTR');
  if (carousel) {
    const currentSlide = document.querySelector('.current-slide');
    const totalSlides = document.querySelector('.total-slides');
    const items = document.querySelectorAll('#carouselTR .carousel-item');
    
    totalSlides.textContent = items.length;
    
    carousel.addEventListener('slid.bs.carousel', function() {
      const activeItem = document.querySelector('#carouselTR .carousel-item.active');
      const index = [...items].indexOf(activeItem);
      currentSlide.textContent = index + 1;
    });
  }
});

// Função para verificar o tamanho da tela e alternar classes
function checkScreenSize() {
  const carouselItems = document.querySelectorAll('.carousel-item');
  
  carouselItems.forEach(item => {
    const desktopImg = item.querySelector('.img-desktop');
    const mobileImg = item.querySelector('.img-mobile');
    
    if (window.innerWidth <= 765) {
      desktopImg.classList.add('d-none');
      mobileImg.classList.remove('d-none');
    } else {
      desktopImg.classList.remove('d-none');
      mobileImg.classList.add('d-none');
    }
  });
}

// Executa quando a página carrega e quando redimensiona
window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);