function FactoryOfPersons () {

}
FactoryOfPersons.prototype.serialNumber = 0;
FactoryOfPersons.prototype.getRandomNumberOfUser = function() {
    var min = 2;
    var max = 6;
    return Math.floor(Math.random() * (+max - +min)) + +min;
};


FactoryOfPersons.prototype.createPerson = function() {
    return {
        id: '', //unique key for id of new Person: serial number + time stamp, devided “_”,
        name: faker.name.lastName(), // “fake name”
        age: faker.random.number(
            {
                'min': 16,
                'max': 24
            }), //Random(16-24),
        isHasPassport: faker.random.boolean(), // Random(true / false),
        gender: faker.random.arrayElement(['male', 'female']), //Random(“male” / ”female”)
        payment: faker.random.arrayElement([900, 1000, 1100]), //Random(900-1100$), step 100$,
        healthy: faker.random.number(
            {
                'min': 65,
                'max': 95
            }), //Random(65-95%),
    };
};

FactoryOfPersons.prototype.createCrowdOfPersonsAndID = function (randomNumber) {
    const crowdOfPersons = [];
    for (let i = 0; i < randomNumber; i++) {
        let today = new Date();
        let milliseconds =today.getTime();
        this.serialNumber++;
        let id = this.serialNumber + "_" + milliseconds;
        let element = this.createPerson();
        element.id = id;
        crowdOfPersons.push(element);
    }
    return crowdOfPersons;
};

FactoryOfPersons.prototype.createRandomNumberOfUser = function () {
    return this.createCrowdOfPersonsAndID(this.getRandomNumberOfUser());
};
