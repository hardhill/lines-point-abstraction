import { BufferGeometry, Color, Group, Points, PointsMaterial, PointsMaterialParameters, Vector3 } from "three";
import { WorldObject } from "../types/WorldObject";

const params:PointsMaterialParameters = {
    color:'#afafaf',
    size: 0.1
}
export class WPoint extends Group implements WorldObject{

    private geomPoint:BufferGeometry
    private matPoint:PointsMaterial
    private point:Points
    constructor(color:Color){
        super()
        params.color = color
        this.geomPoint = new BufferGeometry().setFromPoints(new Array<Vector3>(new Vector3(0,0,0)))
        this.matPoint = new PointsMaterial(params)
        this.point = new Points(this.geomPoint,this.matPoint)
        this.add(this.point)
        
    }
    public setPosition(position:Vector3){
        this.position.set(position.x,position.y,position.z)
    }

    public tick(delta: number): void {
        
    }
    Object3d() {
        throw new Error("Method not implemented.");
    }
    
}