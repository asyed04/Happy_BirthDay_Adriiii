# Happy Birthday Adri Website

A special birthday website created with love for Adri's birthday celebration!

## Features

- **Birthday Countdown Timer**: Counts down to Adri's special day
- **Photo Gallery**: Displays memories and special moments
- **Interactive Quiz**: Tests how well people know Adri
- **Birthday Wishes Animation**: Displays birthday wishes in a fun, animated way
- **Video Messages**: Shows video messages from friends and family
- **Cake Animation**: Interactive cake with candle to blow out

## How to Customize

### 1. Update Birthday Date

In `js/countdown.js`, update the birthday date:

```javascript
const birthdayDate = new Date(2023, 6, 15, 0, 0, 0).getTime();
```

Replace `2023, 6, 15` with Adri's actual birthday (Year, Month-1, Day). Note that months are 0-indexed (January = 0, December = 11).

### 2. Add Photos

1. Add your photos to the `images` folder
2. Update the photo gallery section in `index.html`:

```html
<div class="gallery-container">
    <div class="gallery-item">
        <img src="images/your-photo-1.jpg" alt="Memory 1">
    </div>
    <!-- Add more photos as needed -->
</div>
```

### 3. Customize Quiz Questions

In `js/quiz.js`, update the questions array with questions about Adri:

```javascript
const questions = [
    {
        question: "What is Adri's favorite color?",
        answers: [
            { text: 'Blue', correct: false },
            { text: 'Pink', correct: true },
            { text: 'Green', correct: false },
            { text: 'Purple', correct: false }
        ]
    },
    // Add more questions
];
```

### 4. Add Birthday Wishes

In `js/wishes.js`, update the wishes array with actual birthday wishes:

```javascript
const wishes = [
    "Happy Birthday Adri! Wishing you all the happiness in the world!",
    // Add more wishes
];
```

### 5. Add Video Messages

1. Add video messages to the `videos` folder
2. Update the video section in `index.html`:

```html
<div class="video-container">
    <div class="video-item">
        <video controls>
            <source src="videos/message-from-name.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <p class="video-caption">From [Name]</p>
    </div>
    <!-- Add more videos as needed -->
</div>
```

### 6. Customize Colors

In `css/style.css`, update the color variables to match Adri's favorite colors:

```css
:root {
    --primary-color: #ff69b4; /* Pink - change to her favorite color */
    --secondary-color: #9370db; /* Purple - change to her favorite color */
    /* Other colors */
}
```

## How to View the Website

1. Open the `index.html` file in a web browser
2. For the best experience, use a modern browser like Chrome, Firefox, or Edge

## Hosting the Website (Optional)

To make the website accessible online:

1. Upload all files to a web hosting service (GitHub Pages, Netlify, Vercel, etc.)
2. Share the URL with Adri on her birthday!

## Enjoy!

This website was created with love. I hope it brings joy to Adri on her special day!