const numWords = $("#num-words")
const inputForm = $("#num-input")
const submitBtn = $("#submit-btn")
const typeSpan = $("#type-span")
const typeSelect = $("#lorem-type")

const resultsTextarea = $("#ipsum-results")

const wordList = [
    "ROAS",
    "KPI",
    "Actionability",
    "Snackable Content",
    "Make it pop",
    "Make the logo bigger",
    "Tire-kick",
    "Circle Back",
    "Pop-up",
    "Food Truck",
    "Stunt",
    "Viral",
    "Collaborative process",
    "Thumb-stopping",
    "Experience",
    "Authentic",
    "Brand Lift",
    "Brand Sentiment",
    "User Journey",
    "Addressable TV",
    "Slack it to me",
    "Trackable",
    "Target audience",
    "The client had an idea…",
    "QR Codes",
    "That meeting should have been an email",
    "I'll ping you",
    "Deck",
    "Scope Creep",
    "Guerrilla",
    "Bespoke",
    "Data-Driven",
    "Surprise and delight",
    "Disruption",
    "Influencer Strategy",
    "Look and Feel",
    "Value exchange",
    "Content is King",
    "Lead gen",
    "Top of the funnel",
    "Brand awareness",
    "Conversion Pixel",
    "DMA",
    "Lookalike Audience",
    "360 Campaign",
    "Integrated",
    "CTA",
    "ASAP",
    "Just following up",
    "Outperforming",
    "Herding cats",
    "Storytelling",
    "Boiling the ocean",
    "Case Study",
    "Have a think on it",
    "Low hanging fruit",
    "Let's talk offline",
    "Bandwidth",
    "It just isn't quite there",
    "Journey",
    "Activation",
    "Content",
    "Client Status",
    "Check-in",
    "Internal",
    "final_FINAL_FINALLLLL.psd",
    "First of its kind",
    "Feedback",
    "Outside the box",
    "Brand Pillars",
    "Messaging Hierarchy",
    "Tentpole events",
    "High Level",
    "Power through",
    "Scalable",
    "Hard stop",
    "Evergreen",
    "Out of pocket",
    "Ad Like Object",
    "Bang it out",
    "Let's jam on this",
    "Next level",
    "It takes a village",
    "Client version",
    "WIP",
    "Rollout plan",
    "EOD",
    "Mockup",
    "Comp",
    "Photoshop it",
    "Touch base",
    "All-nighter",
    "Expense it",
    "Meeting sushi",
    "Creatives",
    "Back-to-backs",
    "Zooms",
    "Slacks",
    "Does the idea have legs?",
    "All-agency",
    "Subjective feedback",
    "In-situ",
    "SPOX"
]

typeSelect.on("change", () => {
    typeSpan.text(typeSelect.val())
})


inputForm.on("submit", (e) => {
    e.preventDefault();
    console.log("submitted")
    const inputNum = numWords.val()

    let result = "";
    const punctuation = [
        ".", "?", "!", "...", "-"
    ]

    if (inputNum.length === 0) {
        return alert("Please enter a number!")
    }

    if (typeSelect.val() === 'phrases') {



        for (let i = 0; i < parseInt(inputNum); i++) {
            const randomInd = Math.floor(Math.random() * (wordList.length - 1));
            result += (`${i === 0 ? "" : " "}` + wordList[randomInd]);

            const randomChance = Math.floor(Math.random() * 4)

            if (!randomChance) {
                const randomPunctuation = Math.floor(Math.random() * punctuation.length)
                result += punctuation[randomPunctuation]
            }
        }
        result += '.'
        return resultsTextarea.val(result)
    }

    else {
        for (let i = 0; i < parseInt(inputNum); i++) {
            for (let j = 0; j < 22; j++) {
                const randomInd = Math.floor(Math.random() * (wordList.length - 1));
                result += (`${j === 0 ? "" : " "}` + wordList[randomInd]);

                const randomChance = Math.floor(Math.random() * 4)

                if (!randomChance) {
                    const randomPunctuation = Math.floor(Math.random() * punctuation.length)
                    result += punctuation[randomPunctuation]
                }

            }
            result += '.\n\n';

        }
        return resultsTextarea.val(result)

    }
})
