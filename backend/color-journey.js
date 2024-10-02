const scenes = [
    { 
        filter: 'grayscale(100%)', 
        text: "In the beginning, the world was a canvas of black and white, shadows and light intertwining in a delicate dance. Our story starts here, in this monochrome moment frozen in time.",
        caption: "10/2/24 - First snapshot"
    },
    { 
        filter: 'grayscale(100%) sepia(100%) hue-rotate(50deg)', 
        text: "As if by magic, a hint of green begins to seep into our world. It's subtle at first, like the first tender shoots of spring emerging from winter's grasp, bringing with it the promise of new beginnings.",
        caption: "10/2/24 - Green tones emerging"
    },
    { 
        filter: 'grayscale(100%) sepia(100%) hue-rotate(180deg)', 
        text: "The green fades, giving way to soothing shades of blue. It washes over the scene like a gentle wave, bringing with it a sense of calm and depth. In this azure world, new perspectives emerge.",
        caption: "10/2/24 - Blueshifted reality"
    },
    { 
        filter: 'none', 
        text: "Finally, the full spectrum of colors bursts forth, revealing the warmth and vibrancy of the moment in its true glory. Every hue tells a story, every shade a memory, as our journey through the spectrum comes full circle.",
        caption: "10/2/24 - Full color revealed!"
    }
];

let currentScene = 0;
const image = document.getElementById('storyImage');
const text = document.getElementById('storyText');
const caption = document.getElementById('imageCaption');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const indicator = document.getElementById('sceneIndicator');

function updateScene() {
    image.style.filter = scenes[currentScene].filter;
    caption.textContent = scenes[currentScene].caption;
    text.style.opacity = 0;
    setTimeout(() => {
        text.innerHTML = scenes[currentScene].text;
        text.style.opacity = 1;
    }, 500);
    prevButton.disabled = currentScene === 0;
    nextButton.disabled = currentScene === scenes.length - 1;
    updateSceneIndicator();
}

function nextScene() {
    if (currentScene < scenes.length - 1) {
        currentScene++;
        updateScene();
    }
}

function prevScene() {
    if (currentScene > 0) {
        currentScene--;
        updateScene();
    }
}

function updateSceneIndicator() {
    indicator.innerHTML = '';
    for (let i = 0; i < scenes.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'scene-dot' + (i === currentScene ? ' active' : '');
        indicator.appendChild(dot);
    }
}

updateScene();

// Add gallery functionality here if needed
