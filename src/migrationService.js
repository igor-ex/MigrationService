
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
    promise
        .then((persons) => {
            for (let i = 0; i < persons.length; i++) {
                if (persons[i].result === true) {
                    this.rapport.send('group result', persons[i].person, true);
                    return;
                }
            }
            this.rapport.groupFails();
        })
        .catch(function () {
            console.log('im here');
            console.log('getVisaToOneFromGroup made reject');
            this.rapport.groupFails();
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
    //const institutions = [this.policeResponse(), this.medicalResponse(), this.bankResponse()];
    const institutions = [this.policeResponse(person)];
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
    }, 'police age check', 5000);

    const ageGender = this.getTaskPromise(person,(person) => {
        return (person.gender === 'male' && person.age > 22) || (person.gender === 'female' && person.age > 18);
    }, 'police age + gender check', 8000);

    const hasPassport = this.getTaskPromise(person,(person) => {
        return person.hasPassport;
    }, 'police passport', 12000);

    const promiseArray = [age, ageGender, hasPassport];
    return Promise.all(promiseArray);
};