# ContentForge AI - Setup Guide

This guide provides step-by-step instructions to get the project running on a new computer.

## 1. Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/)

## 2. Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd contentforge-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## 3. Firebase Configuration

You need to connect the app to your own Firebase project.

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new project (e.g., `content-forge-ai`).
3.  **Enable Authentication:**
    - Go to **Build > Authentication**.
    - Enable **Email/Password** and **Google** (optional) sign-in methods.
4.  **Create Firestore Database:**
    - Go to **Build > Firestore Database**.
    - Click **Create database** and start in **Test Mode** (or update rules later).
5.  **Get App Configuration:**
    - Go to **Project Settings** (gear icon) > **General**.
    - Under **Your apps**, click the Web icon (`</>`) to register a new app.
    - Copy the `firebaseConfig` object.
6.  **Update the code:**
    - Open `src/firebase/config.ts` and replace the existing `firebaseConfig` values with your own.

## 4. AI (Genkit) Configuration

This app uses Google's Gemini models via Genkit.

1.  Go to [Google AI Studio](https://aistudio.google.com/).
2.  Create a new **API Key**.
3.  **Set Environment Variables:**
    - Create a file named `.env` in the root directory.
    - Add your API key:
      ```env
      GOOGLE_GENAI_API_KEY=your_actual_api_key_here
      ```

## 5. Development Workflow

### Start the Application
Run the Next.js development server:
```bash
npm run dev
```
The app will be available at `http://localhost:9002` (or the port specified in your console).

### Genkit Developer UI
To test and debug AI flows locally:
```bash
npm run genkit:dev
```
This opens the Genkit UI at `http://localhost:4000`.

## 6. Project Structure

- `src/app`: Next.js pages and layouts.
- `src/ai`: Genkit flows and AI prompt logic.
- `src/components`: UI components (ShadCN, custom).
- `src/firebase`: Firebase initialization and custom hooks.
- `docs/backend.json`: Database schema definition.
