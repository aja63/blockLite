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
    setInterval(function() {move(bullet)}, 100);
};
function createMeleeAttack(list){
    const attack = [];
    for(x=0;x<list.length;x++){
        attack.push(createBullet(list[x]));
    }
    return attack;
};
function meleeAttack(creator){
    var startPos = parseInt(creator.parentNode.id)-11;
    var aoe = [];
    for (x=0;x<3;x++){aoe.push(startPos+x)};
    aoe.push(startPos+10);
    aoe.push(startPos+12);
    for(x=20;x<23;x++){aoe.push(startPos+x)};
    var attack = createMeleeAttack(aoe);
    setInterval(function(){
        for (x=0;x<attack.length;x++){attack[x].remove()}
    }, 500);

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
    document.getElementById("55").appendChild(player);

};

function loadEnemy() {
    setInterval(function () {
        var enemy = document.createElement("div");
        enemy.className = "enemy";
        enemy.addEventListener("onload", enemyDeath(enemy));
        var randomSpawn = document.getElementsByClassName("middle")[Math.floor(Math.random() * 64)];
        randomSpawn.appendChild(enemy);
        enemy.addEventListener("onload", enemyAttack(enemy));

    }, 1000);
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
    if(input.key == "e"){meleeAttack(player)};
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
        if(parent.childNodes[parent.childNodes.length -1].className == "bullet"){test.innerHTML = parseInt(test.innerText)+1; parent.removeChild(enemy)};
    },25);
};

const playerDeath = function playerHit(){
    var player = document.getElementById("player");
    var playerSpace = document.getElementById(player.parentNode.id);
    for (x=0;x<playerSpace.childNodes.length;x++){
        if (playerSpace.childNodes[x].className == "enemyBullet"){document.getElementById("board").remove()}
    }
};
setInterval(playerDeath, 1);


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
}, 3000);
};

function destroyEnemyBullet(bullet) {
    setTimeout(function () {
        bullet.remove();
    }, 2000);
};

/*function loadEnemy() {
    const loadEnemyTimer = setInterval(function () {
        var enemy = document.createElement("div");
        enemy.className = "enemy";
        enemy.addEventListener("onload", enemyDeath(enemy));
        var randomSpawn = document.getElementsByClassName("middle")[Math.floor(Math.random() * 64)];
        randomSpawn.appendChild(enemy);
        enemy.addEventListener("onload", enemyAttack(enemy));

    }, 1000);
};*/
/*function loadEnemy(){
    for(x=1;x<(level*3+1);x++) {
        if (x / (level * 3) > Math.random()) {
            setTimeout(function () {
                var enemy = document.createElement("div");
                enemy.className = "keyHolder enemy";
                var key = document.createElement("div");
                key.className = "key";
                enemy.appendChild(key);
                enemy.addEventListener("onload", enemyDeath(enemy));
                var randomSpawn = document.getElementsByClassName("middle")[Math.floor(Math.random() * 64)];
                randomSpawn.appendChild(enemy);
                enemy.addEventListener("onload", enemyAttack(enemy));
            }, x * 1000);
        }
        else if(x / (level * 5) > Math.random() && level > 9) {
            setTimeout(function () {
                var enemy = document.createElement("div");
                enemy.className = "enemy";
                var powerUp = document.createElement("div");
                powerUp.className = "powerUp";
                enemy.appendChild(powerUp);
                enemy.addEventListener("onload", enemyDeath(enemy));
                var randomSpawn = document.getElementsByClassName("middle")[Math.floor(Math.random() * 64)];
                randomSpawn.appendChild(enemy);
                enemy.addEventListener("onload", enemyAttack(enemy));
            }, x * 1000);
        }
        else {
            setTimeout(function () {
                var enemy = document.createElement("div");
                enemy.className = "enemy";
                enemy.addEventListener("onload", enemyDeath(enemy));
                var randomSpawn = document.getElementsByClassName("middle")[Math.floor(Math.random() * 64)];
                randomSpawn.appendChild(enemy);
                enemy.addEventListener("onload", enemyAttack(enemy));
            }, x * 1000);
        }
    }
};*/