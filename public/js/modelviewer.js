
// var loader = new THREE.JSONLoader();
// loader.load( '../models/tonemapping/tonemapping-replication.json', function ( geometry ) {
// var mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial() );
//
// 	mesh.position.x =500;
// 	mesh.position.y =100;
// 	mesh.position.z =500;
// 	scene.add( mesh );
//
// });

var container, stats;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
console.log("We entered!");
var centerX = 0, centerY = 0;
var width = 0 , height = 0;
var directionalLight;
init();
animate();
function init() {

	var container = document.getElementById( 'build-view-canvas' );


	document.body.appendChild( container );

	width = container.offsetWidth;
	height = container.offsetHeight;
	centerX = width/2;
	centerY = height/2;


	camera = new THREE.PerspectiveCamera( 45, width / height, 1, 2000 );
	camera.position.z = 4;

	// scene
	scene = new THREE.Scene();

	var ambient = new THREE.AmbientLight( 0xee9d48 );
	scene.add( ambient );

	directionalLight = new THREE.DirectionalLight( 0x404040 );
	directionalLight.position.set( 0, 0, 1 ).normalize();
	scene.add( directionalLight );


	// BEGIN Clara.io JSON loader code
	var objectLoader = new THREE.ObjectLoader();
	objectLoader.load("/models/tonemapping/tonemapping-replication.json", function ( obj ) {
	 	scene.add( obj );
	} );
	// END Clara.io JSON loader code




	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( container.devicePixelRatio );
	renderer.setSize( width, height );

	container.appendChild( renderer.domElement );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	//
	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	width = container.offsetWidth;
	height= container.offsetHeight;
	centerX = width / 2;
	centerY = height / 2;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize( width, height );
}
function onDocumentMouseMove( event ) {
	mouseX = ( event.clientX - centerX) / 2;
	mouseY = ( event.clientY - centerY ) / 2;
	//console.log("x:"+mouseX+", y:"+mouseY);
}
//
function animate() {
	requestAnimationFrame( animate );
	render();
}
function render() {
	//camera.position.x += ( mouseX - camera.position.x ) * .05;
	//camera.position.y += ( - mouseY - camera.position.y ) * .05;
	camera.position.x = ( mouseX - camera.position.x ) * .05;
	camera.position.y = ( - mouseY - camera.position.y ) * .05;
	directionalLight.position.set( mouseX, mouseY, 1 ).normalize();
	camera.lookAt( scene.position );
	renderer.render( scene, camera );
}
