// Review Carousel Logic
let reviewIndex = 0;
const reviewTrack = document.getElementById('reviewTrack');
const reviewCards = document.querySelectorAll('.review-card');

function getVisibleReviewCards() {
    const width = window.innerWidth;
    if (width >= 992) return 2;
    if (width >= 768) return 2;
    return 1;
}

function updateReviewCarousel() {
    if (reviewCards.length === 0) return;
    const cardWidth = reviewCards[0].offsetWidth + 20;
    reviewTrack.style.transform = `translateX(-${reviewIndex * cardWidth}px)`;
}

function moveReviewCarousel(direction) {
    const visible = getVisibleReviewCards();
    const maxIndex = reviewCards.length - visible;

    reviewIndex += direction * visible;

    if (reviewIndex < 0) {
        reviewIndex = maxIndex;
    } else if (reviewIndex > maxIndex) {
        reviewIndex = 0;
    }

    updateReviewCarousel();
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
setInterval(() => {
    moveReviewCarousel(1);
}, 5000);

function getVisibleCards() {
    const width = window.innerWidth;
    if (width >= 992) return 3;
    if (width >= 768) return 2;
    return 1;
}

function updateCardCarousel() {
    if (allCards.length === 0) return;
    const cardWidth = allCards[0].offsetWidth + 20;
    cardTrack.style.transform = `translateX(-${cardIndex * cardWidth}px)`;
}

function moveCardCarousel(direction) {
    const visible = getVisibleCards();
    const originalCardCount = allCards.length / 3; // Since we tripled the cards
    
    cardIndex += direction * visible;
    
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