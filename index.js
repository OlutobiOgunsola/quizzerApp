var score = 0;
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

const getClientAnswers = () => {
  const clientAnswersArray = [];
  var radioss = Array.from(document.querySelectorAll("li"));
  radioss.forEach(li => {
    if (li.children[0].checked) {
      clientAnswersArray.push(li.children[1].innerHTML);
    }
  });
  if (clientAnswersArray.length === 0) {
    return console.log("Error: You must answer at least 1 question");
  } else {
    return clientAnswersArray;
  }
};

const setScores = score => {
  var _id = new Date();
  var scores = JSON.parse(localStorage.getItem("quizzer_user_highscore"));
  var newScoreId = _id.getTime();
  // you are trying to set score id for returning user. it is not setting right. it is setting as "newScore" instead of timestamp id
  if (scores) {
    scores[JSON.stringify(newScoreId)] = score;
    localStorage.setItem("quizzer_user_highscore", JSON.stringify(scores));
    console.log(localStorage);
  } else {
    const scores = {};
    scores[JSON.stringify(newScoreId)] = score;
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
      score += 1;
    }
  }
  setScores(score);
  return score;
};

const displayScore = score => {
  document.querySelector("#displayScore").textContent = score;
  let maxScore;
  const highScore = JSON.parse(localStorage.getItem("quizzer_user_highscore"));
  if (score < 5) {
    document.querySelector("#displayScore").style.color = "red";
  } else {
    document.querySelector("#displayScore").style.color = "green";
  }

  var scoresArray = Object.values(highScore);
  sortedScores = scoresArray.sort((a, b) => {
    return b - a;
  });
  maxScore = sortedScores[0];

  if (score > maxScore) {
    document.querySelector("#displayHighScore").textContent = score;
  } else {
    document.querySelector("#displayHighScore").textContent = maxScore;
  }
};

const registerUser = () => {
  var dt = new Date().getTime();
  const _id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });

  const setUser = () => {
    localStorage.setItem("quizzer_user_id", _id);
    // console.log(localStorage);
  };
  setUser();
};

const validateNewUser = () => {
  //hide scorePage
  const scorePage = document.querySelector("#scoresPage");
  document.querySelector(".Next").textContent = "Show Scores";
  scorePage.style.display = "none";

  //show quizPage
  const quizPage = document.querySelector("#quizPage");
  quizPage.style.display = "block";

  //check if user exists
  const oldUser = localStorage.getItem("quizzer_user_id");
  let highScore = {};
  var _id = new Date();
  // console.log(_id.getTime());
  if (!oldUser) {
    registerUser();
    localStorage.setItem("quizzer_user_highscore", JSON.stringify(highScore));
    // console.log(localStorage);
    document.querySelector("#displayHighScore").textContent = 0;
  } else {
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

const formSubmit = e => {
  e.preventDefault();
  displayScore(getScore(getClientAnswers()));
  // console.log(localStorage);
};

var btn = document.querySelector("#submitBtn");
btn.addEventListener("click", formSubmit);

// section to display scores in tabs on new page

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

  //switchPages
  if (quizPage.style.display === "block") {
    quizPage.style.display = "none";
    scorePage.style.display = "block";
    document.querySelector(".Next").textContent = "Show Quiz";
  } else {
    quizPage.style.display = "block";
    scorePage.style.display = "none";
    document.querySelector(".Next").textContent = "Show Scores";
  }
};
