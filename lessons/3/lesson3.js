document.getElementById('blur').value = 50;
document.getElementById('translation').value = 50;
document.getElementById('color').value = '#FFFF00';

document.querySelectorAll('input')
  .forEach(input => {
    input.addEventListener('change', (e) => {
      document.documentElement.style.setProperty(`--${e.target.name}`, [e.target.value, e.target.dataset.unit].join(''));
    });
  });

