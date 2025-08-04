// Cake Animation JavaScript
function initCake() {
    const blowButton = document.getElementById('blow-candle');
    const flame = document.querySelector('.flame');
    
    blowButton.addEventListener('click', () => {
        // Hide the flame
        flame.style.display = 'none';
        
        // Show confetti
        createConfetti();
        
        // Play sound (optional)
        // const audio = new Audio('sounds/cheer.mp3');
        // audio.play();
        
        // Show message
        const message = document.createElement('div');
        message.textContent = 'Happy Birthday Adri! 🎉';
        message.style.fontSize = '2rem';
        message.style.fontWeight = 'bold';
        message.style.marginTop = '20px';
        message.style.color = 'var(--primary-color)';
        message.style.textAlign = 'center';
        
        document.querySelector('.cake-container').appendChild(message);
        
        // Disable button
        blowButton.disabled = true;
        blowButton.textContent = 'Wish Made!';
    });
    
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'absolute';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '1000';
        
        document.body.appendChild(confettiContainer);
        
        // Create confetti pieces
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            const colors = ['#ff69b4', '#9370db', '#ffd700', '#ff6347', '#00ced1'];
            
            confetti.style.position = 'absolute';
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '-20px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.opacity = Math.random() + 0.5;
            
            confettiContainer.appendChild(confetti);
            
            // Animate confetti
            const animationDuration = Math.random() * 3 + 2;
            confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: animationDuration * 1000,
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
            });
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, animationDuration * 1000);
        }
        
        // Remove container after all confetti is gone
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }
}