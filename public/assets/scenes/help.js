
export default class Help extends Phaser.Scene {
    constructor() {
      super("Help"); // Nombre de la escena, debe coincidir con el proporcionado en la configuración
    }

    preload() {
        this.load.image("menuayuda", "./public/assets/images/menuayuda.png")

    }

  
    create() {
      // Agregar la imagen 
      this.add.image(400, 300, "menuayuda").setInteractive().on("pointerdown", () => this.scene.start("Menu"));
      };
    }
  