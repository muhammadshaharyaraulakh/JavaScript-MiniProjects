const track = document.getElementById('carouselTrack');
const items = document.querySelectorAll('.carousel-item-custom');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

let index = 0;

function getVisibleCount() {
  if (window.innerWidth >= 1200) return 4;
  if (window.innerWidth >= 992) return 3;
  if (window.innerWidth >= 576) return 2;
  return 1;
}

function createDots() {
  dotsContainer.innerHTML = "";
  const visibleCount = getVisibleCount();
  const totalDots = items.length - visibleCount + 1;
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === index) dot.classList.add("active");
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  }
}

function updateCarousel() {
  const visibleCount = getVisibleCount();
  const itemWidth = items[0].offsetWidth;
  const maxIndex = items.length - visibleCount;
  if (index < 0) index = 0;
  if (index > maxIndex) index = maxIndex;
  track.style.transform = `translateX(-${index * itemWidth}px)`;
  createDots();
}

prevBtn.addEventListener('click', () => {
  index--;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  index++;
  updateCarousel();
});

dotsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('dot')) {
    index = parseInt(e.target.dataset.index);
    updateCarousel();
  }
});

window.addEventListener('resize', updateCarousel);
window.addEventListener('load', updateCarousel);