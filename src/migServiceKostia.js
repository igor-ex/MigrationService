
function MigrationService(persons){
    let i=0;
    let j;

    while(i<persons.length){
        j=i+1;
        while(j<persons.length){
            if(persons[i].name==persons[j].name){
                console.log("Migration error Duplicate person:");
                console.log(persons[j]);
                persons=persons.splice(j,1);
            }
            else j++;
        }
        if(i>=persons.length) break;
        ProcessPerson(persons[i]);
        i++;
    }
}

function ProcessPerson(person){
    return PoliceDepartment(person).then(MedicalDepartment).then(BankDepartment).then(GiveVisa)
        .catch(function (person) {
            console.log('No visa given to person:');
            console.log(person);
        });
}
function PersonPromise(person,condition,messageComplete, messageFailed, timeout){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            if(condition){
                console.log(messageComplete);
                console.log(person);
                resolve(person);
            }
            else{
                console.log(messageFailed);
                console.log(person);
                reject(person);
            }
        }, timeout);
    });
}


function PoliceDepartment1(person){
    return PersonPromise(person,
        person.age>18,
        "Police department 1 succeded on person:",
        "Police department 1 FAILED on person:",
        1000);
}

function PoliceDepartment2(person){
    return PersonPromise(person,
        (person.gender=='male'&&person.age>22)||(person.gender=='female'&&person.age>18),
        "Police department 2 succeded on person:",
        "Police department 2 FAILED on person:",
        1000);
}

function PoliceDepartment3(person){
    return PersonPromise(person,
        person.isHasPassport,
        "Police department 3 succeded on person:",
        "Police department 3 FAILED on person:",
        1000);
}

function MedicalDepartment1(person){
    return PersonPromise(person,
        person.healthy>75,
        "Medical department 1 succeded on person:",
        "Medical department 1 FAILED on person:",
        1000);
}

function MedicalDepartment2(person){
    return PersonPromise(person,
        (person.gender=='male'&&person.healthy>75)||(person.gender=='female'&&person.healthy>85),
        "Medical department 2 succeded on person:",
        "Medical department 2 FAILED on person:",
        1000);
}

function BankDepartment1(person){
    return PersonPromise(person,
        (person.gender=='male'&&person.payment>1000)||(person.gender=='female'&&person.payment>950),
        "Bank department 1 succeded on person:",
        "Bank department 1 FAILED on person:",
        1000);
}

function PoliceDepartment(person){

    return PoliceDepartment1(person).then(PoliceDepartment2).then(PoliceDepartment3);
}

function MedicalDepartment(person){
    return MedicalDepartment1(person).then(MedicalDepartment2);
}

function BankDepartment(person){
    return BankDepartment1(person);
}

function GiveVisa(person){
    return new Promise((resolve, reject) => {
        console.log("VISA GIVEN TO PERSON:");
        console.log(person);
        resolve(person);
    });
}