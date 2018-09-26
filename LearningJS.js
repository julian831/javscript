
//Demonstration of function-level scope
var juice = "orange"; //this is a global variable
function showName() {
    var juice = "grape"; //local variable, scope is function
    console.log(juice) + "juice"; //grape
} 
console.log("-----------------");
//The var variable does not have block-level scope
if (juice) {
    juice = "apple"; //this name is the global variable because it was not declared
    console.log(juice + " juice");
}

console.log(juice + " juice");
console.log("-----------------");
//What happens when you don't declare variables using the "var" keyword

function showJuice() {
    console.log(juice + " juice");
}

function showOrganicJuice() {
    juice = "pineapple";
    console.log(juice + " juice");

}
console.log("This is calling ")
showJuice() + console.log("is the modified global variable because it did not declare  local variable with var");
showOrganicJuice() + console.log("calls the global variable, not a local variable");
console.log("-----------------");

//Variables that are in the global scope
for (var i = 0; i < 21; i += 2) {
    console.log(i);
};
console.log("-----------------");

// The variable i is a global variable and it is accessible in the following function with the last value it was assigned above 
function aNumber() {
    console.log(i);
}

// The variable i in the aNumber function below is the global variable i that was changed in the for loop above. Its last value was 11, set just before the for loop exited:
aNumber();  // 11

console.log("-----------------");


//variable Hoisting 

//both the variable and the function bear the same name
var myDog;
function myDog() {
    console.log("Spot");
}

//function declaration overrides variable name
console.log(typeof myDog); // outputs function

//however if I assigned the variable, it would override the function declaration
var myDog = "Max";

console.log(typeof myDog); // outputs string
console.log(myDog);// outputs variable myDog over function

console.log("-----------------");

//Understanding Closures

//A closure is created by adding a function within a function
//outer function
function showFruitSalad(fruit1, fruit2, fruit3) {
    var fruitSalad = "My fruit salad has ";

    //inner function has access to outer functions variables and parameters
    function makeFruitSalad() {
        return fruitSalad + fruit1 + ", " + fruit2 + ", and " + fruit3 + " in it!";
    }

    return makeFruitSalad();
}
console.log(showFruitSalad("apples", "watermelon", "blueberries"));

var fruitSalad1 = showFruitSalad("pineapple", "strawberries", "cantaloupe");
fruitSalad1("watermelon", "blueberries");

//closures have access to the outer fucntion's variables and parameters even after the outer function returns 
function cartoonCharacter(firstName) {
    var intro = "This character's name is ";
    function lastName(theLastName) {
        return intro + firstName + " " + theLastName;
    }
    return lastName;
}

// In this stateemnt, the cartoonCharacter outer function is returned.
var character1 = cartoonCharacter("Jimmy");

// the closure lastName is called here after the outer function has returned above, however this closure still has access to the outer function's variabes and parameter
console.log(character1("Neutron"));

//closure store references to the outer function's variables, not the actual value 
function employeeID() {
    var employeeID = 1234;

    //returning an object with some inner fucntions
    return {
        getID: function () {
            //this innner function returns updated employeeId variable
            return employeeID;
        },
        setID: function (updatedId) {
            //this will change the outer function's variable
            employeeID = updatedId;
        }
    }

}
var employee1 = employeeID();
console.log(employee1.getID()); //returns originial employeeID variable
employee1.setID(2468); //changes the outer function's variable
console.log(employee1.getID()); //returns updated employeeID variable

//The potential problem of closures
//The outer function runs the entire loop and returns the last value of i which is 103, this is because the fucntrion acesses the variables by reference and not by value
function employeeIDCreator(Employees) {
    var i;
    var uniqueID = 100;
    for (i = 0; i < Employees.length; i++) {
        //assigns a new value to a variable inside an array of objects
        //Employee[i] calls object by its array position, ["id"] calls the objects property by name

        Employees[i]["id"] = function () {
            //reassigns the value from "0" to the return of the function
            return uniqueID + i;
        }()
    }

    return Employees;
}

var adminEmployees = [{ name: "Joseph", id: 0 }, { name: "Paul", id: 0 }, { name: "Jacob", id: 0 }];

var createIDForAdmins = employeeIDCreator(adminEmployees);

var JosephID = createIDForAdmins[0];
console.log(JosephID.id());

//this can be fixed by using an Immediately invoked function expression (IIFE)
function facultyIDCreator(Faculty) {
    var i;
    var uniqueID = 100;
    for (i = 0; i < Faculty.length; i++) {
        // the j paramteric variable is the i passed into the IIFE 
        Faculty[i]["id"] = function (j) {
            return function () {
                //each iteration of the for loop passes on the current value of i and saves the correct value to the array
                return uniqueID + j;
            }() // this executes the expression immediately and returns just the value of uniqueID + i instead of the function
        }(i); // immediately invokes the function passing i as the parameter
    }
    return Faculty;
}

var managerFaculty = [{ name: "Bejamin", id: 0 }, { name: "David", id: 0 }, { name: "Peter", id: 0 }];

var createIDForManagers = facultyIDCreator (managerFaculty);

var benjaminID = createIDForManagers [0];
console.log(benjaminID.id);

var davidID = createIDForManagers [1];
console.log(davidID.id);
