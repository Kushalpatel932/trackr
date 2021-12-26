//DISPLAYS
const greetingOneDisplay = document.getElementById("GreetingOne");
const greetingTwoDisplay = document.getElementById("GreetingTwo");
const goalDisplay = document.getElementById("goalDisplay");
const goalDuration = document.getElementById("goalDuration");
const daysSinceDisplay = document.getElementById("daysSince")
const relapseDisplay = document.getElementById("relapseDisplay");

//BUTTONS
const deleteGoalButton = document.getElementById("delGoalBtn");

var relapses = [];

DateCalculation();
ShowGreeting();
ChartTimes();
DisplayRelapses();
ChartMoods();
setInterval("updateClock()", 1000);



function CheckForSavedData() {
    //This function checks if there is data saved in localStorage and redirects the user if there isn't

    console.log("PAGE LOADED");
    if (localStorage.getItem("username") == null || localStorage.getItem("addictionName") == undefined) {
        //No data has been saved, send the user to the start page
        window.location.replace("../index.html")
        localStorage.clear();

    } else {
        CheckForGoal();
        //Data has been saved... keep the user here...
    }

}


//GREETING THE USER
function ShowGreeting() {

    var date = new Date();
    var addiction = localStorage.getItem("addictionName");

    var currentH = date.getHours();
    if (currentH >= 0) {

        greetingOneDisplay.textContent = "Good morning";
        greetingTwoDisplay.innerHTML = `You <strong>can</strong> beat your ${addiction.toLocaleLowerCase()}!`
    }
    if (currentH >= 12) {
        greetingOneDisplay.textContent = "Good afternoon";
    }
    if (currentH >= 18) {
        greetingOneDisplay.textContent = "Good evening";

    }



}

//THE CLOCK
function updateClock() {

    var currentTime = new Date();

    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    var currentSeconds = currentTime.getSeconds();

    // Pad the minutes and seconds with leading zeros, if required
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

    // Choose either "AM" or "PM" as appropriate
    var timeOfDay = (currentHours < 12) ? "AM" : "PM";

    // Convert the hours component to 12-hour format if needed
    currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;

    // Convert an hours component of "0" to "12"
    currentHours = (currentHours == 0) ? 12 : currentHours;

    // Compose the string for display
    var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;

    // Update the time display
    document.getElementById("clock").innerHTML = currentTimeString;



}

function CheckForGoal() {
    //CHECKING FOR SAVED GOALS

    if (localStorage.getItem("currentGoal")) {
        //A GOAL IS SAVED...
        goalDisplay.textContent = "Name: " + JSON.parse(localStorage.getItem("currentGoal")).name;
        goalDuration.textContent = "Duration: " + JSON.parse(localStorage.getItem("currentGoal")).duration + " Days";

        deleteGoalButton.style.display = "block";

    } else {
        //NO GOAL SAVED
        deleteGoalButton.style.display = "none";
    }

}

function Relapse() {


    relapses = JSON.parse(localStorage.getItem("relapsesArray"));
    var relapseNumber = (relapses.length);

    relapses.push("🔥 Relapse " + relapseNumber + ": " + new Date());
    localStorage.setItem("relapsesArray", JSON.stringify(relapses));


    var now = new Date();
    var day = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();

    var time;

    if (now.getMinutes() < 10) {
        time = `${now.getHours()}:0${now.getMinutes()}` //ADDING A ZERO BEFORE THE MINUTES IF IT'S LESS THAN TEN
    } else {
        time = `${now.getHours()}:${now.getMinutes()}`
    }

    console.log(`${day}/${month}/${year} - ${time}`);

    localStorage.setItem("lastRelapse", JSON.stringify({
        date: `${day}/${month}/${year}`,
        time: time
    }));

    localStorage.removeItem("currentGoal");

    window.location.replace("../main-app/relapse.html");
}

function RemoveAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function DisplayRelapses() {
    relapses = JSON.parse(localStorage.getItem("relapsesArray"));
    RemoveAllChildNodes(relapseDisplay);


    for (let i = (relapses.length - 3); i < relapses.length; i++) { //ONLY SHOWING THE LAST 3 RELAPSES
        console.log(relapses[i]);

        var currentText = relapses[i];

        var newRelapse = document.createElement("h3");
        newRelapse.className = "relapse";
        newRelapse.innerHTML = currentText;

        relapseDisplay.appendChild(newRelapse);

    }
}


function DateCalculation() {

    try {

        moment().format();

        var now = new Date();
        var day = now.getDate();
        var month = now.getMonth() + 1;
        var year = now.getFullYear();

        //ALL STUFF TO DO WITH RELAPSE AND DATE
        if (localStorage.getItem("lastRelapse")) {
            var lastRelapseDate = JSON.parse(localStorage.getItem("lastRelapse")).date;

            var a = moment(lastRelapseDate, 'D/M/YYYY');
            var b = moment(`${day}/${month}/${year}`, 'D/M/YYYY');
            var diffDays = b.diff(a, 'days');
            daysSinceDisplay.textContent = diffDays;
        }

        //ALL STUFF RELATED TO THE GOAL DATES
        if (localStorage.getItem("currentGoal")) {
            var goalSet = JSON.parse(localStorage.getItem("currentGoal")).dateStartedShort;

            var a2 = moment(goalSet, 'D/M/YYYY/');
            var b2 = moment(`${day}/${month}/${year}`, 'D/M/YYYY');
            var diffDays2 = b2.diff(a2, 'days');
            console.log("Days progressed in current goal: " + diffDays2);

            if (diffDays2 >= JSON.parse(localStorage.getItem("currentGoal")).duration) {
                console.log("GOAL UP");
                //THE GOAL DURATION HAS FINISHED

                window.location.replace("/main-app/goalUp.html")
            }

        }



    } catch {
        console.log("FATAL ERROR OCCURRED");
    }

}

function ChartTimes() {

    var timesArray = JSON.parse(localStorage.getItem("timesArray"));

    var nights = timesArray.filter((time) => {
        return time == "night";
    })
    //console.log(nights);


    var afternoons = timesArray.filter((time) => {
        return time == "afternoon";
    })
    //console.log(afternoons);


    var mornings = timesArray.filter((time) => {
        return time == "morning";
    })
    //console.log(mornings);


    var ctx = document.getElementById('chart1');
    var firstChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Morning", "Afternoon", "Night"],
            datasets: [{
                label: '# of Votes',
                data: [mornings.length, afternoons.length, nights.length],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    display: false
                }]
            },
            layout:{
                padding: 10
            }
        }
    });
}


function ChartMoods() {

    var ctx = document.getElementById('chart2');

    var moodsArray = JSON.parse(localStorage.getItem("moods"));


    if (moodsArray.length < 2) { //IF THE ONLY ITEM IN THE MOODS ARRAY IS THE DEFAULT ONE CREATED THE FIRST TIME THE APP IS STARTED, HIDE THE DISPLAY!
        ctx.style.display = "none";
        document.getElementById("infoMsg").style.display = "block";
        return;
    } else {
        ctx.style.display = "block";
        document.getElementById("infoMsg").style.display = "none"; //Hiding the info msg
    }

    var ones = moodsArray.filter((one) => {
        return one == 1;

    })
    var twos = moodsArray.filter((two) => {
        return two == 2;

    })
    var threes = moodsArray.filter((three) => {
        return three == 3;

    })
    var fours = moodsArray.filter((four) => {
        return four == 4;

    })
    var fives = moodsArray.filter((five) => {
        return five == 5;

    })

    var secondChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Brilliant", "Happy", "Meh", "Sad", "Despairing"],
            datasets: [{
                label: '# of Votes',
                data: [ones.length, twos.length, threes.length, fours.length, fives.length],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    display: false
                }]
            }
        },
        layout:{
            padding: 10
        }
    });

}

function DeleteData() {

    var r = confirm("Are you sure you want to erase all app data stored in local storage");
    if (r == true) {
        localStorage.clear();
        window.location.reload();
    }

}