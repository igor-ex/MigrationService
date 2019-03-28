var persons=
    [
        {
            name:'Vasya',
            age:25,
            isHasPassport:true,
            gender:'male',
            payment: 1000,
            healty: 70
        },
        {
            name: 'Petya',
            age:30,
            isHasPassport:true,
            gender:'male',
            payment: 1000,
            healty: 70
        }
    ];

MigrationService(persons);

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

//function PoliceDepartment1(person){
//  return new Promise((resolve, reject) => {
//    setTimeout(() =>{
//    if(1){
//      console.log("Police department1 succeded on person:");
//      console.log(person);
//      resolve(person);
//    }
//    else{
//      console.log("Police department1 FAILED on person:");
//      console.log(person);
//      reject(person);
//    }
//  }, 1000);
//  });
//}

function PoliceDepartment(person){

    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            if(1){
                console.log("Police department succeded on person:");
                console.log(person);
                resolve(person);
            }
            else{
                console.log("Police department FAILED on person:");
                console.log(person);
                reject(person);
            }
        }, 1000);
    });
}

function MedicalDepartment(person){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            if(person.name!='Petya'){
                console.log("Medical department succeded on person:");
                console.log(person);
                resolve(person);
            }
            else{
                console.log("Medical department FAILED on person:");
                console.log(person);
                reject(person);
            }
        }, 1000);
    });
}

function BankDepartment(person){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            if(1){
                console.log("Bank department succeded on person:");
                console.log(person);
                resolve(person);
            }
            else{
                console.log("Bank department FAILED on person:");
                console.log(person);
                reject(person);
            }
        }, 1000);
    });
}

function GiveVisa(person){
    return new Promise((resolve, reject) => {
        console.log("VISA GIVEN TO PERSON:");
        console.log(person);
        resolve(person);
    });
}