//get display and form
const display = document.querySelector(".display");
const form = document.querySelector(".form");
const body = document.querySelector(".body");

//declare user input values
let userHours;
let userMinutes;
let userSeconds;

//declare hr/min/sec to ms conversions
let hours;
let minutes;
let seconds;

//get buttons
const start = document.querySelector(".start");
const pause = document.querySelector(".pause");
const resume = document.querySelector(".resume");
const reset = document.querySelector(".reset");

const pomodoro = document.querySelector(".pomodoro");
const short = document.querySelector(".short");
const long = document.querySelector(".long");

const btns = document.querySelectorAll(".btn");

//decalre variables
let countDown;
let go;

//defaults
pause.style.display = "none";
resume.style.display = "none";

//button functionality
btns.forEach(function(btn){
    btn.addEventListener("click", function(e) {
        let button = e.currentTarget.classList;
        if (button.contains("start")) {
            countDown = new Date().getTime(); //time in ms since 1970
            go = setInterval(x, 1000);
            start.style.display = "none";
            pause.style.display = "inline";
            resume.style.display = "none";
            rndmColor();
            if (document.querySelector(".minute").value != 5) {
                short.classList.remove("current");
            }
            if (document.querySelector(".minute").value != 10) {
                long.classList.remove("current");
            }
            if (document.querySelector(".minute").value != 50) {
                pomodoro.classList.remove("current");
            }
        }
        if (button.contains("pause")) {
            clearInterval(go);
            document.querySelector(".hour").value = hours;
            if (document.querySelector(".hour").value < 0) {
                document.querySelector(".hour").value = 0;
            }
            document.querySelector(".minute").value = minutes;
            if (document.querySelector(".minute").value < 0) {
                document.querySelector(".minute").value = 0;
            }
            document.querySelector(".second").value = seconds;
            if (document.querySelector(".second").value < 0) {
                document.querySelector(".second").value = 0;
            }
            start.style.display = "inline"
            pause.style.display = "none";
            resume.style.display = "inline";
            rndmColor();
            if (document.querySelector(".second").value === "undefined") {
                document.querySelector(".second").value = 0;
            }

        }
        if (button.contains("resume")) {
            countDown = new Date().getTime()
            go = setInterval(x, 1000);
            start.style.display = "none";
            pause.style.display = "inline";
            resume.style.display = "none";
            rndmColor();
            // if (display.textContent === "00:00") {
            //     clearInterval(go);
            // }
        }
        if (button.contains("reset")) {
            location.reload();
        }
        if (button.contains("pomodoro")) {
            clearInterval(go);
            document.querySelector(".hour").value = "00";
            document.querySelector(".minute").value = 50;
            document.querySelector(".second").value = "00";
            countDown = new Date().getTime()
            display.textContent = "00" + ":" + 50 + ":" + "00";
            pause.style.display = "none";
            start.style.display = "inline";
            resume.style.display = "none";
            rndmColor();
            pomodoro.classList.add("current");
            short.classList.remove("current");
            long.classList.remove("current");
        }
        if (button.contains("short")) {
            clearInterval(go);
            document.querySelector(".hour").value = "00";
            document.querySelector(".minute").value = "05";
            document.querySelector(".second").value = "00";
            countDown = new Date().getTime()
            display.textContent = "00" + ":" + "05" + ":" + "00";
            pause.style.display = "none";
            start.style.display = "inline";
            resume.style.display = "none";
            rndmColor();
            button.toggle("current");
            pomodoro.classList.remove("current");
            short.classList.add("current");
            long.classList.remove("current");
        }
        if (button.contains("long")) {
            clearInterval(go);
            document.querySelector(".hour").value = "00";
            document.querySelector(".minute").value = 10;
            document.querySelector(".second").value = "00";
            countDown = new Date().getTime()
            display.textContent = "00" + ":" + 10 + ":" + "00";
            pause.style.display = "none";
            start.style.display = "inline";
            resume.style.display = "none";
            rndmColor();
            button.toggle("current");
            pomodoro.classList.remove("current");
            short.classList.remove("current");
            long.classList.add("current");
        }
    })
});

// hr-min-s to milliseconds converter
function milli(a, b, c) {
    let sum = ((a*60*60*1000)+(b*60*1000)+(c*1000));
    return sum;
}

//callback function for setInterval function
function x () {
    userHours = document.querySelector(".hour").value;
    userMinutes = document.querySelector(".minute").value;
    userSeconds = document.querySelector(".second").value;
    let milliseconds = milli(userHours, userMinutes, userSeconds); //converts hr/min/sec into ms
    let newCountDown = countDown + milliseconds; //time since 1970 in ms + converted hr/min/sec
    let now = new Date().getTime(); //time since 1970 in ms
    let difference = newCountDown - now;
    hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((difference % (1000 * 60)) / 1000);
    if (display.textContent === "00:00:01") {
        let audio = new Audio(randomAlarm());
        audio.play();
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    let displayTime  = display.textContent = hours + ":" + minutes + ":" + seconds;
    displayTime;
    if (difference < 0) {
        display.textContent = "00" + ":" + "00" + ":" + "00";
        start.style.display = "inline"
        pause.style.display = "none";
        clearInterval(x);
        start.style.display = "none";
        document.title = display.textContent;
        //alert("Time's up!");
        userHours.setAttribute("disabled", "");
        userMinutes.setAttribute("disabled", "");
        userSeconds.setAttribute("disabled", "");
        userMinutes = document.querySelector(".minute").value;
        userSeconds = document.querySelector(".second").value;
        }
    document.title = displayTime;
    if (hours < 1) {
        document.title = minutes + ":" + seconds;
    }
}

//random number generator for rgb funcion
function rndmNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//rgb function
function rndmColor() {
    const x = rndmNum(0, 255);
    const y = rndmNum(0, 255);
    const z = rndmNum(0, 255);
    let color = `rgb(${x}, ${y}, ${z})`;
    body.style.backgroundColor = color;
}

//picks a random alarm sound
function randomAlarm() {
    let num = rndmNum(0,2);
    let alarm = alarms[num].name;
    return alarm;
}

//list of alarm sounds
alarms = [
    {
        name: "Bad Drugs_intro.mp3",
    },
    {
        name: "Dreaming At The Function_intro.mp3",
    },
    {
        name: "life_intro.mp3",
    },
]
