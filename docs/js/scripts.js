//constants
const q = document.getElementById("debugText");
const alphabet = ['a','b','c','d','e','f','g','h','i','j'];
let level = 1;
let stageScore = 0;
let score = 0;



//load games functions
function loadGame(){
    clear();
    setInterval(playerDeath, 50);
    loadGameBoard();
    loadPlayer();
    loadEnemies();

}

function loadGameBoard(){
    document.getElementById("newGameButton").style.zIndex = -1;
    let board = document.createElement("div");
    board.id = "gameboard";
    document.body.appendChild(board);
    for(x=0;x<alphabet.length;x++){for(y=0;y<10;y++) {
        var space = createSpace();
        space.id = alphabet[x]+y.toString();
        if (space.id[0] == "a" || space.id[0] == 'j' || space.id[1] == '0' || space.id[1] == '9'){space.classList.add("edge")}
        else{space.classList.add("middle")}
        space.classList.add("level" + level.toString());
        space.addEventListener("onload", checkCollision(space));
        document.getElementById("gameboard").appendChild(space);
    }
    }
}

function createSpace(){
    let space = document.createElement("div");
    space.className = "boardSpace";
    return space;
}

function loadPlayer(){
    const player = document.createElement("div");
    player.id = "player";
    player.className = "player";
    document.getElementById("f6").appendChild(player);
}

function loadEnemies(){
    for(x=1; x< (level*3)+1; x++){
        var midSquares = document.getElementsByClassName("middle");
        var pos = midSquares[Math.floor(Math.random()*64)];
        spawnEnemy(pos, x);
    }
}




//general functions
function getRandomSquare(){
    var midSquares = document.getElementsByClassName("middle");
    return midSquares[Math.floor(Math.random()*64)];
}

function getLeft(id){
    var id0 = id[0];
    var id1 = parseInt(id[1]);
    id1 = (id1-1).toString();
    return id0+id1;
}
function getRight(id){
    var id0 = id[0];
    var id1 = parseInt(id[1]);
    id1 = (id1+1).toString();
    return id0+id1;
}
function getUp(id){
    var id0 = id[0];
    var id1 = parseInt(id[1]);
    id0 = alphabet[alphabet.indexOf(id0)-1];
    return id0+id1;
}
function getDown(id){
    var id0 = id[0];
    var id1 = parseInt(id[1]);
    id0 = alphabet[alphabet.indexOf(id0)+1];
    return id0+id1;
}
function getCircle(id){
    var circle = [];
    circle.push(getUp(id), getUp(getRight(id)), getRight(id), getRight(getDown(id)), getDown(id), getDown(getLeft(id)), getLeft(id), getLeft(getUp(id)));
}
function clear(w) {
    w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }
}

function win(){
    if(level === 10){
        document.getElementById("gameboard").remove();
        document.getElementById("win").innerText = "congrats you won!";
        document.getElementById("win").className = "win";
    }
}





//collision functions
const checkCollision = function(space){
    const collision = setInterval(function() {
        if(space.childNodes.length > 1){collisionHandler(space.childNodes, space)}
    }, )
};



function collisionHandler(objects, space){

    if(objects[0].className == "player" && objects[1].className == "attack"){
        playerHit();
        space.removeChild(objects[1]);
    }

    if(objects[1].className == "player" && objects[0].className =="attack"){
        playerHit();
        space.removeChild(objects[0]);
    }

    if(objects[1].className == "player" && objects[0].classList[0].includes("loot") == true){
        inventory[objects[0].classList[1]]++;
        displayInventory();
        space.removeChild(objects[0]);
    }

    if(objects[1].className == "player" && objects[0].className.includes("enemy") == true){
        melee(objects[0], space);
    }



    if(objects[0].className.includes("enemy") == true && objects[1].className.includes("playerAttack") == true){
        kill(objects[0], space);
    }

    if(objects[1].className == "attack" && objects[0].className.includes("enemy") == true){
        upgradeEnemy(objects[0], space);
    }

    if(objects[0].className.includes("enemy") == true && objects[1].className.includes("enemy") == true){
        upgradeEnemy(objects[0], space);
    }

    if(objects[0].className.includes("enemy") == true && objects[1].includes("loot") == true){
        upgradeEnemy(objects[0], space);
    }

    if(objects[1].className.includes("enemy") == true && objects[0].includes("loot") == true){
        upgradeEnemy(objects[0], space);
    }

    if(objects[0].className.includes("loot") == true && objects[1].className.includes("loot") == true){
        if(inventory["key"] > 0){
            objects[0].remove();
        }
        else{
            objects[1].remove();
        }
    }

    if(objects[0].className.includes("loot") == true && objects[1].className == "attack"){
        objects[1].remove();
    }


};

function playerHit(){
    stats["hp"]--;
    displayInventory();
    document.getElementById("player").style.animationName = "hit";
    setTimeout(function() {document.getElementById("player").style.animationName = ""},750)
}

function kill(object, space){
    checkDrop(space);
    space.removeChild(object);
    object.className = "dead";
}






//player constants
let inventory = {
    //range, distance,projectiles
    "gun": [1,1,1],
    "melee": 0,
    "bomb": 1,
    "key": 0
};

var gunRange = inventory["gun"][0];


let stats = {
    "hp": 5,
    "speed": 1,
};
var hp = stats["hp"];




//player functions
function moveLeft(object){
    var pos = object.parentNode.id;
    if(pos[1] != "0"){var move = parseInt(pos[1])-1} else{var move = "9"}
    pos = pos[0]+move.toString();
    document.getElementById(pos).appendChild(object);
}

function moveRight(object){
    var pos = object.parentNode.id;
    if(pos[1] != "9"){var move = parseInt(pos[1])+1} else{var move = "0"}
    pos = pos[0]+move.toString();
    document.getElementById(pos).appendChild(object);
}

function moveUp(object){
    var pos = object.parentNode.id;
    var move = alphabet.indexOf(pos[0]);
    if(pos[0] != "a"){var move = alphabet[move-1]} else{var move = "j"}
    pos = move+pos[1];
    document.getElementById(pos).appendChild(object);
}

function moveDown(object){
    var pos = object.parentNode.id;
    var move = alphabet.indexOf(pos[0]);
    if(pos[0] != "j"){var move = alphabet[move+1]} else{var move = "a"}
    pos = move+pos[1];
    document.getElementById(pos).appendChild(object);
}


function displayInventory(){
    var display = document.getElementById("display");
    display.innerHTML = "";
    var inventoryKeys = Object.keys(inventory);
    var inventoryValues = Object.values(inventory);
    for(x=0;x<inventoryKeys.length;x++){
        display.innerHTML += inventoryKeys[x]+ ":" + inventoryValues[x]+ "<br>";
    }
    var statsKeys = Object.keys(stats);
    var statsValues = Object.values(stats);
    for(x=0;x<statsKeys.length;x++){
        display.innerHTML += statsKeys[x]+ ":" + statsValues[x]+ "<br>";
    }
}


function form(player){
    if(player.classList.contains("mistForm") == false){player.classList.add("mistForm")};
}

const formCooldown = function testerHandler(){
    player.classList.remove("mistForm");
}

function melee(enemy, space){
    var player = document.getElementById("player");
    if(inventory["melee"] > 0){
        inventory["melee"]--;
        kill(enemy, space);
        displayInventory();
    }
    else{
        playerHit();
        kill(enemy, space);
    }

}



function nextStage(){
    if(inventory["key"] > 0){
        inventory["key"] = 0;
        displayInventory();
        stageScore = 0;
        level++;
        document.getElementById("gameboard").remove();
        loadGame();
    }
    win();

}


function createPlayerAttack(pos){
    let attack = document.createElement("div");
    attack.className = "bullet playerAttack";
    attack.addEventListener("onload", destroyPlayerAttack(attack));
    document.getElementById(pos).appendChild(attack);
    return attack;
}
function destroyPlayerAttack(attack){
    setTimeout(function(){attack.remove()}, 150);
}


function playerAttack(player, e) {
    var x = 0;
    if (e.key == "i") {
        while (x < inventory["gun"][0]) {
            var playerAttack = createPlayerAttack(player.parentNode.id);
            for(i = 0; i<gunRange-x;i++){moveUp(playerAttack)};
            x++
        }
    }
    if (e.key == "k") {
        while (x < inventory["gun"][0]) {
            var playerAttack = createPlayerAttack(player.parentNode.id);
            for(i = 0; i<gunRange-x;i++){moveDown(playerAttack)};
            x++
        }
    }
    if (e.key == "j") {
        while (x < inventory["gun"][0]) {
            var playerAttack = createPlayerAttack(player.parentNode.id);
            for(i = 0; i<gunRange-x;i++){moveLeft(playerAttack)};
            x++
        }
    }
    if (e.key == "l") {
        while (x < inventory["gun"][0]) {
            var playerAttack = createPlayerAttack(player.parentNode.id);
            for(i = 0; i<gunRange-x;i++){moveRight(playerAttack)};
            x++
        }
    }
}


const playerInputHandler = function playerInput(e){
    const player = document.getElementById("player");
    if("ijkl".includes(e.key)){playerAttack(player, e)};
    if(e.key == "a"){var x = 0;while(x<stats["speed"]){moveLeft(player); x++}};
    if(e.key == "d"){var x = 0;while(x<stats["speed"]){moveRight(player); x++}};
    if(e.key == "w"){var x = 0;while(x<stats["speed"]){moveUp(player); x++}};
    if(e.key == "s"){var x = 0;while(x<stats["speed"]){moveDown(player); x++}};
    if(e.key == "q" && player.classList.contains("mistForm") == false){form(player);setTimeout(formCooldown, 2000)};
    if(e.key == "p"){nextStage();};
    if(e.key == "e"){displayInventory()};

}

document.addEventListener("keydown", playerInputHandler);


function playerDeath() {
    if (stats["hp"] < 1) {
        location.reload();
    }
}




//enemy  functions
function spawnEnemy(pos, x){
    setTimeout(function(){
        let spawnVar = Math.random();
        if(spawnVar > .5){
            if(spawnVar > .75){spawnBasic1Enemy(pos)}
            else{spawnBasic2Enemy(pos)}
        }
        else if(spawnVar > .3){
            if(Math.random() > .5){spawnAdvancedEnemy(pos)}else{spawnAdvanced2Enemy(pos)};
        }
        else if(spawnVar > .1){
            spawnUpgradedEnemy();
        }
        else{
            spawnUpgradedEnemy()
        }
        }, x*1000);
}

function spawnBasic1Enemy(pos){
    let enemy = document.createElement("div");
    enemy.className = "enemy basic1";
    pos.appendChild(enemy);
    enemy.addEventListener("onload", basic1AttackListener(pos.id, enemy));
}

function spawnBasic2Enemy(pos){
    let enemy = document.createElement("div");
    enemy.className = "enemy basic2";
    q.innerText += enemy;
    pos.appendChild(enemy);
    enemy.addEventListener("onload", basic2AttackListener(pos.id, enemy));
}

function spawnAdvancedEnemy(pos){
    let enemy = document.createElement("div");
    enemy.className = "enemy advanced";
    q.innerText += enemy;
    pos.appendChild(enemy);
    enemy.addEventListener("onload", advancedEnemyAttackListener(pos.id, enemy));
}

function spawnAdvanced2Enemy(pos){
    let enemy = document.createElement("div");
    enemy.className = "enemy advanced2";
    q.innerText += enemy;
    pos.appendChild(enemy);
    enemy.addEventListener("onload", advanced2EnemyAttackListener(pos.id, enemy));
}


function spawnUpgradedEnemy(){
    let enemy = document.createElement("div");
    enemy.className = "enemy upgraded";
    getRandomSquare().appendChild(enemy);
    enemy.addEventListener("onload", upgradedEnemyAttack(enemy.parentNode.id, enemy))
}



function createEnemyAttack(pos){
    var attack = document.createElement("div");
    attack.className = "attack";
    setTimeout(function(){attack.remove()}, 500);
    document.getElementById(pos).appendChild(attack);

}


const basic1AttackListener = function basic1EnemyAttack(id, enemy){
    var attacksList = [getLeft(id),getRight(id)];
    basicAttack = setInterval(function(){
        if(enemy.className != "dead"){
        for(x=0;x<attacksList.length;x++){
            createEnemyAttack(attacksList[x]);}
    }}, 1000)
};

const basic2AttackListener = function basic2EnemyAttack(id, enemy){
    var attacksList = [getUp(id),getDown(id)];
    basicAttack = setInterval(function(){
        if(enemy.className != "dead"){
            for(x=0;x<attacksList.length;x++){
                createEnemyAttack(attacksList[x]);}
        }}, 1000)
};

function upgradedEnemyAttack(id, enemy){
    var attacksList = [getUp(getLeft(id)), getUp(getRight(id)), getDown(getLeft(id)), getDown(getRight(id))];
    upgradedAttack = setInterval(function(){
        if(enemy.className != "dead"){
            for(x=0;x<attacksList.length;x++){
                createEnemyAttack(attacksList[x]);}
        }}, 1000)
};

function advancedEnemyAttackListener(id, enemy){
    var attacksList = [getLeft(id),getLeft(getLeft(id)),getRight(id),getRight(getRight(id))];
    advancedAttack = setInterval(function(){
        if(enemy.className != "dead"){
            for(x=0;x<attacksList.length;x++){
                createEnemyAttack(attacksList[x]);}
        }}, 1000)
}

function advanced2EnemyAttackListener(id, enemy){
    var attacksList = [getUp(id),getUp(getUp(id)),getDown(id),getDown(getDown(id))];
    advancedAttack = setInterval(function(){
        if(enemy.className != "dead"){
            for(x=0;x<attacksList.length;x++){
                createEnemyAttack(attacksList[x]);}
        }}, 1000)
}

function upgradeEnemy(enemy, space){
    kill(enemy, space);
    spawnUpgradedEnemy();
}


//enemy death functions

function checkDrop(space){
    score++;
    stageScore++;
    var keyChance = stageScore/(level*3);
    if(keyChance > Math.random()){space.appendChild(dropKey())}

    var meleeChance = stageScore/(level*10);
    if(meleeChance > Math.random()){space.appendChild(dropMelee())}

}

function dropKey(){
    var key = document.createElement("div");
    key.className = "loot key";
    return key;
}

function dropMelee(){
    var melee = document.createElement("div");
    melee.className = "loot melee";
    return melee;
}