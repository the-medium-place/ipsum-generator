$(document).ready(async function () {


    const numWords = $("#num-words")
    const inputForm = $("#num-input")
    const submitBtn = $("#submit-btn")
    const typeSpan = $("#type-span")
    const typeSelect = $("#lorem-type")
    const copyBtn = $("#lorem-copy")
    const clearBtn = $("#clear-btn")
    const toastBox = $("#toast");
    const toastText = $(".toast-txt")

    const resultsTextarea = $("#ipsum-results")

    const response = await fetch('/terms')
    const wordList = await response.json()

    copyBtn.hide();
    clearBtn.hide();
    toastBox.hide();

    typeSelect.on("change", () => {
        typeSpan.text(typeSelect.val())
    })

    inputForm.on("submit", (e) => {
        e.preventDefault();

        console.log("submitted")
        const inputNum = numWords.val()

        let result = "";
        const punctuation = [
            ".",
            "?",
            "!",
            "...",
            " -"
        ]

        if (inputNum.length === 0) {
            return alert("Please enter a number!")
        } else {
            copyBtn.show();
            clearBtn.show();
        }

        if (typeSelect.val() === 'phrases') {
            generateParagraph(parseInt(inputNum))
            return resultsTextarea.val(result)

        } else {
            for (let i = 0; i < parseInt(inputNum); i++) {
                generateParagraph(randomNumber(18, 30))
                result += "\n\n"
            }
            return resultsTextarea.val(result)

        }


        function generateParagraph(numPhrases) {
            for (let i = 0; i < numPhrases; i++) {
                const randomInd = Math.floor(Math.random() * (wordList.length - 1));
                // result += (`${i === 0 ? "" : " "}` + wordList[randomInd]);
                // result += (`${i === 0 ? "" : " "}`)
                if (i === 0) {
                    result += titleCase(wordList[randomInd])
                }
                result += punctuation.includes(result[result.length - 1]) ? " " + titleCase(wordList[randomInd]) : " " + wordList[randomInd].toLowerCase();

                const randomChance = Math.floor(Math.random() * 4)

                if (!randomChance && i !== numPhrases - 1) {
                    const randomPunctuation = Math.floor(Math.random() * punctuation.length)
                    result += punctuation.includes(result[result.length - 1]) ? '' : punctuation[randomPunctuation]
                }
            }
            result += punctuation.includes(result[result.length - 1]) ? '' : '.'

        }



    })

    copyBtn.on("click", (e) => {
        e.preventDefault()
        showToast("lightgreen", "darkgreen", "darkgreen", "Ipsum Copied to Clipboard!")
        navigator.clipboard.writeText(resultsTextarea.val())
    })

    clearBtn.on("click", (e) => {
        e.preventDefault();
        copyBtn.hide();
        resultsTextarea.val("");
        clearBtn.hide();
        numWords.val("");
        showToast("lightyellow", "rgb(133, 57, 29)", "rgb(133, 57, 29)", "Ipsum Cleared - ready to generate!")
    })

    function showToast(bgColor, borderColor, fontColor, text) {
        toastText.css("color", fontColor).text(text)
        toastBox.css("background", bgColor).css("border", `3px solid ${borderColor}`)
        toastBox.show(20, "linear", () => {
            setTimeout(() => {
                toastBox.hide()
            }, 1800);
        })

    }

    function titleCase(str) {
        const firstLetter = str[0];
        const restOfStr = str.split("").slice(1, (str.length)).join("")

        return firstLetter.toUpperCase() + restOfStr.toLowerCase();
    }

    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

})
