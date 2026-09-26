import * as THREE from 'three';

export const TextureGenerator = {
  // Signboard generator with text and border
  createSignboard(text, subtext, bgColor, textColor, width = 256, height = 128) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Frame
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.strokeRect(4, 4, width - 8, height - 8);

    // Text
    ctx.fillStyle = textColor;
    ctx.font = 'bold 30px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2 - (subtext ? 14 : 0));

    if (subtext) {
      ctx.font = 'bold 18px sans-serif';
      ctx.fillStyle = textColor;
      ctx.fillText(subtext, width / 2, height / 2 + 24);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 4;
    return texture;
  },

  // Pothole cracked road texture
  createPotholeTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    // Outer dark broken asphalt edge
    ctx.fillStyle = '#141210';
    ctx.beginPath();
    ctx.arc(64, 64, 56, 0, Math.PI * 2);
    ctx.fill();

    // Inner muddy puddle
    ctx.fillStyle = '#2d251e';
    ctx.beginPath();
    ctx.arc(64, 64, 42, 0, Math.PI * 2);
    ctx.fill();

    // Reflection highlight
    ctx.fillStyle = 'rgba(255, 200, 120, 0.45)';
    ctx.beginPath();
    ctx.ellipse(54, 50, 24, 12, -0.3, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  },

  // Striped barricade texture
  createBarricadeTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    // Yellow base
    ctx.fillStyle = '#fcb900';
    ctx.fillRect(0, 0, 256, 64);

    // Black hazard stripes
    ctx.fillStyle = '#1c1b18';
    for (let i = -64; i < 300; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 24, 0);
      ctx.lineTo(i - 16, 64);
      ctx.lineTo(i - 40, 64);
      ctx.closePath();
      ctx.fill();
    }

    // Stencil text "PUNE POLICE"
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PUNE POLICE', 128, 38);

    return new THREE.CanvasTexture(canvas);
  },

  // Procedural dynamic road surface texture with asphalt grain
  createRoadTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Asphalt dark grey base
    ctx.fillStyle = '#232026';
    ctx.fillRect(0, 0, 512, 512);

    // Subtle asphalt grain speckles
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const shade = Math.random() > 0.5 ? 45 : 25;
      ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
      ctx.fillRect(x, y, 2, 2);
    }

    // Tire tread wear tracks along lanes
    ctx.fillStyle = 'rgba(15, 12, 18, 0.4)';
    ctx.fillRect(100, 0, 40, 512);
    ctx.fillRect(236, 0, 40, 512);
    ctx.fillRect(372, 0, 40, 512);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 4);
    return texture;
  },

  // Striped curb pattern
  createCurbTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    // Alternating yellow and black curb blocks
    ctx.fillStyle = '#fcb900';
    ctx.fillRect(0, 0, 64, 32);
    ctx.fillStyle = '#222222';
    ctx.fillRect(64, 0, 64, 32);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 1);
    return texture;
  }
};
