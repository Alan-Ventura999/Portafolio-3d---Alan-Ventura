/**
 * Alan Ventura - Portafolio 3D
 * Script principal corregido - compatible con model-viewer y theme toggle
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM cargado correctamente");
  
  // ============================================
  // 1. THEME TOGGLE (Claro / Oscuro)
  // ============================================
  const themeBtn = document.getElementById("themeBtn");
  const body = document.body;
  
  // Cargar tema guardado
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") {
    body.classList.add("light");
    console.log("📱 Tema claro cargado desde localStorage");
  } else {
    console.log("🌙 Tema oscuro cargado por defecto");
  }
  
  // Evento del botón de tema
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      body.classList.toggle("light");
      const currentTheme = body.classList.contains("light") ? "light" : "dark";
      localStorage.setItem("portfolio-theme", currentTheme);
      console.log(`🎨 Tema cambiado a: ${currentTheme}`);
    });
  } else {
    console.warn("⚠️ Botón de tema no encontrado");
  }
  
  // ============================================
  // 2. MODEL VIEWER 3D
  // ============================================
  const modelViewer = document.getElementById("setupViewer");
  const loadingOverlay = document.getElementById("loadingOverlay");
  const progressBar = document.getElementById("progressBar");
  
  if (modelViewer) {
    console.log("✅ ModelViewer encontrado, configurando eventos...");
    
    // Seguimiento de progreso de carga
    modelViewer.addEventListener("progress", (event) => {
      const progress = Math.round(event.detail.totalProgress * 100);
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
      if (progress % 25 === 0 && progress > 0 && progress < 100) {
        console.log(`📥 Cargando modelo 3D: ${progress}%`);
      }
    });
    
    // Modelo cargado exitosamente
    modelViewer.addEventListener("load", () => {
      console.log("✅ Modelo 3D cargado exitosamente");
      if (loadingOverlay) {
        loadingOverlay.classList.add("hidden");
      }
    });
    
    // Error al cargar el modelo
    modelViewer.addEventListener("error", (error) => {
      console.error("❌ Error cargando el modelo 3D:", error);
      if (loadingOverlay) {
        loadingOverlay.innerHTML = `
          <div style="text-align: center; padding: 20px;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p style="color: #ef4444; margin-top: 10px;">Error al cargar el modelo 3D</p>
            <p style="color: #94a3b8; font-size: 12px;">Verifica que el archivo setup.glb existe en assets/3d/</p>
          </div>
        `;
      }
    });
  } else {
    console.error("❌ Elemento model-viewer no encontrado");
  }
  
  // ============================================
  // 3. HUD BUTTONS (Controles 3D)
  // ============================================
  
  // Botón de rotación automática
  const btnRotacion = document.getElementById("btn-rotacion");
  if (btnRotacion && modelViewer) {
    btnRotacion.addEventListener("click", () => {
      modelViewer.autoRotate = !modelViewer.autoRotate;
      const isRotating = modelViewer.autoRotate;
      console.log(`🔄 Rotación automática: ${isRotating ? "Activada" : "Desactivada"}`);
      
      // Feedback visual en el botón
      if (isRotating) {
        btnRotacion.style.opacity = "1";
        btnRotacion.style.background = "rgba(79, 70, 229, 0.3)";
      } else {
        btnRotacion.style.opacity = "0.7";
        btnRotacion.style.background = "transparent";
      }
    });
  }
  
  // Botón de iluminación (Day/Night cycle)
  const btnLuz = document.getElementById("btn-luz");
  if (btnLuz && modelViewer) {
    btnLuz.addEventListener("click", () => {
      const currentExposure = parseFloat(modelViewer.getAttribute("exposure") || "1.0");
      let newExposure;
      let mode;
      
      if (currentExposure >= 1.0 && currentExposure < 1.5) {
        newExposure = 1.7;
        mode = "🌞 Modo Día (Alta luminosidad)";
      } else if (currentExposure >= 1.5) {
        newExposure = 0.45;
        mode = "🌙 Modo Noche Gamer (Neon)";
      } else {
        newExposure = 1.0;
        mode = "⚡ Modo Estándar";
      }
      
      modelViewer.setAttribute("exposure", newExposure.toString());
      console.log(`💡 Iluminación cambiada: ${mode} (exposure: ${newExposure})`);
    });
  }
  
  // Botón de reset de cámara
  const btnCamara = document.getElementById("btn-camara");
  if (btnCamara && modelViewer) {
    btnCamara.addEventListener("click", () => {
      modelViewer.cameraOrbit = "25deg 45deg 12m";
      modelViewer.fieldOfView = "auto";
      console.log("🎥 Cámara restablecida a posición inicial");
      
      // Feedback visual temporal
      btnCamara.style.transform = "scale(0.95)";
      setTimeout(() => {
        btnCamara.style.transform = "scale(1)";
      }, 150);
    });
  }
  
  // ============================================
  // 4. TERMINAL SIMULADA (Solo si existe)
  // ============================================
  const terminalBody = document.getElementById("terminalBody");
  
  function appendTerminalLog(message, type = "default") {
    if (!terminalBody) return;
    
    const logLine = document.createElement("p");
    logLine.className = "t-line";
    
    const promptSpan = document.createElement("span");
    promptSpan.className = "t-prompt";
    promptSpan.textContent = "$ ";
    logLine.appendChild(promptSpan);
    
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
      logLine.appendChild(document.createTextNode(message));
    }
    
    terminalBody.appendChild(logLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
  
  // Agregar logs iniciales a la terminal
  if (terminalBody) {
    setTimeout(() => {
      appendTerminalLog("Inicializando portafolio 3D...", "info");
      appendTerminalLog("WebGL Engine: Model-Viewer activado", "success");
      appendTerminalLog("Assets: Cargando setup.glb", "info");
    }, 500);
  }
  
  // ============================================
  // 5. ANIMACIONES ADICIONALES (opcional)
  // ============================================
  
  // Efecto de hover en tarjetas de proyecto
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
  
  // Smooth scroll para enlaces de navegación
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId !== "#") {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
          console.log(`📜 Scroll suave a: ${targetId}`);
        }
      }
    });
  });
  
  console.log("🚀 Script inicializado completamente");
});