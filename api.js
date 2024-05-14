async function diffWords(word1, word2) {
  const PROMPT = `I am going to give you two words or composed words separated by a comma (Ex: 'horse, llama'). \
I want you to return the semantic similarity in percent between the two words. \
The semantic similarity is a number between 0 and 100 inclusive, that will indicate how similar the two things are. \
Only write the number, no additional text or characters. \
If you don't know the answer, just write 'error'. \
The two words are: '${word1}, ${word2}'`;

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "model": "llama3",
        "prompt": PROMPT,
        "stream": false,
        "options": {
          "temperature": 0
        }
      })
    });

    if (response.ok) {
      const reader = response.body.getReader();
      let text = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += new TextDecoder().decode(value);
      }
      const proximity_percent = JSON.parse(text).response;
      return proximity_percent;
    } else {
      console.error('LLama response Error:', response.status);
    }
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}
