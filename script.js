let rRange = document.getElementById("r");
let gRange = document.getElementById("g");
let bRange = document.getElementById("b");
let cRange = document.getElementById("c");
let mRange = document.getElementById("m");
let yRange = document.getElementById("y");
let kRange = document.getElementById("k");
let rLabel = document.getElementById("rLabel");
let gLabel = document.getElementById("gLabel");
let bLabel = document.getElementById("bLabel");
let cLabel = document.getElementById("cLabel");
let mLabel = document.getElementById("mLabel");
let yLabel = document.getElementById("yLabel");
let kLabel = document.getElementById("kLabel");
let text = document.getElementById("text");
let outputRGB = document.getElementById("outputRGB");
let outputCMYK = document.getElementById("outputCMYK");

let r = 0,
  g = 0,
  b = 0,
  c = 0,
  m = 0,
  y = 0,
  k = 100;

const pickr = Pickr.create({
  el: ".color-picker",
  theme: "classic", // or 'monolith', or 'nano'
  defaultRepresentation: "RGBA",
  default: "rgba(0,0,0,1)",
  components: {
    // Main components
    preview: true,
    hue: true,

    // Input / output Options
    interaction: {
      input: true,
      save: true,
    },
  },
});

const pickr2 = Pickr.create({
  el: ".color-picker2",
  theme: "classic", // or 'monolith', or 'nano'
  defaultRepresentation: "CMYK",
  default: "CMYK(0%, 0%, 0%, 100%)",
  components: {
    // Main components
    preview: true,
    hue: true,

    // Input / output Options
    interaction: {
      input: true,
      save: true,
    },
  },
});

pickr.on("save", (color, instance) => {
  var colors = color.toRGBA();
  rRange.value = Math.round(colors[0]);
  rLabel.innerText = "R: " + Math.round(colors[0]);
  gRange.value = Math.round(colors[1]);
  gLabel.innerText = "G: " + Math.round(colors[1]);
  bRange.value = Math.round(colors[2]);
  bLabel.innerText = "B: " + Math.round(colors[2]);
  r = Math.round(colors[0]);
  g = Math.round(colors[1]);
  b = Math.round(colors[2]);
});

pickr2.on("save", (color, instance) => {
  var colors = color.toCMYK();
  cRange.value = Math.round(colors[0]);
  cLabel.innerText = "C: " + Math.round(colors[0]) + "%";
  mRange.value = Math.round(colors[1]);
  mLabel.innerText = "M: " + Math.round(colors[1]) + "%";
  yRange.value = Math.round(colors[2]);
  yLabel.innerText = "Y: " + Math.round(colors[2]) + "%";
  kRange.value = Math.round(colors[3]);
  kLabel.innerText = "K: " + Math.round(colors[3]) + "%";
  c = Math.round(colors[0]);
  m = Math.round(colors[1]);
  y = Math.round(colors[2]);
  k = Math.round(colors[3]);
});

rRange.addEventListener("input", () => {
  rLabel.innerText = "R: " + rRange.value;
  r = rRange.value;
});

gRange.addEventListener("input", () => {
  gLabel.innerText = "G: " + gRange.value;
  g = gRange.value;
});

bRange.addEventListener("input", () => {
  bLabel.innerText = "B: " + bRange.value;
  b = bRange.value;
});

rRange.addEventListener("change", () => {
  pickr.setColor(`rgb(${r}, ${g}, ${b})`, true);
  pickr.applyColor(false);
});

gRange.addEventListener("change", () => {
  pickr.setColor(`rgb(${r}, ${g}, ${b})`, true);
  pickr.applyColor(false);
});

bRange.addEventListener("change", () => {
  pickr.setColor(`rgb(${r}, ${g}, ${b})`, true);
  pickr.applyColor(false);
});

cRange.addEventListener("input", () => {
  cLabel.innerText = "C: " + cRange.value + "%";
  c = cRange.value;
});

mRange.addEventListener("input", () => {
  mLabel.innerText = "M: " + mRange.value + "%";
  m = mRange.value;
});

yRange.addEventListener("input", () => {
  yLabel.innerText = "Y: " + yRange.value + "%";
  y = yRange.value;
});

kRange.addEventListener("input", () => {
  kLabel.innerText = "K: " + kRange.value + "%";
  k = kRange.value;
});

document.getElementById("RGBtoCMYK").addEventListener("click", () => {
  var cmyk = RGBtoCMYK(r, g, b);
  text.innerText = `Converting RGB (${r}, ${g}, ${b}) to CMYK (${cmyk.C}%, ${cmyk.M}%, ${cmyk.Y}%, ${cmyk.K}%)`;
  var rgb = CMYKtoRGB(cmyk.C, cmyk.M, cmyk.Y, cmyk.K);
  outputCMYK.style.background = `rgb(${rgb.R},${rgb.G},${rgb.B})`;
});

document.getElementById("CMYKtoRGB").addEventListener("click", () => {
  var rgb = CMYKtoRGB(c, m, y, k);
  text.innerText = `Converting CMYK (${c}%, ${m}%, ${y}%, ${k}%) to RGB (${rgb.R}, ${rgb.G}, ${rgb.B})`;
  outputRGB.style.background = `rgb(${rgb.R},${rgb.G},${rgb.B})`;
});

cRange.addEventListener("change", () => {
  console.log(cRange.value, c, `CMYK(${c}%, ${m}%, ${y}%, ${k}%)`);
  //   pickr2.setColor(`CMYK(${c}%, ${m}%, ${y}%, ${k}%)`);
  //   pickr2.applyColor();
});

document.getElementById("reset").addEventListener("click", () => {
  (r = 0), (g = 0), (b = 0), (c = 0), (m = 0), (y = 0), (k = 100);
  (rRange.value = 0),
    (gRange.value = 0),
    (bRange.value = 0),
    (cRange.value = 0),
    (mRange.value = 0),
    (yRange.value = 0),
    (kRange.value = 100);
  text.innerText = "";
  pickr.setColor("rgb(0,0,0)");
  pickr.applyColor();
  pickr2.setColor("CMYK(0%, 0%, 0%, 100%)");
  pickr2.applyColor();
  outputRGB.style.background = "white";
  outputCMYK.style.background = "white";
});

function RGBtoCMYK(R, G, B) {
  if (R === 0 && G === 0 && B == 0)
    return {
      C: 0,
      M: 0,
      Y: 0,
      K: 100,
    };
  var tempR = R / 255,
    tempG = G / 255,
    tempB = B / 255;
  var K = 1 - Math.max(tempR, tempG, tempB);
  var C = (1 - tempR - K) / (1 - K),
    M = (1 - tempG - K) / (1 - K),
    Y = (1 - tempB - K) / (1 - K);
  return {
    C: Math.round(C * 100),
    M: Math.round(M * 100),
    Y: Math.round(Y * 100),
    K: Math.round(K * 100),
  };
}

function CMYKtoRGB(C, M, Y, K) {
  var tempK = 1 - K / 100,
    tempC = 1 - C / 100,
    tempM = 1 - M / 100,
    tempY = 1 - Y / 100;
  return {
    R: Math.round(255 * tempC * tempK),
    G: Math.round(255 * tempM * tempK),
    B: Math.round(255 * tempY * tempK),
  };
}
