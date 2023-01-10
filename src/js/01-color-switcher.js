let start = document.getElementById("start");
let stop = document.getElementById("stop");
let body = document.getElementsByTagName("body")[0];
 

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let timer 
start.addEventListener("click", () => {
 timer = setInterval(()=>{
body.style.backgroundColor =  getRandomHexColor();
    }, 1000)
})


stop.addEventListener("click", ()=> {
   clearInterval(timer);
})