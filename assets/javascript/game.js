// movie title object
var titleObject = {
    "the shining": {
    "gif": "<img src='./assets/images/Shining.gif'/>",
    },  
    "psycho": {
    "gif": "<img src='./assets/images/Psycho.gif'/>",    
    },
    "halloween": {
    "gif": "<img src='./assets/images/Halloween.gif'/>",    
    },
    "scream": {
    "gif": "<img src='./assets/images/Scream.gif'/>",    
    },
    "the conjuring": {
    "gif": "<img src='./assets/images/Conjuring.gif'/>",    
    },
    "jaws": {
    "gif": "<img src='./assets/images/Jaws.gif'/>",    
    },
    "rosemarys baby": {
    "gif": "<img src='./assets/images/Rosemary.gif'/>",    
    },
    "nightmare on elm street": {
    "gif": "<img src='./assets/images/Nightmare.gif'/>",    
    },
    "it": {
    "gif": "<img src='./assets/images/IT.gif'/>",    
    },
    "silence of the lambs": {
    "gif": "<img src='./assets/images/SilenceLambs.gif'/>",    
    },
    "carrie": {
    "gif": "<img src='./assets/images/Carrie.gif'/>",    
    },
    "saw": {
    "gif": "<img src='./assets/images/Saw.gif'/>",    
    },
    "the amityville horror": {
    "gif": "<img src='./assets/images/Amityville.gif'/>",    
    },
    "poltergeist": {
    "gif": "<img src='./assets/images/Poltergeist.gif'/>",    
    },
    "the exorcist": {
    "gif": "<img src='./assets/images/Exorcist.gif'/>",    
    },
}

var movieTitles = Object.keys(titleObject)

// variables
    var playerName = "";
    var randoSelectedTitle = "";
    var titleLetters = [];
    var blanks = 0;
    var guessedLetters = "";
    var blanksAndSuccesses = [];
    var wrongLetters = [];
    var scoreWins = 0;
    var scoreLosses = 0;
    var lettersToGuess = 7;



// start function not triggered until player submits player name
    start();

    document.getElementById("submitBtn").addEventListener ("click", function (event) {
        event.preventDefault();    
        
        playerName = document.getElementById("playername").value;
        document.getElementById("startDisplay").textContent = "welcome " + playerName + ", let's play a game. type a letter if you dare.";     
        document.getElementById("playerForm").style.display = "none";   

        if (playerName) {  
        document.onkeyup = function (event) {  
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            guessedLetters = event.key;     

                // convert caps to lowercase
                // document.onkeyup=function (event){
                //     var caps = event.key.toLowerCase();
                //     guessedLetters.push(caps);
                //     console.log(guessedLetters); 
                // }   

            if (wrongLetters.indexOf(guessedLetters) !== -1) {
                    alert("that letter was already used");
                return;
            }
            if (blanksAndSuccesses.indexOf(guessedLetters) !== -1) {
                    alert("that letter was already used");
                return;
            } 

            match(guessedLetters);
            end();  
        }  
        };
    } 
    });

 
function start() {
    lettersToGuess = 7;
    blanksAndSuccesses = [];
    wrongLetters = [];
    
    randoSelectedTitle = movieTitles[Math.floor(Math.random() * movieTitles.length)];
    titleLetters = randoSelectedTitle.split("");

    blanks = titleLetters.length;
    console.log(randoSelectedTitle);

    for (var i = 0; i < blanks; i++) {
        if (titleLetters[i] === " ") {
        blanksAndSuccesses.push(" ");
        } 
        else {
        blanksAndSuccesses.push("_");      
        }
    }

    document.getElementById("guessesRemaining").innerHTML = lettersToGuess;
    document.getElementById("movie").innerHTML = blanksAndSuccesses.join("");
    document.getElementById("spentLetters").innerHTML = wrongLetters.join("");    
}


function match(letter) {

    var goodLetters = false;
    for (var i = 0; i < blanks; i++) {
        if (randoSelectedTitle[i] === letter) {
            goodLetters = true;
        }
    }
    if (goodLetters) {
        for (var i = 0; i < blanks; i++) {
            if (randoSelectedTitle[i] === letter) {
                blanksAndSuccesses[i] = letter;
            }
        }
    }
    else {
        wrongLetters.push(letter);
        lettersToGuess--; 
    }
}

function end() {
    document.getElementById("guessesRemaining").innerHTML = lettersToGuess;
    document.getElementById("movie").innerHTML = blanksAndSuccesses.join("");
    document.getElementById("spentLetters").innerHTML = wrongLetters.join("");

    // scenario: player wins
    if (titleLetters.toString() === blanksAndSuccesses.toString()) {
        scoreWins++;
            alert("winner, winner; fava beans for dinner!");
                document.getElementById("wins").innerHTML = scoreWins;

        var movieEntries = Object.entries(titleObject)
        for (var i = 0; i < movieEntries.length; i++) {
            var titles = movieEntries[i][0]
            var gifs = movieEntries[i][1]["gif"]
                document.getElementById("wrongLetters").style.visibility = "hidden";    
                document.getElementById("spentLetters").style.visibility = "hidden"; 

            if (titleLetters.join('') === titles) {
                document.getElementById("gifs").style.display = "block";
                document.getElementById("gifs").innerHTML = gifs;            
            }        
        }

        setTimeout(function() {
            document.getElementById("gifs").style.display = "none"; 
            document.getElementById("wrongLetters").style.visibility = "initial";    
            document.getElementById("spentLetters").style.visibility = "initial"; 
            
            start();
        }, 5000) 
    }

    // scenario: player loses
    else if (lettersToGuess === 0) {
        scoreLosses++;
            alert("you lose. try again!");
                document.getElementById("losses").innerHTML = scoreLosses;
                document.getElementById("movie").innerHTML = titleLetters.join("");

        var movieEntries = Object.entries(titleObject)
        for (var i = 0; i < movieEntries.length; i++) {
            var titles = movieEntries[i][0]
            var gifs = movieEntries[i][1]["gif"]
                document.getElementById("wrongLetters").style.visibility = "hidden";    
                document.getElementById("spentLetters").style.visibility = "hidden"; 

            if (titleLetters.join('') === titles) {
                document.getElementById("gifs").style.display = "block";
                document.getElementById("gifs").innerHTML = gifs;            
            }        
        }

        setTimeout(function() {
            document.getElementById("gifs").style.display = "none"; 
            document.getElementById("wrongLetters").style.visibility = "initial";    
            document.getElementById("spentLetters").style.visibility = "initial";

            start();
        }, 5000)
    }
}