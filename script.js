/**
 * Alan Ventura - Portafolio 3D & Desarrollo Web
 * Core Interactive Logic Script
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const body = document.body;
  const themeBtn = document.getElementById("themeBtn");
  const modelViewer = document.getElementById("setupViewer");
  const loadingOverlay = document.getElementById("loadingOverlay");
  const progressBar = document.getElementById("progressBar");
  const terminalBody = document.getElementById("terminalBody");
  
  // HUD Buttons
  const btnRotacion = document.getElementById("btn-rotacion");
  const btnLuz = document.getElementById("btn-luz");
  const btnCamara = document.getElementById("btn-camara");

  // Rive Mock Interactive Elements
  const btnRivePlay = document.getElementById("btnRivePlay");
  const riveOverlay = document.getElementById("riveOverlay");
  const vectorCircles = document.querySelectorAll(".circle-vec");

  // --- Retro Developer Terminal Logger Utility ---
  function appendTerminalLog(message, type = "default") {
    if (!terminalBody) return;
    const logLine = document.createElement("p");
    logLine.className = "t-line";
    
    const promptSpan = document.createElement("span");
    promptSpan.className = "t-prompt";
    promptSpan.textContent = "$ ";
    logLine.appendChild(promptSpan);

    const textNode = document.createTextNode(message);
    
    if (type === "success") {
      const successSpan = document.createElement("span");
      successSpan.className = "t-success";
      successSpan.textContent = message;
      logLine.appendChild(successSpan);
    } else if (type === "info") {
      const infoSpan = document.createElement("span");
      infoSpan.className = "t-info";
      infoSpan.textContent = message;
      logLine.appendChild(infoSpan);
    } else if (type === "warning") {
      const warningSpan = document.createElement("span");
      warningSpan.className = "t-warning";
      warningSpan.textContent = message;
      logLine.appendChild(warningSpan);
    } else {
      logLine.appendChild(textNode);
    }
    
    terminalBody.appendChild(logLine);
    // Auto-scroll terminal to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // --- Theme Toggle System (Dark / Light) ---
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") {
    body.classList.add("light");
    appendTerminalLog("System preference: Light Theme initialized.", "info");
  } else {
    appendTerminalLog("System preference: Dark Theme initialized.", "info");
  }

  themeBtn.addEventListener("click", () => {
    body.classList.toggle("light");
    const currentTheme = body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("portfolio-theme", currentTheme);
    appendTerminalLog(`Theme updated to ${currentTheme.toUpperCase()} mode.`, "success");
  });

  // --- Model Viewer Loading Management ---
  if (modelViewer) {
    appendTerminalLog("Initializing WebGL Model-Viewer viewport...", "info");

    // Track download progress
    modelViewer.addEventListener("progress", (event) => {
      const progress = Math.round(event.detail.totalProgress * 100);
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
      // Log progress occasionally to avoid spamming
      if (progress % 25 === 0 && progress > 0 && progress < 100) {
        appendTerminalLog(`Downloading 3D setup assets: ${progress}%...`);
      }
    });

    // Model loaded successfully
    modelViewer.addEventListener("load", () => {
      if (loadingOverlay) {
        loadingOverlay.classList.add("hidden");
      }
      appendTerminalLog("[ASSET LOADED] assets/3d/setup.glb successfully mapped in active workspace.", "success");
      appendTerminalLog("3D Renderer stabilized. OrbitControls bound.", "success");
    });

    // Error fallback
    modelViewer.addEventListener("error", (err) => {
      console.error("Error rendering 3D model:", err);
      appendTerminalLog("[ERROR] Failed to compile shaders or fetch assets/3d/setup.glb. Please check local paths.", "warning");
    });
  }

  // --- 3D HUD Interactions ---
  
  // 1. Auto-Rotation Toggle
  if (btnRotacion && modelViewer) {
    btnRotacion.addEventListener("click", () => {
      modelViewer.autoRotate = !modelViewer.autoRotate;
      const isRotating = modelViewer.autoRotate;
      
      // Update HUD button style
      if (isRotating) {
        btnRotacion.classList.remove("disabled");
        appendTerminalLog("Scene Auto-Rotation: ENABLED.", "info");
      } else {
        btnRotacion.classList.add("disabled");
        appendTerminalLog("Scene Auto-Rotation: DISABLED.", "warning");
      }
    });
  }

  // 2. Exposure Control (Day / Night Simulation)
  if (btnLuz && modelViewer) {
    btnLuz.addEventListener("click", () => {
      // Toggle between dark/neon exposure (0.45) and bright environment exposure (1.6)
      const currentExposure = parseFloat(modelViewer.getAttribute("exposure") || "1.0");
      let newExposure = 1.0;
      let state = "Standard";

      if (currentExposure >= 1.0 && currentExposure < 1.5) {
        newExposure = 1.7; // Bright Day
        state = "Bright Day Mode";
        appendTerminalLog("WebGL Exposure set to 1.7 [DAYTIME LIGHTING MODE].", "success");
      } else if (currentExposure >= 1.5) {
        newExposure = 0.45; // Neon Night
        state = "Cyber Neon Night";
        appendTerminalLog("WebGL Exposure set to 0.45 [GAMER NEON NIGHT MODE].", "success");
      } else {
        newExposure = 1.0; // Reset
        state = "Standard Neutral Studio";
        appendTerminalLog("WebGL Exposure reset to 1.0 [NEUTRAL STUDIO LIGHTING].", "info");
      }

      modelViewer.setAttribute("exposure", newExposure.toString());
    });
  }

  // 3. Camera reset
  if (btnCamara && modelViewer) {
    btnCamara.addEventListener("click", () => {
      modelViewer.cameraOrbit = "45deg 75deg 3m";
      modelViewer.fieldOfView = "auto";
      appendTerminalLog("Camera position recalibrated: [Orbit: 45deg 75deg, Target: Center].", "info");
    });
  }

  // --- Rive Mock Simulation ---
  if (btnRivePlay) {
    btnRivePlay.addEventListener("click", () => {
      // Hide the initial container overlay
      const overlay = btnRivePlay.closest(".rive-overlay-message");
      if (overlay) {
        overlay.classList.add("hidden");
      }

      // Activate circular particle mesh representation
      vectorCircles.forEach(circle => {
        circle.classList.add("active");
      });

      appendTerminalLog("[RIVE] Initializing Rive Engine Canvas...", "info");
      appendTerminalLog("[RIVE] Binding vector animations to active state machines.", "success");
      appendTerminalLog("[RIVE] Execution running. Playing: 'GamingSetup_Interaction_Loop'.", "success");
    });
  }
});