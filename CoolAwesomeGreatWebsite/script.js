const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
document.body.classList.toggle('dark');
document.getElementById('toggle').classList.toggle('dark');
document.getElementById('ball').classList.toggle('dark');
});

if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.toggle('dark');
    document.getElementById('toggle').classList.toggle('dark');
    document.getElementById('ball').classList.toggle('dark');
};
