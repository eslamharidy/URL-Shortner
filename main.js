
//here is our cloud database.
let endpoint = "https://www.jsonstore.io/7fb046590a14d811ffbca407340025fde7633e4fb4c72ccfb188fae99ae3f588";

//first, lets verify our input
function geturl(){
    let url = document.getElementById("urlinput").value;
    let protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
        }else{
            return url;
        }
}

//here we generate random string to link between long url and the short link we will make. 
function getrandom() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

//here we check the hash location 
function genhash(){
    if (window.location.hash == ""){
        window.location.hash = getrandom();
    }
}


// now we send the post request to our database 
function send_request(url) {
    this.url = url;
    $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
})
}

function shorturl(){
    let longurl = geturl();
    genhash();
    send_request(longurl);
    let output = `Here is your new link : ${window.location.href}`; 
    alert(output);
}

let hashh = window.location.hash.substr(1)




if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function (data) {
        data = data["result"];
        
        if (data != null) {
            window.location.href = data;
        }

    });

}

