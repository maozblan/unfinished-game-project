let GAME_SCRIPT = {};
let GAME_SETTINGS = {
  savedNames: {},
};

const div = document.getElementById("scene");

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
  GAME_SCRIPT[key].text.forEach((text) => {
    if (text.link) {
      div.append(createChoice(text));
    } else {
      div.append(createDialogue(text));
    }
  });
}

function loadMinigame(gameFunc) {
  // load minigame from minigames file
}

// loading scene ///////////////////////////////////////////////////////////////
function clearScreen() {
  div.replaceChildren();
}

function loadDialogue(dialogue) {
  const div = createDialogue(dialogue);
  applyModifiers(dialogue.modifiers, div);
}

function createDialogue(dialogue) {
  const div = document.createElement("div");
  if (Array.isArray(dialogue.text)) {
    div.innerHTML = "";
    dialogue.text.forEach((text) => {
      div.innerHTML += `
        <p class="text">
          ${marked(text)}
        </p>
      `;
    });
  } else {
    div.innerHTML = `
      <p class="text">
        ${marked(dialogue.text)}
      </p>
    `;
  }
  if (dialogue.narrator) {
    div.classList.add("dialogue", clean(dialogue.narrator));
    div.innerHTML =
      `<p class="narrator">
      ${GAME_SETTINGS.savedNames[dialogue.narrator] ?? dialogue.narrator}: 
      </p>` + div.innerHTML;
  }
  return div;
}

function createChoice(choice) {
  const div = document.createElement("div");
  div.classList.add("choice");
  div.innerHTML = `
    <p>${marked(choice.text)}</p>
  `;
  div.addEventListener("click", () => {
    loadScene(choice.link);
  });
  return div;
}

// modifier handling ///////////////////////////////////////////////////////////

function applyModifiers(modifiers, element) {
  if (!modifiers) return;
}

function delay(seconds, callback) {
  setTimeout(() => {
    callback();
  }, seconds * 1000);
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
  document.getElementById("user-defined-styles").innerHTML += `
    ${selector} {
      ${Object.entries(styles)
        .map(([key, value]) => `${key}: ${value};`)
        .join("\n")}
    }
  `;
}

// utility functions ///////////////////////////////////////////////////////////

function clean(string) {
  return string.replace(/\s/g, "-");
}

function marked(md) {
  return md
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\_\_(.+?)\_\_/g, "<em>$1</em>")
    .replace(/\~\~(.+?)\~\~/g, "<del>$1</del>")
    .replace(/<([\w\-]+?):(.+?)>(.+?)<\/\1>/g, `<span style="$1: $2;">$3</span>`);
}
