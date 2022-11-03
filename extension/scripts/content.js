window.addEventListener('load', () => {
    detectPageLoad(100, () => artcilePresent(), [(nextFonctions) => getPostTwitter(nextFonctions), (posts) => sendPostTwitter(posts), (posts, nextFonctions) => sendPostTwitter(posts, nextFonctions)]);
});

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

/**
 * Retourne true si un article est présent dans la page.
 * @returns {boolean} True si un article est présent dans la page. False sinon.
 */
function artcilePresent() {
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
 *
 */
function getPostTwitter(nextFonctions) {
    let articleDOM = document.getElementsByTagName("article");
    let posts = [];
    for (let nbArticle = 0; nbArticle < articleDOM.length; nbArticle++) {
        try {
            let post = {};
            let nameAccount = articleDOM[nbArticle]?.children[0]?.children[0]?.children[0]?.children[1]?.children[1]?.children[0].getElementsByTagName("a")[0].getElementsByTagName("span")[0].innerText;
            let contenuTweet = extractTextFromHTMLCollection(articleDOM[nbArticle]?.children[0]?.children[0]?.children[0]?.children[1]?.children[1]?.children[1]?.children[0]?.children[0]?.children);
            let nbPartInteraction = articleDOM[nbArticle]?.children[0]?.children[0]?.children[0]?.children[1]?.children[1]?.children[1].children.length;
            let nbComment = articleDOM[nbArticle]?.children[0]?.children[0]?.children[0]?.children[1]?.children[1]?.children[1].children[nbPartInteraction - 1].children[0].children[0].getElementsByTagName("span")[0].innerText;
            let nbRetweet = articleDOM[nbArticle]?.children[0]?.children[0]?.children[0]?.children[1]?.children[1]?.children[1].children[nbPartInteraction - 1].children[0].children[1].getElementsByTagName("span")[0].innerText;
            let nbLike = articleDOM[nbArticle]?.children[0]?.children[0]?.children[0]?.children[1]?.children[1]?.children[1].children[nbPartInteraction - 1].children[0].children[2].getElementsByTagName("span")[0].innerText;
            post.nameAccount = nameAccount;
            post.contenuTweet = contenuTweet;
            post.nbComment = nbComment;
            post.nbRetweet = nbRetweet;
            post.nbLike = nbLike;
            posts.push(post);
        } catch (error) {
            console.log(error);
        }

    }
    let nextFonction = nextFonctions.shift();
    nextFonction(posts, nextFonctions);
}

function sendPostTwitter(posts, nextFonctions) {
    console.log(posts);
    console.log(nextFonctions);
    //TODO: Envoyer les posts à l'API backend de Nontent.
}

console.log("content.js");
