// Review Carousel Logic
let reviewIndex = 0;
const reviewTrack = document.getElementById('reviewTrack');
const reviewCards = document.querySelectorAll('.review-card');

function getVisibleReviewCards() {
    const width = window.innerWidth;
    if (width >= 992) return 3; // Desktop: 3 cards
    if (width >= 768) return 2; // Tablet: 2 cards
    return 1; // Mobile: 1 card
}

function updateReviewCarousel() {
    if (reviewCards.length === 0) return;
    const cardWidth = reviewCards[0].offsetWidth + 24; // 24px is the gap
    reviewTrack.style.transform = `translateX(-${reviewIndex * cardWidth}px)`;
}

function moveReviewCarousel(direction) {
    const visible = getVisibleReviewCards();
    const maxIndex = reviewCards.length - visible;

    reviewIndex += direction;

    // Infinite loop logic
    if (reviewIndex < 0) {
        reviewIndex = maxIndex;
    } else if (reviewIndex > maxIndex) {
        reviewIndex = 0;
    }

    updateReviewCarousel();
}

// Auto-slide functionality
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveReviewCarousel(1);
    }, 3000); // Change slide every 3 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Main Card Carousel Logic
let cardIndex = 0;
const cardTrack = document.getElementById('cardTrack');
let allCards = [];

function initializeCardCarousel() {
    const originalCards = Array.from(cardTrack.children);
    allCards = [...originalCards];
    
    // Clone cards for infinite loop
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        cardTrack.appendChild(clone);
        allCards.push(clone);
    });
    
    // Add more clones for smoother infinite loop
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        cardTrack.appendChild(clone);
        allCards.push(clone);
    });
}

function getVisibleCards() {
    const width = window.innerWidth;
    if (width >= 992) return 4; // Desktop: 4 cards
    if (width >= 768) return 3; // Tablet: 3 cards
    return 1; // Mobile: 1 card
}

function updateCardCarousel() {
    if (allCards.length === 0) return;
    const cardWidth = allCards[0].offsetWidth + 20; // 20px is the gap
    cardTrack.style.transform = `translateX(-${cardIndex * cardWidth}px)`;
}

function moveCardCarousel(direction) {
    const visible = getVisibleCards();
    const originalCardCount = allCards.length / 3; // Since we tripled the cards
    
    cardIndex += direction;
    
    // Infinite loop logic
    if (cardIndex >= originalCardCount * 2) {
        cardIndex = originalCardCount;
    } else if (cardIndex < 0) {
        cardIndex = originalCardCount - visible;
    }
    
    updateCardCarousel();
}

// Initialize everything when page loads
window.addEventListener('load', () => {
    initializeCardCarousel();
    updateReviewCarousel();
    updateCardCarousel();
    startAutoSlide();
});

// Handle window resize
window.addEventListener('resize', () => {
    updateReviewCarousel();
    updateCardCarousel();
});

// Auto-play for card carousel (optional)
setInterval(() => {
    moveCardCarousel(1);
}, 5000);

// Pause auto-slide when hovering over the carousel
const carouselWrapper = document.querySelector('.carousel-wrapper');
carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
carouselWrapper.addEventListener('mouseleave', startAutoSlide);

// video button

 const videoBtn = document.getElementById('videoBtn');
  const videoPopup = document.getElementById('videoPopup');
  const closePopup = document.getElementById('closePopup');
  const popupVideo = document.getElementById('popupVideo');

  videoBtn.addEventListener('click', () => {
    videoPopup.style.display = 'flex';
    popupVideo.play();
  });

  closePopup.addEventListener('click', () => {
    popupVideo.pause();
    popupVideo.currentTime = 0;
    videoPopup.style.display = 'none';
  });