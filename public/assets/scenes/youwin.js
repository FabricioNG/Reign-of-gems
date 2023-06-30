export default class Win extends Phaser.Scene {
  constructor() {
    super("Win"); // Nombre de la escena, debe coincidir con el proporcionado en la configuración
  }

  preload() {
    this.load.image("levelcomplete", "./public/assets/images/levelcomplete.png");
  }

  create() {
    // Agregar la imagen
    const levelCompleteImage = this.add.image(400, 300, "levelcomplete");
    levelCompleteImage.setInteractive();

    // Retardo de unos segundos antes de pasar a la escena "Level2"
    this.time.delayedCall(2500, () => {
      this.scene.start("Level2");
    }, [], this);
  }
}

  
  