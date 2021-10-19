import * as THREE from "three";                                               
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";             
import {gsap} from "gsap/all";                                                
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {FlyControls} from 'three/examples/jsm/controls/FlyControls.js';

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
            0.01,
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

        // const AxisHelper = new THREE.AxesHelper(2);
        // this.scene.add(AxisHelper);

    }

    RenderLoop() {

        this.renderer.render(this.scene, this.ViewportCamera);
        this.Controls.update();

    }

    ImportTestObjects() {

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        directionalLight.position.set(0,0,-5);

        this.scene.add(ambientLight);

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

        ModelPaths.FloorCarpet = "./models/FloorCarpet.glb";
        TexturePaths.FloorCarpet = "./textures/FloorCarpet.jpg";

        ModelPaths.MainFuselage = "./models/MainFuselage.glb";
        TexturePaths.MainFuselage = "./textures/MainFuselage.jpg";
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

        ModelPaths.Galley = "./models/Galley.glb";
        TexturePaths.Galley = "./textures/Galley.jpg";

        ModelPaths.Chair01 = "./models/Chair01.glb";
        TexturePaths.Chair01 = "./textures/Chair01.jpg";
        MetalnessPaths.Chair01 = "./textures/ChairMetalness.png";
        RoughnessPaths.Chair01 = "./textures/ChairRoughness.png";

        ModelPaths.Chair02 = "./models/Chair02.glb";
        TexturePaths.Chair02 = "./textures/Chair02.jpg";
        MetalnessPaths.Chair02 = MetalnessPaths.Chair01;
        RoughnessPaths.Chair02 = RoughnessPaths.Chair01;

        ModelPaths.Chair03 = "./models/Chair03.glb";
        TexturePaths.Chair03 = "./textures/Chair03.jpg";
        MetalnessPaths.Chair03 = MetalnessPaths.Chair01;
        RoughnessPaths.Chair03 = RoughnessPaths.Chair01;

        ModelPaths.Chair04 = "./models/Chair04.glb";
        TexturePaths.Chair04 = "./textures/Chair04.jpg";
        MetalnessPaths.Chair04 = MetalnessPaths.Chair01;
        RoughnessPaths.Chair04 = RoughnessPaths.Chair01;

        ModelPaths.Chair05 = "./models/Chair05.glb";
        TexturePaths.Chair05 = "./textures/Chair05.jpg";
        MetalnessPaths.Chair05 = MetalnessPaths.Chair01;
        RoughnessPaths.Chair05 = RoughnessPaths.Chair01;

        ModelPaths.Chair06 = "./models/Chair06.glb";
        TexturePaths.Chair06 = "./textures/Chair06.jpg";
        MetalnessPaths.Chair06 = MetalnessPaths.Chair01;
        RoughnessPaths.Chair06 = RoughnessPaths.Chair01;

        ModelPaths.Chair07 = "./models/Chair07.glb";
        TexturePaths.Chair07 = "./textures/Chair07.jpg";
        MetalnessPaths.Chair07 = MetalnessPaths.Chair01;
        RoughnessPaths.Chair07 = RoughnessPaths.Chair01;

        ModelPaths.BulkheadMonitors = "./models/BulkheadMonitors.glb";
        TexturePaths.BulkheadMonitors = "./textures/BulkheadMonitors.jpg"

        ModelPaths.Tablets = "./models/Tablets.glb"
        TexturePaths.Tablets = "./textures/Tablets.jpg";

        ModelPaths.htse01 = "./models/htse01.glb";
        TexturePaths.htse01 = "./textures/htse01.jpg";

        ModelPaths.htse02 = "./models/htse02.glb";
        TexturePaths.htse02 = "./textures/htse02.jpg";

        ModelPaths.htse03 = "./models/htse03.glb";
        TexturePaths.htse03 = "./textures/htse03.jpg";

        ModelPaths.Macbook = "./models/Macbook.glb";
        TexturePaths.Macbook = "./textures/Macbook.jpg";

        ModelPaths.Phone = "./models/AddedPhone.glb";
        TexturePaths.Phone = "./textures/AddedPhone.jpg";
        
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

        Materials.FloorCarpet.envMapIntensity = 0;
        this.scene.add(ModelRepo);

        console.log(this.scene);
        
        // DEVICES


        function ProcessTexture(TexturePath) {

            let texture = TexLoader.load(TexturePath);
            texture.flipY = false;
            texture.encoding = THREE.sRGBEncoding;

            let material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.25, //.15,
                envMap: CabinInteriorCubemap,
                envMapIntensity: 1
                // reflectivity: 0.05 // for basic material only
            });


            return material;

        }

    }

}

export {TesterApp};