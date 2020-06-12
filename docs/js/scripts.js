//debug vars
const test = document.getElementById("debug");


//game loading


function loadLevel(){
    var board = document.createElement("div");
    board.id = "board";
    document.body.appendChild(board);
}


function loadBoard(){
    document.getElementById("newGame").style.zIndex = "-1";
    for (x=0; x<=99; x++) {
        var square = document.createElement("div");
        square.className = "boardSpace";
        var idTag = x.toString();
        square.id = idTag;
        document.getElementById("board").appendChild(square);

    }
}

function loadPlayer(){
    var player = document.createElement("div");
    player.id = "player";
    document.getElementById("55").appendChild(player);

}

function loadEnemy(){
    enemyStartPos = ["0","9","90","99"]
    for(x =0; x<7; x++) {
        var enemy = document.createElement("div");
        enemy.className = "enemy";
        var idTag = "e" + x.toString();
        enemy.id = idTag;
        document.getElementById(Math.floor(Math.random() * 100)).appendChild(enemy);
    }

}



//player movement

var playerPos = "55";

const playerMovement = function move(e) {
    if (e.key == "w" && playerPos.length > 1 ){
        var updatePos = parseInt(playerPos)-10;
        playerPos = updatePos.toString();
        document.getElementById(playerPos).appendChild(document.getElementById("player"));
    }
    else if (e.key == "a" && playerPos.includes("0") == false){
        var updatePos = parseInt(playerPos)-1;
        playerPos = updatePos.toString();
        document.getElementById(playerPos).appendChild(document.getElementById("player"));
    }
    else if (e.key == "s" && parseInt(playerPos) < 90){
        var updatePos = parseInt(playerPos)+10;
        playerPos = updatePos.toString();
        document.getElementById(playerPos).appendChild(document.getElementById("player"));

    }
    else if (e.key == "d" && playerPos.endsWith("9") == false){
        var updatePos = parseInt(playerPos)+1;
        playerPos = updatePos.toString();
        document.getElementById(playerPos).appendChild(document.getElementById("player"));

    }

};
document.addEventListener("keydown", playerMovement);


//enemy movement
const enemyMovement = function enemyMove(){
    var dir = [1,-1,10,-10];
    var enemies = document.getElementsByClassName("enemy");
    for (x = 0; x < enemies.length; x++){
        var pos = enemies[x].parentNode.id;
        pos = parseInt(pos)+dir[Math.floor(Math.random() * 4)];
        document.getElementById(pos.toString()).appendChild(enemies[x]);
    }


};

setInterval(enemyMovement, 300);


//collision detection

const checkCollision = function collision(){
    var player = document.getElementById("player");
    var playerPosition = player.parentNode.id;
    if(document.getElementById(playerPosition).childElementCount > 1){
        document.body.removeChild(document.getElementById("board"));
        playerPos = "55";
    }
};


setInterval(checkCollision, 10);


//gameOver
