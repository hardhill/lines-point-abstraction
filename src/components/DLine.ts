import { BufferGeometry, Color, Float32BufferAttribute, Group, Line, Line3, LineBasicMaterial, Object3D, Points, PointsMaterial, Vector3 } from "three";
import { WorldObject } from "../types/WorldObject";
import { WPoint } from "./WPoint";



export class DLine extends Group implements WorldObject{
    
    private pointOne:WPoint
    private pointTwo:WPoint
    //private pointTwo:Points
    
    private geomLine:BufferGeometry
    private x1=1
    private x2=-1
    private matLine:LineBasicMaterial
  
    private angle1:number
    private angle2:number
    private groupOne:Group
    private groupTwo:Group
    material: any;
    constructor(){
        super()
        
        this.angle1 = 0
        this.angle2 = Math.PI/8
        
        this.geomLine = new BufferGeometry()
        this.matLine = new LineBasicMaterial({color:'white',transparent:true})

        this.pointOne = new WPoint(new Color('white'))
        this.pointTwo = new WPoint(new Color(0xff0000))
        this.pointOne.setPosition(new Vector3(0.4,0,1))
        this.pointTwo.setPosition(new Vector3(-0.4,0,0.5))
        
        this.groupOne = new Group()
        this.groupTwo = new Group()
        this.groupOne.position.x = 0.5
        this.groupTwo.position.x= -0.5
        const line1 = new Line(this.geomLine,this.matLine)
        

        this.groupOne.add(this.pointOne)
        this.groupTwo.add(this.pointTwo)

        this.add(this.groupOne)
        this.add(this.groupTwo)
        this.add(line1)
        
        
        
        
        
    }
    
    tick(delta: number): void {
        
        // const speed1 = 1.3
        // const speed2 = 0.8
        // this.angle1 = (this.angle1 + speed1*delta*Math.PI/4)%(Math.PI*2)
        // this.angle2 = (this.angle2 + speed2*delta*Math.PI/4)%(Math.PI*2)
        // this.x1 = Math.sin(this.angle1)*0.8
        // this.x2 = Math.sin(this.angle2)*1.1
        // this.geomPoint.getAttribute('position').setX(0,this.x1)
        // this.geomPoint.getAttribute('position').setX(1,this.x2)
        // let x1 = this.geomPoint.getAttribute('position').getX(0)
        // let y1 = this.geomPoint.getAttribute('position').getY(0)
        // let z1 = this.geomPoint.getAttribute('position').getZ(0)
        // let x2 = this.geomPoint.getAttribute('position').getX(1)
        // let y2 = this.geomPoint.getAttribute('position').getY(1)
        // let z2 = this.geomPoint.getAttribute('position').getZ(1)
        // const line3 = new Line3(new Vector3(x1,y1,z1), new Vector3(x2,y2,z2))
        //console.log(line3.distance())
        //this.rotateZ(delta*Math.PI/8)
        this.children[0].rotateY(delta*-Math.PI/8)
        this.children[1].rotateY(delta*Math.PI/6)
        this.children[1].rotateX(delta*Math.PI/6)
        this.children[0].rotateX(delta*-Math.PI/8)
        this.matrixWorldNeedsUpdate = true
        let point1 = (this.children[0].children[0] as Points)
        let point2 = (this.children[1].children[0] as Points)
        
        const line_coord = []
        let v1 = new Vector3()
        let v2 = new Vector3()

        point1.getWorldPosition(v1)
        point2.getWorldPosition(v2)
        
        line_coord.push(v1)
        line_coord.push(v2)

        let line1 = (this.children[2] as DLine)
        const lineDist = new Line3(v1,v2)
        //console.log(lineDist.distance())
        if(lineDist.distance()<1){
            line1.material.opacity = 1
            
        }else if(lineDist.distance()>=2){
            line1.material.opacity = 0
        }else{
           line1.material.opacity = 2 - lineDist.distance()
        }
        
        
        
        line1.geometry.setFromPoints(line_coord)
       
       
    }
    Object3d() {
        throw new Error("Method not implemented.");
    }
    
}