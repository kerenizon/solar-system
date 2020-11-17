import React from 'react';
import '../css/index.css';
import * as THREE from '../three.module.js';
import {OrbitControls} from '../OrbitControls.js';
import {Link} from 'react-router-dom';
import api from '../api/index'

class CanvasMap extends React.Component {
  constructor(props){
    super(props);
    this.innerCanvasRef = React.createRef();
    this.outerCanvasRef = React.createRef();
  }

  componentDidUpdate = async () => {

/////////////////////////////////////////// drawing circle and stars on the outer canvas //////////////////////////////////
    const outerCanvas = this.outerCanvasRef.current;
    const ctxOuter = outerCanvas.getContext('2d');
    let data = null;

    let radius = 250;
    let point_size = 10;
    let center_x = 400;
    let center_y = 270;
    let font_size = "13px sans-serif";

    function drawCircle(){
      function angleCalc(angle, distance){
        let side_x = center_x + (radius) * Math.cos((angle-90)*Math.PI/180) * distance;
        let side_y = center_y + (radius) * Math.sin((angle-90)*Math.PI/180) * distance;
        return [side_x, side_y];
      }
      ctxOuter.beginPath();
      ctxOuter.arc(center_x, center_y, radius, 0, 2 * Math.PI);
      ctxOuter.strokeStyle = '#032f5f';
      ctxOuter.stroke();
      
      let [side_x, side_y] = angleCalc(0,250);
      ctxOuter.fillText('NORTH',side_x, side_y);    
    }

    // drawPoint(azimuth,cos(altitude),altitude,"name",color); 
    function drawPoint(angle, distance, color, label = ''){
      let x = center_x + radius * Math.cos((angle-90)*Math.PI/180) * distance;
      let y = center_y + radius * Math.sin((angle-90)*Math.PI/180) * distance;

      ctxOuter.beginPath();
      ctxOuter.arc(x, y, point_size, 0, 2 * Math.PI);
      ctxOuter.fillStyle = color;
      ctxOuter.fill();

      ctxOuter.font = font_size;
      ctxOuter.fillStyle = 'black';
      ctxOuter.fillText(label,x + 15,y);
      // ctxOuter.fillText(`az: ${angle}`,x + 15,y+15);
      // ctxOuter.fillText(`alt: ${altitude}`,x + 15,y+30);
      return [x,y];
    }

    //Execution  
    drawCircle();
  
    // const data = JSON.parse(localStorage.getItem('data'));
  
    await api.getAllData().then(data => data = data.details);
    
    const createPlanetPoint = (index, planetName, planetColor) => {
      let planet = this.state.data[index].cells[0].position.horizonal;
      let btnsArr = this.props.refs;

      document.querySelectorAll('[role="tab"]').forEach(tab => {
        tab.setAttribute('aria-selected', false);
      });

      if (parseFloat(planet.altitude.degrees) > 0){
        let [planetX, planetY] = drawPoint(parseFloat(planet.azimuth.degrees), Math.cos(parseFloat(planet.altitude.degrees)), planetColor);
        
        ///////////// making the stars as buttons functions /////////////////
        if (document.querySelector(`a.${planetName}`) !== null){
          if (document.querySelector(`a.${planetName}`).classList[0] === planetName){
            document.querySelector(`a.${planetName}`).style.left = `${planetX-7}px`;  // to be more precise
            document.querySelector(`a.${planetName}`).style.top =  `${planetY-7}px`; 
          }

          for(let i=0; i<10; i++){            
            btnsArr[i].disabled = false;          
          }
        }

    
      }
    }

    function drawRect(angle, distance, color, label = '', length, width){
      let x = center_x + radius * Math.cos((angle-90)*Math.PI/180) * distance;
      let y = center_y + radius * Math.sin((angle-90)*Math.PI/180) * distance;

      (label === 'NORTH') && (y=y-width);
      (label === 'WEST') && (x=x-length);
      ctxOuter.beginPath();
      ctxOuter.rect(x, y, length, width);
      ctxOuter.fillStyle = color;
      ctxOuter.fill();

      ctxOuter.font = font_size;
      ctxOuter.fillStyle = 'black';
      ctxOuter.fillText(label,x + 15,y + 20);
    }

    function creatDirectionsPoints(){
      drawRect(90, 1, '#032f5f', 'EAST', 20, 10);
      drawRect(180, 1, '#032f5f', 'SOUTH', 10, 20);
      drawRect(270, 1, '#032f5f', 'WEST', 20, 10);
      drawRect(0, 1, '#032f5f', 'NORTH', 10, 20);
    }


    
    if(data !== null){

      ctxOuter.clearRect(0, 0, outerCanvas.width, outerCanvas.height);
      drawCircle();

      creatDirectionsPoints();

      createPlanetPoint(0, 'Sun', 'yellow');
      createPlanetPoint(1, 'Moon', 'snow');
      createPlanetPoint(2, 'Mercury', '#694707');
      createPlanetPoint(3, 'Venus', 'palevioletred');
      createPlanetPoint(5, 'Mars', 'red');
      createPlanetPoint(6, 'Jupiter', 'orange');
      createPlanetPoint(7, 'Saturn', 'black');
      createPlanetPoint(8, 'Uranus', 'green');
      createPlanetPoint(9, 'Neptune', '#3737dd');
      createPlanetPoint(10, 'Pluto', '#5a0e5a');      
    } else{
      ctxOuter.clearRect(0, 0, outerCanvas.width, outerCanvas.height);
      drawCircle();
    }
    

/////////////////////////////////////////// drawing 3d person on the inner canvas //////////////////////////////////
    
    const canvas = this.innerCanvasRef.current;
    const renderer = new THREE.WebGLRenderer({canvas, alpha: true});

    ctxOuter.drawImage(canvas, 0, 0, 100, 100);
    
    const fov = 75;
    const aspect = 1.5; 
    const near = 0.1;
    const far = 30;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 2, 5);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 2, 0);
    controls.update();

    const scene = new THREE.Scene();
    // scene.background = new THREE.Color('white');


    function addLight(position) {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(...position);
      scene.add(light);
      scene.add(light.target);
    }
    addLight([-3, 1, 1]);
    addLight([ 2, 1, .5]);

    const bodyRadiusTop = 1;
    const bodyRadiusBottom = 0.5;
    const bodyHeight = 2;
    const bodyRadialSegments = 5;
    const bodyGeometry = new THREE.CylinderBufferGeometry(
        bodyRadiusTop, bodyRadiusBottom, bodyHeight, bodyRadialSegments);

    const headRadius = bodyRadiusTop * 0.8;
    const headLonSegments = 12;
    const headLatSegments = 5;
    const headGeometry = new THREE.SphereBufferGeometry(
        headRadius, headLonSegments, headLatSegments);

    const labelGeometry = new THREE.PlaneBufferGeometry(2, 2);

    function makeLabelCanvas(size, name) {
      const borderSize = 2;
      const ctx = document.createElement('canvas').getContext('2d');
      const font =  `${size}px bold sans-serif`;
      ctx.font = font;
      // measure how long the name will be
      const doubleBorderSize = borderSize * 2;
      const width = ctx.measureText(name).width + doubleBorderSize;
      const height = size + doubleBorderSize;
      ctx.canvas.width = width;
      ctx.canvas.height = height;

      // need to set font again after resizing canvas
      ctx.font = font;
      ctx.textBaseline = 'top';

      ctx.fillStyle = '#032f5f';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = 'white';
      ctx.fillText(name, borderSize, borderSize);

      return ctx.canvas;
    }

    function makePerson(x, size, name, color) {
      const canvas = makeLabelCanvas(size, name);
      const texture = new THREE.CanvasTexture(canvas);
      // because our canvas is likely not a power of 2
      // in both dimensions set the filtering appropriately.
      texture.minFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      const labelMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
      });
      const bodyMaterial = new THREE.MeshPhongMaterial({
        color,
        flatShading: true,
      });

      const root = new THREE.Object3D();
      root.position.x = x;

      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      root.add(body);
      body.position.y = bodyHeight / 2;

      const head = new THREE.Mesh(headGeometry, bodyMaterial);
      root.add(head);
      head.position.y = bodyHeight + headRadius * 1.1;

      const label = new THREE.Mesh(labelGeometry, labelMaterial);
      root.add(label);
      label.position.y = bodyHeight * 4 / 5;
      label.position.z = bodyRadiusTop * 1.01;

      // if units are meters then 0.01 here makes size
      // of the label into centimeters.
      const labelBaseScale = 0.01;
      label.scale.x = canvas.width  * labelBaseScale;
      label.scale.y = canvas.height * labelBaseScale;

      scene.add(root);
      return root;
    }

    makePerson(-0, 32, 'you are here',  '#864444');

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    function render() {
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }


/////////////////////////////////////////// render function /////////////////////////////////////////////////////////////// 

  render(){
    return (
      <div className="canvasMap">
        <canvas className="canvasMap1" ref={this.outerCanvasRef} height="550" width="800"></canvas>
        <canvas className="canvasMap2" ref={this.innerCanvasRef} height="200" width="300" style={{ outline: "none", border: "none"}}></canvas>       
        <Link to="/sun" className="Sun planet"></Link>
        <Link to="/mercury" className="Mercury planet"></Link>
        <Link to="/venus" className="Venus planet"></Link>
        <Link to="/moon" className="Moon planet"></Link>
        <Link to="/mars" className="Mars planet"></Link>
        <Link to="/jupiter" className="Jupiter planet"></Link>
        <Link to="/saturn" className="Saturn planet"></Link>
        <Link to="/uranus" className="Uranus planet"></Link>
        <Link to="/neptune" className="Neptune planet"></Link>
        <Link to="/pluto" className="Pluto planet" alt="Pluto"></Link>
      </div>
    );
  }
}

export default CanvasMap;
