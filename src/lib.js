
function stringToFragment(string) {
    var renderer = document.createElement('template');
    renderer.innerHTML = string;
    return renderer.content;
}