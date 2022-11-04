let posts = [];
let nbPostsSend = 0;
let pageLoaded = false;
let tokenNontent = "tokenNontent";

chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.action === "getPostsTwitter") {
            tokenNontent = request.tokenNontent;
            buttonGetPostsTwitter();
        }
    }
);



window.addEventListener('load', () => {
    pageLoaded = true;
});

function buttonGetPostsTwitter() {
    if (pageLoaded) {
        let nextFonctions = [(nextFonctions) => getPostTwitter(nextFonctions), (nextFonctions) => sendPostTwitter(nextFonctions)];
        for (let nbScroll = 0; nbScroll < 10; nbScroll++) {
            nextFonctions.push((nextFonctions) => scrollBottomPage(nextFonctions));
            nextFonctions.push((nextFonctions) => getPostTwitter(nextFonctions));
            nextFonctions.push((nextFonctions) => sendPostTwitter(nextFonctions));
        }

        detectPageLoad(100, () => articlePresent(), nextFonctions);
    } else {
        setTimeout(() => buttonGetPostsTwitter(), 1000);
    }
}

/**
 * Exécute nextFonction() lorsque fonctionDetectionLoad() retourne true.
 * @param nbMillisecondeRetry Nombre de milliseconde entre chaque tentative.
 * @param fonctionDetectionLoad Fonction qui retourne true lorsque la page est chargée.
 * @param nextFonctions Fonctions à exécuter lorsque la page est chargée.
 */
function detectPageLoad(nbMillisecondeRetry, fonctionDetectionLoad, nextFonctions) {
    if (fonctionDetectionLoad()) {
        if (nextFonctions.length > 0) {
            let nextFonction = nextFonctions.shift();
            nextFonction(nextFonctions);
        }
    } else {
        setTimeout(() => detectPageLoad(Math.min(nbMillisecondeRetry + 20, 1000), fonctionDetectionLoad, nextFonctions), nbMillisecondeRetry);
    }
}

function next(nextFonctions) {
    let nextFonction = nextFonctions.shift();
    if (nextFonction) {
        nextFonction(nextFonctions);
    }
}

/**
 * Retourne true si un article est présent dans la page.
 * @returns {boolean} True si un article est présent dans la page. False sinon.
 */
function articlePresent() {
    return document.getElementsByTagName("article").length !== 0;
}

/**
 * Retourne le texte contenu dans une collection d'éléments HTML.
 * @param element HTMLCollection sur laquelle on va extraire le texte.
 * @returns {string} Texte contenu dans la collection d'éléments HTML.
 */
function extractTextFromHTMLCollection(element) {
    try {
        let text = "";
        for (let nbElement = 0; nbElement < element.length; nbElement++) {
            text += element[nbElement].innerText;
        }
        return text;
    } catch (error) {
        return "";
    }
}

/**
 * Récupère les posts de la page Twitter.
 * @param nextFonctions Fonctions à exécuter après avoir récupéré les posts.
 */
function getPostTwitter(nextFonctions) {
    let articleDOM = document.getElementsByTagName("article");
    for (let nbArticle = 0; nbArticle < articleDOM.length; nbArticle++) {
        try {
            let post = {};
            let accountName = articleDOM[nbArticle]?.children[0]?.children[0]?.children[0]?.children[1]?.children[1]?.children[0].getElementsByTagName("a")[0].getElementsByTagName("span")[0].innerText;
            let content = extractTextFromHTMLCollection(articleDOM[nbArticle]?.children[0]?.children[0]?.children[0]?.children[1]?.children[1]?.children[1]?.children[0]?.children[0]?.children);
            let nbPartInteraction = articleDOM[nbArticle]?.children[0]?.children[0]?.children[0]?.children[1]?.children[1]?.children[1].children.length;
            let nbComments = articleDOM[nbArticle]?.children[0]?.children[0]?.children[0]?.children[1]?.children[1]?.children[1].children[nbPartInteraction - 1].children[0].children[0].getElementsByTagName("span")[0].innerText;
            let nbRetweets = articleDOM[nbArticle]?.children[0]?.children[0]?.children[0]?.children[1]?.children[1]?.children[1].children[nbPartInteraction - 1].children[0].children[1].getElementsByTagName("span")[0].innerText;
            let nbLikes = articleDOM[nbArticle]?.children[0]?.children[0]?.children[0]?.children[1]?.children[1]?.children[1].children[nbPartInteraction - 1].children[0].children[2].getElementsByTagName("span")[0].innerText;
            post.accountName = accountName;
            post.content = content;
            //remove space in string
            post.nbComments = nbComments.replace(/\s/g, '').replace(/,/g, '').replace(/k/g, '000');
            post.nbRetweets = nbRetweets.replace(/\s/g, '').replace(/,/g, '').replace(/k/g, '000');
            post.nbLikes = nbLikes.replace(/\s/g, '').replace(/,/g, '').replace(/k/g, '000');
            posts.push(post);
        } catch (error) {
            // console.log(error);
        }
    }

    //delete doublon posts
    posts = posts.filter((post, index, self) => index === self.findIndex((t) => (t.accountName === post.accountName && t.content === post.content)));
    next(nextFonctions);
}

function sendPostTwitter(nextFonctions) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "tokenNontent": tokenNontent,
            "posts": posts.slice(nbPostsSend)
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        console.log(posts.slice(nbPostsSend))

        nbPostsSend = posts.length;

        fetch("http://localhost:3000/api/scrapping/twitter/posts", requestOptions)
            .then(response => response.text())
            // .then(result => {
            //     console.log(result)
            // })
            .catch(error => console.log('error', error))
            .finally(() => next(nextFonctions));
    } catch (error) {
        console.log(error);
        next(nextFonctions);
    }


}

/**
 * Descend en bas de la page.
 * @param nextFonctions Fonctions à exécuter après être descendu de la page.
 */
async function scrollBottomPage(nextFonctions) {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
    })
    setTimeout(() => next(nextFonctions), 2000);

}

console.log("content.js");
