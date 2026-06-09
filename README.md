# Brew & Bite
A beautiful, modern café website for **Brew & Bite** (Surry Hills, Sydney) with an AI-powered barista named **Bean**.
Built as a showcase of a RAG (Retrieval-Augmented Generation) system integrated into a delightful customer-facing experience. Ask Bean anything about the menu, dietary requirements, recommendations, or café details — he's been trained on the full menu and café knowledge.
![Brew & Bite Hero](https://via.placeholder.com/800x400/1c1916/c8a267?text=Brew+%26+Bite)
## ✨ Features
- **Stunning Café Design** — Elegant serif typography, warm earthy color palette, and smooth animations
- **Fully Interactive Menu** — Coffee, cold brew, non-coffee drinks, breakfast, lunch, and pastries
  - Multiple sizes with pricing
  - Dietary tags (V, VG, GF, DF, etc.)
  - Popular items, add-ons, and chef notes
  - Smart filtering by category
- **AI Barista "Bean"** — Real-time conversational chat powered by RAG
  - Answers menu questions, makes recommendations, explains dietary options
  - Persistent chat history with smooth UX
  - Loading states and error handling
- **Responsive Design** — Works beautifully on mobile, tablet, and desktop
- **Modern Tech Stack** — Built with the latest tools
## 🛠 Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + PostCSS
- **UI Components**: Lucide React icons
- **AI/RAG**: Custom API integration (`/chat` endpoint via ngrok)
- **Development**: Vite, React Plugin, TypeScript 6
## 🚀 Quick Start
### Prerequisites
- Node.js (v18 or higher)
- A running RAG backend (currently configured for ngrok)
### Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/gauravdawar08/rag-menu.git
   cd rag-menu
Install frontend dependencies

cd frontend
npm install
Configure environment variables

cp .env.example .env
Update VITE_API_URL in .env with your RAG backend URL (currently points to an ngrok tunnel).

Start the development server

npm run dev
Open http://localhost:5173 in your browser.

Available Scripts
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
📁 Project Structure
frontend/
├── src/
│   ├── App.tsx              # Main café website + AI chat
│   ├── api.ts               # RAG API client (askRAG)
│   ├── data/
│   │   └── menu.ts          # All menu data, café info, dietary legend
│   ├── main.tsx
│   └── index.css
├── .env.example
├── vite.config.ts
├── tailwind.config (via @tailwindcss/vite)
├── package.json
└── ...
🧠 How the AI Works
The floating "Ask Bean" button opens a sidebar chat. When you send a message:

The frontend calls askRAG() in src/api.ts
It posts to {VITE_API_URL}/chat with the question
The RAG backend retrieves relevant menu/cafe context and generates a helpful response
Response appears in the chat with smooth scrolling
The menu data in menu.ts serves as the knowledge base for the RAG system.

🎨 Design Philosophy
Warm, inviting color palette (#1c1916, #c8a267, #f4efe6)
Generous typography and whitespace
Subtle animations and hover effects
Mobile-first responsive design
🗺 Roadmap / Future Improvements
Add real backend integration (FastAPI + LangChain + vector database)
Menu management admin panel
Online ordering integration
Table reservation system
Multiple café locations
Voice input for Bean
Dark mode
📄 License
MIT

