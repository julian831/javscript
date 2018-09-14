
//Demonstration of function-level scope
var juice = "orange"; //this is a global variable
function showName(){
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
for (var i = 0; i < 21; i+=2) {
	console.log (i); 
};
console.log("-----------------");

// The variable i is a global variable and it is accessible in the following function with the last value it was assigned above 
function aNumber () {
console.log(i);
}

// The variable i in the aNumber function below is the global variable i that was changed in the for loop above. Its last value was 11, set just before the for loop exited:
aNumber ();  // 11


//variable Hoisting 

