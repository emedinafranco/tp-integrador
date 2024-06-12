// BUTTONS
const startButton = document.getElementById('start-button');
const playButton = document.getElementById('play-button');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
// SCREENS
const startScreen = document.getElementById('start-screen');
const instructionsScreen = document.getElementById('instructions-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
// ELEMENTS
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const scoreElement = document.getElementById('score');
const questionImage = document.getElementById('question-image');
const timerElement = document.getElementById('timer');
const timeRemainingElement = document.getElementById('time-remaining');

const questions = [
    {
        question: "Señal para detenerse completamente",
        image: "../images/señales/pare.jpg",
        options: ["Verdadero", "Falso"],
        correct: 0
    },
    {
        question: "Señal para lavar el vehículo",
        image: "../images/señales/transitar-luces-bajas-encendidas.jpg",
        options: ["Verdadero", "Falso"],
        correct: 1
    },
    {
        question: "Señal de contramano",
        image: "../images/señales/contramano.jpg",
        options: ["Verdadero", "Falso"],
        correct: 0
    },
    {
        question: "Señal de permitido estacionar",
        image: "../images/señales/estacionamiento-exclusivo.jpg",
        options: ["Verdadero", "Falso"],
        correct: 1
    },
    {
        question: "Señal de circulación exclusiva",
        image: "../images/señales/no-ruidos-molestos.jpg",
        options: ["Verdadero", "Falso"],
        correct: 1
    },
    {
        question: "Señal de Atención",
        image: "../images/señales/cruce-ferroviario.jpg",
        options: ["Verdadero", "Falso"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 5;

startButton.addEventListener('click', () => showInstructions());
playButton.addEventListener('click', () => startGame());
restartButton.addEventListener('click', () => restartGame());

const showInstructions = () => {
    startScreen.style.display = 'none';
    instructionsScreen.style.display = 'block';
}

const startGame = () => {
    instructionsScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    showQuestion();
}

const showQuestion = () => {
    resetState();
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    if (question.image) {
        questionImage.src = question.image;
        questionImage.style.display = 'block';
    } else {
        questionImage.style.display = 'none';
    }

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => selectAnswer(index, button));
        optionsContainer.appendChild(button);
    });
    startTimer();
}

const resetState = () => {
    clearInterval(timer);
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

const startTimer = () => {
    let timeRemaining = timeLimit;
    timeRemainingElement.textContent = timeRemaining;
    timerElement.style.display = 'block';

    timer = setInterval(() => {
        timeRemaining--;
        timeRemainingElement.textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            timeOut();
        }
    }, 1000);
}

const timeOut = () => {
    selectAnswer(null, null);
}

const selectAnswer = (selectedIndex, button) => {
    const question = questions[currentQuestionIndex];
    if (selectedIndex !== null && selectedIndex === question.correct) {
        button.classList.add('correct');
        score++;
    } else {
        if (button !== null) {
            button.classList.add('wrong');
        }
        optionsContainer.children[question.correct].classList.add('correct');
    }

    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
    });
    clearInterval(timer);
    setTimeout(showNextQuestion, 1000);
}

const showNextQuestion = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

const showResult = () => {
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    scoreElement.textContent = `Tu puntaje es de: ${score} de ${questions.length}`;
}

const restartGame = () => {
    score = 0;
    currentQuestionIndex = 0;
    resultScreen.style.display = 'none';
    startScreen.style.display = 'block';
}
