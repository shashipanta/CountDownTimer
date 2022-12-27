let activeColor = "white";
let passiveColor = "rgba(239, 239, 239, 0.08)";
let hourElement = document.getElementById("hour");
let minElement = document.getElementById("minutes");
let secElement = document.getElementById("second");
let anyaImg = document.getElementById("timerImg");
let countComplete = false;

let timerInterval = null;

let hourInput, minInput, secInput, totalSeconds;
let seconds, hours, minutes;

let startTimer = (e) => {
  hourInput = parseInt(document.getElementById("hourInput").value) || 0;
  minInput = parseInt(document.getElementById("minInput").value) || 0;
  secInput = parseInt(document.getElementById("secInput").value) || 0;
  totalSeconds =
    hourInput * maxValue * maxValue + minInput * maxValue + secInput;
  console.log(totalSeconds);

  hours = Math.floor(totalSeconds / maxValue / maxValue);
  minutes = Math.floor(totalSeconds / maxValue) - hours * maxValue;
  seconds = secInput;
  // if (maxValue > secInput && hourInput == 0 && minInput == 0)
  //   seconds = secInput;
  // else seconds = maxValue;

  // initialize the timer
  if (timerInterval == null) timerInterval = setInterval(countDownTimer, 1000);
};

let initialTimer = () => {
  initializeDigits(0, hourElement);
  initializeDigits(0, minElement);
  initializeDigits(0, secElement);
};

let stopTimer = (e) => {
  console.log("timer stopped");
  clearInterval(timerInterval);
  timerInterval = null;
  timerStops(hourElement);
  timerStops(minElement);
  timerStops(secElement);

  initialTimer();
};

let startTimerBtn = document.getElementById("start");
let stopTimerBtn = document.getElementById("stop");

let inputSeconds = 5;
let inputMinutes = 02;
let inputHour = 1;
let maxValue = 60;

startTimerBtn.addEventListener("click", startTimer);
stopTimerBtn.addEventListener("click", stopTimer);

let sevenSegmentRule = [
  [0, 1, 2, 4, 5, 6],
  [2, 5],
  [0, 2, 3, 4, 6],
  [0, 2, 3, 5, 6],
  [1, 3, 2, 5],
  [0, 1, 3, 5, 6],
  [0, 1, 4, 6, 5, 3],
  [0, 2, 5],
  [0, 1, 2, 3, 4, 5, 6],
  [0, 1, 2, 3, 5, 6],
];

// generate number
let generateNumber = (num, htmlElement, type) => {
  /* type a: active type p: passive type */
  segmentsArr = Array.from(htmlElement.getElementsByClassName("seg"));
  let rule = sevenSegmentRule[num];

  console.log(rule);
  if (type === "a") {
    for (let i = 0; i < segmentsArr.length; i++) {
      if (rule.includes(i)) {
        segmentsArr[i].style.backgroundColor = activeColor;
      } else {
        segmentsArr[i].style.backgroundColor = passiveColor;
      }
    }
  } else {
    // this is for passive number
    for (let i = 0; i < segmentsArr.length; i++) {
      segmentsArr[i].style.backgroundColor = passiveColor;
    }
  }
};

let timerStops = (htmlElement) => {
  htmlElemArr = Array.from(htmlElement.getElementsByClassName("seg"));

  for (let i = 0; i < htmlElemArr.length; i++) {
    if (htmlElemArr[i].classList.contains("timer__stops")) {
      htmlElemArr[i].classList.remove("timer__stops");
      anyaImg.classList.remove("reveal");
    } else {
      htmlElemArr[i].classList.add("timer__stops");
      anyaImg.classList.add("reveal");
    }
  }
};

let initializeDigits = (inputTime, htmlElement) => {
  console.log(`Input time ${inputTime}`);
  // calculate the upper and lower portion of htmlElement
  elementUpper = htmlElement.firstElementChild;
  elementLower = htmlElement.lastElementChild;

  let lowerDigit = inputTime % 10;
  let upperDigit = Math.floor(inputTime / 10) % 10;
  console.log(`upper: ${upperDigit} lower: ${lowerDigit}`);

  if (upperDigit == 0 && lowerDigit != 0) {
    generateNumber(upperDigit, elementUpper, "p");
    generateNumber(lowerDigit, elementLower, "a");
  } else if (
    lowerDigit == 0 &&
    upperDigit == 0 &&
    (inputHour != 0 || inputMinutes != 0)
  ) {
    generateNumber(upperDigit, elementUpper, "a");
    generateNumber(lowerDigit, elementLower, "a");
  } else if (lowerDigit == 0 && upperDigit == 0) {
    generateNumber(upperDigit, elementUpper, "p");
    generateNumber(lowerDigit, elementLower, "p");
  } else {
    generateNumber(lowerDigit, elementLower, "a");
    generateNumber(upperDigit, elementUpper, "a");
  }
};

let clearCountDown = () => {
  timerStops(secElement);
  timerStops(minElement);
  timerStops(hourElement);
  console.log("hello");
  clearInterval(timerInterval);
};

let timer = () => {
  if (inputSeconds == 1) {
    // decrease minutes
    if (inputMinutes == 1) {
      if (inputHour == 0) {
        countComplete = true;
        clearCountDown(countComplete);
      } else {
        inputHour--;
        initializeDigits(inputHour, hourElement);
        inputMinutes = maxValue;
        initializeDigits(inputMinutes, minElement);
      }
    } else {
      inputMinutes--;
      initializeDigits(inputMinutes, minElement);
      inputSeconds = maxValue;
      initializeDigits(inputSeconds, secElement);
    }
  } else {
    inputSeconds--;
    initializeDigits(inputSeconds, secElement);
  }
};

// let timerInterval = setInterval(timer, 1000);

// setTimeout(timer, 1000);

let countDownTimer = () => {
  // if (seconds <= 0 && hours == 0 && minutes == 0) {
  //   console.log("timer completed");
  //   clearInterval(timerInterval);
  // }

  // if (seconds == 0 && minutes != 0) {
  //   if(minutes == 0)
  //   minutes--;
  //   seconds = maxValue;
  // } else if (seconds == 0 && minutes == 0) {
  //   if (hours != 0) {
  //     hours--;
  //     seconds = maxValue;
  //     minutes = maxValue - 1;
  //   }
  // }

  if (seconds == 0) {
    if (minutes == 0) {
      if (hours == 0) {
        timerStops(hourElement);
        timerStops(minElement);
        timerStops(secElement);
        clearInterval(timerInterval);
      } else {
        hours--;
        minutes = maxValue - 1;
        seconds = maxValue - 1;
      }
    } else {
      minutes--;
      seconds = maxValue - 1;
    }
  } else {
    seconds--;
  }
  initializeDigits(seconds, secElement);
  initializeDigits(minutes, minElement);
  initializeDigits(hours, hourElement);
};

initialTimer();
