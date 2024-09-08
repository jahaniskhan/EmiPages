document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const cardFront = document.querySelector('.card-front p');
    const cardBack = document.querySelector('.card-back p');
    const reasonNumber = document.querySelector('.reason-number');

    const reasons = [
        "You have the biggest dumpy in the world",
        "You have an intense charm that cats a spell on anyone",
        "you are the best at NYT games, any game really",
        "I'll never beat you at connect 4",
        "you physically JUMP your papers and homework",
        "You're such a sports nerd",
        "You have such a big dick",
        "You give the best hugs, and therapy sessions",
        "Amazing organizer, chaotic cleanliness",
        "You always look good to a fault",
        "You always know what to say",
        "You're a great friend",
       "Youre A GODLY BAKER",
       "MUSCLE MOTHER",
       "THOSE HONEY EYES <3",
       "You're such a good gift-giver",
       "that waist",
       "the best big spoon",
       "an amazing duaghter",
       "an amazing sister",
       "the only shoulder I want to cry on",
       "an imagintion that no one can compete with",
       "You engage with my silly bits",
       "after four months of knowing you, you're the only one who makes me snort laugh",
       "GAY!!!", 
       "such a good kisser",
       "the only person who can make me feel like this",
       "You hurt my feelings the most, and I love you for it",
       "Thank you for telling me off",
       "I love your voice",
       "I love your voice in my ear",
       "Those big arms",
       "the most superior music taste",
       "good at everything",
       "my source of joy and motivation",
       "Matching my freak",
       "Your soft hair",
       "Your soft hands",
       "you make eveything an adventure",
       "when you come around, everything else disappears",
       "the best dance partner",
       "you saved my life",
       "you're so sweet with your words",
       "I'm blown away by your intelligence and physicality",
       "I love how passionate you are about your work, your art, AND your sport",
       "You made long distance so easy",
       "You made me feel like a priority",
       "You can eaisly empathize with others",
       "You're able to be tender with me",
       "That smile in the morning",
       "it will always be that RAHHHH face that makes me blush",
       "you're emi"
    
       
        // Add the rest of your reasons here, up to 52
    ];

    let currentIndex = -1;

    function getNextReason() {
        currentIndex = (currentIndex + 1) % reasons.length;
        return reasons[currentIndex];
    }

    function updateCard() {
        let newReason = getNextReason();
        cardBack.textContent = newReason;
        reasonNumber.textContent = `${currentIndex + 1}/${reasons.length}`;
        card.style.transform = 'rotateY(0deg)';
        card.style.left = '0px';
    }

    let hammer = new Hammer(card);
    let isDragging = false;
    let startX, startY;

    hammer.on('panstart', function(ev) {
        isDragging = true;
        startX = ev.center.x;
        startY = ev.center.y;
        card.style.transition = 'none';
    });

    hammer.on('panmove', function(ev) {
        if (isDragging) {
            let deltaX = ev.center.x - startX;
            let deltaY = ev.center.y - startY;
            let rotation = deltaX * 0.1;
            card.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;
        }
    });

    hammer.on('panend', function(ev) {
        isDragging = false;
        card.style.transition = 'transform 0.5s, left 0.3s';
        if (Math.abs(ev.deltaX) > 100) {
            card.style.transform = `translate(${ev.deltaX > 0 ? '1000px' : '-1000px'}, ${ev.deltaY}px) rotate(${ev.deltaX * 0.1}deg)`;
            setTimeout(updateCard, 300);
        } else {
            card.style.transform = 'translate(0, 0) rotate(0deg)';
        }
    });

    card.addEventListener('click', function() {
        card.style.transform = card.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
    });

    // Initial card setup
    updateCard();
});
