"use strict";
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var circleArray = [];
var panelHeaders = document.querySelectorAll('.panel h1');
var panelHeadersArray = Array.prototype.slice.call(panelHeaders);
var heroHeaders = document.querySelectorAll('.hero__header');
var heroHeadersArray = Array.prototype.slice.call(heroHeaders);
heroHeadersArray.forEach(function (header, idx) {
    setTimeout(function () {
        header.style.transform = "translateY(0)";
    }, 2000 + (idx * 300));
});
setTimeout(function () {
    panelHeadersArray.forEach(function (header, idx) {
        var _a;
        for (var i = 0; i < 10; i++) {
            var clone = header.cloneNode(true);
            (_a = header.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(clone);
        }
        setTimeout(function () {
            var _a;
            (_a = header.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('active');
        }, 1000 + (idx * 200));
    });
});
function setDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    circleArray = [];
    for (var i = 0; i < 100; i++) {
        var x = 0;
        var y = 0;
        while (x < canvas.width * .2 || x > canvas.width * .8) {
            x = Math.random() * canvas.width;
        }
        while (y < canvas.height * .2 || y > canvas.height * .8) {
            y = Math.random() * canvas.height;
        }
        circleArray.push({ x: x, y: y });
    }
}
window.addEventListener('resize', setDimensions);
function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}
var mouseCoords = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
};
window.addEventListener('mousemove', function (e) {
    mouseCoords.targetX = e.clientX - (canvas.width / 2);
    mouseCoords.targetY = e.clientY - (canvas.height / 2);
});
var frame = 0;
var iteration = 0;
function animate() {
    ctx.fillStyle = '#dcfe4a';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mouseCoords.x = lerp(mouseCoords.x, mouseCoords.targetX, .075);
    mouseCoords.y = lerp(mouseCoords.y, mouseCoords.targetY, .075);
    ctx.beginPath();
    for (var i = 0; i < iteration; i++) {
        var _a = circleArray[i], x = _a.x, y = _a.y;
        ctx.beginPath();
        ctx.arc(x + mouseCoords.x, y + mouseCoords.y, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(x + mouseCoords.x, y + mouseCoords.y);
        ctx.strokeStyle = 'rgba(171, 171, 171, 0.118)';
        ctx.stroke();
    }
    ctx.closePath();
    frame++;
    if (frame % 10 == 1 && iteration < circleArray.length)
        iteration++;
    requestAnimationFrame(animate);
}
setDimensions();
animate();
