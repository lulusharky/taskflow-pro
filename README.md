<<<<<<< HEAD
# TaskFlow Pro 🚀

A professional full-stack task management application built with modern technologies. TaskFlow Pro provides a clean, intuitive interface for managing tasks and projects, similar to simplified versions of Trello or Notion.

![TaskFlow Pro](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

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
- **FastAPI**: Modern, fast web framework for building APIs with Python
- **SQLAlchemy**: Powerful ORM for database operations
- **Pydantic**: Data validation using Python type annotations
- **JWT (JSON Web Tokens)**: Secure authentication mechanism
- **SQLite/PostgreSQL**: Database support (SQLite for development, PostgreSQL for production)
- **Passlib**: Password hashing with bcrypt
- **Uvicorn**: ASGI server for running FastAPI

### Frontend
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests
- **Lucide React**: Beautiful icon library

## 📁 Project Structure

```
taskflow2/
├── backend/                 # FastAPI backend application
│   ├── app/
│   │   ├── main.py         # FastAPI application entry point
│   │   ├── config.py       # Configuration settings
│   │   ├── models.py       # SQLAlchemy database models
│   │   ├── schemas.py      # Pydantic schemas for validation
│   │   ├── database.py     # Database connection setup
│   │   ├── auth.py         # Authentication dependencies
│   │   ├── routes/         # API route handlers
│   │   │   ├── auth.py     # Authentication endpoints
│   │   │   ├── tasks.py    # Tasks CRUD endpoints
│   │   │   └── projects.py # Projects CRUD endpoints
│   │   └── utils/          # Utility functions
│   │       └── security.py # Password hashing, JWT utilities
│   ├── requirements.txt    # Python dependencies
│   └── .env.example       # Environment variables template
├── frontend/               # React frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Auth/      # Authentication forms
│   │   │   ├── Dashboard/# Dashboard components
│   │   │   ├── UI/        # Reusable UI components
│   │   │   └── Layout/    # Layout components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service layer
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   ├── package.json       # Node.js dependencies
│   ├── tsconfig.json      # TypeScript configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── vite.config.ts     # Vite configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.9 or higher)
- **npm** or **yarn** (for frontend dependencies)
- **pip** (for Python dependencies)

### Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd taskflow2
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Edit .env file with your settings
# DATABASE_URL=sqlite:///./taskflow.db
# SECRET_KEY=your-secret-key-here
# ALGORITHM=HS256
# ACCESS_TOKEN_EXPIRE_MINUTES=30
```

#### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# or with yarn
yarn install
```

### Running the Application

#### Start Backend

```bash
# From backend directory
cd backend

# Activate virtual environment if not already active
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux

# Run the FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at `http://localhost:8000`

API Documentation (Swagger UI): `http://localhost:8000/docs`

#### Start Frontend

```bash
# From frontend directory
cd frontend

# Run the development server
npm run dev

# or with yarn
yarn dev
```

The frontend application will be available at `http://localhost:5173`

### Usage

1. **Register**: Create a new account at `/register`
2. **Login**: Sign in with your credentials at `/login`
3. **Dashboard**: Access your dashboard at `/dashboard`
4. **Create Projects**: Add projects to organize your tasks
5. **Manage Tasks**: Create, edit, complete, and delete tasks
6. **Filter Tasks**: Use the filter bar to show all, pending, or completed tasks

## 🔧 Configuration

### Backend Configuration

Edit `backend/.env` file:

```env
DATABASE_URL=sqlite:///./taskflow.db  # or postgresql://user:password@localhost/dbname
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend Configuration

The frontend is configured to proxy API requests to the backend. To change the backend URL, edit `frontend/src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:8000'; // Change this if needed
```

## 📸 Screenshots

*(Add screenshots of your application here)*

### Login Page
![Login Page](screenshots/login.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Task Management
![Task Management](screenshots/tasks.png)

## 🧪 Testing

### Backend Testing

```bash
cd backend
pytest
```

### Frontend Testing

```bash
cd frontend
npm test
```

## 🚢 Deployment

### Backend Deployment

1. Set up a PostgreSQL database
2. Update `DATABASE_URL` in environment variables
3. Use a production ASGI server like Gunicorn with Uvicorn workers
4. Deploy to a cloud platform (AWS, Google Cloud, Heroku, etc.)

### Frontend Deployment

1. Build the production bundle:
```bash
cd frontend
npm run build
```

2. Deploy the `dist/` folder to a static hosting service (Vercel, Netlify, AWS S3, etc.)

## 🔐 Security Considerations

- Change the `SECRET_KEY` in production
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Add input validation and sanitization
- Use environment variables for sensitive data
- Implement CORS properly for production domains

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Author

**Your Name** - *Initial work* - [Your Portfolio](https://yourportfolio.com)

## 🙏 Acknowledgments

- FastAPI team for the amazing framework
- React community for the excellent library
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icon set

## 📞 Support

For support, email support@taskflowpro.com or open an issue in the repository.

---

Built with ❤️ using modern web technologies
=======
# taskflow-pro
Full Stack Task Management App built with React, TypeScript, FastAPI and SQLite. Features authentication, projects, tasks, filters and modern UI.
>>>>>>> 19fd88ac0fc4e44a569d1282cf4de9379a9c7a37
