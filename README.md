# 🚀 Skillora AI

Skillora AI is an AI-powered personalized learning platform that helps students learn, practice, plan their careers, track progress, and receive intelligent AI guidance.

## ✨ Features

- 🤖 AI-powered learning assistant
- 📝 AI-generated study notes
- 🧠 Interactive AI quizzes
- 🗺️ Personalized learning roadmaps
- ▶️ Educational YouTube resources
- 📊 Learning progress tracking
- 🎯 Career-based learning paths
- 💬 Context-aware AI Coach
- 👤 Student profiles and achievements
- 🔐 Authentication and protected routes
- 🌐 Multi-language AI content
- ⚡ n8n workflow automation
- 🗄️ Supabase integration

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Lucide React

### Backend & Database

- Supabase
- REST APIs
- Axios

### AI & Automation

- Mistral AI
- n8n
- YouTube Data API

## 📂 Project Structure

```text
src/
├── assets/
├── components/
│   ├── assistant/
│   ├── common/
│   ├── dashboard/
│   ├── learn/
│   ├── notes/
│   ├── profile/
│   ├── quiz/
│   ├── roadmap/
│   └── settings/
├── context/
├── layouts/
├── pages/
├── services/
├── styles/
├── supabase/
├── utils/
├── App.jsx
├── App.css
├── index.css
└── main.jsx

SKILLORA AI workflow n8n.json


🧩 What Each Module Does
🏠 Dashboard

Shows learning progress, skills, activities, quizzes, recommendations, and statistics.

📚 Learn

Provides courses, documentation, practice problems, recommended skills, and educational YouTube resources.

📝 Notes

Generates structured AI study notes with explanations, key points, and summaries.

🧠 Quiz

Generates topic-based MCQs with options, correct answers, and explanations.

🗺️ Roadmap

Creates personalized career learning paths with stages, topics, technologies, milestones, and projects.

🤖 AI Coach

Provides personalized help with programming, debugging, interviews, career guidance, projects, and learning strategies.

👤 Profile

Displays student information, achievements, certificates, projects, and learning statistics.

⚙️ Settings

Manages account, notification, privacy, and application preferences.

🔐 Authentication

Handles registration, login, email verification, password reset, and protected routes.

⚡ n8n Automation

Skillora AI uses n8n to connect the frontend with AI models and external APIs. Requests are routed to the selected module, processed, converted into structured responses, and returned to the frontend.

The workflow is included in:

SKILLORA AI workflow n8n.json


🎯 Goal

Skillora AI brings learning, practice, career planning, resources, progress tracking, and AI guidance together in one personalized platform.

The goal is to make learning personalized, interactive, and accessible through AI.
