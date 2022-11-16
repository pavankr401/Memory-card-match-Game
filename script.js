const cards = document.querySelectorAll('.card');
const flips = document.querySelector('.flips b');
const time = document.querySelector('.time b');
const refreshBtn = document.querySelector('.refresh-btn');

let isFlipped;
let firstCard, secondCard;
let flipCount;
let timer;
let gameSec;
let isTimeStarted;
let lockBoard;


function flipCard()
{
  if(lockBoard) return;
  if(firstCard === this) return;
  if(isTimeStarted) startTimer();
  this.classList.add('flip');
  flipCount++;
  flips.innerText = (flipCount < 10) ? "0"+flipCount : flipCount;
  if(!isFlipped)
  {
    isFlipped = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  checkSelectedCards();
}

function checkSelectedCards()
{
  if(firstCard.dataset.cardName == secondCard.dataset.cardName)
  {
    disableFlip();
  }
  else unFlip();
}

function disableFlip()
{
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetCardSelection();
}

function unFlip()
{
  setTimeout(function(){
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetCardSelection();
  },500)
}

function resetCardSelection()
{
  [firstCard, secondCard] = [null, null];
  [isFlipped, lockBoard] = [false, false];
}

function shuffle()
{
  cards.forEach(card => card.style.order = Math.floor(Math.random() * 12));
}
shuffle();

function startTimer()
{
  isTimeStarted = false;
  timer = setInterval(function(){
    if(gameSec == 0) return;
    gameSec--;
    time.innerText = (gameSec < 10) ? "0"+gameSec : gameSec;
  },1000);
}

function unFlipAll()
{
  cards.forEach(card => card.classList.remove('flip'));
}

function startGame()
{
  resetCardSelection();
  unFlipAll();
  cards.forEach(card => card.addEventListener("click", flipCard));
  isTimeStarted = true;
  clearInterval(timer);
  flipCount = 0;
  flips.innerText = '00';
  gameSec = 20;
  time.innerText = '20';
}

refreshBtn.addEventListener("click", startGame);
startGame();