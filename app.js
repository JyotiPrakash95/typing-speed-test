
const sentences = {
  testText: [
    `Click. Let’s play the movie of the night. Scene 1. I was walking down the street towards a tall, grey building that didn't seem to have any doors. I heard an irritating beeping noise from behind and my head turned. My eyesight blurred and I felt myself fall backwards.`,
    `When I came to my senses I realized that I had no control over my body. It was as if I was in another person’s body physically but my soul and brain were still accustomed.`,
    `I felt the body get up and start to walk. Where was I heading before? My brain was blank, but I realized that there was something suspiciously wrong and different `,
    `I have lived in only one location my entire life: Edwardsville, Illinois. A peripheral suburb of St. Louis, it stands as the rare oasis of people in a desert of corn, pinned in its own personal bubble. Due to this blend of time and isolation, I developed a natural familiarity with my hometown. But, throughout my childhood, I longed to break free from the confines of the bubble and venture outward.`,
  ],
};
let currentSentenceIndex = 0;
let startTime, endTime;
let timerInterval;

const sentenceElement = document.getElementById("sentence");
const inputElement = document.getElementById("input");
const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer");
const speedElement = document.getElementById("speed");
const accuracyElement = document.getElementById("accuracy");
const resultElement = document.getElementById("result");
const retryButton = document.getElementById("retry-btn");

function getRandom(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function startTest() {
  sentenceElement.innerHTML = getRandom(sentences.testText);;
  inputElement.value = "";
  inputElement.disabled = false;
  inputElement.focus();
  startButton.disabled = true;
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);
  setTimeout(endTest, 30000); // End the test after 30 seconds
}

function updateTimer() {
  const currentTime = new Date();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  const remainingTime = 30 - elapsedTime;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function endTest() {
  clearInterval(timerInterval);
  endTime = new Date();
  const elapsedTime = Math.floor((endTime - startTime) / 1000);
  const typedSentence = inputElement.value.trim();
  const correctSentence = sentenceElement.textContent.trim();

  let speed = 0;
  let typedWords = [];
  if (typedSentence != "") {
    typedWords = typedSentence.split(" ");
  }

  const correctWords = correctSentence.split(" ");
  console.log(correctWords);
  let correctCount = 0;
  let ind = 0;
  typedWords.forEach((word, index) => {
    if (word === correctWords[index]) {
      correctCount++;
      ind = index;
    }
  });
  if (typedSentence != "") {
    speed = Math.floor((correctCount / 30) * 60);
  }
  const accuracy = (correctCount / correctWords.length) * 100;
  speedElement.textContent = speed;
  accuracyElement.textContent = accuracy.toFixed(2);
  resultElement.style.display = "block";
  retryButton.focus();
}

startButton.addEventListener("click", startTest);

retryButton.addEventListener("click", () => {
  resultElement.style.display = "none";
  startButton.disabled = false;
  inputElement.value = "";
  accuracyElement.textContent = "";
  speedElement.textContent = "";
  sentenceElement.textContent = "";
});
