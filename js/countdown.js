// Countdown Timer JavaScript
function initCountdown() {
    // Set the date we're counting down to (YYYY, MM-1, DD, HH, MM, SS)
    // Note: Month is 0-based (0 = January, 11 = December)
    // Adrianna's birthday: July 30th (New York time zone)
    const currentYear = new Date().getFullYear();
    const birthdayDate = new Date(currentYear, 6, 30, 0, 0, 0).getTime();
    
    // Flag to track if fireworks have been shown
    let fireworksShown = false;
    let lastDistance = null; // Track previous distance to detect when countdown hits zero
    
    
    // // TEST MODE - Uncomment this section to enable testing
    // const TEST_MODE = true;
    
    // // Create test button for easy testing
    // if (TEST_MODE) {
    //     const testButton = document.createElement('button');
    //     testButton.textContent = 'Test Fireworks';
    //     testButton.style.position = 'fixed';
    //     testButton.style.bottom = '20px';
    //     testButton.style.right = '20px';
    //     testButton.style.zIndex = '1000';
    //     testButton.style.padding = '10px 15px';
    //     testButton.style.backgroundColor = 'var(--primary-color)';
    //     testButton.style.color = 'white';
    //     testButton.style.border = 'none';
    //     testButton.style.borderRadius = '5px';
    //     testButton.style.cursor = 'pointer';
        
    //     testButton.addEventListener('click', () => {
    //         celebrateBirthday();
    //     });
        
    //     document.body.appendChild(testButton);
    // }
    
    
    // Update the countdown every 1 second
    const countdownTimer = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the birthday
        let distance = birthdayDate - now;
        
        /* 
        // If TEST_MODE is enabled and we want to simulate countdown reaching zero
        if (TEST_MODE && distance > 10000) {
            // You can uncomment the line below to automatically trigger fireworks after 10 seconds
            // distance = 10000; // This will make countdown show 10 seconds
        }
        */
        
        // Store the original distance before any modifications
        const originalDistance = distance;
        
        // If the date has passed, set countdown for next year
        if (distance < 0) {
            console.log('Debug: distance < 0, lastDistance:', lastDistance, 'fireworksShown:', fireworksShown);
            // Only trigger celebration if we just crossed from positive to negative
            // (meaning countdown just reached zero, not loading after birthday passed)
            if (lastDistance !== null && lastDistance > 0 && !fireworksShown) {
                console.log('Debug: Triggering celebration!');
                celebrateBirthday();
                fireworksShown = true;
            } else {
                console.log('Debug: Not triggering celebration - condition not met');
            }
            
            const nextYear = currentYear + 1;
            const nextBirthday = new Date(nextYear, 6, 30, 0, 0, 0).getTime();
            distance = nextBirthday - now;
        }
        
        // Store the ORIGINAL distance for next iteration (before modifications)
        lastDistance = originalDistance;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById("days").textContent = formatTime(days);
        document.getElementById("hours").textContent = formatTime(hours);
        document.getElementById("minutes").textContent = formatTime(minutes);
        document.getElementById("seconds").textContent = formatTime(seconds);
    }, 1000);
    
    // Format time to always have two digits
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
    
    // Function to celebrate birthday with fireworks and message
    function celebrateBirthday() {
        console.log("🎉 It's Adrianna's Birthday! 🎉");
        
        // Start fireworks
        initFireworks();
        
        // Play birthday music automatically
        if (typeof window.playBirthdayMusic === 'function') {
            console.log("🎵 Playing birthday music!");
            window.playBirthdayMusic();
        } else {
            console.log("Music player not ready yet");
        }
        
        // Show birthday message
        const birthdayMessage = document.createElement('div');
        birthdayMessage.className = 'birthday-message';
        birthdayMessage.innerHTML = `
            <h1>Happy Birthday Adrianna! 🎂</h1>
            <p>Wishing you a day filled with joy, laughter, and all your favorite things!</p>
        `;
        document.body.appendChild(birthdayMessage);
        
        // Remove message after fireworks end
        setTimeout(() => {
            birthdayMessage.style.opacity = '0';
            setTimeout(() => {
                birthdayMessage.remove();
            }, 1000);
        }, 7000); // Remove 3 seconds before fireworks end
    }
}