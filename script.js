/* JavaScript é a linguagem de programação que adiciona interatividade e 
funcionalidade a uma página web. Ele permite criar elementos dinâmicos, 
como botões que respondem de diferentes maneiras a cliques, 
animações, etc. Enquanto o HTML organiza e o CSS estiliza, o JavaScript permite que 
o usuário interaja com a página de forma ativa, deixando-a mais intuitiva 
e funcional fazendo a página "ganhar vida".*/ 


/*Definição das variáveis constantes do código 
logo, aquelas de valor fixo e que não serão
modificdas futuramente*/
const player = document.getElementById("player");
const game = document.getElementById("game");
const platforms = document.querySelectorAll(".platform");
const enemy = document.getElementById("enemy");
const livesDisplay = document.getElementById("lives");
const coin = document.querySelectorAll(".coin");

let enemyX = 130;
let enemyDirection = 1;
let lives = 3;

let playerX = 50;
let playerY = 0;
let moveX = 0;
let moveY = 0;

let gravity = 0.8;
let jumpStrength = -15;
let jumpBoosted = false;
let onGround = false;

/* No início a mensagem abaixo será mostrada
indicando ao jogador o objetivo do jogo*/
alert('Colete todas as moedas')

/* Movimentação do inimigo para que ele fique
em constante movimento na plataforma de um lado ao outro*/
function moveEnemy() {
    enemyX += 2 * enemyDirection;
    if (enemyX >= 500 || enemyX <= 130) {
        enemyDirection *= -1;
    }
    enemy.style.left = enemyX + 'px';
    checkCollision();
}


// Para checar se houve colisão do jogador com o inimigo
function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();
    
    if (playerRect.left < enemyRect.right &&
        playerRect.right > enemyRect.left &&
        playerRect.bottom > enemyRect.top &&
        playerRect.top < enemyRect.bottom) {
        takeDamage();
    }
}


// Checar se o jogador coletou o item
function checkItemPickup() {
    const playerRect = player.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    if (playerRect.left < itemRect.right &&
        playerRect.right > itemRect.left &&
        playerRect.bottom > itemRect.top &&
        playerRect.top < itemRect.bottom) {

        collectJumpItem();
    } 
}    

// Checar se o jogador coletou a moeda
function checkCoinItemPickup(){
coin.forEach(coin => {
    const playerRect = player.getBoundingClientRect();
    const coinRect = coin.getBoundingClientRect();

    if (playerRect.left < coinRect.right &&
        playerRect.right > coinRect.left &&
        playerRect.bottom > coinRect.top &&
        playerRect.top < coinRect.bottom) {

        coin.style.display = 'none'; 
        /*none serve para indicar que feito a ação o estilo
          do objeto se tornará nulo, sendo assim ele fica
          "invisível"*/  
    } 
})
}

// Para coletar o item para pular mais alto        
function collectJumpItem() {
    jumpStrength = -20; 
    item.style.display = 'none'; 

    setTimeout(() => {
        jumpHeight = -15; 
        //aumentando a intensidade do pulo
    }, 10); 
}

// Quando receber dano o jogador perderá 1 coração
function takeDamage() {
    if (lives > 0) {
        lives--;
        hearts[lives].style.display = "none";
    }    
    
        /* Adicionou-se a condição de que 
        se não houver mais vidas, o jogo acaba*/
        if (lives === 0) {
            alert("Game Over - Reinicie a página");
            
}

}

setInterval(moveEnemy, 16);
setInterval(checkItemPickup, 16);
setInterval (checkCoinItemPickup, 16);



// Definição das teclas de movimentação do personagem
let keys = {
    a: false,
    d: false,
    w: false,
    s: false
};


//Quando a tecla for pressionada
document.addEventListener("keydown", (e) => {
    if (e.key === "a") 
        keys.a = true;

    if (e.key === "d") 
        keys.d = true;

    if (e.key === "w") 
        keys.w = true;

    if (e.key === "s") 
        keys.s = true;
});

//Quando soltar a tecla 
document.addEventListener("keyup", (e) => {
    if (e.key === "a") 
        keys.a = false;
    
    if (e.key === "d") 
        keys.d = false;

    if (e.key === "w")
        keys.w = false;
        
    if (e.key === "s") 
        keys.s = false;
});


/*Movimentação lateral da personagem com as teclas "a" e "d"
e caso nada seja pressionado a personagem terá a animação
de quando está parada*/
function update() {
    if (keys.a) {
        moveX = -5;
        player.classList.add("runleft");
        player.classList.remove("runright", "jump", "idle");

    } else if (keys.d) {
        moveX = 5;
        player.classList.add("runright");
        player.classList.remove("runleft", "jump", "idle");

    } else {
        moveX = 0;
        player.classList.remove("runleft", "runright", "jump");
        player.classList.add("idle")
    }



 // Pular (normal)
 if (keys.w && onGround) {

    moveY = jumpStrength;
    onGround = false;
    player.classList.add("jump");
    player.classList.remove("runleft", "runright", "idle");
}


// Aplicando gravidade
moveY += gravity;


// Checar a colisão do jogador com as plataformas
onGround = false;
platforms.forEach(platform => {
    const platformRect = platform.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if ( 
            playerRect.left < platformRect.right &&
            playerRect.right > platformRect.left &&
            playerRect.bottom > platformRect.top &&
            playerRect.bottom < platformRect.top + 20 &&
            moveY >= 0
    ) {
            onGround = true;
            playerY = platformRect.top - game.getBoundingClientRect().top - 64;
            moveY = 0;
    }
});



/* Delimitação dos limites do jogo para o jogador 
para que ele não ultrapasse as bordas
É calculador de acordo com as dimensões de altura e largura 
do jogador, sendo ele um quadrado de 64px*/
if (playerX < 0) 
    playerX = 0;

if (playerX + 64 > game.clientWidth) 
    playerX = game.clientWidth - 64;

if (playerY + 64 > game.clientHeight) {
    playerY = game.clientHeight - 64;
    moveY = 0;
    onGround = true;
}



/* Para alterar a posição do jogador
na tela */
playerX += moveX;
playerY += moveY;

player.style.left = playerX + "px";
player.style.top = playerY + "px";


// Para criar a ideia de movimento constante
requestAnimationFrame(update);
}


update();