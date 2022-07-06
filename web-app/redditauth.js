function redditAuthorizeAccess()
    {
        $(function()
        {
            var randomString = generateRandomKey(15);
            var appId = "f1s10eRShTzWrf2GIfwf2MuasV_3fA"
            window.open(
                "https://www.reddit.com/api/v1/authorize?client_id=ZlOenLrZfnTfAn2CMkdXyw&response_type=code&state=test&redirect_uri=http://localhost:5500/Nontent/web-app/landing.html&duration=permanent&scope=identity,submit,save",
                "_self"
            )
        });
    }

function generateRandomKey(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
    }
    return result;
}

function getUserAccessToken()
    {
        var url_string =  window.location.href
        var url = new URL(url_string);
        var c = url.searchParams.get("code");
        ///// Send query.code to backend, to get access token from user.
        ////
        var div = document.getElementById('redditCode');
        div.innerHTML += c;
    }