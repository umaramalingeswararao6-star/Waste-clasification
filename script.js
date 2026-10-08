/**
 * EcoSort AI — Interactive Engine & UI Controller
 * Handles Demo Simulation, CNN Architecture Inspector, Chart.js Visualization,
 * Dynamic Theme Toggling, Metric Animations, and Form Feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNavigation();
  initScrollSpy();
  initInteractiveDemo();
  initModelArchitectureExplorer();
  initMetricCounters();
  initPerformanceCharts();
  initContactForm();
});

/* ==========================================================================
   1. Theme Management (Light / Dark Emerald Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('ecosort-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-mode');
    updateThemeIcon(true);
  } else {
    document.body.classList.remove('dark-mode');
    updateThemeIcon(false);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('ecosort-theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
      
      // Refresh Chart.js colors if charts exist
      updateChartColors(isDark);
    });
  }

  function updateThemeIcon(isDark) {
    if (!themeIcon) return;
    if (isDark) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }
}

/* ==========================================================================
   2. Mobile Navigation Toggle & Smooth Scrolling
   ========================================================================== */
function initMobileNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   3. ScrollSpy & Active Navigation Link Highlighter
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Interactive Demo Simulator
   ========================================================================== */
function initInteractiveDemo() {
  // Tabs Switcher
  const tabButtons = document.querySelectorAll('.demo-tab-btn');
  const demoPanels = document.querySelectorAll('.demo-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabButtons.forEach(b => b.classList.remove('active'));
      demoPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`panel-${targetTab}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Presets & Multi-particle Output Nodes
  const presetButtons = document.querySelectorAll('.preset-btn');
  const previewImage = document.getElementById('preview-image');
  const laserScanner = document.getElementById('laser-scanner');
  const multiBoxesContainer = document.getElementById('multi-boxes-container');
  const latencyCounter = document.getElementById('latency-counter');
  const processingLog = document.getElementById('processing-log');
  const filterChips = document.querySelectorAll('.filter-chip');
  
  // Results & Counts
  const countAllBadge = document.getElementById('count-all-badge');
  const countRecBadge = document.getElementById('count-rec-badge');
  const countOrgBadge = document.getElementById('count-org-badge');
  const summaryRecCount = document.getElementById('summary-rec-count');
  const summaryOrgCount = document.getElementById('summary-org-count');
  const sceneSummaryTitle = document.getElementById('scene-summary-title');
  const sceneSummarySub = document.getElementById('scene-summary-sub');
  const distRecFill = document.getElementById('dist-rec-fill');
  const distOrgFill = document.getElementById('dist-org-fill');
  const particlesListContainer = document.getElementById('particles-detected-list');
  const tipRecText = document.getElementById('tip-rec-text');
  const tipOrgText = document.getElementById('tip-org-text');

  // Controls & Sequential Player Elements
  const runInferenceBtn = document.getElementById('run-inference-btn');
  const stepByStepBtn = document.getElementById('step-by-step-btn');
  const randomSampleBtn = document.getElementById('random-sample-btn');
  const dropzone = document.getElementById('upload-dropzone');
  const fileInput = document.getElementById('file-input');
  const browseBtn = document.getElementById('browse-btn');

  const sequentialPlayerBox = document.getElementById('sequential-player-box');
  const playerStepCounter = document.getElementById('player-step-counter');
  const playerPrevBtn = document.getElementById('player-prev-btn');
  const playerPlayBtn = document.getElementById('player-play-btn');
  const playerNextBtn = document.getElementById('player-next-btn');
  const playerResetBtn = document.getElementById('player-reset-btn');
  const playerStatusText = document.getElementById('player-status-text');
  const playIcon = document.getElementById('play-icon');

  const chuteOverlay = document.getElementById('chute-overlay');
  const chuteBadge = document.getElementById('chute-badge');
  const chuteText = document.getElementById('chute-text');

  const dlReasoningCard = document.getElementById('dl-reasoning-card');
  const reasoningItemTitle = document.getElementById('reasoning-item-title');
  const reasoningConfBadge = document.getElementById('reasoning-conf-badge');
  const reasoningVisualText = document.getElementById('reasoning-visual-text');
  const reasoningLayerText = document.getElementById('reasoning-layer-text');
  const reasoningActionText = document.getElementById('reasoning-action-text');
  const explainDlTriggerBtn = document.getElementById('explain-dl-trigger-btn');

  // Dataset of scenes with granular real-world item names and Deep Learning feature descriptions
  const scenesDatabase = {
    'mixed-conveyor': {
      title: 'Conveyor Belt Stream (Mixed)',
      img: 'assets/mixed-conveyor.jpg',
      particles: [
        {
          id: 1,
          type: 'recyclable',
          name: 'Plastic Bottle Cap',
          material: 'Polypropylene (PP #5)',
          conf: 98.4,
          loc: 'Top-Left Tip [X:20%, Y:6%]',
          box: { top: 6, left: 18, width: 15, height: 14 },
          visual: 'Circular radial edge contours, specular high-gloss polymer sheen, threaded neck ridges.',
          layer: 'Filters in Conv Block 2 & 3 fire strongly on rigid circular geometry ➔ Dense Softmax selects Polypropylene Cap.',
          action: 'Categorized as <strong>RECYCLABLE</strong> ➔ Signals automated conveyor diverter #1 to route into Blue Stream.'
        },
        {
          id: 2,
          type: 'recyclable',
          name: 'Clear Plastic Bottle Body',
          material: 'Polyethylene Terephthalate (PET #1)',
          conf: 97.6,
          loc: 'Top-Left Body [X:8%, Y:20%]',
          box: { top: 20, left: 8, width: 36, height: 28 },
          visual: 'Elongated transparent cylindrical contour with ribbed structural reinforcement grooves.',
          layer: 'High-level feature maps detect vertical aspect ratio and transparent light refraction through CNN layers.',
          action: 'Categorized as <strong>RECYCLABLE</strong> ➔ Deposited into Blue Recycling Stream for flake reprocessing.'
        },
        {
          id: 3,
          type: 'organic',
          name: 'Ripe Banana Peel',
          material: 'Fibrous Fruit Cellulose Biomass',
          conf: 98.8,
          loc: 'Top-Right [X:56%, Y:10%]',
          box: { top: 8, left: 54, width: 38, height: 40 },
          visual: 'Curved elongated silhouette, yellow-brown oxidation enzyme browning, fibrous rind surface texture.',
          layer: 'Conv Block 2 filters detect organic cellulose curvature & irregular cellular boundaries ➔ Softmax selects Biomass.',
          action: 'Categorized as <strong>ORGANIC</strong> ➔ Signals pneumatic flap to deposit into Green Compost Hopper.'
        },
        {
          id: 4,
          type: 'recyclable',
          name: 'Crushed Aluminium Soda Can',
          material: 'Indefinitely Recyclable Metal',
          conf: 96.9,
          loc: 'Bottom-Left [X:8%, Y:54%]',
          box: { top: 52, left: 8, width: 36, height: 40 },
          visual: 'Specular metallic reflectance, crushed corrugated cylindrical boundary, sharp printed logo lettering.',
          layer: 'Conv Block 3 filters fire on metallic specular highlights & sharp compressed geometry.',
          action: 'Categorized as <strong>RECYCLABLE</strong> ➔ Diverted into Blue Aluminium reprocessing line.'
        },
        {
          id: 5,
          type: 'organic',
          name: 'Eaten Apple Core Scrap',
          material: 'Organic Fruit Core & Seed Biomass',
          conf: 96.2,
          loc: 'Bottom-Right [X:56%, Y:54%]',
          box: { top: 52, left: 54, width: 38, height: 40 },
          visual: 'Biconcave eaten fruit profile, central seed chamber, pectin enzymatic oxidation browning.',
          layer: 'Feature maps detect organic fibrous texture & irregular edges ➔ Softmax selects Organic Food Waste.',
          action: 'Categorized as <strong>ORGANIC</strong> ➔ Diverted into Green Organic Composting Bin.'
        }
      ],
      tipRec: 'Rinse plastic bottle, cap, and aluminium can to remove liquid residues. Squash to minimize bin volume.',
      tipOrg: 'Place banana peel and apple core directly into green compost stream or vermiculture bed. 100% biodegradable.'
    },
    'mixed-cafeteria': {
      title: 'Cafeteria Tray (Bottle & Peel)',
      img: 'assets/mixed-waste-1.jpg',
      particles: [
        {
          id: 1,
          type: 'recyclable',
          name: 'Plastic Water Bottle Cap & Body',
          material: 'Clear PET 1 Polymer + PP Cap',
          conf: 97.8,
          loc: 'Left Sector [X:10%, Y:12%]',
          box: { top: 10, left: 8, width: 36, height: 78 },
          visual: 'Cylindrical bottle neck, blue cap ring, transparent body with refracted light.',
          layer: 'Conv Block 1 & 2 detect vertical straight edges and polymer translucency.',
          action: 'Categorized as <strong>RECYCLABLE</strong> ➔ Route to Blue Bin.'
        },
        {
          id: 2,
          type: 'organic',
          name: 'Ripe Banana Peel Biomass',
          material: 'Vegetal Compostable Matter',
          conf: 98.5,
          loc: 'Right Sector [X:54%, Y:16%]',
          box: { top: 14, left: 52, width: 40, height: 72 },
          visual: 'Elongated banana peel arms, brown spots, cellulose stem fiber.',
          layer: 'Deep convolutional features recognize organic peel curvature.',
          action: 'Categorized as <strong>ORGANIC</strong> ➔ Route to Green Compost Bin.'
        }
      ],
      tipRec: 'Remove bottle cap if required by local municipality, drain completely, and place in Blue Bin.',
      tipOrg: 'Organic food residues generate rich soil nutrients. Route directly to composting.'
    },
    'mixed-office': {
      title: 'Office Waste (Can & Apple)',
      img: 'assets/mixed-waste-2.jpg',
      particles: [
        {
          id: 1,
          type: 'recyclable',
          name: 'Crushed Aluminium Soda Can',
          material: 'Indefinitely Recyclable Metal',
          conf: 97.2,
          loc: 'Left Sector [X:8%, Y:18%]',
          box: { top: 16, left: 8, width: 38, height: 66 },
          visual: 'Metallic specular highlights, crumpled cylinder sides, pull-tab contour.',
          layer: 'Conv Block 3 filters fire on metallic highlights & sharp deformed creases.',
          action: 'Categorized as <strong>RECYCLABLE</strong> ➔ Route to Blue Bin.'
        },
        {
          id: 2,
          type: 'organic',
          name: 'Eaten Apple Core Scrap',
          material: 'Fibrous Fruit Core & Seeds',
          conf: 96.5,
          loc: 'Right Sector [X:54%, Y:14%]',
          box: { top: 12, left: 52, width: 40, height: 74 },
          visual: 'Hourglass fruit silhouette, exposed brown seeds, oxidized flesh.',
          layer: 'Early layers detect jagged bite marks, deeper layers confirm organic biomass.',
          action: 'Categorized as <strong>ORGANIC</strong> ➔ Route to Green Composting Bin.'
        }
      ],
      tipRec: 'Aluminium retains quality across infinite recycling cycles. Route to Blue Bin.',
      tipOrg: 'Compostable apple core contains pectin and nitrogen for garden fertilizer.'
    },
    'bottle': {
      title: 'Plastic Bottle (Isolated Recyclable)',
      img: 'assets/sample-bottle.jpg',
      particles: [
        {
          id: 1,
          type: 'recyclable',
          name: 'Plastic Bottle with Cap',
          material: 'PET 1 Polymer + Polypropylene Cap',
          conf: 98.6,
          loc: 'Center Frame [X:25%, Y:10%]',
          box: { top: 8, left: 24, width: 52, height: 82 },
          visual: 'Transparent bottle cylinder, blue cap seal, paper label perimeter.',
          layer: 'Conv2D filters highlight symmetrical polymer body & cap threading.',
          action: 'Categorized as <strong>RECYCLABLE</strong> ➔ Route to Blue Bin.'
        }
      ],
      tipRec: 'Empty all liquids. Keep cap attached if local guidelines permit. Place in Blue Recycling Bin.',
      tipOrg: 'No organic matter detected in this sample.'
    },
    'banana': {
      title: 'Banana Peel (Isolated Organic)',
      img: 'assets/sample-organic.jpg',
      particles: [
        {
          id: 1,
          type: 'organic',
          name: 'Ripe Banana Peel Scraps',
          material: 'Organic Potassium Biomass',
          conf: 98.9,
          loc: 'Center Frame [X:15%, Y:18%]',
          box: { top: 14, left: 16, width: 66, height: 70 },
          visual: 'Star-like peel strips, black stem junction, soft organic cellulose.',
          layer: 'Spatial features match banana peel training signatures at 98.9%.',
          action: 'Categorized as <strong>ORGANIC</strong> ➔ Route to Green Compost Bin.'
        }
      ],
      tipRec: 'No recyclable components detected in this sample.',
      tipOrg: 'Place directly into Green Bin or municipal organics collection.'
    },
    'can': {
      title: 'Crushed Soda Can (Isolated Recyclable)',
      img: 'assets/sample-can.jpg',
      particles: [
        {
          id: 1,
          type: 'recyclable',
          name: 'Crushed Aluminium Can',
          material: 'Aluminium Alloy',
          conf: 97.4,
          loc: 'Center Frame [X:14%, Y:22%]',
          box: { top: 20, left: 14, width: 72, height: 60 },
          visual: 'Silver metallic sheen, crushed horizontal compression, pull-tab.',
          layer: 'Conv layers detect metallic high-frequency reflection.',
          action: 'Categorized as <strong>RECYCLABLE</strong> ➔ Route to Blue Bin.'
        }
      ],
      tipRec: 'Recyclable metal. Deposit into designated Blue metal/recycling receptacle.',
      tipOrg: 'No organic matter detected in this sample.'
    },
    'apple': {
      title: 'Apple Core (Isolated Organic)',
      img: 'assets/sample-apple.jpg',
      particles: [
        {
          id: 1,
          type: 'organic',
          name: 'Eaten Apple Core Scrap',
          material: 'Compostable Organic Core & Seeds',
          conf: 97.8,
          loc: 'Center Frame [X:20%, Y:14%]',
          box: { top: 10, left: 22, width: 56, height: 78 },
          visual: 'Central stem, dark pips, browned fruit flesh texture.',
          layer: 'Convolutional feature maps recognize biological pectin tissue.',
          action: 'Categorized as <strong>ORGANIC</strong> ➔ Route to Green Compost Bin.'
        }
      ],
      tipRec: 'No recyclable material found in this item.',
      tipOrg: 'Biodegradable fruit core. Deposit in Green organic collection bin.'
    }
  };

  let currentScene = scenesDatabase['mixed-conveyor'];
  let currentActiveFilter = 'all';
  let isSequentialActive = false;
  let currentSequentialIndex = 0;
  let autoSortInterval = null;

  // Preset Button Click Handlers
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      stopAutoSort();
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const presetKey = btn.getAttribute('data-preset');
      if (scenesDatabase[presetKey]) {
        currentScene = scenesDatabase[presetKey];
        runMultiObjectInference(currentScene);
      }
    });
  });

  // Random Preset Button
  if (randomSampleBtn) {
    randomSampleBtn.addEventListener('click', () => {
      stopAutoSort();
      const keys = ['mixed-conveyor', 'mixed-cafeteria', 'mixed-office'];
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      const targetBtn = document.querySelector(`.preset-btn[data-preset="${randomKey}"]`);
      if (targetBtn) targetBtn.click();
    });
  }

  // Scan & Detect All Button
  if (runInferenceBtn) {
    runInferenceBtn.addEventListener('click', () => {
      stopAutoSort();
      if (sequentialPlayerBox) sequentialPlayerBox.style.display = 'none';
      if (chuteOverlay) chuteOverlay.style.display = 'none';
      isSequentialActive = false;
      runMultiObjectInference(currentScene);
    });
  }

  // Separate Waste One-by-One Button
  if (stepByStepBtn) {
    stepByStepBtn.addEventListener('click', () => {
      startSequentialMode();
    });
  }

  // Sequential Player Controls
  if (playerPrevBtn) {
    playerPrevBtn.addEventListener('click', () => {
      stopAutoSort();
      if (currentScene.particles.length === 0) return;
      currentSequentialIndex = (currentSequentialIndex - 1 + currentScene.particles.length) % currentScene.particles.length;
      isolateSequentialItem(currentSequentialIndex);
    });
  }

  if (playerNextBtn) {
    playerNextBtn.addEventListener('click', () => {
      stopAutoSort();
      if (currentScene.particles.length === 0) return;
      currentSequentialIndex = (currentSequentialIndex + 1) % currentScene.particles.length;
      isolateSequentialItem(currentSequentialIndex);
    });
  }

  if (playerPlayBtn) {
    playerPlayBtn.addEventListener('click', () => {
      if (autoSortInterval) {
        stopAutoSort();
      } else {
        startAutoSort();
      }
    });
  }

  if (playerResetBtn) {
    playerResetBtn.addEventListener('click', () => {
      stopAutoSort();
      if (sequentialPlayerBox) sequentialPlayerBox.style.display = 'none';
      if (chuteOverlay) chuteOverlay.style.display = 'none';
      isSequentialActive = false;
      clearParticleHighlights();
      const allBoxes = document.querySelectorAll('.particle-box');
      allBoxes.forEach(b => b.classList.remove('hidden', 'focused'));
      if (playerStatusText) playerStatusText.innerText = 'Reset view: Showing all detected objects.';
    });
  }

  function startSequentialMode() {
    isSequentialActive = true;
    currentSequentialIndex = 0;
    if (sequentialPlayerBox) sequentialPlayerBox.style.display = 'block';
    isolateSequentialItem(0);
    showToast(`Sequential Mode: Isolating waste items one-by-one!`, 'success');
  }

  function isolateSequentialItem(index) {
    if (!currentScene.particles || currentScene.particles.length === 0) return;
    const item = currentScene.particles[index];
    const total = currentScene.particles.length;

    // Update Player Counter & Status
    if (playerStepCounter) playerStepCounter.innerText = `Item ${index + 1} of ${total}`;
    if (playerStatusText) {
      playerStatusText.innerHTML = `Isolating Item #${item.id}: <strong>${item.name}</strong> (${item.type === 'recyclable' ? 'Recyclable' : 'Organic'})...`;
    }

    // Viewport box isolation: hide other boxes, highlight current box
    const allBoxes = document.querySelectorAll('.particle-box');
    allBoxes.forEach(box => {
      const boxId = parseInt(box.getAttribute('data-id'));
      if (boxId === item.id) {
        box.classList.remove('hidden');
        box.classList.add('focused');
      } else {
        box.classList.remove('focused');
        box.classList.add('hidden');
      }
    });

    // Update Chute Overlay Animation
    if (chuteOverlay && chuteBadge && chuteText) {
      chuteOverlay.style.display = 'block';
      chuteBadge.className = `chute-badge ${item.type}`;
      const isRec = item.type === 'recyclable';
      chuteText.innerHTML = isRec
        ? `Routing #${item.id} ${item.name} ➔ Blue Recycling Bin`
        : `Routing #${item.id} ${item.name} ➔ Green Composting Bin`;
    }

    // Update Deep Learning Feature Reasoning Inspector
    if (dlReasoningCard) {
      dlReasoningCard.style.borderColor = item.type === 'recyclable' ? '#10b981' : '#f59e0b';
    }
    if (reasoningItemTitle) {
      reasoningItemTitle.innerText = `Item Inspection: #${item.id} ${item.name}`;
    }
    if (reasoningConfBadge) {
      reasoningConfBadge.innerText = `${item.conf}% Confidence`;
      reasoningConfBadge.style.color = item.type === 'recyclable' ? '#059669' : '#d97706';
    }
    if (reasoningVisualText) {
      reasoningVisualText.innerText = item.visual || 'Deep texture gradients and surface contour edges detected.';
    }
    if (reasoningLayerText) {
      reasoningLayerText.innerText = item.layer || 'Feature extraction through Conv2D blocks ➔ Softmax classification.';
    }
    if (reasoningActionText) {
      reasoningActionText.innerHTML = item.action || `Route item to ${item.type === 'recyclable' ? 'Blue Bin' : 'Green Bin'}.`;
    }

    // Highlight row in list
    highlightParticle(item.id, true);
  }

  function startAutoSort() {
    if (autoSortInterval) clearInterval(autoSortInterval);
    if (playIcon) {
      playIcon.className = 'fa-solid fa-pause';
    }
    playerPlayBtn.querySelector('span').innerText = 'Pause';

    autoSortInterval = setInterval(() => {
      if (!currentScene.particles || currentScene.particles.length === 0) return;
      currentSequentialIndex = (currentSequentialIndex + 1) % currentScene.particles.length;
      isolateSequentialItem(currentSequentialIndex);
    }, 2400);
  }

  function stopAutoSort() {
    if (autoSortInterval) {
      clearInterval(autoSortInterval);
      autoSortInterval = null;
    }
    if (playIcon) {
      playIcon.className = 'fa-solid fa-play';
    }
    if (playerPlayBtn) {
      const span = playerPlayBtn.querySelector('span');
      if (span) span.innerText = 'Auto Sort';
    }
  }

  // "How DL Model Works" Trigger Button Click
  if (explainDlTriggerBtn) {
    explainDlTriggerBtn.addEventListener('click', () => {
      const targetSection = document.getElementById('dl-explanation-section');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetSection.style.boxShadow = '0 0 35px rgba(16, 185, 129, 0.4)';
        setTimeout(() => {
          targetSection.style.boxShadow = '';
        }, 2500);
      }
    });
  }

  // Filter Chips (All / Recyclable / Organic)
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      stopAutoSort();
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentActiveFilter = chip.getAttribute('data-filter');
      applyFilterToParticles(currentActiveFilter);
    });
  });

  // Custom File Upload
  if (browseBtn && fileInput) {
    browseBtn.addEventListener('click', () => fileInput.click());
  }

  if (dropzone && fileInput) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) handleUploadedScene(files[0]);
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) handleUploadedScene(e.target.files[0]);
    });
  }

  function handleUploadedScene(file) {
    if (!file.type.startsWith('image/')) {
      showToast('Please upload a valid image file (PNG, JPG, WebP).', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const userImgUrl = e.target.result;
      presetButtons.forEach(b => b.classList.remove('active'));

      // Generate a realistic multi-object detection scene for the user's uploaded image
      const uploadedScene = {
        title: `Uploaded: ${file.name}`,
        img: userImgUrl,
        particles: [
          {
            id: 1,
            type: 'recyclable',
            name: 'Detected Recyclable Container / Plastic',
            material: 'Polymer/Metal Rigid Body',
            conf: (93.5 + Math.random() * 5).toFixed(1),
            loc: 'Sector A [X:15%, Y:18%]',
            box: { top: 16, left: 12, width: 34, height: 68 },
            visual: 'Rigid geometric edges, specular reflection highlight, regular polymer contour.',
            layer: 'Conv Block 2 filters detect boundary gradients ➔ Softmax selects Recyclable.',
            action: 'Categorized as <strong>RECYCLABLE</strong> ➔ Signals automated conveyor diverter #1.'
          },
          {
            id: 2,
            type: 'organic',
            name: 'Detected Organic Food / Residue',
            material: 'Compostable Biodegradable Scrap',
            conf: (94.0 + Math.random() * 4.5).toFixed(1),
            loc: 'Sector B [X:55%, Y:22%]',
            box: { top: 18, left: 54, width: 36, height: 64 },
            visual: 'Irregular biological texture, enzymatic browning gradients, soft cellulose boundaries.',
            layer: 'Conv Block 3 filters identify organic cellular texture ➔ Softmax selects Organic Biomass.',
            action: 'Categorized as <strong>ORGANIC</strong> ➔ Signals pneumatic flap into Green Compost Hopper.'
          }
        ],
        tipRec: 'Clean any liquid residues. Deposit in Blue Recycling Bin.',
        tipOrg: 'Place identified food or organic matter in Green Compost Bin.'
      };

      currentScene = uploadedScene;
      runMultiObjectInference(currentScene);
      showToast(`Multi-particle scan completed on "${file.name}"! Both categories identified.`, 'success');
    };
    reader.readAsDataURL(file);
  }

  // Core Multi-Object Inference Simulation
  function runMultiObjectInference(scene) {
    previewImage.src = scene.img;

    // Reset box overlay
    if (multiBoxesContainer) multiBoxesContainer.innerHTML = '';
    if (latencyCounter) latencyCounter.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Scanning Scene...`;

    // Start laser sweep animation
    laserScanner.classList.remove('scanning');
    void laserScanner.offsetWidth;
    laserScanner.classList.add('scanning');

    // Pipeline Logs
    if (processingLog) {
      processingLog.innerHTML = `
        <div class="log-item"><i class="fa-solid fa-hourglass-half"></i> Step 1: Normalizing scene dimensions & contrast...</div>
      `;
    }

    setTimeout(() => {
      if (processingLog) {
        processingLog.innerHTML += `
          <div class="log-item"><i class="fa-solid fa-hourglass-half"></i> Step 2: Running multi-scale convolutional feature pyramid...</div>
        `;
      }
    }, 250);

    setTimeout(() => {
      const simulatedLatency = Math.floor(38 + Math.random() * 12);
      if (latencyCounter) {
        latencyCounter.innerHTML = `<i class="fa-solid fa-bolt"></i> Latency: ${simulatedLatency}ms`;
      }

      // Stop laser
      laserScanner.classList.remove('scanning');

      // Calculate class statistics
      const totalCount = scene.particles.length;
      const recCount = scene.particles.filter(p => p.type === 'recyclable').length;
      const orgCount = scene.particles.filter(p => p.type === 'organic').length;

      // Update Badges & Counts
      if (countAllBadge) countAllBadge.innerText = totalCount;
      if (countRecBadge) countRecBadge.innerText = recCount;
      if (countOrgBadge) countOrgBadge.innerText = orgCount;
      if (summaryRecCount) summaryRecCount.innerText = recCount;
      if (summaryOrgCount) summaryOrgCount.innerText = orgCount;

      if (sceneSummaryTitle) {
        sceneSummaryTitle.innerText = `${totalCount} Waste Object${totalCount > 1 ? 's' : ''} Located & Identified`;
      }
      if (sceneSummarySub) {
        if (recCount > 0 && orgCount > 0) {
          sceneSummarySub.innerText = `Both Recyclable (Green) & Organic (Amber) located simultaneously`;
        } else if (recCount > 0) {
          sceneSummarySub.innerText = `Recyclable items located in scene`;
        } else {
          sceneSummarySub.innerText = `Organic compostable items located in scene`;
        }
      }

      // Update Distribution Bar
      const recPct = totalCount > 0 ? (recCount / totalCount) * 100 : 50;
      const orgPct = totalCount > 0 ? (orgCount / totalCount) * 100 : 50;
      if (distRecFill) distRecFill.style.width = `${recPct}%`;
      if (distOrgFill) distOrgFill.style.width = `${orgPct}%`;

      // Update Processing Log
      if (processingLog) {
        processingLog.innerHTML = `
          <div class="log-item"><i class="fa-solid fa-check"></i> Image analyzed: ${totalCount} object candidates evaluated</div>
          <div class="log-item"><i class="fa-solid fa-check"></i> Spatial localization: ${recCount} Recyclable (Green) • ${orgCount} Organic (Amber)</div>
          <div class="log-item"><i class="fa-solid fa-check"></i> Deep learning CNN classified objects individually in ${simulatedLatency}ms</div>
        `;
      }

      // Render Multi-Bounding Boxes on Viewport
      renderParticleBoundingBoxes(scene.particles);

      // Render Itemized Particles List
      renderItemizedParticlesList(scene.particles);

      // Initialize DL Reasoning Card with first item
      if (scene.particles.length > 0) {
        const first = scene.particles[0];
        if (reasoningItemTitle) reasoningItemTitle.innerText = `Item Inspection: #${first.id} ${first.name}`;
        if (reasoningConfBadge) {
          reasoningConfBadge.innerText = `${first.conf}% Confidence`;
          reasoningConfBadge.style.color = first.type === 'recyclable' ? '#059669' : '#d97706';
        }
        if (reasoningVisualText) reasoningVisualText.innerText = first.visual || 'Visual features detected.';
        if (reasoningLayerText) reasoningLayerText.innerText = first.layer || 'Convolutional activation verified.';
        if (reasoningActionText) reasoningActionText.innerHTML = first.action || 'Disposal advice ready.';
      }

      // Update Advice Tips
      if (tipRecText) tipRecText.innerText = scene.tipRec;
      if (tipOrgText) tipOrgText.innerText = scene.tipOrg;

      // Reset filter chip to "all"
      filterChips.forEach(c => c.classList.remove('active'));
      const allChip = document.querySelector('.filter-chip[data-filter="all"]');
      if (allChip) allChip.classList.add('active');
      currentActiveFilter = 'all';
    }, 550);
  }

  // Render Bounding Boxes with distinct colors for Recyclable & Organic
  function renderParticleBoundingBoxes(particles) {
    if (!multiBoxesContainer) return;
    multiBoxesContainer.innerHTML = '';

    particles.forEach(p => {
      const boxEl = document.createElement('div');
      boxEl.className = `particle-box ${p.type}`;
      boxEl.id = `box-particle-${p.id}`;
      boxEl.setAttribute('data-id', p.id);
      boxEl.setAttribute('data-type', p.type);
      boxEl.style.top = `${p.box.top}%`;
      boxEl.style.left = `${p.box.left}%`;
      boxEl.style.width = `${p.box.width}%`;
      boxEl.style.height = `${p.box.height}%`;

      const isRec = p.type === 'recyclable';
      const iconClass = isRec ? 'fa-solid fa-recycle' : 'fa-solid fa-leaf';
      const labelText = isRec ? 'RECYCLABLE' : 'ORGANIC';

      boxEl.innerHTML = `
        <span class="particle-tag-badge">
          <i class="${iconClass}"></i>
          <span>#${p.id} ${p.name} • ${p.conf}%</span>
        </span>
        <span class="particle-coord-pin">${labelText}</span>
      `;

      // Click on box highlights corresponding list item and updates DL reasoning
      boxEl.addEventListener('click', () => {
        const itemIndex = currentScene.particles.findIndex(item => item.id === p.id);
        if (itemIndex !== -1) {
          isolateSequentialItem(itemIndex);
        } else {
          highlightParticle(p.id);
        }
      });

      multiBoxesContainer.appendChild(boxEl);
    });
  }

  // Render the Itemized Cards list below the viewport
  function renderItemizedParticlesList(particles) {
    if (!particlesListContainer) return;
    particlesListContainer.innerHTML = '';

    particles.forEach((p, idx) => {
      const isRec = p.type === 'recyclable';
      const card = document.createElement('div');
      card.className = `particle-item-card ${p.type}`;
      card.id = `list-item-particle-${p.id}`;
      card.setAttribute('data-id', p.id);
      card.setAttribute('data-type', p.type);

      card.innerHTML = `
        <div class="particle-item-info">
          <span class="particle-item-dot"></span>
          <div class="particle-item-text">
            <span class="particle-item-name">#${p.id} ${p.name}</span>
            <span class="particle-item-location"><i class="fa-solid fa-crosshairs"></i> ${p.loc} • ${p.material}</span>
          </div>
        </div>
        <div class="particle-item-stats">
          <span class="particle-conf-value">${p.conf}%</span>
          <span class="particle-cat-label">${isRec ? 'Recyclable' : 'Organic'}</span>
        </div>
      `;

      // Hover and click interactions
      card.addEventListener('mouseenter', () => {
        if (!isSequentialActive) {
          highlightParticle(p.id, false);
        }
      });
      card.addEventListener('mouseleave', () => {
        if (!isSequentialActive) {
          clearParticleHighlights();
        }
      });
      card.addEventListener('click', () => {
        isolateSequentialItem(idx);
      });

      particlesListContainer.appendChild(card);
    });
  }

  // Highlight specific particle
  function highlightParticle(particleId, scrollIntoView = false) {
    const allBoxes = document.querySelectorAll('.particle-box');
    const allCards = document.querySelectorAll('.particle-item-card');

    allBoxes.forEach(b => b.classList.remove('focused'));
    allCards.forEach(c => c.classList.remove('active'));

    const targetBox = document.getElementById(`box-particle-${particleId}`);
    const targetCard = document.getElementById(`list-item-particle-${particleId}`);

    if (targetBox) targetBox.classList.add('focused');
    if (targetCard) {
      targetCard.classList.add('active');
      if (scrollIntoView) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  function clearParticleHighlights() {
    const allBoxes = document.querySelectorAll('.particle-box');
    const allCards = document.querySelectorAll('.particle-item-card');
    allBoxes.forEach(b => b.classList.remove('focused'));
    allCards.forEach(c => c.classList.remove('active'));
  }

  // Filter Boxes & Cards by Category (All / Recyclable / Organic)
  function applyFilterToParticles(filter) {
    const allBoxes = document.querySelectorAll('.particle-box');
    const allCards = document.querySelectorAll('.particle-item-card');

    allBoxes.forEach(box => {
      const type = box.getAttribute('data-type');
      if (filter === 'all' || type === filter) {
        box.classList.remove('hidden');
      } else {
        box.classList.add('hidden');
      }
    });

    allCards.forEach(card => {
      const type = card.getAttribute('data-type');
      if (filter === 'all' || type === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Initial Run on Load
  runMultiObjectInference(currentScene);
}

/* ==========================================================================
   5. CNN Model Architecture Explorer
   ========================================================================== */
function initModelArchitectureExplorer() {
  const layerBlocks = document.querySelectorAll('.layer-block');
  const inspName = document.getElementById('inspector-name');
  const inspOp = document.getElementById('inspector-op');
  const inspShape = document.getElementById('inspector-shape');
  const inspKernel = document.getElementById('inspector-kernel');
  const inspActivation = document.getElementById('inspector-activation');
  const inspDesc = document.getElementById('inspector-desc');

  const layersData = {
    input: {
      name: 'Input Layer',
      op: 'Tensor Acquisition & Normalization',
      shape: '(None, 224, 224, 3)',
      kernel: 'N/A',
      activation: 'Normalized [0.0, 1.0]',
      desc: 'Ingests standard 3-channel RGB image tensors scaled to 224x224 pixels. Preprocessing standardizes lighting variances across diverse municipal cameras.'
    },
    conv1: {
      name: 'Conv2D Block 1',
      op: 'Low-Level Spatial Feature Extraction',
      shape: '(None, 224, 224, 32)',
      kernel: '32 filters of 3×3 (stride=1, padding="same")',
      activation: 'ReLU (Rectified Linear Unit)',
      desc: 'Detects primitive edges, surface gradients, light reflections on transparent plastics, and fiber boundary contours.'
    },
    pool1: {
      name: 'MaxPooling2D Block 1',
      op: 'Spatial Dimension Reduction',
      shape: '(None, 112, 112, 32)',
      kernel: '2×2 pool size (stride=2)',
      activation: 'None (Subsampling)',
      desc: 'Reduces spatial resolution by 50% to minimize computational latency while ensuring spatial translation invariance.'
    },
    conv2: {
      name: 'Conv2D Block 2',
      op: 'Mid-Level Texture & Material Mapping',
      shape: '(None, 112, 112, 64)',
      kernel: '64 filters of 3×3 (stride=1, padding="same")',
      activation: 'ReLU',
      desc: 'Captures material textural patterns such as corrugated cardboard grain, plastic bottle creasing, and organic peel wrinkling.'
    },
    pool2: {
      name: 'MaxPooling2D Block 2',
      op: 'Spatial Downsampling',
      shape: '(None, 56, 56, 64)',
      kernel: '2×2 pool size (stride=2)',
      activation: 'None (Subsampling)',
      desc: 'Aggregates prominent mid-level features into compressed invariant representations.'
    },
    conv3: {
      name: 'Conv2D Block 3',
      op: 'High-Level Semantic Object Synthesis',
      shape: '(None, 56, 56, 128)',
      kernel: '128 filters of 3×3 (stride=1, padding="same")',
      activation: 'ReLU + BatchNormalization',
      desc: 'Synthesizes complete waste shapes: bottle caps, cans, banana peel stems, and fruit core structures.'
    },
    pool3: {
      name: 'MaxPooling2D Block 3',
      op: 'Final Convolutional Compression',
      shape: '(None, 28, 28, 128)',
      kernel: '2×2 pool size (stride=2)',
      activation: 'None (Subsampling)',
      desc: 'Final spatial compression stage before passing feature arrays to dense neural categorization.'
    },
    dense: {
      name: 'Dense Fully Connected Layer + Dropout',
      op: 'Global Feature Integration & Regularization',
      shape: '(None, 128)',
      kernel: '100,352 input weights -> 128 neurons',
      activation: 'ReLU (Dropout Rate = 0.50)',
      desc: 'Flattens feature volumes and maps high-dimensional patterns. Dropout at 50% randomly zeroes connections during training to halt co-adaptation.'
    },
    output: {
      name: 'Softmax Output Classification Layer',
      op: 'Binary Class Probability Distribution',
      shape: '(None, 2)',
      kernel: '128 weights -> 2 logits',
      activation: 'Softmax (Sum = 1.0)',
      desc: 'Outputs normalized posterior probabilities across [Organic, Recyclable]. Confidence scores above 0.5 define final waste bin assignment.'
    }
  };

  layerBlocks.forEach(block => {
    block.addEventListener('click', () => {
      const layerKey = block.getAttribute('data-layer');
      const data = layersData[layerKey];
      if (!data) return;

      layerBlocks.forEach(b => b.classList.remove('active'));
      block.classList.add('active');

      if (inspName) inspName.innerText = data.name;
      if (inspOp) inspOp.innerText = data.op;
      if (inspShape) inspShape.innerText = data.shape;
      if (inspKernel) inspKernel.innerText = data.kernel;
      if (inspActivation) inspActivation.innerText = data.activation;
      if (inspDesc) inspDesc.innerText = data.desc;
    });
  });
}

/* ==========================================================================
   6. Metric Counter Animation on Scroll
   ========================================================================== */
function initMetricCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          animateNumber(counter, target);
        });
      }
    });
  }, { threshold: 0.3 });

  const resultsSection = document.getElementById('results');
  if (resultsSection) observer.observe(resultsSection);

  function animateNumber(element, target) {
    let current = 0;
    const duration = 1600; // ms
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      current = target * easeOut;

      element.innerText = current.toFixed(1);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.innerText = target.toFixed(1);
      }
    }
    requestAnimationFrame(updateCounter);
  }
}

/* ==========================================================================
   7. Chart.js Performance Charts with Tab Switcher & Dark Mode Support
   ========================================================================== */
let trainingChartInstance = null;
let classChartInstance = null;

function initPerformanceCharts() {
  // Chart Tab Switching
  const chartTabs = document.querySelectorAll('.chart-tab');
  const chartPanes = document.querySelectorAll('.chart-pane');

  chartTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const chartType = tab.getAttribute('data-chart');
      chartTabs.forEach(t => t.classList.remove('active'));
      chartPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(`pane-${chartType}`);
      if (targetPane) targetPane.classList.add('active');

      // Trigger resize for Chart.js
      if (chartType === 'training' && trainingChartInstance) {
        trainingChartInstance.resize();
      } else if (chartType === 'comparison' && classChartInstance) {
        classChartInstance.resize();
      }
    });
  });

  renderTrainingCurveChart();
  renderClassMetricsChart();
}

function renderTrainingCurveChart() {
  const canvas = document.getElementById('trainingCurveChart');
  if (!canvas) return;

  const isDark = document.body.classList.contains('dark-mode');

  if (typeof Chart === 'undefined') {
    drawNativeTrainingChart(canvas, isDark);
    return;
  }

  const textColor = isDark ? '#a7c4b5' : '#4b6356';
  const gridColor = isDark ? '#1e3b2e' : '#edf3ed';

  const epochs = Array.from({ length: 25 }, (_, i) => `Epoch ${i + 1}`);
  
  // Empirical Training & Validation trajectory
  const trainAcc = [
    68.2, 74.5, 79.1, 82.4, 85.3, 87.0, 88.6, 90.1, 91.2, 92.0,
    92.8, 93.4, 94.0, 94.5, 95.0, 95.4, 95.8, 96.1, 96.3, 96.5,
    96.7, 96.9, 97.1, 97.2, 97.4
  ];

  const valAcc = [
    66.0, 72.8, 77.4, 80.9, 83.5, 85.8, 87.5, 89.0, 90.1, 91.0,
    91.8, 92.4, 93.1, 93.6, 94.0, 94.2, 94.4, 94.5, 94.5, 94.6,
    94.5, 94.6, 94.6, 94.6, 94.6
  ];

  const ctx = canvas.getContext('2d');
  trainingChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: epochs,
      datasets: [
        {
          label: 'Validation Accuracy (%)',
          data: valAcc,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.35,
          borderWidth: 3,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: '#10b981'
        },
        {
          label: 'Training Accuracy (%)',
          data: trainAcc,
          borderColor: '#0284c7',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 2,
          pointHoverRadius: 5,
          pointBackgroundColor: '#0284c7'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: textColor,
            font: { family: "'Outfit', sans-serif", weight: '600', size: 12 }
          }
        },
        tooltip: {
          backgroundColor: isDark ? '#182e24' : '#ffffff',
          titleColor: isDark ? '#ecfdf5' : '#0f291e',
          bodyColor: isDark ? '#a7c4b5' : '#4b6356',
          borderColor: isDark ? '#1e3b2e' : '#e5ede5',
          borderWidth: 1,
          padding: 10,
          boxPadding: 6,
          callbacks: {
            label: (context) => ` ${context.dataset.label}: ${context.parsed.y}%`
          }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 },
            maxTicksLimit: 10
          }
        },
        y: {
          min: 60,
          max: 100,
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 },
            callback: (val) => `${val}%`
          }
        }
      }
    }
  });
}

function renderClassMetricsChart() {
  const canvas = document.getElementById('classMetricsChart');
  if (!canvas) return;

  const isDark = document.body.classList.contains('dark-mode');

  if (typeof Chart === 'undefined') {
    drawNativeClassChart(canvas, isDark);
    return;
  }

  const textColor = isDark ? '#a7c4b5' : '#4b6356';
  const gridColor = isDark ? '#1e3b2e' : '#edf3ed';

  const ctx = canvas.getContext('2d');
  classChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Precision', 'Recall', 'F1-Score', 'Specificity'],
      datasets: [
        {
          label: 'Organic Waste (O)',
          data: [94.2, 95.1, 94.6, 94.1],
          backgroundColor: 'rgba(245, 158, 11, 0.85)',
          borderRadius: 8,
          barPercentage: 0.65
        },
        {
          label: 'Recyclable Waste (R)',
          data: [95.0, 94.1, 94.5, 95.1],
          backgroundColor: 'rgba(16, 185, 129, 0.85)',
          borderRadius: 8,
          barPercentage: 0.65
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: textColor,
            font: { family: "'Outfit', sans-serif", weight: '600', size: 12 }
          }
        },
        tooltip: {
          backgroundColor: isDark ? '#182e24' : '#ffffff',
          titleColor: isDark ? '#ecfdf5' : '#0f291e',
          bodyColor: isDark ? '#a7c4b5' : '#4b6356',
          borderColor: isDark ? '#1e3b2e' : '#e5ede5',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%`
          }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: { family: "'Outfit', sans-serif", weight: '600', size: 12 }
          }
        },
        y: {
          min: 85,
          max: 100,
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 },
            callback: (val) => `${val}%`
          }
        }
      }
    }
  });
}

function drawNativeTrainingChart(canvas, isDark) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = (rect.width || 600) * dpr;
  canvas.height = (rect.height || 360) * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width || 600;
  const h = rect.height || 360;
  const padding = 50;

  ctx.clearRect(0, 0, w, h);

  // Background grid
  ctx.strokeStyle = isDark ? '#1e3b2e' : '#edf3ed';
  ctx.lineWidth = 1;
  for (let y = 60; y <= 100; y += 10) {
    const yPos = h - padding - ((y - 60) / 40) * (h - padding * 2);
    ctx.beginPath();
    ctx.moveTo(padding, yPos);
    ctx.lineTo(w - padding, yPos);
    ctx.stroke();

    ctx.fillStyle = isDark ? '#a7c4b5' : '#4b6356';
    ctx.font = '11px sans-serif';
    ctx.fillText(`${y}%`, 15, yPos + 4);
  }

  // Draw curves
  const valAcc = [66.0, 77.4, 83.5, 87.5, 90.1, 91.8, 93.1, 94.0, 94.4, 94.6];
  const stepX = (w - padding * 2) / (valAcc.length - 1);

  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 3;
  ctx.beginPath();
  valAcc.forEach((val, i) => {
    const x = padding + i * stepX;
    const y = h - padding - ((val - 60) / 40) * (h - padding * 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Dots
  ctx.fillStyle = '#10b981';
  valAcc.forEach((val, i) => {
    const x = padding + i * stepX;
    const y = h - padding - ((val - 60) / 40) * (h - padding * 2);
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawNativeClassChart(canvas, isDark) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = (rect.width || 600) * dpr;
  canvas.height = (rect.height || 360) * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width || 600;
  const h = rect.height || 360;
  const padding = 50;

  ctx.clearRect(0, 0, w, h);
  const labels = ['Precision', 'Recall', 'F1-Score', 'Specificity'];
  const organicVals = [94.2, 95.1, 94.6, 94.1];
  const recyclableVals = [95.0, 94.1, 94.5, 95.1];

  const groupWidth = (w - padding * 2) / labels.length;
  const barWidth = 26;

  labels.forEach((label, i) => {
    const groupX = padding + i * groupWidth + (groupWidth - barWidth * 2 - 8) / 2;
    
    // Organic bar
    const oH = ((organicVals[i] - 80) / 20) * (h - padding * 2);
    ctx.fillStyle = 'rgba(245, 158, 11, 0.85)';
    ctx.fillRect(groupX, h - padding - oH, barWidth, oH);

    // Recyclable bar
    const rH = ((recyclableVals[i] - 80) / 20) * (h - padding * 2);
    ctx.fillStyle = 'rgba(16, 185, 129, 0.85)';
    ctx.fillRect(groupX + barWidth + 8, h - padding - rH, barWidth, rH);

    // Label
    ctx.fillStyle = isDark ? '#a7c4b5' : '#4b6356';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, groupX + barWidth + 4, h - padding + 20);
  });
}

function updateChartColors(isDark) {
  const textColor = isDark ? '#a7c4b5' : '#4b6356';
  const gridColor = isDark ? '#1e3b2e' : '#edf3ed';

  [trainingChartInstance, classChartInstance].forEach(chart => {
    if (!chart) return;
    if (chart.options.scales.x) {
      chart.options.scales.x.ticks.color = textColor;
      chart.options.scales.x.grid.color = gridColor;
    }
    if (chart.options.scales.y) {
      chart.options.scales.y.ticks.color = textColor;
      chart.options.scales.y.grid.color = gridColor;
    }
    if (chart.options.plugins.legend) {
      chart.options.plugins.legend.labels.color = textColor;
    }
    chart.update();
  });
}

/* ==========================================================================
   8. Contact Form & Toast Notifications
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (form && submitBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const msgInput = document.getElementById('contact-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !msgInput.value.trim()) {
        showToast('Please fill out all required fields.', 'warning');
        return;
      }

      // Simulate sending animation
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-arrow-right"></i>`;
        
        showToast(`Thank you, ${nameInput.value.trim()}! Your message has been sent to the EcoSort team.`, 'success');
        form.reset();
      }, 1000);
    });
  }
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOutRight 0.35s ease forwards';
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}
