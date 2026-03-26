# 🚀 Locarda Next.js Project

A Next.js application that transcribes audio recordings and generates detailed pathology reports using AI.

---

## 📦 Prerequisites

Make sure you have the following installed:

* Node.js (v18 or higher recommended)
* npm / yarn / pnpm

---

## ⚙️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/bhumikaPandeyCodes/locarda-next.git
cd locarda-next
```

2. **Install dependencies**

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and add the following:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
DEEPGRAM_API_KEY=your-deepgram-api-here
```



---

## ▶️ Running the Project Locally

Start the development server:

```bash
npm run dev
```

Now open your browser and go to:

```
http://localhost:3000
```

---

## 🧠 Features

* 🎙️ Audio transcription
* 🧾 AI-generated pathology reports
* 🔐 Secure API handling using backend routes

---

## 🏗️ Tech Stack

* Next.js
* Anthropic API (Claude)

---

## 🚨 Security Notes

* API keys are stored securely using environment variables
* Do not expose secrets in frontend code
* Ensure `.env` is included in `.gitignore`

---

## 📁 Project Structure (Simplified)

```
/app        → Frontend routes (Next.js App Router)
/app/api        → Backend API routes
/lib
/images
/hooks
/eoi-templates
/components → UI components
/utils      → Helper functions
```

---

## 🛠️ Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Run production build
```

---

