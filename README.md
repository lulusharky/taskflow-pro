# TaskFlow Pro 🚀

A professional full-stack task management application built with modern technologies. TaskFlow Pro provides a clean, intuitive interface for managing tasks and projects, similar to simplified versions of Trello or Notion.

## 📋 Features

### Core Functionality
- **User Authentication**: Complete registration, login, and logout system with JWT token-based authentication
- **Task Management**: Create, edit, delete, and mark tasks as completed
- **Project Organization**: Organize tasks into projects/lists with custom colors
- **Smart Filtering**: Filter tasks by status (All/Pending/Completed)
- **Priority System**: Set task priorities (Low/Medium/High) with visual indicators
- **Due Dates**: Track task deadlines with date display
- **Responsive Design**: Fully responsive interface that works on desktop and mobile

### Technical Features
- **Protected Routes**: Dashboard and protected pages require authentication
- **Real-time Updates**: Immediate UI updates after CRUD operations
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Type Safety**: Full TypeScript implementation for type safety
- **Modern UI**: Clean, professional interface using Tailwind CSS

## 🛠 Technologies Used

### Backend
- **FastAPI** + **SQLAlchemy** + **Pydantic**
- **JWT** Authentication
- **SQLite** (easily upgradable to PostgreSQL)

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS**
- **React Router** + **Axios** + **Lucide React**

## 🚀 Getting Started

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
Frontend
Bashcd frontend
npm install
npm run dev

Frontend: http://localhost:5173
Backend API: http://localhost:8000
API Docs: http://localhost:8000/docs

📁 Project Structure
texttaskflow-pro/
├── backend/
└── frontend/
👤 Author
José Luís

GitHub: lulusharky

Built with ❤️ using modern web technologies
text4. Guarda o ficheiro
