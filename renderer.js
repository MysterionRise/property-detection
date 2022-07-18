const nextPageBtn = document.getElementById('nextPage');
const questionText = document.getElementById('questionText');
const fs = require('fs');

let currentQuestionId = 0;
let startTime = 0;

const questions = [
    "Оцените выраженность следующих признаков в отношении к краснооранжевому новому плоду в форме цветка?",
    "Оцените выраженность следующих признаков в отношении к новому оранжевому круглому плоду",
    "Оцените выраженность следующих признаков в отношении к новому коричневому каплеобразному плоду",
    "Оцените выраженность следующих признаков в отношении к новому зеленому овальному плоду",
    "Оцените выраженность следующих признаков в отношении к новому зеленому круглому плоду",
    "Оцените выраженность следующих признаков в отношении к новому красно-зеленому стручковому плоду",
    "Оцените выраженность следующих признаков в отношении к новому фиолетовому продолговатому плоду",
    "Оцените выраженность следующих признаков в отношении к бурому вытянутому плоду"
]
const propertiesByQuestions = {
    0: ["Толстая кожура", "Гладкий", "Крупные семена", "Склизский", "Имеет шипы", "Полосатый", "Шершавый"],
    1: ["Колючий", "Желтая мякоть", "Крупные семена", "Гладкий", "Пористый", "Зернистый", "Маленькие семечки"],
    2: ["Чешуйчатый", "Шершавый", "Тонкая кожура", "Рассыпчатый", "Ворсистый", "Бугристый", "Склизский"],
    3: ["Белая мякость", "Ребристый", "Бугристый", "Мягкий", "Сморщенный", "Пятнистый", "Мохнатый"],
    4: ["Темно-коричневая мякоть", "Тонкая кожура", "Гладкий", "Имеет шипы", "Полый/пустой внутри", "В крапинку", "Шершавый"],
    5: ["Бархатистый", "Скрученный", "Изогнутый/Красная мякоть", "Гладкий", "Полосатый", "Колючий", "Чешуйчатый"],
    6: ["Бело-голубая мякоть", "Черные косточки", "Тонкая кожура", "Имеет дольки", "Пятнистый", "Толстая кожура", "Бугристый"],
    7: ["Зернистый/имеет мякоть в виде \"икринок\"", "Тонкая кожура", "Гладкий", "Коричневые семена", "Мохнатый", "Ребристый", "Колючий"],
}

function getResults() {
//    get all checked radio buttons and log their ids
    let fileName = 'results.log';
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
            let size = document.querySelectorAll(nameSel).length
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
        document.getElementById("questionnaire").hidden = false;
        currentQuestionId++;
    } else {
        //  if not every radio button group is checked - don't allow to execute code below
        let allClicked = true;
        for (let i = 1; i <= 7; i++) {
            let nameSel = `input[name=q${i}]:checked`;
            let size = document.querySelectorAll(nameSel).length
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
            console.log("not every radio button is clicked")
        }
    }
}


