import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "dat.gui";

const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

// Cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

// Camera
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 3;
camera.position.z = 3;
camera.lookAt(cubeMesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Debug
const gui = new dat.GUI();
gui.add(cubeMesh.position, "x").min(-3).max(3).step(0.001);
gui.add(cubeMesh.position, "y").min(-3).max(3).step(0.001);
gui.add(cubeMesh.position, "z").min(-3).max(3).step(0.001);
gui.add(cubeMesh, "visible");
gui.add(cubeMaterial, "wireframe");

// Animate
const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
