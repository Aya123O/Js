
/*
class Vehicle {
    static count = 0;

    constructor(type, speed) {
        if (Vehicle.count >= 50) {
            throw new Error('Vehicle limit reached');
        }
        this.type = type;
        this.speed = speed;
        Vehicle.count++;
    }

    start = () => {
        console.log(`${this.type} is starting.`);
    }

    stop = () => {
        console.log(`${this.type} has stopped.`);
    }
}

class Car extends Vehicle {
    constructor(type, speed, brand) {
        super(type, speed);
        this.brand = brand;
    }

    drive = () => {
        console.log(`${this.brand} is driving.`);
    }
}

try {
    const car1 = new Car('Sedan', 120, 'Toyota');
    car1.start();
    car1.drive();
    car1.stop();

    for (let i = 0; i < 49; i++) {
        new Vehicle('Truck', 30);
    }

    new Vehicle('Van', 100);
} catch (error) {
    console.error(error.message);
}

const isInstanceOfCar = (obj) => obj instanceof Car;

const isInstanceOfCarAlt = (obj) => obj?.constructor?.name === 'Car';

const car2 = new Car('SUV', 150, 'Honda');
console.log(isInstanceOfCar(car2)); 
console.log(isInstanceOfCarAlt(car2)); 

const vehicle2 = new Vehicle('Bike', 60);
console.log(isInstanceOfCar(vehicle2)); 
console.log(isInstanceOfCarAlt(vehicle2)); 
XZZ  aq 
*/
/////////////////////////////////////////////////////////////////////////

async function fetchUserData() {
    try {
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');////////////////////////[{}]
        const users = await usersResponse.json();
        console.log('====================================');
        console.log(users);
        console.log('====================================');
        
        // Loop through each user
        
        for (let user of users) {//{id ,compay }
            const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
            const posts = await postsResponse.json();

            const row = document.createElement('tr');

            const postsWithComments = await Promise.all(posts.map(async (post) => {
              
                const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
                const comments = await commentsResponse.json();
                console.log(post);
              
                console.log(comments);
               
                return `<li>${post.title} - (${comments.length} comments)</li>`;
            }));

            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.company.name}</td>
                <td>${user.address.geo.lat}, ${user.address.geo.lng}</td>
                <td>
                    <ul>
                        ${postsWithComments.join('')}
                    </ul>
                </td>
            `;

            document.querySelector('#usersTable tbody').appendChild(row);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.onload = fetchUserData;
