var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
  data: [
  {
    q : "What is the standard distance between the target and archer in Olympics?",
    o : [
      "All white",
      "Mostly white",
      "A Mix of Red & White",
      "Mostly red",
      "All red"
    ],
    a : 1 // arrays start with 0, so answer is 70 meters
  },
  {
    q : "What kind of flavors do you like? Select the heart button if you enjoy, select the X button if you’re not a fan. - Tinder like answers (X, heart)",
    o : [
      "White Peach",
      "Lemon",
      "Baking Spice",
      "Black cherry",
      "Strawberry",
      "Pear",
      "Honey",
      "Raspberry",
      "Black currant",
      "Pomegranate"
    ],
    a : 3
  },
  {
    q : "Some lunatic mixed Skittles and M&M’s in the same bowl. Which do you pick out to eat? This lets us know if you prefer sweet or tart flavors, and also, if you're a little crazy.",
    o : [
      "All skittles",
      "Both. In my mouth. At the same time.",
      "All M&Ms"
    ],
    a : 2
  },
  {
    q : "What regions are you interested in trying wines from? We make wines from over 12 different countries, so we'll try to pair you with regions you enjoy.",
    o : [
      "Australia",
      "Portugal",
      "South Africa",
      "Spain",
      "France",
      "Argentina"
    ],
    a : 0
  },
  {
    q : "Like food? Tell us all your faves. For our foodie friends - this helps us recommend wines that pair well with your favorite eats.",
    o : [
      "Cheese",
      "Cured meat",
      "Shellfish",
      "Salad",
      "Pizza",
      "BBQ",
      "Thai",
      "Veggies",
      "Poultry",
      "Chocolate cake",
      "Fish",
      "Pasta with cream sauce",
      "Sushi",
      "Chinese",
      "Burgers",
      "Lamb",
      "Indian",
      "Stew",
      "Chili",
      "Red pasta",
      "Fries",
      "Fruit",
      "Mexican"
    ],
    a : 3
  }
  ],

  // (A2) HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score

  // (B) INIT QUIZ HTML
  init: function(){
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    // (B2) QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // (B4) GO!
    quiz.draw();
  },

  // (C) DRAW QUESTION
  draw: function(){
    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", quiz.select);
      quiz.hAns.appendChild(label);
    }
  },

  // (D) OPTION SELECTED
  select: function(){
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = this.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      this.classList.add("correct");
    } else {
      this.classList.add("wrong");
    }

    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(function(){
      if (quiz.now < quiz.data.length) { quiz.draw(); }
      else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },

  // (E) RESTART QUIZ
  reset : function () {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};
window.addEventListener("load", quiz.init);
