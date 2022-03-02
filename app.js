"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      console.log(searchResults)
      break;
    case 'no':
      // TODO: search by traits

    // wantedSearch(people)// Starts Trait search
      
    searchResults = searchByGender(people);

    
    // searchByEyeColor(foundPeople);
    
      
      // searchByHeight(foundPeople);
      
      console.log(foundPeople)
      // mainMenu(people);

      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
  console.log("We Made it");

}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//FUNCTION FOR FINDING PEOPLE BY FIRST AND LAST NAME

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  
  return foundPerson[0];
}

function searchByTraitsFound(people){
  
  let firstName = promptFor("Please enter displayed First Name"); 
  let lastName = promptFor("Please enter displayed Last Name");
  let foundPerson = people.filter(function(potentialMatch){
  if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
    console.log(foundPerson)
    return true;
  }
  else{
    return false;
  }

  })
  return foundPerson;
}
// What is user gender choice
function searchByGender(people){
  let chosenGender = promptFor("What is the person's gender?", autoValid);

  let foundGender = people.filter(function(potentialMatch){
    if(potentialMatch.gender === chosenGender){
      return true;
    }
   else{
     return false;
    }
  })
  displayPeople(foundGender);
  let foundPeople = foundGender;
  searchByEyeColor(foundPeople);
  
  return foundPeople;

//FUNCTION FOR FINDING PEOPLE BY EYE COLOR

function searchByEyeColor(people){
  let chosenEyeColor = promptFor("What is the person's eye color?", autoValid);
  
  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === chosenEyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  displayPeople(foundPeople);
  searchByHeight(foundPeople);
  return foundPeople;

}

// function wantedSearch(people){
//   let foundPeople = people;
  
//   // displayPeople(foundPeople) // found people is to be pass into each f(x)
//   searchByEyeColor(foundPeople);
//   console.log(foundPeople)
  
//   searchByGender(foundPeople);
//   searchByHeight(foundPeople);
  
//   console.log(foundPeople)
//   mainMenu(foundPeople);

// }

// if (foundPeople > 0){
//     let (foundPeople = people);
//     mainMenu(people)
//   }
//   else{
//     return false
//   }


  // if (foundPeople === 0)
  // let foundPeople = person 
  // console.log("One person Found")
  // console.log(person)

  // searchByHeight(foundPeople)
  // mainMenu(person)
  
  // // console.log(foundPeople)  DISPLAY TEST
  
   
  // return foundPeople;
  
// }

//FUNCTION FOR FINDING PEOPLE BY GENDER.

}

//FUNCTION FOR FINDING PEOPLE BY HEIGHT

function searchByHeight(people){
  let chosenHeight = promptFor("What is the person's height?", autoValid);

  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.height === chosenHeight){
      return true;
    }
   else{
     return false;
   }
  })
  displayPeople(foundPeople);
  searchByTraitsFound(foundPeople);
  
  console.log(foundPeople)
  return foundPeople;
  // let people = foundHeight
  // return people;
}



//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion