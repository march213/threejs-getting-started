import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import './styles.css'

// Texture
const image = new Image()
const texture = new THREE.Texture(image)
image.onload = () => {
  texture.needsUpdate = true
}
image.src = require('./assets/textures/door/color.jpg')

const canvas = document.querySelector('.webgl')

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/*
window.addEventListener('dblclick', (e) => {
  // Add Safari support with webkit prefix
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
      return
    }

    if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
      return
    }
  }

  if (document.exitFullscreen) {
    document.exitFullscreen()
    return
  }

  if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
    return
  }
})
*/

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({
  // color: 0xff00f0,
  map: texture,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Camera
const aspectRation = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, aspectRation)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const tick = () => {
  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
