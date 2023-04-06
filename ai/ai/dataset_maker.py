from rich.progress import Progress, SpinnerColumn, TextColumn
from ai.data import (
    war_tweet,
    gaming_tweet,
    tech_tweet,
    music_tweet,
    policy_tweet,
    cinema_tweet,
    sport_tweet,
    medical_tweet,
    literature_tweet,
    food_tweet,
    marketing_tweet,
    science_tweet,
)
import csv



def main() -> None:
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        transient=True,
    ) as progress:
        progress.add_task(description="Making dataset...", total=None)
        with open("../data/tweets.csv", "w", newline="", encoding="utf-8") as f:
            fieldnames = ["tweet", "label"]
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            for tweet in war_tweet:
                writer.writerow({"tweet": tweet, "label": "WAR"})
            for tweet in gaming_tweet:
                writer.writerow({"tweet": tweet, "label": "GAMING"})
            for tweet in tech_tweet:
                writer.writerow({"tweet": tweet, "label": "TECH"})
            for tweet in science_tweet:
                writer.writerow({"tweet": tweet, "label": "SCIENCE"})
            for tweet in music_tweet:
                writer.writerow({"tweet": tweet, "label": "MUSIC"})
            for tweet in policy_tweet:
                writer.writerow({"tweet": tweet, "label": "POLICY"})
            for tweet in cinema_tweet:
                writer.writerow({"tweet": tweet, "label": "CINEMA"})
            for tweet in sport_tweet:
                writer.writerow({"tweet": tweet, "label": "SPORT"})
            for tweet in medical_tweet:
                writer.writerow({"tweet": tweet, "label": "MEDICAL"})
            for tweet in literature_tweet:
                writer.writerow({"tweet": tweet, "label": "LITERATURE"})
            for tweet in food_tweet:
                writer.writerow({"tweet": tweet, "label": "FOOD"})
            for tweet in marketing_tweet:
                writer.writerow({"tweet": tweet, "label": "MARKETING"})
    print("Done!")
