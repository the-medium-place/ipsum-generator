$(document).ready(async function () {

    // UTILITY VARIABLES
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

    // FETCH PHRASES FROM GOOGLE SHEETS PAGE (BACKEND PROCESS)
    const response = await fetch('/terms')
    const wordList = await response.json()

    // INIT PAGE LAYOUT
    init();

    // UPDATE PAGE TEXT => USER SELECTION
    typeSelect.on("change", () => {
        typeSpan.text(typeSelect.val())
    })

    // FORM SUBMIT - GENERATE AND RENDER IPSUM
    inputForm.on("submit", (e) => {
        e.preventDefault();

        const inputNum = numWords.val()

        // EMPTY STRING TO HOLD FINAL RESULT
        let result = "";
        // POSSIBLE PUNCTUATION
        const punctuation = [
            ".",
            "?",
            "!",
            "...",
            " -"
        ]

        if (inputNum.length === 0) {
            // USER DID NOT ENTER NUMBER - UPDATE USER
            // return alert("Please enter a number!")
            return showToast("pink", "red", "red", "Please enter a number!")
        } else {
            // USER ENTERED NUMBER - SHOW ACTION BUTTONS
            copyBtn.show();
            clearBtn.show();
        }

        // USER SELECTED TO RENDER NUM OF PHRASES
        if (typeSelect.val() === 'phrases') {
            generateParagraph(parseInt(inputNum))
            return resultsTextarea.val(result)

        } else {
            // USER SELECTED TO RENDER NUM OF PARAGRAPHS
            for (let i = 0; i < parseInt(inputNum); i++) {
                generateParagraph(randomNumber(18, 30))
                result += "\n\n"
            }

            // UPDATE PAGE WITH COMPLETED IPSUM TEXT
            return resultsTextarea.val(result)

        }

        // GENERATE 1 PARAGRAPH OF IPSUM TEXT
        function generateParagraph(numPhrases) {
            for (let i = 0; i < numPhrases; i++) {
                const randomInd = Math.floor(Math.random() * (wordList.length - 1));

                if (i === 0) {
                    // FIRST PHRASE OF PARAGRAPH, NO LEADING SPACE AND TITLE CASE
                    result += titleCase(wordList[randomInd])
                } else {
                    // CHECK FOR PUNCTUATION AT END OF CURRENT RESULT, 
                    // RETURN TITLE CASED PHRASE IF YES (NEW SENTENCE),
                    // RETURN LOWERCASED PHRASE IF NO (CONTINUING SENTENCE)
                    result += punctuation.includes(result[result.length - 1]) ? " " + titleCase(wordList[randomInd]) : " " + wordList[randomInd].toLowerCase();
                }

                // CREATING 1-IN-4 CHANCE TO ADD PUNCTUATION TO CURRENT RESULT
                const randomChance = Math.floor(Math.random() * 4)
                // 25% CHANCE PLUS CHECK IF LAST PHRASE OF PARAGRAPH
                if (!randomChance && i !== numPhrases - 1) {
                    const randomPunctuation = Math.floor(Math.random() * punctuation.length)
                    result += punctuation.includes(result[result.length - 1]) ? '' : punctuation[randomPunctuation]
                }
            }

            // ADD PUNCTUATION TO END OF PARAGRAPH IF NOT ALREADY PRESENT
            result += punctuation.includes(result[result.length - 1]) ? '' : '.'

        }
    })

    // COPY IPSUM TO CLIPBOARD
    copyBtn.on("click", (e) => {
        e.preventDefault()
        showToast("lightgreen", "darkgreen", "darkgreen", "Ipsum Copied to Clipboard!")
        navigator.clipboard.writeText(resultsTextarea.val())
    })

    // CLEAR IPSUM AND RESET PAGE
    clearBtn.on("click", (e) => {
        e.preventDefault();
        init()
        showToast("lightyellow", "rgb(133, 57, 29)", "rgb(133, 57, 29)", "Ipsum Cleared - ready to generate!")
    })

    function init() {
        copyBtn.hide();
        resultsTextarea.val("");
        clearBtn.hide();
        numWords.val("");
        typeSelect.val("phrases");
    }

    // SHOW AND STYLE TOAST BOX FOR USER FEEDBACK
    function showToast(bgColor, borderColor, fontColor, text) {
        toastText.css("color", fontColor).text(text)
        toastBox.css("background", bgColor).css("border", `3px solid ${borderColor}`)
        toastBox.show(20, "linear", () => {
            setTimeout(() => {
                toastBox.hide()
            }, 1800);
        })

    }

    // CONVERT STRING TO TITLE CASE
    function titleCase(str) {
        const firstLetter = str[0];
        const restOfStr = str.split("").slice(1, (str.length)).join("")

        return firstLetter.toUpperCase() + restOfStr.toLowerCase();
    }

    // GENERATE RANDOM NUM IN RANGE min-max
    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

})
