const answers = document.getElementById('words');
const wordInput = document.getElementById('word-input');
let HIDDEN_WORD = '';

// Get the initial word
document.addEventListener('DOMContentLoaded', async () => {
  HIDDEN_WORD = await getInitialWord('fr');
  console.log('Hidden word:', HIDDEN_WORD);
  wordInput.placeholder = `Type a word here`;
});

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

  compareWords('fr', HIDDEN_WORD, word).then((proximity) => {
    let proximityPercent = parseInt(proximity * 100);
    proximityText.textContent = `${proximityPercent}%`;
    if (proximity >= 95) {
      alert('You win!');
      // const successMessage = document.getElementById('success-message');
      // successMessage.classList.remove('hidden');
    }
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

async function compareWords(lang, word1, word2) {
  try {
    const response = await fetch('http://localhost:5000/api/compare', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "lang": lang,
        "word1": word1,
        "word2": word2,
      })
    });

    if (response.ok) {
      return await response.text();
    } else {
      console.error('Api response error', response.status);
    }
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

async function getInitialWord(lang) {
  try {
    const response = await fetch('http://localhost:5000/api/random_word', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "lang": lang,
      })
    });

    if (response.ok) {
      return await response.text();
    } else {
      console.error('Api response error', response.status);
    }
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}
