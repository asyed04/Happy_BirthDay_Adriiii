// Birthday Wishes Animation JavaScript
function initWishes() {
    // Birthday wishes for Adrianna
    const wishes = [
        "Happy Birthday Adrianna!",
        "Wishing you a wonderful day!",
        "May all your dreams come true!",
        "Another year of being amazing!",
        "Happy Birthday! Enjoy your day!",
        "Wishing you the best birthday ever!",
        "May your day be filled with joy!",
        "Sending you birthday love!",
        "Have a fantastic birthday!",
        "Celebrate and enjoy your special day!"
    ];
    
    // Emojis to use with wishes
    const emojis = ["🎂", "🎉", "🎁", "🎈", "💖", "✨", "🥳", "🍰", "🎊", "😊"];
    
    // Colors for the wishes
    const colors = ["#ff69b4", "#9370db", "#ffd700", "#ff6347", "#00ced1"];
    
    // Get the wishes container
    const container = document.getElementById('wishes-container');
    
    // Clear any existing content
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    // Create initial wishes
    createWish();
    
    // Create new wishes periodically
    setInterval(createWish, 3000);
    
    function createWish() {
        // Create wish element
        const wish = document.createElement('div');
        wish.className = 'wish';
        
        // Random wish text and emoji
        const wishText = wishes[Math.floor(Math.random() * wishes.length)];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Set content
        wish.innerHTML = `<span class="wish-emoji">${emoji}</span>${wishText}`;
        
        // Random position (left)
        const leftPos = Math.floor(Math.random() * 70) + 10; // 10% to 80%
        wish.style.left = leftPos + '%';
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        wish.style.backgroundColor = color;
        
        // Add to container
        container.appendChild(wish);
        
        // Remove after animation completes
        setTimeout(() => {
            if (wish && wish.parentNode) {
                wish.parentNode.removeChild(wish);
            }
        }, 8000);
    }
}