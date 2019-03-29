const buttonSave = document.getElementById('idSave');
buttonSave.addEventListener("click", configurate);

function configurate() {
    const persons = getPerson();

    const buttonGetVisaForAll = document.getElementById('idGetVisaForAll');
    buttonGetVisaForAll.addEventListener("click", sendRequest);

    function sendRequest() {
        const tab = new TableManager();
        tab.init(persons);
        const ms = new MigrationService();
        ms.init(tab);
        ms.getVisaToOneFromGroup(persons)
    }
}
