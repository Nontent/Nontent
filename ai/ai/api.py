from config import description, tags_metadata, api_version, api_name
from pydantic import BaseModel, Field
from nltk.stem import SnowballStemmer
from nltk.corpus import stopwords
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import pickle
import re
import string
from gensim.utils import simple_preprocess
from transformers import AutoTokenizer, AutoModel
import torch
from collections import Counter
from transformers import AutoModelForSequenceClassification, AutoTokenizer

stop_words = stopwords.words("english")
stemmer = SnowballStemmer("english")
custom_stopwords = {'"', "'", "rt", "’", "“", "”", "…", "‘", "amp"}

# Load the tokenizer and model globally
model_name_bert = "distilbert-base-uncased"
tokenizer_bert = AutoTokenizer.from_pretrained(model_name_bert)
model_bert = AutoModel.from_pretrained(model_name_bert)

model_name_sentiment = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer_sentiment = AutoTokenizer.from_pretrained(model_name_sentiment)
model_sentiment = AutoModelForSequenceClassification.from_pretrained(model_name_sentiment)

with open(r"C:\Users\keyse\Documents\ESP\Nontent\ai\data\tweet_analyzer_model.pkl", "rb") as f:
    model = pickle.load(f)

with open(r"C:\Users\keyse\Documents\ESP\Nontent\ai\data\tweet_analyzer_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

with open(r"C:\Users\keyse\Documents\ESP\Nontent\ai\data\kmeans_model.pkl", "rb") as f:
    kmeans_model = pickle.load(f)

app = FastAPI(
    title=api_name,
    description=description,
    version=api_version,
    openapi_tags=tags_metadata,
)

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    tweet: str = Field(
        example="I'm not sure if I'm more excited for the game or the snacks I'm gonna eat while playing it...🤔🍿🎮 #gaming #snacktime"
    )


class InputDataList(BaseModel):
    tweets: list[InputData]

    class Config:
        schema_extra = {
            "example": {
                "tweets": [
                    {
                        "tweet": "I'm not sure if I'm more excited for the game or the snacks I'm gonna eat while playing it...🤔🍿🎮 #gaming #snacktime"
                    },
                    {
                        "tweet": "I finally got around to watching #Parasite and it was worth all the hype! 🙌 A masterpiece of a film! #BestPicture"
                    },
                    {
                        "tweet": "Can't believe how good #TheMandalorian is. Baby Yoda is the cutest thing ever!"
                    },
                    {
                        "tweet": "Megan Rapinoe leads the US Women's National Team to a gold medal in soccer at the Olympics"
                    },
                ]
            }
        }

class PredictionResult(BaseModel):
    tweet: str
    prediction: str
    proba: dict[str, float]


class PredictionResultList(BaseModel):
    global_prediction: str
    global_proba: dict[str, int]
    data: list[PredictionResult]

class TopCluster(BaseModel):
    cluster: int
    title: str
    description: str
    count: int

class TopClustersResponse(BaseModel):
    top_clusters: list[TopCluster]

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


@app.post("/predicts", tags=["predicts"])
def predicts(input_data_list: InputDataList) -> PredictionResultList:
    data = []
    for tweet in input_data_list.tweets:
        preprocessed_tweet = preprocess(tweet.tweet)
        tweet_vec = vectorizer.transform([preprocessed_tweet])
        proba_dict = get_proba(tweet_vec)
        label = model.predict(tweet_vec)[0]
        data.append(
            PredictionResult(
                tweet=preprocessed_tweet,
                prediction=label,
                proba=proba_dict,
            )
        )
    prediction_counts = {}
    for result in data:
        if result.prediction not in prediction_counts:
            prediction_counts[result.prediction] = 1
        else:
            prediction_counts[result.prediction] += 1
    global_prediction = max(prediction_counts, key=prediction_counts.get)
    print(global_prediction)
    return PredictionResultList(
        data=data, global_prediction=global_prediction, global_proba=prediction_counts
    )

@app.post("/kmeans", tags=["kmeans"])
def kmeans(input_data_list: InputDataList) -> TopClustersResponse:
    data = []
    for input_data in input_data_list.tweets:
        cleaned_text = get_full_clean_text(preprocess_kmeans(input_data.tweet))
        embedding = get_bert_embedding(cleaned_text)
        data.append(embedding)

    X_bert = torch.cat(data, dim=0)

    predictions = kmeans_model.predict(X_bert)
    cluster_counts = Counter(predictions)
    top_clusters = cluster_counts.most_common(3)

    top_clusters_response = TopClustersResponse(
        top_clusters=[
            TopCluster(
                cluster=cluster,
                title=clusters_info[cluster]["title"],
                description=clusters_info[cluster]["description"],
                count=frequency
            )
            for cluster, frequency in top_clusters
        ]
    )
    print(top_clusters_response)
    return top_clusters_response

@app.post("/sentiment", tags=["sentiment"])
def sentiment_analysis(input_data_list: InputDataList) -> dict[str, float]:
    sentiment_scores = []

    for input_data in input_data_list.tweets:
        inputs = tokenizer_sentiment(input_data.tweet, return_tensors="pt", padding=True, truncation=True)
        with torch.no_grad():
            outputs = model_sentiment(**inputs)
        scores = torch.softmax(outputs.logits, dim=1)
        sentiment_scores.append(scores[0][1].item())  # Index 1 corresponds to positive sentiment

    average_sentiment = sum(sentiment_scores) / len(sentiment_scores)
    print(average_sentiment)
    return {"average_sentiment": average_sentiment}

def get_proba(tweet_vec) -> dict[str, float]:
    proba_dict = {}
    proba = model.predict_proba(tweet_vec)[0]
    sorted_indices = proba.argsort()[::-1]
    classes = model.classes_
    for i in sorted_indices:
        proba_dict[classes[i]] = round(proba[i] * 100, 2)
    return proba_dict

get_full_clean_text = lambda tweet: " ".join(tweet)

def preprocess(text: str, stem: bool = False) -> str:
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

def preprocess_kmeans(string_: str):
    # Remove URLs
    text = re.sub(r'https\S+', '', string_)
    text = re.sub(r'http\S+', '', text)
    # Remove mentions
    text = re.sub(r'@\w+', '', text)
    # Remove hashtags
    text = re.sub(r'#\w+', '', text)
    # Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))
    # Convert to lowercase 
    text = text.lower()
    # Remove stop words
    stop_words = set(stopwords.words('english')) | custom_stopwords

    tokens = simple_preprocess(text)

    filtered_text = [word for word in tokens if word not in stop_words]

    # stem the words in the tweet
    filtered_text = [stemmer.stem(token) for token in filtered_text]

    return filtered_text

def get_bert_embedding(text):
    inputs = tokenizer_bert(text, return_tensors="pt", padding=True, truncation=True)
    with torch.no_grad():
        outputs = model_bert(**inputs)
    return outputs.last_hidden_state.mean(dim=1)

def start():
    uvicorn.run("ai.api:app", host="localhost", port=8000, reload=True)

clusters_info = {
    0: {
        "title": " Work and Society",
        "description": "Your tweets in this cluster focus on work, societal issues, and expressions of gratitude. The political compass orientation of your tweets may vary depending on the specific issues discussed, with a mix of left-right and authoritarian-libertarian views. By engaging with this cluster, you might be missing out on alternative perspectives on labor policies, economic systems, and various approaches to societal challenges from diverse political standpoints."
    },
    1: {
        "title": "Global Issues and Advocacy",
        "description": "Description: In this cluster, your tweets cover global topics, advocacy for women, health, and international collaboration. Your tweets likely lean towards a left-wing and globalist political orientation with a libertarian focus on social issues. By primarily engaging with this cluster, you could be missing out on opposing viewpoints that emphasize national sovereignty, conservative social values, or more authoritarian approaches to international relations."
    },
    2: {
        "title": "Personal Milestones",
        "description": "This cluster captures your tweets about personal milestones and relationships within the context of societal norms. The political compass orientation of your tweets may vary based on the societal norms discussed, including left-right and authoritarian-libertarian perspectives. By concentrating on this cluster, you might not be exposed to differing viewpoints on personal development, cultural expectations, and non-traditional life choices."
    },
    3: {
        "title": "Community Building",
        "description": " Your tweets in this cluster are about building connections, sharing experiences, and promoting social causes. Your tweets can lean towards left-wing or right-wing depending on the social causes promoted, and may have a mix of libertarian and authoritarian views. By focusing on this cluster, you could miss alternative ways of building communities, or opposing perspectives on social issues from diverse political backgrounds."
    },
    4: {
        "title": "Historical Perspectives",
        "description": "Your tweets in this cluster include discussions about history, family narratives, and the future of nations. The political compass orientation of your tweets may vary based on the historical events and narratives discussed, with possible left-right and authoritarian-libertarian perspectives. By engaging with this cluster, you might not encounter contrasting historical interpretations, diverse cultural narratives, or alternative visions for national futures."
    },
    5: {
        "title": "Public Opinion",
        "description": "This cluster involves various topics of interest, public sentiment, and social media engagement. The political compass orientation of your tweets can range from left-wing to right-wing, and from authoritarian to libertarian, depending on the opinions expressed. By mainly interacting with this cluster, you might be missing opposing viewpoints or alternative perspectives on public opinion and social media's influence on society."
    },
    6: {
        "title": "Political Debate",
        "description": "This cluster features your tweets on political discussions, differing opinions, and debates on various topics. The political compass orientation of your tweets will vary based on the positions and arguments presented, encompassing both left-right and authoritarian-libertarian views. By focusing on this cluster, you could miss opportunities to find common ground or consider alternative solutions to political issues beyond the scope of the debates presented."
    },
    7: {
        "title": "Social Justice and Policy",
        "description": "In this cluster, your tweets discuss social justice, policy issues, and civil rights, primarily in the United States. Your tweets likely lean towards a left-wing, progressive political orientation with a libertarian focus on individual rights and freedoms. By primarily engaging with this cluster, you might not be exposed to opposing arguments that emphasize traditional values, conservative policies, or more authoritarian approaches to social issues."
    },
    8: {
        "title": "National Identity",
        "description": "This cluster focuses on your tweets about national events, patriotism, and societal issues in the United States. The political compass orientation of your tweets may vary depending on the specific issues discussed, including left-right and authoritarian-libertarian perspectives. By concentrating on this cluster, you could miss alternative perspectives on national identity, patriotism, and the role of government in addressing societal challenges."
    },
    9: {
        "title": "Political Entertainment",
        "description": "This cluster relates to your tweets about political satire, commentary, and interviews in the entertainment industry. The political compass orientation of your tweets can range from left-wing to right-wing and from authoritarian to libertarian, depending on the perspectives presented. By focusing on this cluster, you might miss more in-depth analysis of political issues, or alternative viewpoints from less mainstream sources of entertainment or media."
    },
    10: {
        "title": "Activism and Support",
        "description": "This cluster captures your tweets about promoting activism, providing support, and sharing resources for various causes. Your tweets can lean towards left-wing or right-wing depending on the activism and causes supported, and may have a mix of libertarian and authoritarian views. By mainly interacting with this cluster, you could miss alternative methods of activism, or opposing perspectives on the causes and issues you support."
    },
    11: {
        "title": "Political Life Events",
        "description": "This cluster covers a range of your political life events, from daily activities to major milestones. The political compass orientation of your tweets may vary based on the specific events discussed, with possible left-right and authoritarian-libertarian perspectives. By engaging with this cluster, you might not encounter contrasting views on political life events, or alternative ways of interpreting the significance of these events in the broader political context."
    },
    12: {
        "title": "Political Social Media",
        "description": "This cluster concentrates on your tweets about political Twitter interactions, hashtags, and social media discussions. The political compass orientation of your tweets can range from left-wing to right-wing, and from authoritarian to libertarian, depending on the perspectives expressed. By focusing on this cluster, you could miss out on more in-depth analysis of political topics, or alternative viewpoints not widely represented on social media platforms."
    },
    13: {
        "title": "Public Health and Policy",
        "description": "This cluster discusses your tweets about public health, policies, and innovations related to vaccines and energy. The political compass orientation of your tweets may lean towards a left-wing and progressive orientation, with a mix of authoritarian (e.g., government-led health policies) and libertarian (e.g., individual choice in healthcare) perspectives. By mainly interacting with this cluster, you might not be exposed to opposing views on public health policies, market-driven solutions, or conservative perspectives on health and energy."
    },
    14: {
        "title": "Election Campaigns",
        "description": "This cluster centers on your tweets about election campaigns, candidates, and political parties. Your tweets can range from left-wing to right-wing, and from authoritarian to libertarian, depending on the candidates and issues discussed. By focusing on this cluster, you could miss out on alternative political perspectives or the exploration of issues beyond the electoral context."
    },
    15: {
        "title": "Personal Perspectives",
        "description": "In this cluster, your tweets include personal insights, opinions, and reflections on various topics. The political compass orientation of your tweets may vary based on your thoughts and experiences, encompassing both left-right and authoritarian-libertarian views. By engaging with this cluster, you might not encounter contrasting personal perspectives or alternative ways of interpreting and understanding the world."
    },
    16: {
        "title": "Political Conversation",
        "description": "This cluster captures your tweets about political conversations, debates, and discussions on various topics. The political compass orientation of your tweets can range from left-wing to right-wing, and from authoritarian to libertarian, depending on the opinions expressed. By mainly interacting with this cluster, you could miss opportunities to explore alternative viewpoints or find common ground on political issues."
    },
    17: {
        "title": "Casual Political Discourse",
        "description": "This cluster focuses on your tweets involving casual political discourse, everyday observations, and personal experiences. The political compass orientation of your tweets may lean towards a mix of left-right and authoritarian-libertarian views, depending on the issues discussed. By concentrating on this cluster, you might not be exposed to more formal political analysis, opposing perspectives, or diverse political contexts."
    }
}