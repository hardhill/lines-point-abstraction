import { PerspectiveCamera } from "three";

export function createCamera(){
    const camera = new PerspectiveCamera(
        35, //fov
        1,  //aspect
        0.1, //near
        100    //far
    )
    camera.position.set(0,3,10)
    camera.lookAt(0,0,0)
    return camera
}