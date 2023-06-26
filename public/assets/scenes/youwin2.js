export default class Wintwo extends Phaser.Scene {
    constructor() {
      super("Wintwo"); // Nombre de la escena, debe coincidir con el proporcionado en la configuración
    }

    preload() {
      this.load.image("levelcomplete", "./public/assets/images/levelcomplete.png")
    }
  
    create() {
      // Agregar la imagen 
      this.add.image(400, 300, "levelcomplete").setInteractive().on("pointerdown", () => this.scene.start("Level3"));

      };
    }
  
  