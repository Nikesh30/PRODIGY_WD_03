let boxes = document.querySelectorAll('.box');
let statusText = document.querySelector('#submit');
let btnRestart = document.getElementById("reset");

let x = "<img src = 'x.png'>";
let o = "<img src = 'o.png'>";

const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [0,3,6],
    [1,4,8],
    [2,5,8],
    [2,4,6]
];

let options = ["","","","","","","","",""];
let currentPlayer  = x;
let player = "X";
let running = false;
init();

function init(){
    boxes.forEach(box => box.addEventListener('click', onclick));
    btnRestart.addEventListener('click',restartGame);
    statusText.textContent = `${player}'s Turn`;
    running=true;
}

function onclick(){
    const index = this.dataset.index;
    if(options[index] !== "" || !running){
        return;
    }
    updateBox(this, index);
    checkWin();
}

function updateBox(box, index){
    options[index] = player;
    box.innerHTML = currentPlayer;
}

function changePlayer(){
    player = (player ==  "X")? "O" : "X";
    currentPlayer = (currentPlayer == x)? o : x;
    statusText.textContent = `${player}'s Turn`;
}

function checkWin(){
    let isWin = false;
    for(let i=0;i<wins.length;i++){
        const condition = wins[i];
        const box1 = options[condition[0]];
        const box2 = options[condition[1]];
        const box3 = options[condition[2]]; 

        if(box1== "" || box2 == "" || box3 == ""){
            continue;
        }

        if((box1==box2)&&(box2==box3)){
            isWin = true;
            boxes[condition[0]].classList.add('win');
            boxes[condition[1]].classList.add('win');
            boxes[condition[2]].classList.add('win');
        }
    }

    if(isWin){
        statusText.textContent = `${player} Won...`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = "Match Draw..."
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
     options = ["","","","","","","","",""];
     currentPlayer = x;
     player = "X";
     running = true;
     statusText.textContent = `${player}'s Turn`;

     boxes.forEach(box => {
        box.innerHTML= "";
        box.classList.remove('win');
     })
} 








