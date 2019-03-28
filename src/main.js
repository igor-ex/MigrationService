
const tableManager = new TableManager();
const peopleFactory = new FactoryOfPersons ();
const ms = new MigrationService();
ms.init(tableManager);

function foo() {
    //const group = peopleFactory.createRandomNumberOfUser();
    const group = [
        {name: 'Kostia', age: 21, gender: 'male', hasPassport: true},
        {name: 'Kostia', age: 21, gender: 'male', hasPassport: true},
        {name: 'Oksana', age: 12, gender: 'female', hasPassport: true}
    ];
    console.log(group);
    const table = tableManager.init(group);
    document.body.appendChild(table);
    ms.getVisaToOneFromGroup(group)
        .then(function () {
            console.log(group);
        })
        .catch();

}
foo();

