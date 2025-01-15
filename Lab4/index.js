//Q1
// test case 
// let array = [10, 22, "string", 24]; // Contains a non-numeric value
// let array = []; // array is Empty 

Array.prototype.calAvg = function() {
    if (this.length === 0) {
        console.log("The array is empty. Cannot calculate the average.");
        return; 
    }

    let sum = 0;
    let count = 0;

    this.forEach(item => {
        if (typeof item === 'number') {
            sum += item;
            count++;
        } else {
            console.log(`Skip non-numeric value: ${item}`);
        }
    });

    if (count === 0) {
        console.log("No valid numbers to calculate the average.");
    } else {
        let average = sum / count;
        console.log("Average calculated using calAvg method: " + average);
    }
};

let array = [10, 20, "hello", 30];
array.calAvg();

//////////////////////////////////////////////////////////////////////////////////////////
// Q2
let number = 123;
let booleanValue = true;
let obj = { name: "Aya", age: 30 };

console.log(String(number)); 
console.log(String(booleanValue));  
console.log(String(obj));  

Object.prototype.toString = function() {

    if (this.message) {
        return this.message;  
    }
    return 'This is an object';  
};


var obj1 = {};
console.log(String(obj1));  

var obj2 = { message: 'This is a message' };
console.log(String(obj2)); 

var obj3 = { name: 'John' };
console.log(String(obj3));  
/////////////////////////////////////////////////////////////////////////////////////////////
// Q3
function Vehicle(type, speed) {
    if (Vehicle.count >= 50) {
        throw new Error('Vehicle limit reached');
    }
    this.type = type;
    this.speed = speed;
    Vehicle.count++;
}

Vehicle.count = 0;

Vehicle.prototype.start = function() {
    console.log(this.type + ' is starting.');
};

Vehicle.prototype.stop = function() {
    console.log(this.type + ' has stopped.');
};

function Car(type, speed, brand) {
    Vehicle.call(this, type, speed);
    this.brand = brand;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.drive = function() {
    console.log(this.brand + ' is driving.');
};

try {
    var car1 = new Car('Sedan', 120, 'Toyota');
    car1.start();
    car1.drive();
    car1.stop();

    for (var i = 0; i < 49; i++) {
        new Vehicle('Truck', 30);
    }

    new Vehicle('Van', 100);
} catch (error) {
    console.error(error.message);
}

function isInstanceOfCar(obj) {
    return obj instanceof Car; 
}

function isInstanceOfCarAlt(obj) {
    return obj instanceof Car; 
}

var car2 = new Car('SUV', 150, 'Honda');
console.log(isInstanceOfCar(car2)); 
console.log(isInstanceOfCarAlt(car2)); 

var vehicle2 = new Vehicle('Bike', 60);
console.log(isInstanceOfCar(vehicle2)); 
console.log(isInstanceOfCarAlt(vehicle2)); 
