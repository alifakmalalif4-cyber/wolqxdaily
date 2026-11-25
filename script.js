
const facts = [
    {
        title: "Octopuses have three hearts!",
        description: "Two hearts pump blood to the gills, while one pumps it to the rest of the body."
    },
    {
        title: "Venus has a very long day!",
        description: "One rotation of Venus takes longer than one trip around the Sun."
    },
    {
        title: "Sharks are older than trees!",
        description: "Shark ancestors existed hundreds of millions of years ago."
    },
    {
        title: "Honey lasts a long time!",
        description: "Properly sealed honey can remain edible for a very long time."
    },
    {
        title: "Space is incredibly huge!",
        description: "The observable universe contains billions of galaxies."
    }
];

function showRandomFact() {
    const randomIndex = Math.floor(Math.random() * facts.length);

    document.getElementById("fact-title").textContent =
        facts[randomIndex].title;

    document.getElementById("fact-description").textContent =
        facts[randomIndex].description;
}

function welcomeUser() {
    alert("Welcome to CurioLab! Let's discover something new!");
}

// CUR IOLAB QUIZ SYSTEM

const quizQuestions = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "Which is the largest ocean?",
        options: ["Indian", "Atlantic", "Pacific", "Arctic"],
        answer: "Pacific"
    },
    {
        question: "How many hearts does an octopus have?",
        options: ["One", "Two", "Three", "Four"],
        answer: "Three"
    },
    {
        question: "Which gas do plants absorb?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        answer: "Carbon dioxide"
    },
    {
        question: "Which is the closest star to Earth?",
        options: ["Sirius", "Sun", "Polaris", "Vega"],
        answer: "Sun"
    }
];

let currentQuestion = 0;
let quizScore = 0;
let quizAnswered = false;

function loadQuestion() {
    const q = quizQuestions[currentQuestion];

    document.getElementById("quiz-question").textContent = q.question;

    const optionsBox = document.querySelector(".quiz-options");
    optionsBox.innerHTML = "";

    q.options.forEach(option => {
        const button = document.createElement("button");

        button.className = "option";
        button.textContent = option;

        button.onclick = function() {
            checkAnswer(button, option === q.answer);
        };

        optionsBox.appendChild(button);
    });

    document.getElementById("quiz-result").textContent =
        "Choose your answer!";

    document.getElementById("next-question").textContent =
        "Next Question →";

    quizAnswered = false;
}

function checkAnswer(button, isCorrect) {
    if (quizAnswered) return;

    quizAnswered = true;

    const allOptions = document.querySelectorAll(".option");

    allOptions.forEach(option => {
        option.disabled = true;

        if (option.textContent === quizQuestions[currentQuestion].answer) {
            option.classList.add("correct");
        }
    });

    if (isCorrect) {
        quizScore++;
        document.getElementById("quiz-result").textContent =
            "🎉 Correct! Amazing work!";
    } else {
        button.classList.add("wrong");

        document.getElementById("quiz-result").textContent =
            "Not quite! The correct answer is " +
            quizQuestions[currentQuestion].answer;
    }
}

function nextQuestion() {
    if (!quizAnswered) {
        document.getElementById("quiz-result").textContent =
            "Choose an answer first!";
        return;
    }

    currentQuestion++;

    if (currentQuestion >= quizQuestions.length) {
        document.getElementById("quiz-question").textContent =
            "Quiz Completed! 🏆";

        document.querySelector(".quiz-options").innerHTML = "";

        document.getElementById("quiz-result").textContent =
            "Your score: " + quizScore + " / " + quizQuestions.length;

        document.getElementById("next-question").textContent =
            "Play Again ↻";

        quizAnswered = false;
        currentQuestion = -1;
        return;
    }

    loadQuestion();
}

loadQuestion();

// CUR IOLAB CATEGORY SYSTEM

const categoryFacts = {
    Space: [
        "Saturn is famous for its beautiful ring system.",
        "The Sun is the closest star to Earth.",
        "Jupiter is the largest planet in our Solar System."
    ],

    Nature: [
        "A group of lions is called a pride.",
        "Bamboo is one of the fastest-growing plants.",
        "Octopuses have three hearts."
    ],

    Science: [
        "Water is made of hydrogen and oxygen.",
        "Light travels faster than sound.",
        "The human body has 206 bones in adulthood."
    ],

    Technology: [
        "The first computer mouse was made of wood.",
        "The World Wide Web was invented by Tim Berners-Lee.",
        "QR codes were first developed in Japan."
    ]
};

function showCategoryFacts(category) {

    const facts = categoryFacts[category];

    const randomIndex = Math.floor(Math.random() * facts.length);

    document.getElementById("category-title").textContent =
        "✨ " + category + " Discovery";

    document.getElementById("category-fact").textContent =
        facts[randomIndex];

    document.getElementById("category-result").style.display = "block";

    document.getElementById("category-result").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

// CATEGORY SEARCH SYSTEM

function searchCategories() {

    const searchValue = document
        .getElementById("category-search")
        .value.toLowerCase().trim();

    const cards = document.querySelectorAll(".category-card");

    let found = 0;

    cards.forEach(card => {

        const categoryName =
            card.querySelector("h3").textContent.toLowerCase();

        if (categoryName.includes(searchValue)) {
            card.style.display = "block";
            found++;
        } else {
            card.style.display = "none";
        }

    });

    const message = document.getElementById("search-message");

    if (searchValue === "") {
        message.textContent = "";
    } else if (found === 0) {
        message.textContent = "No categories found. Try another search!";
    } else {
        message.textContent = found + " category found!";
    }
}


function toggleTheme() {
    document.body.classList.toggle("light-mode");

    const button = document.getElementById("theme-toggle");

    if (document.body.classList.contains("light-mode")) {
        button.textContent = "🌙 Dark Mode";
    } else {
        button.textContent = "☀️ Light Mode";
    }
}

function checkDailyAnswer(button, isCorrect) {
    const result = document.getElementById("daily-result");
    const buttons = button.parentElement.querySelectorAll("button");
const todayKey = new Date().toDateString();
localStorage.setItem("dailyChallengeDate", todayKey);
localStorage.setItem("dailyChallengeAnswered", "true");
    if (isCorrect) {
        let score = document.getElementById("daily-score");
score.textContent = Number(score.textContent) + 1;
localStorage.setItem("dailyChallengeScore", score.textContent);
        result.textContent = "🎉 Correct! Mars is the Red Planet!";
        result.style.color = "#22c55e";
    } else {
        result.textContent = "❌ Not quite! The correct answer is Mars.";
        result.style.color = "#ef4444";
    }

    buttons.forEach(btn => {
        btn.disabled = true;
    });
}

const dailyQuestions = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        answer: 1
    },
    {
        question: "Which is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Pacific", "Arctic"],
        answer: 2
    },
    {
        question: "Which gas do plants absorb?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        answer: 1
    },
    {
        question: "What is the largest planet?",
        options: ["Earth", "Saturn", "Mars", "Jupiter"],
        answer: 3
    },
    {
        question: "How many bones are there in an adult human body?",
        options: ["206", "201", "210", "196"],
        answer: 0
    }
];

// Load the daily challenge
function loadDailyChallenge() {
    const today = new Date();
    const dayNumber = Math.floor(today.getTime() / 86400000);

    const questionIndex = dayNumber % dailyQuestions.length;
    const todayQuestion = dailyQuestions[questionIndex];

    document.getElementById("daily-question").textContent =
        todayQuestion.question;

    const optionsContainer = document.getElementById("daily-options");

    optionsContainer.innerHTML = "";

    todayQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.textContent = option;

        button.onclick = function () {
            checkDailyAnswer(this, index === todayQuestion.answer);
        };

        optionsContainer.appendChild(button);
    });
}

loadDailyChallenge();

// Restore daily challenge progress
const todayKey = new Date().toDateString();

const savedDate = localStorage.getItem("dailyChallengeDate");
const savedScore = localStorage.getItem("dailyChallengeScore");

const scoreDisplay = document.getElementById("daily-score");

if (savedDate === todayKey) {
    scoreDisplay.textContent = savedScore || "0";

    if (localStorage.getItem("dailyChallengeAnswered") === "true") {
        document.querySelectorAll("#daily-options button").forEach(btn => {
            btn.disabled = true;
        });

        document.getElementById("daily-result").textContent =
            "🎉 You've completed today's challenge! Come back tomorrow!";
    }
} else {
    scoreDisplay.textContent = "0";
}