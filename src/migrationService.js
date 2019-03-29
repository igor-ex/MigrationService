
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
    const promise = Promise.all(promiseGroup);
    const self = this;
    promise
        .then((persons) => {
            for (let i = 0; i < persons.length; i++) {
                if (persons[i].result === true) {
                    self.rapport.send('group result', persons[i].person, true);
                    return;
                }
            }
            self.rapport.groupFails();
        })
        .catch(function () {
            console.log('im here');
            console.log('getVisaToOneFromGroup made reject');
            self.rapport.groupFails();
        });
    return promise;
};

MigrationService.prototype.isDuplicateName = function(name){
    return this.names.has(name);
};

MigrationService.prototype.checkPerson = function (person) {
    //всегда должно вызывать resolve и возвращать объект с персоной и результатом true или false
    const nameDuplication = this.isDuplicateName(person.name);
    person.reject = [];
    person.resolve = [];
    if (nameDuplication) {
        this.rapport.send('migration name check', person, false);
        console.log('rejecting ' + person.name + 'because of name duplication');
        person.reject.push('because of duplication');
        return Promise.resolve({result: false, person});
    }
    this.rapport.send('migration name check', person, true);
    this.names.add(person.name);
    person.resolve.push('name is not duplicate');
    console.log('is not duplicate ' + person.name);
    const institutions = [this.policeResponse(person), this.medicalResponse(person), this.bankResponse(person)];
    return new Promise((resolve, reject) => {
        Promise.all(institutions)
            .then(() => resolve({person, result: true}))
            .catch(() => resolve({person, result: false}));
    });

};

MigrationService.prototype.getTaskPromise = function(person, conditionCallback, nameOfCheck, timeout){
    //conditionCallback - функция, которая принимает объект персоны и возвращает true
    //если проверка пройдена успешно
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (conditionCallback(person)) {
                this.rapport.send(nameOfCheck, person, true);
                resolve()
            } else {
                this.rapport.send(nameOfCheck, person, false);
                reject();
            }
        }, timeout)
    });
};

MigrationService.prototype.policeResponse = function (person) {
    const age = this.getTaskPromise(person,(person) => {
        return person.age > 15;
    }, 'age', 5000);

    const ageGender = this.getTaskPromise(person,(person) => {
        return (person.gender === 'male' && person.age > 22) || (person.gender === 'female' && person.age > 18);
    }, 'age-gender', 8000);

    const hasPassport = this.getTaskPromise(person,(person) => {
        return person.isHasPassport;
    }, 'passport', 12000);

    const promiseArray = [age, ageGender, hasPassport];
    return Promise.all(promiseArray);
};

MigrationService.prototype.medicalResponse = function (person) {
    const healthy  = this.getTaskPromise(person,(person) => {
        return person.healthy > 75;
    }, 'healthy', 15000);

    const healthyGender = this.getTaskPromise(person,(person) => {
        return (person.gender === 'male' && person.healthy > 75) || (person.gender === 'female' && person.healthy > 85);
    }, 'healthy-gender', 15000);

    const promiseArray = [healthy, healthyGender];
    return Promise.all(promiseArray);
};

MigrationService.prototype.bankResponse = function (person) {

    return this.getTaskPromise(person,(person) => {
        return (person.gender === 'male' && person.payment >= 1000) || (person.gender === 'female' && person.payment > 950);
    }, 'payment', 4000);

};

/*
const persons = [];
const groupPromices = persons.map((person) => {
    const policeCheck1 = new Promise(....);
    const policeCheck2 = new Promise(....);
    const policePromise = Promise.all([policeCheck1, policeCheck2]);

    const medicCheck1 = new Promise(....);
    const medicCheck2 = new Promise(....);
    const medicPromise = Promise.all([medicCheck1, medicCheck2]);

    const migrationServicePromise = Promise.all([policePromise, medicPromise]);
    return migrationServicePromise;//должна всегда делать резолв а не реджект, иначе
    //не будет в родителе результата всех персон, а будет только инфа о реджекте
});

const migrationServicePromiseForGroup = Promise.all(groupPromices);
//или тут делать не промис олл, а на каждый навесить колбэк и проверять флагом что уже одному дали визу
//и игнорировать остальных
migrationServicePromiseForGroup
    .then((responsesForEveryPersonOfTheGroup) => {
        //перебрать ответы и если кому-то можно дать визу, то дать первому
    })
*/
