export default class Winthree extends Phaser.Scene {
  constructor() {
    super("Winthree"); // Nombre de la escena, debe coincidir con el proporcionado en la configuración
  }

  preload() {
    this.load.image("levelcomplete", "./public/assets/images/levelcomplete.png");
  }

  create() {
    // Agregar la imagen de victoria
    const levelCompleteImage = this.add.image(400, 300, "levelcomplete");
    levelCompleteImage.setInteractive();

    // Retardo de unos segundos antes de pasar a la escena "Level4"
    this.time.delayedCall(2500, () => {
      this.scene.start("Level4");
    }, [], this);
  }
}

  
  