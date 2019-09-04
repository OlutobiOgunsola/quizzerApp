var score = 0;
const questionBox = document.querySelector("#question-box");
let clientAnswersArray = [];
let selectedQuestionsArray = [];
const correctAnswers = [
  "FCT",
  "America",
  "Kimberly Anyandike",
  "A bird",
  "Chunks of earth crust",
  "220mph",
  "Carbohydrate",
  "Rapper",
  "Mali",
  "King of Egbaland"
];

// Store all questions in array object
const questionsObject = {
  questions: [
    {
      id: 0,
      title: "What is the capital of Nigeria?",
      options: ["FCT", "Lagos", "Rivers", "Kano"],
      answer: "FCT"
    },
    {
      id: 1,
      title: "What continent is Nicaragua on?",
      options: ["America", "Africa", "Australia", "Europe"],
      answer: "America"
    },
    {
      id: 2,
      title: "Who was the first black woman to fly solo across the atlantic?",
      options: [
        "Rosa Parks",
        "Kimberly Anyandike",
        "Angelique Kidjo",
        "Jennifer Lopez"
      ],
      answer: "Kimberly Anyandike"
    },
    {
      id: 3,
      title: "What is a Macaw?",
      options: [
        "A bird",
        "A monkey",
        "A 19th century slave",
        "A native of Maldives"
      ],
      answer: "A bird"
    },
    {
      id: 4,
      title: "What are tectonic plates?",
      options: [
        "Earth crust",
        "Fancy china plates",
        "Reverb plates",
        "None of the above"
      ],
      answer: "Earth crust"
    },
    {
      id: 5,
      title: "What is a falcons dive speed?",
      options: ["220mph", "230mph", "240mph", "250mph"],
      answer: "220mph"
    },
    {
      id: 6,
      title: "What class of food is rice?",
      options: ["Carbohydrate", "Protein", "Minerals", "Vitamins"],
      answer: "Carbohydrate"
    },
    {
      id: 7,
      title: "Who is Kurupt?",
      options: [
        "A rapper",
        "A politician",
        "A software developer",
        "A footballer"
      ],
      answer: "A rapper"
    },
    {
      id: 8,
      title: "Where did Mansa Musa rule?",
      options: ["Mali", "Gabon", "Ethiopia", "Luxemburg"],
      answer: "Mali"
    },
    {
      id: 9,
      title: "Who is the Awujale",
      options: [
        "King of Benin",
        "King of Egbaland",
        "King of Ife",
        "Sultan of Sokoto"
      ],
      answer: "King of Egbaland"
    }
  ]
};

const getClientAnswers = () => {
  // var radios = Array.from(document.querySelectorAll("li"));
  // radios.forEach(li => {
  //   if (li.children[0].checked) {
  //     clientAnswersArray.push(li.children[1].innerHTML);
  //   }
  // });
  // if (clientAnswersArray.length === 0) {
  //   return console.log("Error: You must answer at least 1 question");
  // } else {
  //   return clientAnswersArray;
  // }
};

const setScores = score => {
  var date = new Date();
  var scores = JSON.parse(localStorage.getItem("quizzer_user_highscore"));
  var currentDate = date.getTime();
  // you are trying to set score id for returning user. it is not setting right. it is setting as "newScore" instead of timestamp id
  if (scores) {
    scores[JSON.stringify(currentDate)] = score;
    localStorage.setItem("quizzer_user_highscore", JSON.stringify(scores));
  } else {
    const scores = {};
    scores[JSON.stringify(currentDate)] = score;
    localStorage.setItem("quizzer_user_highscore", JSON.stringify(scores));
  }
};

const getScore = arg => {
  let score = 0;
  if (!Array.isArray(arg)) {
    return console.log(arg);
  }
  for (var i = 0; i < arg.length; i++) {
    if (correctAnswers.indexOf(arg[i]) > -1) {
      //refactor
      score += 1;
    }
  }
  setScores(score);
  return score;
};

const displayScore = score => {
  document.querySelector("#displayScore").textContent = score;
  let highestScore;
  const scoreObject = JSON.parse(
    localStorage.getItem("quizzer_user_highscore")
  );
  if (score < 5) {
    document.querySelector("#displayScore").style.color = "red";
  } else {
    document.querySelector("#displayScore").style.color = "green";
  }

  var scoresArray = Object.values(scoreObject);
  sortedScores = scoresArray.sort((a, b) => {
    return b - a;
  });
  highestScore = sortedScores[0];

  if (score > highestScore) {
    document.querySelector("#displayHighScore").textContent = score;
  } else {
    document.querySelector("#displayHighScore").textContent = highestScore;
  }
};

const registerUser = () => {
  var date = new Date().getTime();
  const userId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    var r = (date + Math.random() * 16) % 16 | 0;
    date = Math.floor(date / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });

  const setUser = () => {
    localStorage.setItem("quizzer_user_id", userId);
    // console.log(localStorage);
  };
  setUser();
};

const validateNewUser = () => {
  //hide scorePage
  const scorePage = document.querySelector("#scoresPage");
  document.querySelector(".Next").textContent = "Show Scores";
  scorePage.style.display = "none";
  const enterQuestionsPage = document.querySelector("#enter-questionPage");
  enterQuestionsPage.style.display = "none";
  //show quizPage
  const quizPage = document.querySelector("#quizPage");
  quizPage.style.display = "block";

  //check if user exists
  const oldUser = localStorage.getItem("quizzer_user_id");
  let highScore = {};
  var userId = new Date();
  // console.log(userId.getTime());
  if (!oldUser) {
    // initialize answers array to []
    clientAnswersArray = [];
    // initialize selected questions array to []
    selectedQuestionsArray = [];

    registerUser();
    localStorage.setItem("quizzer_user_highscore", JSON.stringify(highScore));
    // console.log(localStorage);
    document.querySelector("#displayHighScore").textContent = 0;

    //set questions into localStorage
    localStorage.setItem("quizzer_questions", JSON.stringify(questionsObject));
  } else {
    // initialize answers array to []
    clientAnswersArray = [];
    // initialize selected questions array to []
    selectedQuestionsArray = [];
    // display highscore
    let highScore = JSON.parse(localStorage.getItem("quizzer_user_highscore"));
    var scoresArray = Object.values(highScore);
    var sortedScores = scoresArray.sort((a, b) => {
      return b - a;
    });
    maxScore = sortedScores[0];
    document.querySelector("#displayHighScore").textContent = maxScore;
  }

  document.querySelector("#displayScore").textContent = 0;
};

// section to display scores in tabs on new page

//give storage object default value to clear console error

const returnScores = () => {
  const scorePage = document.querySelector("#scoresPage");
  const scores = JSON.parse(localStorage.getItem("quizzer_user_highscore"));
  for (let i = 0; i < Object.keys(scores).length; i++) {
    //create scoretab div
    if (scorePage) {
      var time = Number(Object.keys(scores)[i]);
      var date = new Date(time);
      var score = Object.values(scores)[i];
      const scoreTab = document.createElement("div");
      scoreTab.classList.add("scoreTab");
      // create scoreID div
      const score_id = document.createElement("div");
      score_id.textContent = date;
      score_id.classList.add("score_id");
      // create score display div
      const scoreDiv = document.createElement("div");
      scoreDiv.classList.add("score");
      scoreDiv.textContent = score;
      // append to scoreDiv
      scoreTab.appendChild(score_id);
      scoreTab.appendChild(scoreDiv);

      scorePage.append(scoreTab);
    }
  }
  // console.log(scorePage);
};

returnScores();

const switchPage = () => {
  const quizPage = document.querySelector("#quizPage");
  const scorePage = document.querySelector("#scoresPage");
  const enterQuestionsPage = document.querySelector("#enter-questionPage");

  //switchPages
  if (quizPage.style.display === "block") {
    quizPage.style.display = "none";
    scorePage.style.display = "block";
    enterQuestionsPage.style.display = "none";
    document.querySelector(".Next").textContent = "Show Quiz";
  } else {
    quizPage.style.display = "block";
    scorePage.style.display = "none";
    enterQuestionsPage.style.display = "none";
    document.querySelector(".Next").textContent = "Show Scores";
  }
};

const numberOfQuestions = 11;
const questionsFetched = JSON.parse(localStorage.getItem("quizzer_questions"));

const questionsBag = [];
//select 10 random questions
const getQuestions = () => {
  const questionNumbersArray = [];
  //get random questions indices
  while (questionNumbersArray.length < numberOfQuestions) {
    let randomIndex = Math.floor(Math.random() * questionsFetched.length);
    if (questionNumbersArray.indexOf(randomIndex) > -1) {
      //do nothing
    } else {
      questionNumbersArray.push(randomIndex);
    }
  }

  //select questions that match random indices
  for (let i = 0; i < questionNumbersArray.length; i++) {
    questionsBag.push(questionsFetched[questionNumbersArray[i]]);
  }
};

//select question from bag

const selectQuestion = (questionsBag, i) => {
  let selectedQuestions = [];
  selectedQuestions.push(questionsBag[i]);
  return selectedQuestions;
};

//get Buttons and do logic

const cycle = () => {
  let i = 0;
  //get buttons and code functionality
  const prevBtn = document.querySelector(".prevQuestion");
  const nextBtn = document.querySelector(".nextQuestion");

  prevBtn.addEventListener("click", e => {
    clientAnswersArray.pop();
    console.log(clientAnswersArray);
    if (i < 0) {
      e.preventDefault();
      return;
    } else {
      e.preventDefault();
      i--;
      nextQuestion(selectQuestion(questionsBag, i));
    }
  });
  nextBtn.addEventListener("click", e => {
    e.preventDefault();

    //record the selected radio button
    const radios = document.querySelectorAll("li");
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].childNodes[1].checked) {
        clientAnswersArray.push(radios[i].childNodes[3].innerHTML);
      }
    }
    console.log(clientAnswersArray);
    if (i >= numberOfQuestions) {
      e.preventDefault();
      return;
    } else {
      e.preventDefault();
      i++;
      nextQuestion(selectQuestion(questionsBag, i));
    }
  });
  return i;
};

// format questions dynamically
const nextQuestion = selectedQuestion => {
  const formItem = document.querySelector(".card");
  const questionDivs = selectedQuestion.map(question => {
    return `<div class="card-title">
              ${question.title}
            </div>
            <div class="options">
              <ul>
                <li>
                  <input type="radio" name="Q${question.id}" class="Options" />
                  <label for="Q${question.id}">${question.options[0]}</label>
                </li>
                <li>
                  <input type="radio" name="Q${question.id}" class="Options" />
                  <label for="Q${question.id}">${question.options[1]}</label>
                </li>
                <li>
                  <input type="radio" name="Q${question.id}" class="Options" />
                  <label for="Q${question.id}">${question.options[2]}</label>
                </li>
                <li>
                  <input type="radio" name="Q${question.id}" class="Options" />
                  <label for="Q${question.id}">${question.options[3]}</label>
                </li>
              </ul>
            </div>`;
  });

  formItem.innerHTML = questionDivs;
};

// Add new question to the questions list

//function to switch to "Add Questions" page
const openQuestionsPage = () => {
  const quizPage = document.querySelector("#quizPage");
  const scorePage = document.querySelector("#scoresPage");
  const enterQuestionsPage = document.querySelector("#enter-questionPage");
  //switchPages
  if (enterQuestionsPage.style.display === "none") {
    quizPage.style.display = "none";
    scorePage.style.display = "none";
    enterQuestionsPage.style.display = "block";
    document.querySelector(".Next").textContent = "Show Quiz";
  } else {
    enterQuestionsPage.style.display = "none";
    quizPage.style.display = "block";
    scorePage.style.display = "none";
    document.querySelector(".Next").textContent = "Show Scores";
  }
};

//function to get the value of textarea
let textAreaText = "";
const getText = e => {
  textAreaText = e.target.value;
  // console.log(textAreaText);
  return textAreaText;
};

document.getElementById("question-box").addEventListener("blur", getText);
s;

const submitQuestion = e => {
  e.preventDefault();
  const blur = new Event("blur");
  document.getElementById("question-box").dispatchEvent(blur);
  //get the input of the user
  const questionOptions = document.querySelectorAll(".newQuestionOptions");
  let questionBody;
  let questionObj = {};

  //retrieve questions array from Localstorage
  let newQuestionsFetched = JSON.parse(
    localStorage.getItem("quizzer_questions")
  ).questions;

  //get the input value of the question box
  const questionTitle = textAreaText;

  //get options and correct answer
  const optionsArray = [];
  const correctAnswer = "";
  const options = document.querySelectorAll(".newQuestionOptions");

  questionObj["title"] = questionTitle;
  for (let i = 0; i < options.length; i++) {
    optionsArray.push(options[i].childNodes[3].value);
    questionObj["options"] = optionsArray;
    if (options[i].childNodes[1].checked) {
      questionObj["answer"] = options[i].childNodes[3].value;
    }
  }
  newQuestionsFetched.push(questionObj);
  localStorage.setItem(
    "quizzer_questions",
    JSON.stringify(newQuestionsFetched)
  );
  console.log(localStorage);

  // const newQuestion = questionBox.
};

let submitQtnBtn = document.querySelector("#submitQuestion");
submitQtnBtn.addEventListener("click", submitQuestion);

// handle quiz submissions, question cycle and scoring
const run = () => {
  getQuestions();
  nextQuestion(selectQuestion(questionsBag, cycle()));
};
const formSubmit = e => {
  e.preventDefault();
  if (clientAnswersArray.length < 1) {
    console.log(
      "You must answer a question first. If an option has been selected, press the next button to proceed"
    );
  }
  displayScore(getScore(clientAnswersArray));
  clientAnswersArray = [];
  // console.log(localStorage);
};
var btn = document.querySelector("#submitBtn");
btn.addEventListener("click", formSubmit);

run();
