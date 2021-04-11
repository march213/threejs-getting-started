import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import './styles.css'

// Textures
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
  console.log('loading started')
}

loadingManager.onLoad = () => {
  console.log('loading finished')
}

loadingManager.onProgress = () => {
  console.log('loading progressing')
}

loadingManager.onError = () => {
  console.log('loading failed')
}

const textureLoader = new THREE.TextureLoader(loadingManager)
// const colorTexture = textureLoader.load(require('./assets/textures/door/color.jpg'))
// const colorTexture = textureLoader.load(require('./assets/textures/checkerboard-1024x1024.png'))
const colorTexture = textureLoader.load(require('./assets/textures/minecraft.png'))
const alphaTexture = textureLoader.load(require('./assets/textures/door/alpha.jpg'))
const heightTexture = textureLoader.load(require('./assets/textures/door/height.jpg'))
const normalTexture = textureLoader.load(require('./assets/textures/door/normal.jpg'))
const ambientOcclusionTexture = textureLoader.load(require('./assets/textures/door/ambientOcclusion.jpg'))
const metalnessTexture = textureLoader.load(require('./assets/textures/door/metalness.jpg'))
const roughnessTexture = textureLoader.load(require('./assets/textures/door/roughness.jpg'))

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 2
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

// if minFilter and magFilter set to THREE.NearestFilter
// need to disable mipmap generations
colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

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
  map: colorTexture,
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
