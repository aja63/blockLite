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
let level = 1;

function loadGame(){
    hasKey = "no";
    loadLevel();
    loadBoard();
    loadPlayer();
    loadEnemy();
    win()
}

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
        square.classList.add("lvl"+level.toString().slice(-1));
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
    player.addEventListener("onload", pickUpItem());
    document.getElementById("55").appendChild(player);

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
function loadEnemy(){
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
};



// player control
/*function createPlayerAttack(creator, dir) {
    var creatorPos = parseInt(creator.parentNode.id);
        var pos = creatorPos + dir;
        test.innerText += "shot-";
        pos.toString();
        var attack = document.createElement("div");
        attack.className = "attack";
        document.getElementById(pos).appendChild(attack);
        return attack;

};*/
function createPlayerAttack(creator, dir){
    var creatorPos = parseInt(creator.parentNode.id);
    var pos = creatorPos + dir;
    pos.toString();
    var attack = document.createElement("div");
    attack.className = "attack";
    document.getElementById(pos).appendChild(attack);
    destroyPlayerAttack(attack)
    for(x=1;x<inventory["range"] && x<4;x++){
        pos = parseInt(pos)+dir;
        pos.toString();
        var attack = document.createElement("div");
        attack.className = "attack";
        document.getElementById(pos).appendChild(attack);
        destroyPlayerAttack(attack);
    }
}
function destroyPlayerAttack(attack){
    setTimeout(function(){attack.remove()}, 150);
}

function teleportToNextLevel(player){
    level++;
    test.innerText += level;
    clear();
    document.getElementById("board").remove();
    loadGame();
};

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
    if(input.key =="p"){if(inventory["key"] == 1){teleportToNextLevel(player); inventory["key"] = 0}};
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
        if(enemy.childNodes.length != 0){parent.appendChild(enemy.childNodes[0])};
        if(parent.childNodes[parent.childNodes.length -1].className == "attack"){test.innerHTML = parseInt(test.innerText)+1; parent.removeChild(enemy)};
    },25);
};

const playerDeath = function playerHit(){
    setInterval(function(){
    var player = document.getElementById("player");
    var playerSpace = document.getElementById(player.parentNode.id);
    for (x=0;x<playerSpace.childNodes.length;x++){
        if (playerSpace.childNodes[x].className == "enemyBullet"){endGame();}
        }
    }, 1);
};

let inventory = {
    "key": 0,
    "range": 1,
    "bombs": 1
};


function pickUpItem(){
    setInterval(function(){
    var playerPos = document.getElementById("player").parentNode;
    if (playerPos.childNodes[0].className == "key"){
        inventory["key"] = 1;
        playerPos.childNodes[0].remove();
        }
    if(playerPos.childNodes[0].className == "powerUp"){
        inventory["range"]++;
        test.innerText += inventory["range"];
        playerPos.childNodes[0].remove();
    }
    }, 50);
};
function destroyKeys(keys){
  for(x=0;x<keys.length;x++){
      keys[x].remove();
  }
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
    clear();
    level = 1;
    document.getElementById("board").remove();
    inventory["range"] = 1;
    inventory["bombs"]=1;
    inventory["key"]=0;
}

function win() {
    if (level == 100){
        endGame()
        var youwin = document.createElement("p");
        youwin.innerText += "Retire";
        youwin.id = "youWin";
        document.body.appendChild(youwin);
        document.getElementById("newGame").remove();
    }
}