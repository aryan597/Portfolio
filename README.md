# Aryan Somayajula — AI Engineer & Product Builder

![Portfolio Banner](public/aryan.jpg)

> **Live Site:** [https://aryan597.github.io/Portfolio/](https://aryan597.github.io/Portfolio/)

This repository contains the source code for my personal portfolio — a digital sandbox showcasing my work as an AI Engineer and Product Builder. 

The site is built to move beyond a traditional resume. It reflects a modern "product lab" aesthetic, featuring a custom interactive **AI Lab** that connects to live machine learning models for real-time inference.

## 🚀 The AI Lab (Interactive Features)

The portfolio includes a dedicated `AILab` component that demonstrates real ML capabilities directly in the browser:

- **AI Resume Analyzer:** Users can upload a resume (PDF/DOCX) and paste a job description. The frontend hits a live Python/FastAPI backend to evaluate ATS compatibility, extracting skill gaps and returning a scored ATS gauge.
- **ML Pipeline Visualization:** A scroll-driven interactive breakdown of a production Machine Learning pipeline, built using GSAP ScrollTrigger.
- **Live Skill Prediction:** A client-side predictive inference widget that scores user-inputted tech skills against market patterns, rendering a dynamic confidence bar and tier rating (e.g., "Strong Profile").

## 🛠️ Tech Stack & Architecture

This is a modern, single-page React frontend optimized for performance and fluid micro-interactions.

### Core Framework
- **React 18** + **Vite:** Blazing fast hot-module replacement and optimized production builds.
- **JavaScript (ES6+)**

### Styling & Animation
- **Vanilla CSS3:** Custom design system utilizing CSS variables for deeply integrated theming, bypassing utility classes for ultimate structural control.
- **Glassmorphism & Neo-brutalism:** A hybrid design language featuring blurred translucent surfaces, high-contrast borders, and glowing accents.
- **Framer Motion:** Orchestrates layout animations, spring physics, hover elevations, and page transitions.
- **GSAP (GreenSock):** Powers complex, scroll-linked timeline animations (ScrollTrigger) within the AI Lab.
- **Lucide React:** Clean, consistent SVG iconography.

### External Integrations
- Connects to my custom Render-hosted API Gateway (`rsft-gateway-d22q`) for processing heavy AI inferences.

## 💻 Local Development Setup

If you want to clone this project to explore the code or run it locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aryan597/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

## 📦 Deployment

The site is automatically deployed to **GitHub Pages** via GitHub Actions.
Any pushes or merges to the `main` branch trigger the `.github/workflows/deploy.yml` pipeline, building the Vite bundle and publishing the `dist` folder.

## 📄 License

This project is open-source and available under the MIT License. Feel free to fork it, learn from the animations, or adapt the architecture for your own portfolio.
