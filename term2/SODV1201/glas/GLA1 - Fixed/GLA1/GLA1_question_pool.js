//SODV1201 JS code GLA1
//Name:   //ID
//--------------------------------------------------------------------------------------------
//Q1 
//Define an array named myArray with the following 
//element 3,6,8,10,12  and print it out on the console

let myArray = [3, 6, 8, 10, 12];
  console.log(myArray);



//Q2 
//Define an object called Person to store the following information  
//Name= Torne, age = 34. Torne have a honda car , car price is 30K and it is 2019 version
//Print the name and age of the person object on console

let Person = {
    name: "Torne",
    age: 34,
    car: {
        brand: "Honda",
        price: 30000,
        year: 2019
    }
};

console.log("Name: " + Person.name);
console.log("Age: " + Person.age);




//Q3
//Write a simple function that print the car information on console from person object you created on question 2. 
//Do not create a new person object.

function printCarInfo() {
    console.log("Car Brand: " + Person.car.brand);
    console.log("Car Price: $" + Person.car.price);
    console.log("Car Year: " + Person.car.year);
}

printCarInfo();


 
//Q4  Write a function with function callback to calculate the sum of
//three constant numbers 
//let a = 10, b = 20 , c= 30

let a = 10, b = 20, c = 30;

function sum(x, y, z, callback) {
    let result = x + y + z;
    callback(result);
}

function printResult(result) {
    console.log("The sum is: " + result);
}

sum(a, b, c, printResult);

     

//Q5
// Write a program that can calculate the sum of given array elements.
// For example if you have array of 1,2,3,4 then the output should be 10

let array = [1, 2, 3, 4];

function sumArrayElements(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

let result = sumArrayElements(array);
console.log("The sum of the array elements is: " + result);


 
 //Q6
 //Consider the following array object datasetArray = [4,3,6,1,7,0] 
 //Write a program that search and display all odd numbers from the given array data. 
 
 let datasetArray = [4, 3, 6, 1, 7, 0];

function findOddNumbers(arr) {
    let oddNumbers = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 !== 0) {
            oddNumbers.push(arr[i]);
        }
    }
    return oddNumbers;
}

let result1 = findOddNumbers(datasetArray);
console.log("Odd numbers in the array are: " + result1);


//Q7
// Write  JS code to create empty array named Employee. 
// Create a function to add a new element  in to an empty array  that you created.
// Write a code to display your Employee array with its new elements inserted using your function 
// Sample array data that you can insert   (Taniya , Hie , Li , Nina )

let Employee = [];

function addEmployee(name) {
    Employee.push(name);
}


addEmployee("Taniya");
addEmployee("Hie");
addEmployee("Li");
addEmployee("Nina");

console.log("Employee array:", Employee);



