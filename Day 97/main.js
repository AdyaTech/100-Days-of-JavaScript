const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
let audioSrc = null;

let speed = 0;
let enginePitch = 1;
let frames = 0; 
let maxSpeed = 100;
let keys = {};

addEventListener("DOMContentLoaded", () => {
  const speedometer = document.getElementById("speedometer");
  const canvas = document.getElementById("rpm-canvas");
  const arrow = document.querySelector(".arrow");
  let ctx = canvas.getContext("2d");

  window.addEventListener('keydown', (e) => { keys[e.code] = true; });
  window.addEventListener('keyup', (e) => { keys[e.code] = false; });
  document.getElementById("toggle-sound").addEventListener('click', (e) => {
    if (e.target.innerHTML == "Mute sound"){
      audioCtx.suspend().then(e.target.innerHTML = "Unmute sound");
    } else {
      audioCtx.resume().then(e.target.innerHTML = "Mute sound");
    }
  })

  function loop(){
    maxSpeed = 95 + (Math.random() * 5) + Math.sin(Date.now() / 153) - Math.min( Math.tan(Date.now() / 245), 4); 
    if (keys['KeyW']){
      speed < maxSpeed 
        ? speed = speed + 0.2 + Math.pow((100 - speed), 1.6) / 500
        : speed = maxSpeed; 
    } else {
      speed > 0 
         ? speed = speed - 0.2 - Math.pow(speed, 1.4) / 1000
         : speed = 0; 
    }
    enginePitch = 1 + speed / 100;
    updateVisuals(); 
    if (audioSrc && frames % 2 == 0) {
      audioSrc.playbackRate.value = 1 + (speed / 40);
    }
    requestAnimationFrame(loop);
  }

  function updateVisuals(){
    if (frames < 300){
      frames++ 
    } else {
      frames = 0;
      void ctx.clearRect(0, 0, 300, 100);
    }
    ctx.fillStyle = `hsl(${160 - speed * 1.6}, 90%, 70%)`;
    ctx.fillRect(frames, 100 - speed, 1, 3);
    ctx.fillStyle = `hsla(${160 - speed * 1.6}, 90%, 70%, 0.3)`;
    ctx.fillRect(frames, 100 - speed, 1, speed);
    speedometer.style.width = ((enginePitch - 1) * 100) + "%";
    speedometer.style.backgroundColor = `hsl(${160 - speed * 1.6}, 90%, 70%)`;
    arrow.style.transform = `rotate(${speed * 1.8}deg)`;
  }

  loop();
});

fetch('https://ceramicsoda.github.io/publicFiles/audio/engine4.ogg')
  .then(response => response.arrayBuffer())
  .then(buffer => audioCtx.decodeAudioData(buffer))
  .then(decodedData => {
    audioSrc = audioCtx.createBufferSource();
    audioSrc.buffer = decodedData;
    audioSrc.loop = true; 
    audioSrc.connect(audioCtx.destination);
    audioSrc.start();
    audioCtx.suspend(); 
})
  .catch(error => console.error(error)
);