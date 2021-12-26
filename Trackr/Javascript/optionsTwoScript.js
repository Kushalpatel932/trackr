var optionSelected = localStorage.getItem("typeOfAddiction");
var addictionType;

const substanceSelect = document.getElementById("substance");
const behavioralSelect = document.getElementById("behavioral");

if(optionSelected == 1){
    addictionType = "substance addiction";
    //THE USERS ADDICTION TYPE IS SUBSTANCE

    behavioralSelect.style.display = "none"; //HIDING THE OTHER SELECTOR
}else{
    addictionType = "behavioral addiction"
    //THE USERS ADDICTION TYPE IS BEHAVIORAL

    substanceSelect.style.display = "none"; //HIDING THE OTHER SELECTOR
}


console.log(optionSelected);
new TypeIt("#message", {
    strings: `You selected the ${addictionType} category`,
    speed: 75,
    waitUntilVisible: true,
    cursor: false
  }).go();
setTimeout(()=>{
    document.getElementById("messageTwo").style.display ="block";
    document.getElementById("main").style.display = "block"; //SHOWING THE MAIN AREA
}, 4200);




substanceSelect.addEventListener("change", ()=>{
    console.log("change [substance]");
    document.getElementById("finish").style.display = "block";
    localStorage.setItem("addictionName", substanceSelect.value);
})

behavioralSelect.addEventListener("change", ()=>{
    console.log("change [behavioral]");
    document.getElementById("finish").style.display = "block";
    localStorage.setItem("addictionName", behavioralSelect.value);
})