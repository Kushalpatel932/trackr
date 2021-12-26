const greetingOneDisplay = document.getElementById("GreetingOne");
const greetingTwoDisplay = document.getElementById("GreetingTwo");
const motivationDisplay = document.getElementById("motivation");

const deleteButton = document.getElementById("delete");

const relapseBtn = document.getElementById("relapse");

const userName = localStorage.getItem("USERNAME");

const relapseDisplay = document.getElementById("relapseDisplay");



var welcomeMessage;
var lastRelapseDate;
var relapses;
FirstTimeCheck();
CheckForSavedDate();
ShowGreeting();
ShowMotivation();
DisplayRelapses();

function CheckForSavedData(){
    //This function checks if there is data saved in localStorage and redirects the user if there isn't
    
        console.log("PAGE LOADED");
        if(localStorage.getItem("USERNAME") == null || localStorage.getItem("ADDICTION") == undefined){
            //No data has been saved, send the user to the start page
            window.location.replace("index.html")
            localStorage.clear();
    
        }else{
    
            //Data has been saved... keep the user here...
        }

    }

function FirstTimeCheck(){
    //checking if this is the users first time here or not

    if(localStorage.getItem("FIRSTTIME") == null || localStorage.getItem("FIRSTTIME") === undefined){
        //User has not been here before...
        welcomeMessage = `Welcome to Addiction tracker for the first time ${userName}!`;
        localStorage.setItem("FIRSTTIME", "NO"); //Setting this value so the user doesnt see the first time message on their next visit

    }else{
        //User has been here before, change greeting to match
        welcomeMessage = `Welcome back ${userName}`;
        
    }

    lateRelapseDate = localStorage.getItem("LASTrelapse");

}

function ShowGreeting(){
 
    var date = new Date();


    var currentH = date.getHours();
    if(currentH >= 0){ //Added the arrow = so the line is now more than or equal too zero... This fixes the problem I was having...

        greetingOneDisplay.textContent = "Good morning";
        greetingTwoDisplay.textContent = welcomeMessage;

    }
    if(currentH >= 12){
        greetingOneDisplay.textContent = "Good afternoon";
        greetingTwoDisplay.textContent = welcomeMessage;
    }
    if(currentH >= 18){
        greetingOneDisplay.textContent = "Good evening";
        greetingTwoDisplay.textContent = welcomeMessage;
        
    }

    

}

function ShowMotivation(){

    var motivation = ["As human beings, our greatness lies not so much in being able to remake the world… as in being able to remake ourselves. - Mahatma Gandhi", "You cannot solve a problem from the same consciousness that created it. You must learn to see the world anew. - Albert Einstein", "If you find yourself in a hole, the first thing to do is stop digging. - Unknown", "The best way out is always through. – Robert Frost", "The opposite of addiction is not sobriety, but human connection. - Unknown", "I’m Not Telling You It Is Going To Be Easy, I’m Telling You It’s Going To Be Worth It. - Unknown", "You Are Not Defined By your Relapses, But By My Decision To Remain In Recovery Despite Them. - Unknown"];
    //All the motivational quotes stored in an array


    var rand = Math.floor((Math.random() * 7) + 1);
    //console.log(rand);

    var quoteToShow = motivation[rand - 1]; //The randomnumber is between 1 and 7 so I have to take one off so the numbers ill be between 0 and 6 for the array...

    motivationDisplay.textContent = quoteToShow;


}setInterval(ShowMotivation, 25000); //Running this again every 25 seconds


function RedirectUserEMERGENCY(){

    if(localStorage.getItem("FIRSTTIMErelaxer") == null || localStorage.getItem("FIRSTTIMErelaxer") == undefined){



var r = confirm(`Hello, This relaxer is designed to help you breather, calm down and beat any cravings!
Follow the instructions as they are presented...`);
        
            if (r == true) {
                window.location.replace("breathingApp.html");
            } else {
                //Do nothing
            }
        
            //Showing the user a message If the have not been to the relaxer before
            localStorage.setItem("FIRSTTIMErelaxer", "NO"); //Updating local storage so they won't see this message again...
        
        }else{
        
            window.location.replace("breathingApp.html");
        }


}

function Relapse(){

    //This code will be run when the user logs a relapse
    relapses = JSON.parse(localStorage.getItem("relapsesArray"));
    var relapseNumber = (relapses.length);
    lastRelapseDate = new Date();
    localStorage.setItem("LASTrelapse", lastRelapseDate);


    lastRelapseDate = localStorage.getItem("LASTrelapse");

    relapses.push("🔥 Relapse " + relapseNumber + ": " + new Date());
    localStorage.setItem("relapsesArray",  JSON.stringify(relapses));
   

    DisplayRelapses();
}

function RemoveAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function DisplayRelapses(){
    relapses = JSON.parse(localStorage.getItem("relapsesArray"));
    RemoveAllChildNodes(relapseDisplay);


    for (let i = 0; i < relapses.length; i++) {
        console.log(relapses[i]);

        var currentText = relapses[i];

        var newRelapse = document.createElement("h3");
        newRelapse.className = "relapse";
        newRelapse.innerHTML = currentText;
        
        relapseDisplay.appendChild(newRelapse);

      }


}

function CheckForSavedDate(){


    if(localStorage.getItem("LASTrelapse") == null || localStorage.getItem("LASTrelapse") == undefined){

        //No previous relapse date stored

    }else{

        lastRelapseDate = localStorage.getItem("LASTrelapse");

    }
}

updateClock();

function updateClock ( )
{

  var currentTime = new Date ( );

  var currentHours = currentTime.getHours ( );
  var currentMinutes = currentTime.getMinutes ( );
  var currentSeconds = currentTime.getSeconds ( );

  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

  // Choose either "AM" or "PM" as appropriate
  var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

  // Convert the hours component to 12-hour format if needed
  currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

  // Convert an hours component of "0" to "12"
  currentHours = ( currentHours == 0 ) ? 12 : currentHours;

  // Compose the string for display
  var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;

  // Update the time display
  document.getElementById("clock").innerHTML = currentTimeString;


  const lastDisplay = document.getElementById("last");

  lastDisplay.innerHTML = "Last relapse: " + lastRelapseDate;

}

setInterval('updateClock()', 1000 )





relapseBtn.addEventListener("click", (e)=>{

    Relapse();

})

deleteButton.addEventListener("click", (e) =>{

    localStorage.clear();
    document.location.reload();
})
