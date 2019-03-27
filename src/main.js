
function MigrationService() {//раппорт - объект который будет отрисовывать результат
    this.rapport = null;
    this.names = new Set;
}

MigrationService.prototype.init = function(rapport) {
    this.rapport = rapport;
};

MigrationService.prototype.getVisaToOneFromGroup = function(group) {
    const promiseGroup = [];
    for (let i = 0; i < group.length; i++) {
        promiseGroup.push(this.checkPerson(group[i]));
    }
    Promise.race(promiseGroup)
        .then(function (name) {
            console.log('i have my visa!');
            console.log(name + ' have visa');
        })
        .catch(function () {
            console.log('no one can go to another country');
        });
};

MigrationService.prototype.isDuplicateName = function(name){
    return this.names.has(name);
};

MigrationService.prototype.checkPerson = function (person) {
    const nameDuplication = this.isDuplicateName(person.name);
    this.rapport.send('migration name check', person, nameDuplication);
    if (nameDuplication) {
        console.log('rejecting ' + person.name);
        return Promise.reject(person.name);
    }
    this.names.add(person.name);
    console.log('resolving ' + person.name);
    //const institutions = [this.policeResponse(), this.medicalResponse(), this.bankResponse()];
    const institutions = [this.policeResponse()];
    return Promise.all(institutions);
};

MigrationService.prototype.policeResponse = function () {
    return Promise.resolve();
};

const factory = new FactoryOfPersons ();
const ms = new MigrationService();
ms.init({send: (name) => true});

function foo() {
    const group = factory.createRandomNumberOfUser();
    console.log(group);
    ms.getVisaToOneFromGroup(group);
}
foo();
foo();
foo();
foo();
foo();