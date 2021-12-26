const nextBtn = document.getElementById("nextBtn");
const option1 = document.getElementById("substance");
const option2 = document.getElementById("behavior");

var option;

option1.addEventListener("click", (event) => {

  console.log("User has selected substance addiction category");
  option1.classList.toggle("selected");
  option2.classList.remove("selected");

  option = 1;

  nextBtn.style.display = "block"; //DISPLAYING THE NEXT BUTTON TO THE USER AFTER THEY SELECT AN OPTION
})
option2.addEventListener("click", (event) => {

  console.log("User has selected behavioral addiction category");
  option2.classList.toggle("selected");
  option1.classList.remove("selected");
  //Highlighting the box clicked and un-highlighting the other box

  option = 2;

  nextBtn.style.display = "block"; //DISPLAYING THE NEXT BUTTON TO THE USER AFTER THEY SELECT AN OPTION
})

nextBtn.addEventListener("click", (event) => {

  localStorage.setItem("typeOfAddiction", option);
  window.location.replace("optionstwo.html")


})