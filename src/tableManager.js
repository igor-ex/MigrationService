function TableManager() {
    this.group = null;
    this.links = new WeakMap();
    this.tableElements = [];
}

TableManager.prototype.init = function (group, table) {
    this.group = group;
    this.setTableElements();
    this.group.forEach((person) => {
        const row = this.renderRow(person);
        this.links.set(person, row);
    });
};

TableManager.prototype.setTableElements = function () {
    const els = this.tableElements;
    els.table = document.getElementById('idWrapperOutput');
    els.nameRow = document.getElementById('idDivName');
    els.policeRow = document.getElementById('idDivPolice');
    els.medicalRow = document.getElementById('idDivMedical');
    els.bankRow = document.getElementById('idDivBank');
};

TableManager.prototype.renderRow = function (person) {
    const nameRow = stringToFragment(`<div><span class="color">${person.name}</span></div>`).firstChild;
    this.tableElements.nameRow.appendChild(nameRow);

    const policeRow = stringToFragment('<div><span class="color yellow age"></span><span class="color yellow age-gender"></span>' +
        '<span class="color yellow passport"></span></div>').firstChild;
    this.tableElements.policeRow.appendChild(policeRow);

    const medicalRow = stringToFragment('<div><span class="color yellow healthy"></span><span class="color yellow healthy-gender"></span></div>').firstChild;
    this.tableElements.medicalRow.appendChild(medicalRow);

    const bankRow = stringToFragment('<div><span class="color yellow payment"></span></div>').firstChild;
    this.tableElements.bankRow.appendChild(bankRow);

    return {nameRow, policeRow, medicalRow, bankRow};
};

TableManager.prototype.send = function (nameOfCheck, person, result) {//устанавливает ответ  миграцоонной службы для одного пункта
    const row = this.links.get(person);
    let element = null;
    switch(nameOfCheck) {
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

TableManager.prototype.groupFails = function () {
    const row = document.createElement('div');
    row.innerText = 'no one from this group gets visa';
    this.tableElements.table.parentNode.insertBefore(row, this.tableElements.table);
};

function stringToFragment(string) {
    var renderer = document.createElement('template');
    renderer.innerHTML = string;
    return renderer.content;
}