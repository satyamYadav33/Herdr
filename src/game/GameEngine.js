import * as THREE from 'three';
import { ModelFactory } from './models';
import { TextureGenerator } from './textures';
import { sound } from './audio';

export class GameEngine {
  constructor(canvasContainer, callbacks = {}) {
    this.container = canvasContainer;
    this.callbacks = callbacks;

    // Game state
    this.isRunning = false;
    this.isPaused = false;
    this.score = 0;
    this.lives = 3;
    this.distance = 0;
    this.chaiCount = 0;
    this.sawaariCount = 0;

    // Speed & Movement
    this.baseSpeed = 36.0;
    this.maxSpeed = 70.0;
    this.speed = this.baseSpeed;
    this.lanePositions = [-2.8, 0, 2.8]; // Left, Center, Right
    this.currentLane = 1; // Center lane
    this.targetX = 0;
    this.autoX = 0;
    this.autoY = 0;
    this.autoRoll = 0;
    this.targetRoll = 0;

    // Jump Physics
    this.isJumping = false;
    this.jumpVelocity = 0;
    this.gravity = -34.0;

    // Invulnerability
    this.isInvulnerable = false;
    this.invulnerableTimer = 0;

    // Camera Shake
    this.shakeTime = 0;
    this.shakeIntensity = 0;

    // Three.js instances
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();
    this.animId = null;

    // Environment & Spawners
    this.roadChunks = [];
    this.chunkLength = 90;
    this.activeObstacles = [];
    this.activeCollectibles = [];
    this.activeParticles = [];
    this.exhaustParticles = [];
    this.patangs = [];
    this.nextSpawnZ = 0;

    this.init();
  }

  init() {
    this.setupScene();
    this.setupLighting();
    this.createPlayer();
    this.createRoadChunks();
    this.createKites();
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);

    // Initial render
    this.renderer.render(this.scene, this.camera);
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf69c47); // Warm golden sunset

    // Warm evening atmospheric fog
    this.scene.fog = new THREE.FogExp2(0xf69c47, 0.009);

    // Camera setup
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(56, width / height, 0.2, 380);
    this.camera.position.set(0, 4.8, 9.5);
    this.camera.lookAt(0, 1.3, -8);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);
  }

  setupLighting() {
    // Ambient Warm Fill
    const ambient = new THREE.AmbientLight(0xffb076, 0.65);
    this.scene.add(ambient);

    // Hemisphere Sky/Ground
    const hemi = new THREE.HemisphereLight(0xffdfba, 0x5a341c, 0.7);
    this.scene.add(hemi);

    // Golden Hour Sunlight with long soft shadows
    this.sun = new THREE.DirectionalLight(0xff9433, 1.45);
    this.sun.position.set(-28, 45, -35);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.width = 1024;
    this.sun.shadow.mapSize.height = 1024;
    this.sun.shadow.camera.near = 0.5;
    this.sun.shadow.camera.far = 160;
    const d = 28;
    this.sun.shadow.camera.left = -d;
    this.sun.shadow.camera.right = d;
    this.sun.shadow.camera.top = d;
    this.sun.shadow.camera.bottom = -d;
    this.sun.shadow.bias = -0.0005;
    this.scene.add(this.sun);
    this.scene.add(this.sun.target);

    // Glowing Sun Orb in Sky
    const sunOrb = new THREE.Mesh(
      new THREE.SphereGeometry(15, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffe680 })
    );
    sunOrb.position.set(-75, 42, -180);
    this.scene.add(sunOrb);

    const sunGlow = new THREE.Mesh(
      new THREE.RingGeometry(15.5, 28, 24),
      new THREE.MeshBasicMaterial({ color: 0xffaa33, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
    );
    sunGlow.position.set(-75, 42, -179);
    this.scene.add(sunGlow);
  }

  createPlayer() {
    this.autoRickshaw = ModelFactory.createAutoRickshaw();
    this.autoRickshaw.position.set(0, 0, 0);
    this.scene.add(this.autoRickshaw);
  }

  createRoadChunks() {
    const numChunks = 5;
    this.roadTexture = TextureGenerator.createRoadTexture();
    this.curbTexture = TextureGenerator.createCurbTexture();

    for (let i = 0; i < numChunks; i++) {
      const zPos = -i * this.chunkLength;
      const chunk = this.buildRoadChunk(zPos);
      this.roadChunks.push(chunk);
      this.scene.add(chunk);
    }
  }

  buildRoadChunk(zOffset) {
    const chunk = new THREE.Group();
    chunk.position.z = zOffset;

    const roadMat = new THREE.MeshLambertMaterial({
      map: this.roadTexture,
      roughness: 0.8
    });
    const curbMat = new THREE.MeshLambertMaterial({
      map: this.curbTexture,
      roughness: 0.7
    });
    const sidewalkMat = new THREE.MeshLambertMaterial({ color: 0xbfa382 });
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // 1. Road Surface
    const road = new THREE.Mesh(new THREE.PlaneGeometry(10, this.chunkLength), roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0, -this.chunkLength / 2);
    road.receiveShadow = true;
    chunk.add(road);

    // 2. Dashed Lane Dividers (2 dividers separating 3 lanes)
    const dashGeo = new THREE.PlaneGeometry(0.18, 2.6);
    for (let z = 0; z < this.chunkLength; z += 5) {
      [-this.lanePositions[2] / 2, this.lanePositions[2] / 2].forEach(x => {
        const dash = new THREE.Mesh(dashGeo, lineMat);
        dash.rotation.x = -Math.PI / 2;
        dash.position.set(x, 0.015, -z);
        chunk.add(dash);
      });
    }

    // 3. Curbs and Sidewalks
    [-1, 1].forEach(side => {
      const curb = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.25, this.chunkLength), curbMat);
      curb.position.set(side * 5.25, 0.12, -this.chunkLength / 2);
      curb.receiveShadow = true;
      chunk.add(curb);

      const sidewalk = new THREE.Mesh(new THREE.BoxGeometry(12, 0.2, this.chunkLength), sidewalkMat);
      sidewalk.position.set(side * 11.5, 0.1, -this.chunkLength / 2);
      sidewalk.receiveShadow = true;
      chunk.add(sidewalk);
    });

    // 4. Roadside Shops & Trees
    const itemsPerSide = 3;
    for (let i = 0; i < itemsPerSide; i++) {
      const itemZ = -(i * 28 + Math.random() * 8 + 5);
      this.spawnRoadsideBuilding(chunk, -7.5, itemZ, Math.PI / 2);
      this.spawnRoadsideBuilding(chunk, 7.5, itemZ, -Math.PI / 2);
    }

    // 5. Electric Utility Poles with Sagging Overhead Wires
    const pole1 = ModelFactory.createElectricPole();
    pole1.position.set(-5.8, 0, -10);
    chunk.add(pole1);

    const pole2 = ModelFactory.createElectricPole();
    pole2.position.set(-5.8, 0, -this.chunkLength + 10);
    chunk.add(pole2);

    const wireCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-5.8, 6.8, -10),
      new THREE.Vector3(-5.8, 5.2, -this.chunkLength / 2),
      new THREE.Vector3(-5.8, 6.8, -this.chunkLength + 10)
    );
    const wireGeo = new THREE.TubeGeometry(wireCurve, 20, 0.02, 4, false);
    const wire = new THREE.Mesh(wireGeo, new THREE.MeshBasicMaterial({ color: 0x111111 }));
    chunk.add(wire);

    return chunk;
  }

  spawnRoadsideBuilding(parent, x, z, rotY) {
    const rand = Math.random();
    let building;
    if (rand < 0.35) {
      building = ModelFactory.createChaiTapri();
    } else if (rand < 0.65) {
      building = ModelFactory.createKiranaStore();
    } else if (rand < 0.85) {
      building = ModelFactory.createMedicalStore();
    } else {
      building = ModelFactory.createPeepalTree();
    }
    building.position.set(x, 0.2, z);
    building.rotation.y = rotY;
    parent.add(building);
  }

  createKites() {
    const colors = [0xff5722, 0xe91e63, 0xffeb3b, 0x00e676, 0x00e5ff];
    for (let i = 0; i < 7; i++) {
      const color = colors[i % colors.length];
      const patang = ModelFactory.createPatang(color);
      patang.position.set(
        (Math.random() - 0.5) * 60,
        18 + Math.random() * 14,
        -30 - Math.random() * 120
      );
      patang.rotation.z = (Math.random() - 0.5) * 0.6;
      patang.userData.initialX = patang.position.x;
      patang.userData.initialY = patang.position.y;
      patang.userData.seed = Math.random() * 10;
      this.patangs.push(patang);
      this.scene.add(patang);
    }
  }

  spawnWave(spawnZ) {
    // Pick random lane for obstacle
    const obstacleLane = Math.floor(Math.random() * 3);
    const obstacleX = this.lanePositions[obstacleLane];

    const rand = Math.random();
    let obstacle = null;
    let obsType = '';

    if (rand < 0.35) {
      obstacle = ModelFactory.createCow();
      obsType = 'cow';
    } else if (rand < 0.62) {
      obstacle = ModelFactory.createOncomingBike();
      obsType = 'bike';
    } else if (rand < 0.82) {
      obstacle = ModelFactory.createPothole();
      obsType = 'pothole';
    } else {
      obstacle = ModelFactory.createBarricade();
      obsType = 'barricade';
    }

    obstacle.position.set(obstacleX, 0, spawnZ);
    obstacle.userData = {
      type: obsType,
      lane: obstacleLane,
      hitRadius: obsType === 'pothole' ? 0.9 : 1.15,
      isJumpable: obsType === 'pothole' || obsType === 'barricade'
    };

    this.activeObstacles.push(obstacle);
    this.scene.add(obstacle);

    // Pick another lane for collectible
    const otherLanes = [0, 1, 2].filter(l => l !== obstacleLane);
    const collectibleLane = otherLanes[Math.floor(Math.random() * otherLanes.length)];
    const collectibleX = this.lanePositions[collectibleLane];

    const isSawaari = Math.random() < 0.3; // Sawaari passenger +50
    let collectible = null;

    if (isSawaari) {
      collectible = ModelFactory.createSawaari();
      collectible.position.set(collectibleX + (collectibleLane === 0 ? -0.7 : 0.7), 0, spawnZ + (Math.random() - 0.5) * 6);
      collectible.userData = { type: 'sawaari', points: 50 };
    } else {
      collectible = ModelFactory.createChaiCup();
      collectible.position.set(collectibleX, 0.75, spawnZ + (Math.random() - 0.5) * 4);
      collectible.userData = { type: 'chai', points: 10 };
    }

    this.activeCollectibles.push(collectible);
    this.scene.add(collectible);
  }

  // Particle Effects
  createExhaustPuff() {
    const puffGeo = new THREE.SphereGeometry(0.12 + Math.random() * 0.08, 6, 6);
    const puffMat = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      transparent: true,
      opacity: 0.45
    });
    const puff = new THREE.Mesh(puffGeo, puffMat);
    puff.position.set(this.autoX - 0.55, this.autoY + 0.22, 1.2);
    this.exhaustParticles.push({
      mesh: puff,
      life: 0.45,
      maxLife: 0.45,
      vx: (Math.random() - 0.5) * 0.4,
      vy: 0.6 + Math.random() * 0.4,
      vz: 4.0
    });
    this.scene.add(puff);
  }

  createPickupSparks(x, y, z, colorHex = 0xffe600) {
    for (let i = 0; i < 16; i++) {
      const spark = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.14, 0.14),
        new THREE.MeshBasicMaterial({ color: colorHex })
      );
      spark.position.set(x, y, z);
      this.activeParticles.push({
        mesh: spark,
        vx: (Math.random() - 0.5) * 10,
        vy: 3 + Math.random() * 8,
        vz: (Math.random() - 0.5) * 10,
        life: 0.65,
        maxLife: 0.65
      });
      this.scene.add(spark);
    }
  }

  // Steering & Actions
  steerLeft() {
    if (this.currentLane > 0) {
      this.currentLane--;
      this.targetX = this.lanePositions[this.currentLane];
      this.targetRoll = 0.28; // Lean left
    }
  }

  steerRight() {
    if (this.currentLane < 2) {
      this.currentLane++;
      this.targetX = this.lanePositions[this.currentLane];
      this.targetRoll = -0.28; // Lean right
    }
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.jumpVelocity = 12.0;
      sound.playJump();
    }
  }

  blowHorn() {
    sound.playHorn();
    if (this.callbacks.onHorn) {
      this.callbacks.onHorn();
    }
  }

  // Game Lifecycle
  start() {
    this.isRunning = true;
    this.isPaused = false;
    this.clock.start();
    sound.startEngine();

    // Pre-populate upcoming roadway waves
    this.spawnWave(-40);
    this.spawnWave(-75);
    this.spawnWave(-110);
    this.nextSpawnZ = 0;

    this.loop = this.loop.bind(this);
    this.animId = requestAnimationFrame(this.loop);
  }

  pause() {
    this.isPaused = true;
    sound.stopEngine();
  }

  resume() {
    this.isPaused = false;
    this.clock.start();
    sound.startEngine();
    this.animId = requestAnimationFrame(this.loop);
  }

  restart() {
    // Reset variables
    this.score = 0;
    this.lives = 3;
    this.distance = 0;
    this.chaiCount = 0;
    this.sawaariCount = 0;
    this.speed = this.baseSpeed;
    this.currentLane = 1;
    this.targetX = 0;
    this.autoX = 0;
    this.autoY = 0;
    this.autoRoll = 0;
    this.targetRoll = 0;
    this.isJumping = false;
    this.jumpVelocity = 0;
    this.isInvulnerable = false;
    this.invulnerableTimer = 0;

    // Clean up entities
    this.activeObstacles.forEach(o => this.scene.remove(o));
    this.activeCollectibles.forEach(c => this.scene.remove(c));
    this.activeParticles.forEach(p => this.scene.remove(p.mesh));
    this.exhaustParticles.forEach(p => this.scene.remove(p.mesh));
    this.activeObstacles = [];
    this.activeCollectibles = [];
    this.activeParticles = [];
    this.exhaustParticles = [];

    // Reset chunks
    for (let i = 0; i < this.roadChunks.length; i++) {
      this.roadChunks[i].position.z = -i * this.chunkLength;
    }

    if (this.callbacks.onScore) this.callbacks.onScore(0);
    if (this.callbacks.onLives) this.callbacks.onLives(3);
    if (this.callbacks.onDistance) this.callbacks.onDistance(0);
    if (this.callbacks.onChai) this.callbacks.onChai(0);
    if (this.callbacks.onSawaari) this.callbacks.onSawaari(0);

    this.start();
  }

  gameOver() {
    this.isRunning = false;
    sound.stopEngine();
    sound.playThud();

    if (this.callbacks.onGameOver) {
      this.callbacks.onGameOver({
        score: this.score,
        distance: Math.floor(this.distance),
        chai: this.chaiCount,
        sawaari: this.sawaariCount
      });
    }
  }

  handleCollision() {
    this.lives--;
    if (this.callbacks.onLives) this.callbacks.onLives(this.lives);
    sound.playThud();

    // Trigger Screen Shake & Red Flash
    this.shakeTime = 0.38;
    this.shakeIntensity = 0.45;
    if (this.callbacks.onHit) this.callbacks.onHit();

    if (this.lives <= 0) {
      this.gameOver();
    } else {
      this.isInvulnerable = true;
      this.invulnerableTimer = 1.8;
    }
  }

  handleCollection(item) {
    const pts = item.userData.points;
    this.score += pts;
    if (this.callbacks.onScore) this.callbacks.onScore(this.score);

    if (item.userData.type === 'chai') {
      this.chaiCount++;
      if (this.callbacks.onChai) this.callbacks.onChai(this.chaiCount);
      sound.playChaiTing();
      this.createPickupSparks(item.position.x, item.position.y, item.position.z, 0xffd700);
      if (this.callbacks.onPopup) this.callbacks.onPopup(`+${pts} CHAI!`, '#ffea00');
    } else if (item.userData.type === 'sawaari') {
      this.sawaariCount++;
      if (this.callbacks.onSawaari) this.callbacks.onSawaari(this.sawaariCount);
      sound.playSawaariFanfare();
      this.createPickupSparks(item.position.x, item.position.y, item.position.z, 0x00e676);
      if (this.callbacks.onPopup) this.callbacks.onPopup(`+${pts} SAWAARI!`, '#69f0ae');
    }
  }

  // Main Loop
  loop() {
    if (!this.isRunning || this.isPaused) return;

    this.animId = requestAnimationFrame(this.loop);
    const delta = Math.min(this.clock.getDelta(), 0.08);

    this.update(delta);
    this.renderer.render(this.scene, this.camera);
  }

  update(delta) {
    // 1. Speed Progression
    this.speed = Math.min(this.baseSpeed + this.distance * 0.024, this.maxSpeed);
    const moveDist = this.speed * delta;
    this.distance += moveDist;

    // Update sound engine pitch
    sound.updateEnginePitch(this.speed / this.baseSpeed);

    // Distance Score
    this.score += Math.floor(moveDist * 0.35);
    if (this.callbacks.onScore) this.callbacks.onScore(this.score);
    if (this.callbacks.onDistance) this.callbacks.onDistance(Math.floor(this.distance));
    if (this.callbacks.onSpeed) this.callbacks.onSpeed(Math.floor(this.speed * 1.8));

    // 2. Lateral Steer & Smooth Lean Lerp
    this.autoX += (this.targetX - this.autoX) * Math.min(delta * 16, 1.0);
    this.autoRoll += (this.targetRoll - this.autoRoll) * Math.min(delta * 12, 1.0);
    this.targetRoll *= 0.86; // Recovers upright smoothly

    // 3. Jump Physics
    if (this.isJumping) {
      this.jumpVelocity += this.gravity * delta;
      this.autoY += this.jumpVelocity * delta;
      if (this.autoY <= 0) {
        this.autoY = 0;
        this.isJumping = false;
        this.jumpVelocity = 0;
      }
    }

    // Engine Vibration Bounce
    const t = this.clock.getElapsedTime();
    const engineWobble = this.isJumping ? 0 : Math.sin(t * 32) * 0.025;

    this.autoRickshaw.position.set(this.autoX, this.autoY + engineWobble, 0);
    this.autoRickshaw.rotation.z = this.autoRoll;
    this.autoRickshaw.rotation.y = -this.autoRoll * 0.45;

    // Wheels Roll forward visibly
    if (this.autoRickshaw.userData.wheels) {
      this.autoRickshaw.userData.wheels.forEach(w => {
        w.rotation.x += this.speed * delta * 0.6;
      });
    }

    // Road Texture Offset Scrolling (Creates dynamic asphalt rushing effect)
    if (this.roadTexture) {
      this.roadTexture.offset.y -= (moveDist / this.chunkLength) * 4;
    }

    // Exhaust Smoke Puffs
    if (Math.random() < 0.4) {
      this.createExhaustPuff();
    }

    // 4. Move Road Chunks Endless Recycling
    this.roadChunks.forEach(chunk => {
      chunk.position.z += moveDist;
      if (chunk.position.z > this.chunkLength * 1.5) {
        let minZ = 0;
        this.roadChunks.forEach(c => { minZ = Math.min(minZ, c.position.z); });
        chunk.position.z = minZ - this.chunkLength;
      }
    });

    // 5. Spawn Waves
    this.nextSpawnZ += moveDist;
    if (this.nextSpawnZ >= 28) {
      this.nextSpawnZ = 0;
      this.spawnWave(-120);
    }

    // 6. Update Obstacles
    for (let i = this.activeObstacles.length - 1; i >= 0; i--) {
      const obs = this.activeObstacles[i];
      let obsSpeed = moveDist;

      if (obs.userData.type === 'bike') {
        obsSpeed += 16 * delta; // Closing relative speed
        if (obs.userData.wheels) {
          obs.userData.wheels.forEach(w => w.rotation.x -= obsSpeed * 0.6);
        }
      }

      obs.position.z += obsSpeed;

      // Cow head chewing
      if (obs.userData.headGroup) {
        obs.userData.headGroup.rotation.y = Math.sin(t * 4) * 0.15;
      }

      // Collision Check
      if (!this.isInvulnerable) {
        const dz = Math.abs(obs.position.z - this.autoRickshaw.position.z);
        const dx = Math.abs(obs.position.x - this.autoRickshaw.position.x);

        if (dz < 1.3 && dx < obs.userData.hitRadius) {
          const isClearedByJump = obs.userData.isJumpable && this.autoY > 0.8;
          if (!isClearedByJump) {
            this.handleCollision();
          }
        }
      }

      // Remove offscreen
      if (obs.position.z > 22) {
        this.scene.remove(obs);
        this.activeObstacles.splice(i, 1);
      }
    }

    // 7. Update Collectibles
    for (let i = this.activeCollectibles.length - 1; i >= 0; i--) {
      const item = this.activeCollectibles[i];
      item.position.z += moveDist;

      if (item.userData.type === 'chai') {
        item.rotation.y += delta * 3.5;
        if (item.userData.ring) item.userData.ring.rotation.z += delta * 2.2;
      } else if (item.userData.type === 'sawaari') {
        if (item.userData.armGroup) item.userData.armGroup.rotation.z = -0.5 + Math.sin(t * 8) * 0.45;
        if (item.userData.circle) item.userData.circle.scale.setScalar(1.0 + Math.sin(t * 6) * 0.15);
      }

      // Collection Check
      const dz = Math.abs(item.position.z - this.autoRickshaw.position.z);
      const dx = Math.abs(item.position.x - this.autoRickshaw.position.x);

      if (dz < 1.4 && dx < 1.35) {
        this.handleCollection(item);
        this.scene.remove(item);
        this.activeCollectibles.splice(i, 1);
        continue;
      }

      if (item.position.z > 22) {
        this.scene.remove(item);
        this.activeCollectibles.splice(i, 1);
      }
    }

    // 8. Update Particles
    this.updateParticles(delta);

    // 9. Invulnerability Blink
    if (this.isInvulnerable) {
      this.invulnerableTimer -= delta;
      this.autoRickshaw.visible = Math.floor(t * 18) % 2 === 0;
      if (this.invulnerableTimer <= 0) {
        this.isInvulnerable = false;
        this.autoRickshaw.visible = true;
      }
    }

    // 10. Camera Follow & Shake
    let camTargetX = this.autoX * 0.45;
    let camTargetY = 4.8 + (this.autoY * 0.35);
    let camTargetZ = 9.5;

    if (this.shakeTime > 0) {
      this.shakeTime -= delta;
      camTargetX += (Math.random() - 0.5) * this.shakeIntensity;
      camTargetY += (Math.random() - 0.5) * this.shakeIntensity;
    }

    this.camera.position.x += (camTargetX - this.camera.position.x) * 0.15;
    this.camera.position.y += (camTargetY - this.camera.position.y) * 0.15;
    this.camera.position.z = camTargetZ;
    this.camera.lookAt(this.autoX * 0.3, 1.4 + this.autoY * 0.2, -10);

    // 11. Animate Kites
    this.patangs.forEach(p => {
      p.position.x = p.userData.initialX + Math.sin(t * 1.5 + p.userData.seed) * 1.8;
      p.position.y = p.userData.initialY + Math.cos(t * 2.0 + p.userData.seed) * 0.8;
      p.rotation.z = Math.sin(t * 1.8 + p.userData.seed) * 0.25;
    });
  }

  updateParticles(delta) {
    // Collect Sparks
    for (let i = this.activeParticles.length - 1; i >= 0; i--) {
      const p = this.activeParticles[i];
      p.life -= delta;
      p.mesh.position.x += p.vx * delta;
      p.mesh.position.y += p.vy * delta;
      p.mesh.position.z += p.vz * delta;
      p.mesh.scale.setScalar(p.life / p.maxLife);
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.activeParticles.splice(i, 1);
      }
    }

    // Exhaust Smoke Puffs
    for (let i = this.exhaustParticles.length - 1; i >= 0; i--) {
      const p = this.exhaustParticles[i];
      p.life -= delta;
      p.mesh.position.x += p.vx * delta;
      p.mesh.position.y += p.vy * delta;
      p.mesh.position.z += p.vz * delta;
      const scale = 1 + (1 - p.life / p.maxLife) * 1.8;
      p.mesh.scale.setScalar(scale);
      p.mesh.material.opacity = (p.life / p.maxLife) * 0.35;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.exhaustParticles.splice(i, 1);
      }
    }
  }

  handleResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  destroy() {
    this.isRunning = false;
    sound.stopEngine();
    if (this.animId) cancelAnimationFrame(this.animId);
    window.removeEventListener('resize', this.handleResize);
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
    }
  }
}
