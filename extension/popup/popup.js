window.onload = function () {
    chrome.storage.sync.get(['tokenNontent'], function (result) {
        if (result.tokenNontent) {
            document.getElementById("tokenNontent").value = result.tokenNontent;
        }
    });

    document.getElementById("tokenNontent").addEventListener("change", onChangeEmail);
    document.getElementById("buttonGetPosts").addEventListener("click", buttonGetPosts);

    /**
     * Sauvegarde l'tokenNontent dans le storage.
     */
    function onChangeEmail() {
        chrome.storage.sync.set({tokenNontent: document.getElementById("tokenNontent").value});
    }

    /**
     * Envoie la requête au script content.js pour récupérer les posts.
     */
    function buttonGetPosts() {
        console.log("buttonGetPosts");
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "getPostsTwitter",
                tokenNontent: document.getElementById("tokenNontent").value
            });
        });
    }

}
