document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('transitionend', e => {
    e.target.classList.remove('pressed');
  })
});

window.addEventListener('keydown', e => {
  const keyCode = e.which;
  document.querySelector(`div[data-key="${keyCode}"]`).classList.add('pressed');
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`)
  audio.currentTime = 0;
  audio.play()
});
