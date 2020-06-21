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

//load game
function loadLevel(){
    var board = document.createElement("div");
    board.id = "board";
    document.body.appendChild(board);
};


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
};


function loadPlayer(){
    var player = document.createElement("div");
    player.id = "player";
    player.addEventListener("onload", playerDeath());
    document.getElementById("55").appendChild(player);

};

function loadEnemy() {
    const loadEnemyTimer = setInterval(function () {
        var enemy = document.createElement("div");
        enemy.className = "enemy";
        enemy.addEventListener("onload", enemyDeath(enemy));
        var randomSpawn = document.getElementsByClassName("middle")[Math.floor(Math.random() * 64)];
        randomSpawn.appendChild(enemy);
        enemy.addEventListener("onload", enemyAttack(enemy));

    }, 1000);
};





// player control
function createPlayerAttack(creator, dir){
    var creatorPos = parseInt(creator.parentNode.id);
    var pos = creatorPos+dir;
    pos.toString();
    var attack = document.createElement("div");
    attack.className = "attack";
    document.getElementById(pos).appendChild(attack);
    return attack;
}
function destroyPlayerAttack(attack){
    setTimeout(function(){attack.remove()}, 150);
}


const playerMove = function movePlayer(input){
    const player = document.getElementById("player");
    if(input.key == "w"){moveUp(player)};
    if(input.key =="a"){moveLeft(player)};
    if(input.key == "s"){moveDown(player)};
    if(input.key == "d"){moveRight(player)};
};

const playerAbility = function abilityHandeler(input){
    const player = document.getElementById("player");
    if(input.key == "i"){var attack = createPlayerAttack(player, -10); destroyPlayerAttack(attack)};
    if(input.key == "j"){var attack = createPlayerAttack(player, -1); destroyPlayerAttack(attack)};
    if(input.key == "k"){var attack = createPlayerAttack(player, 10); destroyPlayerAttack(attack)};
    if(input.key == "l"){var attack = createPlayerAttack(player, 1); destroyPlayerAttack(attack)};
};

document.addEventListener("keydown", playerAbility);
document.addEventListener("keydown", playerMove);



//collision

/*const enemyDeath = function enemyHit(){
    setInterval(function(){
    var enemies = document.getElementsByClassName("enemy");
    for(x=0;x<enemies.length;x++){
        var parent = enemies[x].parentNode;
        if(parent.childNodes[parent.childNodes.length -1].className == "bullet"){test.innerHTML = parseInt(test.innerText)+1; parent.removeChild(enemies[x])};
    }
    },100);
};*/
const enemyDeath = function enemyHit(enemy){
    setInterval(function(){
        var parent = enemy.parentNode;
        if(parent.childNodes[parent.childNodes.length -1].className == "attack"){test.innerHTML = parseInt(test.innerText)+1; parent.removeChild(enemy)};
    },25);
};

const playerDeath = function playerHit(){
    setInterval(function(){
    var player = document.getElementById("player");
    var playerSpace = document.getElementById(player.parentNode.id);
    for (x=0;x<playerSpace.childNodes.length;x++){
        if (playerSpace.childNodes[x].className == "enemyBullet"){endGame()}
        }
    }, 1);
};


//enemy functions

function createEnemyBullets(pos){
    var bullet = createBullet(pos);
    bullet.className = "enemyBullet";
    return bullet;
};

function enemyAttack(creator) {setInterval(function(){
    var startPos = parseInt(creator.parentNode.id);
    var attacks = [];
    attacks.push(startPos+11);
    attacks.push(startPos+9);
    attacks.push(startPos-11);
    attacks.push(startPos-9);
    for (x=0;x<attacks.length;x++){
        var bullet = createEnemyBullets(attacks[x]);
        destroyEnemyBullet(bullet);
    }
}, 1000);
};

function destroyEnemyBullet(bullet) {
    setTimeout(function () {
        bullet.remove();
    }, 500);
};

//endgame
function clear(w) {
    w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }
}

function endGame() {
    for(x=0;x<document.getElementsByClassName("enemy").length;x++){test.innerText += document.getElementsByClassName("enemy")[x].id};
    clear();
    document.getElementById("board").remove();
}
