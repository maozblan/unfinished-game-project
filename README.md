# unfinished game project

hello hello, this is an "unfinished" game project for CMPM179

- please insert your game text into `src/game.json`
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
  - dialogue objects MUST have the following two keys: 
    - `narrator` is the name of the narrator
    - `text` is the text to display for that the narrator should talk about
  - choices objects MUST have the following two keys: 
    - `text` is the text to display as a link
    - `link` is the scene key for the scene it should switch to
      - if the scene key is the same as the key for this object, the scene will be rerendered
  - both objects can optionally have the `modifier` key to overwrite or add any modifiers for tht line

for customization, see modifiers below

## currently supported modifiers

NONE. thank you...

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

### additional modifiers

additional modifiers can be applied in a whole game, per-line of dialogue or choice, or per-scene

```js
settings: {
  // additional modifiers that affect the whole game go here
},
scenes: {
  sceneKey: {
    text: [
      {
        modifier: {
          // per-line additional modifiers here
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