import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const dirLight1 = new THREE.DirectionalLight(0xffffff, 2);
dirLight1.position.set(5, 10, 7);
scene.add(dirLight1);

// Load Model 3D
const loader = new GLTFLoader();
let model: THREE.Group;

// GANTI nama file .glb sesuai yang ada di folder public kamu
loader.load('/free_1975_porsche_911_930_turbo.glb', (gltf) => {
  model = gltf.scene;

  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  model.position.sub(center);
  scene.add(model);

  const maxDim = Math.max(size.x, size.y, size.z);
  camera.position.set(0, maxDim * 0.5, maxDim * 1.5);
  camera.lookAt(0, 0, 0);
  controls.update();
});

function animate() {
  requestAnimationFrame(animate);
  if (model) model.rotation.y += 0.005;
  controls.update();
  renderer.render(scene, camera);
}
animate();