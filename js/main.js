<<<<<<< HEAD
// index.js
import { allMusic } from './musicList.js';

const container = document.querySelector(".container"),
    musicImg = container.querySelector(".imgArea img"),
    musicName = container.querySelector(".songDetails .name"),
    musicArtist = container.querySelector(".songDetails .artist"),
    playPauseBtn = container.querySelector(".playPause"),
    prevBtn = container.querySelector("#prev"),
    nextBtn = container.querySelector("#next"),
    mainAudio = container.querySelector("#mainAudio"),
    progressArea = container.querySelector(".progressArea"),
    progressBar = progressArea.querySelector(".progressBar"),
    volumeRange = document.getElementById('volume-range'),
    muteBtn = document.getElementById('mute'),
    queueBtn = document.getElementById('queue-btn');

let musicIndex = 0;
let isPlaying = false;

window.addEventListener("load", () => {
    // Load music based on URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const artist = urlParams.get('artist');
    const cover = urlParams.get('cover');
    const audio = urlParams.get('audio');

    if (name && artist && cover && audio) {
        musicIndex = allMusic.findIndex(song => song.name === name && song.artist === artist);
        loadMusic(musicIndex);
        playMusic();
    } else {
        loadMusic(musicIndex);
    }
});

function loadMusic(indexNumb) {
    musicName.innerHTML = allMusic[indexNumb].name;
    musicArtist.innerHTML = allMusic[indexNumb].artist;
    musicImg.src = allMusic[indexNumb].img;
    mainAudio.src = allMusic[indexNumb].src;
}

function playMusic() {
    isPlaying = true;
    playPauseBtn.querySelector("i").innerHTML = "pause";
    container.classList.add("paused");
    mainAudio.play();
}

function pauseMusic() {
    isPlaying = false;
    playPauseBtn.querySelector("i").innerHTML = "play_arrow";
    container.classList.remove("paused");
    mainAudio.pause();
}

playPauseBtn.addEventListener("click", () => {
    isPlaying ? pauseMusic() : playMusic();
});

nextBtn.addEventListener("click", nextMusic);
prevBtn.addEventListener("click", prevMusic);

function nextMusic() {
    musicIndex = (musicIndex + 1) % allMusic.length;
    loadMusic(musicIndex);
    playMusic();
}

function prevMusic() {
    musicIndex = (musicIndex - 1 + allMusic.length) % allMusic.length;
    loadMusic(musicIndex);
    playMusic();
}

// Volume and mute controls
volumeRange.addEventListener('input', () => {
    mainAudio.volume = volumeRange.value;
});

muteBtn.addEventListener('click', () => {
    mainAudio.muted = !mainAudio.muted;
    muteBtn.innerHTML = mainAudio.muted ? '<i class="material-icons">volume_off</i>' : '<i class="material-icons">volume_up</i>';
});

// Progress bar and time update
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    progressBar.style.width = `${(currentTime / duration) * 100}%`;
    container.querySelector(".currentTime").innerHTML = formatTime(currentTime);
    container.querySelector(".maxDuration").innerHTML = formatTime(duration);
});

progressArea.addEventListener("click", (e) => {
    const progressWidth = progressArea.clientWidth;
    const clickedOffsetX = e.offsetX;
    mainAudio.currentTime = (clickedOffsetX / progressWidth) * mainAudio.duration;
    playMusic();
});

function formatTime(time) {
    if (time && !isNaN(time)) {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }
    return "00:00";
}
=======
const container=document.querySelector(".container"),
    musicImg=container.querySelector(".imgArea img"),
    musicName=container.querySelector(".songDetails .name"),
    musicArtist=container.querySelector(".songDetails .artist"),
    playPauseBtn=container.querySelector(".playPause"),
    prevBtn=container.querySelector("#prev"),
    nextBtn = container.querySelector("#next"),
    mainAudio = container.querySelector("#mainAudio"),
    progressArea = container.querySelector(".progressArea"),
    progressBar = progressArea.querySelector(".progressBar"),
    volumeRange = document.getElementById('volume-range'),
    muteBtn = document.getElementById('mute')

let musicIndex =0;
let isPlaying=false;
window.addEventListener("load",()=>{
    loadMusic(musicIndex);
})
//load music
function loadMusic(indexNumb){
    musicName.innerHTML=allMusic[indexNumb].name;
    musicArtist.innerHTML=allMusic[indexNumb].artist;
    musicImg.src=allMusic[indexNumb].img,
    mainAudio.src=allMusic[indexNumb].src;
}
//play music
function playMusic(){
    isPlaying=true;
    playPauseBtn.querySelector("i").innerHTML="pause";
    container.classList.add("paused")
    mainAudio.play();
}

//volume control
volumeRange.addEventListener('input', () => {
    mainAudio.volume = volumeRange.value;
  });
  
  muteBtn.addEventListener('click', () => {
    mainAudio.muted = !mainAudio.muted;
    if (mainAudio.muted) {
      muteBtn.innerHTML = '<i class="material-icons">volume_off</i>';
    } else {
      muteBtn.innerHTML = '<i class="material-icons">volume_up</i>';
    }
  });
// pause music
function pauseMusic(){
    isPlaying=false;
    playPauseBtn.querySelector("i").innerHTML="play_arrow";
    container.classList.remove("paused")
    mainAudio.pause();
}
playPauseBtn.addEventListener("click",()=>{
    isPlaying ? pauseMusic():playMusic();
});

//next music
function nextMusic(){
    musicIndex++;
    if(musicIndex>allMusic.length -1){
        musicIndex=0;
    }
    else{
        musicIndex=musicIndex;
    }
    // musicIndex > allMusic.length -1?(musicIndex=0):(musicIndex=musicIndex);
    loadMusic(musicIndex);
    playMusic();
}
nextBtn.addEventListener("click",()=>{
    nextMusic();
})
//previous music
function prevMusic(){
    musicIndex--;
    if(musicIndex<0){
        musicIndex=allMusic.length -1;
    }
    else{
        musicIndex=musicIndex;
    }
    loadMusic(musicIndex);
    playMusic();
}
prevBtn.addEventListener("click", ()=>{
    prevMusic();
})
//repeat cases
const repeatBtn=container.querySelector("#repeatPlist");
repeatBtn.addEventListener("click",()=>{
    let getText= repeatBtn.innerHTML;
    switch(getText){
        case "repeat":
            repeatBtn.innerHTML="repeat_one";
            repeatBtn.setAttribute("title","Song Looped");
            break;
        case "repeat_one":
            repeatBtn.innerHTML="shuffle";
            repeatBtn.setAttribute("title","playback shuffled");
            break;
        case "shuffle":
            repeatBtn.innerHTML="repeat";
            repeatBtn.setAttribute("title","playlist looped");
            break;      
    }
})

mainAudio.addEventListener("ended",()=>{
    let getText=repeatBtn.innerHTML;
    switch(getText){
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime=0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            let randIndex = Math.floor(Math.random() * allMusic.length);
            do {
                  randIndex = Math.floor(Math.random() * allMusic.length);
            }while (musicIndex == randIndex);
            {
                musicIndex = randIndex;
                loadMusic(musicIndex);
                playMusic();
                break;
            }
    }
})

mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    let musicCurrentTime = container.querySelector(".currentTime"),
      musicDuration = container.querySelector(".maxDuration");
  
    mainAudio.addEventListener("loadeddata", () => {
      const interval = setInterval(() => {
        const _elapsed = mainAudio.currentTime;
        musicCurrentTime.innerHTML = formatTime(_elapsed);
      }, 1000);
      const _duration = mainAudio.duration;
      musicDuration.innerHTML = formatTime(_duration);
      mainAudio.addEventListener("ended", () => {
        clearInterval(interval);
      });
    });
  });
  progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;
  
    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
  });
  
  function formatTime(time) {
    if (time && !isNaN(time)) {
      const minutes =
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : Math.floor(time / 60);
      const seconds =
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : Math.floor(time % 60);
      return `${minutes}:${seconds}`;
    }
    return "00:00";
  }
>>>>>>> origin/main
