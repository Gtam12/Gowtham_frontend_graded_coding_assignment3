
const containerEl = document.querySelector('.type-test-container')
const textBoxEl = document.querySelector('.type-textbox');
const timerEl = document.querySelector('.timer')
const accuracyEl = document.querySelector('.accuracy');
const wpmEl = document.querySelector('.wpm');
const cpmEl = document.querySelector('.cpm')
const instructionEl = document.querySelector('.instruction-banner')
const errorBoxEl = document.querySelector('.error-count')
const wpmBoxEl = document.querySelector('.wpm-box')
const cpmBoxEl = document.querySelector('.cpm-box')
const accuracyBoxEl = document.querySelector('.accuracy')
const restartBtnEl =  document.querySelector('.restart')



let time = 10;
let timeLeft = time;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_instruction = "";
let instInd = 0;
let timer = null;
let currentInput = '';

let typingText = [
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
    `Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`

]





function updateTypedText(){
    instructionEl.textContent = null;
    current_instruction = typingText[instInd]

    current_instruction.split(' ').forEach(char=>{
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        instructionEl.appendChild(charSpan)
        
    })
    instInd < typingText.length-1?instInd++:0;
}


function validateCurrentTextTyped(){
    currentInput = textBoxEl.value;
    let currentInputArray = currentInput.split('');
    characterType++;

    errors = 0;

    let textAreaArray = textBoxEl.querySelector('span');
    textAreaArray.forEach((char, i)=>{

        let typedChar = currentInputArray[i]

        if(typedChar == null)
        {
        char.classList.remove('correct_char');
        char.classList.remove('incorrect_char');
        }

        else if(typedChar === char.innerText){
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char')
        }

        else{
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');
            errors++;
        }

    

    });

errorBoxEl.textContent = total_errors + errors;

let correctCharacters = (characterTyped - (total_errors + errors));
let accuracyVal  = ((correctCharacters / characterTyped)*100);

accuracyBoxEl.textContent = Math.round(accuracyVal);

if(currentInput.length == current_instruction.length){
    updateTypedText();

    total_errors += errors;
    textBoxEl.value = '';
}


}


function startTyping(){
    restartGame();
    updateTypedText();
    clearInterval(timer);
     timer = setInterval(setTimer, 1000);
}

function restartGame(){
    timeLeft = time;
    timeElapsed = 0;
    errors= 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    instInd =0;
    textBoxEl.disabled = false;

    textBoxEl.value = "";
    typingText.textContent = "Click on the areab below to start the game.";
    accuracyBoxEl.textContent =100;
    timerEl.textContent = timeLeft;
    errorBoxEl.textContent = 0;
    restartBtnEl.style.display = "none";
    wpmBoxEl.style.display = "none";
    cpmBoxEl.style.display = "none";
}



function setTimer(){
    if(timeLeft>0){
        timeLeft --;

        timeElapsed ++;

        timerEl.textContent = timeLeft;
    }
    else{
        finishGame();
    }
}

function finishGame(){
    clearInterval(timer);
    textBoxEl.disable = true;
    typingText.textAreaArray = "Click on restart to start a new game.";
    restartBtnEl.style.display = "block";

    let countPerMinute = Math.round(((characterTyped/timeElapsed)*60));
    let wordsPerMinute = Math.round((((characterTyped/5)/timeElapsed)*60))

    cpmEl.textContent = countPerMinute;
    wpmEl.textContent = wordsPerMinute;

    cpmBoxEl.sytle.display = 'block';
    wpmBoxEl.style.display = 'block';


}