import GUI from 'lil-gui';
import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { spherizeUV } from 'three/tsl';
import { Clock, PointsNodeMaterial } from 'three/webgpu';

const gui = new GUI()

const scene=new THREE.Scene()


const ambientLight=new THREE.AmbientLight(0xffffff,0.8)
gui.add(ambientLight,'intensity').min(0).max(3).step(0.001)

scene.add(ambientLight)

const directionalLight=new THREE.DirectionalLight(0xffffff,1.3)
directionalLight.castShadow=true
directionalLight.position.set(2,2,-1)

gui.add(directionalLight,'intensity').min(0).max(3).step(0.001)
scene.add(directionalLight)

const spotLight=new THREE.SpotLight(0xffffff,2,10,Math.PI*0.3)
spotLight.castShadow=true
spotLight.position.set(0,2,2)
scene.add(spotLight)
scene.add(spotLight.target)

const pointLight=new THREE.PointLight(0xffffff,2)
pointLight.castShadow=true
pointLight.position.set(-1,1,0)
scene.add(pointLight)

const material=new THREE.MeshStandardMaterial({roughness:0.8})
gui.add(material,'metalness').min(0).max(3).step(0.001)
gui.add(material,'roughness').min(0).max(3).step(0.001)

const sphere=new THREE.Mesh(
  new THREE.SphereGeometry(0.5,32,32),
  material
)
sphere.castShadow=true

const plane=new THREE.Mesh(
  new THREE.PlaneGeometry(5,5),
  material
)
plane.receiveShadow=true
plane.rotation.x=-Math.PI*0.5
plane.position.y=-0.5
scene.add(sphere,plane)

const sizes={
  width:window.innerWidth,
  height:window.innerHeight
}
const camera=new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
camera.position.set(1,1,5)
scene.add(camera)

const renderer=new THREE.WebGLRenderer({antialias:true})
renderer.shadowMap.enabled=true
renderer.setSize(sizes.width,sizes.height)
document.body.appendChild(renderer.domElement)

const controls=new OrbitControls(camera,renderer.domElement)
controls.enableDamping=true

const clock=new THREE.Clock()

function tick(){
  const elapsedTIme=clock.getElapsedTime()

  sphere.position.x=Math.cos(elapsedTIme)*1.5
  sphere.position.z=Math.sin(elapsedTIme)*1.5
  sphere.position.y=Math.abs(Math.sin(elapsedTIme*3))

  // sphereShadow.position.x=sphere.position.x
  // sphereShadow.position.z=sphere.position.z
  // sphereShadow.material.opacity=(1-sphere.position.y)*0.3

  controls.update()

  renderer.render(scene,camera)

  requestAnimationFrame(tick)

}
tick()