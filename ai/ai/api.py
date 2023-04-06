from ai.config import description, tags_metadata, api_version, api_name
from pydantic import BaseModel, Field
from nltk.stem import SnowballStemmer
from nltk.corpus import stopwords
from fastapi import FastAPI
import uvicorn
import pickle
import re

stop_words = stopwords.words("english")
stemmer = SnowballStemmer("english")

with open("data/tweet_analyzer_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("data/tweet_analyzer_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

app = FastAPI(
    title=api_name,
    description=description,
    version=api_version,
    openapi_tags=tags_metadata
)


class InputData(BaseModel):
    tweet: str = Field(
        example="I'm not sure if I'm more excited for the game or the snacks I'm gonna eat while playing it...🤔🍿🎮 #gaming #snacktime"
    )


class PredictionResult(BaseModel):
    tweet: str
    prediction: str
    proba: dict[str, float]


@app.post("/predict", tags=["predict"])
def predict(input_data: InputData) -> PredictionResult:
    preprocessed_tweet = preprocess(input_data.tweet)
    tweet_vec = vectorizer.transform([preprocessed_tweet])
    proba_dict = get_proba(tweet_vec)
    label = model.predict(tweet_vec)[0]
    return PredictionResult(
        tweet=preprocessed_tweet,
        prediction=label,
        proba=proba_dict,
    )


def get_proba(tweet_vec) -> dict[str, float]:
    proba_dict = {}
    proba = model.predict_proba(tweet_vec)[0]
    sorted_indices = proba.argsort()[::-1]
    classes = model.classes_
    for i in sorted_indices:
        proba_dict[classes[i]] = round(proba[i] * 100, 2)
    return proba_dict


def preprocess(text, stem=False):
    text = re.sub(
        r"@\S+|https?:\S+|http?:\S|[^A-Za-z0-9]+", " ", str(text).lower()
    ).strip()
    tokens = []
    for token in text.split():
        if token not in stop_words:
            if stem:
                tokens.append(stemmer.stem(token))
            else:
                tokens.append(token)
    return " ".join(tokens)


def start():
    uvicorn.run("ai.api:app", host="0.0.0.0", port=8000, reload=True)
