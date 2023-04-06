# AI - Guillaume

## Dependencies
[Poetry](https://python-poetry.org/docs/#installation), [JupyterLab](https://jupyter.org/install#jupyterlab) and [poetry-kernel](https://pypi.org/project/poetry-kernel/)

## Usage
### notebook
The notebook is used to create the model.
```bash 
cd /path/to/ai
poetry install
jupyter-lab
```
> Running on [http://localhost:8888/lab](http://localhost:8888/lab)

### api
```bash
cd /path/to/ai
poetry run start
```
> The doc is available on [http://localhost:8000/docs](http://localhost:8000/docs)

## Data
All data are to be added in the file `data.py` once the data are added do not **forget to generate the new dataset** with the following command:
```shell
poetry run python dataset_maker.py
```
> Windows
```shell
poetry run python3 dataset_maker.py
```
> Linux
 
### Add data
All data is generated via [ChatGPT-3](https://chat.openai.com/chat)

#### Prompt
```
Imagine and generate a list of tweets (without numbering them) that talk about [INSTRUCTION] <like a [PERSON/MEDIA]>. Write your answer in a code bubble and write them in an array as follows:
"""
tweets = [
"tweet",
"tweet",
"tweet",
"tweet",
...
]
"""
Don't use hashtags but use mentions and emojis. 
```
#### for more
```
Can you continue with tweets that you haven't already done.
```
