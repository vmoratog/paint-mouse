
var myCanvas = document.getElementById('area_de_dibujo');
var prevX = 0;
var prevY = 0;
var isDrawing = false;
var limpiar = document.getElementById('botoncito');
var colorButtons = document.getElementsByClassName('colorButton');
var selectColor = 'black';

myCanvas.addEventListener('mousedown', mouseDown); 
myCanvas.addEventListener('mouseup', mouseUp);
myCanvas.addEventListener('mousemove', mouseMove);

function getCoords(event) {
  const canvas = event.target
  const x = event.clientX - canvas.offsetLeft; // le resta lo que esta por fuera del canvas (el margen)
  const y = event.clientY - canvas.offsetTop; // y asi la esquina del canvas cuenta como coord 0,0
  return { x, y }
}

function dibujarLinea(color, canvas, prevX, prevY, currX, currY) {
  const ctx = canvas.getContext('2d'); 
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.linewidth =3;
  ctx.moveTo(prevX,prevY);
  ctx.lineTo(currX,currY);
  ctx.stroke();
  ctx.closePath();
}

var colorcito = 'black'

function mouseDown(event) {
  const {x, y} = getCoords(event);
  console.log(event);
  isDrawing = true;
  prevX = x;
  prevY = y;
}

function mouseUp(event) {
  console.log(event);
  isDrawing = false;
}

function mouseMove(event) {
  if(!isDrawing) return;
  const {x, y} = getCoords(event);
  dibujarLinea(selectColor, event.target, prevX, prevY, x, y);
  prevX = x;
  prevY = y;
}

limpiar.addEventListener('click', function(){
  const context = myCanvas.getContext('2d');
  context.clearRect(0, 0, myCanvas.width, myCanvas.height);
})

for (let index = 0; index < colorButtons.length; index++) {
  const colorButton = colorButtons[index];
  colorButton.addEventListener('click', function(event){
  selectColor = event.target.id;
  });
}