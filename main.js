const slider = document.querySelector("input[type=range]");
const sliderTxt = document.querySelector(".grid-slider");
const canvas = document.querySelector(".canvas");
const colorEl = document.querySelector("input[type=color]");

const date = new Date();
document.querySelector(
  ".footer-text"
).textContent = `Copyright © ${date.getFullYear()} rjrahul007`;

const DEFAULT_COLOR = `#FFEB7F`;
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

colorEl.addEventListener("input", (e) => {
  currentColor = e.target.value;
  console.log(e.target.value);
});

slider.addEventListener("input", handleSlider);
// slider.addEventListener("mousemove", handleSlider);

function handleSlider() {
  currentSize = this.value;
  updateSliderText(currentSize);
  clearGrid();
  paintCanvas(currentSize);
}

function updateSliderText(value) {
  sliderTxt.textContent = `${value} X ${value}`;
}

function clearGrid() {
  canvas.innerHTML = "";
}

function setCurrentMode(newMode) {
  currentMode = newMode;
}

function paintCanvas(value) {
  for (let i = 0; i < value * value; i++) {
    const gridDiv = document.createElement("div");
    gridDiv.classList.add("grid-div");
    gridDiv.addEventListener("mouseover", changeColor);
    gridDiv.addEventListener("mousedown", changeColor);
    gridDiv.setAttribute("draggable", "false");
    canvas.appendChild(gridDiv);
  }
  canvas.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${value}, 1fr)`;
}

const buttonsEl = document.querySelectorAll("button");
buttonsEl.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    buttonsEl.forEach((btn) => btn.classList.remove("active"));
    btn.classList.toggle("active");
    switch (btn.innerText.toLowerCase()) {
      case "color mode":
        setCurrentMode("color");
        break;
      case "clear":
        canvas.innerHTML = "";
        paintCanvas(currentSize);
        break;
      case "grid lines":
        document
          .querySelectorAll(".grid-div")
          .forEach((g) => g.classList.toggle("lines"));
        break;
      case "rainbow mode":
        setCurrentMode("rainbow");
        break;
      case "eraser":
        setCurrentMode("eraser");
        break;
      case "shading":
        setCurrentMode("shading");
        break;
      case "lighten":
        setCurrentMode("lighten");
        break;
    }
  });
});

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    currentColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#fefefe";
  } else if (currentMode === "shading") {
    if (e.target.style.backgroundColor) {
      e.target.style.backgroundColor = increaseShading(
        e.target.style.backgroundColor,
        "shading"
      );
    }
  } else if (currentMode === "lighten") {
    if (e.target.style.backgroundColor) {
      e.target.style.backgroundColor = increaseShading(
        e.target.style.backgroundColor,
        "lighten"
      );
    }
  }
}

function hexToRGBA(hex) {
  if (hex.startsWith("rgb")) {
    return hex;
  }

  // Convert each part to an integer.
  let r = parseInt(hex[1] + hex[2], 16);
  let g = parseInt(hex[3] + hex[4], 16);
  let b = parseInt(hex[5] + hex[6], 16);

  // Return the RGBA color string.
  return `rgb(${r}, ${g}, ${b})`;
}

function increaseShading(rgbaColor, mode) {
  if (!rgbaColor.startsWith("rgb")) {
    rgbaColor = hexToRGBA(rgbaColor);
  }

  let rgb = rgbaColor.replace(/[^\d,]/g, "").split(",");
  let r = parseInt(rgb[0]);
  let g = parseInt(rgb[1]);
  let b = parseInt(rgb[2]);
  let newR;
  let newG;
  let newB;
  if (mode === "shading") {
    // Increase the shading by 10%.
    newR = Math.max(Math.round(r * 0.9), 0);
    newG = Math.max(Math.round(g * 0.9), 0);
    newB = Math.max(Math.round(b * 0.9), 0);
  } else if (mode === "lighten") {
    newR = Math.min(Math.round(r + 21), 255);
    newG = Math.min(Math.round(g + 21), 255);
    newB = Math.min(Math.round(b + 21), 255);
  }

  // Return the new rgba color string.
  return `rgb(${newR}, ${newG}, ${newB})`;
}

window.onload = function () {
  slider.value = DEFAULT_SIZE;
  paintCanvas(DEFAULT_SIZE);
  updateSliderText(DEFAULT_SIZE);
};
