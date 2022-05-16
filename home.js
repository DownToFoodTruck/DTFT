//FIRST LOGIN EMAIL DENIAL/SUBMISSION REGEX TEST
const loginPress = document.getElementById("login")
loginPress.addEventListener("click", function () {
   var logButton = document.getElementById("passFail")
   var email = document.getElementById("email")
   if (ValidateEmail(email.value) == false) {
      logButton.style.display = "block";
   } else {
      logButton.style.display = "none";
   }
});


//SECOND LOGIN EMAIL DENIAL/SUBMISSION REGEX TEST
const loginPress2 = document.getElementById("login2")
loginPress2.addEventListener("click", function () {
   var logButton = document.getElementById("passFail2")
   var email = document.getElementById("email2")
   if (ValidateEmail(email.value) == false) {
      logButton.style.display = "block";
   } else {
      logButton.style.display = "none";
   }
});


//Valid email regex validation
function ValidateEmail(input) {

   var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

   if (input.match(validRegex)) {
      return true;
   } else {
      return false;
   }
}



//Modal Handling event listeners
document.getElementById("open-modal").addEventListener("click", function () {
   document.getElementById("overlay").style.display = "block"
})

document.getElementById("close-modal").addEventListener("click", function () {
   document.getElementById("overlay").style.display = "none"
})