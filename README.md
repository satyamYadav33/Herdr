# Pune Auto Rush — 3D Endless Rickshaw Runner 🛺💨

An indie-grade 3D browser endless runner built with **React**, **Three.js**, **Vite**, and **Tailwind CSS**. Drive your iconic yellow-green Bajaj RE auto-rickshaw through the bustling streets of Pune during the golden sunset hour (*shaam ki lighting*).

![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=flat-square&logo=three.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=flat-square&logo=tailwind-css)
![Vercel Ready](https://img.shields.io/badge/Vercel-Deployment%20Ready-000000?style=flat-square&logo=vercel)
![Netlify Ready](https://img.shields.io/badge/Netlify-Ready-00C7B7?style=flat-square&logo=netlify)

---

## 🎮 Game Overview

- **Vehicle**: Authentic Pune Auto-Rickshaw (emerald green lower body, vibrant yellow canopy, 3 rolling wheels, chrome bumper, clear windshield with wiper, fare meter, dashboard, driver and passenger seats, working headlights and tail lights).
- **Environment**: Infinite 3-lane Indian highway during golden hour with warm sunset glow, soft PCF shadows, and atmospheric evening fog.
- **Roadside Pune Scenery**:
  - *Chai Tapri*: Blue tarpaulin roof, wooden counter, brass tea kettle, cutting chai glasses, and *Yewale Chai* signboard.
  - *Kirana Store*: 2-storey building with striped awning, grain sacks, and *Gupta Kirana* signboard.
  - *Medical Store*: Storefront with glowing green cross emblem and *Sanjivani Medical* signboard.
  - *Peepal Trees*: Low-poly banyan/peepal trees with lush foliage canopies.
  - *Electric Utility Poles*: Concrete poles with realistic sagging overhead power cables (*bijli ke taar*).
  - *Kites (Patang)*: Colorful Indian paper kites fluttering in the evening breeze.
- **Dynamic Obstacles**:
  - **Gaaye (Desi Cow)**: White/cream humped cow standing in a lane with animated chewing head.
  - **Ulti Bike (Oncoming Motorcycle)**: Fast oncoming motorbike with rider in helmet, spinning wheels, and bright headlight beam!
  - **Gaddhe (Potholes)**: Recessed cracked asphalt craters with muddy water puddles. Can be dodged or jumped over!
  - **Barricades**: Pune Police yellow/black striped hazard barriers with flashing beacons.
- **Collectibles**:
  - ☕ **Cutting Chai (+10 pts)**: Steaming glass cup with golden rotating halo ring.
  - 🙋‍♂️ **Sawaari (+50 pts)**: Roadside passenger hailing the auto (*"Bhaiya, Auto!"*) with animated waving arm and glowing pickup ring.
- **Procedural Audio (Web Audio API)**:
  - Dynamic 2-stroke engine sound scaling pitch with acceleration.
  - Dual-tone Indian auto horn (`H` key / Horn button) with *"PO POH! 📯"* visual popup.
  - Glass *"ting"* chime for Chai cups (+10).
  - 4-note celebratory fanfare for Sawaari (+50).
  - Heavy sub-bass crunch thud for impacts.
  - Jump whoosh sound.
  - Global audio mute toggle.

---

## 🕹️ Controls

| Action | Desktop Keyboard | Mobile / Touch Screen |
| :--- | :--- | :--- |
| **Steer Left** | `←` or `A` | Swipe Left or Tap `LEFT` Button |
| **Steer Right** | `→` or `D` | Swipe Right or Tap `RIGHT` Button |
| **Jump** | `Space`, `↑`, or `W` | Swipe Up, Tap Screen, or Tap `JUMP` Button |
| **Horn** | `H` key | Tap `📢` Horn Button |
| **Pause** | `Esc` or `P` | Tap `⏸` Pause Button |
| **Mute Audio**| `M` key | Tap `🔊` Mute Button |

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/satyamYadav33/Herdr.git
cd Herdr

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🚢 Production Deployment

### Deploy to Vercel
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

### Deploy to Netlify
1. Go to [Netlify](https://netlify.com) and click **"Add new site"** &rarr; **"Import an existing project"**.
2. Select your GitHub repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy**.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **3D Graphics Engine**: Three.js (r128)
- **Bundler & Tooling**: Vite 6
- **Styling**: Tailwind CSS
- **Audio**: Web Audio API (Synthesized procedural sound effects)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
