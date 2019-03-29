
// const tableManager = new TableManager();
const peopleFactory = new FactoryOfPersons ();
// const ms = new MigrationService();
// ms.init(tableManager);

function foo() {
    const group = [
        {name: 'Kostia', age: 21, gender: 'male', hasPassport: true},
        {name: 'Kostia', age: 21, gender: 'male', hasPassport: true},
        {name: 'Oksana', age: 12, gender: 'female', hasPassport: true},
        {name: 'Alexey', age: 24, gender: 'male', hasPassport: true}
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
//foo();

