const faker = require('faker');

let Person = {};
let randomNumber;
let crowdOfPersons = [];
let serialNumber = 0;

function getRandomNumberOfUser() {
    var min=2;
    var max=5;
    randomNumber = Math.floor(Math.random() * (+max - +min)) + +min;
    return randomNumber
}

function createCrowdOfPersons(randomNumber) {
    for (let i = 0; i < randomNumber; i++) {

        Person.id = serialNumber;
        crowdOfPersons.push(createPerson());

    }

    return crowdOfPersons
}

function createPerson() {
    Person = {
        id:'', //unique key for id of new Person: serial number + time stamp, devided “_”,
        name: faker.name.lastName(), // “fake name”
        age: faker.random.number(
            {
                'min': 16,
                'max': 24
            }), //Random(16-24),
        isHasPassport: faker.random.boolean(), // Random(true / false),
        gender: faker.random.arrayElement(['male', 'female']), //Random(“male” / ”female”)
        payment:faker.random.arrayElement([900, 1000, 1100]), //Random(900-1100$), step 100$,
        healthy: faker.random.number(
            {
                'min': 65,
                'max': 95
            }), //Random(65-95%),
    };
    return Person
}


function getID() {

}

getRandomNumberOfUser();
createCrowdOfPersons(randomNumber);
createPerson();

console.log(`randomNumber is ${randomNumber}`);
console.log(crowdOfPersons);
// console.log(createCrowdOfPersons(randomNumber));