// Assignment code here
var criteria = {
  length: 0,
  hasLowerCase: false,
  hasUpperCase: false,
  hasNumbers: false,
  hasSpecialChars: false,

  // Checks if criteria is valid
  // At least one set of character must be selected
  // and length is within range of 8 - 128
  isValid: function () {
    return (this.hasLowerCase ||
      this.hasUpperCase ||
      this.hasNumbers ||
      this.hasSpecialChars) &&
      (8 <= this.length && this.length <= 128);
  }
};

var userIsBusy = false; 
function generatePassword () {
  userIsBusy = true;

  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numericChars =  "01234567890";
  const specialChars = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  criteria.length = getIntFromUser("Enter password length (8 characters minimum):", 8, 128);
  while(true) {
   criteria.hasLowerCase = getYesOrNoFromUser("Will it have lower case letters? (y / n)");
   criteria.hasUpperCase = getYesOrNoFromUser("Will it have upper case letters? (y / n)");
   criteria.hasNumbers = getYesOrNoFromUser("Will it have numerics? (y / n)");
   criteria.hasSpecialChars = getYesOrNoFromUser("Will it have special characters? (y / n)");

   if(criteria.isValid()) {
    var possibleChars = "";
    if(criteria.hasLowerCase) possibleChars += lowerCaseChars;
    if(criteria.hasUpperCase) possibleChars += upperCaseChars;
    if(criteria.hasNumbers) possibleChars += numericChars;
    if(criteria.hasSpecialChars) possibleChars += specialChars;

    var newPassword = "";
    for(var i = 0; i < criteria.length; i++) {
      newPassword += possibleChars.charAt(randInt(possibleChars.length));
    }

    userIsBusy = false;
    return newPassword;
   }

   window.alert("At least one set of characters should be selected. Try again.");
  }
}

// Ask user a yes or no question
// Returns true if user selects yes, and false if no
function getYesOrNoFromUser(message) {
  const validInputs = ['y', 'n'];

  while(true) {
    var input = window.prompt(message);
    input = input.toLowerCase();
    
    if(input.length == 0) {
      window.alert("Please enter something.");
      continue;
    }

    input = input.charAt(0);
    if(validInputs.includes(input)) {
      return input == 'y' ? true : false;
    }

    window.alert("Please enter yes or no.");
  }
}

// Returns an integer in specified ranges from user
function getIntFromUser(message, minRange, maxRange) {
  if(maxRange <= minRange) // Ensure a valid range
    maxRange = minRange + 1;
    
  while(true) {
    var input = window.prompt(message);

    if(input.length == 0) {
      window.alert("Please enter something.");
      continue;
    }

    input = Number(input);

    if(Number.isNaN(input)) {
      window.alert("What you entered is not a number. Please enter a number.");
      continue;
    } else if (input < minRange) {
      window.alert("Number must be greater than or equal to " + minRange + ".");
      continue;
    } else if (maxRange < input) {
      window.alert("Number must be less than or equal to " + maxRange + ".");
      continue;
    }

    return Math.floor(input); // Ensure that it is an integer
  }
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  if(userIsBusy) return; // Unable to make another request until user is done answering all prompts

  var passwordText = document.querySelector("#password");

  var password = "";

  try { // Try to make password (may fail if user cancels)
    password = generatePassword();
  } catch(e) { // Gracefully end session if user cancels
    userIsBusy = false;
  }

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
