window.onload = shuffle;

const cards = document.querySelectorAll('.memory-card');
const result = document.querySelector('.result');
const button = document.querySelector('.again');
const buttonStart = document.querySelector('.start-game__button');
const finalStep = document.querySelector('.final-step');
const finalTime = document.querySelector('.final-time');
const gameTime = document.getElementById('time');
const gameStep = document.getElementById('score');


let win = 0;
let step = 0;
let time = 0;

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBord = false;

//подсчет шагов в игре
function stepCount(){
	step += 1;
	gameStep.textContent = String(step);
}

//нахождение и переворот первой и воторой карты
function flipCard() {
	console.log('flip');
	if (lockBord) return
	this.classList.add('flip');
	stepCount();
	if (this === firstCard) return;

	if(!hasFlippedCard){
		//first click
		hasFlippedCard = true;
		firstCard = this;
	} else {
		//second click
		hasFlippedCard = false;
		secondCard = this;
		checkThematch()
	}

	//проверка на сопадение карт
	function checkThematch(){
		let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
		isMatch ? disableCards () : unflipCards()
		
	}
	//карты совпали
	function disableCards (){
		firstCard.removeEventListener('click', flipCard);
		secondCard.removeEventListener('click', flipCard);
		win += 1;
		console.log(win)
		endGame()
	}

	
	//карты не совпали
	function unflipCards(){
		lockBord = true;
		setTimeout(() => {
			firstCard.classList.remove('flip');
			secondCard.classList.remove('flip');
			lockBord = false;
		},1000);
	}	
}

function endGame(){
	if (win === 6) {
		showResult()
		stopTimer()
	}
}
//установка радомности карт перед запуском игры
function shuffle() {
	cards.forEach(card => {
	  let ramdomPos = Math.floor(Math.random() * 12);
	  card.style.order = ramdomPos;
	});
  };


//вывод результатов
function showResult(){
	result.classList.remove('hidden');
	finalStep.textContent = step + " step";
	finalTime.textContent = `0${hrs} : 0${min} : ${sec}` + " sec";
	localStorage.setItem(toString(finalTime), toString(finalStep));
	// finalTime.textContent = ;
}
//перезапуск игры
function resetGame(){
	cards.forEach(card => card.classList.remove('flip'));
	step = 0;
	gameStep.textContent = step;
	shuffle();
	resetTime();
	lockBoard = false;
	hasFlippedCard = false;
	result.classList.add('hidden');
	sec = 0;
	min = 0;
	hrs = 0;
	timer();
	win =0;
	
cards.forEach(card => card.addEventListener('click', flipCard));
}

// показать предыдущие результаты
function showLegent(){
	
}

//реализация секундомера
let sec = 0;
let min = 0;
let hrs = 0;
let t;
let timerActive = true;

function tick(){
    sec+= 1;
    if (sec >= 60) {
        sec = 0;
        min+= 1;
        if (min >= 60) {
            min = 0;
            hrs+= 1;
        }
    }
}

function add() {
    tick();
    gameTime.textContent = (hrs > 9 ? hrs : "0" + hrs) 
        	 + ":" + (min > 9 ? min : "0" + min)
       		 + ":" + (sec > 9 ? sec : "0" + sec);
	timer();
}


function startTimer (){
	if (timerActive = true) {
		timerActive = false;
	}
}

buttonStart.addEventListener('click',  timer);
buttonStart.onclick = hiddenButton;

function hiddenButton(){
	buttonStart.classList.add('hidden')
}
//обнуление
 function resetTime() {
    gameTime.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}

function timer() {
    t = setTimeout(add, 1000);
}


function stopTimer() {
    clearTimeout(t);
}



cards.forEach(card => card.addEventListener('click', flipCard));
button.addEventListener('click', resetGame);
