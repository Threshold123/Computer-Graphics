// main.js
import * as THREE from 'three';

//Setting up the camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Black background for a better view of the lights

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 7);

// I create the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(800, 600); // I keep it fixed so it looks like our class demos
document.body.appendChild(renderer.domElement);

// Creating a ambient 
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

//Creating a DirectionalLight
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
directionalLight.position.set(4, 5, 3);
scene.add(directionalLight);

//Its just going to show a line where the light hits
const lighthelper=new THREE.DirectionalLightHelper(directionalLight);
scene.add(lighthelper)

// I created a floor plane
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: 0x2a2a2e, roughness: 0.9 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.5;
floor.receiveShadow = true;
scene.add(floor);

//Creating a new Box , defining its position,materila,color,roughtness etc
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1.2, 1.2, 1.2),
  new THREE.MeshStandardMaterial({ color: 0xff6b6b, metalness: 0.1, roughness: 0.5 })
);
cube.position.set(-2, -0.9, 0);
scene.add(cube);

//Creating a new Sphere , defining its position,materila,color,roughtness etc

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.8, 16, 16),
  new THREE.MeshStandardMaterial({ color: 0x54e6a6, metalness: 0.2, roughness: 0.35 })
);
sphere.position.set(0, -0.7, 0);
scene.add(sphere);


//Creating a new Cone , defining its position,materila,color,roughtness etc
const cone = new THREE.Mesh(
  new THREE.ConeGeometry(0.8, 1.6, 16),
  new THREE.MeshStandardMaterial({ color: 0x6fa8ff, metalness: 0.15, roughness: 0.45 })
);
cone.position.set(2, -0.7, 0);
scene.add(cone);

//Showing an axes helper to see how the objects are positioned
const axes = new THREE.AxesHelper(4);
scene.add(axes);


//Rendering everything
renderer.render(scene, camera);

animate();