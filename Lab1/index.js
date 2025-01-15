//Q1
function isPalindrome(input) {
   
    if (typeof input !== 'string') {
        return 'Input Must be String'; 
    }
    var filteredStr = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    var length = filteredStr.length;
    for (var i = 0; i < Math.floor(length / 2); i++) {
        if (filteredStr[i] !== filteredStr[length - 1 - i]) {
            return false;
        }
    }
    return true;
}

console.log(isPalindrome("RAcecAr"));
console.log(isPalindrome("Eva, can I see bees in a cave?")); 
console.log(isPalindrome("Never a foot too far, even."));
console.log(isPalindrome("Hello World")); 
console.log(isPalindrome("JavaScript"));
console.log(isPalindrome(12921)); 
///////////////////////////////////////////////////////////////////////////
// Q2
function calculateDiscountedPrice(price, discount) {
    if (typeof price !== 'number' || typeof discount !== 'number' || isNaN(price.value)) { //value is not nan
        return "Both price and discount must be numbers.";
    }
    if (price < 0 || discount < 0 || discount > 100) {
        return "Price must be non-negative, and discount must be between 0 and 100.";
    }
    var discountedPrice = price - (price * (discount / 100));
    return discountedPrice.toFixed(2);
}
console.log(calculateDiscountedPrice(100, 20)); 
console.log(calculateDiscountedPrice(300, 0));  
console.log(calculateDiscountedPrice(200, 110)); 
console.log(calculateDiscountedPrice("100", 20));
console.log(calculateDiscountedPrice(NaN, 20))
/////////////////////////////////////////////////////////////////////////////////////////////
// Q3
var favoriteMovies = ["Inception", "Interstellar", "The Dark Knight", "The Matrix", "Parasite"];
var copiedMovies = Array.from(favoriteMovies);
console.log(copiedMovies); 

copiedMovies[2] = "Forrest"; 


var lastMovie1 = copiedMovies[copiedMovies.length - 1];
var lastMovie2 = copiedMovies.at(-1); 
var lastMovie3 = copiedMovies.slice(-1)[0]; 
var lastMovie4 = copiedMovies.pop();

copiedMovies.unshift("The Godfather"); 

console.log("Original Movies:", favoriteMovies);
console.log("Copied Movies:", copiedMovies);
console.log("Last Movie (Method 1)=>", lastMovie1);
console.log("Last Movie (Method 2)=>", lastMovie2);
console.log("Last Movie (Method 3)=>", lastMovie3);
console.log("Last Movie (Method 4)=>", lastMovie4);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Q4
function longestString(str) {
    if (!str || typeof str !== "string") {
        console.log("Invalid input. Please provide a valid string.");
        return;
    }

    var longestWord = str.split(' ').reduce((max, word) =>
        word.length > max.length ? word : max, ""
    );

    console.log(`Longest word: "${longestWord}" & Length: ${longestWord.length} `);
   
}

 longestString("Web Development Tutorial")
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // Q5
 function personInfo() {
    var person = prompt("Please enter your name", "");
    var grade = prompt("Please enter your grades (e.g., 90,50,30,10 or 90 50 30 10)", "");

    if (person) {
        console.log(`Hello ${person}!`);
        document.getElementById("demo").innerHTML = `Name: ${person}`;

        if (grade != null && grade !== "") {
            // Replace spaces with commas, then split by commas
            var gradesArray = grade.replace(/\s+/g, ',').split(",").map(Number);  
            var table = "<table border='1'><tr><th>Grade</th></tr>";

            for (var item of gradesArray) {
                table += `<tr><td>${item}</td></tr>`;
            }
            table += "</table>";
            document.getElementById("grade").innerHTML = `Grades: ${table}`;

            var sum = gradesArray.reduce((acc, grade) => acc + grade, 0);
            var average = sum / gradesArray.length;
            console.log(`Average grade: ${average}`);
        } else {
            console.log("Grade is required.");
        }
    } else {
        console.log("Name is required.");
    }
}
personInfo()
/////////////////////////////////////////////////////////////////////
//Q6
var orders = [
    {
      orderId: 'ORD001',
      customer: 'John Doe',
      items: 'item1:2,item2:1,item3:5',
      orderDate: '2023-12-01',
      deliveryDate: '2023-12-05',
      deliveryAddress: '123, Main Street, Springfield, USA',
    },
    {
      orderId: 'ORD002',
      customer: 'Jane Smith',
      items: 'itemA:3,itemB:4',
      orderDate: '2023-11-15',
      deliveryDate: '2023-11-20',
      deliveryAddress: 'Flat 4B, Elmwood Apartments, New York, USA',
    },
    {
      orderId: 'ORD003',
      customer: 'Alice Johnson',
      items: 'itemX:1',
      orderDate: '2023-10-10',
      deliveryDate: '2023-10-15',
      deliveryAddress: '456, Pine Lane, Denver, USA',
    }
  ];
  
  var formattedOrders = orders.map(order => {
    var totalItems = order.items.split(',').reduce((acc, item) => {
      var value = item.split(':')[1];
      return acc + Number(value); 
    }, 0);
    
    var orderDate = new Date(order.orderDate).getTime();
    var deliveryDate = new Date(order.deliveryDate).getTime();
    var deliveryDuration = (deliveryDate - orderDate) / (24 * 60 * 60 * 1000);
  
    var addressParts = order.deliveryAddress.split(',');
    var buildingNumber = addressParts[0].trim();
    var deliveryStreet = addressParts[1].trim();
    var deliveryCity = addressParts[2].trim();
    var deliveryCountry = addressParts[3].trim();
  
    var formattedBuildingNumber = isNaN(buildingNumber) ? buildingNumber : Number(buildingNumber);
  
 
    return {
      orderId: order.orderId,
      customer: order.customer,
      totalItems: totalItems,
      orderDate: order.orderDate,
      deliveryDate: order.deliveryDate,
      deliveryDuration: deliveryDuration,
      deliveryCountry: deliveryCountry,
      deliveryCity: deliveryCity,
      deliveryStreet: deliveryStreet,
      buildingNumber: formattedBuildingNumber,
    };
  });
  
  console.log(formattedOrders);
  ////////////////////////////////////////////////////////////////////////////////////////////

  
  