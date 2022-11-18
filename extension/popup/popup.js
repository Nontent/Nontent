window.onload = async function () {

    let statusGetPostsTwitter = false;

    await chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "getStatusPostsTwitter"
        }, function (response) {
            statusGetPostsTwitter = response.statusGetPostsTwitter;
            if (statusGetPostsTwitter) {
                document.getElementById("buttonGetPosts").innerText = "Cliquer pour arrêter d'extraire les posts";
            }
        });
    });

    chrome.storage.sync.get(['tokenNontent'], function (result) {
        if (result.tokenNontent) {
            document.getElementById("tokenNontent").value = result.tokenNontent;
        }
    });

    document.getElementById("tokenNontent").addEventListener("change", onChangeEmail);
    document.getElementById("buttonGetPosts").addEventListener("click", buttonGetPosts);

    /**
     * Sauvegarde le tokenNontent dans le storage.
     */
    function onChangeEmail() {
        chrome.storage.sync.set({tokenNontent: document.getElementById("tokenNontent").value});
    }

    /**
     * Envoie la requête au script content.js pour récupérer les posts.
     */
    function buttonGetPosts() {
        console.log("buttonGetPosts");
        statusGetPostsTwitter = !statusGetPostsTwitter;
        if (statusGetPostsTwitter) {
            document.getElementById("buttonGetPosts").innerText = "Cliquer pour arrêter d'extraire les posts";
        } else {
            document.getElementById("buttonGetPosts").innerText = "Cliquer pour extraire les posts";
        }
        console.log(statusGetPostsTwitter);
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "getPostsTwitter",
                statusGetPostsTwitter: statusGetPostsTwitter,
                tokenNontent: document.getElementById("tokenNontent").value
            });
        });
    }

}
