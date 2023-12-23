var h4 = document.querySelector('h4');
var startBtn = document.querySelector('#start');
var saveBtn = document.querySelector('#save-score');
var startWrap = document.querySelector('.start-wrap');
var scoreWrap = document.querySelector('.score-wrap');
var questionWrap = document.querySelector('.question-wrap');
var choicesDiv = document.querySelector('.choices');
var questionIndex = 0;
var time = 60;
var timer;
var clicked = false;


// End timer
function endGame() {

    clearInterval(timer);

    questionWrap.classList.add('hide');

    var scoreOutput = document.querySelector('#score-output');

    scoreOutput.innerText = 'Score: ' + time;

    scoreWrap.classList.remove('hide');

    // Assign a message for user when the time is  up
    // var messageParagraph = document.querySelector('#message');

    // messageParagraph.innerText = "Time's Up";

    // messageParagraph.classList.remove('hide');
}

function checkAnswer(eventObj) {
    eventObj.stopPropagation();

    if (clicked) {

        return;
    }

    var currentQuestionObj = questions[questionIndex];

    var el = eventObj.target;

    if (el.tagName === 'BUTTON') {

        var userAnswer = el.innerText;

        var answerAlert = document.querySelector('.answer-alert');

        if (userAnswer === currentQuestionObj.correctAnswer) {

            answerAlert.innerText = 'Correct!';

            answerAlert.classList.add('show');

        } else {

            answerAlert.innerText = 'Wrong!';

            answerAlert.classList.add('show');

            time = (time - 15) < 0 ? 0 : time -15;
        }

        clicked = true;

        setTimeout(function() {

            answerAlert.classList.remove('show');

            questionIndex++;

            if (questionIndex === questions.length) {
                endGame();
            } else {
                showQuestion();

                clicked = false;
            }
        }, 1500);
    }
}


// Start timer

// Create a function to show the questions on the browser
function showQuestion() {
    
    var currentQuestionObj = questions[questionIndex];
    
    var textEl = document.querySelector('.question-text');
    
    textEl.innerText = currentQuestionObj.questionText;
    
    choicesDiv.innerHTML = '';

    for (var i = 0; i < currentQuestionObj.choices.length; i++) {

        var choiceBtn = document.createElement('button');

        choiceBtn.innerText = currentQuestionObj.choices[i];

        choicesDiv.append(choiceBtn);

    }
}


function startTime() {
    h4.innerText = 'Time Left: ' + time;

    timer = setInterval(function () {
        time = (time - 1) < 0 ? 0 : time - 1;

        h4.innerText = 'Time Left: ' + time;

        if (time <= 0) {
            endGame();
        }
    }, 1000);

    // var questionWrap

}

function saveScore() {

    var initialInput = document.querySelector('#initial-input');

    var initialValue = initialInput.value;

   var rawData = localStorage.getItem('highscores');
   var highscores = JSON.parse(rawData) || [];

   highscores.push({
    initials: initialValue,
    score: time
   })
   
   localStorage.setItem('highscores', JSON.stringify(highscores));

   window.location = './highscores.html';
}


function startGame() {

    time = 60;

    questionIndex = 0;

    startWrap.classList.add('hide');

    questionWrap.classList.remove('hide');

    showQuestion();

    startTime();
}

choicesDiv.addEventListener('click', checkAnswer);

startBtn.addEventListener('click', startGame);

saveBtn.addEventListener('click', saveScore);