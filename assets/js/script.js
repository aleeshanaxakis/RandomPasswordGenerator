// Assignment Code 
var generateBtn = document.querySelector("#generate");

// Define character arrays
var specialCharacters = ["!", "@", "#", "$", "%", "&", "'", "*", "(", ")", "+", ",", "-", ".", "/", ":", ";", "<", ">", "=", "?", "[", "]", "^", "_", "{", "}", "|", "~"];
var numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var lowerCasedCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperCasedCharacters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Function to get user preferences
function getPasswordOptions() {
  // Prompt user for password length and store it as an integer in 'length'
var length = parseInt(prompt('How many characters would you like your password to contain?'), 10);

// Define length requirements
if (Number.isNaN(length)) {
  alert('Password length must be provided as a number');
  return null;
}

if (length < 8) {
  alert('Password length must be at least 8 characters');
  return null;
}

if (length > 128) {
  alert('Password length must be less than 129 characters');
  return null;
}

// Confirm with the user for various character types and store the booleans.
var hasSpecialCharacters = confirm('Click OK to confirm including special characters.');
var hasNumericCharacters = confirm('Click OK to confirm including numeric characters.');
var hasLowerCasedCharacters = confirm('Click OK to confirm including lowercase characters.');
var hasUpperCasedCharacters = confirm('Click OK to confirm including uppercase characters.');

// If all options are false, alert the user and return null.
if (
  hasSpecialCharacters === false &&
  hasNumericCharacters === false &&
  hasLowerCasedCharacters === false &&
  hasUpperCasedCharacters === false
) {
  alert('Must select at least one character type');
  return null;
}

// Create an object called 'passwordOptions' to store all these values.
var passwordOptions = {
  length: length,
  hasSpecialCharacters: hasSpecialCharacters,
  hasNumericCharacters: hasNumericCharacters,
  hasLowerCasedCharacters: hasLowerCasedCharacters,
  hasUpperCasedCharacters: hasUpperCasedCharacters,
};

// Return the 'passwordOptions' object.
return passwordOptions;
}

// Function to get random element from array
function getRandom(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Generate password function
function generatePassword() {
  var options = getPasswordOptions();
  var result = [];
  var possibleCharacters = [];
  var guaranteedCharacters = [];
  if (options === null) {
    return null;
  }

  if (options.hasSpecialCharacters) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandom(specialCharacters));
  }
  if (options.hasNumericCharacters) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guaranteedCharacters.push(getRandom(numericCharacters));
  }
  if (options.hasLowerCasedCharacters) {
    possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
    guaranteedCharacters.push(getRandom(lowerCasedCharacters));
  }
  if (options.hasUpperCasedCharacters) {
    possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
    guaranteedCharacters.push(getRandom(upperCasedCharacters));
  }

  // Iterate from 1 to options.length, each time adding a random character from possibleCharacters to result
  for (let i = 1; i <= options.length; i++) {
    var randomCharacter = getRandom(possibleCharacters);
    result.push(randomCharacter);
  }

  // Replace the beginning of result with the characters in guaranteedCharacters.
  for (let i = 0; i < guaranteedCharacters.length; i++) {
    result[i] = guaranteedCharacters[i];
  }

  // Join result into a string and return it.
  return result.join('');
}
// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button - potential syntax error 
generateBtn.addEventListener("click", writePassword);
