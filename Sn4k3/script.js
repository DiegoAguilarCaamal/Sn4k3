
const playboard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".high-score");
let foodX = 13, foodY = 10;
let snakeX = 5, snakeY = 10;
let Xpeed = 0, Ypeed =0;
let snakeBody = [];
let gameOver = false;
let setInvervalId; 
let score = 0;
let highscore = localStorage.getItem("high-score")|| 0;
highscoreElement.innerHTML = `High Score: ${highscore}`;
const ChangeFoodPosition =()=>{
    foodX = Math.floor(Math.random()*30)+1;
    foodY = Math.floor(Math.random()*30)+1
;    console.log(foodX);
}

const handleGameOver=() =>{
    clearInterval(setInvervalId);
    alert("game Over");
    location.reload();
}

changeDirection=(e)=>{
    //console.log(e);
    if(e.key === "ArrowUp" && Ypeed != 1){
        Xpeed = 0;
        Ypeed = -1;
    }else if(e.key === "ArrowDown" && Ypeed != -1){
        Xpeed = 0;
        Ypeed = 1;
    }
    else if (e.key === "ArrowLeft" && Xpeed != 1){
        Xpeed = -1;
        Ypeed = 0;
    
    }else if (e.key === "ArrowRight" && Xpeed != -1){

        Xpeed = 1;
        Ypeed = 0;
    }
    initGame();

}

const initGame =() => {
    if (gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style = "grid-area:${foodY}/${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY){
        ChangeFoodPosition();
        snakeBody.push([foodX, foodY]);
       // console.log(snakeBody);
       score++;
       highscore = score >= highscore ? score: highscore;
       localStorage.setItem("high-score",highscore);
       scoreElement.innerHTML = `Score: ${score}`;
       highscoreElement.innerHTML = `High Score: ${highscore}`;
    }

    for(let i = snakeBody.length -1; i > 0; i--){
        snakeBody[i] = snakeBody[i -1];
    }


    snakeBody[0] = [snakeX, snakeY];
    snakeX += Xpeed;
    snakeY += Ypeed;

    if(snakeX <=0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }

    for(let i = 0; i<snakeBody.length; i++){
        htmlMarkup += `<div class="head" style = "grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;


        //check if snake eats itself
        if(i !==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
           gameOver = true;
        }
    }
    playboard.innerHTML = htmlMarkup;
   
};

ChangeFoodPosition();
initGame();
setInvervalId =  setInterval(initGame, 300);
document.addEventListener("keydown", changeDirection);