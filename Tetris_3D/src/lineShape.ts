import { Mesh, MeshBuilder, Vector3, StandardMaterial, Color3 } from "@babylonjs/core";
import { Square } from "./square";

class lineShape {


    mainSquare: Square = new Square();
    blocks = [];

    constructor() {
        this.blocks[0] = this.mainSquare;
        var material = new Color3(0,0,1);
        this.mainSquare.setMaterial(material);

        for(let i=1; i<=2; i++){
            this.blocks[i] = new Square();
            this.blocks[i].setPositionX(i);
            this.blocks[i].setMaterial(material);
            this.blocks[i+2] = new Square();
            this.blocks[i+2].setPositionX(-i);
            this.blocks[i+2].setMaterial(material);
        }

    }

    moveDown(): void{
        for(let i=0; i< this.blocks.length; i++) {
            this.blocks[i].setPositionY(-1);
        }
    }

    moveLeft(): void{
        for(let i=0; i< this.blocks.length; i++) {
            this.blocks[i].setPositionX(1);
        }
    }

    moveRight(): void{
        for(let i=0; i< this.blocks.length; i++) {
            this.blocks[i].setPositionX(-1);
        }
    }

    moveZNeg(): void{
        for(let i=0; i< this.blocks.length; i++) {
            this.blocks[i].setPositionZ(-1);
        }
    }

    moveZPos(): void{
        for(let i=0; i< this.blocks.length; i++) {
            this.blocks[i].setPositionZ(1);
        }
    }

    checkRight(grid: any[]): boolean{
        for(let i=0; i< this.blocks.length; i++) {
            if(this.blocks[i].getPositionX() === 0  || grid[this.blocks[i].getPositionY()][this.blocks[i].getPositionZ()][this.blocks[i].getPositionX() - 1] !== null){
                return true;
            }
        }
        return false;
    }

    checkLeft(grid: any[]): boolean{
        for(let i=0; i< this.blocks.length; i++) {
            if(this.blocks[i].getPositionX() === 10 || grid[this.blocks[i].getPositionY()][this.blocks[i].getPositionZ()][this.blocks[i].getPositionX() + 1] !== null){
                return true;
            }
        }
        return false;
    }

    checkZNeg(grid: any[]): boolean{
        for(let i=0; i< this.blocks.length; i++) {
            if(this.blocks[i].getPositionZ() === 0 || grid[this.blocks[i].getPositionY()][this.blocks[i].getPositionZ() - 1][this.blocks[i].getPositionX()] !== null){
                return true;
            }
        }
        return false;
    }

    checkZPos(grid: any[]): boolean{
        for(let i=0; i< this.blocks.length; i++) {
            if(this.blocks[i].getPositionZ() === 10 || grid[this.blocks[i].getPositionY()][this.blocks[i].getPositionZ() + 1][this.blocks[i].getPositionX()] !== null){
                return true;
            }
        }
        return false;
    }

    checkUp(): boolean{
        for(let i=0; i< this.blocks.length; i++) {
            if(this.blocks[i].getPositionY() >= 10){
                return true;
            }
        }
        return false;
    }

    rotateX(grid: any[]): void{
        var newPositions: Vector3[] = [];

        for(let i = 0; i < this.blocks.length; i++){
           var x = this.blocks[i].getPositionX() - this.blocks[0].getPositionX();
           var y = this.blocks[i].getPositionY() - this.blocks[0].getPositionY();
           var z = this.blocks[i].getPositionZ() - this.blocks[0].getPositionZ();
           var newPos = new Vector3(this.blocks[0].getPositionX() + x, this.blocks[0].getPositionY() - z, this.blocks[0].getPositionZ() + y);
           newPositions[i] = newPos;
        }

        if(this.checkRotation(grid,newPositions)){
            for(let i = 0; i < this.blocks.length; i++){
                this.blocks[i].setPosition(newPositions[i]);
            }
        }
    }

    rotateY(grid: any[]): void{
        var newPositions: Vector3[] = [];

        for(let i = 0; i < this.blocks.length; i++){
           var x = this.blocks[i].getPositionX() - this.blocks[0].getPositionX();
           var y = this.blocks[i].getPositionY() - this.blocks[0].getPositionY();
           var z = this.blocks[i].getPositionZ() - this.blocks[0].getPositionZ();
           var newPos = new Vector3(this.blocks[0].getPositionX() - z, this.blocks[0].getPositionY() + y, this.blocks[0].getPositionZ() + x);
           newPositions[i] = newPos;
        }

        if(this.checkRotation(grid,newPositions)){
            for(let i = 0; i < this.blocks.length; i++){
                this.blocks[i].setPosition(newPositions[i]);
            }
        }
    }

    rotateZ(grid: any[]): void{
        var newPositions: Vector3[] = [];

        for(let i = 0; i < this.blocks.length; i++){
           var x = this.blocks[i].getPositionX() - this.blocks[0].getPositionX();
           var y = this.blocks[i].getPositionY() - this.blocks[0].getPositionY();
           var z = this.blocks[i].getPositionZ() - this.blocks[0].getPositionZ();
           var newPos = new Vector3(this.blocks[0].getPositionX() - y, this.blocks[0].getPositionY() + x, this.blocks[0].getPositionZ() + z);
           newPositions[i] = newPos;
        }

        if(this.checkRotation(grid,newPositions)){
            for(let i = 0; i < this.blocks.length; i++){
                this.blocks[i].setPosition(newPositions[i]);
            }
        }
    }

    checkRotation(grid: any[], newPositions: Vector3[]): boolean{
        for(let newPos of newPositions){
            if(newPos.x > 10 || newPos.x < 0 || newPos.z > 10 || newPos.z < 0 || grid[newPos.y][newPos.z][newPos.x] !== null){
                return false;
            }
        }

        return true;
    }

}

export {lineShape};