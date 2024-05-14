const answers = document.getElementById('words');
const wordInput = document.getElementById('word-input');

const createWord = (word) => {
  // Create the word element div
  const wordElement = document.createElement('div');
  wordElement.classList.add('rounded-xl', 'w-full', 'my-2', 'px-3', 'py-1', 'bg-gray-400');

  // Create the word text element
  const wordText = document.createElement('p');
  wordText.classList.add('font-bold', 'text-xl');
  wordText.textContent = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  wordElement.appendChild(wordText);

  // Create the proximity percentage
  const proximityElement = document.createElement('p');
  proximityElement.classList.add('font-semibold', 'text-md', 'text-gray-800');
  proximityElement.textContent = `...%`;
  wordElement.appendChild(proximityElement);

  return wordElement;
}

const addWord = (word) => {
  const newWord = createWord(word);
  const proximityText = newWord.children[1];

  // Hide the initial message
  const initialMessage = document.getElementById('initial-message');
  initialMessage.classList.add('hidden');

  answers.prepend(newWord);

  diffWords("Hexagone", word).then((proximity) => {
    proximityText.textContent = `${proximity}%`;
  });

  // Clear the input
  wordInput.value = '';
}

document.getElementById('game-form').addEventListener('submit', (e) => {
  e.preventDefault();
  addWord(wordInput.value);
});

// Prevent the button from closing the keyboard on mobile
document.getElementById('send-word').addEventListener('touchend', (e) => {
  e.preventDefault();
  addWord(wordInput.value);
});
