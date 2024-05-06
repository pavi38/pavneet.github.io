import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

//courser
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / window.innerWidth - 0.5
    cursor.y = event.clientY / sizes.height - 0.5

    //console.log(cursor.x, cursor.y)
})
// Sizes
const sizes = {
    width: window.innerWidth / 2,
    height: window.innerHeight
}
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth / 2
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})
// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#e8e8e8') //#e3e3e3 #d7f7f5 #e5d663
//lights
const light = new THREE.AmbientLight( 0x404040, 40); // soft white light 50 40
const directionalLight = new THREE.DirectionalLight(0xffff99, 2)
scene.add(directionalLight)
scene.add( light );
// Object
const gltfLoader = new GLTFLoader()
//suzz
const suzz_material = new THREE.MeshStandardMaterial({ color: '#e5d663' })

let suzz;
gltfLoader.load(
    '/models/suzz.glb', 
    (gltf) =>
    {
        console.log('success')
        console.log(gltf)
        //gltf.scene.children[0].material = suzz_material
        suzz = gltf
        scene.add(gltf.scene)
    },
    (progress) =>
    {
        console.log('progress')
        console.log(progress)
    },
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 5
if(suzz){
camera.lookAt(suzz.scene.position)
}
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //mesh.rotation.y = elapsedTime;
    if(suzz){
    suzz.scene.rotation.y = cursor.x * 1.2
    suzz.scene.rotation.x = cursor.y * 1.2
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()