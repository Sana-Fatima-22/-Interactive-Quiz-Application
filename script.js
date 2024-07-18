// script.js

const questions = [
    {
        question: "What is the purpose of the #include directive in C++?",
        choices: ["To define a constant value", "To include the contents of a file in the program", "To declare a function prototype","To create a loop structure"],
        correct: "To include the contents of a file in the program"
    },
    {
        question: "Which of the following is the correct syntax to declare a pointer to an integer in C++?",
        choices: ["int *ptr;", "int ptr*;", "int ptr;", "int ptr&;"],
        correct: "int *ptr;"
    },
    {
        question: "Which of the following operators is used to access members of a class or structure through a pointer in C++?",
        choices: [". (dot)", "-> (arrow)", ":: (scope resolution)", "& (address of)"],
        correct: "-> (arrow)"
    },
    {
        question: "Which of the following is not a valid C++ data type?",
        choices: ["int", "float", "double", "real"],
        correct: "real"
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;

const startQuizBtn = document.getElementById('start-quiz');
const quizScreen = document.getElementById('quiz-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const nextQuestionBtn = document.getElementById('next-question');
const resultsScreen = document.getElementById('results-screen');
const scoreElement = document.getElementById('score');
const retryQuizBtn = document.getElementById('retry-quiz');

startQuizBtn.addEventListener('click', startQuiz);
nextQuestionBtn.addEventListener('click', showNextQuestion);
retryQuizBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    welcomeScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice');
        button.addEventListener('click', selectAnswer);
        choicesElement.appendChild(button);
    });
}

function resetState() {
    nextQuestionBtn.classList.add('hidden');
    while (choicesElement.firstChild) {
        choicesElement.removeChild(choicesElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const selectedAnswer = selectedButton.textContent;
    const correctAnswer = questions[currentQuestionIndex].correct;

    if (selectedAnswer === correctAnswer) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
    }

    Array.from(choicesElement.children).forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        }
    });

    nextQuestionBtn.classList.remove('hidden');
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    scoreElement.textContent = `${score} / ${questions.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultsScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
}
