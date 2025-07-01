const grid = document.querySelector('.grid');
const startBtn = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
const gameOver = document.getElementById('gameover-overlay')
let score = 0;
let squares = [];
let currentSnake = [0,1,2];
let direction = 1;
const width = 40;
const height = 20;
let appleIndex = 0;
let timeId = 0




// EVENT LISTNERS
document.addEventListener('keydown',control);
startBtn.addEventListener('click',startGame);

// MAKING GRID
gameOver.style.display = 'none';
function createGrid(){

    for(let i = 0;i<800;i++){
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        squares.push(square);
        // square.textContent = i;
    }
}

createGrid();

// STARTING GAME
function startGame(){
    clearInterval(timeId)
    gameOver.style.display = 'none';
    startBtn.textContent = 'RESET'
    currentSnake.forEach(index=>squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    score =  0;
    scoreDisplay.textContent = score; 
    currentSnake = [0,1,2]
    direction = 1;
    intervalTime = 600;
    currentSnake.forEach(index=>squares[index].classList.add('snake'))
    generateApple();
    timeId = setInterval(move, intervalTime);

}

// APPLE GENERATION
function generateApple(){

    do{
        appleIndex = Math.floor(Math.random()*800)

    }while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple');

}


// SANKE MOTION AND EATING
function move(){
    const head = currentSnake[currentSnake.length-1]+direction;

    if(
        (head > width*height && direction === width) || 
        (head < 0 && direction === -width) || 
        (currentSnake[currentSnake.length-1] % width === 0 && direction === -1 ) || 
        (currentSnake[currentSnake.length-1] % width === width-1 && direction === 1) ||
        squares[head].classList.contains('snake')
    ) {

        gameOver.style.display = 'block';
        console.log(head);
        return clearInterval(timeId)
    }

    // FIRST SNAKE'S HEAD WILL MOVE FORWARD
    currentSnake.push(head); // Remember!! "push" returns length while "pop" returns the last element no need to use this as variable
    squares[head].classList.add('snake');

    // THEN IF IT COUNTERS ANY APPLE ITS SIZE WILL INCREASE
    if(squares[head].classList.contains('apple')){
        score++
        scoreDisplay.textContent = score;
        squares[appleIndex].classList.remove('apple');
        currentSnake.push(appleIndex);
        generateApple()
        intervalTime *= 0.9
        clearInterval(timeId)
        timeId = setInterval(move,intervalTime);
    }else{
        // THEN ITS TAIL CONTINUES
        const tail = currentSnake.shift();
        squares[tail].classList.remove('snake');
    }

    
    console.log(currentSnake);
}

// CONTROLS

function control(e){

    const key = e.code

    switch (key) {
        case "ArrowDown":
        case "KeyS":
            // console.log("down");
            direction = width
            break;

        case "ArrowUp":
        case "KeyW":
            // console.log("up");
            direction = -width
            break;

        case "ArrowLeft":
        case "KeyA":
            // console.log("left");
            direction = -1;
            break;

        case "ArrowRight":
        case "KeyD":
            // console.log("right");
            direction = 1;
            break;
    
        default:
            // console.log("Nothing Clicked");
            break;
    }

}


