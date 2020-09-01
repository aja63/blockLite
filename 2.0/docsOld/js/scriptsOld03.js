// //debug functions && const
// const test = document.getElementById("test");
//
//
//
// //global functions
//
// function moveLeft(object) {
//     var currentPos = object.parentNode.id;
//     if (currentPos.includes("0") == false) {
//         var move = parseInt(currentPos) - 1;
//         var endPos = document.getElementById(move.toString());
//         endPos.appendChild(object);
//     }
// };
// function moveRight(object) {
//     var currentPos = object.parentNode.id;
//     if (currentPos[1].includes("9") == false) {
//         var move = parseInt(currentPos) + 1;
//         document.getElementById(move.toString()).appendChild(object);
//     }
// };
// function moveUp(object){
//     var currentPos = object.parentNode.id;
//     if (currentPos.length == 2) {
//         var move = parseInt(currentPos) - 10;
//         document.getElementById(move.toString()).appendChild(object);
//     }
// };
// function moveDown(object) {
//     var currentPos = object.parentNode.id;
//     if (currentPos[0].includes("9") == false) {
//         var move = parseInt(currentPos) + 10;
//         document.getElementById(move.toString()).appendChild(object);
//     }
// };
//
// function getCircle(corner){
//     var circle =[];
//     for (x=0;x<3;x++){circle.push(corner+x)};
//     circle.push(corner+12);
//     for(x=22;x>19;x--){circle.push(corner+x)};
//     circle.push(corner+10);
//
//     return circle;
// }
//
//
//
//
//
//
// //load game
// let level = 1;
//
// function loadGame(){
//     hasKey = "no";
//     loadLevel();
//     loadBoard();
//     loadPlayer();
//     loadEnemy();
//     loadInventory();
//     win()
// }
//
// function loadLevel(){
//     var board = document.createElement("div");
//     board.id = "board";
//     document.body.appendChild(board);
// };
//
// function loadBoard(){
//     document.getElementById("newGame").style.zIndex = "-1";
//     for (x=0; x<=99; x++) {
//         var square = document.createElement("div");
//         square.className = "boardSpace";
//         if (x<10||x>=90||x.toString()[1]=="9"||x.toString()[1]=="0"){square.classList.add("edge")}else{square.classList.add("middle")};
//         square.classList.add("lvl"+level.toString().slice(-1));
//         var idTag = x.toString();
//         /*  adds zero to start      if(idTag.length < 2){idTag = "0".concat(idTag)};*/
//         square.id = idTag;
//         document.getElementById("board").appendChild(square);
//
//     }
// };
//
//
// function loadPlayer(){
//     var player = document.createElement("div");
//     player.id = "player";
//     player.addEventListener("onload", playerDeath());
//     player.addEventListener("onload", pickUpItem());
//     document.getElementById("55").appendChild(player);
//
// };
//
// function loadEnemy() {
//     for (x=1;x<level*3+1;x++){
//         if (x/(level*3)>Math.random()){spawnKeyHolder(x)}
//         else if (x/(level*5)>Math.random() && level>9){spawnUpgradeHolder(x)}
//         else if (x/(level*4)>Math.random() && level>19){spawnCager(x)}
//         else {spawnEnemy(x)};
//     }
// }
//
//
//
//
//
// // player control
// /*function createPlayerAttack(creator, dir) {
//     var creatorPos = parseInt(creator.parentNode.id);
//         var pos = creatorPos + dir;
//         test.innerText += "shot-";
//         pos.toString();
//         var attack = document.createElement("div");
//         attack.className = "attack";
//         document.getElementById(pos).appendChild(attack);
//         return attack;
//
// };*/
// function createPlayerAttack(creator, dir){
//     var creatorPos = parseInt(creator.parentNode.id);
//     var pos = creatorPos + dir;
//     pos.toString();
//     var attack = document.createElement("div");
//     attack.className = "attack";
//     document.getElementById(pos).appendChild(attack);
//     destroyPlayerAttack(attack)
//     for(x=1;x<inventory["range"] && x<3;x++){
//         pos = parseInt(pos)+dir;
//         pos.toString();
//         var attack = document.createElement("div");
//         attack.className = "attack";
//         document.getElementById(pos).appendChild(attack);
//         destroyPlayerAttack(attack);
//     }
// }
// function destroyPlayerAttack(attack){
//     setTimeout(function(){attack.remove()}, 150);
// }
//
// function teleportToNextLevel(player){
//     level++;
//     inventory["teleport"] = "held";
//     loadInventory();
//     document.getElementById("level").innerHTML = "level"+level;
//     clear();
//     document.getElementById("board").remove();
//     loadGame();
// };
//
// function teleport(player){
//     if (inventory["teleport"] == "held"){
//         var tele = document.createElement("div");
//         tele.id = "tele";
//         player.parentNode.appendChild(tele);
//         inventory["teleport"] = player.parentNode.id;
//     }
//     else{
//         document.getElementById(inventory["teleport"]).appendChild(player);
//         document.getElementById("tele").remove();
//         inventory["teleport"] = "held";
//     }
// }
//
// function bomb(player){if(inventory["bomb"] > 0) {
//     inventory["bomb"]--;
//     loadInventory();
//     var pos = player.parentNode.id;
//     pos = parseInt(pos) - 24;
//     for (x = pos; x < pos + 48; x++) {
//         var bullet = createBullet(x);
//         bullet.className = "attack";
//         destroyPlayerAttack(bullet);
//     }
// }
// }
//
// const playerMove = function movePlayer(input){
//     const player = document.getElementById("player");
//     if(input.key == "w"){moveUp(player)};
//     if(input.key =="a"){moveLeft(player)};
//     if(input.key == "s"){moveDown(player)};
//     if(input.key == "d"){moveRight(player)};
// };
//
// const playerAbility = function abilityHandeler(input){
//     const player = document.getElementById("player");
//     if(input.key == "i"){var attack = createPlayerAttack(player, -10); destroyPlayerAttack(attack)};
//     if(input.key == "j"){var attack = createPlayerAttack(player, -1); destroyPlayerAttack(attack)};
//     if(input.key == "k"){var attack = createPlayerAttack(player, 10); destroyPlayerAttack(attack)};
//     if(input.key == "l"){var attack = createPlayerAttack(player, 1); destroyPlayerAttack(attack)};
//     if(input.key =="p"){if(inventory["key"] == 1){teleportToNextLevel(player); inventory["key"] = 0}};
//     if(input.key == "e"){teleport(player)};
//     if(input.key == "q"){bomb(player)};
//     if(input.key == "t"){loadInventory()};
// };
//
// document.addEventListener("keydown", playerAbility);
// document.addEventListener("keydown", playerMove);
//
//
//
//
//
//
//
// const playerDeath = function playerHit(){
//     setInterval(function(){
//     var player = document.getElementById("player");
//     var playerSpace = document.getElementById(player.parentNode.id);
//     for (x=0;x<playerSpace.childNodes.length;x++){
//         if (playerSpace.childNodes[x].className == "enemyBullet"){inventory["hp"]--;playerSpace.childNodes[x].remove();loadInventory();}
//         }
//     if(inventory["hp"] <= 0){endGame();}
//     }, 1);
// };
//
// let inventory = {
//     "hp": 3,
//     "key": 0,
//     "range": 1,
//     "teleport": "held",
//     "bomb": 1
// };
//
//
// function pickUpItem(){
//     setInterval(function(){
//     var playerPos = document.getElementById("player").parentNode;
//     if (playerPos.childNodes[0].className == "key"){
//         inventory["key"] = 1;
//         loadInventory();
//         playerPos.childNodes[0].remove();
//         }
//     if(playerPos.childNodes[0].className == "loot"){
//         inventory["range"]++;
//         loadInventory();
//         playerPos.childNodes[0].remove();
//     }
//     if(playerPos.childNodes[0].className == "bomb"){
//         inventory["bomb"]++;
//         loadInventory();
//         playerPos.childNodes[0].remove();
//     }
//     }, 50);
// };
//
//
//
// const enemyDeath = function killEnemy(enemy){
//     setInterval(function(){
//         var parent = enemy.parentNode;
//         if(parent.childNodes[parent.childNodes.length -1].className =="attack"){
//             parent.removeChild(enemy);
//             if(enemy.classList.contains("keyHolder") == true){dropKey(parent)}
//             if(enemy.classList.contains("lootHolder") == true){dropLoot(parent)}
//             if(Math.random()>.8){dropBomb(parent)}
//         }} );
// };
//
// function dropKey(parent){
//     var key = document.createElement("div");
//     key.className = "key";
//     parent.appendChild(key);
// }
//
// function dropLoot(parent){
//     var loot = document.createElement("div");
//     loot.className = "loot";
//     parent.appendChild(loot);
// }
//
// function dropBomb(parent){
//     var bomb = document.createElement("div");
//     bomb.className = "bomb";
//     parent.appendChild(bomb);
// }
//
//
//
// //enemy functions
// function spawnEnemy(x){
//     setTimeout(function() {
//         var enemy = document.createElement("div");
//         enemy.className = "enemy";
//         enemy.addEventListener("onload", enemyAttack(enemy));
//         enemy.addEventListener("onload", enemyDeath(enemy));
//         var randomSpawn = document.getElementsByClassName("middle")[Math.floor(Math.random() * 64)];
//         if(randomSpawn.childNodes.length == 0){randomSpawn.appendChild(enemy)};
//     }, x * 1000);
// }
//
// function spawnKeyHolder(x){
//     setTimeout(function() {
//         var enemy = document.createElement("div");
//         enemy.className = "enemy keyHolder";
//         enemy.addEventListener("onload", keyHolderAttack(enemy));
//         enemy.addEventListener("onload", enemyDeath(enemy));
//         var randomSpawn = document.getElementsByClassName("middle")[Math.floor(Math.random() * 64)];
//         if(randomSpawn.childNodes.length == 0){randomSpawn.appendChild(enemy)};
//     }, x * 1000);
// }
//
// function spawnUpgradeHolder(x){
//     setTimeout(function() {
//         var enemy = document.createElement("div");
//         enemy.className = "enemy lootHolder";
//         enemy.addEventListener("onload", enemyAttack2(enemy));
//         enemy.addEventListener("onload", enemyDeath(enemy));
//         var randomSpawn = document.getElementsByClassName("middle")[Math.floor(Math.random() * 64)];
//         if(randomSpawn.childNodes.length == 0){randomSpawn.appendChild(enemy)};
//     }, x * 1000);
// }
//
// function spawnCager(x){
//     setTimeout(function() {
//         var enemy = document.createElement("div");
//         enemy.className = "enemy cager";
//         enemy.addEventListener("onload", cageAttack(enemy));
//         enemy.addEventListener("onload", enemyDeath(enemy));
//         var randomSpawn = document.getElementsByClassName("middle")[Math.floor(Math.random() * 64)];
//         if(randomSpawn.childNodes.length == 0){randomSpawn.appendChild(enemy)};
//     }, x * 1000);
// }
//
// function createBullet(pos) {
//     var bullet = document.createElement("div");
//     bullet.className = "bullet";
//     if (document.getElementById(pos) != null) {
//         document.getElementById(pos).appendChild(bullet);
//         return bullet;
//     }
//     else{
//         return null;
//     }
// }
//
//
// function createEnemyBullets(pos){
//     var bullet = createBullet(pos);
//     if (bullet != null) {
//         bullet.className = "enemyBullet";
//         document.addEventListener("onload", destroyEnemyBullet(bullet));
//         return bullet;
//     }
//     else{
//         return null;
//     }
// };
//
// function enemyAttack(creator) {setInterval(function(){
//     var startPos = parseInt(creator.parentNode.id);
//     var attacks = [];
//     attacks.push(startPos+11);
//     attacks.push(startPos+9);
//     attacks.push(startPos-11);
//     attacks.push(startPos-9);
//     for (x=0;x<attacks.length;x++){
//         createEnemyBullets(attacks[x]);
//     }
//     }, 1000);
// };
//
// function keyHolderAttack(creator){setInterval(function(){
//     var startPos = parseInt(creator.parentNode.id);
//     var attacks = [];
//     for(x=19;x<22;x++){attacks.push(startPos+x)};
//     for(x=-21;x<-18;x++){attacks.push(startPos+x)};
//     for (x=0;x<attacks.length;x++){
//         createEnemyBullets(attacks[x]);
//     }
//     }, 1000);
// };
//
// function enemyAttack2(creator){setInterval(function(){
//     var startPos = parseInt(creator.parentNode.id);
//     var attacks = [];
//     var operation = [10, 1, -10, -1];
//     for (x=0; x<8; x++){
//         for (y=2; y<3; y++){attacks.push(startPos+(y*operation[x]))}
//         }
//     for (x=0;x<attacks.length;x++){
//         createEnemyBullets(attacks[x]);
//     }
// }, 1000);
// };
//
// function cageAttack(creator){setInterval(function(){
//     var startPos = parseInt(creator.parentNode.id);
//     var attacks = [];
//     startPos = startPos-44;
//     for(x=0; x<8; x++){attacks.push(x+startPos)}
//     startPos = startPos+17;
//     for(x=0;x<8;x++){attacks.push(x*10+startPos)}
//     startPos = startPos+70;
//     for(x=0;x<8;x++){attacks.push(startPos-x)}
//     startPos = startPos-17;
//     for(x=0;x<8;x++){attacks.push(startPos-(x*10))}
//     for (x=0;x<attacks.length;x++){
//         createEnemyBullets(attacks[x]);
//     }
//     }, 500)
// };
//
// function spinnerAttack(creator){setInterval(function(){
//
//     }, 1000)
// };
//
// function destroyEnemyBullet(bullet) {
//     setTimeout(function () {
//         bullet.remove();
//     }, 500);
// };
//
//
//
//
//
// //endgame
// function clear(w) {
//     w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }
// }
//
// function endGame() {
//     clear();
//     test.innerText = "0";
//     document.getElementById("level").innerText = "Level 1"
//     level = 1;
//     document.getElementById("board").remove();
//     inventory["hp"] = 3;
//     inventory["range"] = 1;
//     inventory["tele"]="held";
//     inventory["key"]=0;
// }
//
// function win() {
//     if (level == 25){
//         endGame()
//         var youwin = document.createElement("p");
//         youwin.innerText += "Retire";
//         youwin.id = "youWin";
//         document.body.appendChild(youwin);
//         document.getElementById("newGame").remove();
//     }
// }
//
//
//
//
//
// //UI display
//
// function loadInventory(){
//     var text = document.getElementById("inventoryDisplay");
//     text.innerHTML = "";
//     var keys = Object.keys(inventory);
//     var values = Object.values(inventory);
//     for(x=0;x<keys.length;x++){
//         text.innerHTML += keys[x]+":"+values[x]+"<br>";
//
//     }
//
// }