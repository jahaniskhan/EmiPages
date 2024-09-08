// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Connect to the server using Socket.io
    // The empty argument means it will connect to the same host that served the page
    const socket = io();

    // Get references to the HTML elements we'll be interacting with
    const questionInput = document.getElementById('question');
    const askButton = document.getElementById('ask-button');
    const answerDisplay = document.getElementById('answer');
    const eightBall = document.querySelector('.eight-ball');
    const cardContainer = document.getElementById('card-container');

    // Add a click event listener to the ask button
    askButton.addEventListener('click', askQuestion);

    // Function to handle asking a question
    function askQuestion() {
        // Get the question from the input field and remove any leading/trailing whitespace
        const question = questionInput.value.trim();

        // Only proceed if there's actually a question
        if (question) {
            console.log('Asking:', question); // Debug log
            // Send the question to the server using Socket.io
            // 'ask_question' is the event name, and question is the data we're sending
            socket.emit('ask_question', question);

            // Clear the input field after asking
            questionInput.value = '';

            // Display a "thinking" message while waiting for the answer
            answerDisplay.textContent = 'Thinking...';
            shakeAnimation();
        }
    }

    // Listen for answers from the server
    socket.on('answer', (data) => {
        console.log('Received answer:', data); // Debug log
        // Use the typewriter effect to display the answer
        typewriterEffect(data.answer, answerDisplay);
        createCard(data.question, data.answer);
    });

    // Function to add a shake animation to the magic 8 ball
    function shakeAnimation() {
        // Add the 'shake' class to start the animation
        eightBall.classList.add('shake');

        // Remove the 'shake' class after the animation finishes (500ms)
        setTimeout(() => {
            eightBall.classList.remove('shake');
        }, 500);
    }

    // Function to create a card for a question and answer
    function createCard(question, answer) {
        // Create a new card element
        const card = document.createElement('div');
        card.classList.add('card');

        // Set the inner HTML of the card with the question and answer
        card.innerHTML = `
            <h3>Q: ${question}</h3>
            <p>A: ${answer}</p>
        `;

        // Prepend the card to the card container
        cardContainer.prepend(card);

        // Limit to 5 cards
        if (cardContainer.children.length > 5) {
            cardContainer.removeChild(cardContainer.lastChild);
        }
    }

    // Function to display text in the magic 8 ball using the typewriter effect
    function typewriterEffect(text, element) {
        // Clear the text content of the element
        element.textContent = '';

        // Initialize the index to 0
        let i = 0;

        // Create an interval to update the text content every 50ms
        const interval = setInterval(() => {
            // If the index is less than the length of the text, add the next character to the text content
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                // Clear the interval if the text has been fully displayed
                clearInterval(interval);
            }
        }, 50);
    }

    // Easter egg: Konami code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    // Add a keydown event listener to the document
    document.addEventListener('keydown', (e) => {
        // If the key pressed matches the next code in the Konami code sequence, increment the index
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            // If the index matches the length of the Konami code, activate the Easter egg
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            // Reset the index if a non-matching key is pressed
            konamiIndex = 0;
        }
    });

    // Function to activate the Easter egg
    function activateEasterEgg() {
        // Change the background color of the body to a bright pink
        document.body.style.backgroundColor = '#ff00ff';

        // Display an alert with a message
        alert('You found the secret! The Magic 8 Ball is filled with determination!');

        // Add more Easter egg effects here
    }
});
