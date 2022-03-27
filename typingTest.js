
const textBoxEl = document.querySelector('.type-textbox');
const timerEl = document.querySelector('.timer')
const containerEl = document.querySelector('.type-test-container')
let time = 60;







textBoxEl.addEventListener('click', ()=>{


const isClicked = false;
   

 
   const setTime =  setInterval(() => {
        timerEl.textContent = time-1;
        time = timerEl.textContent;  
         if(Number(time) === 0 ){
            clearInterval(setTime);
            time = 60;
            containerEl.setAttribute('disabled',true)

            const wpmHtml = `
            <div class = 'wpm-box'>
                <p class="wpm-title">WPM</p>
                <p class="timer"></P>
            </div>
            
            `

        }         
    }, 1000);

    if(!isClicked)
    {
    setTime();
    }

})


