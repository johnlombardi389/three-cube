import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

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
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  1,
  100
);
camera.position.x = 1;
camera.position.y = 3;
camera.position.z = 3;
camera.lookAt(cubeMesh.position);
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
gsap.to(cubeMesh.position, { duration: 1, delay: 1, x: 2 });

const loop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
