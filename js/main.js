import * as THREE from './three.module.js';
import { ARButton } from './ARButton.js';

let camera, scene, renderer;
let controller;

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] }));

  controller = renderer.xr.getController(0);
  controller.addEventListener('select', onSelect);
  scene.add(controller);
}

function onSelect() {
  // Cada vez que el usuario toque, crea un gráfico simple
  const geometry = new THREE.ConeGeometry(0.1, 0.2, 32); // Un cono como "marcador"
  const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  const cone = new THREE.Mesh(geometry, material);

  cone.position.setFromMatrixPosition(controller.matrixWorld);
  scene.add(cone);
}

// Iluminación básica
const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
scene.add(light);

function animate() {
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}
