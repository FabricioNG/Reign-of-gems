
export default class Menu extends Phaser.Scene {
    constructor() {
      super("Menu"); // Nombre de la escena, debe coincidir con el proporcionado en la configuración
    }

    preload() {
        this.load.image("menu", "./public/assets/images/menu.png")
        this.load.image("jugar", "./public/assets/images/jugar.png")
        this.load.image("ayuda", "./public/assets/images/ayuda.png")

    }

  
    create() {
      // Agregar la imagen de victoria
      this.add.image(400, 300, "menu");

      this.add.image(400, 450, "jugar").setInteractive().on("pointerdown", () => this.scene.start("Level1"));


      this.add.image(400, 500, "ayuda");

  
      // Agregar eventos o acciones que ocurran en la escena de victoria
      // Por ejemplo, puedes reiniciar el juego o pasar al siguiente nivel
  
      // Ejemplo: Reiniciar el juego al hacer clic en la pantalla
      this.input.on("pointerup", () => {
        this.scene.start("Juego"); // Reinicia la escena principal del juego (Juego en este ejemplo)
      });
    }
  }