const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let lastKnownScrollPosition=0;
window.addEventListener('resize', () =>{
    // canvas.height = window.innerHeight;
    // canvas.height = document.documentElement.scrollHeight;
    canvas.width = window.innerWidth;
    });

let particleArray = [];
let sizemulti = 1;
const mouse = {
    x: null,
    y: null,
    radius: 200,
    inverted: false
}


  window.addEventListener('load', () => {
    const marquee = document.querySelector('.marquee-content');
    const marqueeParent = document.querySelector('.marquee');
    const items = Array.from(marquee.children);
  
    // Clone the content once to create a seamless loop
    items.forEach(item => {
      const clone = item.cloneNode(true);
      marquee.appendChild(clone);
    });
  
    // Adjust marquee width to match the total content width
    const totalWidth = marquee.scrollWidth;
    marquee.style.width = `${totalWidth}px`;
  
    // Recalculate if resizing occurs
    window.addEventListener('resize', () => {
      const totalWidth = marquee.scrollWidth;
      marquee.style.width = `${totalWidth}px`;
    });
    init();
  });

// var rightJS = {
//     init: function(){
//       rightJS.Tags = document.querySelectorAll('.rightJS');
//       for(var i = 0; i < rightJS.Tags.length; i++){
//         rightJS.Tags[i].style.overflow = 'hidden';
//       }
//       rightJS.Tags = document.querySelectorAll('.rightJS span');
//       for(var i = 0; i < rightJS.Tags.length; i++){
//         rightJS.Tags[i].style.position = 'relative';
//         rightJS.Tags[i].style.right = '-'+rightJS.Tags[i].parentElement.offsetWidth+'px';
//       }
//       rightJS.loop();
//     },
//     loop: function(){
//       for(var i = 0; i < rightJS.Tags.length; i++){
//         var x = parseFloat(rightJS.Tags[i].style.right);
//         x ++;
//         var W = rightJS.Tags[i].parentElement.offsetWidth;
//         // console.log(W);
//         var w = rightJS.Tags[i].offsetWidth;
//         if(x>(i*w)) x = -W+(i*w);
//         if (rightJS.Tags[i].parentElement.parentElement.querySelector(':hover') !== rightJS.Tags[i].parentElement) rightJS.Tags[i].style.right = x + 'px';
//       } 
//       requestAnimationFrame(this.loop.bind(this));
//     }
//   };
//   window.addEventListener('load',rightJS.init);


document.addEventListener("scroll", (event) => {
    lastKnownScrollPosition = window.scrollY;
});

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
function mouseOver(){
    mouse.inverted=true;
    mouse.radius=250;
}
function mouseLeave(){
    mouse.inverted=false;
    mouse.radius=200;
}
document.addEventListener("mousedown", (event) => {
    mouse.inverted=true;
    mouse.radius=250;
});
document.addEventListener("mouseup", (event) => {
    mouse.inverted=false;
    mouse.radius=200;
});
class Particle {
    constructor(x, y, isMouseParticle){
        this.x = x;
        this.y = y;
        this.isMouseParticle = isMouseParticle;
        this.size = Math.random() * 35 * sizemulti;
        this.density = (Math.random() * 30) + 5;
        this.vector = {
            x: (Math.random() * 4) -2,
            y: (Math.random() * 4) -2
        };
        if(isMouseParticle){
            this.size = 35;
            this.density = 40;
        }
    }
    draw(lag){
        ctx.fillStyle = 'rgb(50,250,100)';
        if(this.isMouseParticle){
            ctx.fillStyle = 'rgb(50,50,50)';
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update(lag){
        let dx = mouse.x -this.x;
        let dy = (mouse.y+lastKnownScrollPosition) -this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = mouse.radius;
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let force = (maxDistance - distance) / maxDistance;
        if(mouse.inverted){
            forceDirectionX = -dx / distance;
            forceDirectionY = -dy / distance;
            force = distance / maxDistance;
        }
        if(this.isMouseParticle){
            forceDirectionX = -dx / distance;
            forceDirectionY = -dy / distance;
            force = distance / maxDistance;
        }
        let directionX = forceDirectionX * force * this.density * lag;
        let directionY = forceDirectionY * force * this.density * lag;
        if(distance < mouse.radius || this.isMouseParticle){
            this.x -= directionX*2;
            this.y -= directionY*2;
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
        this.x += this.vector.x * this.density * 0.05 * lag;
        this.y += this.vector.y * this.density * 0.05 * lag;
    }
}

function init(){
    canvas.height=Math.max( document.body.scrollHeight, document.body.offsetHeight, 
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    canvas.width = window.innerWidth;
    mouse.x = -69;
    mouse.y = -69;
    var parAmount = 200
    if (window.matchMedia('(max-device-width: 700px)').matches) {parAmount = 40; sizemulti=2}
    particleArray = [];
    for (let i = 0; i < parAmount; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArray.push(new Particle(x, y, false)); 
    }
    particleArray.push(new Particle(0, 0, true));
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var dif = Date.now() - lst;
    lst = Date.now();     
    lag = ((dif-25)/25)+1;
    if(lag<0) lag=1;
    for (let i = 0; i < particleArray.length; i++){
        particleArray[i].draw(lag);
        particleArray[i].update(lag);
    }
    requestAnimationFrame(animate);
    if(lag>50) lag=50;
}
lst = Date.now();
animate();
