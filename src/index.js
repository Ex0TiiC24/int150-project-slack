const container = document.querySelector(".comp-stat-container");
const statContainers = document.querySelectorAll('.comp-stat');
let activated = false;


const updateCount = () =>{
    console.log("activated")
    
    statContainers.forEach(statContainer =>{
        const statDiv = statContainer.querySelector('.stat'); 
        const h1 = statDiv.querySelector('h1');
        
        const target = parseInt(h1.dataset.count);
        let current = 0;
        const increment = target/50;
        const interval = setInterval(()=>{
            current += increment;
            if (current >= target){
                current = target;
                clearInterval(interval)
            }
            h1.textContent = Math.floor(current);
        },50)
        
    })
    
}

const runningNumbers = () =>{
    const rect = container.getBoundingClientRect();

    if((rect.top >= 0 && rect.top <= window.innerHeight) ||  (rect.bottom >= 0 && rect.bottom <= window.innerHeight)){
        if(!activated){
            activated = true
            updateCount()
        }
        
    }
    else if (rect.bottom < 0 || rect.top > window.innerHeight) {
        if (activated) {
            activated = false; 
            console.log('unactive');
        }
    }
}
window.addEventListener("scroll",()=>{
    runningNumbers()

})
