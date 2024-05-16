from flask import Flask, request
import spacy

nlp_fr = spacy.load('fr_core_news_md')
nlp_en = spacy.load('en_core_web_md')
app = Flask(__name__)


@app.route('/compare', methods=['POST'])
def compare_words():
    lang = request.get_json()['lang']
    word1 = request.get_json()['word1']
    word2 = request.get_json()['word2']

    nlp = nlp_fr if lang == 'fr' else nlp_en

    token1 = nlp(word1)
    token2 = nlp(word2)
    similarity = token1.similarity(token2)
    print("Similarity:", similarity)
    return str(similarity), 200
