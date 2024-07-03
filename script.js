const questions = [
    { question: "¿Cuál es la capital de Francia?", options: ["París", "Londres", "Madrid"], answer: 0 },
    { question: "¿Cuántos planetas hay en el sistema solar?", options: ["8", "9", "10"], answer: 0 },
    { question: "¿Quién pintó la Mona Lisa?", options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso"], answer: 0 },
    { question: "¿Cuál es el río más largo del mundo?", options: ["Amazonas", "Nilo", "Yangtsé"], answer: 0 },
    { question: "¿Qué elemento químico tiene el símbolo 'O'?", options: ["Oxígeno", "Oro", "Osmio"], answer: 0 },
    { question: "¿En qué año llegó el hombre a la Luna?", options: ["1969", "1972", "1965"], answer: 0 },
    { question: "¿Cuál es el idioma más hablado en el mundo?", options: ["Inglés", "Chino mandarín", "Español"], answer: 1 },
    { question: "¿Qué país ganó la Copa Mundial de Fútbol en 2018?", options: ["Alemania", "Brasil", "Francia"], answer: 2 },
    { question: "¿Cuál es la capital de Japón?", options: ["Tokio", "Osaka", "Kioto"], answer: 0 },
    { question: "¿Qué planeta es conocido como el planeta rojo?", options: ["Marte", "Júpiter", "Saturno"], answer: 0 },
    { question: "¿Cuál es el océano más grande del mundo?", options: ["Atlántico", "Pacífico", "Índico"], answer: 1 },
    { question: "¿En qué continente se encuentra Egipto?", options: ["Asia", "África", "Europa"], answer: 1 },
    { question: "¿Cuál es el país más grande del mundo?", options: ["Rusia", "Canadá", "China"], answer: 0 },
    { question: "¿Quién escribió 'Cien años de soledad'?", options: ["Gabriel García Márquez", "Julio Cortázar", "Mario Vargas Llosa"], answer: 0 },
    { question: "¿Cuál es la fórmula química del agua?", options: ["H2O", "CO2", "NaCl"], answer: 0 },
    { question: "¿Qué planeta es conocido por sus anillos?", options: ["Saturno", "Júpiter", "Urano"], answer: 0 },
    { question: "¿Cuál es el animal terrestre más rápido?", options: ["Guepardo", "León", "Tigre"], answer: 0 },
    { question: "¿Cuál es el metal más ligero?", options: ["Aluminio", "Litio", "Oro"], answer: 1 },
    { question: "¿Cuál es el país con más habitantes del mundo?", options: ["India", "Estados Unidos", "China"], answer: 2 },
    { question: "¿Cuál es el desierto más grande del mundo?", options: ["Sahara", "Gobi", "Atacama"], answer: 0 },
    { question: "¿Qué gas se encuentra en mayor proporción en la atmósfera?", options: ["Oxígeno", "Nitrógeno", "Dióxido de carbono"], answer: 1 },
    { question: "¿Cuál es el pico más alto del mundo?", options: ["Everest", "K2", "Kangchenjunga"], answer: 0 },
    { question: "¿Qué vitamina es conocida como la vitamina del sol?", options: ["Vitamina D", "Vitamina C", "Vitamina B"], answer: 0 },
    { question: "¿Cuál es el órgano más grande del cuerpo humano?", options: ["Piel", "Hígado", "Cerebro"], answer: 0 },
    { question: "¿Quién es el autor de 'Don Quijote'?", options: ["Miguel de Cervantes", "Federico García Lorca", "Jorge Luis Borges"], answer: 0 },
    { question: "¿Cuál es la moneda de Japón?", options: ["Yen", "Won", "Yuan"], answer: 0 },
    { question: "¿Cuál es la velocidad de la luz?", options: ["299,792 km/s", "150,000 km/s", "100,000 km/s"], answer: 0 },
    { question: "¿En qué país se encuentra la Torre Eiffel?", options: ["Francia", "Italia", "España"], answer: 0 },
    { question: "¿Cuál es la capital de Canadá?", options: ["Ottawa", "Toronto", "Vancouver"], answer: 0 },
    { question: "¿Qué planeta es el más cercano al sol?", options: ["Mercurio", "Venus", "Tierra"], answer: 0 }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let selectedQuestions;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const resultMessage = document.getElementById("result-message");

document.getElementById("start-btn").addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        setNextQuestion();
    } else {
        endQuiz();
    }
});

function startQuiz() {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    selectedQuestions = [...questions].sort(() => Math.random() - 0.5).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(selectedQuestions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.addEventListener("click", () => selectAnswer(index));
        optionsElement.appendChild(button);
    });
}

function resetState() {
    clearInterval(timer);
    timerElement.textContent = "15";
    progressBar.style.width = "100%";
    nextButton.classList.add("hidden");
    optionsElement.innerHTML = '';
}

function selectAnswer(selectedIndex) {
    const correct = selectedQuestions[currentQuestionIndex].answer;
    Array.from(optionsElement.children).forEach((button, index) => {
        if (index === correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });

    if (selectedIndex === correct) {
        score++;
    }

    nextButton.classList.remove("hidden");
}

function startTimer() {
    let timeLeft = 15;
    timerElement.textContent = timeLeft;
    progressBar.style.width = "100%";
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        progressBar.style.width = `${(timeLeft / 15) * 100}%`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            selectAnswer(-1); // No respuesta
        }
    }, 1000);
}

function endQuiz() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    scoreElement.textContent = score;
    if (score >= 8) {
        resultMessage.textContent = "¡Excelente! Eres un genio.";
    } else if (score >= 5) {
        resultMessage.textContent = "¡Buen trabajo! Puedes mejorar.";
    } else if (score >= 1) {
        resultMessage.textContent = "Necesitas estudiar más.";
    } else {
        resultMessage.textContent = "¡Inténtalo de nuevo!";
    }
}

document.getElementById("retry-btn").addEventListener("click", () => {
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});
