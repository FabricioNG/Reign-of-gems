import Level1 from "./public/assets/scenes/Level1.js";

import Level2 from "./public/assets/scenes/Level2.js";

import Level3 from "./public/assets/scenes/Level3.js";

import Level4 from "./public/assets/scenes/Level4.js";

import Gameover from "./public/assets/scenes/gameover.js";

import Gameover2 from "./public/assets/scenes/gameover2.js";

import Gameover3 from "./public/assets/scenes/gameover3.js";

import Gameover4 from "./public/assets/scenes/gameover4.js";

import Win from "./public/assets/scenes/youwin.js";

import Menu from "./public/assets/scenes/menu.js";

import Help from "./public/assets/scenes/help.js";

import Final from "./public/assets/scenes/final.js";

import Wintwo from "./public/assets/scenes/youwin2.js";

import Winthree from "./public/assets/scenes/youwin3.js";


// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: false,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Menu, Help, Level1, Gameover, Win, Level2, Wintwo, Gameover2, Level3, Winthree, Gameover3, Level4, Final, Gameover4],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
