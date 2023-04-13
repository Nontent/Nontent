api_name = "NonentAI"

api_version = "0.0.1"

description = """
NonentAI is used to predict the domain of a given tweet. It classifies tweets into 12 categories: `WAR`, `GAMING`, `TECH`, `SCIENCE`, `MUSIC`, `POLICY`, `CINEMA`, `SPORT`, `MEDICAL`, `LITERATURE`, `FOOD`, and `MARKETING`.

## API Details

This API is built using FastAPI, and the model used for classification is a trained machine learning model that was pickled and saved. The model uses a vectorizer to transform the tweets into feature vectors, and then predicts the domain based on those feature vectors.

## Endpoints

### 1. `/predict`

### 2. `/predicts`
"""

tags_metadata = [
    {
        "name": "predict",
        "description": "This endpoint accepts a single tweet as input and returns the **predicted domain** for that tweet.",
    },
    {
        "name": "predicts",
        "description": "This endpoint accepts a list of tweets as input and returns the predicted domain for each tweet, as well as the overall **predicted domain for the entire list**.",
    },
]
