
var body = document.body;
var html = document.documentElement;
var backgroundImageHeight = 1638;
var documentHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

var backgroundZoom = getComputedStyle(document.body).backgroundSize.split(" ")[1].replace("%","")/100;

var boxWidth = document.getElementById("droneimg").offsetWidth;
var boxHeight = document.getElementById("droneimg").offsetHeight;

var viewWidth = window.innerWidth;
var viewHeight = window.innerHeight;

var drimage = document.getElementById("droneimg");
drimage.style.setProperty('--x1', -boxWidth/1.75 + "px");
drimage.style.setProperty('--y1', -boxHeight/1.70 + "px");

window.addEventListener("mousemove", (e) => {
    viewWidth = window.innerWidth;
    viewHeight = window.innerHeight;
    var x1 = (e.clientX/viewWidth)*(boxWidth);
    var y1 = (e.clientY/viewHeight)*(boxHeight);
    drimage.style.setProperty('--x1', -x1 + "px");
    drimage.style.setProperty('--y1', -y1 + "px");
})

document.addEventListener("scroll", (e) => {
    imgHeight = window.innerHeight*backgroundZoom;
    var scrollPercent = (window.scrollY+viewHeight)/documentHeight;
    if(scrollPercent<0.2){
        scrollPercent=scrollPercent/4;
    }
    let scrolly = Math.min(scrollPercent,1) * Math.max((backgroundImageHeight-viewHeight),(viewHeight-backgroundImageHeight));
    document.body.style.setProperty('--y', -scrolly + "px");
  })    

