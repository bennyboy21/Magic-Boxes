document.getElementById("how-To-Play").addEventListener("click", function() {
    // document.getElementById("how-To-Play-Page").classList.add("show")
    document.getElementById("how-To-Play-Main-Container").classList.add("show")
    console.log("Show")
})

var miniBoxes = document.querySelectorAll(".mini-Box")

// When Launching Input the day before it
var date1 = new Date('02/12/2022');
var date2 = new Date();
var negative = 0

var difference = date1.getTime() - date2.getTime();

var days = Math.ceil(difference / (1000 * 3600 * 24));
days = days.toString();
days = days.split('-')
days = days[1]

index = days - 1
console.log(days + ' days to Christmas');
console.log(index)

var checkIfNewDay = localStorage.getItem("date")

var notFinished = 0

var boxesCorrect = 0

var Timer = {
    seconds:0,
    minutes:0,
    hours:0
}

var shareBox = []

// get current time
// var date = new Date();
// var hours = date.getHours();
// var minutes = date.getMinutes();
// var seconds = date.getSeconds();

setInterval(function() {
    var checkIfNewDay = localStorage.getItem("date")
    var lastDatePlayed = Number(checkIfNewDay)
    var date5 = new Date();
    if(checkIfNewDay != null) {
        // console.log(checkIfNewDay)
        // var difference1 = date2 - checkIfNewDay
        // console.log(difference1)
        // console.log(difference)
        // console.log(date2.getDate())
        // console.log(lastDatePlayed)
        if(date5.getDate() > lastDatePlayed) {
            console.log("new day")
            localStorage.clear()
            lastDatePlayed = date5.getDate()
            localStorage.setItem("date", date2.getDate())
            window.location.reload()
        }
    }
    if(notFinished == 0) {
        Timer.seconds++
        console.log("Timer: " + Timer.hours + ":" + Timer.minutes + ":" + Timer.seconds)
    }
    if(Timer.seconds > 59) {
        Timer.seconds = 0
        Timer.minutes++
    }

    if(Timer.minutes > 59) {
        Timer.minutes = 0
        Timer.hours++
    }

    if(Timer.hours > 23) {
        Timer.seconds = 0
        Timer.minutes = 0
        Timer.hours = 0
    }
}, 1000)

document.getElementById("close-Icon").addEventListener("click", function() {
    document.getElementById("how-To-Play-Main-Container").classList.remove("show")
})

document.getElementById("close-Icon-2").addEventListener("click", function() {
    document.getElementById("finished-Page").classList.remove("show")
})

var html = '<div class="key" id="1" onclick="enterNumber(1)">1</div><div class="key" id="2" onclick="enterNumber(2)">2</div><div class="key" id="3" onclick="enterNumber(3)">3</div><div class="key" id="4" onclick="enterNumber(4)">4</div><div class="key" id="5" onclick="enterNumber(5)">5</div><div class="key" id="6" onclick="enterNumber(6)">6</div><div class="key" id="7" onclick="enterNumber(7)">7</div><div class="key" id="8" onclick="enterNumber(8)">8</div><div class="key" id="9" onclick="enterNumber(9)">9</div><div class="key" id="negative" onclick=' + 'enterNumber("-")' + '>-</div><div id="delete-Number-Button" onclick="deleteNumber()">Delete</div><div id="enter-Box">Enter</div>'

// if(magicSquares[index][0] == "1" || magicSquares[index][0] == "2" || magicSquares[index][0] == "3" || magicSquares[index][0] == "4" || magicSquares[index][0] == "5" || magicSquares[index][0] == "6" || magicSquares[index][0] == "7" || magicSquares[index][0] == "8" || magicSquares[index][0] == "9" || magicSquares[index][0] == "0") {
    document.getElementById('guess-Numbers-Button-Holder').innerHTML = html
// }

var allBoxes = document.querySelectorAll('.ind-Num')

var magicNumbers = []

var correctString = magicSquares[index]

var allBoxesHolders = document.querySelectorAll(".box")
// localStorage.clear()

var allBoxesQuestionMarks = document.querySelectorAll(".no-number")

var boxFinishedCheck = 0

var nums = {
    one:Number(magicSquares[index][0]),
    two:Number(magicSquares[index][1]),
    three:Number(magicSquares[index][2])
}

var theMagicNumber = nums.one + nums.two + nums.three
// console.log(nums.one + nums.two + nums.three)
document.getElementById('the-Actual-Magic-Number').textContent="?";

var checkIfFinishedToday = localStorage.getItem("magicnumbers")


for(var i=0;i<allBoxes.length;i++) {
    if(allBoxes[i].classList[1] == '5' || allBoxes[i].classList[1] == '8' || allBoxes[i].classList[1] == '9') {
        allBoxes[i].value = correctString[i]
    } else {
        allBoxes[i].value = ""
    }
}

if(checkIfFinishedToday != null) {
    console.log("Finished Today")
    boxFinishedCheck = 1
    var magicBoxNumbers = JSON.parse(checkIfFinishedToday)
    finishedToday(magicBoxNumbers)
} else {
    document.getElementById("how-To-Play-Main-Container").classList.add("show")
}

function finishedToday(Numbers) {
    notFinished = 1
    allBoxes = document.querySelectorAll('.ind-Num')
    var timer = localStorage.getItem("time")
    var score = localStorage.getItem("score")
    var day = localStorage.getItem("day")
    
    document.getElementById("timer").textContent = "Timer: " + timer
    document.getElementById("score").textContent = "Score: " + score + "/9"
    document.getElementById("day").textContent = "Day: " + day

    for(var i=0;i<allBoxes.length;i++) {
        allBoxes[i].value = correctString[i]
    }
    
    for(var i=0;i<Numbers.length;i++) {
        allBoxes[i].value = Numbers[i]
    }

    for(var i=0;i<allBoxes.length;i++) {
        if(allBoxes[i].value == correctString[i]) {
            boxesCorrect++
            document.getElementById(allBoxesHolders[i].id).style.animation = "correctMagicBox 1s forwards"
            allBoxes[i].style.animation = "correctMagicBox1 1s forwards"
            document.getElementById(allBoxesQuestionMarks[i].id).style.animation = "removeQuestionMark 1s forwards"
            miniBoxes[i].style.background = "#6aaa64"
            shareBox.push("🟩")
        } else {
            document.getElementById(allBoxesHolders[i].id).style.animation = "wrongNumber 1s forwards"
            allBoxes[i].style.animation = "wrongNumber2 1s forwards"
            document.getElementById(allBoxesQuestionMarks[i].id).style.animation = "removeQuestionMark 1s forwards"
            miniBoxes[i].style.background = "rgb(90, 90, 90)"
            shareBox.push("⬜")
        }
    }
    console.log(shareBox)
    
    setTimeout(function() {
        document.getElementById("finished-Page").classList.add("show")
    }, 1100)

    console.log(boxesCorrect + "/9")
    // localStorage.setItem("time", boxesCorrect)
    document.getElementById('the-Actual-Magic-Number').textContent = theMagicNumber
}

function enterNumber(numberEntered) {
    if(numberEntered != "-") {
        if(negative == 0) {
            var haventAlr = 0
            for(var i=0;i<allBoxes.length;i++) {
                if(allBoxes[i].value == "" && haventAlr == 0 && boxFinishedCheck == 0) {
                    allBoxes[i].value = numberEntered
                    
                    haventAlr = 1
                } else {
                    
                }
            }
        } else {
            var haventAlr = 0
            for(var i=0;i<allBoxes.length;i++) {
                if(allBoxes[i].value == "" && haventAlr == 0 && boxFinishedCheck == 0) {
                    allBoxes[i].value = "-" + numberEntered
                    
                    haventAlr = 1
                    
                    document.getElementById("negative").style.background = "rgb(170, 170, 170)"
                    document.getElementById("negative").style.color = "black"
                    negative = 0
                } else {
                    
                }
            }
        }
    } else {
        if(negative == 0 && boxFinishedCheck == 0) {
            console.log("negative number")
            document.getElementById("negative").style.background = "#6aaa64"
            document.getElementById("negative").style.color = "white"
            negative = 1
        } else if(negative == 1 && boxFinishedCheck == 0) {
            console.log("negative number")
            document.getElementById("negative").style.background = "rgb(170, 170, 170)"
            document.getElementById("negative").style.color = "black"
            negative = 0
        }
    }
}

function deleteNumber() {
    var haventAlr = 0
    for(var i=allBoxes.length- 1;i>allBoxes.length - allBoxes.length - 1;i--) {
        // console.log(allBoxes[i].value)
        if(allBoxes[i].value != "" && boxFinishedCheck == 0 && haventAlr == 0 && allBoxes[i].classList[2] != "setNumber") {
            allBoxes[i].value = ""
            haventAlr = 1
        } else {
        }
    }
}

document.addEventListener('keypress', key =>  {
    if(key.key == '-' && boxFinishedCheck == 0) {
        enterNumber('-')
    }

    if(key.key == '1' && boxFinishedCheck == 0) {
        enterNumber(1)
    }

    if(key.key == '2' && boxFinishedCheck == 0) {
        enterNumber(2)
    }

    if(key.key == '3' && boxFinishedCheck == 0) {
        enterNumber(3)
    }

    if(key.key == '4' && boxFinishedCheck == 0) {
        enterNumber(4)
    }

    if(key.key == '5' && boxFinishedCheck == 0) {
        enterNumber(5)
    }

    if(key.key == '6' && boxFinishedCheck == 0) {
        enterNumber(6)
    }

    if(key.key == '7' && boxFinishedCheck == 0) {
        enterNumber(7)
    }

    if(key.key == '8' && boxFinishedCheck == 0) {
        enterNumber(8)
    }

    if(key.key == '9' && boxFinishedCheck == 0) {
        enterNumber(9)
    }

    if(key.key == '0' && boxFinishedCheck == 0) {
        enterNumber(0)
    }
});

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === "Backspace" && boxFinishedCheck == 0) {
        deleteNumber()
    }

    if (key === "Enter" && boxFinishedCheck == 0) {
        enterMagicBox()
    }
});

document.getElementById('enter-Box').addEventListener('click', function() {
    enterMagicBox()
})

var text = encodeURIComponent("Follow JavaScript Jeep form Amazing JavaScript Tutorial");
var url = "https://medium.com/@jagathishsaravanan/";
var user_id = "jagathish1123";
var hash_tags = "JS,JavaScript,100DaysOfCode,Programming";


var params = "menubar=no,toolbar=no,status=no,width=570,height=570"; // for window
function ShareToTwitter(){
   let Shareurl = `https://twitter.com/intent/tweet?url=${url}&text=${text}&via=${user_id}&hashtags=${hash_tags}`;
   window.open(Shareurl,"NewWindow" , params);
}

function enterMagicBox() {
    var filledBoxes = 0
    for(var i=0;i<allBoxes.length;i++) {
        if(allBoxes[i].value == "" && boxFinishedCheck == 0) {
            document.getElementById(allBoxesHolders[i].id).style.animation = "nonumber 1s forwards"
            allBoxes[i].style.animation = "nonumber2 1s forwards"
            document.getElementById(allBoxesQuestionMarks[i].id).style.animation = "nonumber3 1s forwards"
            console.log(allBoxesQuestionMarks[i].id)
            console.log("no number")
        } else if(allBoxes[i] != "" && allBoxes[i].classList[2] != "setNumber" && boxFinishedCheck == 0){
            document.getElementById(allBoxesHolders[i].id).style.animation = "numberEntered 1s forwards"
            allBoxes[i].style.animation = "numberEntered2 1s forwards"
            filledBoxes++;
        }
    }

    setTimeout(function() {
        if(filledBoxes == 6) {
            notFinished = 1
            for(var i=0;i<allBoxes.length;i++) {
                magicNumbers.push(allBoxes[i].value)
                if(allBoxes[i].value == correctString[i]) {
                    boxesCorrect++
                    document.getElementById(allBoxesHolders[i].id).style.animation = "correctMagicBox 1s forwards"
                    allBoxes[i].style.animation = "correctMagicBox1 1s forwards"
                    document.getElementById(allBoxesQuestionMarks[i].id).style.animation = "removeQuestionMark 1s forwards"
                    miniBoxes[i].style.background = "#6aaa64"
                    shareBox.push("🟩")
                } else {
                    document.getElementById(allBoxesHolders[i].id).style.animation = "wrongNumber 1s forwards"
                    allBoxes[i].style.animation = "wrongNumber2 1s forwards"
                    document.getElementById(allBoxesQuestionMarks[i].id).style.animation = "removeQuestionMark 1s forwards"
                    miniBoxes[i].style.background = "rgb(90, 90, 90)"
                    shareBox.push("⬜")
                }
            }
            console.log(shareBox)
            localStorage.setItem("magicnumbers", JSON.stringify(magicNumbers))
            document.getElementById('the-Actual-Magic-Number').textContent = theMagicNumber
            boxFinishedCheck = 1
            // console.log(boxesCorrect + "/9")    
            
            localStorage.setItem("score", boxesCorrect)
            document.getElementById("score").textContent = "Score: " + boxesCorrect + "/9"
        }
        setTimeout(function() {
            document.getElementById("finished-Page").classList.add("show")
        }, 1100)
    }, 1000)

    var finalTime;

    if(Timer.seconds > 0 && Timer.seconds < 10) {
        Timer.seconds = "0" + Timer.seconds
    }

    if(Timer.minutes > 0 && Timer.minutes < 10) {
        Timer.minutes = "0" + Timer.minutes
    } else if(Timer.minutes == 0) {
        Timer.minutes = "00"
    }

    if(Timer.hours == 0) {
        Timer.hours = "00"
    }
    
    if(Timer.seconds > 0 && Timer.minutes == 0 && Timer.hours == 0) {
        finalTime = Timer.minutes + ":" + Timer.seconds
    }

    if(Timer.minutes > 0 && Timer.hours == 0) {
        finalTime = Timer.minutes + ":" + Timer.seconds
    }

    if(Timer.hours > 0) {
        finalTime = Timer.hours + ":" + Timer.minutes + ":" + Timer.seconds
    }

    document.getElementById("timer").textContent = "Timer: " + finalTime
    document.getElementById("day").textContent = "Day: " + days   
    
    localStorage.setItem("time", finalTime)
    localStorage.setItem("day", days)
    var date3 = new Date()
    localStorage.setItem("date", date3.getDate())


    // .style.animation = "nonumber 1s forwards"

    // .style.animation = "numberEntered 1s forwards"

    // .style.animation = "numberEntered2 1s forwards"
}


document.getElementById("share-Button").addEventListener('click', event => {
    if (navigator.share) {
        navigator.share({
            title: 'Magic Boxes     ' + boxesCorrect + "/9",
            text: shareBox[0] + shareBox[1] + shareBox[2] + "\n" + shareBox[3] + shareBox[4] + shareBox[5] + "\n" + shareBox[6] + shareBox[7] + shareBox[8]
        }).then(() => {
            console.log('Thanks for sharing!');
        })
        .catch(console.error);
    } else {
        // fallback
    }
});