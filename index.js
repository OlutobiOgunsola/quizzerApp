var score = 0;
const clientAnswersArray = [];
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
  var radioss = Array.from(document.querySelectorAll("li"));
  radioss.forEach(li => {
    if (li.children[0].checked) {
      clientAnswersArray.push(li.children[1].innerHTML);
    }
  });
  return clientAnswersArray;
};

const setHighScore = score => {
  const highScore = localStorage.getItem("quizzer_user_highscore");
  if (score > highScore) {
    localStorage.setItem("quizzer_user_highscore", score);
  }
};

const getScore = arg => {
  score = 0;
  if (!Array.isArray(arg)) {
    return console.log(arg);
  }
  for (var i = 0; i < arg.length; i++) {
    if (correctAnswers.indexOf(arg[i]) > -1) {
      score += 1;
    }
  }
  setHighScore(score);
  return score;
};

const displayScore = score => {
  const highScore = localStorage.getItem("quizzer_user_highscore");
  console.log(highScore);
  if (score < 5) {
    document.querySelector("#displayScore").style.color = "red";
  } else {
    document.querySelector("#displayScore").style.color = "green";
  }
  document.querySelector("#displayScore").textContent = score;

  if (score > highScore) {
    document.querySelector("#displayHighScore").textContent = score;
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
  //check if user exists
  const oldUser = localStorage.getItem("quizzer_user_id");
  var highScore = 0;
  if (!oldUser) {
    registerUser();
    localStorage.setItem("quizzer_user_highscore", highScore);
    document.querySelector("#displayHighScore").textContent = highScore;
  } else {
    oldhighScore = localStorage.getItem("quizzer_user_highscore");
    document.querySelector("#displayHighScore").textContent = oldhighScore;
  }

  document.querySelector("#displayScore").textContent = highScore;
  //   console.log(highScore);
  return highScore;
};

const formSubmit = e => {
  e.preventDefault();
  displayScore(getScore(getClientAnswers()));
  console.log(localStorage);
};

var btn = document.querySelector("#submitBtn");
btn.addEventListener("click", formSubmit);

validateNewUser();

// localStorage.clear("quizzer_user_highscore");
console.log(localStorage);

// console.log(validateNewUser());
