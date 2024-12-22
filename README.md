# unfinished game project

hello hello, this is an "unfinished" game project for CMPM179 (experimental gameplay taught by prof wes modes)

# how to use

for development mode, download the repo and run `npm install` and `npm run dev` to start

all narrative work will be found inside the `narrative` folder, split into two files:
- `settings.json` holds all the settings that apply to the full game, see modifiers section to see what keys should go in here
  - all keys should be a valid modifier or else will be ignored
- `scenes.json` holds all the narrative scenes that will display for the game

## scene structure

scenes should each be it's own object inside the top level scene dictionary, they should have a list of `dialogue` and `choices`. dialogue will just be rendered text while choices are links that take the player to other scenes.

sample format:

```js
sceneKey: {
  text: [
    // this is plain text
    {
      narrator: "narrator name",
      text: "some sample text"
    },
    // this is a link
    {
      text: "click me!",
      link: "scene2"
    }
  ],
  modifiers: {
    // add scene-based modifiers here!
  }
},
// more stuff ...
```

elements to note:
- `sceneKey` is the scene key, it can be any string with no spaces, MUST BE UNIQUE
  - the scene object must contain a `text` object; the `modifiers` object is optional
- `text` is a list of dialogue or choice objects:
  - dialogue objects mostly will have the following keys: 
    - `text` is the text to display (MUST HAVE)
    - `narrator` is the name of the narrator (optional key)
      - if there is a narrator, the text will be displayed after the narrator
  - choices objects MUST have the following two keys: 
    - `text` is the text to display as a link
    - `link` is the scene key for the scene it should switch to
      - if the scene key is the same as the key for this object, the scene will be rerendered
  - both objects can optionally have the `modifiers` key to overwrite or add any modifiers for tht line
  - you can optionally add your own keys that are not any of the listed above for sake of organization

for customization, see modifiers below

## currently supported modifiers

### inline modifiers

inline modifiers are anything that you will encode into the value of the `text` key for either a dialogue object or a choice object

```js
sceneKey: {
  text: [
    {
      text: "inline modifiers go here!",
      ...
    }
  ]
}
```

#### text formatting

simple markdown:
format | how to use | display
:--: | :-- | :-- 
bold | `**sample text**` | <strong>sample text</strong>
italics | `__sample text__` | <em>sample text</em>
strikethrough | `~~sample text~~` | <del>sample text</del>

CSS styling is also available, use `<PROPERTY:VALUE>text</PROPERTY>`; below are some examples
format | how to use | display
:--: | :-- | :-- 
color | `<color:red>sample text</color>` | <span style="color: red;">sample text</span>
size | `<font-size:8px>sample text</font-size>` | <span style="font-size:8px;">sample text</span>
font | `<font-family:monospace>sample text</font-family>` | <span style="font-family:monospace;">sample text</span>

you can also use game variables (SEE MODIFIERS SECTION ON HOW TO SET THEM)
- use `$variableName` in your text anywhere
  - ex. `text: "variableName has the value $variableName"`
  - if the variable by variableName does not exist, it returns `UNDEFINED`

### additional modifiers

additional modifiers can be applied in a whole game, per-line of dialogue or choice, or per-scene

```js
// inside settings.json
{
  // modifiers that affect the whole game go here
}

// inside scenes.json
sceneKey: {
  text: [
    {
      modifiers: {
        // per-line additional modifiers here
      },
      ...
    }
  ],
  modifiers: {
    // per-scene modifiers here!
  }
}
```

setting any modifier in `settings.json` will automatically apply it to all lines and scenes. please check the usability row to see if the modifier is available in settings, scenes, lines, or all

**PLEASE NOTE**: using the same modifier key again will overwrite the previous setting for how long that modifier lasts, the priority is line > scene > settings

for example: using `delay: 0.5` inside scenes will overwrite the setting value for `delay` until the scene is over

### general modifiers

modifier key | modifier value | description | usability
:-- | :-- | :-- | :-- 
overwrite | dictionary of modifiers | any modifier value in the settings you want to overwrite | scenes, lines
delay | number in seconds | delays message for x number of seconds (messages are displayed sequentially) | all
styles | dictionary of css inputs (see below) | adds css in a basic css form | settings, overwrites

#### styles

value format: 
```js
styles: {
  selector: {
    property: value,
    property: value
  }
}
```

sample: 
```js
styles: {
  ".class": {
    "background-color": "#abcdef"
  },
  "body": {
    "color": "rgb(178, 71, 80)";
  }
}
```

preset keys:

keys for dialogue:
- all text under the `text` key are tagged with `.text`
- all text is that has a narrator will be encased in a parent block tagged with `.dialogue` and narrator name
  - individual narrative blocks are tagged with narrator name as class, ex. narrator A's blocks will be tagged with `.A`, any spaces will be replaced with hyphens
- all choices with links are tagged with `.choice`


keys for windows:
currently the window style are automatically applied, if you do not want it, delete everything inside the `style/window.css` file

windows are id-ed by minigame function name, the game where the narrative structure is id-ed `main` and can be accessed by `#main.window`, it's content can be accessed by `#main.window .content` or `#scene.content`

selectors for ALL windows
- `.window` selector for fake window tabs
- `.window .content` box where tab content displays
- `.window .tab` top bar of windows

#### variables
modifier key | modifier value | description | usability
:-- | :-- | :-- | :-- 
SET | `[string variable name, any value (number, string, boolean)]` | a list of variables to set, if you want to multiple variables, include a list of lists | scene, line
CHANGE | `[string variable name, increment]` | a list of variables to change, if you want to multiple variables, include a list of lists | scene, line
TOGGLE | `[string variable name]` | toggles the boolean variable (T -> F, F -> T) | scene, line
RENDER_CONDITION | a text conditional that must return true false | only renders if conditional returns true | scene, line

IMPORTANT NOTES:
- variable names CANNOT start with underscores, hyphens, or numbers
- variable names CANNOT include spaces
- variable names can include characters, underscores, hypens, or numbers

GENERAL NOTES:
- SET can overwrite variables by the same name
- CHANGE should only be given number type variables
  - CHANGE-ing an unset variable sets it to 0 + increment
- TOGGLE should only be given boolean type variables
  - TOGGLE-ing an unset variable
- RENDER_CONDITION uses standard JS operators (ex. <=, &&)

samples:
```js
modifiers: {
  SET: ['varName', 2], // setting an integer
  CHANGE: ['varName', -1], // use negative numbers to decrement
}
...
modifiers: {
  SET: [['numVar', 2.4], ['boolVar', false]], // setting multiple variables at once
  TOGGLE: ['boolVar'], // toggle sample
  RENDER_CONDITION: "$numVar >= 2" // use $ to call variables
}
```

# list of things being worked on

add to list to request, mark important ones please

```md
- [ ] minigame support
- support for modifiers:
  - per line basis modifiers
    - [x] timer delay
    - [x] color (HEX)
    - [x] size
  - per scene basis modifers
    - [ ] change text size starting from x-dialogue
    - [ ] glitch
    - [x] SET game settings / IF game settings
  - [x] italics and bold with __ and **
  - [ ] typewriter effect
  - [x] be able to go dialog, choice, dialog etc. in the same scene
```