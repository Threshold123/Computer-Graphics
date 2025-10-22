import GUI from 'lil-gui';
import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

const sizes={
  width : 800,
  height: 600
}

const cursor={x:0,y:0}

window.addEventListener('mousemove', (event)=>{
  cursor.x=event.clientX/sizes.width-0.5
  cursor.y=(event.clientY/sizes.height-0.5)
})

const scene=new THREE.Scene()
scene.background=new THREE.Color(0x202020)

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1,5,5,5),
  new THREE.MeshBasicMaterial({color:0xff0000,wireframe:true})
)

scene.add(mesh)

const camera = new THREE.PerspectiveCamera(
  75, // FOV IN DEGREES
  sizes.width/sizes.height , //ASPECT RATIO
  0.1, //NEAR CLIPPING PLANE
  100 //FAR CLIPPING PLANE
)

camera.position.z=3
scene.add(camera)

const aspectRatio=sizes.width/sizes.height
const orthographicCamera= new THREE.OrthographicCamera(
  -1*aspectRatio,//LEFT
  1*aspectRatio, //RIGHT
  1, //top
  -1,//BOTTOM
  0.1, //NEAR CLIPPING PLANE
  100 //FAR CLIPPING NAME
)
camera.position.z =49;
scene.add(camera)

const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping=true

const animate=()=>{
  controls.update()
  renderer.render(scene,camera)
  requestAnimationFrame(animate)
}

animate()

window.addEventListener("resize",()=>{
  sizes.width= window.innerWidth
  sizes.height=window.innerHeight
  camera.aspect=sizes.width/sizes.height

  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)
})