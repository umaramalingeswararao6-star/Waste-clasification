# EcoSort: AI-Powered Waste Classification

🌱 **EcoSort** is a modern, responsive one-page web application and interactive showcase for an automated AI waste segregation system powered by Convolutional Neural Networks (CNN).

---

## 🌟 Features & Sections Included

1. **Hero Section**:
   - High-impact headline: *"Sort Waste Smarter with AI"*
   - Dynamic tagline and dual CTAs: **Try the Demo** and **Explore CNN Model**
   - Live KPI chips (94.6% Validation Accuracy, <45ms Latency, 25k+ Dataset Samples)
   - 3D render illustration with floating interactive category badges and laser scanline animation

2. **About the Project**:
   - Highlights the global 2.1B-ton municipal solid waste crisis
   - The Contamination Dilemma: why manual segregation fails (high labor costs, landfill methane emissions)
   - What EcoSort solves: 80% landfill diversion, 3x higher recycling purity, edge/cloud compatibility

3. **How It Works (4-Step Pipeline)**:
   - **Step 01 - Upload Image**: Input via camera, optical sensor, or file upload
   - **Step 02 - Preprocess**: 224×224×3 RGB normalization, augmentation & contrast tuning
   - **Step 03 - CNN Predicts**: Spatial convolution, MaxPooling, and dense layer computation
   - **Step 04 - Result Shown**: Categorized as **Recyclable (R)** or **Organic (O)** with confidence score

4. **Live Interactive Multi-Particle Demo**:
   - **Simultaneous Dual Detection**: Detects **both Recyclable and Organic** particles at the same time in the same scene.
   - **Color-Coded Localization**:
     - 🟢 **Recyclable Particles (Emerald / Cyan)**: Bounding boxes with `#10b981` borders, tags (e.g., PET Bottle, Crushed Can), and confidence percentages.
     - 🟠 **Organic Particles (Vibrant Amber / Orange)**: Bounding boxes with `#f59e0b` borders, tags (e.g., Banana Peel, Apple Core), and compostable indicators.
   - **Interactive Presets**:
     - **Conveyor Belt Stream**: 4 simultaneous mixed items (2 Recyclable • 2 Organic)
     - **Cafeteria Tray**: Bottle & Banana Peel side-by-side
     - **Office Desk Trash**: Crushed Can & Apple Core side-by-side
     - **Single-Item Samples**: Isolated test objects
     - **Custom Image Upload**: Scans user photos and identifies multiple waste particles with coordinates
   - **Interactive Particle List & Filters**: Click/hover on any particle to spotlight its location on the image; filter by All, Recyclable Only, or Organic Only.
   - **Dual Segregation Advice**: Dedicated instructions for both the Blue Recycling Bin and Green Compost Bin.
   - **Dashboard Showcase**: Tablet HUD interface mockup with viewfinder and diversion analytics.

5. **CNN Model Architecture & Training Setup**:
   - **Interactive Layer Explorer**: Click any layer block (Input → Conv2D #1 → MaxPool #1 → Conv2D #2 → MaxPool #2 → Conv2D #3 → MaxPool #3 → Dense + Dropout → Softmax Output) to inspect receptive fields, tensor dimensions, and activation formulas
   - **Dataset Specifications**: 25,077 clean images (Waste-to-Wealth benchmark: 12,565 Organic, 12,512 Recyclable)
   - **Training Setup**: Adam Optimizer (lr=0.0001), Binary Cross-Entropy loss, 25 epochs with EarlyStopping on NVIDIA T4 GPU

6. **Results & Evaluation**:
   - Animated KPI metric counters:
     - **Test Accuracy**: 94.6%
     - **Precision**: 94.2%
     - **Recall**: 95.1%
     - **F1-Score**: 94.6%
   - Interactive charts (with native Canvas 2D fallback for offline reliability):
     - Training & Validation accuracy convergence curves
     - Organic vs Recyclable per-class precision/recall comparison
     - Interactive Confusion Matrix with tooltip annotations

7. **Tech Stack**:
   - **Python 3.10+**: Core programming language
   - **TensorFlow / Keras**: Deep learning modeling & quantization
   - **OpenCV (cv2)**: Image processing, bounding boxes, and camera stream integration
   - **Google Colab**: Cloud GPU acceleration (NVIDIA T4)
   - **NumPy & Pandas**: Matrix manipulation and dataset balancing
   - **Matplotlib & Seaborn**: Diagnostic metric plots

8. **Future Scope (Roadmap)**:
   - **Phase 2**: 6-Class Waste Segmentation (Glass, Plastic, Metal, Paper, Organic, E-Waste)
   - **Phase 3**: Mobile App (iOS & Android) with TensorFlow Lite offline on-device inference
   - **Phase 4**: Autonomous IoT Smart Bin with Raspberry Pi/Jetson and servo flap actuation

9. **Team & Contact**:
   - Team cards for project contributors
   - Interactive contact message form with animated validation and toast notifications
   - Direct links to GitHub repository and Google Colab

10. **Aesthetics & Theme**:
    - Fresh green and snowy white palette (emerald, jade, mint accents)
    - Dark Emerald theme toggle with localStorage persistence
    - Smooth responsive layout for mobile, tablet, and desktop

---

## 🚀 How to Run Locally

You can open the website immediately in any modern web browser:

1. Double-click [index.html](file:///c:/Users/umara/OneDrive/Documents/Waste%20clasification/index.html) in File Explorer, or
2. Right-click [index.html](file:///c:/Users/umara/OneDrive/Documents/Waste%20clasification/index.html) and select **Open with > Google Chrome** (or Edge/Brave/Firefox).
