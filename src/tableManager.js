function TableManager() {
    this.group = null;
    this.table = null;
    this.links = new WeakMap();
}

TableManager.prototype.init = function (group) {
    this.group = group;
    this.table = document.createElement('div');
    this.group.forEach((person) => {
        const row = this.renderRow(person);
        this.links.set(person, row);
    });
    return this.table;
};

TableManager.prototype.renderRow = function (person) {
   const row = document.createElement('div');
    let nameRow = document.getElementById('idDivName');
    nameRow.innerHTML += ` <div><span class="color">${person.name}</span></div>`;

    let policeRow = document.getElementById('idDivPolice');
    policeRow.innerHTML += '<div><span class="color yellow age"></span><span class="color yellow age-gender"></span>' +
        '<span class="color yellow passport"></span></div>';

    let medicalRow = document.getElementById('idDivMedical');
    medicalRow.innerHTML += ' <div><span class="color yellow  healty"></span><span class="color yellow healty-gender"></span></div>';
    let bankRow = document.getElementById('idDivBank');

    bankRow.innerHTML +='<div><span class="color yellow payment"></span></div>';
//    row.innerText = person.name;
//    this.table.appendChild(row);
    return row;
};

TableManager.prototype.send = function (nameOfCheck, person, result) {//устанавливает ответ  миграцоонной службы для одного пункта
    const row = this.links.get(person);
    row.innerText = row.innerText + '<br>' + (result ? 'true' : 'false');

};

TableManager.prototype.groupFails = function () {
    const row = document.createElement('div');
    row.innerText = 'no one from this group gets visa';
    this.table.appendChild(row);
};
