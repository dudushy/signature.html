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
document.addEventListener("touchstart", startDrawing_mobile);

document.addEventListener("mousemove", drawStroke);
document.addEventListener("touchmove", drawStroke_mobile);

document.addEventListener("mouseup", stopDrawing);
document.addEventListener("touchend", stopDrawing);

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
  console.log(`[${TITLE}#startDrawing] event`, event);

  pressedMouse = true;
  x = event.offsetX;
  y = event.offsetY;
}

function startDrawing_mobile(event) {
  console.log(`[${TITLE}#startDrawing_mobile] event`, event);

  const rect = event.target.getBoundingClientRect();
  console.log(`[${TITLE}#startDrawing_mobile] rect`, rect);

  pressedMouse = true;
  x = event.targetTouches[0].pageX - rect.left;
  y = event.targetTouches[0].pageY - rect.top;
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

function drawStroke_mobile(event) {
  // console.log(`[${TITLE}#drawStroke_mobile] pressedMouse`, pressedMouse);

  if (pressedMouse) {
    console.log(`[${TITLE}#drawStroke_mobile] drawing`);

    const rect = event.target.getBoundingClientRect();
    console.log(`[${TITLE}#drawStroke_mobile] rect`, rect);

    const pseudoOffsetX = event.targetTouches[0].pageX - rect.left;
    console.log(`[${TITLE}#drawStroke_mobile] pseudoOffsetX`, pseudoOffsetX);

    const pseudoOffsetY = event.targetTouches[0].pageY - rect.top;
    console.log(`[${TITLE}#drawStroke_mobile] pseudoOffsetY`, pseudoOffsetY);

    signaturePad.style.cursor = "crosshair";

    ctx.beginPath();
    ctx.strokeStyle = signatureColor;
    ctx.lineWidth = 2;
    ctx.moveTo(x, y);
    ctx.lineTo(pseudoOffsetX, pseudoOffsetY);
    ctx.stroke();
    ctx.closePath();

    x = pseudoOffsetX;
    y = pseudoOffsetY;
  }
}
