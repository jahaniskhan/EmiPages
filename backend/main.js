let currentScene = 0;
const image = document.getElementById('storyImage');
const text = document.getElementById('storyText');
const caption = document.getElementById('imageCaption');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const indicator = document.getElementById('sceneIndicator');
const galaxyContainer = document.getElementById('galaxy-container');

let galaxyCreated = false;

function updateScene() {
    if (scenes[currentScene].is3D) {
        image.style.display = 'none';
        galaxyContainer.style.display = 'block';
        if (!galaxyCreated) {
            create3DGalaxy();
            galaxyCreated = true;
        }
    } else {
        image.style.display = 'block';
        galaxyContainer.style.display = 'none';
        image.style.filter = scenes[currentScene].filter;
    }
    
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

document.addEventListener('DOMContentLoaded', () => {
    nextButton.addEventListener('click', nextScene);
    prevButton.addEventListener('click', prevScene);
    updateScene();
});
