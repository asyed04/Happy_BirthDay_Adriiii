// Simple music player logic for Adrianna's birthday site
const tracks = [
    {
        name: "Happy Birthday Song",
        src: "music/happy_birthday.mp3"
    }
    // Add more tracks as needed
];

let currentTrack = 0;
let isPlaying = false;
const audio = new Audio();

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('music-toggle');
    const trackName = document.getElementById('music-track-name');
    const nextBtn = document.getElementById('music-next');
    const prevBtn = document.getElementById('music-prev');

    // Debug: Check if buttons exist
    console.log('Music player elements found:', {
        toggleBtn: !!toggleBtn,
        trackName: !!trackName,
        nextBtn: !!nextBtn,
        prevBtn: !!prevBtn
    });

    if (!toggleBtn) {
        console.error('Music toggle button not found! Check HTML IDs.');
        return;
    }

    function loadTrack(index) {
        audio.src = tracks[index].src;
        if (trackName) trackName.textContent = tracks[index].name;
        console.log('Loaded track:', tracks[index].name);
    }

    function updateToggleButton() {
        const icon = toggleBtn.querySelector('i');
        if (isPlaying) {
            // Show pause icon when music is playing
            icon.className = 'fas fa-pause';
            toggleBtn.title = 'Pause';
            console.log('Button updated to show pause icon');
        } else {
            // Show play icon when music is paused
            icon.className = 'fas fa-play';
            toggleBtn.title = 'Play';
            console.log('Button updated to show play icon');
        }
    }

    function playMusic() {
        console.log('Attempting to play music...');
        audio.play().then(() => {
            console.log('Music started playing');
            isPlaying = true;
            updateToggleButton();
        }).catch(e => {
            console.log('Auto-play prevented:', e.message);
            // Update button state anyway
            isPlaying = true;
            updateToggleButton();
        });
    }

    function pauseMusic() {
        console.log('Pausing music...');
        audio.pause();
        isPlaying = false;
        updateToggleButton();
    }

    function togglePlayPause() {
        console.log('Toggle button clicked - Current state:', isPlaying ? 'playing' : 'paused');
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }

    // Single toggle button event listener
    toggleBtn.addEventListener('click', togglePlayPause);

    // Single toggle button event listener
    toggleBtn.addEventListener('click', togglePlayPause);

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentTrack = (currentTrack + 1) % tracks.length;
            loadTrack(currentTrack);
            if (isPlaying) playMusic();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
            loadTrack(currentTrack);
            if (isPlaying) playMusic();
        });
    }

    // Auto-advance to next track when current ends
    audio.addEventListener('ended', () => {
        if (nextBtn) nextBtn.click();
    });

    // Global function for countdown to trigger music
    window.playBirthdayMusic = playMusic;

    // // TEST FEATURE - Add test button for music
    // const testMusicButton = document.createElement('button');
    // testMusicButton.textContent = 'Test Birthday Music';
    // testMusicButton.style.position = 'fixed';
    // testMusicButton.style.bottom = '70px';
    // testMusicButton.style.right = '20px';
    // testMusicButton.style.zIndex = '1000';
    // testMusicButton.style.padding = '10px 15px';
    // testMusicButton.style.backgroundColor = 'var(--secondary-color)';
    // testMusicButton.style.color = 'white';
    // testMusicButton.style.border = 'none';
    // testMusicButton.style.borderRadius = '5px';
    // testMusicButton.style.cursor = 'pointer';
    // testMusicButton.style.fontSize = '12px';
    
    // testMusicButton.addEventListener('click', () => {
    //     console.log('Testing birthday music...');
    //     playMusic();
    // });
    
    // document.body.appendChild(testMusicButton);

    // Initialize with first track
    loadTrack(currentTrack);
    updateToggleButton(); // Set initial button state
});
