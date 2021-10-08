/*
- when user clicks button, add a new progress bar
- progress bar fills to 100% in 5s
- user can add as many progress bars as they want
*/

let numActiveBars = 0;
const startQueue = [];

const onClick = () => {
    const newEle = document.createElement("div");
    newEle.className = 'progressBar';
    
    const expanderEle = document.createElement("div");
    expanderEle.className = 'expander';
    newEle.appendChild(expanderEle);
    
    const progressBarEle = document.getElementById("progressBars");
    progressBarEle.appendChild(newEle);
    
    const startFunc =
        () => setTimeout(() => expanderEle.style.width = "100%", 10);
        
    const onEnd = () => {
        if (startQueue.length)
            startQueue.shift().call();
        else
            numActiveBars--;
    };
    newEle.ontransitionend = onEnd;
    
    if (numActiveBars < 3) {
        numActiveBars++;
        startFunc();
    } else {
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitionend_event
        startQueue.push(startFunc);
    }
};