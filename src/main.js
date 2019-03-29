
// const tableManager = new TableManager();
const peopleFactory = new FactoryOfPersons ();
// const ms = new MigrationService();
// ms.init(tableManager);

function foo() {
    const group = [
        {name: 'Kostia', age: 21, gender: 'male', isHasPassport: true, payment: 1000, healthy: 80},
        {name: 'Kostia', age: 21, gender: 'male', isHasPassport: true, payment: 1000, healthy: 80},
        {name: 'Oksana', age: 12, gender: 'female', isHasPassport: true, payment: 1000, healthy: 80},
        {name: 'Dima', age: 30, gender: 'male', isHasPassport: true, payment: 1000, healthy: 86},
        {name: 'Alexey', age: 24, gender: 'male', isHasPassport: true, payment: 1000, healthy: 80}
    ];
    //const group = peopleFactory.createRandomNumberOfUser();
    console.log(group);
    tab.processGroup(group);
    ms.getVisaToOneFromGroup(group)
        .then(function () {
            console.log(group);
        })
        .catch();

}
foo();

