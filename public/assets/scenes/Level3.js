// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

// Pause state
let isPaused = false;

export default class Level3 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("Level3");
  }

  preload() {
    // load assets
    this.load.tilemapTiledJSON("map3", "./public/tilemaps/level3.json");
    this.load.image("tileBackground", "./public/assets/images/sky.png");
    this.load.image("tilePlatform", "./public/assets/images/platform.png");
    this.load.image("gemred", "./public/assets/images/gemred.png");
    this.load.image("gameover", "./public/assets/images/gameover.png");
    this.load.image("spikes", "./public/assets/images/spike.png");

   // this.load.spritesheet("enemy", "./public/assets/images/enemy.png", {
     // frameWidth: 32,
      //frameHeight: 48,
    //});
    

    this.load.spritesheet("dude", "./public/assets/images/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    //animaciones del enemigo

   // this.anims.create({
     // key: "enemy-left",
     // frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 1 }),
     // frameRate: 3,
     // repeat: -1,
    //});
    
    //this.anims.create({
     // key: "enemy-right",
     // frames: this.anims.generateFrameNumbers("enemy", { start: 1, end: 0 }),
     // frameRate: 3,
      //repeat: -1,
    //});
    

    const map3 = this.make.tilemap({ key: "map3" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const layBackground = map3.addTilesetImage("sky", "tileBackground");
    const layPlatform = map3.addTilesetImage("platform", "tilePlatform");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const BackgroundLayer = map3.createLayer("background", layBackground, 0, 0);
    const platformLayer = map3.createLayer("platform", layPlatform, 0, 0);
    const objectsLayer = map3.getObjectLayer("objects");

    platformLayer.setCollisionByProperty({ colision: true });

    //enemigo
   // const spawnPointEnemy = map3.findObject(
    //  "objects",
     // (obj) => obj.name === "enemy"
    //);
    //this.enemy = this.physics.add.sprite(
    //  spawnPointEnemy.x,
     // spawnPointEnemy.y,
     // "enemy"
    //);
    //this.enemy.setCollideWorldBounds(true);

    // Ajustar la hitbox del enemigo
  //this.enemy.body.setSize(35, 35);

  
  const spawnPointsSpikes = map3.filterObjects("objects", (obj) => obj.name === "spikes");
  this.spike = this.physics.add.group(); // Crea un grupo para los spikes
  
  spawnPointsSpikes.forEach((spawnPoint) => {
    const spike = this.spike.create(spawnPoint.x, spawnPoint.y, "spikes");
    this.physics.add.collider(spike, platformLayer); // Establece la colisión para cada spike
  });

  this.spike.getChildren().forEach((spike) => {
    spike.body.setSize(55, 32);
  });
  
    
    // Agregar colisión entre el enemigo y la capa de plataformas
   // this.physics.add.collider(this.enemy, platformLayer);

    // crear el jugador
    // Find in the Object Layer, the name "dude" and get position
    let spawnPoint = map3.findObject("objects", (obj) => obj.name === "player");
    // The player and its settings
    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);

    // Obtener la capa de fondo del mapa
    this.physics.world.setBounds(0, 0, map3.widthInPixels, map3.heightInPixels);

    // Establecer los límites de la cámara según el tamaño de la capa de fondo
    this.cameras.main.setBounds(
      0,
      0,
      layBackground.width,
      layBackground.height
    );

    // Hacer que la cámara siga al jugador
    this.cameras.main.startFollow(this.player);

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

 
  let blurryImage;

  // Función para pausar el juego
  function pauseGame() {
    isPaused = true;
    this.physics.pause();
    this.anims.pauseAll();

    // Agregar la imagen de desenfoque a la escena
    blurryImage = this.add.image(0, 0, 'blurry').setOrigin(0);
    blurryImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height + 200);
    blurryImage.setScrollFactor(0); // Para que la imagen no se mueva con la cámara
    blurryImage.depth = 9999; // Asegurarse de que la imagen esté en la capa superior
  }

  // Función para reanudar el juego
  function resumeGame() {
    isPaused = false;
    this.physics.resume();
    this.anims.resumeAll();

    // Quitar la imagen de desenfoque de la escena
    blurryImage.destroy();
  }

  // Evento para pausar y reanudar el juego al presionar la tecla "P"
  this.input.keyboard.on('keydown-P', function (event) {
    if (event.repeat) return; // Evitar que el evento se repita si la tecla se mantiene presionada
    if (!isPaused) {
      pauseGame.call(this);
    } else {
      resumeGame.call(this);
    }
  }, this);

    // Create empty group of starts
    this.gems = this.physics.add.group();

    // find object layer
    // if type is "gems", add to gems group
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "gemred": {
          // add gem to scene
          const gems = this.gems.create(x, y, "gemred");
          gems.body.immovable = true; // Make the gem immovable
          break;
        }
      }
    });

    this.physics.add.collider(this.player, platformLayer);
    this.physics.add.collider(this.gems, platformLayer);
    this.physics.add.collider(
      this.player,
      this.gems,
      this.recolectgem,
      null,
      this
    );

    //agregar pantalla game over
    this.physics.add.collider(
      this.player,
      this.spike,
      this.gameOver,
      null,
      this
    );


    //agregar pantalla game over
   // this.physics.add.collider(
    //  this.player,
     // this.enemy,
    //  this.gameOver,
     // null,
     // this
    //);

    //para pasar al siguiente nivel
    this.physics.add.collider(
      this.player,
      this.gems,
      this.collectGem,
      null,
      this
    );
  }

  collectGem(player, gem) {
    gem.disableBody(true, true); // Desactiva la gema y la elimina del juego
    if (this.gems.countActive(true) === 0) {
      this.scene.start("Winthree"); // Cambia a la escena del nivel 2 cuando se hayan recolectado todas las gemas
    }
  }

  gameOver() {
    this.scene.start("Gameover3"); // Cambia a la escena de Game Over
  }

  update() {
    // update game objects
    // check input
    //move left
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    }
    //move right
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    }
    //stop
    else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    //jump
    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-170);
    }

    // Mover al enemigo de izquierda a derecha
 // if (this.enemy.body.velocity.x === 0) {
    // Establecer la velocidad inicial del enemigo
   // this.enemy.setVelocityX(100); // Ajusta la velocidad según tus necesidades
  //}

  // Cambiar la dirección del enemigo cuando alcanza los límites del mundo
 // if (this.enemy.body.blocked.right) {
   // this.enemy.setVelocityX(-100); // Cambia la dirección hacia la izquierda
  //} else if (this.enemy.body.blocked.left) {
   // this.enemy.setVelocityX(100); // Cambia la dirección hacia la derecha
  //}

  //  if (this.enemy.body.velocity.x > 0) {
   //   this.enemy.anims.play("enemy-right", true);
   // } else {
    //  this.enemy.anims.play("enemy-left", true);
   // }
    
   // if (this.enemy.body.blocked.right) {
    //  this.enemy.setVelocityX(-160);
    //} else if (this.enemy.body.blocked.left) {
     // this.enemy.setVelocityX(160);
    //}
    if (isPaused) return;
  }
}
