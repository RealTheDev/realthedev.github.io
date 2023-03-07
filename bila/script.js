const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
window.addEventListener('resize', () =>{
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});
let clicked=false;
window.addEventListener('mousedown', () => {
    console.log("DOWN!\n");
    clicked=true;
  })

window.addEventListener('mouseup', () => {
    console.log("UP!\n");
    clicked=false;
  })

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
      clicked=true;
  });
  window.addEventListener('touchend', (evt) =>{
      mouse.x = -69;
      mouse.y = -69;
      clicked=false;
  });
  window.addEventListener('touchcancel', (evt) =>{
      mouse.x = -69;
      mouse.y = -69;
      clicked=false;
  });
  document.addEventListener('mouseleave', (evt) =>{
      mouse.x = -69;
      mouse.y = -69;
      clicked=false;
  });
class Ball {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.lastx=x;
        this.lasty=y;
        this.friction=0.05;
        this.size = 30;
        this.launch=false;
        this.vector = {
            x: 0,
            y: 0
        };
    }
    draw(lag){
        ctx.fillStyle = 'rgb(50,150,50)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update(lag){
        if(!clicked){
            if(this.launch==true){
                this.vector.x=(this.lastx-this.x)/4;
                this.vector.y=(this.lasty-this.y)/4;
                this.launch=false;
            }
        this.x=this.x+this.vector.x/4;
        this.y=this.y+this.vector.y/4;
        this.lastx=this.x;
        this.lasty=this.y;
        this.vector.x=this.vector.x/(this.friction+1);
        this.vector.y=this.vector.y/(this.friction+1);
        console.log(this.vector.x);
        }
        if(clicked){
        this.vector.x=0;
        this.vector.y=0;
        this.x=mouse.x;
        this.y=mouse.y;
        if(!this.launch){
        this.lastx=mouse.x;
        this.lasty=mouse.y;
        }
        this.launch=true;
        }
    }
}
let ball = new Ball(500,500);
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var dif = Date.now() - lst;
    lst = Date.now();     
    lag = ((dif-25)/25)+1;
    if(lag<0) lag=1;
    /*for (let i = 0; i < particleArray.length; i++){
        particleArray[i].draw(lag);
        particleArray[i].update(lag);
    }*/
    ball.draw(lag);
    ball.update(lag);
    requestAnimationFrame(animate);
}
lst = Date.now();
animate();
