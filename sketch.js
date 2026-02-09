let wordData;
let currentWave = 0;
let words = [];
let isPaused = false; //State for checking if game is paused
let isGameOver = false;

function preload() {
  wordData = loadJSON("words.json");
}

function setup() {
  createCanvas(600, 400);
  loadWave(currentWave);
}

//Create word for specific wave
function loadWave(waveIndex) {
  words = [];
  let wave = wordData.waves[waveIndex];

  //create each word using a loop
  for (let i = 0; i < wave.length; i++) {
    words.push({
      text: wave[i],
      x: random(50, width - 50),
      y: -i * 40,
      speed: 1 + waveIndex,
    });
  }
}

function draw() {
  background(30);

  //stop game if paused
  if (isPaused) {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255);
    text("PAUSED", width / 2, height / 2);
    return;
  }

  fill(255);
  textSize(30);

  for (let word of words) {
    word.y += word.speed;
    text(word.text, word.x - 50, word.y);

    // lose condition
    if (word.y > height) {
      gameOver();
    }
  }
}

//ends game
function gameOver() {
  isGameOver = true;
  noLoop();
  updateStatus("Game Over — Press R to Restart");
}

//restart game back to first wave
function resetGame() {
  currentWave = 0;
  isGameOver = false;
  isPaused = false;
  loadWave(currentWave);
  loop();
  updateStatus("Game Running");
}

function keyTyped() {
  //check words from first to last
  for (let i = words.length - 1; i >= 0; i--) {
    if (words[i].text[0] === key) {
      words[i].text = words[i].text.substring(1);

      //removes word if fully typed
      if (words[i].text.length === 0) {
        words.splice(i, 1);
      }
      break;
    }
  }

  // next wave
  if (words.length === 0) {
    currentWave++;
    if (currentWave < wordData.waves.length) {
      loadWave(currentWave);
    }
  }
}

//Pauses and restart controls
function keyPressed() {
  if (key === " ") {
    isPaused = !isPaused;
    updateStatus(isPaused ? "Paused" : "Game Running");
  }
}

function keyPressed() {
  if (key === " ") {
    isPaused = !isPaused;
    updateStatus(isPaused ? "Paused" : "Game Running");
  }

  if (key === "r" || key === "R") {
    resetGame();
  }
}
