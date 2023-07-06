export default class Winthree extends Phaser.Scene {
  constructor() {
    super("Winthree"); 
  }

  preload() {
    this.load.image("levelcomplete", "./public/assets/images/levelcomplete.png");
  }

  create() {

    // Crear objeto de audio y asignarlo a una variable de la escena
  this.music = this.sound.add("trumpetvictory");

  // Reproducir la música
  this.music.play();

    // Agregar la imagen de victoria
    const levelCompleteImage = this.add.image(400, 300, "levelcomplete");
    levelCompleteImage.setInteractive();

    // Retardo de unos segundos antes de pasar a la escena "Level4"
    this.time.delayedCall(4650, () => {
      this.scene.start("Level4");
    }, [], this);
  }
}

  
  