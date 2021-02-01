import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import * as dat from 'dat.gui'
import './styles.css'

// Debug
const gui = new dat.GUI({ closed: true, width: 400 })
const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
  },
}

// Update material colour
gui.addColor(parameters, 'color').onChange(() => {
  material.color.set(parameters.color)
})

// Add spin parameter
gui.add(parameters, 'spin')

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
  color: parameters.color,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Camera
const aspectRation = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, aspectRation)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Debug
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation')
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')

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
