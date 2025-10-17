/*-------------------user stories-------------------//
1.as a user, i want to answer multiple choice sports trivia
2. as a user, i want visual feedback (green for correct, red for incorrect)
3. as user, i want level to go up 1 after i press the next button
4.as a user, i want the clock to restart to 30 seconds every time the next button is pressed
5. as a user, i want to see my score at the end of the quiz
6.as a user, i want to end the quiz when the timer runs out
7.as a user, i want to restart the quiz when it ends
8.as a user, i want to see the next question when i click the next button
9.as a user, i want to see how much time is left in the quiz
10.as a user, i want to see my current score as i answer questions
11.as a user , i want restart easily after losing or winning
//---------------------------------------------------*/

/*-------------------pseudocode-------------------//
Start game

*Display Level 1 question and multiple choice answers

*Wait for user to click an answer

If answer is correct:

    Highlight green

    Go to next level/question

Else:

    Highlight red

    Show “Game Over” message

    Offer Restart button

Repeat until Level 4 is completed

If all questions correct:

    Show “You Win!” message

End
Offer Restart button
//---------------------------------------------------*/

/*-------------------variables-------------------*/
const questions = [
    {
        question: "Which country won the FIFA World Cup in 2018?",
        options: ["Brazil", "Germany", "France", "Argentina"],
        answer: "France"
    },
    {
        question: "which boxer is famous for saying 'i flow like a buteerfly and i sting like a bee'?",
        options: ["Floyd Mayweather", "Mike Tyson", "Muhammad Ali", "Sonny Liston"],
        answer: "Muhammad Ali"
    },
    {
        question: "How many NBA championships did Michael Jordan win with the Chicago Bulls?",
        options: ["7", "2", "9", "6"],
        answer: "6"
    },
    {
        question: "what sport is Tiger Woods famous for palying?",
        options: ["Golf", "Football", "Rugby", "Hockey"],
        answer: "Golf"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timePerQuestion = 30; // seconds
let timerInterval;

/*-------------------DOM elements-------------------*/

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn')
const restartBtn = document.getElementById('restartBtn');

/*-------------------functions-------------------*/
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    scoreEl.textContent = `Score: ${score}`;
    timerEl.textContent = `Time Left: ${timeLeft}s`;
    resultEl.classList.add('hidden');
    nextBtn.classList.add('hidden');
    restartBtn.classList.add('hidden');
    displayQuestion();
    startTimer() ;
      }

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectAnswer(option));
        optionsEl.appendChild(button);
    });
}

function selectAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const optionsButtons = document.querySelectorAll('.option');
    optionsButtons.forEach(button => button.disabled = true);

    if (selectedOption === currentQuestion.answer) {
        score++;
        scoreEl.textContent = `Score: ${score}`;
        optionsButtons.forEach(button => {
            if (button.textContent === selectedOption) {
                button.classList.add('correct');
            }
        });
    } else {
        optionsButtons.forEach(button => {
            if (button.textContent === selectedOption) {
                button.classList.add('incorrect');
            }
            if (button.textContent === currentQuestion.answer) {
                button.classList.add('correct');
            }
        });
    }

    nextBtn.classList.remove('hidden');
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft; 
        timerEl.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    questionEl.textContent = '';
    optionsEl.innerHTML = '';
    resultEl.textContent = `Quiz Over! Your final score is ${score}/${questions.length}.`;
    resultEl.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    restartBtn.classList.remove('hidden');
}
nextBtn.addEventListener('click', () => {
currentQuestionIndex++;
timeLeft; 
if (currentQuestionIndex < questions.length)
{
    displayQuestion();
    nextBtn.classList.add('hidden');
}
else {
    endQuiz();
}
});
restartBtn.addEventListener('click', startQuiz);

/*-------------------start quiz-------------------*/
startQuiz();
/*---------------------------------------------------*/ 
