Skillora AI

Skillora AI is an AI-powered personalized learning platform designed to help students learn, practice, plan their careers, and receive intelligent guidance through multiple AI-powered learning modules.

Features
🤖 AI-powered personal learning assistant
📝 AI-generated study notes
🗺️ Personalized learning roadmaps
🧠 AI-generated interactive quizzes
▶️ Educational YouTube resource recommendations
📚 Topic-based learning resources
📊 Learning progress tracking
🎯 Career and skill-based learning paths
💬 Context-aware AI Coach
👤 Student profile and achievements
📈 Dashboard with learning statistics
🔐 User authentication and protected routes
🌐 Multi-language AI content generation
⚡ n8n workflow automation
🗄️ Supabase integration


Tech Stack
Frontend
React
Vite
JavaScript
CSS
Tailwind CSS
React Router
Lucide React



Backend & Database
Supabase
REST APIs
Axios
AI & Automation
Mistral AI
n8n
AI-powered workflows
YouTube Data API

📂 Project Structure

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

🤖 AI Learning Modules

Skillora AI provides multiple personalized learning modules:

AI Notes Generator — Creates concise and structured study notes.
AI Quiz Generator — Generates topic-based MCQs with answers and explanations.
AI Roadmap Generator — Creates step-by-step learning paths based on career goals and skill levels.
AI Coach — Provides programming help, debugging assistance, interview preparation, career guidance, and learning suggestions.
YouTube Resources — Finds relevant educational videos based on the learner's selected topic and preferences.



⚙️ Automation

Skillora AI uses n8n workflows to connect the frontend with AI services and APIs. Requests are routed according to the selected learning module, processed by the required AI workflow, converted into structured responses, and returned to the frontend.

🗄️ Database

Supabase is used for authentication, user profiles, learning data, progress tracking, and application-related data.

🎯 Goal

Skillora AI aims to provide students with a single personalized learning platform where they can learn new topics, generate study materials, practice through quizzes, follow career roadmaps, access educational resources, and interact with an AI learning coach.
