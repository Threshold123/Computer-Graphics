import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Black background 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(800, 600);
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(1,1,1);
const geometry=new THREE.TorusGeometry(0.5,0.2,10,100)
// const geometry=new THREE.SphereGeometry(1,0.4,16,100)
// const geometry=new THREE.CylinderGeometry(1,1,2,32)
// const geometry=new THREE.ConeGeometry(1,2,10)
// const material=new THREE.MeshLambertMaterial({color:0x8844ff})
// const material=new THREE.MeshStandardMaterial({
//   color:0x8844ff,
//   metalness:0.10,
//   roughness:0.3,
//   emissive:0x220044,
// })

const material = new THREE.MeshPhongMaterial({
  color:0x8844ff,
  specular:0xfffff,
  shininess:100
})
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


cube.position.set(0.2,0.5,-1);

console.log("Distance of cube from camera", cube.position.distanceTo(camera.position));

//Axes Helper
const axes=new THREE.AxesHelper(4)
scene.add(axes)

//Scaling Objects
// cube.scale.x=2;  
// cube.scale.y=0.5;
// cube.scale.z=0.5;

cube.scale.set(2,0.5,0.5);

//Rotating Objects
cube.rotation.x=Math.PI*0.25;
cube.rotation.y=Math.PI*0.45;

cube.rotation.set(Math.PI * 0.25, Math.PI * 0.45, 0);

const  group=new THREE.Group()


scene.add(group)

const geometrySphere = new THREE.SphereGeometry(0.5, 16, 16); 
const materialSphere = new THREE.MeshStandardMaterial({ color: 0xFFD166, metalness: 0.2, roughness: 0.5 });
const sphere = new THREE.Mesh( geometrySphere, materialSphere );
scene.add( sphere );


group.add(sphere)


const points = [];
for (let i = 0; i < 10; i++) {
  points.push(new THREE.Vector2(
    Math.sin(i * 0.2) * 0.3 + 0.5, // radius ~0.2..0.8
    (i - 5) * 0.1                  // height ~-0.5..0.5
  ));
}
const geometryLathe = new THREE.LatheGeometry( points );
const materialLathe = new THREE.MeshStandardMaterial({ color: 0x26547C, metalness: 0.15, roughness: 0.6 });
const lathe = new THREE.Mesh( geometryLathe, materialLathe );
scene.add( lathe );

group.add(lathe)

const geometryTorus = new THREE.TorusGeometry(0.6, 0.2, 16, 100); 
const materialTorus = new THREE.MeshStandardMaterial({ color: 0xEF476F, metalness: 0.25, roughness: 0.5 });
const torus = new THREE.Mesh( geometryTorus, materialTorus );
scene.add( torus );

group.add(torus)

sphere.position.set(-1, 3, 0);
lathe.position.set(-3, 0, 0);
torus.position.set(3, 0, 0);

group.scale.set(1, 1, 1);
group.position.set(0, 0, -3);



// const light = new THREE.DirectionalLight(0xffffff, 1.2);
// light.position.set(3,3,3);
// scene.add(light);
const ambient = new THREE.AmbientLight(0xffffff, 0.85);
scene.add(ambient);

const directionalLight=new THREE.DirectionalLight(0xfffff,1.0);
directionalLight.position.set(1,1,5);
scene.add(directionalLight)

const lighthelper=new THREE.DirectionalLightHelper(directionalLight);
scene.add(lighthelper)


renderer.render(scene, camera);



//LETS DO THE LIGHTS ON OUR OWN




function animate() {
    requestAnimationFrame(animate);
     cube.rotation.x += 0.01;
     cube.rotation.y += 0.01;
     cube.rotation.z += 0.01;
    renderer.render(scene, camera);
  
}

animate();
