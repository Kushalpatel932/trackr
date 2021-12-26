const button = document.getElementById("submitButton");
const container = document.getElementById("container");

const nameInput = document.getElementById("nameIn");
const addictionInput = document.getElementById("addictionIn");

var dataHasBeenEntered = false;

function CheckForSavedData(){
//This function checks if there is data saved in localStorage and redirects the user if there is

    if(localStorage.getItem("USERNAME") == null || localStorage.getItem("ADDICTION") == undefined){

        //No data has been saved, keep the user on this start page
        //DO NOTHING BASICALLY...

    }else{

        //Data has been saved... redirect the user away from this page to the main page
        window.location.replace("app.html")


    }


}

function CheckForBlanks(){

    if(nameInput.value == ""){
        dataHasBeenEntered = false;

        nameInput.className = "warn"; //Setting the class list to include warn which I will use to style the input red in CSS

    }else{

        nameInput.className = "yes"; //Setting the class list to have yes which will be green in CSS
    }

    if(addictionInput.value == ""){
        dataHasBeenEntered = false;

        addictionInput.className = "warn";

    }
    else{

        addictionInput.className = "yes";
    }



    if(nameInput.value && addictionIn.value){

        //Neither fields are empty... proceeding with the data saving
        dataHasBeenEntered = true;

    }else{

        dataHasBeenEntered = false;
    }
}


function SaveData(){

    CheckForBlanks();

    if(dataHasBeenEntered){ //Only proceeding with saving the data if both values have been entered

        //Getting the data
        var name = nameInput.value;
        console.log(name);

        var addiction = addictionIn.value;
        console.log(addiction);

        var relapses = ["✨ When you quit: " + new Date()]; //Creating and saving an item  when the user starts using the web app so this localStorage value will never be null in the main app and I wont have to check if it is null or not...
        localStorage.setItem("relapsesArray",  JSON.stringify(relapses));

        //Saving the data to localStorage
        localStorage.setItem("USERNAME", name);
        localStorage.setItem("ADDICTION", addiction);

        lastRelapseDate = new Date();
        localStorage.setItem("LASTrelapse", lastRelapseDate);

        
        setTimeout(() =>{
            window.location.replace("app.html");

        }, 1000);
        
    }

}


button.addEventListener("click", (e) =>{

    e.preventDefault();

    SaveData();


})