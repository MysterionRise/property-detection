const nextPageBtn = document.getElementById("nextPage");
const questionText = document.getElementById("questionText");
const fs = require("fs");

let currentQuestionId = 0;
let startTime = 0;

const questions = [
  "Оцените степень выраженности следующих признаков у красно-оранжевого нового плода в форме цветка?",
  "Оцените степень выраженности следующих признаков у нового оранжевого круглого плода",
  "Оцените степень выраженности следующих признаков у нового коричневого каплеобразного плода",
  "Оцените степень выраженности следующих признаков у нового зеленого овального плода",
  "Оцените степень выраженности следующих признаков у нового зеленого круглого плода",
  "Оцените степень выраженности следующих признаков у нового красно-зеленого стручкового плода",
  "Оцените степень выраженности следующих признаков у нового фиолетового продолговатого плода",
  "Оцените степень выраженности следующих признаков у бурого вытянутого плода",
];
const propertiesByQuestions = {
  0: [
    "Склизский",
    "Гладкий",
    "Шершавый",
    "Толстая кожура",
    "Имеет шипы",
    "Полосатый",
    "Крупные семена",
  ],
  1: [
    "Колючий",
    "Желтая мякоть",
    "Крупные семена",
    "Гладкий",
    "Пористый",
    "Зернистый",
    "Маленькие семечки",
  ],
  2: [
    "Чешуйчатый",
    "Склизский",
    "Тонкая кожура",
    "Рассыпчатый",
    "Ворсистый",
    "Шершавый",
    "Бугристый",
  ],
  3: [
    "Пятнистый",
    "Мохнатый",
    "Бугристый",
    "Мягкий",
    "Сморщенный",
    "Белая мякость",
    "Ребристый",
  ],
  4: [
    "Темно-коричневая мякоть",
    "В крапинку",
    "Шершавый",
    "Имеет шипы",
    "Полый внутри",
    "Тонкая кожура",
    "Гладкий",
  ],
  5: [
    "Бархатистый",
    "Полосатый",
    "Красная мякоть",
    "Гладкий",
    "Скрученный",
    "Колючий",
    "Чешуйчатый",
  ],
  6: [
    "Имеет дольки",
    "Пятнистый",
    "Толстая кожура",
    "Бугристый",
    "Бело-голубая мякоть",
    "Черные косточки",
    "Тонкая кожура",
  ],
  7: [
    "Колючий",
    "Тонкая кожура",
    "Гладкий",
    "Коричневые семена",
    "Мохнатый",
    "Ребристый",
    "Мякоть в форме икринок",
  ],
};

function getResults() {
  //    get all checked radio buttons and log their ids
  let fileName = "results.log";
  let checked = [];
  let radios = document.querySelectorAll("input:checked");
  for (let i = 0; i < radios.length; i++) {
    checked.push(radios[i].id);
  }
  let endTime = Date.now();
  let time = endTime - startTime;
  console.log(checked);
  console.log(time);
  startTime = Date.now();
  fs.appendFileSync(fileName, `${checked.toString()},${time.toString()}\n`);
}

nextPageBtn.onclick = function () {
  if (nextPageBtn.innerText === "Завершить тест") {
    // close file

    //    exit electron app
    window.close();
  }
  if (currentQuestionId > 7) {
    let allClicked = true;
    for (let i = 1; i <= 7; i++) {
      let nameSel = `input[name=q${i}]:checked`;
      let size = document.querySelectorAll(nameSel).length;
      console.log(size);
      if (size !== 1) {
        allClicked = false;
      }
    }
    if (allClicked) {
      getResults();
      console.log("no more questions to ask");
      document.getElementById("questionnaire").hidden = true;
      questionText.innerText = "Спасибо за выполнение задания!";
      nextPageBtn.innerText = "Завершить тест";
    }
  } else if (currentQuestionId === 0) {
    startTime = Date.now();
    questionText.innerText = questions[currentQuestionId];
    let properties = propertiesByQuestions[currentQuestionId];
    for (let i = 1; i <= 7; i++) {
      document.getElementById(`question${i}`).innerText = properties[i - 1];
    }
    document.getElementById("instruction").hidden = true;
    nextPageBtn.innerText = "Далее";
    document.getElementById("questionnaire").hidden = false;
    currentQuestionId++;
  } else {
    //  if not every radio button group is checked - don't allow to execute code below
    let allClicked = true;
    for (let i = 1; i <= 7; i++) {
      let nameSel = `input[name=q${i}]:checked`;
      let size = document.querySelectorAll(nameSel).length;
      console.log(size);
      if (size !== 1) {
        allClicked = false;
      }
    }
    if (allClicked) {
      getResults();

      questionText.innerText = questions[currentQuestionId];
      let properties = propertiesByQuestions[currentQuestionId];
      for (let i = 1; i <= 7; i++) {
        document.getElementById(`question${i}`).innerText = properties[i - 1];
      }
      currentQuestionId++;
      // uncheck all inputs
      for (let j = 1; j <= 7; j++) {
        for (let i = 1; i <= 7; i++) {
          document.getElementById(`q${j}_${i}`).checked = false;
        }
      }
      console.log("clicked");
    } else {
      console.log("not every radio button is clicked");
    }
  }
};
