const questions = [
    {
        question: "Which is largest animal ?",
        answers: [
            { text: "shark", correct: false },
            { text: "blue whale", correct: true },
            { text: "girrafe", correct: false },
            { text: "zebra", correct: false },

        ]

    },

    {
        question: "Which is smallest continent in India ?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Africa", correct: true },
            { text: "Antartica", correct: false },
            { text: "Europe", correct: false },

        ]

    },

    {
        question: "Who is the first primeminister of India ?",
        answers: [
            { text: "Jawarharlal Nehru", correct: true },
            { text: "Indira Gandhi", correct: false },
            { text: "Rajendra Prasad", correct: false },
            { text: "Mahatma Gandhi", correct: false },

        ]

    },
]

const questionelement = document.getElementById("question");
const answerbutton = document.getElementById("answerbuttons");
const nextbutton = document.getElementById("nextbtn");
let idx = 0;
let score = 0;
function startquiz() {
    idx = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showquestion();
}
function showquestion() {
    resetState();
    let currentquestion = questions[idx];
    let questionNo = idx + 1;
    questionelement.innerHTML = questionNo + " . " + currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectanswer)
    });
}
function resetState() {

    nextbutton.style.display = "none";
    while (answerbutton.firstChild) {
        answerbutton.removeChild(answerbutton.firstChild);
    }
}
function selectanswer(e) {
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if (iscorrect) {
        selectedbtn.classList.add("correct");
        score++;
    }
    else {
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbutton.style.display = "block";
}
function showscore() {
    resetState();
    questionelement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
    nextbutton.style.textAlign="center";
    nextbutton.style.marginTop="60px";
    nextbutton.style.marginLeft="160px";

}
function handlenextbutton() {
    idx++;
    if (idx < questions.length) {
        showquestion();
    }
    else {
        showscore();
    }
}
nextbutton.addEventListener("click", () => {
    if (idx < questions.length) {
        handlenextbutton();
    }
    else {
        startquiz();
    }
}
);
startquiz();