# Interactive 3D Developer Portfolio & Gaming Setup

Welcome to my professional **3D WebGL Portfolio**. This digital experience showcases the intersection of low-poly hard-surface 3D modeling in Blender and modern semantic frontend engineering. It serves as my official final project for the **Graficación** curriculum.

🖥️ **Live Deployment:** [View Portfolio Live](https://alan-ventura999.github.io/Portafolio-3d---Alan-Ventura/)
📂 **GitHub Repository:** [Alan-Ventura999/Portafolio-3d---Alan-Ventura](https://github.com/Alan-Ventura999/Portafolio-3d---Alan-Ventura)

---

## 🎯 Project Overview

This project consists of an interactive 3D website representing a developer/gamer workstation setup. It acts as an authentic personal portfolio, presenting technical skills, structured projects, a responsive dark-first design interface, and dynamic JavaScript WebGL manipulation.

---

## 🛠️ Selected Workstation Setup Elements (The 7 Core Assets)

To satisfy the academic rubric requirements, my 3D scene incorporates a custom programmer/gamer desk layout featuring exactly **7 distinct assets** (optimized under the maximum limit of 7 imported assets). Here is the breakdown:

1. 🎮 **Gaming Desk** *(Modeled by student from basic primitives)* - A custom-shaped wooden desk with metal supportive frames.
2. 🖥️ **Ultra-Wide Curved Gaming Monitor** *(Modeled by student)* - Low-poly display panel featuring a custom emission texture simulating a programming workspace environment.
3. ⌨️ **Mechanical Keyboard** *(Modeled by student)* - Individually defined low-poly keycaps and custom backboard geometry.
4. 🖱️ **Gaming Mouse** *(Modeled by student)* - Ergonomic, angular mouse design modeled from hard-surface primitives.
5. 🔋 **PC Tower with Transparent Glass** *(Modeled by student)* - Computer chassis featuring internal graphical cards, neon glowing cooling fans, and detailed structural housing.
6. 💺 **Ergonomic Developer Chair** *(Imported Asset)* - A highly detailed racing-style gaming chair asset, fully optimized and retopologized to fit the low-poly requirements of web rendering.
7. 🌵 **Potted Desert Cactus Plant** *(Modeled by student)* - A creative extra accessory modeled to add organic shape variety and warmth to the technical setup layout.

---

## 🔄 Technical Workflow: Blender ➔ glTF ➔ WebGL

To translate physical 3D designs into lightweight, responsive web experiences, I followed a professional pipeline:

### Phase 1: Low-Poly Mesh Modeling (Blender)
- Modeled the setup items inside **Blender 4.x** with a strong emphasis on quad-topology, edge optimization, and polygon count discipline.
- Utilized `Mirror` and `Bevel` modifiers to maintain sharp hard-surface borders while keeping the final scene triangle count below **~18,500 tris** to guarantee instant web loading times.

### Phase 2: UV Mapping & Lighting Setup
- Seamlessly unwrapped the mesh seams to prevent texture distortions.
- Applied PBR (Physically Based Rendering) material definitions aligning with standard Metallic/Roughness parameters.
- Utilized emission shaders to create glowing gaming LEDs on the screens and PC tower fans.

### Phase 3: GLB/GLTF Export Compilation
- Exported the complete scene hierarchy from Blender using the optimized binary **GLTF 2.0 (.glb)** container format.
- Staged the export parameters to include custom material parameters, texture packing, and camera orientation matrices.

### Phase 4: WebGL Integration & Interactive Manipulation
- Integrated the `.glb` container within [index.html](file:///c:/Escuela/Graficaci%C3%B3n/Proyecto%20Final%20-%20portafolio%203D/index.html) using the high-performance `<model-viewer>` WebGL engine.
- Configured dynamic camera parameters using the `camera-orbit` attribute to prevent model invisibility or viewport clipping.
- Engineered a custom **Control Panel HUD overlay** in HTML/CSS.
- Developed an interactive **Day & Night Exposure Cycle** in JavaScript, enabling users to programmatically change the lighting parameters of the 3D scene at the click of a button.

---

## ✨ Features & Interactive Systems

- 🌌 **Cyber Glassmorphic Theme:** Developed a premium dark-first CSS design system featuring blurred transparent backdrops (`backdrop-filter`) and smooth neon glowing borders.
- 🌞 **Responsive Theme Toggle:** Sleek transitions between Cyber Dark and Soft Slate Light themes, with user preferences cached using `localStorage`.
- 🕹️ **Active 3D HUD Interface:**
  - **Auto-rotate toggle:** Starts or pauses the orbital rotation.
  - **Exposure lighting cycle:** Switches between Day Workspace mode (Bright 1.7 exposure), Gamer Night mode (Cyber neon 0.45 exposure), and Neutral Studio mode (1.0 exposure).
  - **Camera reset:** Smoothly aligns the perspective back to the default overview angle.
- 📟 **Simulated retro programmer console:** Displays active system status updates, asset load completions, and interaction event records.
- 📐 **Responsive Flexbox/Grid Layout:** Fits perfectly on wide 4K displays, laptop viewports, and mobile phone screens.
- 🎨 **Rive Vector Animation Container:** Includes a dedicated, custom-styled media container primed for high-performance vector rendering.

---

## 🚀 Local Running Guide

To launch and run the portfolio locally:

### Option A: Direct Launch
Simply double-click the [index.html](file:///c:/Escuela/Graficaci%C3%B3n/Proyecto%20Final%20-%20portafolio%203D/index.html) file to open it in any modern browser.

### Option B: Local Web Server (Recommended for GLB caching)
To run a local web server for smooth asset fetching:
```bash
# Using Node.js npx:
npx serve .

# Or using Python:
python -m http.server 8000
```
Then visit `http://localhost:3000` or `http://localhost:8000` in your web browser.
