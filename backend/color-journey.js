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
    },
    {
        filter: 'none',
        text: "Our journey through colors culminates in this cosmic representation. Each dot in this galactic spiral represents a unique hue in our shared story, with Emi at the vibrant center, the heart of our colorful universe.",
        caption: "The Galaxy of Our Colors",
        isGalaxy: true
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
    const polaroid = document.querySelector('.polaroid');
    if (scenes[currentScene].isGalaxy) {
        initGalaxy();
    } else {
        polaroid.innerHTML = `
            <div class="polaroid-inner">
                <img src="IMG_3638.jpg" alt="Couple selfie" class="polaroid-image" id="storyImage">
            </div>
            <p class="image-caption" id="imageCaption">${scenes[currentScene].caption}</p>
        `;
        const image = document.getElementById('storyImage');
        image.style.filter = scenes[currentScene].filter;
    }
    
    document.getElementById('imageCaption').textContent = scenes[currentScene].caption;
    document.getElementById('storyText').innerHTML = scenes[currentScene].text;
    
    document.getElementById('prevButton').disabled = currentScene === 0;
    document.getElementById('nextButton').disabled = currentScene === scenes.length - 1;
    
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

function initGalaxy() {
    const polaroid = document.querySelector('.polaroid');
    if (!polaroid) {
        console.error('Polaroid container not found');
        return;
    }

    // Clear existing content and set up the galaxy canvas
    polaroid.innerHTML = `
        <div class="polaroid-inner">
            <canvas id="galaxyCanvas"></canvas>
            
        </div>
        <p class="image-caption" id="imageCaption">${scenes[currentScene].caption}</p>
    `;

    const galaxyCanvas = document.getElementById('galaxyCanvas');
    const ctx = galaxyCanvas.getContext('2d');

    // Set canvas size to match polaroid dimensions
    const size = Math.min(polaroid.clientWidth - 20, polaroid.clientHeight - 40); // Reduced padding
    galaxyCanvas.width = size;
    galaxyCanvas.height = size;

    const stars = [];
    const dust = [];
    const nebulas = [];
    const backgroundStars = [];
    let rotationX = 0;
    let rotationY = 0;
    let lastX, lastY;
    let isUserInteracting = false;
    let lastInteractionTime = 0;

    function createSpiralGalaxy() {
        stars.length = 0;
        dust.length = 0;
        nebulas.length = 0;
        backgroundStars.length = 0;

        const centerX = 0;
        const centerY = 0;
        const armCount = 4;
        const armAngle = (2 * Math.PI) / armCount;

        // Central bulge (golden)
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
                    color: `hsla(${Math.random() * 60 + 300}, 100%, 50%, 0.3)`
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
        for (let i = 0; i < 500; i++) {  // Decreased from 1000 to 500
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

    function rotatePoint(x, y, z) {
        let newX = x * Math.cos(rotationY) + z * Math.sin(rotationY);
        let newZ = -x * Math.sin(rotationY) + z * Math.cos(rotationY);
        let newY = y * Math.cos(rotationX) - newZ * Math.sin(rotationX);
        newZ = y * Math.sin(rotationX) + newZ * Math.cos(rotationX);
        return { x: newX, y: newY, z: newZ };
    }

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
                } else if (obj.radius > 1) {  // Nebulas
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

        // Draw arrow and text
        ctx.save();
        ctx.translate(galaxyCanvas.width / 2, galaxyCanvas.height / 2);
        ctx.scale(scale, scale);
        
        ctx.font = '16px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -20);
        ctx.strokeStyle = 'red'; // Changed arrow color to red
        ctx.stroke();
        
        ctx.restore();

        ctx.restore();
    }

    function animate() {
        resizeCanvas(); // Call resizeCanvas before drawing the galaxy
        drawGalaxy();
        
        const currentTime = Date.now();
        if (!isUserInteracting && currentTime - lastInteractionTime > 1000) {
            rotationY += 0.02; // Increased from 0.01 to 0.02 for faster rotation
            rotationX = Math.sin(rotationY * 0.5) * 0.2;
        }
        
        requestAnimationFrame(animate);
    }

    function resizeCanvas() {
        const polaroidWidth = polaroid.clientWidth;
        const polaroidHeight = polaroid.clientWidth; // Set the height equal to the width for a square aspect ratio
        const padding = 20; // Adjust the padding as needed

        galaxyCanvas.width = polaroidWidth - padding;
        galaxyCanvas.height = polaroidHeight - padding;
    }

    createSpiralGalaxy();
    animate();

    // Event handlers for rotation
    galaxyCanvas.addEventListener('mousedown', handleStart);
    galaxyCanvas.addEventListener('mousemove', handleMove);
    galaxyCanvas.addEventListener('mouseup', handleEnd);
    galaxyCanvas.addEventListener('touchstart', handleStart);
    galaxyCanvas.addEventListener('touchmove', handleMove);
    galaxyCanvas.addEventListener('touchend', handleEnd);

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

    // Update the text
    text.innerHTML = scenes[currentScene].text;

    // Add an event listener to handle window resize
    window.addEventListener('resize', resizeCanvas);
}

updateScene();

// Make these functions global so they can be called from the galaxy.html
window.prevScene = prevScene;
window.nextScene = nextScene;