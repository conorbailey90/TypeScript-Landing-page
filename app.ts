const canvas: HTMLCanvasElement = document.querySelector('canvas')!;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
let circleArray: Coordintates[] = [];
let panelHeaders = document.querySelectorAll('.panel h1');
let panelHeadersArray: HTMLElement[] = Array.prototype.slice.call(panelHeaders);
const heroHeaders = document.querySelectorAll('.hero__header');
let heroHeadersArray: HTMLElement[] = Array.prototype.slice.call(heroHeaders)


heroHeadersArray.forEach((header, idx) => {
    setTimeout(() => {
        header.style.transform = `translateY(0)`
    }, 2000 + (idx * 300))
})

setTimeout(() => {
    panelHeadersArray.forEach((header, idx) => {
        for(let i = 0; i < 10; i++){
            let clone = header.cloneNode(true);
            header.parentElement?.appendChild(clone);
        }
        setTimeout(() => {
            header.parentElement?.classList.add('active')
        }, 1000 + (idx * 200))
    })
})

interface Coordintates {
    x: number
    y: number
}

interface MouseCoords {
    x: number
    y: number
    targetX: number
    targetY: number
}

function setDimensions(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    circleArray = [];
    for(let i = 0; i < 100; i++){
        let x = 0;
        let y = 0;
        while( x < canvas.width * .2 || x > canvas.width * .8){
            x = Math.random() * canvas.width;
        }
        while( y < canvas.height * .2 || y > canvas.height * .8){
            y = Math.random() * canvas.height;
        }
    
        circleArray.push({x, y});
    }
}

window.addEventListener('resize', setDimensions);

function lerp(start: number, end: number, t: number){
    return start * (1 - t) + end * t;
}

let mouseCoords: MouseCoords = {
    x: 0,
    y: 0,
    targetX:0,
    targetY: 0
}

window.addEventListener('mousemove', (e) => {
    mouseCoords.targetX = e.clientX - (canvas.width/2);
    mouseCoords.targetY = e.clientY - (canvas.height/2);
})

let frame = 0;
let iteration = 0;
function animate(){

    ctx.fillStyle = '#dcfe4a';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mouseCoords.x = lerp(mouseCoords.x, mouseCoords.targetX, .075);
    mouseCoords.y = lerp(mouseCoords.y, mouseCoords.targetY, .075);
    ctx.beginPath();
    for(let i = 0; i < iteration; i++){
        let {x, y} = circleArray[i];
        ctx.beginPath();
        ctx.arc(x + mouseCoords.x, y + mouseCoords.y, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.moveTo(canvas.width / 2, canvas.height / 2)
        ctx.lineTo(x + mouseCoords.x, y + mouseCoords.y);
        ctx.strokeStyle = 'rgba(171, 171, 171, 0.118)';
        ctx.stroke()

    }
    ctx.closePath();
    frame++
    if(frame % 10 == 1 && iteration < circleArray.length) iteration++
    requestAnimationFrame(animate)
}


setDimensions();
animate()