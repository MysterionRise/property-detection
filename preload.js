// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    async function processLineByLine() {
        const fileStream = fs.createReadStream('input.txt');

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        // Note: we use the crlfDelay option to recognize all instances of CR LF
        // ('\r\n') in input.txt as a single line break.

        for await (const line of rl) {
            // Each line in input.txt will be successively available here as `line`.
            console.log(`Line from file: ${line}`);
        }
    }


    // read csv with questions and return based on id
    function getQuestionById(question) {
        const fs = require('fs');
        var i = 1;
        let questions = new Map();
        fs.readFileSync('questions.csv', 'utf-8').split(/\r?\n/).forEach(function (line) {
            questions.set(`question + ${i}`, line);
            // console.log(line);
            i++;
        })

        console.log(questions);
        return questions.get(question);
    }


    for (const question of ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7']) {
        replaceText(`${question}`, getQuestionById(question))
    }
})
