
import * as THREE from 'three';

// === Basic Three.js setup ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 10, 25);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

// === Create cubes ===
const cubes = [];
const cubeCount = 20;

for (let i = 0; i < cubeCount; i++) {
  const width = Math.random() * 2 + 0.5;
  const height = Math.random() * 2 + 0.5;
  const depth = Math.random() * 2 + 0.5;

  const geometry = new THREE.BoxGeometry(width, height, depth);
  const color = new THREE.Color(Math.random(), Math.random(), Math.random());
  const material = new THREE.MeshStandardMaterial({ color });

  const cube = new THREE.Mesh(geometry, material);

  cube.position.x = (Math.random() - 0.5) * 30;
  cube.position.y = Math.random() * 10;
  cube.position.z = (Math.random() - 0.5) * 30;

  cube.userData.size = { width, height, depth };

  scene.add(cube);
  cubes.push(cube);
}

// Raycaster + UI
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const infoPanel = document.getElementById("infoPanel");

let selectedCube = null;
let originalColor = null;

function showCubeInfo(cube) {
  const p = cube.position;
  const s = cube.userData.size;

  infoPanel.innerHTML =
    "<strong>Cube selected</strong><br>" +
    "Position:<br>" +
    "x: " + p.x.toFixed(2) + "<br>" +
    "y: " + p.y.toFixed(2) + "<br>" +
    "z: " + p.z.toFixed(2) + "<br><br>" +
    "Size:<br>" +
    "width: " + s.width.toFixed(2) + "<br>" +
    "height: " + s.height.toFixed(2) + "<br>" +
    "depth: " + s.depth.toFixed(2);
}

function showNoSelection() {
  infoPanel.innerHTML =
    "<strong>No object selected</strong><br>" +
    "Click a cube to see its information here.";
}

window.addEventListener("click", onClick);

function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(cubes);

  if (intersects.length > 0) {
    const hit = intersects[0].object;

    if (selectedCube) {
      selectedCube.material.color.copy(originalColor);
    }

    selectedCube = hit;
    originalColor = hit.material.color.clone();
    hit.material.color.set(0xffffff);

    showCubeInfo(hit);
  } else {
    if (selectedCube) {
      selectedCube.material.color.copy(originalColor);
      selectedCube = null;
      originalColor = null;
    }
    showNoSelection();
  }
}

window.addEventListener("resize", onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  cubes.forEach((cube) => {
    cube.rotation.y += 0.005;
    cube.rotation.x += 0.002;
  });

  renderer.render(scene, camera);
}

animate();