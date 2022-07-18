const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
window.addEventListener('resize', () =>{
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    });

let particleArray = [];

const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', (evt) =>{
  mouse.x = evt.x;
  mouse.y = evt.y;
});
window.addEventListener('touchmove', (evt) =>{
    mouse.x = evt.touches[0].clientX;
    mouse.y = evt.touches[0].clientY;
});
window.addEventListener('touchend', (evt) =>{
    mouse.x = -69;
    mouse.y = -69;
});
window.addEventListener('touchcancel', (evt) =>{
    mouse.x = -69;
    mouse.y = -69;
});
document.addEventListener('mouseleave', (evt) =>{
    mouse.x = -69;
    mouse.y = -69;
});

class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = Math.random() * 30;
        this.density = (Math.random() * 20) + 5;
        this.vector = {
            x: (Math.random() * 2) -1.9,
            y: (Math.random() * 2) -1.9
        };
    }
    draw(){
        ctx.fillStyle = 'rgb(0,129,62)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        let dx = mouse.x -this.x;
        let dy = mouse.y -this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = mouse.radius;
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if(distance < mouse.radius){
            this.x -= directionX;
            this.y -= directionY;
        } 
        if(this.x > canvas.width){
            this.vector.x = 0 - Math.abs(this.vector.x)
        }
        if(this.y > canvas.height){
            this.vector.y = 0 - Math.abs(this.vector.y)
        }
        if(this.x < 0){
            this.vector.x = Math.abs(this.vector.x)
        }
        if(this.y < 0){
            this.vector.y = Math.abs(this.vector.y)
        }
        this.x += this.vector.x * this.density * 0.05;
        this.y += this.vector.y * this.density * 0.05;
    }
}

function init(){
    mouse.x = -69;
    mouse.y = -69;
    var parAmount = 800
    if (window.matchMedia('(max-device-width: 800px)').matches) {parAmount = 250}
    particleArray = [];
    for (let i = 0; i < parAmount; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArray.push(new Particle(x, y)); 
    }
}
init();

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();