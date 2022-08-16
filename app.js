class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.playBtn = document.querySelector(".play");
  }
  repeater() {
    const step = drumKit.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    drumKit.index++;
    console.log(activeBars);
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    setInterval(this.repeater, interval);
  }
}

const drumKit = new DrumKit();

//EVENT LISTENERS

drumKit.playBtn.addEventListener("click", function () {
  drumKit.start();
});
