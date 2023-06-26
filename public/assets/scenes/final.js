
export default class Final extends Phaser.Scene {
    constructor() {
      super("Final"); 
      this.cinematicVideo = null; // Variable para almacenar el objeto de video
    }

    preload() {
        this.load.video("cinematicafinal", "./public/assets/images/cinematicafinal.mp4")

    }

  
    create() {
        // Cargar el video
        this.cinematicVideo = this.add.video(400, 340, "cinematicafinal");
        this.cinematicVideo.play();
        
        // Esperar a que termine el video y luego iniciar la escena "Level1"
        this.cinematicVideo.on('complete', () => {
          this.scene.start("Menu");
        });
      };
      };
    
  