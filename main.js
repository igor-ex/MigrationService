


function MigrationService() {//раппорт - объект который будет отрисовывать результат
    this.rapport = null;
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

MigrationService.prototype.checkName = function(name){
    return true;//сделать функционал
};

MigrationService.prototype.checkPerson = function (person) {
    const checkNameRes = this.checkName(person.name);
    this.rapport.send('migration name check', person, checkNameRes);
    if (!checkNameRes) {
        console.log('rejecting ' + person.name);
        return Promise.reject(person.name);
    }
    console.log('resolving ' + person.name);
    //const institutions = [this.policeResponse(), this.medicalResponse(), this.bankResponse()];
    const institutions = [this.policeResponse()];
    return Promise.all(institutions);
};

MigrationService.prototype.policeResponse = function () {
    return Promise.resolve();
};

const ms = new MigrationService();
ms.init({send: (name) => true});
ms.getVisaToOneFromGroup([{name: 'Kostia'}, {name: 'Oksana'}]);
