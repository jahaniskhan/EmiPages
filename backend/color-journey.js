const scenes = [
    { 
        filter: 'grayscale(100%)', 
        text: "Every moment with you breaks the linear conception of time. When I think of you and our time spend together, it shudders my essence how a ripple disrupts a still body of water. I remember things being bleak before Emi, in black and white. I'm not saying there wouldn't be laughs and and temporary rushes, it just felt incomplete. When we started talking over *yuck* hinge, it felt like my black and white world view was overcast with a green filter",
        caption: "5/11/24 - Our Bubble"
    },
    { 
        filter: 'grayscale(100%) sepia(100%) hue-rotate(50deg)', 
        text: "Specifically, when I listened to your diverse monologue. It ranged from literature, gender, and politics. I stammered all over my words; I knew that my perception of reality was deeply flawed. I couldn't bear to look into your eyes for longer than a couple of seconds, those beautiful dinner plates stared into the deep trenches of my soul. I felt that in between every giggle, I was testifying under a cosmic entity.",
        caption: "5/11/24 - Our Bubble"
    },
    {
        filter: 'grayscale(100%) sepia(100%) hue-rotate(180deg)', 
        text: "Not to sound like a terrible Halsey song you'd hear in a 'Raley's', but I felt like I made something more sinister than a friend. I've never been so stimulated exchanging thoughts in conversation. Thinking about you feels like voices are shrieking in my head. I've been so used to an empty storage room for a brain. I wanted to be in a room with you, even if it was just to stare at the walls. There was this inexplicable urge to tell you how much I admire you.",
        caption: "5/11/24 - Our Bubble"
    },
    { 
        filter: 'none', 
        text: "Astronomers use visible light to observe distant galaxies, but you're the center of my visible universe. Even if you're light-years away, you've manifested a deeply profound impact on my daily existence. You've provided so much purpose to my short, hedonistic life.",
        caption: "5/11/24 - Our Bubble"
    },
    {
        filter: 'none',
        text: "Although I've dealt with awful trials, I feel that I can never be so close to such a beautiful celestial body. A bubble with you could never be sustainable as I rip myself apart from the inside and burn from contact. It's so lovely being your partner in crime, and engaging in our yap sessions, but I'm terrified of your sheer magnitude when I look at you.",
        caption: "Emi Nogen Photographed.",
        isGalaxy: true
    }
];

let currentScene = 0;

// Galaxy Animation Variables
let galaxyCanvas, ctx;
let stars = [], dust = [], nebulas = [], backgroundStars = [];
let rotationX = 0, rotationY = 0;
let lastX, lastY;
let isUserInteracting = false;
let lastInteractionTime = 0;

// Initialize and update scenes
function updateScene() {
    const polaroid = document.querySelector('.polaroid');
    const textElement = document.getElementById('storyText');
    const captionElement = document.getElementById('imageCaption');

    if (scenes[currentScene].isGalaxy) {
        initGalaxy();
    } else {
        // Set up the polaroid with the image and apply the filter
        polaroid.innerHTML = `
            <div class="polaroid-inner">
                <img src="IMG_3638.jpg" alt="Couple selfie" class="polaroid-image" id="storyImage">
                <div id="emiLabel">This is Emi</div>
                <div id="emiArrow"></div>
            </div>
            <p class="image-caption" id="imageCaption">${scenes[currentScene].caption}</p>
        `;
        const image = document.getElementById('storyImage');
        image.style.filter = scenes[currentScene].filter;

        // Position Emi label and arrow
        positionEmiElements();
    }

    if (!scenes[currentScene].isGalaxy) {
        // Update the caption if it's not the galaxy scene
        captionElement.textContent = scenes[currentScene].caption;
    }

    // Update the story text with fade-in effect
    textElement.style.opacity = 0;
    setTimeout(() => {
        textElement.innerHTML = scenes[currentScene].text;
        textElement.style.opacity = 1;
    }, 500);

    // Update button states
    document.getElementById('prevButton').disabled = currentScene === 0;
    document.getElementById('nextButton').disabled = currentScene === scenes.length - 1;

    // Update scene indicators
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
    const indicator = document.getElementById('sceneIndicator');
    indicator.innerHTML = '';
    for (let i = 0; i < scenes.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'scene-dot' + (i === currentScene ? ' active' : '');
        indicator.appendChild(dot);
    }
}

// Position Emi Label and Arrow
function positionEmiElements() {
    const emiLabel = document.getElementById('emiLabel');
    const emiArrow = document.getElementById('emiArrow');
    const polaroidInner = document.querySelector('.polaroid-inner');
    const image = document.getElementById('storyImage');

    if (emiLabel && emiArrow && image) {
        // Ensure the image has loaded to get correct dimensions
        if (image.complete) {
            setEmiPosition();
        } else {
            image.onload = setEmiPosition;
        }
    }

    function setEmiPosition() {
        const polaroidRect = polaroidInner.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();

        // Position Emi label at the bottom center of the image
        emiLabel.style.left = `${(image.width / 2) - (emiLabel.offsetWidth / 2)}px`;
        emiLabel.style.top = `${image.height + 10}px`;

        // Position Emi arrow below the label
        emiArrow.style.left = `${(image.width / 2) - 5}px`; // Centered horizontally
        emiArrow.style.top = `${image.height + 30}px`; // Positioned below the label
    }
}

// Initialize Galaxy Animation
function initGalaxy() {
    const polaroid = document.querySelector('.polaroid');
    if (!polaroid) {
        console.error('Polaroid container not found');
        return;
    }

    // Clear existing content and set up the galaxy canvas
    polaroid.innerHTML = `
        <div class="polaroid-inner" style="background-color: black; position: relative; overflow: hidden;">
            <canvas id="galaxyCanvas"></canvas>
            <div id="emiLabel">This is Emi</div>
            <div id="emiArrow"></div>
        </div>
        <p class="image-caption" id="imageCaption">${scenes[currentScene].caption}</p>
    `;

    galaxyCanvas = document.getElementById('galaxyCanvas');
    ctx = galaxyCanvas.getContext('2d');

    // Set canvas size to match polaroid dimensions
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    createSpiralGalaxy();
    animate();

    // Event handlers for rotation
    galaxyCanvas.addEventListener('mousedown', handleStart);
    galaxyCanvas.addEventListener('mousemove', handleMove);
    galaxyCanvas.addEventListener('mouseup', handleEnd);
    galaxyCanvas.addEventListener('touchstart', handleStart);
    galaxyCanvas.addEventListener('touchmove', handleMove);
    galaxyCanvas.addEventListener('touchend', handleEnd);
}

// Create Spiral Galaxy
function createSpiralGalaxy() {
    stars = [];
    dust = [];
    nebulas = [];
    backgroundStars = [];

    const centerX = 0;
    const centerY = 0;
    const armCount = 4;
    const armAngle = (2 * Math.PI) / armCount;

    // Central bulge
    for (let i = 0; i < 3000; i++) {
        const r = Math.random() * 60;
        const angle = Math.random() * 2 * Math.PI;
        const z = (Math.random() - 0.5) * 30;
        stars.push({
            x: centerX + r * Math.cos(angle),
            y: centerY + r * Math.sin(angle),
            z: z,
            radius: Math.random() * 1.5 + 0.5,
            color: `hsl(45, 100%, ${50 + Math.random() * 50}%)`,
            type: 'bulge'
        });
    }

    // Spiral arms
    for (let i = 0; i < 12000; i++) {
        const r = 60 + Math.random() * 220;
        const armOffset = Math.random() * armAngle * 0.5;
        const spiralAngle = (r / 20) + armOffset;
        const arm = Math.floor(Math.random() * armCount);
        const angle = arm * armAngle + spiralAngle;
        const z = (Math.random() - 0.5) * 50;

        if (Math.random() < 0.95) {  // Stars
            stars.push({
                x: centerX + r * Math.cos(angle),
                y: centerY + r * Math.sin(angle),
                z: z,
                radius: Math.random() * 1.5 + 0.5,
                color: `hsl(${200 + Math.random() * 160}, 100%, 80%)`,
                type: 'arm'
            });
        } else {  // Nebulas
            nebulas.push({
                x: centerX + r * Math.cos(angle),
                y: centerY + r * Math.sin(angle),
                z: z,
                radius: 5 + Math.random() * 20,
                color: `hsla(${Math.random() * 60 + 300}, 100%, 50%, 0.3)`,
                type: 'nebulas'
            });
        }
    }

    // Dust and gas
    for (let i = 0; i < 8000; i++) {
        const r = 60 + Math.random() * 220;
        const armOffset = Math.random() * armAngle * 0.5;
        const spiralAngle = (r / 20) + armOffset;
        const arm = Math.floor(Math.random() * armCount);
        const angle = arm * armAngle + spiralAngle;
        const z = (Math.random() - 0.5) * 50;

        dust.push({
            x: centerX + r * Math.cos(angle),
            y: centerY + r * Math.sin(angle),
            z: z,
            radius: Math.random() * 1.5,
            color: `hsla(${Math.random() * 60}, 50%, 50%, 0.1)`
        });
    }

    // Background stars
    for (let i = 0; i < 500; i++) {  // Decreased from 1000 to 500 for performance
        backgroundStars.push({
            x: Math.random() * galaxyCanvas.width,
            y: Math.random() * galaxyCanvas.height,
            speed: Math.random() * 0.3 + 0.1,  // Decreased speed
            radius: Math.random() * 0.8 + 0.3,  // Decreased size
            color: `hsl(${Math.random() * 360}, 100%, 80%)`,
            alpha: Math.random()
        });
    }
}

// Rotate Point in 3D Space
function rotatePoint(x, y, z) {
    let newX = x * Math.cos(rotationY) + z * Math.sin(rotationY);
    let newZ = -x * Math.sin(rotationY) + z * Math.cos(rotationY);
    let newY = y * Math.cos(rotationX) - newZ * Math.sin(rotationX);
    newZ = y * Math.sin(rotationX) + newZ * Math.cos(rotationX);
    return { x: newX, y: newY, z: newZ };
}

// Draw Galaxy on Canvas
function drawGalaxy() {
    ctx.fillStyle = 'black'; // Fill the entire canvas with black
    ctx.fillRect(0, 0, galaxyCanvas.width, galaxyCanvas.height);

    // Draw background stars
    backgroundStars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        star.y += star.speed;
        if (star.y > galaxyCanvas.height) star.y = 0;

        star.alpha += Math.random() * 0.1 - 0.05;
        star.alpha = Math.max(0, Math.min(1, star.alpha));
    });

    ctx.save();
    ctx.translate(galaxyCanvas.width / 2, galaxyCanvas.height / 2);

    // Adjust scale to zoom in further
    const scale = (galaxyCanvas.width / 800) * 1.5; // Increased zoom from 1.2 to 1.5
    ctx.scale(scale, scale);

    const allObjects = [...dust, ...nebulas, ...stars].sort((a, b) => b.z - a.z);

    allObjects.forEach(obj => {
        const rotated = rotatePoint(obj.x, obj.y, obj.z);
        const objScale = 300 / (300 - rotated.z);
        const x = rotated.x * objScale;
        const y = rotated.y * objScale;

        // Only draw if within the canvas bounds
        if (Math.abs(x) <= galaxyCanvas.width / (2 * scale) && Math.abs(y) <= galaxyCanvas.height / (2 * scale)) {
            ctx.beginPath();
            ctx.arc(x, y, Math.max(0.1, obj.radius * objScale), 0, Math.PI * 2);

            if (obj.type === 'bulge' || obj.type === 'arm') {
                ctx.fillStyle = obj.color;
                ctx.fill();
            } else if (obj.type === 'nebulas' && obj.radius > 1) {  // Correctly checking for nebulas
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, obj.radius * objScale);
                gradient.addColorStop(0, obj.color);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fill();
            } else {  // Dust
                ctx.fillStyle = obj.color;
                ctx.fill();
            }
        }
    });

    ctx.restore();

    // Draw Emi label and arrow if centerVisible is true
    if (centerVisible) {
        const emiLabel = document.getElementById('emiLabel');
        const emiArrow = document.getElementById('emiArrow');

        const labelX = galaxyCanvas.width / 2 - emiLabel.offsetWidth / 2;
        const labelY = galaxyCanvas.height / 2 - 30;

        emiLabel.style.left = `${labelX}px`;
        emiLabel.style.top = `${labelY}px`;

        emiArrow.style.left = `${galaxyCanvas.width / 2 - 5}px`;
        emiArrow.style.top = `${galaxyCanvas.height / 2 - 10}px`;
    }
}

// Animation Loop
function animate() {
    // Uncomment the following line to debug the animation loop
    // console.log('Animating...');
    drawGalaxy();

    const currentTime = Date.now();
    if (!isUserInteracting && currentTime - lastInteractionTime > 1000) {
        rotationY += 0.02; // Increased rotation speed
        rotationX = Math.sin(rotationY * 0.5) * 0.2;
    }

    requestAnimationFrame(animate);
}

// Resize Canvas to Fit Polaroid
function resizeCanvas() {
    if (!galaxyCanvas) return;
    const polaroid = document.querySelector('.polaroid-inner');
    if (!polaroid) return;

    const polaroidWidth = polaroid.clientWidth;
    const padding = 20; // Adjust the padding as needed

    galaxyCanvas.width = polaroidWidth - padding;
    galaxyCanvas.height = polaroidWidth - padding; // Maintain square aspect ratio

    // Recreate galaxy after resize to adjust star positions
    createSpiralGalaxy();
}

// Event Handlers for User Interaction
function handleStart(e) {
    e.preventDefault();
    isUserInteracting = true;
    lastX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    lastY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
}

function handleMove(e) {
    if (!isUserInteracting) return;
    e.preventDefault();
    let currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    let currentY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    let dx = currentX - lastX;
    let dy = currentY - lastY;
    rotationY += dx * 0.03;  // Increased sensitivity for more fluid movement
    rotationX += dy * 0.03;  // Increased sensitivity for more fluid movement
    lastX = currentX;
    lastY = currentY;
    lastInteractionTime = Date.now();
}

function handleEnd() {
    isUserInteracting = false;
}

// Define visibility and positioning variables
let centerVisible = true;

// Make these functions global so they can be called from color-journey.html
window.prevScene = prevScene;
window.nextScene = nextScene;

// Initialize the first scene
document.addEventListener('DOMContentLoaded', () => {
    updateScene();
});