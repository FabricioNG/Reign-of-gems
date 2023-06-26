
export default class Menu extends Phaser.Scene {
    constructor() {
      super("Menu"); 
      this.cinematicVideo = null; // Variable para almacenar el objeto de video
    }

    preload() {
        this.load.image("menu", "./public/assets/images/menu.png")
        this.load.image("jugar", "./public/assets/images/jugar.png")
        this.load.image("ayuda", "./public/assets/images/ayuda.png")
        this.load.video("cinematica", "./public/assets/images/cinematica.mp4")

    }

  
    create() {
      // Agregar la imagen
      this.add.image(400, 300, "menu");

      this.add.image(400, 455, "jugar").setInteractive().on("pointerdown", () => {
        // Cargar el video
        this.cinematicVideo = this.add.video(400, 340, "cinematica").setInteractive().on("pointerdown", () => this.scene.start("Level1"));
        this.cinematicVideo.play();
        
        // Esperar a que termine el video y luego iniciar la escena "Level1"
        this.cinematicVideo.on('complete', () => {
          this.scene.start("Level1");
        });
      });


      this.add.image(400, 520, "ayuda").setInteractive().on("pointerdown", () => this.scene.start("Help"));
      };
    }
  