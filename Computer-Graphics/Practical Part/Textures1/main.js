import GUI from 'lil-gui';
import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { spherizeUV } from 'three/tsl';
import { Clock, PointsNodeMaterial } from 'three/webgpu';

const scene= new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

camera.position.z=3;

const renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader=new THREE.TextureLoader();

const texture= textureLoader.load('textures/Stylized_Stone_Floor_010_basecolor.png');

texture.wrapS=THREE.RepeatWrapping;
texture.wrapT=THREE.RepeatWrapping;
texture.repeat.set(2,2);

const material= new THREE.MeshBasicMaterial({map:texture});
const cube= new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  material
);

scene.add(cube);



function animate(){
  requestAnimationFrame(animate);
  cube.rotation.x+=0.01;
  cube.rotation.y+=0.01;
  cube.rotation.z+=0.01;
  
  renderer.render(scene,camera);
}
animate();