import { MeshBuilder, Mesh, Vector3, StandardMaterial, Color3 } from "@babylonjs/core";
import { GridMaterial } from "@babylonjs/materials";

class Square{

    square: Mesh;

    constructor() {
        this.square = MeshBuilder.CreateBox("square",{});
        this.square.position = new Vector3(5,10,5);
    }

    getPosition(): Vector3 {
        return this.square.position;
    }

    setPosition(position: Vector3): void{
        this.square.position = position;
    }

    getPositionX(): number {
        return this.square.position.x;
    }

    setPositionX(move: number): void {
        this.square.position.x += move;
    }

    getPositionY(): number {
        return this.square.position.y;
    }

    setPositionY(move: number): void {
        this.square.position.y += move;
    }

    getPositionZ(): number {
        return this.square.position.z;
    }

    setPositionZ(move: number): void {
        this.square.position.z += move;
    }

    setMaterial(material: Color3): void {
        var grid = new GridMaterial("grid");
        grid.lineColor = Color3.Black();
        grid.mainColor = material;
        grid.majorUnitFrequency = 1;
        grid.gridOffset = new Vector3(0.5, 0.5, 0.5);
        this.square.material = grid;
    }
}

export {Square};