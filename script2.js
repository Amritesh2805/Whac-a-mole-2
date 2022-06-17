let moles = document.querySelectorAll(".mole");
let scoreContainer = document.querySelector(".score");
let timerContainer = document.querySelector(".timer");
let counter = timerContainer.textContent;
var high_scores=document.querySelector('.high-scores');
var username = document.getElementById("name");
// const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const HSH = document.querySelector(".HighScoresHeading");

var user;
let moleArr = Array.prototype.slice.call(moles);
let random;
let hitPosition;
let score=0;

HSH.classList.add("HighScoresHeadingClose");

function renderGame()
{
    moleArr.forEach(curr => {
        curr.classList.remove("mole-active");
    });
   random = Math.floor(Math.random()*moleArr.length);
   moleArr[random].classList.add("mole-active");
   hitPosition=moleArr[random].id;
}
 
function renderScore()
{
    moleArr.forEach(curr=>{
        curr.addEventListener("click",function(){
            if(hitPosition==curr.id)
            {
                setTimeout(()=>{
                    document.body.classList.toggle("flash");
                },100);
                document.body.classList.toggle("flash");
                score++;
                scoreContainer.textContent=score;
            }
        })
    })
}
renderScore();
function HighScores() {
    if(typeof(Storage)!=="undefined"){
        var scores = false;
        if(localStorage["high-scores"]) {
            high_scores.style.display = "block";
            high_scores.innerHTML = '';
            scores = JSON.parse(localStorage["high-scores"]);
            scores = scores.sort(function(a,b){return parseInt(b)-parseInt(a)});

            for(var i = 0; i < 5; i++){
                var s = scores[i];                        
                var fragment = document.createElement('li');
                fragment.innerHTML = (typeof(s) != "undefined" ? s : "" );
                high_scores.appendChild(fragment);
            }
        }
    } else {
        high_scores.style.display = "none";
    }
}

function UpdateScore() {
    if(typeof(Storage)!=="undefined"){
       // var current = parseInt(score.innerHTML);
        var current=score;
        var scores = false;
        if(localStorage["high-scores"]) {

            scores = JSON.parse(localStorage["high-scores"]);
            scores = scores.sort(function(a,b){return parseInt(b)-parseInt(a)});
            
            for(var i = 0; i < 5; i++){
                var s = parseInt(scores[i]);
                
                var val = (!isNaN(s) ? s : 0 );
                if(current > val)
                {
                    val = current;
                    scores.splice(i, 0, parseInt(current));
                    break;
                }
            }
            
            scores.length = 5;                                
            localStorage["high-scores"] = JSON.stringify(scores);

        }
         else {                        
            var scores = new Array();
            scores[0] = current;
            localStorage["high-scores"] = JSON.stringify(scores);
        }
        
        HighScores();
    } 
}

let interval;

function renderTimer()
{
   if(counter>0)
   {
     counter--;
     timerContainer.textContent=counter;
     
   }
   else{
    clearInterval(interval);
    moleArr[random].classList.remove("mole-active");
    HSH.classList.remove("HighScoresHeadingClose");
    localStorage.clear();
    UpdateScore();
    
    // const indiv_score = {
    //     indiv_score : score,
    //     indiv_name : username.value
    // };
    // highScores.push(indiv_score);
    // highScores.sort((a,b) => b.indiv_score - a.indiv_score);
    // highScores.splice(5);
    // high_scores.innerHTML = highScores.map(indiv_score => {
    //     return `<li class="high-scores">${indiv_score.indiv_name}-${indiv_score.indiv_score}</li>`; 
    // })
    // .join("");
   }
}
function update()
{
    renderGame();
    renderTimer();
}
document.querySelector(".play").addEventListener("click",function(){
    if(!interval)
    {
        interval = setInterval(update,1000);
    }
});
// const addScores = (ev)=>{
//     ev.preventDefault();
//     document.querySelector('form').reset();
    
//     }
// document.addEventListener('DOMContentLoaded',()=>{
//     document.getElementById('btn').addEventListener('click',addScores);
// });

document.querySelector(".reset").addEventListener("click",function(){
    location.reload();
});

