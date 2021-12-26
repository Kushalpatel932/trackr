function CheckData() {
    //THIS FUNCTION CHECKS TO SEE IF THERE IS DATA SAVED IN LOCALSTORAGE RELATED TO THIS APPLICATION.
    //IF THERE IS DATA IT MEANS THE USER HAS ALREADY BEGAN USING THIS APP AND DOES NOT NEED TO ACCESS THIS PAGE
    //SO IT WILL REDIRECT USERS AWAY FROM THIS PAGE

    if (localStorage.getItem("username")) {
        //USER HAS USED APP BEFORE, REDIRECT!
        window.location.replace("/main-app/app.html");
    } else {
        //THE USER HAS NOT USED THE APP BEFORE, KEEP THEM ON THIS PAGE
    }
}

const nameInput = document.getElementById("name");
nameInput.addEventListener("change", () => {

    if (nameInput.value) {

        nameInput.classList.toggle("green");
        localStorage.setItem("username", nameInput.value);
        //SAVING WHAT THE USER HAS ENTERED INTO LOCAL STORAGE
    } else {
        nameInput.classList.toggle("red")
    }

})

const btn = document.querySelector("button");
btn.addEventListener("click", (e) => {
    var now = new Date();
    var day = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();

    var time;
    
    e.preventDefault();

    if (nameInput.value) {
        SaveTime();
        nameInput.classList.toggle("green");

        var relapses = ["✨ When you quit: " + new Date()]; //Creating and saving an item  when the user starts using the web app so this localStorage value will never be null in the main app and I wont have to check if it is null or not...
        localStorage.setItem("relapsesArray",  JSON.stringify(relapses));
        localStorage.setItem("lastRelapse", JSON.stringify({
            date: `${day}/${month}/${year}`,
            time: time
        }));

        var moods = ["INITIALIZING THE ARRAY BEFORE THE MAIN APP STARTS"];
        localStorage.setItem("moods", JSON.stringify(moods)); //SETTING THIS TO A VALUE BEFORE THE MAIN APP STARTS SO THE LOCALSTORAGE ARRAY WILL NEVER BE UNDEFINED IN THE MAIN APP

        window.location.replace("optionsPages/options.html");
        //THE USER HAS SUBMITTED TEXT, REDIRECTING THEM
    } else {

        nameInput.classList.toggle("red")
        //WARNING THE USER TO ENTER A VALUE
    }
})

function SaveTime(){
    //THIS FUNCTION CALCULATES AND SAVES WHAT TIME OF DAY IT IS (MORNING, AFTERNOON, ETC)

    var timesArray; 
    var date = new Date();

    var currentH = date.getHours();
    if (currentH >= 0) {
        //MORNING  
        timesArray = ["morning"] 
    }
    if (currentH >= 12) {
        //AFTERNOON
        timesArray = ["afternoon"] 
    }
    if (currentH >= 18) {
        //NIGHT
        timesArray = ["night"] 
    }

    localStorage.setItem("timesArray", JSON.stringify(timesArray));
}