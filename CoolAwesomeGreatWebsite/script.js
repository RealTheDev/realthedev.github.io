const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
document.body.classList.toggle('dark');
document.getElementById('toggle').classList.toggle('dark');
document.getElementById('ball').classList.toggle('dark');
});