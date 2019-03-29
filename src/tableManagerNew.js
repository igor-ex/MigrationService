function TableManager() {
    this.groups = new WeakMap();//связь групп персон с таблицами (компонентами таблиц)
    this.links = new WeakMap();//связь объекта персоны с элементами формы
    this.tableTemplate = null;
    this.tablesContainer = null;
}

TableManager.prototype.init = function (tableTemplate, tablesContainer) {
    this.tableTemplate = tableTemplate;
    this.tablesContainer = tablesContainer;
    return this;
};

TableManager.prototype.processGroup = function(group) {
    const tableElements = this.createTableElements();
    this.groups.set(group, tableElements);
    group.forEach((person) => {
        const row = this.renderRow(person, tableElements);
        this.links.set(person, row);
    });
    this.tablesContainer.appendChild(tableElements.table);
};

TableManager.prototype.createTableElements = function () {
    const els = {};
    els.table = document.importNode(this.tableTemplate.content.querySelector('.wrapper-output'), true);
    els.nameRow = els.table.getElementsByClassName('name')[0];
    els.migrationServiceRow = els.table.getElementsByClassName('migrationService')[0]
    els.policeRow = els.table.getElementsByClassName('policeDepartament')[0];
    els.medicalRow = els.table.getElementsByClassName('medicalDepartament')[0];
    els.bankRow = els.table.getElementsByClassName('bankDepartament')[0];
    return els;
};

TableManager.prototype.renderRow = function (person, els) {
    const nameRow = stringToFragment(`<div><span class="color personName">${person.name}</span></div>`).firstChild;
    els.nameRow.appendChild(nameRow);

    const migrationServiceRow = stringToFragment(`<div><span class="color yellow nameCheck"></span></div>`).firstChild;
    els.migrationServiceRow.appendChild(migrationServiceRow);

    const policeRow = stringToFragment('<div><span class="color yellow age"></span><span class="color yellow age-gender"></span>' +
        '<span class="color yellow passport"></span></div>').firstChild;
    els.policeRow.appendChild(policeRow);

    const medicalRow = stringToFragment('<div><span class="color yellow healthy"></span><span class="color yellow healthy-gender"></span></div>').firstChild;
    els.medicalRow.appendChild(medicalRow);

    const bankRow = stringToFragment('<div><span class="color yellow payment"></span></div>').firstChild;
    els.bankRow.appendChild(bankRow);

    return {nameRow, migrationServiceRow, policeRow, medicalRow, bankRow};
};

TableManager.prototype.send = function (nameOfCheck, person, result) {//устанавливает ответ  миграцоонной службы для одного пункта
    const row = this.links.get(person);
    let element = null;
    switch(nameOfCheck) {
        case 'visaSuccess':
            row.nameRow.getElementsByClassName('personName')[0].classList.add('name__person_visaSuccess');
            return;
        case 'nameCheck':
            element = row.migrationServiceRow;
            break;
        case 'age':
        case 'age-gender':
        case 'passport':
            element = row.policeRow;
            break;
        case 'healthy':
        case 'healthy-gender':
            element = row.medicalRow;
            break;
        case 'payment':
            element = row.bankRow;
            break;
        default:
            return;
    }
    element = element.getElementsByClassName(nameOfCheck);
    if (!element) {
        return;
    } else {
        element = element[0];
    }
    element.classList.remove('yellow');
    element.classList.add(result ? 'green' : 'red');
};

TableManager.prototype.groupFails = function (group) {
    const els = this.groups.get(group);
    //const row = document.createElement('div');
    //row.innerText = 'no one from this group gets visa';
    //els.table.parentNode.insertBefore(row, els.table);
    els.table.classList.add('wrapper-output_fail');
};

function stringToFragment(string) {
    var renderer = document.createElement('template');
    renderer.innerHTML = string;
    return renderer.content;
}