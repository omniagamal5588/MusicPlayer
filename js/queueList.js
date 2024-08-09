import { allMusic } from "./musicList.js";

const musicList = document.getElementById('music-list');

function addMusicToList() {
    for (let i = 0; i < allMusic.length; i++) {
        const song = allMusic[i];
        const musicItem = document.createElement("div");
        const playButton = document.createElement('button');
        playButton.textContent = 'Play';
        playButton.onclick = function () {
            playSong(song.name, song.artist, song.img, song.audio);
        }
        musicItem.classList.add("music-item");
        musicItem.innerHTML = `
            <img src="${song.img}" alt="${song.name}">
            <div>
                <h4>${song.name}</h4>
                <p>${song.artist}</p>
            </div>
        `;
        musicItem.append(playButton);
        musicList.appendChild(musicItem);
    }
}

function playSong(name, artist, img, audio) {
    const params = new URLSearchParams({
        name: name,
        artist: artist,
        cover: img,
        audio: audio
    });
    // Use history.pushState to change URL and navigate back to the home page with parameters
    window.history.pushState({}, '', `index.html?${params.toString()}`);
    // Trigger load event on the home page
    window.location.reload();
}

window.addEventListener("load", addMusicToList);
