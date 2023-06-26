export default class Winthree extends Phaser.Scene {
    constructor() {
      super("Winthree"); // Nombre de la escena, debe coincidir con el proporcionado en la configuración
    }

    preload() {
      this.load.image("levelcomplete", "./public/assets/images/levelcomplete.png")
    }
  
    create() {
      // Agregar la imagen de victoria
      this.add.image(400, 300, "levelcomplete").setInteractive().on("pointerdown", () => this.scene.start("Level4"));
  
      };
    }
  
  