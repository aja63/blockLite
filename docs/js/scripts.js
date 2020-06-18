//debug functions && const
const test = document.getElementById("test");



//global functions
function moveLeft(object) {
    var currentPos = object.parentNode.id;
    if (currentPos.includes("0") == false) {
        var move = parseInt(currentPos) - 1;
        document.getElementById(move.toString()).appendChild(object);
    }
};
function moveRight(object) {
    var currentPos = object.parentNode.id;
    if (currentPos[1].includes("9") == false) {
        var move = parseInt(currentPos) + 1;
        document.getElementById(move.toString()).appendChild(object);
    }
};
function moveUp(object){
    var currentPos = object.parentNode.id;
    if (currentPos.length == 2) {
        var move = parseInt(currentPos) - 10;
        document.getElementById(move.toString()).appendChild(object);
    }
};
function moveDown(object) {
    var currentPos = object.parentNode.id;
    if (currentPos[0].includes("9") == false) {
        var move = parseInt(currentPos) + 10;
        document.getElementById(move.toString()).appendChild(object);
    }
};
function createBullet(pos){
    var bullet = document.createElement("div");
    bullet.className = "bullet";
    document.getElementById(pos).appendChild(bullet);
    return bullet;

};
function fireBullet(creator, dir, move){
    var startPos = creator.parentNode.id;
    startPos = parseInt(startPos) + dir;
    var bullet = createBullet(startPos.toString());
    setInterval(function() {move(bullet)}, 100)
};


//load game
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
        if (x<10||x>=90||x.toString()[1]=="9"||x.toString()[1]=="0"){square.classList.add("edge")}else{square.classList.add("middle")};
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

function loadEnemy() {
    setInterval(function () {
        var enemy = document.createElement("div");
        enemy.className = "enemy";
        var randomSpawn = document.getElementsByClassName("middle")[Math.floor(Math.random() * 64)];
        randomSpawn.appendChild(enemy);

    }, 2000);
};





// player control
const playerMove = function movePlayer(input){
    const player = document.getElementById("player");
    if(input.key == "w"){moveUp(player)};
    if(input.key =="a"){moveLeft(player)};
    if(input.key == "s"){moveDown(player)};
    if(input.key == "d"){moveRight(player)};
};

const playerAbility = function abilityHandeler(input){
    const player = document.getElementById("player");
    if(input.key == "i"){fireBullet(player, -10,  moveUp)};
    if(input.key == "j"){fireBullet(player, -1,  moveLeft)};
    if(input.key == "k"){fireBullet(player, 10,  moveDown)};
    if(input.key == "l"){fireBullet(player, 1,  moveRight)};

};

document.addEventListener("keydown", playerAbility);
document.addEventListener("keydown", playerMove);



//collision
const destroyBullet = function bulletDestruction(){
    var bullets = document.getElementsByClassName("bullet");
    for (x=0;x<bullets.length;x++){
        var parent = bullets[x].parentNode;
        if(parent.classList.contains("edge") == true){parent.removeChild(bullets[x])};
    }
};
setInterval(destroyBullet, 200);

const enemyDeath = function enemyHit(){
    var enemies = document.getElementsByClassName("enemy");
    for(x=0;x<enemies.length;x++){
        var parent = enemies[x].parentNode;
        if(parent.childNodes[parent.childNodes.length -1].className == "bullet"){test.innerHTML = parseInt(test.innerText)+1; parent.removeChild(enemies[x])};
    }
};
setInterval(enemyDeath, 1);

const playerDeath = function playerHit(){
    var player = document.getElementById("player");
    var playerSpace = document.getElementById(player.parentNode.id);
    for (x=0;x<playerSpace.childNodes.length;x++){
        if (playerSpace.childNodes[x].className == "enemy"){playerSpace.removeChild(player)}
    }
};
setInterval(playerDeath, 1);