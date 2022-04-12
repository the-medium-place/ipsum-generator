const inquirer = require('inquirer');
const wordList = require("./adIpsum.json")

start();

function start() {
    inquirer.prompt([{
        type: 'number',
        message: "How many items?",
        name: "numWords"
    }])
        .then(response => {
            let result = "";
            const punctuation = [
                ".", "?", "!", "...", "-"
            ]

            if (!parseInt(response.numWords)) {
                console.log("Please enter a number...\n================")
                start()
            }

            for (let i = 0; i <= response.numWords; i++) {
                const randomInd = Math.floor(Math.random() * (wordList.length - 1));
                result += (`${i === 0 ? "" : " "}` + wordList[randomInd]);

                const randomChance = Math.floor(Math.random() * 4)

                if (!randomChance) {
                    const randomPunctuation = Math.floor(Math.random() * punctuation.length)
                    result += punctuation[randomPunctuation]
                }
            }
            result += '.'
            console.log(result);
        })
}
