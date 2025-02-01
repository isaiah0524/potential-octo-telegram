const fullQuizData = [
    {
        question: "Python에서 변수를 선언할 때 사용하는 키워드는?",
        choices: ["var", "let", "const", "키워드가 필요하지 않음"],
        correct: 3
    },
    {
        question: "Python의 주석은 어떤 기호로 시작하나요?",
        choices: ["//", "/*", "#", "<!--"],
        correct: 2
    },
    {
        question: "Python에서 문자열을 정수로 변환하는 함수는?",
        choices: ["str()", "int()", "float()", "char()"],
        correct: 1
    },
    {
        question: "Python의 기본 들여쓰기는 몇 칸인가요?",
        choices: ["2칸", "4칸", "3칸", "1칸"],
        correct: 1
    },
    {
        question: "다음 중 Python의 내장 함수가 아닌 것은?",
        choices: ["print()", "len()", "scanf()", "input()"],
        correct: 2
    },
    {
        question: "Python의 리스트를 생성하는 올바른 문법은?",
        choices: ["array()", "list()", "[]", "new List()"],
        correct: 2
    },
    {
        question: "Python에서 문자열을 합칠 때 사용하는 연산자는?",
        choices: ["+", "&", "||", ","],
        correct: 0
    },
    {
        question: "Python의 참(True)을 나타내는 올바른 표기는?",
        choices: ["true", "True", "TRUE", "참"],
        correct: 1
    },
    {
        question: "Python에서 딕셔너리를 만들 때 사용하는 기호는?",
        choices: ["[]", "()", "{}", "<>"],
        correct: 2
    },
    {
        question: "다음 중 Python의 예약어가 아닌 것은?",
        choices: ["if", "while", "loop", "for"],
        correct: 2
    },
    {
        question: "Python에서 'Hello'를 5번 반복하는 올바른 표현은?",
        choices: ["'Hello' * 5", "'Hello'.repeat(5)", "repeat('Hello', 5)", "multiply('Hello', 5)"],
        correct: 0
    },
    {
        question: "Python에서 리스트의 길이를 구하는 함수는?",
        choices: ["size()", "length()", "len()", "count()"],
        correct: 2
    }
];

function getRandomQuestions(count) {
    const shuffled = [...fullQuizData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

const quizData = getRandomQuestions(5); // 랜덤으로 5개 문제 선택

let currentQuestion = 0;
let score = 0;
let selectedChoice = -1;
let userAnswers = [];  // 추가: 사용자의 답안을 저장할 배열

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const submitBtn = document.getElementById("submit");
const quizEl = document.getElementById("quiz");
const resultsEl = document.getElementById("results");
const scoreEl = document.getElementById("score");

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionEl.textContent = `${currentQuestion + 1}. ${question.question}`;
    
    choicesEl.innerHTML = "";
    question.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.classList.add("choice");
        button.addEventListener("click", () => selectChoice(index));
        choicesEl.appendChild(button);
    });
}

function selectChoice(index) {
    selectedChoice = index;
    document.querySelectorAll(".choice").forEach(button => {
        button.classList.remove("selected");
    });
    document.querySelectorAll(".choice")[index].classList.add("selected");
}

function showResults() {
    quizEl.style.display = "none";
    resultsEl.style.display = "block";
    scoreEl.textContent = score;
    
    const reviewContainer = document.getElementById("answer-review");
    reviewContainer.innerHTML = "";
    
    quizData.forEach((question, index) => {
        const reviewItem = document.createElement("div");
        reviewItem.classList.add("review-item");
        
        const isCorrect = userAnswers[index] === question.correct;
        reviewItem.classList.add(isCorrect ? "correct" : "incorrect");
        
        reviewItem.innerHTML = `
            <p><strong>${index + 1}번 문제:</strong> ${question.question}</p>
            <p>당신의 답: ${question.choices[userAnswers[index]]}</p>
            ${!isCorrect ? 
                `<p class="correct-answer">정답: ${question.choices[question.correct]}</p>` 
                : ''}
        `;
        reviewContainer.appendChild(reviewItem);
    });
}

submitBtn.addEventListener("click", () => {
    if (selectedChoice === -1) {
        alert("답을 선택해주세요!");
        return;
    }

    userAnswers.push(selectedChoice);  // 추가: 사용자의 답안 저장

    if (selectedChoice === quizData[currentQuestion].correct) {
        score += 20;
    }

    currentQuestion++;
    selectedChoice = -1;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

loadQuestion();
