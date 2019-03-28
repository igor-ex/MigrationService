buttonSave = document.getElementById('idSave');
buttonSave.addEventListener("click", configurate);

function configurate() {
    let persons = getPerson();

    buttonGetVisaForAll = document.getElementById('idGetVisaForAll');
    buttonGetVisaForAll.addEventListener("click", sendRequest);

    function sendRequest() {
        tab = new TableManager();
        tab.init(persons);
    }
}
