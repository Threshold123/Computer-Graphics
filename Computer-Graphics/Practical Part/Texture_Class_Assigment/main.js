import GUI from 'lil-gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//scene camera and the renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0d0ff); // light sky color

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(3, 3, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

//Orbit Controlling
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


// texture and the ground

const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load('textures/rocky_terrain_02_diff_1k.jpg');

groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(6, 6);

const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshStandardMaterial({
  map: groundTexture,
  color: 0x88aa66
});

const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

//Lights for realism
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(10, 20, 10);
sun.castShadow = true;
scene.add(sun);


//Cube texture
const cubeGeo = new THREE.BoxGeometry(1, 1, 1);


const cubeTexture = textureLoader.load('textures/mossy_brick_diff_1k.jpg');

const cubeMat = new THREE.MeshStandardMaterial({
  map: cubeTexture
});

const cube = new THREE.Mesh(cubeGeo, cubeMat);
cube.castShadow = true;
cube.position.y = 0.5;
scene.add(cube);

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});