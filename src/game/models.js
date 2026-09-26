import * as THREE from 'three';
import { TextureGenerator } from './textures';

export const ModelFactory = {
  // 1. Iconic Indian Auto-Rickshaw (Yellow Canopy, Green Hull, 3 Wheels)
  createAutoRickshaw() {
    const auto = new THREE.Group();

    // Reusable materials
    const greenMat = new THREE.MeshLambertMaterial({ color: 0x0a6e2d }); // Classic dark green hull
    const yellowMat = new THREE.MeshLambertMaterial({ color: 0xfcb900 }); // Pune auto yellow roof
    const blackMetalMat = new THREE.MeshLambertMaterial({ color: 0x1f1f1f });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xd9d9d9, roughness: 0.25, metalness: 0.8 });
    const tireMat = new THREE.MeshLambertMaterial({ color: 0x181818 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xb0b0b0, metalness: 0.7 });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x90caf9,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1
    });
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xfff3a8 });
    const tailLightMat = new THREE.MeshBasicMaterial({ color: 0xff1744 });

    // A. Main Lower Cabin Chassis (Green)
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.75, 2.2), greenMat);
    chassis.position.y = 0.65;
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    auto.add(chassis);

    // Front Hood Nose / Apron (Tapered front shield)
    const frontNose = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.72, 0.8), greenMat);
    frontNose.position.set(0, 0.65, 1.25);
    frontNose.rotation.x = -0.15;
    frontNose.castShadow = true;
    auto.add(frontNose);

    // Front Chrome Bumper
    const bumper = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.3), chromeMat);
    bumper.rotation.z = Math.PI / 2;
    bumper.position.set(0, 0.35, 1.7);
    auto.add(bumper);

    // B. Cabin Roof / Canopy (Vibrant Pune Yellow)
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.44, 0.15, 2.3), yellowMat);
    roof.position.set(0, 1.85, -0.05);
    roof.castShadow = true;
    auto.add(roof);

    // Curved Top Roof Crown
    const roofCrown = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 2.2, 16, 1, false, 0, Math.PI), yellowMat);
    roofCrown.rotation.x = -Math.PI / 2;
    roofCrown.rotation.z = Math.PI / 2;
    roofCrown.position.set(0, 1.92, -0.05);
    roofCrown.scale.set(0.25, 1, 1);
    auto.add(roofCrown);

    // Canopy Support Roll Cage Bars
    const pillarGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.85);
    [
      [-0.68, 1.4, 0.95],
      [0.68, 1.4, 0.95],
      [-0.68, 1.4, -1.05],
      [0.68, 1.4, -1.05]
    ].forEach(pos => {
      const pillar = new THREE.Mesh(pillarGeo, blackMetalMat);
      pillar.position.set(...pos);
      auto.add(pillar);
    });

    // C. Windshield & Front Glass
    const windshieldFrame = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.7, 0.04), blackMetalMat);
    windshieldFrame.position.set(0, 1.45, 0.95);
    windshieldFrame.rotation.x = -0.12;
    auto.add(windshieldFrame);

    const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 0.6), glassMat);
    glass.position.set(0, 1.45, 0.97);
    glass.rotation.x = -0.12;
    auto.add(glass);

    // Windshield Wiper
    const wiper = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.35, 0.01), blackMetalMat);
    wiper.position.set(0.1, 1.45, 0.99);
    wiper.rotation.z = -0.4;
    auto.add(wiper);

    // D. Interior: Seats & Fare Meter
    const driverSeat = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.15, 0.4), blackMetalMat);
    driverSeat.position.set(0, 0.8, 0.35);
    auto.add(driverSeat);

    const passSeat = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.2, 0.6), blackMetalMat);
    passSeat.position.set(0, 0.8, -0.7);
    auto.add(passSeat);

    // Mechanical Fare Meter ("METER")
    const meter = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.15, 0.12), blackMetalMat);
    meter.position.set(0.52, 1.15, 0.85);
    const meterLed = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.06), new THREE.MeshBasicMaterial({ color: 0xff0033 }));
    meterLed.position.set(0.52, 1.15, 0.92);
    auto.add(meter);
    auto.add(meterLed);

    // Steering Handlebars
    const handlebar = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.6), chromeMat);
    handlebar.rotation.z = Math.PI / 2;
    handlebar.position.set(0, 1.05, 0.7);
    auto.add(handlebar);

    // E. 3 Wheels (1 Front Center, 2 Rear)
    const wheelGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 16);
    const rimGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.24, 12);

    function makeWheel(x, y, z) {
      const wGroup = new THREE.Group();
      const tire = new THREE.Mesh(wheelGeo, tireMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.z = Math.PI / 2;
      wGroup.add(tire);
      wGroup.add(rim);
      wGroup.position.set(x, y, z);
      return wGroup;
    }

    const frontWheel = makeWheel(0, 0.32, 1.4);
    const backLeftWheel = makeWheel(-0.68, 0.32, -0.65);
    const backRightWheel = makeWheel(0.68, 0.32, -0.65);

    // Front Fork Support
    const fork = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.6), chromeMat);
    fork.position.set(0, 0.6, 1.35);
    fork.rotation.x = -0.2;
    auto.add(fork);

    auto.add(frontWheel);
    auto.add(backLeftWheel);
    auto.add(backRightWheel);
    auto.userData.wheels = [frontWheel, backLeftWheel, backRightWheel];

    // F. Headlight & Tail Lights
    const headlight = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.08, 16), chromeMat);
    headlight.rotation.x = Math.PI / 2;
    headlight.position.set(0, 0.85, 1.68);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.12, 16), lightMat);
    lens.position.set(0, 0.85, 1.73);
    auto.add(headlight);
    auto.add(lens);

    // Forward Headlight Beam
    const headSpot = new THREE.SpotLight(0xfff1aa, 1.2, 24, Math.PI / 5, 0.5, 1.2);
    headSpot.position.set(0, 0.85, 1.7);
    headSpot.target.position.set(0, 0, 10);
    auto.add(headSpot);
    auto.add(headSpot.target);

    // Rear Brake Lights
    [-0.55, 0.55].forEach(x => {
      const tail = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.02), tailLightMat);
      tail.position.set(x, 0.8, -1.11);
      auto.add(tail);
    });

    // G. Exhaust Pipe
    const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.4), blackMetalMat);
    exhaust.rotation.x = Math.PI / 2;
    exhaust.position.set(-0.55, 0.22, -1.1);
    auto.add(exhaust);

    return auto;
  },

  // 2. Desi Cow Obstacle (Gaaye) - Low poly Indian cow with hump, horns and tail
  createCow() {
    const cow = new THREE.Group();
    const cowMat = new THREE.MeshLambertMaterial({ color: 0xede4d3 }); // Light cream
    const hornMat = new THREE.MeshLambertMaterial({ color: 0x3d3023 });
    const hoofMat = new THREE.MeshLambertMaterial({ color: 0x221c16 });
    const snoutMat = new THREE.MeshLambertMaterial({ color: 0xdeb89b });

    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.0, 1.9), cowMat);
    body.position.y = 1.1;
    body.castShadow = true;
    cow.add(body);

    // Indian Zebu Dorsal Hump
    const hump = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.55, 6), cowMat);
    hump.position.set(0, 1.75, 0.45);
    hump.rotation.x = -0.2;
    cow.add(hump);

    // Head Group (for animated head bobbing)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.5, 1.05);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.65, 0.75), cowMat);
    head.position.set(0, 0, 0.1);
    headGroup.add(head);

    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.35, 0.4), snoutMat);
    snout.position.set(0, -0.15, 0.55);
    headGroup.add(snout);

    // Horns & Ears
    [-0.3, 0.3].forEach(x => {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.45, 6), hornMat);
      horn.position.set(x, 0.4, 0.05);
      horn.rotation.z = x > 0 ? -0.4 : 0.4;
      horn.rotation.x = -0.2;
      headGroup.add(horn);

      const ear = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.12, 0.15), cowMat);
      ear.position.set(x * 1.3, 0.15, -0.05);
      ear.rotation.z = x > 0 ? -0.3 : 0.3;
      headGroup.add(ear);
    });

    cow.add(headGroup);
    cow.userData.headGroup = headGroup;

    // 4 Legs with hooves
    const legGeo = new THREE.BoxGeometry(0.22, 0.75, 0.22);
    const hoofGeo = new THREE.BoxGeometry(0.24, 0.12, 0.24);
    [
      [-0.32, 0.38, 0.6],
      [0.32, 0.38, 0.6],
      [-0.32, 0.38, -0.6],
      [0.32, 0.38, -0.6]
    ].forEach(pos => {
      const leg = new THREE.Mesh(legGeo, cowMat);
      leg.position.set(...pos);
      leg.castShadow = true;
      const hoof = new THREE.Mesh(hoofGeo, hoofMat);
      hoof.position.set(pos[0], 0.06, pos[2]);
      cow.add(leg);
      cow.add(hoof);
    });

    // Swishing Tail
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.02, 0.8), cowMat);
    tail.position.set(0, 0.9, -1.0);
    tail.rotation.x = 0.25;
    cow.add(tail);

    return cow;
  },

  // 3. Ulti Bike (Oncoming wrong-side motorcycle with rider)
  createOncomingBike() {
    const bike = new THREE.Group();
    const bodyMat = new THREE.MeshLambertMaterial({ color: 0xd32f2f }); // Red motorbike
    const tireMat = new THREE.MeshLambertMaterial({ color: 0x111111 });
    const riderMat = new THREE.MeshLambertMaterial({ color: 0x1976d2 }); // Blue shirt
    const helmetMat = new THREE.MeshLambertMaterial({ color: 0xfff176 }); // Yellow helmet

    // Bike Frame
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 1.6), bodyMat);
    frame.position.y = 0.65;
    frame.castShadow = true;
    bike.add(frame);

    // 2 Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.14, 16);
    const bikeWheels = [];
    [-0.7, 0.7].forEach(z => {
      const wheelGroup = new THREE.Group();
      const wheel = new THREE.Mesh(wheelGeo, tireMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.castShadow = true;
      wheelGroup.add(wheel);
      wheelGroup.position.set(0, 0.35, z);
      bike.add(wheelGroup);
      bikeWheels.push(wheelGroup);
    });
    bike.userData.wheels = bikeWheels;

    // Rider Body & Helmet
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.65, 0.35), riderMat);
    torso.position.set(0, 1.25, -0.1);
    torso.rotation.x = -0.2;
    bike.add(torso);

    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), helmetMat);
    helmet.position.set(0, 1.7, 0.05);
    bike.add(helmet);

    // Forward Headlight Beam shining towards player (+Z direction)
    const bikeLight = new THREE.Mesh(new THREE.CircleGeometry(0.14, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    bikeLight.position.set(0, 0.8, 0.81);
    bike.add(bikeLight);

    const spot = new THREE.SpotLight(0xffffff, 1.6, 20, Math.PI / 6, 0.4);
    spot.position.set(0, 0.8, 0.85);
    spot.target.position.set(0, 0.2, 10);
    bike.add(spot);
    bike.add(spot.target);

    return bike;
  },

  // 4. Gaddhe (Pothole)
  createPothole() {
    const pothole = new THREE.Group();
    const texture = TextureGenerator.createPotholeTexture();
    const mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, polygonOffset: true, polygonOffsetFactor: -1 });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.6), mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = 0.02;
    pothole.add(mesh);
    return pothole;
  },

  // 5. Police / Traffic Barricade
  createBarricade() {
    const barricade = new THREE.Group();
    const texture = TextureGenerator.createBarricadeTexture();
    const plankMat = new THREE.MeshLambertMaterial({ map: texture });
    const metalMat = new THREE.MeshLambertMaterial({ color: 0x444444 });

    // Barrier Planks
    const plank1 = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.35, 0.06), plankMat);
    plank1.position.set(0, 0.8, 0);
    plank1.castShadow = true;
    barricade.add(plank1);

    const plank2 = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.35, 0.06), plankMat);
    plank2.position.set(0, 0.35, 0);
    plank2.castShadow = true;
    barricade.add(plank2);

    // A-frame Legs
    [-1.0, 1.0].forEach(x => {
      const leg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.0), metalMat);
      leg1.position.set(x, 0.5, 0.2);
      leg1.rotation.x = 0.25;
      const leg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.0), metalMat);
      leg2.position.set(x, 0.5, -0.2);
      leg2.rotation.x = -0.25;
      barricade.add(leg1);
      barricade.add(leg2);
    });

    // Yellow hazard flasher on top
    const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.16, 12), new THREE.MeshBasicMaterial({ color: 0xffd600 }));
    beacon.position.set(0, 1.08, 0);
    barricade.add(beacon);

    return barricade;
  },

  // 6. Chai Cup Collectible (+10 points)
  createChaiCup() {
    const cupGroup = new THREE.Group();
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.65,
      roughness: 0.1
    });
    const chaiMat = new THREE.MeshLambertMaterial({ color: 0xb5651d }); // Rich milk tea brown
    const goldMat = new THREE.MeshBasicMaterial({ color: 0xffd700, wireframe: true });

    // Cutting Chai Glass
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.55, 14), glassMat);
    glass.position.y = 0.3;
    cupGroup.add(glass);

    // Tea liquid
    const chai = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.17, 0.45, 12), chaiMat);
    chai.position.y = 0.26;
    cupGroup.add(chai);

    // Golden Halo Ring
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.03, 8, 24), goldMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.3;
    cupGroup.add(ring);

    cupGroup.userData.ring = ring;
    return cupGroup;
  },

  // 7. Sawaari Passenger Collectible (+50 points)
  createSawaari() {
    const sawaari = new THREE.Group();
    const skinMat = new THREE.MeshLambertMaterial({ color: 0x9c6444 });
    const clothesMat = new THREE.MeshLambertMaterial({ color: 0xe91e63 }); // Vibrant kurta
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0xf5f5f5 }); // White pajama
    const auraMat = new THREE.MeshBasicMaterial({ color: 0x00e676, transparent: true, opacity: 0.7 });

    // Legs
    const legs = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.8, 0.28), pantsMat);
    legs.position.y = 0.4;
    sawaari.add(legs);

    // Torso
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.65, 0.3), clothesMat);
    torso.position.y = 1.1;
    torso.castShadow = true;
    sawaari.add(torso);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), skinMat);
    head.position.y = 1.6;
    sawaari.add(head);

    // Waving Arm (Arm hails auto)
    const armGroup = new THREE.Group();
    armGroup.position.set(0.28, 1.35, 0);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 0.12), skinMat);
    arm.position.y = 0.25;
    armGroup.add(arm);
    armGroup.rotation.z = -0.5;
    sawaari.add(armGroup);
    sawaari.userData.armGroup = armGroup;

    // Glowing circle indicator on ground
    const circle = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.75, 24), auraMat);
    circle.rotation.x = -Math.PI / 2;
    circle.position.y = 0.03;
    sawaari.add(circle);
    sawaari.userData.circle = circle;

    return sawaari;
  },

  // 8. Roadside Shop: Chai Tapri
  createChaiTapri() {
    const stall = new THREE.Group();
    const woodMat = new THREE.MeshLambertMaterial({ color: 0x6d4c41 });
    const blueSheetMat = new THREE.MeshLambertMaterial({ color: 0x1976d2 });
    const benchMat = new THREE.MeshLambertMaterial({ color: 0x4e342e });

    // Stall Counter
    const counter = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.2, 2.0), woodMat);
    counter.position.y = 0.6;
    counter.castShadow = true;
    stall.add(counter);

    // 4 Bamboo Roof Posts
    const postGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.8);
    [[-1.6, 1.4, 0.9], [1.6, 1.4, 0.9], [-1.6, 1.4, -0.9], [1.6, 1.4, -0.9]].forEach(p => {
      const post = new THREE.Mesh(postGeo, woodMat);
      post.position.set(...p);
      stall.add(post);
    });

    // Blue Tarpaulin Canopy
    const roof = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.1, 2.6), blueSheetMat);
    roof.position.set(0, 2.7, 0);
    roof.rotation.x = 0.15;
    roof.castShadow = true;
    stall.add(roof);

    // Signboard
    const signTex = TextureGenerator.createSignboard('YEWALE CHAI', 'अमृततुल्य स्पेशल', '#ffffff', '#b71c1c');
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.8), new THREE.MeshBasicMaterial({ map: signTex }));
    sign.position.set(0, 2.3, 1.05);
    stall.add(sign);

    // Kettle
    const kettle = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.35, 12), new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9 }));
    kettle.position.set(0.8, 1.38, 0.4);
    stall.add(kettle);

    // Wooden Bench
    const bench = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.45, 0.5), benchMat);
    bench.position.set(0, 0.25, 1.8);
    stall.add(bench);

    return stall;
  },

  // 9. Roadside Shop: Kirana & General Store
  createKiranaStore() {
    const store = new THREE.Group();
    const wallMat = new THREE.MeshLambertMaterial({ color: 0xe67e22 }); // Terracotta
    const awningMat = new THREE.MeshLambertMaterial({ color: 0xf1c40f });

    // Building
    const building = new THREE.Mesh(new THREE.BoxGeometry(4.0, 4.2, 3.5), wallMat);
    building.position.y = 2.1;
    building.castShadow = true;
    store.add(building);

    // Striped Awning
    const awning = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.12, 1.4), awningMat);
    awning.position.set(0, 2.5, 1.9);
    awning.rotation.x = 0.3;
    store.add(awning);

    // Signboard
    const signTex = TextureGenerator.createSignboard('GUPTA KIRANA', 'GENERAL STORE', '#004d40', '#ffffff');
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.9), new THREE.MeshBasicMaterial({ map: signTex }));
    sign.position.set(0, 3.2, 1.8);
    store.add(sign);

    // Sacks Stacked Outside
    const sackMat = new THREE.MeshLambertMaterial({ color: 0xc2a679 });
    for (let i = -1.2; i <= 1.2; i += 0.8) {
      const sack = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.7, 0.6), sackMat);
      sack.position.set(i, 0.35, 1.8);
      store.add(sack);
    }

    return store;
  },

  // 10. Roadside Shop: Medical & Chemist
  createMedicalStore() {
    const store = new THREE.Group();
    const wallMat = new THREE.MeshLambertMaterial({ color: 0xecf0f1 });
    const greenMat = new THREE.MeshBasicMaterial({ color: 0x00c853 });

    // Building
    const building = new THREE.Mesh(new THREE.BoxGeometry(3.8, 3.8, 3.5), wallMat);
    building.position.y = 1.9;
    building.castShadow = true;
    store.add(building);

    // Signboard
    const signTex = TextureGenerator.createSignboard('SANJIVANI', 'MEDICAL & CHEMIST', '#ffffff', '#00796b');
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 0.8), new THREE.MeshBasicMaterial({ map: signTex }));
    sign.position.set(0, 2.9, 1.8);
    store.add(sign);

    // Glowing Green Cross (+)
    const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.05), greenMat);
    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.6, 0.05), greenMat);
    const crossGrp = new THREE.Group();
    crossGrp.add(crossH);
    crossGrp.add(crossV);
    crossGrp.position.set(1.4, 2.9, 1.85);
    store.add(crossGrp);

    return store;
  },

  // 11. Peepal Tree with leafy low-poly canopy
  createPeepalTree() {
    const tree = new THREE.Group();
    const trunkMat = new THREE.MeshLambertMaterial({ color: 0x5c4033 });
    const leafMat = new THREE.MeshLambertMaterial({ color: 0x388e3c });
    const lightLeafMat = new THREE.MeshLambertMaterial({ color: 0x4caf50 });

    // Trunk
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.45, 4.0, 8), trunkMat);
    trunk.position.y = 2.0;
    trunk.castShadow = true;
    tree.add(trunk);

    // Foliage Clusters
    const crown1 = new THREE.Mesh(new THREE.SphereGeometry(1.4, 7, 7), leafMat);
    crown1.position.set(0, 4.2, 0);
    crown1.castShadow = true;
    tree.add(crown1);

    const crown2 = new THREE.Mesh(new THREE.SphereGeometry(1.1, 7, 7), lightLeafMat);
    crown2.position.set(0.8, 3.8, 0.6);
    tree.add(crown2);

    const crown3 = new THREE.Mesh(new THREE.SphereGeometry(1.1, 7, 7), leafMat);
    crown3.position.set(-0.8, 3.6, -0.5);
    tree.add(crown3);

    return tree;
  },

  // 12. Electric Utility Pole with Sagging Wires (Bijli ke taar)
  createElectricPole() {
    const pole = new THREE.Group();
    const concreteMat = new THREE.MeshLambertMaterial({ color: 0x8d8d8d });
    const metalMat = new THREE.MeshLambertMaterial({ color: 0x2b2b2b });

    // Vertical Mast
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 7.5, 8), concreteMat);
    mast.position.y = 3.75;
    mast.castShadow = true;
    pole.add(mast);

    // Horizontal Crossbar
    const crossbar = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 0.12), metalMat);
    crossbar.position.set(0, 6.8, 0);
    pole.add(crossbar);

    // Insulators
    const insMat = new THREE.MeshBasicMaterial({ color: 0xdfe6e9 });
    [-0.9, 0, 0.9].forEach(x => {
      const ins = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.2), insMat);
      ins.position.set(x, 6.95, 0);
      pole.add(ins);
    });

    // Street Lamp attached to pole
    const lampArm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.9), metalMat);
    lampArm.position.set(0, 6.2, 0.45);
    lampArm.rotation.x = -0.3;
    pole.add(lampArm);

    const lampBulb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffe082 }));
    lampBulb.position.set(0, 5.95, 0.85);
    pole.add(lampBulb);

    return pole;
  },

  // 13. Indian Paper Kite (Patang) in the evening sky
  createPatang(colorHex = 0xff5722) {
    const kite = new THREE.Group();
    const kiteMat = new THREE.MeshBasicMaterial({ color: colorHex, side: THREE.DoubleSide });

    const shape = new THREE.Shape();
    shape.moveTo(0, 0.6);
    shape.lineTo(0.5, 0);
    shape.lineTo(0, -0.6);
    shape.lineTo(-0.5, 0);
    shape.closePath();

    const geom = new THREE.ShapeGeometry(shape);
    const mesh = new THREE.Mesh(geom, kiteMat);
    kite.add(mesh);

    const sparMat = new THREE.MeshBasicMaterial({ color: 0x1a1a1a });
    const spar1 = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.2, 0.01), sparMat);
    const spar2 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.02, 0.01), sparMat);
    kite.add(spar1);
    kite.add(spar2);

    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.4, 4), new THREE.MeshBasicMaterial({ color: 0xffeb3b }));
    tail.position.y = -0.7;
    tail.rotation.x = Math.PI;
    kite.add(tail);

    return kite;
  }
};
