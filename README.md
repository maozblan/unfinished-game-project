# unfinished game project

hello hello, this is an "unfinished" game project for CMPM179

- to insert dialogue please refer to data.json for reference
- there will be modifers for choices and links added later...

# how to use

inside `src/` you can find the mock game engine we have built for this project in the file `game.js`. 

narrative dialogue is stored `game.json` and will work as long as it follows this format:

```js
{
  settings: {
    // see list of modifiers below
  },
  scenes: {
    // see scene structure below
  }
}
```
## scene structure

scenes should each be it's own object inside the top level scene dictionary, they should have a list of `dialogue` and `choices`. dialogue will just be rendered text while choices are links that take the player to other scenes.

sample format:

```js
// inside scenes: { ... here! }
sceneKey: {
  dialogue: [
    {
      narrator: "narrator name",
      text: "some sample text"
    }
  ],
  choices: [
    {
      text: "click me!",
      link: "scene2"
    }
  ]
},
// more stuff ...
```

elements to note:
- `sceneKey` is the scene key, it can be any string with no spaces, MUST BE UNIQUE
- `dialogue` is a list of dialogue objects, it must have two keys in any order:
  - `narrator` is the name of the narrator
  - `text` is the text to display for that the narrator should talk about
- `choices` is a list of choice objects, it must have two keys in any order:
  - `text` is the text to display as a link
  - `link` is the scene key for the scene it should switch to
    - if the scene key is the same as the key for this object, the scene will be rerendered

for customization, see modifiers below

## currently supported modifiers

NONE. thank you...

### inline modifiers

inline modifiers are anything that you will encode into the value of the `text` key for either a dialogue object or a choice object

```js
dialgoue: [
  {
    text: "inline modifiers go here!",
    ...
  }
],
choice: [
    {
    text: "inline modifiers can also go here!",
    ...
  }
]
```

### additional modifiers

additional modifiers can be applied in a whole game, per-line of dialogue or choice, or per-scene

```js
settings: {
  // additional modifiers that affect the whole game go here
},
scenes: {
  sceneKey: {
    dialgoue: [
      {
        modifier: {
          // per-line additional modifiers here
        },
        ...
      }
    ],
    choice: [
      {
        modifier: {
          // per-line additional modifiers here too
        },
        ...
      }
    ],
    modifier: {
      // per-scene modifiers here!
    }
  }
}
```

# list of things being worked on

add to list to request, mark important ones please

```md
- [ ] minigame support
- [ ] support for modifiers
  - [ ] per line basis modifiers
    - [ ] timer delay
    - [ ] color (HEX)
    - [ ] size
  - [ ] per scene basis modifers
    - [ ] change text size starting from x-dialogue
    - [ ] glitch
    - [ ] SET game settings / IF game settings
- [ ] italics and bold with __ and **
- [ ] typewriter effect
```