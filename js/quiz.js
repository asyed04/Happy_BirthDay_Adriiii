// Quiz JavaScript
function initQuiz() {
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const quizWelcome = document.getElementById('quiz-welcome');
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    
    let shuffledQuestions, currentQuestionIndex, score;
    
    // Clear any existing content in the answer buttons element
    answerButtonsElement.innerHTML = '';
    
    // Questions about Adrianna based on provided information
    const questions = [
        {
            question: "What is Adrianna's favorite color?",
            answers: [
                { text: 'Blue', correct: false },
                { text: 'Pink', correct: true },
                { text: 'Green', correct: false },
                { text: 'Purple', correct: false }
            ]
        },
        {
            question: "What is Adrianna's favorite food?",
            answers: [
                { text: 'Pizza', correct: false },
                { text: 'Any food one CPR away from revival', correct: true },
                { text: 'Pasta', correct: false },
                { text: 'Tacos', correct: false }
            ]
        },
        {
            question: "What is Adrianna's favorite movie?",
            answers: [
                { text: 'The Notebook', correct: true },
                { text: 'The Guilty', correct: false },
                { text: 'Harry Potter', correct: false },
                { text: 'Avengers', correct: false }
            ]
        },
        {
            question: "What are Adrianna's hobbies?",
            answers: [
                { text: 'Trying out new restaurants', correct: true },
                { text: 'Dancing & Singing', correct: false },
                { text: 'Painting & Drawing', correct: false },
                { text: 'Cooking & Baking', correct: false }
            ]
        },
        {
            question: "Where does Adrianna live?",
            answers: [
                { text: 'Los Angeles', correct: false },
                { text: 'Chicago', correct: false },
                { text: 'New York', correct: true },
                { text: 'Miami', correct: false }
            ]
        },
        {
            question: "What is Adrianna's favourite place to visit?",
            answers: [
                { text: 'Venice', correct: false },
                { text: 'Banff', correct: false },
                { text: 'Miami', correct: true },
                { text: 'Tokyo', correct: false }
            ]
        },
        {
            question: "What is Adrianna's favourite Place to be at?",
            answers: [
                { text: 'the beach', correct: false },
                { text: 'The Beach', correct: false },
                { text: 'the Beach', correct: false },
                { text: 'THE BEEAAACHHH!!!!', correct: true }
            ]
        },
    ];
    
    // Create feedback element
    const feedbackElement = document.createElement('div');
    feedbackElement.id = 'quiz-feedback';
    feedbackElement.classList.add('quiz-feedback', 'hide');
    questionContainer.appendChild(feedbackElement);
    
    // Create score display
    const scoreElement = document.createElement('div');
    scoreElement.id = 'quiz-score';
    scoreElement.classList.add('quiz-score', 'hide');
    questionContainer.appendChild(scoreElement);
    
    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    
    function startQuiz() {
        startButton.classList.add('hide');
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        score = 0;
        
        // Hide welcome message and show question container
        quizWelcome.classList.add('hide');
        questionContainer.classList.remove('hide');
        
        feedbackElement.classList.add('hide');
        scoreElement.classList.add('hide');
        setNextQuestion();
    }
    
    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }
    
    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }
    
    function resetState() {
        clearStatusClass(document.body);
        nextButton.classList.add('hide');
        feedbackElement.classList.add('hide');
        
        // Clear answer buttons
        answerButtonsElement.innerHTML = '';
    }
    
    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        
        // Update score if answer is correct
        if (correct) {
            score++;
        }
        
        // Show feedback
        showFeedback(correct);
        
        // Disable all buttons after selection
        Array.from(answerButtonsElement.children).forEach(button => {
            button.disabled = true;
            setStatusClass(button, button.dataset.correct);
        });
        
        // Highlight the selected button
        selectedButton.classList.add('selected');
        
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            // Show final score and message
            showFinalScore();
            startButton.innerText = 'Restart';
            startButton.classList.remove('hide');
        }
    }
    
    function showFeedback(correct) {
        feedbackElement.classList.remove('hide');
        feedbackElement.classList.remove('correct-feedback', 'wrong-feedback');
        
        if (correct) {
            feedbackElement.textContent = 'Correct! You know Adri well! 🎉';
            feedbackElement.classList.add('correct-feedback');
        } else {
            feedbackElement.textContent = 'Oops! That\'s not right. Learn more about Adri! 💖';
            feedbackElement.classList.add('wrong-feedback');
        }
    }
    
    function showFinalScore() {
        scoreElement.classList.remove('hide');
        const percentage = Math.round((score / shuffledQuestions.length) * 100);
        
        let message;
        if (percentage === 100) {
            message = "Perfect! You're Adri's best friend! 🌟";
        } else if (percentage >= 80) {
            message = "Amazing! You know Adri very well! 🎉";
        } else if (percentage >= 60) {
            message = "Good job! You know quite a bit about Adri! 😊";
        } else if (percentage >= 40) {
            message = "Not bad! You should spend more time with Adri! 💖";
        } else {
            message = "Time to get to know Adri better! 🤗";
        }
        
        scoreElement.innerHTML = `
            <h3>Your Score: ${score}/${shuffledQuestions.length} (${percentage}%)</h3>
            <p>${message}</p>
        `;
        
        // Update restart button text and behavior
        startButton.innerText = 'Take Quiz Again';
        startButton.addEventListener('click', function restartQuizHandler() {
            // Show welcome message again when restarting
            questionContainer.classList.add('hide');
            quizWelcome.classList.remove('hide');
            scoreElement.classList.add('hide');
            
            // Reset the start button text and make it visible
            startButton.innerText = 'Start Quiz';
            startButton.classList.remove('hide');
            
            // Remove this specific handler to prevent multiple listeners
            startButton.removeEventListener('click', restartQuizHandler);
        }, { once: true });
    }
    
    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }
    
    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
        element.classList.remove('selected');
    }
}