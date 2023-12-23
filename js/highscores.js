var highscoreOutput = document.querySelector('.highscores-output');

function outputHighscores() {
    var rawData = localStorage.getItem('highscores');
    var highscores = JSON.parse(rawData) || [];
    for (var i = 0; i < highscores.length; i++) {
        var div = document.createElement('div');

        var h3 = document.createElement('h3');

        var p = document.createElement('p');

        var scoreObj = highscores[i];

        h3.innerText = 'Initials: ' + scoreObj.initials;
        p.innerText = 'Score: ' + scoreObj.score;

        div.append(h3, p);

        highscoreOutput.append(div);
    }
}

outputHighscores();