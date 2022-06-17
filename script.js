const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const timerContainer=document.querySelector('.timer');

 
let counter = timerContainer.textContent;
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
const idx = Math.floor(Math.random() * holes.length);
const hole = holes[idx];
if (hole === lastHole) {
return randomHole(holes);
}
lastHole = hole;
return hole;
}

function peep() {
const time = randomTime(1000, 1500);
const hole = randomHole(holes);
hole.classList.add('up');
setTimeout(() => {
hole.classList.remove('up');
if (!timeUp) peep();
}, time);
}

function startGame() {
scoreBoard.textContent = 0;
timeUp = false;
score = 0;
peep();
setTimeout(() => timeUp = true, counter)
}

function whack(e) {
if(!e.isTrusted) return;
setTimeout(()=>{
    document.body.classList.toggle("flash");
},100);
document.body.classList.toggle("flash");
score++;
this.parentNode.classList.remove('up');
scoreBoard.textContent = score;
}


moles.forEach(mole => mole.addEventListener('click', whack));
let interval;
function renderTimer()
{
    if(counter>0)
    {
        counter--;
        timerContainer.textContent=counter; 
    }
    else
    {
        clearInterval(interval);
    }
}
function update()
{
    startGame();
    renderTimer();
}
document.querySelector(".play").addEventListener("click",function(){
    if(!interval)
    {
        interval =  setInterval(update,1000);
    }
})
document.querySelector(".reset").addEventListener("click",function(){
    location.reload;
})
