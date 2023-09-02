const TITLE = "signature.html";
console.log(`[${TITLE}] init`);

const signaturePad = document.getElementById("signaturePad");
signaturePad.height = window.innerHeight / 2;
signaturePad.width = window.innerWidth / 1.5;

const ctx = signaturePad.getContext("2d");

var pressedMouse = false;
var x;
var y;
var signatureColor = "#000";

document.addEventListener("mousedown", startDrawing);
document.addEventListener("mousemove", drawStroke);
document.addEventListener("mouseup", stopDrawing);
window.addEventListener("resize", updateSignatureSize);

function updateSignatureColor(color) {
  console.log(`[${TITLE}#updateSignatureColor] color`, color);

  signatureColor = color;
}

function updateSignatureSize() {
  console.log(`[${TITLE}#updateSignatureSize]`);

  signaturePad.height = window.innerHeight / 2;
  signaturePad.width = window.innerWidth / 1.5;
}

function clearSignature() {
  console.log(`[${TITLE}#clearSignature]`);
  ctx.clearRect(0, 0, signaturePad.width, signaturePad.height);
}

function downloadSignature() {
  signaturePad.toBlob((blob) => {
    console.log(`[${TITLE}#downloadSignature] blob`, blob);

    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = URL.createObjectURL(blob);
    link.click();
  }, 'image/png');
}

function startDrawing(event) {
  console.log(`[${TITLE}#startDrawing]`);

  pressedMouse = true;
  x = event.offsetX;
  y = event.offsetY;
}

function stopDrawing() {
  console.log(`[${TITLE}#stopDrawing]`);

  pressedMouse = false;
  signaturePad.style.cursor = "default";
}

function drawStroke(event) {
  // console.log(`[${TITLE}#drawStroke] pressedMouse`, pressedMouse);

  if (pressedMouse) {
    console.log(`[${TITLE}#drawStroke] drawing`);

    signaturePad.style.cursor = "crosshair";

    ctx.beginPath();
    ctx.strokeStyle = signatureColor;
    ctx.lineWidth = 2;
    ctx.moveTo(x, y);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.closePath();

    x = event.offsetX;
    y = event.offsetY;
  }
}
