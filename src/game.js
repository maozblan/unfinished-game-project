let GAME_SCRIPT = {};
let GAME_SETTINGS = {
  vars: {},
  savedNames: {},
  delay: 0,
};
let currentModifiers = {};
let currentScene = { key: "", load: 0 };

const div = document.getElementById("scene");

document.addEventListener("DOMContentLoaded", async () => {
  loadGameSave();
  const res = await fetch("./src/varTest.json");
  const content = await res.text();
  GAME_SETTINGS = {
    ...GAME_SETTINGS,
    ...JSON.parse(content).settings,
  };
  startGame(JSON.parse(content).scenes);
});

function loadGameSave() {
  // load in local stoage data
}

function startGame(script) {
  GAME_SCRIPT = script;
  loadScene(Object.keys(GAME_SCRIPT)[0]);
}

async function loadScene(key) {
  // track reloads of the same scene
  if (currentScene.key !== key) {
    currentScene = { key, load: 0 };
  } else {
    currentScene.load++;
  }
  const load = currentScene.load;

  // scene rendering
  clearScreen();
  for (const text of GAME_SCRIPT[key].text) {
    applyModifiers(text.modifiers);

    if (
      currentModifiers.RENDER_CONDITION &&
      !condition(currentModifiers.RENDER_CONDITION)
    ) {
      continue;
    applyModifiers(text.modifiers);

    if (
      currentModifiers.RENDER_CONDITION &&
      !condition(currentModifiers.RENDER_CONDITION)
    ) {
      continue;
    }

    await delay((currentModifiers.delay ?? GAME_SETTINGS.delay) * 1000);
    await delay((currentModifiers.delay ?? GAME_SETTINGS.delay) * 1000);

    // if scene has been changed by the time delay is over
    if (key !== currentScene.key || load !== currentScene.load) return;

    if (text.link) {
      div.append(createChoice(text));
    } else {
    } else {
      div.append(createDialogue(text));
    }
  }
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
    setSettingChanges(choice.modifiers);
    setSettingChanges(choice.modifiers);
    loadScene(choice.link);
  });
  return div;
}

// modifier handling ///////////////////////////////////////////////////////////

function applyModifiers(modifiers) {
  if (modifiers === null) currentModifiers = {};
  else currentModifiers = { ...modifiers };
function applyModifiers(modifiers) {
  if (modifiers === null) currentModifiers = {};
  else currentModifiers = { ...modifiers };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
  return new Promise((resolve) => setTimeout(resolve, ms));
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

// applies game setting modifiers
function setSettingChanges(modifiers) {
  if (!modifiers) return;

  apply(modifiers.SET, set);
  apply(modifiers.CHANGE, change);
  apply(modifiers.TOGGLE, toggle);

  function apply(values, func) {
    if (!values) return;
    if (Array.isArray(values[0])) {
      values.forEach((value) => {
        func(...value);
      });
    } else {
      func(...values);
    }
  }

  function set(key, value) {
    GAME_SETTINGS.vars[key] = value;
  }
  function change(key, value) {
    // assume variable = zero if does not exist
    if (!GAME_SETTINGS.vars[key]) GAME_SETTINGS.vars[key] = 0;
    GAME_SETTINGS.vars[key] += value;
  }
  function toggle(key) {
    if (!GAME_SETTINGS.vars[key]) GAME_SETTINGS.vars[key] = false;
    GAME_SETTINGS.vars[key] = !GAME_SETTINGS.vars[key];
  }
}

// applies game setting modifiers
function setSettingChanges(modifiers) {
  if (!modifiers) return;

  apply(modifiers.SET, set);
  apply(modifiers.CHANGE, change);
  apply(modifiers.TOGGLE, toggle);

  function apply(values, func) {
    if (!values) return;
    if (Array.isArray(values[0])) {
      values.forEach((value) => {
        func(...value);
      });
    } else {
      func(...values);
    }
  }

  function set(key, value) {
    GAME_SETTINGS.vars[key] = value;
  }
  function change(key, value) {
    // assume variable = zero if does not exist
    if (!GAME_SETTINGS.vars[key]) GAME_SETTINGS.vars[key] = 0;
    GAME_SETTINGS.vars[key] += value;
  }
  function toggle(key) {
    if (!GAME_SETTINGS.vars[key]) GAME_SETTINGS.vars[key] = false;
    GAME_SETTINGS.vars[key] = !GAME_SETTINGS.vars[key];
  }
}

// utility functions ///////////////////////////////////////////////////////////

function clean(string) {
  return string.replace(/\s/g, "-");
}

function marked(md) {
  return md
    .replace(/[$]([\w]+[-_\d\w]*)/g, (match, p1) => {
      return GAME_SETTINGS.vars[`${p1}`] || '0';
    })
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\_\_(.+?)\_\_/g, "<em>$1</em>")
    .replace(/\~\~(.+?)\~\~/g, "<del>$1</del>")
    .replace(
      /<([\w\-]+?):(.+?)>(.+?)<\/\1>/g,
      `<span style="$1: $2;">$3</span>`
    );
}

// for future iterations if we use node, check out { Parser } from 'expr-eval'
function condition(cond) {
  const wordRegex = /[$]?[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*/g;
  const [ret, params] = parseCondition(cond);
  const func = new Function(params, `return ${ret};`);
  return func(...parseParameters(cond));

  function parseCondition(c) {
    let termCount = 0;
    const terms = new Map();

    const ret = c.replace(wordRegex, (match) => {
      if (match.match(/^\d+$/)) return String.fromCharCode(97 + termCount++);
      if (!terms.has(match)) {
        terms.set(match, String.fromCharCode(97 + termCount++)); // ASCII for 'a' starts from 97
      }
      return terms.get(match);
    });
    return [ret, [...new Set(ret.match(/\w+/g))]];
  }
  function parseParameters(cond) {
    return cond
      .match(wordRegex)
      .filter((varName, index, self) => {
        if (varName.match(/^-?\d{1,3}(?:,\d{3})*(\.\d+)?$/g)) return true;
        if (self.indexOf(varName) !== index) return false;
        return true;
      })
      .map((varName) => {
        if (varName.startsWith("$")) {
          return GAME_SETTINGS.vars[varName.slice(1)];
        }
        return varName;
      });
  }
    .replace(
      /<([\w\-]+?):(.+?)>(.+?)<\/\1>/g,
      `<span style="$1: $2;">$3</span>`
    );
}

// for future iterations if we use node, check out { Parser } from 'expr-eval'
function condition(cond) {
  const wordRegex = /[$]?[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*/g;
  const [ret, params] = parseCondition(cond);
  const func = new Function(params, `return ${ret};`);
  return func(...parseParameters(cond));

  function parseCondition(c) {
    let termCount = 0;
    const terms = new Map();

    const ret = c.replace(wordRegex, (match) => {
      if (match.match(/^\d+$/)) return String.fromCharCode(97 + termCount++);
      if (!terms.has(match)) {
        terms.set(match, String.fromCharCode(97 + termCount++)); // ASCII for 'a' starts from 97
      }
      return terms.get(match);
    });
    return [ret, [...new Set(ret.match(/\w+/g))]];
  }
  function parseParameters(cond) {
    return cond
      .match(wordRegex)
      .filter((varName, index, self) => {
        if (varName.match(/^-?\d{1,3}(?:,\d{3})*(\.\d+)?$/g)) return true;
        if (self.indexOf(varName) !== index) return false;
        return true;
      })
      .map((varName) => {
        if (varName.startsWith("$")) {
          return GAME_SETTINGS.vars[varName.slice(1)];
        }
        return varName;
      });
  }
}
