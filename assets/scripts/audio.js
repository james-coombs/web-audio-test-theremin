'use strict';

const audioCtxW = new(window.AudioContext || window.webkitAudioContext)();
const audioCtxA = new(window.AudioContext || window.webkitAudioContext)();
const audioCtxS = new(window.AudioContext || window.webkitAudioContext)();
const audioCtxD = new(window.AudioContext || window.webkitAudioContext)();

const canvas = document.querySelector('.visualizer');
const myCanvas = canvas.getContext('2d');

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let maxFreq = 2000;
let maxVol = 1;

let initialFreq = 200;
let initialVol = 0.5;

const oscillatorW = audioCtxW.createOscillator();
const gainNodeW = audioCtxW.createGain();

const oscillatorA = audioCtxA.createOscillator();
const gainNodeA = audioCtxA.createGain();

const oscillatorS = audioCtxS.createOscillator();
const gainNodeS = audioCtxS.createGain();

const oscillatorD = audioCtxD.createOscillator();
const gainNodeD = audioCtxD.createGain();

oscillatorW.connect(gainNodeW);
gainNodeW.connect(audioCtxW.destination);
oscillatorW.type = 'sine'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
oscillatorW.frequency.value = initialFreq; // value in hertz
gainNodeW.gain.value = initialVol;

const stopOscoscillatorW = () => {
  gainNodeW.disconnect(audioCtxW.destination);
};

const startOscoscillatorW = () => {
  {
    gainNodeW.connect(audioCtxW.destination);
    oscillatorW.start();
  }
};

const analyserW = audioCtxW.createAnalyser();

oscillatorW.connect(analyserW);
// analyserW.connect(audioCtxW.destination);

// analyserW.fftSize = 2048;
// let bufferLengthW = analyserW.frequencyBinCount;
// let dataArrayW = new Uint8Array(bufferLengthW);
//
// analyserW.getByteTimeDomainData(dataArrayW);
//
// myCanvas.clearRect(0, 0, WIDTH, HEIGHT);
//
// function draw() {
//   drawVisual = requestAnimationFrame(draw);
//
//   analyserW.getByteTimeDomainData(dataArrayW);
//
//   myCanvas.fillStyle = 'rgb(230, 20, 210)';
//   myCanvas.fillRect(0, 0, WIDTH, HEIGHT);
//   myCanvas.lineWidth = 2;
//   myCanvas.strokeStyle = 'rgb(40, 95, 95)';
//   myCanvas.beginPath();
//
//   let sliceWidth = WIDTH * 1.0 / bufferLengthW;
//   let x = 0;
//
//   for (let i = 0; i < bufferLengthW; i++) {
//
//     let v = dataArrayW[i] / 128.0;
//     let y = v * HEIGHT / 2;
//
//     if (i === 0) {
//       myCanvas.moveTo(x, y);
//     } else {
//       myCanvas.lineTo(x, y);
//     }
//
//     x += sliceWidth;
//   }
//
//   myCanvas.lineTo(canvas.width, canvas.height / 2);
//   myCanvas.stroke();
// }
//
// const analyserButton = document.getElementById("analyserButton");
//
// analyserButton.addEventListener('click', function() {
//   startOscoscillatorW();
//   draw();
// });



oscillatorA.connect(gainNodeA);
gainNodeA.connect(audioCtxA.destination);
oscillatorA.type = 'square'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
oscillatorA.frequency.value = initialFreq; // value in hertz
gainNodeA.gain.value = initialVol;

const stopOscoscillatorA = () => {
  gainNodeA.disconnect(audioCtxA.destination);
};

const startOscoscillatorA = () => {
  {
    gainNodeA.connect(audioCtxA.destination);
    oscillatorA.start();
  }
};


oscillatorS.connect(gainNodeS);
gainNodeS.connect(audioCtxS.destination);
oscillatorS.type = 'sawtooth'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
oscillatorS.frequency.value = initialFreq; // value in hertz
gainNodeS.gain.value = initialVol;

const stopOscoscillatorS = () => {
  gainNodeS.disconnect(audioCtxS.destination);
};

const startOscoscillatorS = () => {
  {
    gainNodeS.connect(audioCtxS.destination);
    oscillatorS.start();
  }
};


oscillatorD.connect(gainNodeD);
gainNodeD.connect(audioCtxD.destination);
oscillatorD.type = 'triangle'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
oscillatorD.frequency.value = initialFreq; // value in hertz
gainNodeD.gain.value = initialVol;

const stopOscoscillatorD = () => {
  gainNodeD.disconnect(audioCtxD.destination);
};

const startOscoscillatorD = () => {
  {
    gainNodeD.connect(audioCtxD.destination);
    oscillatorD.start();
  }
};

$(document).keydown(function(e) {
  switch (e.which) {
    case 87:
      console.log('w');
      startOscoscillatorW();
      $(".w").css("border", "2px solid red");
      break;

    case 65:
      console.log('a');
      startOscoscillatorA();
      $(".a").css("border", "2px solid red");
      break;

    case 83:
      console.log('s');
      startOscoscillatorS();
      $(".s").css("border", "2px solid red");
      break;

    case 68:
      console.log('d');
      startOscoscillatorD();
      $(".d").css("border", "2px solid red");
      break;

    default:
      return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});

$(document).keyup(function(e) {
  switch (e.which) {
    case 87:
      console.log('w');
      stopOscoscillatorW();
      $(".w").css("border", "0px solid red");
      break;

    case 65:
      console.log('a');
      stopOscoscillatorA();
      break;

    case 83:
      console.log('s');
      stopOscoscillatorS();
      break;

    case 68:
      console.log('d');
      stopOscoscillatorD();
      break;

    default:
      return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});

// Mouse pointer coordinates
let CurX;
let CurY;

// Get new mouse pointer coordinates when mouse is moved
// then set new gain and pitch values
function updatePage(e) {
  CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
  CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

  oscillatorW.frequency.value = (CurX / WIDTH) * maxFreq;
  gainNodeW.gain.value = (CurY / HEIGHT) * maxVol;

  oscillatorA.frequency.value = (CurX / WIDTH) * maxFreq;
  gainNodeA.gain.value = (CurY / HEIGHT) * maxVol;

  oscillatorS.frequency.value = (CurX / WIDTH) * maxFreq;
  gainNodeS.gain.value = (CurY / HEIGHT) * maxVol;

  oscillatorD.frequency.value = (CurX / WIDTH) * maxFreq;
  gainNodeD.gain.value = (CurY / HEIGHT) * maxVol;
}

document.onmousemove = updatePage;

module.exports = {
  startOscoscillatorW,
  stopOscoscillatorW,
  startOscoscillatorA,
  stopOscoscillatorA,
  startOscoscillatorS,
  stopOscoscillatorS,
  startOscoscillatorD,
  stopOscoscillatorD,
  updatePage,
};
