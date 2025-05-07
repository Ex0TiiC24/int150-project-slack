let i =0
const helloworld = () =>{
    console.log('hello world')
    if (i==2){
        clearInterval(lol)
    }
    i+=1
}

const run = ()=>{
    lol = setInterval(helloworld,1000)
}
run()