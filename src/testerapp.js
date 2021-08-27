import * as THREE from "three";                                               
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";             
import {gsap} from "gsap/all";                                                
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";  

class TesterApp {

    constructor() {

        this.CanvasElement = document.querySelector("canvas.webglcanvas");
        window.addEventListener("resize", this.Resize.bind(this));
        this.InitThreeScene();

        this.Controls = new OrbitControls(this.ViewportCamera, this.renderer.domElement);

        this.ImportTestObjects();

    
    }

    Resize() {

        this.ViewportCamera.aspect = window.innerWidth / window.innerHeight;
        this.ViewportCamera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

    }

    InitThreeScene() {

        this.scene = new THREE.Scene();

        this.ViewportCamera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );

        this.ViewportCamera.position.set(0, 1.5, -5);
        this.scene.add(this.ViewportCamera);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.CanvasElement,
            antialias: true
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.type = THREE.BasicShadowMap;
        this.renderer.setClearColor("rgb(100,100,100)");
        this.renderer.setAnimationLoop(this.RenderLoop.bind(this));

        const AxisHelper = new THREE.AxesHelper(2);
        this.scene.add(AxisHelper);



    }

    RenderLoop() {

        this.renderer.render(this.scene, this.ViewportCamera);
        this.Controls.update();

    }

    ImportTestObjects() {

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        directionalLight.position.set(0,0,-5);

        this.scene.add(ambientLight, directionalLight);

        const TexLoader = new THREE.TextureLoader();
        const ModelLoader = new GLTFLoader();

        const texture = TexLoader.load(
            "./textures/MonitorOnArm01.jpg"
        );

        const material = new THREE.MeshStandardMaterial({map: texture});
        material.map.flipY = false;
        material.roughness = 0.5;

        ModelLoader.load(
            "./models/MonitorOnArm01.glb",
            OnLoad.bind(this)
        )

        function OnLoad(model) {
            model.scene.children[0].material = material;
            this.scene.add(model.scene);
        }

    }

}

export {TesterApp};