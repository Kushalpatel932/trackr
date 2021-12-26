const pointer = document.getElementById("point");
const container = document.getElementById("container");
const TextMsg = document.getElementById("txt");

const totalTime = 8000; //the total time taken in mileseconds
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

//console.log(totalTime, breatheTime, holdTime);

BreatheAnimation();

function BreatheAnimation(){
    TextMsg.innerText = "Breathe in!";
    container.className = "container grow";

    setTimeout(() =>{
        TextMsg.innerText = "Hold";

        setTimeout(() =>{
            TextMsg.innerText = "Exhale 💨💨";
            container.className = "container shrink";

        }, holdTime);
    }, breatheTime);

}setInterval(BreatheAnimation, totalTime);

function RedirectUserBACK(){

    window.location.replace("app.html");

}