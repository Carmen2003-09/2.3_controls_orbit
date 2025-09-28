import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, controls, scene, renderer;

init();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xd6eaff); // 🔹 azul pastel claro
  scene.fog = new THREE.FogExp2(0xd6eaff, 0.002);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(400, 200, 0);

  // controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.listenToKeyEvents(window); // opcional
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 100;
  controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI / 2;

  // world
  const geometry = new THREE.ConeGeometry(10, 30, 4, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0xa7c7f2, // 🔹 azul pastel en conos
    flatShading: true
  });

  for (let i = 0; i < 500; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 1600 - 800;
    mesh.position.y = 0;
    mesh.position.z = Math.random() * 1600 - 800;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add(mesh);
  }

  // lights (ajustadas a tonos fríos/azules)
  const dirLight1 = new THREE.DirectionalLight(0xe6f2ff, 2.5);
  dirLight1.position.set(1, 1, 1);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x88aaff, 2);
  dirLight2.position.set(-1, -1, -1);
  scene.add(dirLight2);

  const ambientLight = new THREE.AmbientLight(0xa7c7f2, 1.5);
  scene.add(ambientLight);

  // resize event
  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  controls.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}
