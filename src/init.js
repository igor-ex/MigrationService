
let persons = null;
function configurate() {
    persons = getPerson();
}
const buttonSave = document.getElementById('idSave');
buttonSave.addEventListener("click", configurate);

const buttonClear = document.getElementById('idClear');
buttonClear.addEventListener("click", () => getPerson(true));

const tableTemplate = document.getElementById('tableTemplate');
const tablesContainer = document.getElementById('tablesContainer');
const tab = new TableManager().init(tableTemplate, tablesContainer);
const ms = new MigrationService();
ms.init(tab);
function sendRequest() {
    tab.processGroup(persons);
    ms.getVisaToOneFromGroup(persons);
}
const buttonGetVisaForAll = document.getElementById('idGetVisaForAll');
buttonGetVisaForAll.addEventListener("click", sendRequest);





