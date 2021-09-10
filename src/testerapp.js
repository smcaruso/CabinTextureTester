import * as THREE from "three";                                               
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";             
import {gsap} from "gsap/all";                                                
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";  
import { DirectionalLight, TextureLoader } from "three";

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
        this.renderer.setClearColor("rgb(255,255,255)");
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
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        directionalLight.position.set(0,0,-5);

        this.scene.add(ambientLight, directionalLight);

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

        CabinInteriorCubemap.encoding = THREE.sRGBEncoding;

        // this.scene.background = CabinInteriorCubemap;

        const ModelPaths = {};
        const TexturePaths = {};
        const MetalnessPaths = {};
        const RoughnessPaths = {}
        const Materials = {};

        // AIRCRAFT BODY 9/3

        // // /*
        // ModelLoader.load("./MainFuselageWitMaterials.glb", LoadModel.bind(this));
        
        // function LoadModel(model) {
        //     console.log(model.scene.children)
        //     model.scene.children[0].material.envMap = CabinInteriorCubemap;
        //     model.scene.children[0].material.envMapIntensity = 2;
        //     ModelRepo.add(model.scene)
        // }

        // // */

        ModelPaths.FloorCarpet = "./models/FloorCarpet.glb";
        TexturePaths.FloorCarpet = "./textures/FloorCarpet.jpg";

        ModelPaths.MainFuselage = "./models/MainFuselage.glb";
        TexturePaths.MainFuselage = "./textures/MainFuselage.png";
        MetalnessPaths.MainFuselage = "./textures/MainFuselage_metalness.png";
        RoughnessPaths.MainFuselage = "./textures/MainFuselage_roughness.png";

        ModelPaths.TablesLedges = "./models/TablesLedges.glb";
        TexturePaths.TablesLedges = "./textures/TablesLedges.jpg";
        MetalnessPaths.TablesLedges = "./textures/TablesLedgesMetalness.png";
        RoughnessPaths.TablesLedges = "./textures/TablesLedgesRoughness.png";

        ModelPaths.Divan = "./models/Divan.glb";
        TexturePaths.Divan = "./textures/Divan.jpg";
        RoughnessPaths.Divan = "./textures/DivanRoughness.png";

        ModelPaths.AftWall = "./models/AftWall.glb";
        TexturePaths.AftWall = "./textures/AftWall.jpg";
        
        // SCENE CONSTRUCTION

        Object.keys(ModelPaths).forEach(
            function(ObjectKey) {
                
                Materials[ObjectKey] = ProcessTexture(TexturePaths[ObjectKey]); // generates basic material
                let MetalnessTexture, RoughnessTexture;

                if (MetalnessPaths[ObjectKey]) {  
                    MetalnessTexture = TexLoader.load(MetalnessPaths[ObjectKey]);
                    MetalnessTexture.flipY = false;
                    MetalnessTexture.encoding = THREE.sRGBEncoding;
                    Materials[ObjectKey].metalnessMap = MetalnessTexture;
                    // Materials[ObjectKey].emissiveMap = MetalnessTexture;
                    // Materials[ObjectKey].emissive = new THREE.Color("rgb(255,255,255)");
                    // Materials[ObjectKey].emissiveIntensity = 0.5;
                } // apply metalness texture if provided

                if (RoughnessPaths[ObjectKey]) {
                    RoughnessTexture = TexLoader.load(RoughnessPaths[ObjectKey]);
                    RoughnessTexture.flipY = false;
                    RoughnessTexture.encoding = THREE.sRGBEncoding;
                    Materials[ObjectKey].roughnessMap = RoughnessTexture;
                } // apply roughness texture if provided

                ModelLoader.load(
                    ModelPaths[ObjectKey],
                    function(model) {
                        model.scene.children[0].material = Materials[ObjectKey];
                        ModelRepo.add(model.scene.children[0]);
                    }
                ); // check for model import path and add to scene with matched material
            }
        );
        
        ModelRepo.rotateY(Math.PI * 0.5);
        
        // Materials.MainFuselage = new THREE.MeshStandardMaterial(
        //     {color: 0x909095,
        //     envMap: CabinInteriorCubemap,
        //     envMapIntensity: 2,
        //     roughness: 0.25,
        //     metalness: 0
        //     }
        // );

        // CUSTOM MATERIAL PROPERTIES

        // Materials.FloorCarpet.envMapIntensity = 0;
        this.scene.add(ModelRepo);
        
        // DEVICES


        function ProcessTexture(TexturePath) {

            let texture = TexLoader.load(TexturePath);

            let material = new THREE.MeshStandardMaterial({
                map: texture,
                envMap: CabinInteriorCubemap,
                envMapIntensity: 2
                // reflectivity: 0.05 // for basic material only
            });

            material.map.flipY = false;
            material.map.encoding = THREE.sRGBEncoding;

            return material;

        }

    }

}

export {TesterApp};