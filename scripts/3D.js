			import * as THREE from './dependences/three.module.js';
			import Stats from './dependences/stats.module.js';
			import { ColladaLoader } from './dependences/ColladaLoader.js';
			import { TrackballControls } from './dependences/TrackballControls.js';
			var container, stats, clock;
            var camera, scene, renderer, elf,controls;
            var color;
			init();
			animate();
			function init() {
				container = document.getElementById( 'container' );
				camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 8, 2000 );
				camera.position.set( 0, 3, 10);
				camera.lookAt( 0, 0, 0 );
				scene = new THREE.Scene();
                clock = new THREE.Clock();
                color = new THREE.Color("rgb(0%,0%,0%)");
				// loading manager
				var loadingManager = new THREE.LoadingManager( function () {
					scene.add( elf );
				} );
				// collada
				var loader = new ColladaLoader( loadingManager );
				loader.load( './models/Figura2.dae', function ( collada ) {
					elf = collada.scene;
                } );
                
				//COLORES DE LA LUCES
				var ambientLight = new THREE.AmbientLight( 0x00000, 2 );
				scene.add( ambientLight );
				var directionalLight = new THREE.DirectionalLight( 0xFF5733, 2 );
				directionalLight.position.set( 1,1, 1 ).normalize();
				scene.add(directionalLight)


				var directionalLight2 = new THREE.DirectionalLight( 0xFF5733, 3 );
				directionalLight2.position.set( 1,1, -1 ).normalize();
				scene.add(directionalLight2)
			

                
				//
				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );
                container.appendChild( renderer.domElement );
				//
				stats = new Stats();
				controls = new TrackballControls( camera, renderer.domElement );
				//
				window.addEventListener( 'resize', onWindowResize, false );
			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
			function animate() {
				requestAnimationFrame( animate );
				render();
				stats.update();
				controls.update();
				
			}
			function render() {
				var delta = clock.getDelta();
				/*if ( elf !== undefined ) {
					elf.rotation.z += delta * 0.5;
                }*/
                renderer.setClearColor(color,1);
                //console.log(renderer.getClearColor());
                renderer.render( scene, camera );
			}
