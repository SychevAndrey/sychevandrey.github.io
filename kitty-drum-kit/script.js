const keys = {};
const sounds = {};

document.querySelectorAll('.key').forEach((keyElement) => {
  keys[keyElement.dataset.key] = keyElement;
  keyElement.addEventListener('transitionend', (e) => {
    if (e.propertyName !== 'transform') return;
    keyElement.classList.remove('key--playing');
  })
  keyElement.addEventListener('click', () => {
    keys[keyElement.dataset.key].classList.add('key--playing');
    sounds[keyElement.dataset.key].currentTime = 0;
    sounds[keyElement.dataset.key].play();
  })
});

document.querySelectorAll('audio').forEach((audioElement) => {
	sounds[audioElement.dataset.key] = audioElement;
});

window.addEventListener('keydown', (e) => {
  if (keys.hasOwnProperty(e.code)) {
    keys[e.code].classList.add('key--playing');
  }
  if (sounds.hasOwnProperty(e.code)) {
    sounds[e.code].currentTime = 0;
    sounds[e.code].play();
  }
});

window.addEventListener('keyup', (e) => {
  if (keys.hasOwnProperty(e.code)) {
    setTimeout(() => {keys[e.code].classList.remove('key--playing')}, 200);
  }
});
