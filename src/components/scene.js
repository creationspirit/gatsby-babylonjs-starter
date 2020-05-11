import React, { useRef } from 'react';
import { ActionManager } from '@babylonjs/core/Actions/actionManager';
import { ExecuteCodeAction } from '@babylonjs/core/Actions';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import BabylonScene from 'babylonjs-hook';
import './scene.css';

let box;
let babylonLink;

const onSceneReady = scene => {
  // This creates and positions a free camera (non-mesh)
  var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox("box", {size: 2}, scene);

  // Move the box upward 1/2 its height
  box.position.y = 1;

  // Register click event on box mesh
  box.actionManager = new ActionManager(scene);
  box.actionManager.registerAction(
    new ExecuteCodeAction(
        ActionManager.OnPickTrigger,
        () => {
          babylonLink.current.click()
        }
    )
  );

  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
}

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = scene => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000));
  }
}

export default () => {
  babylonLink = useRef(null);

  return (
    <>
      <BabylonScene antialias onSceneReady={onSceneReady} onRender={onRender} id='render-canvas' />
      <a ref={babylonLink} target="_blank" rel="noopener noreferrer" href="https://www.babylonjs.com/">
        Babylon documentation
      </a>
    </>
  )
}
