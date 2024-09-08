const socket = io();

console.log('Script is running');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');

    const askButton = document.getElementById('ask-button');
    const questionInput = document.getElementById('question');
    const answerDisplay = document.getElementById('answer');

    const answers = [
        "It is certain", "It is decidedly so", "Without a doubt", "Yes definitely",
        "You may rely on it", "As I see it, yes", "Most likely", "Outlook good",
        "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later",
        "Better not tell you now", "Cannot predict now", "Concentrate and ask again",
        "Don't count on it", "My reply is no", "My sources say no",
        "Outlook not so good", "Very doubtful"
    ];

    if (askButton) {
        console.log('Ask button found');
        askButton.addEventListener('click', () => {
            console.log('Button clicked');
            const question = questionInput.value;
            if (question.trim() !== '') {
                console.log('Emitting question:', question);
                socket.emit('ask_question', question);
                answerDisplay.textContent = 'Thinking...';
                questionInput.value = '';
            }
        });
    } else {
        console.log('Ask button not found');
    }

    socket.on('answer', ({ question, answer }) => {
        console.log('Received answer:', answer);
        answerDisplay.textContent = answer;
        
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>Q: ${question}</h3>
            <p>A: ${answer}</p>
        `;
        document.getElementById('card-container').prepend(card);
    });
});
