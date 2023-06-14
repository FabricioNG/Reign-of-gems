import Level1 from "./public/assets/scenes/Level1.js";

import Gameover from "./public/assets/scenes/gameover.js";

import Win from "./public/assets/scenes/youwin.js";

import Menu from "./public/assets/scenes/menu.js";




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
  scene: [Menu, Level1, Gameover, Win],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
