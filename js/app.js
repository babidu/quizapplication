const questions = [
   {
      question: "which is the largest animal in the world ?",
      answers: [
         { text: "Shark", correct: "false" },
         { text: "Blue whale", correct: "true" },
         { text: "Elephant", correct: "false" },
         { text: "Giraffe", correct: "false" },
      ]
   },

   {
      question: "which is the smallest country in the world ?",
      answers: [
         { text: "Vatican City", correct: "true" },
         { text: "Bhutan", correct: "false" },
         { text: "Nepal", correct: "false" },
         { text: "Shri Lanka", correct: "false" },
      ]
   },

   {
      question: "which is the largest desert in the world ?",
      answers: [
         { text: "Kalahari", correct: "false" },
         { text: "Gobi", correct: "false" },
         { text: "Sahara", correct: "false" },
         { text: "Antarctica", correct: "true" },
      ]
   },
   {
      question: "which is the smallest continent in the world ?",
      answers: [
         { text: "Asia", correct: "false" },
         { text: "Australia", correct: "true" },
         { text: "Arctic", correct: "false" },
         { text: "Africa", correct: "false" },
      ]
   },

];

let startBtn = document.querySelector("#start");
let exitBtn = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");
let timeSpan = document.querySelector(".time span");
let nextQuiz = document.querySelector("#nextQuiz");
let Rules = document.querySelector(".Rules");
let details = document.querySelector(".details");
let questionsPage = document.querySelector("#questions");
let questionHeading = document.querySelector("#questionHeading");
let outOff = document.querySelector(".outOff");
let totalQuestion = questions.length;


let score = 0;
let currentQuestionInd = 0;


startBtn.addEventListener("click", () => {
   details.style.display = "none";
   Rules.style.display = "block";
});

exitBtn.addEventListener("click", (e) => {
   details.style.display = "block";
   Rules.style.display = "none";
   // console.log(e);
});

continueBtn.addEventListener("click", () => {
   details.style.display = "none";
   Rules.style.display = "none";
   questionsPage.style.display = "block";
   nextQuiz.style.display = "none";
   startTimer(10);
   startTimeLineBorder(0);
});


function startQuiz() {
   currentQuestionInd = 0;
   score = 0;
   showQuestions();
}


let answersbox = document.querySelector(".answers");

function showQuestions() {

   let currentQuestion = questions[currentQuestionInd];
   let questionNum = currentQuestionInd + 1;
   questionHeading.innerHTML = `${questionNum}. ${currentQuestion.question} `;
   outOff.textContent = `${questionNum} out off ${totalQuestion}`;
   // console.log(questionNum);

   // show answers options
   answersbox.innerHTML = ""
   currentQuestion.answers.forEach((answers) => {
      const section = document.createElement("section");
      section.innerHTML = answers.text;
      answersbox.appendChild(section);

      if (answers.correct) {
         section.dataset.correct = answers.correct;
      }
      section.addEventListener("click", selectedAnswer);

   });
}

// through this func i will show if user select wrong ans then it will be show the right ans automatically as well as agr right ans select karega tab toh thik hi hai

function autoShowRightAns() {
   Array.from(answersbox.children).forEach((section) => {
      if (section.dataset.correct === "true") {
         section.classList.add("correct");

         let p = document.createElement('span');
         p.innerHTML = `<i class="fa fa-check-square"></i>`;
         section.appendChild(p);
         section.style.pointerEvents = "none";

      } else {
         section.style.pointerEvents = "none";
         // console.log(section);
      }
   });
   nextQuiz.style.display = "block";
}

// show selected answers
function selectedAnswer(e) {
   // jab user koi ans select karta hai toh sath sath time ko bhi stop karne ke liye clearInterval  karna podta hai.
   clearInterval(counter);
   clearInterval(timeLineBorder);

   let userSelectedAns = e.target;
   console.log(userSelectedAns);
   if (userSelectedAns.dataset.correct === "true") {
      userSelectedAns.classList.add("correct");
      score++;
   } else {
      userSelectedAns.classList.add("incorrect");
      let p = document.createElement('span');
      p.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
      userSelectedAns.appendChild(p)
   }
   // agr user wrong select karta hai toh right wala dikhayega.
   autoShowRightAns();

}

// time counter function

let counter;
let timerValue = 10;

function startTimer(time) {
   counter = setInterval(timer, 1000);
   function timer() {
      timeSpan.textContent = time;
      time--;

      if (time < 9) {
         let addZero = timeSpan.textContent;
         timeSpan.textContent = `0${addZero}`
      }
      if (time < 0) {
         clearInterval(counter);
         timeSpan.textContent = "00";
         autoShowRightAns();
      }
   }
}
// function for timeline(border)

let timeLineBorder;
let timeLineWidth = 0;

let time_line = document.querySelector(".time_line");
function startTimeLineBorder(time) {
   timeLineBorder = setInterval(timer, 100);

   function timer() {
      time += 1;
      time_line.style.width = time + "%";
      if (time > 99.5) {
         clearInterval(timeLineBorder)
      }
   }

}

let scoreText = document.querySelector('#scoreText');
let result = document.querySelector('#result');

function showScore() {
   result.style.display = "block";
   scoreText.innerHTML = `You Got ${score} Out of ${totalQuestion}`;
}

// quit and replay btn code
let quitBtn = document.querySelector("#Quit");
let replayBtn = document.querySelector("#replay");

quitBtn.addEventListener("click", () => {
   window.location.reload();
});


replayBtn.addEventListener("click", () => {
   currentQuestionInd = 0;
   score = 0;
   // Show the questions page
   questionsPage.style.display = "block";
   // Hide the result page
   result.style.display = "none";
   // Show the first question
   showQuestions();

   startTimer(10)
   startTimeLineBorder(0);

});


// next questions page
nextQuiz.addEventListener("click", () => {
   // console.log('eeee');
   currentQuestionInd++;
   if (currentQuestionInd < totalQuestion) {
      showQuestions();
      nextQuiz.style.display = "none";
      // next question me time reset karne ke liye
      clearInterval(counter);
      startTimer(timerValue);

      // borderline reset
      clearInterval(timeLineBorder);
      startTimeLineBorder(timeLineWidth);
   } else {
      showScore();
   }
});


startQuiz();