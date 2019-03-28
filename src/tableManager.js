
function TableManager(){
    this.group = null;
    this.table = null;
    this.links = new WeakMap();
}

TableManager.prototype.init = function(group) {
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
    row.innerHTML = person.name;
    this.table.appendChild(row);
    return row;
};

TableManager.prototype.send = function (nameOfCheck, person, result) {//устанавливает ответ  миграцоонной службы для одного пункта
    const row = this.links.get(person);
    row.innerHTML = row.innerHTML + '<div style="border: 1px solid gray; margin: 10px;">' + nameOfCheck + ' ' + (result ? 'true' : 'false') + '</div>';
};

TableManager.prototype.groupFails = function () {
    const row = document.createElement('div');
    row.innerText = 'no one from this group gets visa';
    this.table.appendChild(row);
};