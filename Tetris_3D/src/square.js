import { MeshBuilder, Vector3, Color3 } from "@babylonjs/core";
import { GridMaterial } from "@babylonjs/materials";
class Square {
    constructor() {
        Object.defineProperty(this, "square", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.square = MeshBuilder.CreateBox("square", {});
        this.square.position = new Vector3(5, 10, 5);
    }
    getPosition() {
        return this.square.position;
    }
    setPosition(position) {
        this.square.position = position;
    }
    getPositionX() {
        return this.square.position.x;
    }
    setPositionX(move) {
        this.square.position.x += move;
    }
    getPositionY() {
        return this.square.position.y;
    }
    setPositionY(move) {
        this.square.position.y += move;
    }
    getPositionZ() {
        return this.square.position.z;
    }
    setPositionZ(move) {
        this.square.position.z += move;
    }
    setMaterial(material) {
        var grid = new GridMaterial("grid");
        grid.lineColor = Color3.Black();
        grid.mainColor = material;
        grid.majorUnitFrequency = 1;
        grid.gridOffset = new Vector3(0.5, 0.5, 0.5);
        this.square.material = grid;
    }
}
export { Square };
