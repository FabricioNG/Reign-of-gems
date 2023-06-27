// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

// Pause state
let isPaused = false;

export default class Level4 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("Level4");
  }

  preload() {
    // load assets
    this.load.tilemapTiledJSON("map4", "./public/tilemaps/level4.json");
    this.load.image("tileBackground", "./public/assets/images/sky.png");
    this.load.image("tilePlatform", "./public/assets/images/platform.png");
    this.load.image("crown", "./public/assets/images/crown.png");
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
    

    const map4 = this.make.tilemap({ key: "map4" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const layBackground = map4.addTilesetImage("sky", "tileBackground");
    const layPlatform = map4.addTilesetImage("platform", "tilePlatform");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const BackgroundLayer = map4.createLayer("background", layBackground, 0, 0);
    const platformLayer = map4.createLayer("platform", layPlatform, 0, 0);
    const objectsLayer = map4.getObjectLayer("objects");

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

  
  const spawnPointsSpikes = map4.filterObjects("objects", (obj) => obj.name === "spikes");
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
    let spawnPoint = map4.findObject("objects", (obj) => obj.name === "player");
    // The player and its settings
    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);

    // Obtener la capa de fondo del mapa
    this.physics.world.setBounds(0, 0, map4.widthInPixels, map4.heightInPixels);

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
        case "crown": {
          // add gem to scene
          const gems = this.gems.create(x, y, "crown");
          gems.body.immovable = true; // Make the gem immovable
          break;
        }
      }
    });

    // Crear la plataforma móvil
    const startX = 352; // Coordenada X de inicio
    const startY = 100; // Coordenada Y de inicio
    const endY = 500; // Coordenada Y de fin
    const duration = 7200; // Duración en milisegundos para el movimiento
    
    const platform = this.physics.add.sprite(startX, startY, 'mobileplatform');
    platform.setOrigin(0.5, 0.75); // Establecer el punto de origen en el centro de la plataforma
    platform.body.setAllowGravity(false); // Desactivar la gravedad en la plataforma
    platform.body.immovable = true; // Hacer que la plataforma sea inamovible
    
    
    
    // Vincular el objeto de colisión a la plataforma
    platform.body.setCollideWorldBounds();
    this.physics.add.collider(platform, platformLayer);
    this.physics.add.collider(platform, this.player, null, null, this);
    
    // Crear el tween para el movimiento de la plataforma
    this.tweens.add({
      targets: platform,
      y: endY,
      duration: duration,
      yoyo: true,
      repeat: -1
    });

    // Plataforma móvil 1
const startX1 = 578;
const startY1 = 100;
const endY1 = 500;
const duration1 = 7600;

const platform1 = this.physics.add.sprite(startX1, startY1, 'mobileplatform');
platform1.setOrigin(0.5, 0.75);
platform1.body.setAllowGravity(false);
platform1.body.immovable = true;

platform1.body.setCollideWorldBounds();
this.physics.add.collider(platform1, platformLayer);
this.physics.add.collider(platform1, this.player, null, null, this);

this.tweens.add({
  targets: platform1,
  y: endY1,
  duration: duration1,
  yoyo: true,
  repeat: -1
});

// Plataforma móvil 2
const startX2 = 800;
const startY2 = 100;
const endY2 = 500;
const duration2 = 7800;

const platform2 = this.physics.add.sprite(startX2, startY2, 'mobileplatform');
platform2.setOrigin(0.5, 0.75);
platform2.body.setAllowGravity(false);
platform2.body.immovable = true;

platform2.body.setCollideWorldBounds();
this.physics.add.collider(platform2, platformLayer);
this.physics.add.collider(platform2, this.player, null, null, this);

this.tweens.add({
  targets: platform2,
  y: endY2,
  duration: duration2,
  yoyo: true,
  repeat: -1
});

// Plataforma móvil 3
const startX3 = 1015;
const startY3 = 100;
const endY3 = 500;
const duration3 = 8200;

const platform3 = this.physics.add.sprite(startX3, startY3, 'mobileplatform');
platform3.setOrigin(0.5, 0.75);
platform3.body.setAllowGravity(false);
platform3.body.immovable = true;

platform3.body.setCollideWorldBounds();
this.physics.add.collider(platform3, platformLayer);
this.physics.add.collider(platform3, this.player, null, null, this);

this.tweens.add({
  targets: platform3,
  y: endY3,
  duration: duration3,
  yoyo: true,
  repeat: -1
});

// Plataforma móvil 4
const startX4 = 1252;
const startY4 = 100;
const endY4 = 500;
const duration4 = 8600;

const platform4 = this.physics.add.sprite(startX4, startY4, 'mobileplatform');
platform4.setOrigin(0.5, 0.75);
platform4.body.setAllowGravity(false);
platform4.body.immovable = true;

platform4.body.setCollideWorldBounds();
this.physics.add.collider(platform4, platformLayer);
this.physics.add.collider(platform4, this.player, null, null, this);

this.tweens.add({
  targets: platform4,
  y: endY4,
  duration: duration4,
  yoyo: true,
  repeat: -1
});

// Plataforma móvil 5
const startX5 = 1480;
const startY5 = 100;
const endY5 = 500;
const duration5 = 8800;

const platform5 = this.physics.add.sprite(startX5, startY5, 'mobileplatform');
platform5.setOrigin(0.5, 0.75);
platform5.body.setAllowGravity(false);
platform5.body.immovable = true;

platform5.body.setCollideWorldBounds();
this.physics.add.collider(platform5, platformLayer);
this.physics.add.collider(platform5, this.player, null, null, this);

this.tweens.add({
  targets: platform5,
  y: endY5,
  duration: duration5,
  yoyo: true,
  repeat: -1
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
      this.scene.start("Final"); // Cambia a la escena del nivel 2 cuando se hayan recolectado todas las gemas
    }
  }

  gameOver() {
    this.scene.start("Gameover4"); // Cambia a la escena de Game Over
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
