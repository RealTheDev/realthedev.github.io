function send(){
    var name = document.getElementById('name').value;
    if(/^\w+$/i.test(name) && name.length <= 16 && name.length >= 3){
        button = document.getElementById('button');
        button.disabled = true;
        console.log(name)
        fetch('https://RealGamesBot.realthedev.repl.co/concert', {
            method: "POST",
            body: JSON.stringify({"minecraft":name}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(x => {
                if(!(x.ok)){
                    throw "I've seen people say never throw a string, I did anyway, this should ALWAYS be caught."
                }
                return x.json()
            })
            .then(x => {
                
                document.getElementById('token').innerText = JSON.parse(x).token;
                document.getElementById('sign').style.display = 'none'
                document.getElementById('res').style.display = 'block'
                
            })
            .catch(x => {error.innerText = "An error occured while uploading."; error.style.display = "block"; button.disabled = false; console.error(x);});
    }
    else{
        error.innerText = "Make sure to enter a valid name!";
        error.style.display = "block";
    }
}
function load(){
    error = document.getElementById('error');
    error.style.display = "none";
}