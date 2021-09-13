var questions = [
    {
        question: 'Who Won the Ballon Dor in 2007?',
        choices: ['Ronaldinho', 'Kaka', 'Cannavaro', 'Maldini'],
        correctAnswer: 1
    },
    {
        question: 'Which Team Won the Champions league in 2001?',
        choices: ['Real Madrid', 'Barcelona', 'AC Milan', 'Bayern Munich'],
        correctAnswer: 3
    },
    {
        question: 'Who Scored 5 Goals in 9 Minutes?',
        choices: ['Messi', 'Ronaldo', 'Lewandowski', 'Ibrahimovic'],
        correctAnswer: 2
    },
    {
        question: 'Which Team Won the Worldcup in 1998?',
        choices: ['Germany', 'France', 'Brazil', 'Italy'],
        correctAnswer: 1
    },
    {
        question: 'Which is the only team to win Euro Back to Back?',
        choices: ['Spain', 'France', 'Germany', 'Portugal'],
        correctAnswer: 0
    }
];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

window.addEventListener('DOMContentLoaded', function(e)
{
    displayCurrentQuestion();

    var quizMessage = document.querySelector('.quizMessage');

        quizMessage.style.display = 'none';

    document.querySelector('.nextButton').addEventListener('click', function()
    {
        
        if(!quizOver)
        {
            var radioBtnsChecked = document.querySelector('input[type=radio]:checked');

            if (radioBtnsChecked === null)
            {
                quizMessage.innerText = 'Please select an answer';
                quizMessage.style.display = 'block';
            } 
            else 
            {
                console.log(radioBtnsChecked.value);
                quizMessage.style.display = 'none';
                if (parseInt(radioBtnsChecked.value) === questions[currentQuestion].correctAnswer)
                {
                    correctAnswers++;
                }

                currentQuestion++;

                if (currentQuestion < questions.length)
                {
                    displayCurrentQuestion();
                } 
                else 
                {
                    displayScore();
                    document.querySelector('.nextButton').innerText = 'Play Again?';
                    quizOver = true;
                }
            } 
        } 
        else 
        {
            quizOver = false;
            document.querySelector('.nextButton').innerText = 'Next Question';
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });
});

function displayCurrentQuestion(){
    console.log('In display current Questions');

    var question = questions[currentQuestion].question;
    var questionClass = document.querySelector('.quizContainer > .question');
    var choiceList = document.querySelector('.quizContainer > .choiceList');
    var numChoices = questions[currentQuestion].choices.length;

    //Set the questionClass text to the current question
    questionClass.innerText = question;

    //Remove all current <li> elements (if any)
    choiceList.innerHTML = '';

    var choice;
    for (i = 0; i < numChoices; i++){
        choice = questions[currentQuestion].choices[i];
        var li = document.createElement('li');
            li.innerHTML = '<li><input type="radio" value="' + i + '" name="dynradio" />' + choice + '</li>'
        choiceList.appendChild(li);

    }
}

function resetQuiz(){
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore(){
    document.querySelector('.quizContainer > .result').innerText = 'You scored: ' + correctAnswers + ' out of ' + questions.length;
    document.querySelector('.quizContainer > .result').style.display = 'block';
}

function hideScore(){
    document.querySelector('.result').style.display = 'none';
}