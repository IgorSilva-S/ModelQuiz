// Flyout Script
let accessIcons = document.querySelectorAll('.accessButton')
let TBWindowOpen = false
let accessIconsToggle = true
let darkTheme = false
let highContrast = false
let isDevOpen = false
let isInElectron = false



let DeveloperKeys = false

if (!DeveloperKeys) {
    document.getElementById('OpenDevKeys').style.display = 'none'
}

document.getElementById('quizTitle').innerText = quizTitle

let DTM = false
function deskToMobile() {
    if (!DTM) {
        DTM = true
    } else {
        DTM = false
    }
}

function disableClock() {
    if (isClock) {
        isClock = false
    } else {
        isClock = true
    }

    canUseTimer()
}

function canUseTimer() {
    if (!isClock) {
        timer.removeAttribute('style')
    } else {
        if (typeOfPage != 'endPage' && typeOfPage != 'introPage') {
            timer.style.display = 'flex'
        }
    }
}

function EDK() {
    if (!DeveloperKeys) {
        console.log('Alerta: uma variável necessária está definida como False! Favor, alterá-la')
    } else {
        console.log('Confirmada a validade da variável, DevKeys habilitado')
        document.getElementById('OpenDevKeys').style.display = 'flex'
    }
}

function enableAccessibiltyButtons() {
    if (!accessIconsToggle) {
        accessIcons.forEach((i) => {
            i.removeAttribute('style')
        })
        accessIconsToggle = true
        document.getElementById('ACSBCheck').removeAttribute('style')
    } else {
        accessIcons.forEach((i) => {
            i.style.display = 'none'
        })
        accessIconsToggle = false
        document.getElementById('ACSBCheck').style.display = 'none'
    }
    TBWindowOpen = false
    isDevOpen = false
    document.getElementById("TBWF").removeAttribute('style')
    document.getElementById("DevF").removeAttribute('style')
    if (!isInElectron) {
        document.getElementById('DevF').style.top = '160px'
    }
    let screen = window.screen.width
    if (screen <= 550) {
        document.getElementById('DevF').style.top = '260px'
    }
    document.getElementById('FOpen').removeAttribute('style')

}

document.getElementById('TBWindow').addEventListener('click', () => {
    if (!TBWindowOpen) {
        TBWindowOpen = true
        document.getElementById("TBWF").style.display = 'grid'
        document.getElementById('FOpen').style.display = 'block'
        let screen = window.screen.width
        if (screen <= 550) {
            document.getElementById('DevF').style.top = '260px'
        }
    } else {
        TBWindowOpen = false
        isDevOpen = false
        document.getElementById("TBWF").removeAttribute('style')
        document.getElementById("DevF").removeAttribute('style')
        if (!isInElectron) {
            document.getElementById('DevF').style.top = '160px'
        }
        let screen = window.screen.width
        if (screen <= 550) {
            document.getElementById('DevF').style.top = '260px'
        }
        document.getElementById('FOpen').removeAttribute('style')
    }
})

function closeFlyout() {
    TBWindowOpen = false
    isDevOpen = false
    document.getElementById("TBWF").removeAttribute('style')
    document.getElementById("DevF").removeAttribute('style')
    document.getElementById('FOpen').removeAttribute('style')
    if (!isInElectron) {
        document.getElementById('DevF').style.top = '160px'
    }
    let screen = window.screen.width
    if (screen <= 550) {
        document.getElementById('DevF').style.top = '260px'
    }
}

function changeTheme() {
    if (!highContrast) {
        let DTCheck = document.getElementById('DTCheck')
        if (!darkTheme) {
            document.body.className = 'dark'
            darkTheme = true
            DTCheck.removeAttribute('style')
        } else {
            document.body.removeAttribute('class')
            darkTheme = false
            DTCheck.style.display = 'none'
        }
        TBWindowOpen = false
        isDevOpen = false
        document.getElementById("TBWF").removeAttribute('style')
        document.getElementById("DevF").removeAttribute('style')
        if (!isInElectron) {
            document.getElementById('DevF').style.top = '160px'
        }
        let screen = window.screen.width
        if (screen <= 550) {
            document.getElementById('DevF').style.top = '260px'
        }
        document.getElementById('FOpen').removeAttribute('style')
    }
}

function highContrastTheme() {
    let HCCheck = document.getElementById('HCCheck')
    if (!highContrast) {
        document.body.className = 'high'
        highContrast = true
        HCCheck.removeAttribute('style')
    } else {
        document.body.removeAttribute('class')
        highContrast = false
        HCCheck.style.display = 'none'
        if (darkTheme) {
            document.body.className = 'dark'
        }
    }
    TBWindowOpen = false
    isDevOpen = false
    document.getElementById("TBWF").removeAttribute('style')
    document.getElementById("DevF").removeAttribute('style')
    if (!isInElectron) {
        document.getElementById('DevF').style.top = '160px'
    }
    let screen = window.screen.width
    if (screen <= 550) {
        document.getElementById('DevF').style.top = '260px'
    }
    document.getElementById('FOpen').removeAttribute('style')
}

// Timer Script
let timer = document.getElementById('timer')

timer.addEventListener('animationend', () => {
    if (typeOfPage == 'imagePage') {
        goToQuestion()
    } else if (typeOfPage == "questionPage") {
        totalPoints--
        anotherQuestion()
    }
    timer.removeAttribute('style')
    setTimeout(() => {
        if (isClock) {
            timer.style.display = 'flex'
        }
    }, 1);
})

// Quiz Script
let typeOfPage = 'introPage'

function startQuiz() {
    document.getElementById('menuHome').style.display = 'none'
    anotherQuestion()
}

function restartQuiz() {
    answered = []
    counter = 0
    totalPoints = 0
    leftPB = 0
    typeOfPage = 'introPage'
    document.getElementById('menuHome').removeAttribute('style')
    document.getElementById('imgSection').style.display = 'none'
    document.getElementById('questions').style.display = 'none'
    document.getElementById('endPage').style.display = 'none'
    document.getElementById('progress').style.left = `-${100 - leftPB}%`
    document.getElementById('TBWindow').removeAttribute('style')
}

let answered = []
let counter = 0
let totalPoints = 0
let leftPB = 0

function anotherQuestion() {
    let isChoosed = false
    let isFinished = false
    do {
        actualQuestion = Math.floor(Math.random() * numOfQuestions)
        if (!answered.includes(actualQuestion)) {
            answered.push(actualQuestion)
            counter++
            document.getElementById('questNum').innerText = counter
            document.getElementById('writeQuestion').innerText = questions[actualQuestion]
            isChoosed = true
        } else if (counter == numOfQuestions) {
            isChoosed = true
            isFinished = true
            counter++
        }

        if (isChoosed && !isFinished) {
            let qOfTime = answers[actualQuestion]
            let randButton = []
            let theWrong = 0
            document.getElementById('a1').innerText = qOfTime[0]
            document.getElementById('cAnswer').innerText = qOfTime[0]
            document.getElementById('a2').innerText = qOfTime[1]
            document.getElementById('w1Answer').innerText = qOfTime[1]
            document.getElementById('a3').innerText = qOfTime[2]
            document.getElementById('w2Answer').innerText = qOfTime[2]
            document.getElementById('a4').innerText = qOfTime[3]
            document.getElementById('w3Answer').innerText = qOfTime[3]
            document.getElementById('hImg').src = imgQuestions[actualQuestion]
            let randCorrect = Math.floor(Math.random() * 4 + 1)
            randButton.push(randCorrect)
            document.getElementById('correct').className = `BStyle${randCorrect}`
            do {
                let randWrong = Math.floor(Math.random() * 4 + 1)
                if (randWrong != randButton[0] && randWrong != randButton[1] && randWrong != randButton[2] && randWrong != randButton[3]) {
                    randButton.push(randWrong)
                    theWrong++
                    let buttonId = `wrong${theWrong}`
                    document.getElementById(buttonId).className = `BStyle${randWrong}`
                }
            } while (theWrong != 3);
        }
    } while (!isChoosed);
    if (counter > 1) {
        leftPB = leftPB + (100 / numOfQuestions)
        document.getElementById('progress').style.left = `-${100 - leftPB}%`
    }
    if (useImages) {
        document.getElementById('imgSection').removeAttribute('style')
        document.getElementById('questions').style.display = 'none'
        typeOfPage = 'imagePage'
    } else {
        document.getElementById('questions').removeAttribute('style')
        typeOfPage = 'questionPage'
    }
    if (isClock) {
        timer.style.display = 'flex'
    }
    let screen = window.screen.width
    if (screen <= 550 || DTM) {
        document.getElementById('a1').innerText = ''
        document.getElementById('a2').innerText = ''
        document.getElementById('a3').innerText = ''
        document.getElementById('a4').innerText = ''
    }
    if (counter >= (numOfQuestions + 1)) {
        document.getElementById('imgSection').style.display = 'none'
        document.getElementById('questions').style.display = 'none'
        document.getElementById('endPage').removeAttribute('style')
        document.getElementById('numCorrect').innerText = totalPoints
        document.getElementById('numAll').innerText = numOfQuestions
        typeOfPage = 'endPage'
        leftPB = 100
        document.getElementById('progress').style.left = `-${100 - leftPB}%`
        if (useFinalResultText) {
            let finalResult = document.getElementById('finalResult')

            if (totalPoints == numOfQuestions) {
                finalResult.innerText = finalResultAll[0]
            } else if (totalPoints > (numOfQuestions / 2)) {
                finalResult.innerText = finalResultAll[1]
            } else if (totalPoints <= (numOfQuestions / 2) && totalPoints > 0) {
                finalResult.innerText = finalResultAll[2]
            } else {
                finalResult.innerText = finalResultAll[3]
            }
        } else {
            document.getElementById('finalResultText').style.display = 'none'
        }
        setTimeout(() => {
            timer.removeAttribute('style')
        }, 2);
    }
}

function wrongAnswer(id) {
    let screen = window.screen.width
    if (screen <= 550 || DTM) {
        if (id == 'wrong1') {
            document.getElementById('w1Popup').style.display = 'flex'
        } else if (id == 'wrong2') {
            document.getElementById('w2Popup').style.display = 'flex'
        } else if (id == 'wrong3') {
            document.getElementById('w3Popup').style.display = 'flex'
        }
    }
    else {
        anotherQuestion()
        timer.removeAttribute('style')
        setTimeout(() => {
            if (isClock) {
                timer.style.display = 'flex'
            }
        }, 1);
    }
}

function correctAnswer() {
    let screen = window.screen.width
    if (screen <= 550 || DTM) {
        document.getElementById('correctPopup').style.display = 'flex'
    }
    else {
        totalPoints++
        anotherQuestion()
        timer.removeAttribute('style')
        setTimeout(() => {
            if (isClock) {
                timer.style.display = 'flex'
            }
        }, 1);
    }
}

function goToQuestion() {
    document.getElementById('imgSection').style.display = 'none'
    document.getElementById('questions').removeAttribute('style')
    typeOfPage = 'questionPage'
    timer.removeAttribute('style')
    setTimeout(() => {
        if (isClock) {
            timer.style.display = 'flex'
        }
    }, 1);
}

// Mobile Script
function closePopup() {
    document.getElementById('correctPopup').removeAttribute('style')
    document.getElementById('w1Popup').removeAttribute('style')
    document.getElementById('w2Popup').removeAttribute('style')
    document.getElementById('w3Popup').removeAttribute('style')
}

function popupCorrectAnswer() {
    closePopup()
    totalPoints++
    anotherQuestion()
    timer.removeAttribute('style')
    setTimeout(() => {
        if (isClock) {
            timer.style.display = 'flex'
        }
    }, 1);
}

function popupWrongAnswer() {
    closePopup()
    anotherQuestion()
    timer.removeAttribute('style')
    setTimeout(() => {
        if (isClock) {
            timer.style.display = 'flex'
        }
    }, 1);
}

// All: Auto match machine theme
let isDark = window.matchMedia("(prefers-color-scheme: dark)")
let isHigh = window.matchMedia("(prefers-contrast: more)")

if (isDark.matches) {
    changeTheme()
    console.log('Auto-changed theme to Dark Mode!')
}

if (isHigh.matches) {
    highContrastTheme()
    console.log('Auto-changed theme to High Contrast!')
}


// Dev Keys
function devKeysFlyout() {
    if (!isDevOpen) {
        isDevOpen = true
        document.getElementById('DevF').style.display = 'grid'
    } else {
        isDevOpen = false
        document.getElementById('DevF').removeAttribute('style')
        if (!isInElectron) {
            document.getElementById('DevF').style.top = '160px'
        }
        let screen = window.screen.width
        if (screen <= 550) {
            document.getElementById('DevF').style.top = '260px'
        }
    }
}

function correctAnswerBTN() {
    document.getElementById('correct').style.boxShadow = '0 0 20px #000'
    if (darkTheme || highContrast) {
        document.getElementById('correct').style.boxShadow = '0 0 20px #f0f8ff'
    }
}

function reloadQuestion() {
    let qOfTime = answers[actualQuestion]
    document.getElementById('a1').innerText = qOfTime[0]
    document.getElementById('cAnswer').innerText = qOfTime[0]
    document.getElementById('a2').innerText = qOfTime[1]
    document.getElementById('w1Answer').innerText = qOfTime[1]
    document.getElementById('a3').innerText = qOfTime[2]
    document.getElementById('w2Answer').innerText = qOfTime[2]
    document.getElementById('a4').innerText = qOfTime[3]
    document.getElementById('w3Answer').innerText = qOfTime[3]
    let screen = window.screen.width
    if (screen <= 550) {
        document.getElementById('a1').innerText = ''
        document.getElementById('a2').innerText = ''
        document.getElementById('a3').innerText = ''
        document.getElementById('a4').innerText = ''
    }
}

canUseTimer()