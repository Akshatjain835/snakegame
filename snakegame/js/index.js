let inputdir = { x: 0, y: 0 };
const foodsound = new Audio("music/food.mp3");
const gameoversound = new Audio("music/gameover.mp3");
const movesound = new Audio("music/move.mp3");
const musicsound = new Audio("music/music.mp3");

let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakearr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 }; //food is not array because food is single item and snakearr is array because the array is updating all the time

//game functions
function main(ctime) {
  //ctime ives the current time
  window.requestAnimationFrame(main);
//   console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }

  lastPaintTime = ctime;
  gameEngine();
  musicsound.play();
}


function iscollide(snakearr){
    //if you bump into yourself
    for(let i=1;i<snakearr.length;i++)
    {
        if(snakearr[i].x===snakearr[0].x && snakearr[i].y===snakearr[0].y){
            
            return true;
        }
        
    }

    //if you bump into the wall
    if(snakearr[0].x>=18 || snakearr[0].x<=0 || snakearr[0].y>=18 || snakearr[0].y<=0)
        {   
            
            return true;
        }
        return false;
   
    
}


function gameEngine() {
  //part1:updating the snae array
   if(iscollide(snakearr)){
   
     gameoversound.play();
     musicsound.pause();
     inputdir={x:0,y:0};
     alert("Game over,Press any key to play again!!!");
     snakearr=[
        {x:13,y:15}
    ]

    musicsound.play();
    score=0;
    scorebox.innerHTML=`Score: ${score}`;

   }


    //if you have eaten the food,increment the score and regenerate the  food
    if(snakearr[0].y===food.y && snakearr[0].x===food.x){
        foodsound.play();
        score+=1;
        if(score>highscorevalue)
        {
            highscorevalue=score;
            localStorage.setItem("Highscore",JSON.stringify(highscorevalue));
            highscorebox.innerHTML="Highscore: "+highscorevalue;
        }
        scorebox.innerHTML="Score: "+ score;
        snakearr.unshift({x:snakearr[0].x+inputdir.x,y:snakearr[0].y+inputdir.y});   //unshift adds items  element at the starting
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    
    //moving the snake
    for(let i=snakearr.length-2;i>=0;i--)
    {
        //   const element=snakearr[i];
          snakearr[i+1]={...snakearr[i]};

          
    }


    snakearr[0].x +=inputdir.x;
    snakearr[0].y +=inputdir.y;











  //part2:displat the snak and food

  board.innerHTML = ""; /*isse board khali ho jayega*/
  //display the snake
  snakearr.forEach((e, index) => {
    snakeelement = document.createElement("div");
    snakeelement.style.gridRowStart = e.y;
    snakeelement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeelement.classList.add("head");
    } else {
      snakeelement.classList.add("snake");
    }
    board.appendChild(snakeelement);
  });

  //display the food

  foodelement = document.createElement("div");
  foodelement.style.gridRowStart = food.y;
  foodelement.style.gridColumnStart = food.x;
  foodelement.classList.add("food");
  board.appendChild(foodelement);
}

















//main logic
musicsound.play();
let Highscore = localStorage.getItem("Highscore");
if (Highscore === null) {
  highscorevalue = 0;
  localStorage.setItem("Highscore", JSON.stringify(highscorevalue));
} else {
    highscorevalue = JSON.parse(Highscore);
  highscorebox.innerHTML = "Highscore: " + Highscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
  inputdir = { x: 0, y: 1 }; //start the game
  movesound.play();

  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputdir.x=0;
      inputdir.y=-1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputdir.x=0;
      inputdir.y=1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputdir.x=-1;
      inputdir.y=0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputdir.x=1;
      inputdir.y=0;
      break;

    default:
      break;
  }

});


