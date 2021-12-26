
const days = document.getElementById("daysSelect");
const name = document.getElementById("nameInput");

function GoalData(){
    var nameSelected = name.value;
    var daysSelected =  days.value;
    SetGoal(nameSelected, daysSelected);
}

function SetGoal(goalName, goalDuration){

    var now = new Date();
    var day = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();

    localStorage.setItem("currentGoal", JSON.stringify({
        name: goalName,
        duration: goalDuration,
        dateStarted: new Date(),
        dateStartedShort: `${day}/${month}/${year}`
    }))

    window.location.replace("../main-app/app.html")

}

