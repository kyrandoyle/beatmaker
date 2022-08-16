class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.playBtn = document.querySelector(".play");
    this.isPlaying = null;
    this.mutebBtn = document.querySelectorAll(".mute");
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/Snare-acoustic01.wav";
    this.currentHihat = "./sounds/Hihat-acoustic01.wav";
    this.selects = document.querySelectorAll("select");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }
  repeater() {
    const step = drumKit.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //Check if bar is active
      if (bar.classList.contains("active")) {
        //Check which sound to play
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.snareAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    drumKit.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeater();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  activePad() {
    this.classList.toggle("active");
  }
  btnChange() {
    this.playBtn.classList.toggle("active");
    console.log(this);
    if (this.playBtn.classList.contains("active")) {
      this.playBtn.innerText = "Stop";
    } else {
      this.playBtn.innerText = "Play";
    }
  }
  mute(e) {
    this.mutebBtn.forEach((btn) => {
      const muteTrack = e.target.getAttribute("data-track");
      e.target.classList.toggle("active");

      if (e.target.classList.contains("active")) {
        switch (muteTrack) {
          case "0":
            this.kickAudio.volume = 0;
            break;
          case "1":
            this.snareAudio.volume = 0;
            break;
          case "2":
            this.hihatAudio.volume = 0;
            break;
        }
      } else {
        switch (muteTrack) {
          case "0":
            this.kickAudio.volume = 1;
            break;
          case "1":
            this.snareAudio.volume = 1;
            break;
          case "2":
            this.hihatAudio.volume = 1;
            break;
        }
      }
    });
  }

  selector(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    console.log(selectionName);
    console.log(selectionValue);
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nr");
    tempoText.innerText = e.target.value;
  }
  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start(0);
    }
  }
}

const drumKit = new DrumKit();

//EVENT LISTENERS

drumKit.playBtn.addEventListener("click", function () {
  drumKit.start();
  drumKit.btnChange();
});

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.mutebBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.selector(e);
  });
});

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo(e);
});
