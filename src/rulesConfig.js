function Rules(){
    this.defaultRules = {
        age: 18,
        maleAge: 22,
        femaleAge: 18,
        healthy: 75,
        maleHealthy: 75,
        femaleHealthy: 85,
        malePayment: 1000,
        femalePayment: 950
    };
    this.labels = {
        age: 'Age',
        maleAge: 'Male age',
        femaleAge: 'Female age',
        healthy: 'Health',
        maleHealthy: 'Male health',
        femaleHealthy: 'Female health',
        malePayment: 'Male payment',
        femalePayment: 'Female payment'
    };
    this.rules = [];
    this.elements = [];
    this.prefix = null;
    this.classPrefix = null;
}

Rules.prototype.init = function  (container, prefix, classPrefix) {
    this.prefix = prefix;
    this.classPrefix = classPrefix;
    //создает форму и устанавливает в нее дефолтные значения
    const fragment = document.createDocumentFragment();

    const title = document.createElement('h2');
    title.innerText = 'Rules';
    title.classList.add(classPrefix + 'title');
    fragment.appendChild(title);

    Object.keys(this.defaultRules).forEach(key => {
        const id = prefix + key;

        const row = document.createElement('div');
        row.classList.add(classPrefix + 'row');
        fragment.appendChild(row);

        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.classList.add(classPrefix + 'label');
        label.innerText = this.labels[key];
        row.appendChild(label);

        const el = document.createElement('input');
        el.classList.add(classPrefix + 'input');
        this.elements[key] = el;
        el.setAttribute('type', 'text');
        el.id = id;
        //el.value = this.defaultRules[key];
        el.addEventListener('input', () => {
            if (el.value === '') {
                this.showInvalid(el);
                saveBtn.setAttribute('disabled', 'disabled');
            } else {
                this.showValid(el);
                if (Object.values(this.elements).some(el => el.value === '')) {
                    saveBtn.setAttribute('disabled', 'disabled');
                    return;
                }
                saveBtn.removeAttribute('disabled');
            }
        });

        row.appendChild(el);
    });
    this.cloneRules();

    const clearBtn = document.createElement('button');
    clearBtn.innerText = 'Clear';
    clearBtn.classList.add(classPrefix + 'button');
    clearBtn.addEventListener('click', () => {
        this.clear();
        saveBtn.setAttribute('disabled', 'disabled');
    });
    fragment.appendChild(clearBtn);

    const saveBtn = document.createElement('button');
    saveBtn.innerText = 'Save';
    saveBtn.classList.add(classPrefix + 'button');
    saveBtn.addEventListener('click', () => {
        let flag = false;
        Object.values(this.elements).forEach(el => {
            //проверка на незаполненность полей
            if (el.value === '') {
                flag = true;
                this.showInvalid(el);
            }
        });
        if (flag) {
            saveBtn.setAttribute('disabled', 'disabled');
            return;
        }
        this.saveRules();
    });
    fragment.appendChild(saveBtn);

    const loadDefaultsBtn = document.createElement('button');
    loadDefaultsBtn.innerText = 'Load Defaults';
    loadDefaultsBtn.classList.add(classPrefix + 'button');
    loadDefaultsBtn.addEventListener('click', () => {
        this.loadDefaults();
        saveBtn.removeAttribute('disabled');
        Object.values(this.elements).forEach(el => this.showValid(el));
    });
    fragment.appendChild(loadDefaultsBtn);

    fragment.appendChild(saveBtn);
    container.appendChild(fragment);
};

Rules.prototype.clear = function (){
    //очищает форму
    Object.values(this.elements).forEach(el => {
        el.value = '';
    });
};

Rules.prototype.loadDefaults = function (){
    //устанавливает в форму дефолтные значения
    this.cloneRules();
    Object.entries(this.defaultRules).forEach((rule) => {
        this.elements[rule[0]].value = rule[1];
    });
};

Rules.prototype.saveRules = function (){
    //сохраняет правила введенные пользователем из формы
    Object.keys(this.rules).forEach(key => {
        if (this.elements[key].value === 'null') {
            this.rules[key] = this.defaultRules[key];
        } else {
            this.rules[key] = parseInt(this.elements[key].value);
        }
    });
};

Rules.prototype.cloneRules = function (){
    const rules = {};
    Object.keys(this.defaultRules).forEach((key) => {
        rules[key] = this.defaultRules[key];
    });
    this.rules = rules;
};

Rules.prototype.showValid = function (el){
    el.classList.remove(this.classPrefix + 'input_invalid');
};

Rules.prototype.showInvalid = function (el){
    el.classList.add(this.classPrefix + 'input_invalid');
};