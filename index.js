const langSelect = document.getElementById('lang-select');

document.getElementById('btn').addEventListener('click', function() {
  window.location = '/game.html?lang=' + langSelect.value;
});
