import { Vector3, Color3 } from "@babylonjs/core";
import { Square } from "./square";
class lShape {
    constructor() {
        Object.defineProperty(this, "mainSquare", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Square()
        });
        Object.defineProperty(this, "blocks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.blocks[0] = this.mainSquare;
        var material = new Color3(0, 1, 0);
        this.mainSquare.setMaterial(material);
        this.blocks[1] = new Square();
        this.blocks[1].setPositionX(1);
        this.blocks[1].setMaterial(material);
        this.blocks[2] = new Square();
        this.blocks[2].setPositionX(1);
        this.blocks[2].setPositionY(1);
        this.blocks[2].setMaterial(material);
        this.blocks[3] = new Square();
        this.blocks[3].setPositionX(-1);
        this.blocks[3].setMaterial(material);
    }
    moveDown() {
        for (let i = 0; i < this.blocks.length; i++) {
            this.blocks[i].setPositionY(-1);
        }
    }
    moveLeft() {
        for (let i = 0; i < this.blocks.length; i++) {
            this.blocks[i].setPositionX(1);
        }
    }
    moveRight() {
        for (let i = 0; i < this.blocks.length; i++) {
            this.blocks[i].setPositionX(-1);
        }
    }
    moveZNeg() {
        for (let i = 0; i < this.blocks.length; i++) {
            this.blocks[i].setPositionZ(-1);
        }
    }
    moveZPos() {
        for (let i = 0; i < this.blocks.length; i++) {
            this.blocks[i].setPositionZ(1);
        }
    }
    checkRight(grid) {
        for (let i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].getPositionX() === 0 || grid[this.blocks[i].getPositionY()][this.blocks[i].getPositionZ()][this.blocks[i].getPositionX() - 1] !== null) {
                return true;
            }
        }
        return false;
    }
    checkLeft(grid) {
        for (let i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].getPositionX() === 10 || grid[this.blocks[i].getPositionY()][this.blocks[i].getPositionZ()][this.blocks[i].getPositionX() + 1] !== null) {
                return true;
            }
        }
        return false;
    }
    checkZNeg(grid) {
        for (let i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].getPositionZ() === 0 || grid[this.blocks[i].getPositionY()][this.blocks[i].getPositionZ() - 1][this.blocks[i].getPositionX()] !== null) {
                return true;
            }
        }
        return false;
    }
    checkZPos(grid) {
        for (let i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].getPositionZ() === 10 || grid[this.blocks[i].getPositionY()][this.blocks[i].getPositionZ() + 1][this.blocks[i].getPositionX()] !== null) {
                return true;
            }
        }
        return false;
    }
    checkUp() {
        for (let i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].getPositionY() >= 10) {
                return true;
            }
        }
        return false;
    }
    rotateX(grid) {
        var newPositions = [];
        for (let i = 0; i < this.blocks.length; i++) {
            var x = this.blocks[i].getPositionX() - this.blocks[0].getPositionX();
            var y = this.blocks[i].getPositionY() - this.blocks[0].getPositionY();
            var z = this.blocks[i].getPositionZ() - this.blocks[0].getPositionZ();
            var newPos = new Vector3(this.blocks[0].getPositionX() + x, this.blocks[0].getPositionY() - z, this.blocks[0].getPositionZ() + y);
            newPositions[i] = newPos;
        }
        if (this.checkRotation(grid, newPositions)) {
            for (let i = 0; i < this.blocks.length; i++) {
                this.blocks[i].setPosition(newPositions[i]);
            }
        }
    }
    rotateY(grid) {
        var newPositions = [];
        for (let i = 0; i < this.blocks.length; i++) {
            var x = this.blocks[i].getPositionX() - this.blocks[0].getPositionX();
            var y = this.blocks[i].getPositionY() - this.blocks[0].getPositionY();
            var z = this.blocks[i].getPositionZ() - this.blocks[0].getPositionZ();
            var newPos = new Vector3(this.blocks[0].getPositionX() - z, this.blocks[0].getPositionY() + y, this.blocks[0].getPositionZ() + x);
            newPositions[i] = newPos;
        }
        if (this.checkRotation(grid, newPositions)) {
            for (let i = 0; i < this.blocks.length; i++) {
                this.blocks[i].setPosition(newPositions[i]);
            }
        }
    }
    rotateZ(grid) {
        var newPositions = [];
        for (let i = 0; i < this.blocks.length; i++) {
            var x = this.blocks[i].getPositionX() - this.blocks[0].getPositionX();
            var y = this.blocks[i].getPositionY() - this.blocks[0].getPositionY();
            var z = this.blocks[i].getPositionZ() - this.blocks[0].getPositionZ();
            var newPos = new Vector3(this.blocks[0].getPositionX() - y, this.blocks[0].getPositionY() + x, this.blocks[0].getPositionZ() + z);
            newPositions[i] = newPos;
        }
        if (this.checkRotation(grid, newPositions)) {
            for (let i = 0; i < this.blocks.length; i++) {
                this.blocks[i].setPosition(newPositions[i]);
            }
        }
    }
    checkRotation(grid, newPositions) {
        for (let newPos of newPositions) {
            if (newPos.x > 10 || newPos.x < 0 || newPos.z > 10 || newPos.z < 0 || grid[newPos.y][newPos.z][newPos.x] !== null) {
                return false;
            }
        }
        return true;
    }
}
export { lShape };
