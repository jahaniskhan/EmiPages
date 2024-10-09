// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
// import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById('galaxy-container').appendChild(renderer.domElement);

// const controls = new THREE.OrbitControls(camera, renderer.domElement);

// // Create the galaxy
// const galaxyGeometry = new THREE.BufferGeometry();
// const positions = new Float32Array(10000 * 3); // Pre-allocate memory for positions
// const colors = new Float32Array(10000 * 3); // Pre-allocate memory for colors

// for (let i = 0; i < 10000; i++) {
//     const theta = THREE.MathUtils.randFloatSpread(360);
//     const phi = THREE.MathUtils.randFloatSpread(360);

//     const x = Math.sin(theta) * Math.cos(phi);
//     const y = Math.sin(theta) * Math.sin(phi);
//     const z = Math.cos(theta);

//     positions[i * 3] = x;
//     positions[i * 3 + 1] = y;
//     positions[i * 3 + 2] = z;

//     const color = new THREE.Color();
//     color.setHSL(Math.random(), 0.7, 0.5);
//     colors[i * 3] = color.r;
//     colors[i * 3 + 1] = color.g;
//     colors[i * 3 + 2] = color.b;
// }

// galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
// galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// const galaxyMaterial = new THREE.PointsMaterial({
//     size: 0.02,
//     vertexColors: true
// });

// const galaxyPoints = new THREE.Points(galaxyGeometry, galaxyMaterial);
// scene.add(galaxyPoints);

// // Create the partner sphere
// const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
// const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const partnerSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// scene.add(partnerSphere);

// // Add a point light for better illumination
// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(5, 5, 5);
// scene.add(pointLight);

// // Handle window resize
// window.addEventListener('resize', onWindowResize, false);

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

// // Animation loop
// function animate() {
//     requestAnimationFrame(animate);
//     controls.update();
//     renderer.render(scene, camera);
// }

// init();