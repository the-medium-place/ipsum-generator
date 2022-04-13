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
            "-"
        ]

        if (inputNum.length === 0) {
            return alert("Please enter a number!")
        } else {
            copyBtn.show();
            clearBtn.show();
        }

        if (typeSelect.val() === 'phrases') {

            for (let i = 0; i < parseInt(inputNum); i++) {
                const randomInd = Math.floor(Math.random() * (wordList.length - 1));
                result += (`${i === 0 ? "" : " "}` + wordList[randomInd]);

                const randomChance = Math.floor(Math.random() * 4)

                if (!randomChance) {
                    const randomPunctuation = Math.floor(Math.random() * punctuation.length)
                    result += punctuation.includes(result[result.length - 1]) ? '' : punctuation[randomPunctuation]
                }
            }
            result += punctuation.includes(result[result.length - 1]) ? '' : '.'
            return resultsTextarea.val(result)
        } else {
            for (let i = 0; i < parseInt(inputNum); i++) {
                for (let j = 0; j < 22; j++) {
                    const randomInd = Math.floor(Math.random() * (wordList.length - 1));
                    result += (`${j === 0 ? "" : " "}` + wordList[randomInd]);

                    const randomChance = Math.floor(Math.random() * 4)

                    if (!randomChance) {
                        const randomPunctuation = Math.floor(Math.random() * punctuation.length)
                        result += punctuation.includes(result[result.length - 1]) ? '' : punctuation[randomPunctuation]
                    }
                }
                result += punctuation.includes(result[result.length - 1]) ? '\n\n' : '.\n\n'

            }
            return resultsTextarea.val(result)
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
})
