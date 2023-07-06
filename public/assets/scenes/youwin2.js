export default class Wintwo extends Phaser.Scene {
  constructor() {
    super("Wintwo"); 
  }

  preload() {
    this.load.image("levelcomplete", "./public/assets/images/levelcomplete.png");
  }

  create() {

    // Crear objeto de audio y asignarlo a una variable de la escena
  this.music = this.sound.add("trumpetvictory");

  // Reproducir la música
  this.music.play();

    // Agregar la imagen
    const levelCompleteImage = this.add.image(400, 300, "levelcomplete");
    levelCompleteImage.setInteractive();

    // Retardo de unos segundos antes de pasar a la escena "Level3"
    this.time.delayedCall(4650, () => {
      this.scene.start("Level3");
    }, [], this);
  }
}

  
  