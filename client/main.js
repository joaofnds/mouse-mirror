const canvas = document.querySelector("canvas");

if (!"WebSocket" in window) {
  document.body.removeChild(canvas);
  const el = document.createElement("h1");
  el.innerText = "unsupported browser";
  document.body.appendChild(el);
}

const socket = io("http://localhost:3000");
const ctx = canvas.getContext("2d");
const circleRadius = 6;
const pointer = {
  x: Math.floor(window.innerWidth / 2),
  y: Math.floor(window.innerHeight / 2)
};

resizeCanvasToWindow(canvas);
window.onresize = _ => resizeCanvasToWindow(canvas);
window.onmousemove = ({ x, y }) =>
  socket.emit("mousemove", {
    x,
    y,
    width: window.innerWidth,
    height: window.innerHeight
  });

socket.on("mousemove", ({ x, y, width, height }) => {
  const widthRatio = Math.abs(window.innerWidth / width);
  const heightRatio = Math.abs(window.innerHeight / height);
  pointer.x = widthRatio * x;
  pointer.y = heightRatio * y;
});

requestAnimationFrame(animate);

function animate() {
  clearCanvas(ctx);

  ctx.beginPath();
  ctx.arc(
    pointer.x - circleRadius,
    pointer.y - circleRadius,
    circleRadius * 2,
    0,
    Math.PI * 2
  );
  ctx.fill();

  requestAnimationFrame(animate);
}

function clearCanvas(context) {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

function resizeCanvasToWindow(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
