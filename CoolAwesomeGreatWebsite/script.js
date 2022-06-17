const chk = document.getElementById('chk');
const loadedSettings = JSON.parse(localStorage.getItem('settings'));

chk.addEventListener('change', () => {
    var settings = {
        darkmode: chk.checked
    };
    localStorage.setItem('settings', JSON.stringify(settings));
    toggleDark();
});

if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (!loadedSettings || !loadedSettings.hasOwnProperty("darkmode")){
        chk.checked = true
        let event = new Event('change');
        chk.dispatchEvent(event);
    }
};

function toggleDark() {
    if(JSON.parse(localStorage.getItem('settings')).darkmode){
        chk.checked = true
        document.body.classList.add('dark');
        document.getElementById('toggle').classList.add('dark');
        document.getElementById('ball').classList.add('dark');
        } else{
        chk.checked = false
        document.body.classList.remove('dark');
        document.getElementById('toggle').classList.remove('dark');
        document.getElementById('ball').classList.remove('dark');
        }
}
toggleDark();
