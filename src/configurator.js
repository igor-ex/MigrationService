function getPerson(clear) {
    let arrPersons = [];
    const objInput = {
        name: document.getElementById('idName'),
        age: document.getElementById('idAge'),
        gender: document.getElementById('idGender'),
        isHasPassport: document.getElementById('idIsHasPassport'),
        payment: document.getElementById('idPayment'),
        healthy: document.getElementById('idHealthy'),
    };
    const quantityPersons = document.getElementById('idQuantityPersons');
    const getVisa = document.getElementById('idGetVisaForAll');
    getVisa.style.visibility = 'hidden';
    if (clear) {
        Object.values(objInput).forEach((el) => {
            el.value = '';
        });
        quantityPersons.value = '';
        return;
    }
    let errorMessage = document.getElementById('idMessage');
    errorMessage.innerHTML = '';
    initArrPersons();

    let n = 0;
    let flag = true;

    for (let prop in objInput) {
        if (objInput[prop].value === '') {
            n++;
        }
    }
    if (n === 6) {
        const factory = new FactoryOfPersons ();
        arrPersons = factory.createRandomNumberOfUser();

        for (let prop in objInput){
            objInput[prop].value = arrPersons.map(person => person[prop]).join(',');
                }
        quantityPersons.value = arrPersons.length;
    } else {
        for (let prop in objInput) {
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
getVisa.style.visibility = 'visible';
    }
    for (let i=0; i<arrPersons.length; i++) {
        for (let prop in arrPersons[i]) {
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
                healthy: null,
            }
        }
    }
    function checkedInput(val, p) {
        let arr = val.split(',');

        if (arr.length !== +quantityPersons.value) {
            errorMessage.innerHTML = 'Wrong field  ' + p;
            flag = false;
            return [];
        }
        return arr;
    }
}




