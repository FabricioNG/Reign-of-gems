export default class Gameover4 extends Phaser.Scene {
    constructor() {
      super("Gameover4"); // Nombre de la escena, debe coincidir con el proporcionado en la configuración
    }

    preload() {
      this.load.image("menuboton", "./public/assets/images/menuboton.png")
      this.load.image("gameover", "./public/assets/images/gameover.png")
      this.load.image("reintentar", "./public/assets/images/reintentar.png")


    }
  
    create() {
      // Agregar la imagen
      this.add.image(400, 300, "gameover");


      this.add.image(200, 500, "menuboton").setInteractive().on("pointerdown", () => this.scene.start("Menu"));

      this.add.image(600, 500, "reintentar").setInteractive().on("pointerdown", () => this.scene.start("Level4"));

  
      };
    }

  