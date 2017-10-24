var camera, scene, renderer, control, mesh;
var textlabels = [];
init();
render();
function init() {
    /* Part of the failed selecting.
    var container = document.getElementById("container");
    var viewSize = 50;
    */

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth/(3/2), window.innerHeight/(3/2) );
    document.body.appendChild( renderer.domElement );
    //
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 3000 );
    camera.position.set( 1000, 500, 1000 );
    camera.lookAt( new THREE.Vector3( 0, 200, 0 ) );

    scene = new THREE.Scene();
    scene.add( new THREE.GridHelper( 1000, 10 ) );
    var light = new THREE.DirectionalLight( 0xffffff, 2 );
    light.position.set( 1, 1, 1 );
    scene.add( light );
    scene.translateY(50);

    var texture = new THREE.TextureLoader().load( 'textures/crate.gif', render );
    texture.mapping = THREE.UVMapping;
    texture.anisotropy = renderer.getMaxAnisotropy();
    var geometry = new THREE.BoxGeometry( 200, 200, 200 );
    var material = new THREE.MeshLambertMaterial( { map: texture } );

    control = new THREE.TransformControls( camera, renderer.domElement );
    control.addEventListener( 'change', render );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    control.attach(mesh);
    scene.add(control);

    window.addEventListener( 'resize', onWindowResize, false );

    window.addEventListener( 'keydown', function ( event ) {
        switch ( event.keyCode ) {
            case 81: // Q
                control.setSpace( control.space === "local" ? "world" : "local" );
                break;
            case 17: // Ctrl
                control.setTranslationSnap( 100 );
                control.setRotationSnap( THREE.Math.degToRad( 15 ) );
                break;
            case 87: // W
                control.setMode( "translate" );
                break;
            case 69: // E
                control.setMode( "rotate" );
                break;
            case 82: // R
                control.setMode( "scale" );
                break;
            case 187:
            case 107: // +, =, num+
                control.setSize( control.size + 0.1 );
                break;
            case 189:
            case 109: // -, _, num-
                control.setSize( Math.max( control.size - 0.1, 0.1 ) );
                break;
        }
    });
    window.addEventListener( 'keyup', function ( event ) {
        switch ( event.keyCode ) {
            case 17: // Ctrl
                control.setTranslationSnap( null );
                control.setRotationSnap( null );
                break;
        }
    });
} 
    /* checks if object is selected, but does not work
    if (container != null) {
        container.addEventListener('click', function(event){
          var bounds = container.getBoundingClientRect()
          mouse.x = ( (event.clientX - bounds.left) / container.clientWidth ) * 2 - 1;
          mouse.y = - ( (event.clientY - bounds.top) / container.clientHeight ) * 2 + 1;
          raycaster.setFromCamera( mouse, camera );
          var intersects = raycaster.intersectObjects(scene.children, true);
          if (intersects.length > 0) {
                SELECTED = intersects[ 0 ].object;

                control.attach(SELECTED);
                scene.add(control);
            } else{
                control.detach(SELECTED);
                scene.remove(control);
            }
        }, false);
    }
    */
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth/(3/2), window.innerHeight/(3/2) );
    render();
}
function render() {
    control.update();
    renderer.render( scene, camera );
}

function addText() {

  //CREATES AN INVISIBLE MATERIAL FOR THE TEXT TO FOLLOW
  var material = new THREE.MeshBasicMaterial({
    color: 0x00000000
  });

  var geometry = new THREE.CylinderGeometry(0, 0, 0, 0, 0);

  var mesh2 = new THREE.Mesh(geometry, material);
  mesh2.position.x = (Math.random() - 0.5) * 1000;
  mesh2.position.y = (Math.random() - 0.5) * 1000;
  mesh2.position.z = (Math.random() - 0.5) * 1000;
  mesh2.updateMatrix();
  mesh2.matrixAutoUpdate = false;
  scene.add(mesh2);

  var text = _createTextLabel();
  var textValue = prompt("What text would you like to include?")
  text.setHTML(textValue);
  text.setParent(mesh2);
  textlabels.push(text);

  container = document.getElementById('container');
  if (container != null) {
    container.appendChild(text.element);
  }

  var _animate = function() {
    requestAnimationFrame(animate);
    control.update();
    _render();
  }
_animate();
}

function _render() {
    for(var i=0; i<textlabels.length; i++) {
    textlabels[i].updatePosition();
    }
renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    control.update();
    render();
}

function _createTextLabel() {
    var div = document.createElement('div');
    div.className = 'text-label';
    div.style.position = 'absolute';
    div.style.width = 100;
    div.style.height = 100;
    div.innerHTML = "hi there!";
    div.style.top = -1000;
    div.style.left = -1000;

    var _this = this;

    return {
      element: div,
      parent: false,
      position: new THREE.Vector3(0,0,0),
      setHTML: function(html) {
        this.element.innerHTML = html;
      },
      setParent: function(threejsobj) {
        this.parent = threejsobj;
      },
      updatePosition: function() {
        if(parent) {
          this.position.copy(this.parent.position);
        }

        var coords2d = this.get2DCoords(this.position, _this.camera);
        this.element.style.left = coords2d.x + 'px';
        this.element.style.top = coords2d.y + 'px';
      },
      get2DCoords: function(position, camera) {
        var vector = position.project(camera);
        vector.x = (vector.x + 1)/2 * window.innerWidth;
        vector.y = -(vector.y - 1)/2 * window.innerHeight;
        return vector;
      }
    }
}