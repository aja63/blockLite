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
/*  adds zero to start      if(idTag.length < 2){idTag = "0".concat(idTag)};*/
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
    enemyStartPos = document.getElementsByClassName("boardPiece");
    for(x =0; x<0; x++) {
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


//bullets
const bulletCreation = function createBullet(dir){
            var bullet = document.createElement("div");
            bullet.classList.add("bullet");
            bullet.classList.add(dir.toString());
            return bullet;
        };



const bulletMovement = function bulletPathing(){
    var bulletList = document.getElementsByClassName("bullet");
    for (x=0; x < bulletList.length; x++){
        var move = parseInt(bulletList[x].classList[1]);
        var startPos = parseInt(bulletList[x].parentNode.id);
        move = startPos+move;
        document.getElementById(move.toString()).appendChild(bulletList[x]);
        if (bulletList[x].parentNode.id.toString().length < 2 && bulletList[x].classList[1] == "-10"){bulletList[x].remove()};
        if (bulletList[x].parentNode.id.toString().endsWith("0") == true && bulletList[x].classList[1] == "-1"){bulletList[x].remove()};
        if(parseInt(bulletList[x].parentNode.id) > 90 &&  bulletList[x].classList[1] == "10"){bulletList[x].remove()};
        if (bulletList[x].parentNode.id.toString().endsWith("9") == true && bulletList[x].classList[1] == "1"){bulletList[x].remove()};
    }
    };

setInterval(bulletMovement, 250);



const fire = function fire(e){
    if (e.key == "i"){
        var startPos = document.getElementById("player").parentNode.id;
        startPos = parseInt(startPos)-10;
        startPos = startPos.toString();
        document.getElementById(startPos).appendChild(bulletCreation(-10));
    }
    if (e.key == "j"){
        var startPos = document.getElementById("player").parentNode.id;
        startPos = parseInt(startPos)-1;
        startPos = startPos.toString();
        document.getElementById(startPos).appendChild(bulletCreation(-1));
    }
    if(e.key == "k"){
        var startPos = document.getElementById("player").parentNode.id;
        startPos = parseInt(startPos)+10;
        startPos = startPos.toString();
        document.getElementById(startPos).appendChild(bulletCreation(+10));
    }
    if(e.key == "l"){
        var startPos = document.getElementById("player").parentNode.id;
        startPos = parseInt(startPos)+1;
        startPos = startPos.toString();
        document.getElementById(startPos).appendChild(bulletCreation(+1));
    }
};

document.addEventListener("keydown", fire);

//collision detection

/*
const playerDeath = function collision(){
    var player = document.getElementById("player");
    var playerPosition = player.parentNode.id;
    if(document.getElementById(playerPosition).childElementCount > 1){
        document.body.removeChild(document.getElementById("board"));
        playerPos = "55";
    }
};


setInterval(playerDeath, 10);
*/


//gameOver
