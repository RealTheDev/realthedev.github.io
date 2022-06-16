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
    if (loadedSettings.darkmode != null && loadedSettings.darkmode != false){
        chk.checked = true
        var settings = {
            darkmode: chk.checked
        };
        localStorage.setItem('settings', JSON.stringify(settings));
        toggleDark();
    }
};

function toggleDark() {
    if(JSON.parse(localStorage.getItem('settings')).darkmode){
         document.body.classList.add('dark');
        document.getElementById('toggle').classList.add('dark');
        document.getElementById('ball').classList.add('dark');
        } else{
        document.body.classList.remove('dark');
        document.getElementById('toggle').classList.remove('dark');
        document.getElementById('ball').classList.remove('dark');
        }
}
