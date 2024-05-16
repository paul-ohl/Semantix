from flask import Flask, request
from flask_cors import CORS, cross_origin
import spacy
import random

nlp_fr = spacy.load('fr_core_news_md')
nlp_en = spacy.load('en_core_web_md')
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/api/compare', methods=['POST'])
@cross_origin()
def compare_words():
    json_data = request.get_json()
    lang = json_data['lang']
    word1 = json_data['word1']
    word2 = json_data['word2']

    nlp = nlp_fr if lang == 'fr' else nlp_en

    token1 = nlp(word1)
    token2 = nlp(word2)
    similarity = token1.similarity(token2)
    print("Similarity:", similarity)
    return str(similarity), 200


@app.route('/api/random_word', methods=['POST'])
@cross_origin()
def get_random_word():
    lang = request.get_json()['lang']
    file_path = 'dictionaries/dictionary.' + lang + '.txt'
    with open(file_path, 'r') as f:
        lines = f.readlines()
    return random.choice(lines)
