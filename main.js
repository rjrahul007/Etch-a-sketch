const slider = document.querySelector("input[type=range]");
const sliderTxt = document.querySelector(".grid-slider");
const canvas = document.querySelector(".canvas");
let isClicked = false;

slider.addEventListener("input", handleSlider);
// slider.addEventListener("mousemove", handleSlider);

function handleSlider() {
  const value = this.value;
  sliderTxt.textContent = `${value} X ${value}`;
  canvas.innerHTML = "";
  paintCanvas(value);
}

function paintCanvas(value) {
  for (let i = 0; i < value * value; i++) {
    const gridDiv = document.createElement("div");
    gridDiv.setAttribute("class", "grid-div");
    canvas.appendChild(gridDiv);
  }
  canvas.style.display = "grid";
  canvas.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${value}, 1fr)`;
}
