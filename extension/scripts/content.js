window.addEventListener('load', (event) => {
    detectPageLoad(100, () => artcilePresent(), () => getPostTwitter());
});

function detectPageLoad(nbMillisecondeRetry, fonctionDetectionLoad, nextFonction) {
    if (fonctionDetectionLoad()) {
        nextFonction();
    } else {
        setTimeout(() => detectPageLoad(Math.min(nbMillisecondeRetry + 20, 1000), fonctionDetectionLoad, nextFonction), nbMillisecondeRetry);
    }
}

function artcilePresent() {
    return document.getElementsByTagName("article").length !== 0;
}

function getPostTwitter() {
    let articleDOM = document.getElementsByTagName("article");
    for (nbArticle = 0; nbArticle < articleDOM.length; nbArticle++) {
        // console.log(articleDOM[nbArticle]);
        console.log(articleDOM[nbArticle]?.children[0]?.children[0]?.children[0]?.children[1]?.children[1]?.children[0].getElementsByTagName("a")[0].getElementsByTagName("span")[0].innerText);
        // let spanDOM = articleDOM[nbArticle].getElementsByTagName("span");
        // console.log(spanDOM[0].innerText);
    }
}

console.log("content.js");
