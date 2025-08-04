// Balloons Animation JavaScript - DISABLED
function initBalloons() {
    // Balloon animation disabled - keeping only background particles
    console.log('Balloon animation disabled');
    return;
    
    const balloonContainer = document.querySelector('.balloon-container');
    const colors = ['#ff69b4', '#9370db', '#ffd700', '#ff6347', '#00ced1', '#ff4500'];
    const totalBalloons = 30;
    
    // Create balloons
    for (let i = 0; i < totalBalloons; i++) {
        createBalloon();
    }
    
    // Continue creating balloons at intervals
    setInterval(createBalloon, 2000);
    
    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        // Random position, size, and color
        const size = Math.random() * 30 + 30; // 30-60px
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100; // 0-100%
        const animationDuration = Math.random() * 10 + 10; // 10-20s
        const delay = Math.random() * 5; // 0-5s
        
        // Set balloon styles
        balloon.style.width = `${size}px`;
        balloon.style.height = `${size * 1.5}px`;
        balloon.style.backgroundColor = color;
        balloon.style.left = `${left}%`;
        balloon.style.animationDuration = `${animationDuration}s`;
        balloon.style.animationDelay = `${delay}s`;
        
        // Add string to balloon
        const string = document.createElement('div');
        string.style.position = 'absolute';
        string.style.width = '1px';
        string.style.height = `${size * 2}px`;
        string.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        string.style.bottom = `-${size * 2}px`;
        string.style.left = '50%';
        balloon.appendChild(string);
        
        // Add to container
        balloonContainer.appendChild(balloon);
        
        // Remove balloon after animation completes
        setTimeout(() => {
            balloon.remove();
        }, (animationDuration + delay) * 1000);
    }
}