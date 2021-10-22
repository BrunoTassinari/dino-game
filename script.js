const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
const body = document.getElementsByTagName('body')[0]



let isJumping = false;
let isgameOver = false;
let position = 0;
let pulo = new Audio('hit-01.wav')


function handleKeyUp(event) {
    if (event.keyCode === 32){
        if(!isJumping){
            jump()
            pulo.play()
        }
    }
}
  
function jump() {
isJumping = true;

let upInterval = setInterval(() => {
    if (position >= 150) {
    // Descendo
    clearInterval(upInterval);

    let downInterval = setInterval(() => {
        if (position <= 0) {
        clearInterval(downInterval);
        isJumping = false;
        } else {
        position -= 20;
        dino.style.bottom = position + 'px';
        }
    }, 20);
    } else {
    // Subindo
    position += 20;
    dino.style.bottom = position + 'px';
    }
}, 10);
}

function createCactus () {
    const cactus = document.createElement('div');
    let cactusPositions = 800;
    let randomTime = Math.random() * 6000;

    cactus.style.left = cactusPositions + 'px';
    cactus.classList.add('cactus');
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if(cactusPositions <= -100) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if( cactusPositions > 0 && cactusPositions < 58 && position < 69){
            clearInterval(leftInterval);
            gameOver();
            isgameOver = true;
        } else{
            cactusPositions -= 10;
            cactus.style.left = cactusPositions + 'px';
        }
    },20)

    if(!isgameOver){
        setTimeout(createCactus, randomTime)
    }
    
}
createCactus();
  

document.addEventListener('keypress', handleKeyUp)


function gameOver() {
    body.innerHTML = '<h1 class="game-over">Fim de jogo!</h1>'
    body.innerHTML += '<input class="button-game-over"type="button" value="Reiniciar!" onClick="window.location.reload()">'
}