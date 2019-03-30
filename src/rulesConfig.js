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
    this.rules = [];
    this.elements = [];
}

Rules.prototype.init = function  (container, prefix) {
    //создает форму и устанавливает в нее дефолтные значения
    const fragment = document.createDocumentFragment();
    Object.keys(this.defaultRules).forEach(key => {
        const id = prefix + key;

        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.innerText = key;
        fragment.appendChild(label);

        const el = document.createElement('input');
        this.elements[key] = el;
        el.setAttribute('type', 'text');
        el.id = id;
        el.value = this.defaultRules[key];
        el.addEventListener('input', () => {
            if (el.value === '') {
                el.style.background = '#f00';
                saveBtn.setAttribute('disabled', 'disabled');
            } else {
                el.style.background = '';
                if (Object.values(this.elements).some(el => el.value === '')) {
                    saveBtn.setAttribute('disabled', 'disabled');
                    return;
                }
                saveBtn.removeAttribute('disabled');
            }
        });
        
        fragment.appendChild(el);
    });
    this.cloneRules();

    const clearBtn = document.createElement('button');
    clearBtn.innerText = 'Clear';
    clearBtn.addEventListener('click', () => {
        this.clear();
        saveBtn.setAttribute('disabled', 'disabled');
    });
    fragment.appendChild(clearBtn);

    const saveBtn = document.createElement('button');
    saveBtn.innerText = 'Save';
    saveBtn.addEventListener('click', () => {
        let flag = false;
        Object.values(this.elements).forEach(el => {
            if (el.value === '') {
                flag = true;
                el.style.background = '#f00';
            }
        });
        if (flag) {
            saveBtn.setAttribute('disabled', 'disabled');
            return;
        }
        this.saveRules();
    });
    fragment.appendChild(saveBtn);

    const loadDefaulsBtn = document.createElement('button');
    loadDefaulsBtn.innerText = 'Load Defaults';
    loadDefaulsBtn.addEventListener('click', () => {
        this.loadDefaults();
        saveBtn.removeAttribute('disabled');
        Object.values(this.elements).forEach(el => el.style.background = '');
    });
    fragment.appendChild(loadDefaulsBtn);

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
    Object.entries(this.defaultRules).forEach((rule) => {
        this.elements[rule[0]].value = rule[1];
    });
};

Rules.prototype.saveRules = function (){
    //сохраняет правила введенные пользователем из формы
    Object.keys(this.rules).forEach(key => this.rules[key] = parseInt(this.elements[key].value));
};

Rules.prototype.cloneRules = function (){
    const rules = {};
    Object.keys(this.defaultRules).forEach((key) => {
        rules[key] = this.defaultRules[key];
    });
    this.rules = rules;
};