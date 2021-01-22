import * as THREE from 'three'
import gsap from 'gsap'
import './styles.css'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const group = new THREE.Group()
group.position.set(0, 1, 0)
group.scale.y = 2
group.rotation.y = Math.PI * 0.1
scene.add(group)

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
group.add(cube1)

const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
cube2.position.x = -1.5
group.add(cube2)

const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x0000ff }))
cube3.position.x = 1.5
group.add(cube3)

// Camera
const sizes = { width: 800, height: 600 }
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// have to specify the camera position, by default all objects start at the center
camera.position.z = 3
scene.add(camera)

// Axes helper
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

const tl = gsap.timeline({ repeat: -1 })
tl.to(group.position, { duration: 2, x: 2 })
tl.to(group.position, { duration: 2, x: 0 })

// Animations
const tick = () => {
  // Update objects

  // Render
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
