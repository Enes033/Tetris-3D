import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, Color4, Color3} from "@babylonjs/core";
import { GridMaterial } from "@babylonjs/materials";
import { TextBlock, Control, AdvancedDynamicTexture } from "@babylonjs/gui";
import { lineShape } from "./lineShape";
import { tShape } from "./tShape";
import { lShape } from "./lShape";

class App {
    constructor() {
        
        var canvas = document.createElement("canvas");
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);
        scene.clearColor = new Color4(0,0,0,1);

        var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 25, new Vector3(5,5,5), scene)
        camera.upperBetaLimit = Math.PI / 1.8;
        camera.attachControl(canvas, true);
        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

        var UI = AdvancedDynamicTexture.CreateFullscreenUI("UI");

        var score: number = 0;
        var scoreText = new TextBlock("scoreText");
        scoreText.text = `Score: ${score}`;
        scoreText.color = "white";
        scoreText.fontWeight = "600";
        scoreText.width = "350px";
        scoreText.height = "60px";
        scoreText.fontSize = "48px";
        scoreText.fontFamily = "Lucida Sans";
        scoreText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        scoreText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        scoreText.paddingRight = "10px";
        scoreText.paddingTop = "10px"; 
        UI.addControl(scoreText);

        var shape: any;

        function Grid():GridMaterial{
            let grid = new GridMaterial("grid", scene);
            grid.lineColor = Color3.White();
            grid.majorUnitFrequency = 1;
            grid.gridOffset = new Vector3(0.5, 0.5, 0.5);
            return grid;
        } 

        var ground: Mesh = MeshBuilder.CreateGround("ground",{width: 11, height: 11});
        ground.position = new Vector3(5,0.5,5);
        ground.material = Grid();

        var side1: Mesh = MeshBuilder.CreatePlane("side1",{width:11, height: 11});
        side1.rotation.y = Math.PI / 2;
        side1.position = new Vector3(10.5,6,5);
        side1.material = Grid();

        var side2: Mesh = MeshBuilder.CreatePlane("side2",{width:11, height: 11});
        side2.rotation.y = -Math.PI / 2;
        side2.position = new Vector3(-0.5,6,5);
        side2.material = Grid();

        var side3: Mesh = MeshBuilder.CreatePlane("side3",{width:11, height: 11});
        side3.position = new Vector3(5,6,10.5);
        side3.material = Grid();

        var side4: Mesh = MeshBuilder.CreatePlane("side4",{width:11, height: 11});
        side4.rotation.y = Math.PI;
        side4.position = new Vector3(5,6,-0.5);
        side4.material = Grid();

        const grid = [];
        for (let y = 0; y <= 11; y++) {
            const layer = [];
            if(y === 0){
                for (let z = 0; z < 11; z++) {
                    const row = [];
                    for(let x = 0; x < 11; x++){
                        row[x] = 1;
                    }
                    layer.push(row);
                }
                grid.push(layer);
                continue;
            }
            for (let z = 0; z < 11; z++) {
                const row = [];
                for(let x = 0; x < 11; x++){
                    row[x] = null;
                }
                layer.push(row);
            }
            grid.push(layer);
        }

        function collisionY(): boolean{
            for(let i=0; i< shape.blocks.length; i++){
                const posY = shape.blocks[i].getPositionY();
                const posZ = shape.blocks[i].getPositionZ();
                const posX = shape.blocks[i].getPositionX();
                
                if(grid[posY-1][posZ][posX] !== null){
                changeData();
                return true;
                }
            }
            return false;
        }

        function changeData(): void{
            for(let i = 0; i < shape.blocks.length; i++){
                if(!shape.checkUp()){
                    grid[shape.blocks[i].getPositionY()][shape.blocks[i].getPositionZ()][shape.blocks[i].getPositionX()] = shape.blocks[i];
                    //console.log(grid);
                    checkRow();
                }
                else{
                    for(let i = 0; i < shape.blocks.length; i++){
                        grid[shape.blocks[i].getPositionY()][shape.blocks[i].getPositionZ()][shape.blocks[i].getPositionX()] = shape.blocks[i];  
                    }
                    gameOver();
                    break;
                }
                
            }
            
        }
        
        function updateGame(loop: number): void{
            for(let y = loop; y < grid.length; y++){
                for(let z = 0; z < grid[y].length; z++){
                    for(let x = 0; x < grid[y][z].length; x++){
                        if(y === loop){
                            if(grid[y][z][x]){
                                grid[y][z][x].square.dispose();
                            }
                            grid[y][z][x] = null;
                        }
                        else{
                            if(grid[y][z][x]){
                                grid[y][z][x].setPositionY(-1);
                                grid[y-1][z][x] = grid[y][z][x];
                                grid[y][z][x] = null;
                            }
                        }
                    }
                }
            }
            score += 121;
            scoreText.text = `Score: ${score}`;
        }

        function checkRow(): void {
            for (let y = 1; y < grid.length - 1; y++) {
                let rowComplete = true;
                for (let z = 0; z < grid[y].length; z++) {
                    for (let x = 0; x < grid[y][z].length; x++) {
                        if (grid[y][z][x] === null) {
                            rowComplete = false;
                            break;
                        }
                    }
                    if (!rowComplete) {
                        break;
                    }
                }
                if (rowComplete) {
                    updateGame(y);
                }
            }
        }
        

        document.addEventListener("keypress", (e) => {
            if(e.key === 'j'){
                shape.rotateX(grid);
            }
            else if(e.key === 'k'){
                shape.rotateY(grid);
            }
            else if(e.key === 'l'){
                shape.rotateZ(grid);
            }
            else if(e.key === 'w' && !shape.checkZNeg(grid)){
                shape.moveZNeg();
            }
            else if(e.key === 's' && !shape.checkZPos(grid)){
                shape.moveZPos();
            }
            else if(e.key === 'a' && !shape.checkLeft(grid)){
                shape.moveLeft();
            }
            else if(e.key === 'd' && !shape.checkRight(grid)){
                shape.moveRight();
            }
        });

        function newShape(): void{
            var index: number = Math.floor(Math.random() * 3);
                switch(index){
                    case 0:
                        shape = new lineShape();
                        break;
                    case 1:
                        shape = new tShape();
                        break;
                    case 2:
                        shape = new lShape();
                        break;
                }
        }

        let counter: number = 0;
        function move(): void {
            counter += engine.getDeltaTime();
            if(counter >= 1500){
                shape.moveDown();
                counter = 0;
            }
        }

        function gameOver(){
                finalScore.textContent = `Score: ${score}`;
                gameOverScr.style.display = "flex";
                engine.stopRenderLoop();
                console.log("Game Over");
        }

        restartBtn.addEventListener("click", () => {
            for(let y = 1; y < grid.length; y++){
                for(let z = 0; z < grid[y].length; z++){
                    for(let x = 0; x < grid[y][z].length; x++){
                            if(grid[y][z][x]){
                                grid[y][z][x].square.dispose();
                            }
                            grid[y][z][x] = null;
                    }
                }
            }

            score = 0;
            scoreText.text = `Score: ${score}`;

            gameOverScr.style.display = "none";

            engine.runRenderLoop(() => {
                scene.render();
                if((!shape) || collisionY()){
                    newShape();
                }
                else if(shape){
                    move();
                }
            });
        });

        

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.keyCode === 79) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        
        engine.runRenderLoop(() => {
            scene.render();
            if((!shape) || collisionY()){
                newShape();
            }
            else if(shape){
                move();
            }
        });
    }
}

var startBtn = document.getElementById("startBtn");
var startScreen = document.getElementById("startScreen");

var gameOverScr = document.getElementById("gameOver");
var finalScore = document.getElementById("finalScore");
var restartBtn = document.getElementById("restart");

gameOverScr.style.display = "none";

startBtn.addEventListener("click", () => {
    startScreen.style.display = "none"
    new App();
});