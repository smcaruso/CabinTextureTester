import * as THREE from "three";                                               
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";             
import {gsap} from "gsap/all";                                                
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";  
import { DirectionalLight } from "three";

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

        this.ViewportCamera.position.set(0, 0, -5);
        this.scene.add(this.ViewportCamera);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.CanvasElement,
            antialias: true
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.type = THREE.BasicShadowMap;
        this.renderer.setClearColor("rgb(100,100,100)");
        this.renderer.outputEncoding = THREE.sRGBEncoding;
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

        // this.scene.add(ambientLight, directionalLight);

        const TexLoader = new THREE.TextureLoader();
        const ModelLoader = new GLTFLoader();
        const CubeMapLoader = new THREE.CubeTextureLoader();

        let ModelRepo = new THREE.Object3D();

        const CabinInteriorCubemap = CubeMapLoader.load([
            "./textures/cubemap/px.jpg",
            "./textures/cubemap/nx.jpg",
            "./textures/cubemap/py.jpg",
            "./textures/cubemap/ny.jpg",
            "./textures/cubemap/pz.jpg",
            "./textures/cubemap/nz.jpg"
        ]);

        // this.scene.background = CabinInteriorCubemap;

        const ModelPaths = {};
        const TexturePaths = {};
        const Materials = {};

        // AIRCRAFT BODY 9/3

        TexturePaths.FloorCarpet = "./textures/FloorCarpet.jpg";
        ModelPaths.FloorCarpet = "./models/FloorCarpet.glb";

        TexturePaths.MainFuselage = "./textures/MainFuselage.jpg";
        ModelPaths.MainFuselage = "./models/MainFuselage.glb";
        
        // SCENE CONSTRUCTION

        Object.keys(ModelPaths).forEach(
            function(ObjectKey) {
                Materials[ObjectKey] = ProcessTexture(TexturePaths[ObjectKey]);
                ModelLoader.load(
                    ModelPaths[ObjectKey],
                    function(model) {
                        model.scene.children[0].material = Materials[ObjectKey];
                        ModelRepo.add(model.scene.children[0]);
                    }
                );
            }
        );
        
        ModelRepo.rotateY(Math.PI * 0.5)
        Materials.FloorCarpet.reflectivity = 0;
        this.scene.add(ModelRepo);
        
        // DEVICES


        function ProcessTexture(TexturePath) {

            let texture = TexLoader.load(TexturePath);

            let material = new THREE.MeshBasicMaterial({
                map: texture,
                envMap: CabinInteriorCubemap,
                reflectivity: 0.1
            });

            material.map.flipY = false;
            material.map.encoding = THREE.sRGBEncoding;

            return material;

        }

    }

}

export {TesterApp};