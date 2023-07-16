let score = JSON.parse(localStorage.getItem('game-score')) || {
    wins:0,
    losses:0,
    ties:0
  };

let resultElement = document.querySelector('.js-result'); 
let movesElement = document.querySelector('.js-moves'); 
let scoreElement = document.querySelector('.js-score');
let loadElement = document.querySelector('.js-load'); 
let rockElement = document.querySelector('.js-rock'); 
let paperElement = document.querySelector('.js-paper'); 
let scissorsElement = document.querySelector('.js-scissors');

updateScore();
function play(playerMove){
  load();
  setTimeout(endLoading,3000);
  setTimeout(function() {playGame(playerMove)},3000);
}

function playGame(playerMove){
  let cpuMove = "";
  let randomNum = Math.floor(Math.random()*3)+1;
  let sResult = '';
  switch (randomNum) {
    case 1:
      cpuMove = "rock";
      break;
    
    case 2:
      cpuMove = "paper";
      break;
    case 3:
      cpuMove = "scissors";
      break;
  }

  if(playerMove===cpuMove){
    resultElement.innerHTML='Tie';
    sResult='Tie';
  }
  else if(playerMove==='rock' && cpuMove ==='paper'){
    resultElement.innerHTML='You Lose :(';
    sResult='Loss';
  }
  else if(playerMove==='rock' && cpuMove ==='scissors'){
    resultElement.innerHTML='You Win :)';
    sResult='Win';
  }
  else if(playerMove==='paper' && cpuMove ==='rock'){
    resultElement.innerHTML='You Win :)';
    sResult='Win'
  }
  else if(playerMove==='paper' && cpuMove ==='scissors'){
    resultElement.innerHTML='You Lose :(';
    sResult='Loss';
  }
  else if(playerMove==='scissors' && cpuMove ==='paper'){
    resultElement.innerHTML='You Win :)';
    sResult='Win'
  }
  else if(playerMove==='scissors' && cpuMove ==='rock'){
    resultElement.innerHTML='You Lose :(';
    sResult='Loss';
  }

  switch (sResult) {
    case 'Win':
      score.wins+=1;
      break;
    case 'Loss':
      score.losses+=1;
      break;
    case 'Tie':
      score.ties+=1;
      break;
  }
  movesElement.innerHTML=
  `You <img src=images/${playerMove}-emoji.png>- <img src=images/${cpuMove}-emoji.png> CPU`;   

  updateScore();
  localStorage.setItem('game-score',JSON.stringify(score));
}

function reset(){
  localStorage.removeItem('game-score');
  movesElement.innerHTML='';
  resultElement.innerHTML='';
  score.wins=0;
  score.losses=0;
  score.ties=0;
  updateScore();
}

function updateScore(){
  scoreElement.innerHTML=
  `Wins: ${score.wins} , Losses: ${score.losses} , Ties: ${score.ties}`;
}
function load(){
  loadElement.classList.add('is-loading');
  movesElement.innerHTML='';
  resultElement.innerHTML='';
  rockElement.removeAttribute('onclick');
  paperElement.removeAttribute('onclick');
  scissorsElement.removeAttribute('onclick');
}
function endLoading(){
  loadElement.classList.remove('is-loading');
  rockElement.setAttribute('onclick',"play('rock');");
  paperElement.setAttribute('onclick',"play('paper');");
  scissorsElement.setAttribute('onclick',"play('scissors');");
}
