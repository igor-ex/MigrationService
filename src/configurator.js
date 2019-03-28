function getPerson() {
    let arrPersons = [];
    const objInput = {
        name: document.getElementById('idName'),
        age: document.getElementById('idAge'),
        gender: document.getElementById('idGender'),
        isHasPassport: document.getElementById('idIsHasPassport'),
        payment: document.getElementById('idPayment'),
        healty: document.getElementById('idHealty'),
    };
    const quantityPersons = document.getElementById('idQuantityPersons');
    let errorMessage = document.getElementById('idMessage');
    initArrPersons();

    let n = 0;
    flag = true;

    for (prop in objInput) {
        if (objInput[prop].value == null) {
            n++;
        }
    }
    if (n === 6) {
        // arrPersons = createPersons();
    } else {
        for (prop in objInput) {
            let arrTmp = checkedInput(objInput[prop].value, prop);
            if (!arrTmp.length) {
                flag = false;
            } else {
                for (let i = 0; i < +quantityPersons.value; i++) {
                    arrPersons[i][prop] = arrTmp[i];
                }
            }
        }
        for (let i = 0; i < +quantityPersons.value; i++) {
            arrPersons[i]['id'] = '' + i +'_'+ new Date().getMilliseconds();
        }
    }
    if(flag){

    }
    for (let i=0; i<arrPersons.length; i++) {
        for (prop in arrPersons[i]) {
            console.log(arrPersons[i][prop]);
        }
    }
    return arrPersons;

    function initArrPersons() {
        for (let i = 0; i < +quantityPersons.value; i++){
            arrPersons[i]={
                id:null,
                name: null,
                age: null,
                gender: null,
                isHasPassport: null,
                payment: null,
                healty: null,
            }
        }
    }
    function checkedInput(val, p) {
        arr = val.split(',');
        if (arr.length !== +quantityPersons.value) {
            errorMessage.innerHTML = 'Wrong field' + p;
            return [];
        }
        return arr;
    }
}


// let today = new Date();
// let milliseconds = today.getMilliseconds();

// id: unique key for id of new Person: serial number + time stamp, devided “_”,

