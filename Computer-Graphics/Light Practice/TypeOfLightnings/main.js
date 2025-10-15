import GUI from 'lil-gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

const gui=new GUI()

const scene=new THREE.Scene()
RectAreaLightUniformsLib.init();

const material= new THREE.MeshStandardMaterial()

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5,32,32),material
)
sphere.position.x=-1.5

const cube=new THREE.Mesh(
  new THREE.BoxGeometry(0.75,0.75,0.75),material
)
const torus=new THREE.Mesh(
  new THREE.TorusGeometry(0.3,0.2,32,64),material
)
torus.position.x=1.5

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  new THREE.MeshStandardMaterial({ color: 0x2a2a2e, roughness: 0.9, metalness: 0 })
);

plane.rotation.x=-Math.PI*0.5
plane.position.y=-0.65

scene.add(sphere, cube, torus, plane);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight)
gui.add(ambientLight,'intensity').min(0).max(3).step(0.001)

const directionalLight = new THREE.DirectionalLight(0x00fffc, 1.2);
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)

const directionalLightHelper=new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1.2);
scene.add(hemisphereLight)

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.3);
scene.add(hemisphereLightHelper)

const pointLight = new THREE.PointLight(0xff9000, 2, 0.2);
pointLight.position.set(1,-0.5,1)
scene.add(pointLight)

const pointLightHelper=new THREE.PointLightHelper(pointLight)
scene.add(pointLightHelper)

const rectAreaLight = new THREE.RectAreaLight(0x4effff, 8, 1, 1);
rectAreaLight.position.set(-1.5,0,1.5)
scene.add(rectAreaLight)

const rectAreaLightHelper=new RectAreaLightHelper(rectAreaLight,0.3)
scene.add(rectAreaLightHelper)

const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 10, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0, 2, 3);
spotLight.target.position.set(-0.75, 0, 0);
scene.add(spotLight);
scene.add(spotLight.target);

const SpotLightHelper = new THREE.SpotLightHelper(spotLight, 0.4);
scene.add(SpotLightHelper);
SpotLightHelper.update();

const sizes={
  width: window.innerWidth,
  height:window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera=new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
camera.position.set(1,1,4)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// enable shadows on objects/lights
sphere.castShadow = true;
cube.castShadow = true;
torus.castShadow = true;
plane.receiveShadow = true;

directionalLight.castShadow = true;
spotLight.castShadow = true;
pointLight.castShadow = true;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();