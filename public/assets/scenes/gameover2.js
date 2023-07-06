export default class Gameover2 extends Phaser.Scene {
    constructor() {
      super("Gameover2"); 
    }

    preload() {
      this.load.image("menuboton", "./public/assets/images/menuboton.png")
      this.load.image("gameover", "./public/assets/images/gameover.png")
      this.load.image("reintentar", "./public/assets/images/reintentar.png")
      this.load.audio("trumpetfail", "./public/assets/audio/trumpetfail.mp3");


    }
  
    create() {

      // Crear objeto de audio y asignarlo a una variable de la escena
     this.music = this.sound.add("trumpetfail");

     // Reproducir la música
      this.music.play();
  

      // Agregar la imagen
      this.add.image(400, 300, "gameover");


      this.add.image(200, 500, "menuboton").setInteractive().on("pointerdown", () => {
        this.music.stop();
        this.scene.start("Menu");
      });

      this.add.image(600, 500, "reintentar").setInteractive().on("pointerdown", () => {
        this.music.stop();
        this.scene.start("Level2");
      });

  
      };
    }

  