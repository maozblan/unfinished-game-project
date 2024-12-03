let GAME_SCRIPT = {};
let GAME_SETTINGS = {
  savedNames: {},
};

const d_div = document.getElementById("narrator-dialogue");
const m_div = document.getElementById("player-task");
const c_div = document.getElementById("player-choices");

document.addEventListener("DOMContentLoaded", async () => {
  loadGameSave();
  const res = await fetch("./src/game.json");
  startGame(JSON.parse(await res.text()).scenes);
});

function loadGameSave() {
  // load in local stoage data
}

function startGame(script) {
  GAME_SCRIPT = script;
  loadScene(Object.keys(GAME_SCRIPT)[0]);
}

function loadScene(key) {
  clearScreen();
  GAME_SCRIPT[key].dialogue.forEach((dialogue) => {
    d_div.append(createDialogue(dialogue));
  });

  GAME_SCRIPT[key].choices.forEach((choice) => {
    c_div.append(createChoice(choice));
  });
}

function loadMinigame(gameFunc) {
  // load minigame from minigames file
}

// utility functions ///////////////////////////////////////////////////////////
function clearScreen() {
  d_div.replaceChildren();
  m_div.replaceChildren();
  c_div.replaceChildren();
}

function createDialogue(dialogue) {
  const div = document.createElement("div");
  div.classList.add("dialogue");
  div.innerHTML = `
    <p>
      ${GAME_SETTINGS.savedNames[dialogue.narrator] ?? dialogue.narrator}: 
      ${dialogue.text}
    </p>
  `;
  return div;
}

function createChoice(choice) {
  const div = document.createElement("div");
  div.classList.add("choice");
  div.innerHTML = `
    <p>${choice.text}</p>
  `;
  div.addEventListener("click", () => {
    loadScene(choice.link);
  });
  return div;
}

function typewrite(text, display, index = 0) {
  if (index < text.length) {
    display.textContent += text[index];
    setTimeout(() => {
      typewrite(text, display, ++index);
    }, 100);
  }
}

function addStyle(selector, styles = {}) {
  const wah = `
    ${selector} {
      ${Object.entries(styles)
        .map(([key, value]) => `${key}: ${value};`)
        .join("\n")}
    }
  `;
  document.getElementById("user-defined-styles").innerHTML += wah;
  console.log(wah);
}
