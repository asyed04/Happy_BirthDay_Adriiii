// Enhanced Magical Fireworks Animation JavaScript
function initFireworks() {
    // Create fireworks container if it doesn't exist
    let fireworksContainer = document.getElementById('fireworks-container');
    if (!fireworksContainer) {
        fireworksContainer = document.createElement('div');
        fireworksContainer.id = 'fireworks-container';
        document.body.appendChild(fireworksContainer);
    }
    
    // Clear any existing fireworks
    fireworksContainer.innerHTML = '';
    fireworksContainer.style.display = 'block';
    
    // Set duration for fireworks display (10 seconds - reduced for better performance)
    const fireworksDuration = 10000;
    
    // Create different types of fireworks at random intervals (reduced frequency)
    const fireworksInterval = setInterval(() => {
        const fireworkType = Math.random();
        if (fireworkType < 0.4) {
            createMagicalFirework();
        } else if (fireworkType < 0.7) {
            createSparkleFirework();
        } else if (fireworkType < 0.9) {
            createHeartFirework();
        } else {
            createStarFirework();
        }
    }, 200); // Increased from 120ms to 200ms
    
    // Create continuous sparkles (reduced frequency)
    const sparkleInterval = setInterval(createFloatingSparkle, 150); // Increased from 80ms to 150ms
    
    // Stop creating fireworks after the duration
    setTimeout(() => {
        clearInterval(fireworksInterval);
        clearInterval(sparkleInterval);
        // Fade out and remove the container after all animations complete
        setTimeout(() => {
            fireworksContainer.style.opacity = '0';
            setTimeout(() => {
                fireworksContainer.style.display = 'none';
                fireworksContainer.innerHTML = '';
                fireworksContainer.style.opacity = '1';
            }, 1000);
        }, 3000);
    }, fireworksDuration);
    
    function createMagicalFirework() {
        // Create firework rocket with trail
        const rocket = document.createElement('div');
        rocket.className = 'firework-rocket';
        
        // Random launch position (bottom of screen)
        const left = Math.random() * 100;
        const startY = 100;
        const endY = 20 + Math.random() * 30;
        
        rocket.style.left = `${left}%`;
        rocket.style.top = `${startY}%`;
        
        fireworksContainer.appendChild(rocket);
        
        // Create trail effect
        createRocketTrail(rocket, left, startY, endY);
        
        // Animate rocket rising
        rocket.animate([
            { top: `${startY}%`, opacity: 1 },
            { top: `${endY}%`, opacity: 0.8 }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        // Trigger magical explosion
        setTimeout(() => {
            const rect = rocket.getBoundingClientRect();
            createMagicalExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2);
            rocket.remove();
        }, 1500);
    }
    
    function createRocketTrail(rocket, left, startY, endY) {
        const trailInterval = setInterval(() => {
            const trail = document.createElement('div');
            trail.className = 'rocket-trail';
            trail.style.left = `${left}%`;
            trail.style.top = rocket.style.top;
            fireworksContainer.appendChild(trail);
            
            // Fade out trail
            setTimeout(() => trail.remove(), 800);
        }, 50);
        
        setTimeout(() => clearInterval(trailInterval), 1500);
    }
    
    function createMagicalExplosion(x, y) {
        // Create multiple rings of particles with different colors
        const colors = [
            ['#ff69b4', '#ff1493', '#dc143c'], // Pink gradient
            ['#9370db', '#8a2be2', '#4b0082'], // Purple gradient
            ['#ffd700', '#ffb347', '#ff8c00'], // Gold gradient
            ['#00ced1', '#40e0d0', '#48d1cc'], // Turquoise gradient
            ['#ff6347', '#ff4500', '#ff0000']  // Red gradient
        ];
        
        const colorSet = colors[Math.floor(Math.random() * colors.length)];
        
        // Create multiple explosion rings (reduced from 3 to 2)
        for (let ring = 0; ring < 2; ring++) {
            setTimeout(() => {
                createExplosionRing(x, y, colorSet, ring);
            }, ring * 200);
        }
        
        // Add sparkle burst
        setTimeout(() => createSparkleBurst(x, y), 300);
    }
    
    function createExplosionRing(x, y, colors, ringIndex) {
        const particleCount = 20 + ringIndex * 10; // Reduced from 40 + ringIndex * 20
        const baseDistance = 80 + ringIndex * 40;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'magical-particle';
            
            const angle = (i / particleCount) * Math.PI * 2;
            const distance = baseDistance + Math.random() * 50;
            const size = Math.random() * 4 + 2;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = `radial-gradient(circle, ${color}, transparent)`;
            particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            document.body.appendChild(particle);
            
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1) rotate(0deg)', 
                    opacity: 1,
                    filter: 'brightness(1.5)'
                },
                { 
                    transform: `translate(${endX - x}px, ${endY - y}px) scale(0) rotate(360deg)`, 
                    opacity: 0,
                    filter: 'brightness(0.5)'
                }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => particle.remove(), 3000);
        }
    }
    
    function createSparkleBurst(x, y) {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'magic-sparkle';
                sparkle.innerHTML = '✨';
                
                const offsetX = (Math.random() - 0.5) * 200;
                const offsetY = (Math.random() - 0.5) * 200;
                
                sparkle.style.left = `${x + offsetX}px`;
                sparkle.style.top = `${y + offsetY}px`;
                sparkle.style.fontSize = `${Math.random() * 20 + 10}px`;
                
                document.body.appendChild(sparkle);
                
                sparkle.animate([
                    { transform: 'scale(0) rotate(0deg)', opacity: 0 },
                    { transform: 'scale(1) rotate(180deg)', opacity: 1 },
                    { transform: 'scale(0) rotate(360deg)', opacity: 0 }
                ], {
                    duration: 2000,
                    easing: 'ease-out'
                });
                
                setTimeout(() => sparkle.remove(), 2000);
            }, i * 50);
        }
    }
    
    function createSparkleFirework() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.6;
        
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'floating-sparkle';
            sparkle.innerHTML = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 150 + 50;
            
            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;
            sparkle.style.fontSize = `${Math.random() * 25 + 15}px`;
            
            document.body.appendChild(sparkle);
            
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
            sparkle.animate([
                { 
                    transform: 'translate(0, 0) scale(0) rotate(0deg)', 
                    opacity: 0 
                },
                { 
                    transform: `translate(${(endX - x) * 0.5}px, ${(endY - y) * 0.5}px) scale(1) rotate(180deg)`, 
                    opacity: 1 
                },
                { 
                    transform: `translate(${endX - x}px, ${endY - y}px) scale(0) rotate(360deg)`, 
                    opacity: 0 
                }
            ], {
                duration: 3000,
                easing: 'ease-out'
            });
            
            setTimeout(() => sparkle.remove(), 3000);
        }
    }
    
    function createHeartFirework() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.6;
        
        // Create heart shape with particles
        const heartPoints = generateHeartShape(20);
        
        heartPoints.forEach((point, index) => {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart-particle';
                heart.innerHTML = '💖';
                heart.style.left = `${x + point.x * 3}px`;
                heart.style.top = `${y + point.y * 3}px`;
                heart.style.fontSize = `${Math.random() * 20 + 15}px`;
                
                document.body.appendChild(heart);
                
                heart.animate([
                    { transform: 'scale(0) rotate(0deg)', opacity: 0 },
                    { transform: 'scale(1) rotate(360deg)', opacity: 1 },
                    { transform: 'scale(0) rotate(720deg)', opacity: 0 }
                ], {
                    duration: 3000,
                    easing: 'ease-out'
                });
                
                setTimeout(() => heart.remove(), 3000);
            }, index * 100);
        });
    }
    
    function createStarFirework() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.6;
        
        // Create star burst pattern
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            
            for (let j = 0; j < 10; j++) {
                setTimeout(() => {
                    const star = document.createElement('div');
                    star.className = 'star-particle';
                    star.innerHTML = '⭐';
                    
                    const distance = j * 20 + 30;
                    const endX = x + Math.cos(angle) * distance;
                    const endY = y + Math.sin(angle) * distance;
                    
                    star.style.left = `${x}px`;
                    star.style.top = `${y}px`;
                    star.style.fontSize = `${Math.random() * 15 + 10}px`;
                    
                    document.body.appendChild(star);
                    
                    star.animate([
                        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                        { transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`, opacity: 0 }
                    ], {
                        duration: 2000,
                        easing: 'ease-out'
                    });
                    
                    setTimeout(() => star.remove(), 2000);
                }, j * 100);
            }
        }
    }
    
    function createFloatingSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'ambient-sparkle';
        sparkle.innerHTML = ['✨', '⭐', '💫'][Math.floor(Math.random() * 3)];
        
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.fontSize = `${Math.random() * 15 + 8}px`;
        sparkle.style.opacity = Math.random() * 0.7 + 0.3;
        
        document.body.appendChild(sparkle);
        
        sparkle.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 0 },
            { transform: 'scale(1) rotate(180deg)', opacity: sparkle.style.opacity },
            { transform: 'scale(0) rotate(360deg)', opacity: 0 }
        ], {
            duration: 4000,
            easing: 'ease-in-out'
        });
        
        setTimeout(() => sparkle.remove(), 4000);
    }
    
    function generateHeartShape(points) {
        const heartPoints = [];
        for (let i = 0; i < points; i++) {
            const t = (i / points) * Math.PI * 2;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            heartPoints.push({ x, y });
        }
        return heartPoints;
    }
}
