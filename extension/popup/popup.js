window.onload = function() {
    chrome.storage.sync.get(['email'], function(result) {
        if (result.email) {
            document.getElementById("email").value = result.email;
        }
    });

    document.getElementById("email").addEventListener("change", onChangeEmail);
    document.getElementById("buttonGetPosts").addEventListener("click", buttonGetPosts);

    /**
     * Sauvegarde l'email dans le storage.
     */
    function onChangeEmail() {
        chrome.storage.sync.set({email: document.getElementById("email").value}, function() {
            console.log('Value is set to ' + value);
        });
    }

    /**
     * Envoie la requête au script content.js pour récupérer les posts.
     */
    function buttonGetPosts() {
        console.log("buttonGetPosts");
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {email: document.getElementById("email").value});
        });
    }

}
