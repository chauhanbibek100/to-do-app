# TaskMaster Pro - Advanced Todo Application

## Full-Stack MERN Application with CRUD Operations

A professional, production-ready Todo application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) with advanced features, modern UI, and comprehensive CRUD operations.

---

## 🚀 Features

### Core Features

- **✅ Complete CRUD Operations** - Create, Read, Update, Delete todos
- **📊 Real-time Statistics** - Track active, completed, and overdue tasks
- **🏷️ Task Categories** - Work, Personal, Shopping, Health, Other
- **🎯 Priority Levels** - Low, Medium, High priority tasks
- **📅 Due Dates** - Set and track task deadlines
- **🔍 Advanced Filtering** - Filter by status, category, priority
- **🔎 Search Functionality** - Search tasks by title and description
- **📌 Tags Support** - Add tags to organize tasks
- **⏰ Overdue Detection** - Automatic detection of overdue tasks
- **📝 Inline Editing** - Edit task details directly
- **🎨 Modern UI** - Beautiful, responsive design with animations

### Advanced Features

- **Task Statistics Dashboard** - Visual overview of task metrics
- **Inline Editing** - Edit tasks without page reload
- **Description Support** - Add detailed descriptions to tasks
- **Real-time Updates** - Live synchronization with backend
- **Error Handling** - Comprehensive error messages and toasts
- **Responsive Design** - Works seamlessly on mobile, tablet, desktop
- **Data Persistence** - MongoDB for reliable data storage
- **API Validation** - Input validation on backend and frontend

---

## 📋 Prerequisites

- **Node.js** 18.0 or higher
- **MongoDB** 6.0 or higher (local or Atlas)
- **npm** (comes with Node.js)
- **VS Code** (optional but recommended)

---

## 🛠️ Installation & Setup

### 1. Clone/Download the Project

```bash
cd TO-DO-APP
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure MongoDB (edit .env if needed)
# Default: mongodb://localhost:27017/todoDB
# For MongoDB Atlas, update MONGODB_URI in .env

# Start the backend server
npm start
# OR for development with auto-reload
npm install -g nodemon
npm run dev
```

**✓ Backend runs on:** `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

**✓ Frontend runs on:** `http://localhost:3000`

---

## 🔗 API Endpoints

### Get All Todos

```http
GET /api/todos
```

**Query Parameters:**

- `filter` - 'active' or 'completed'
- `category` - Task category
- `priority` - 'low', 'medium', 'high'
- `search` - Search term
- `sort` - 'date-asc', 'date-desc', 'priority', 'duedate'

**Example:**

```
GET /api/todos?filter=active&sort=priority
```

### Get Single Todo

```http
GET /api/todos/:id
```

### Create Todo

```http
POST /api/todos
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the MERN todo app",
  "priority": "high",
  "category": "work",
  "dueDate": "2026-04-20",
  "tags": ["urgent", "important"]
}
```

### Update Todo

```http
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Updated title",
  "completed": true,
  "priority": "medium"
}
```

### Delete Todo

```http
DELETE /api/todos/:id
```

### Delete All Completed Todos

```http
DELETE /api/todos/completed/delete-all
```

### Get Statistics

```http
GET /api/todos/stats/summary
```

---

## 📁 Project Structure

```
TO-DO-APP/
├── backend/
│   ├── models/
│   │   └── Todo.js              # MongoDB schema for todos
│   ├── routes/
│   │   └── todoRoutes.js        # Todo API endpoints
│   ├── server.js                # Express server setup
│   ├── .env                     # Environment variables
│   └── package.json             # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoApp.js       # TODO: Main app component
│   │   │   ├── TodoForm.js      # Add todo form
│   │   │   ├── TodoItem.js      # Individual todo item
│   │   │   ├── TodoFilters.js   # Filter controls
│   │   │   └── TodoStats.js     # Statistics dashboard
│   │   ├── services/
│   │   │   └── todoService.js   # API service
│   │   ├── styles/
│   │   │   ├── index.css        # Global styles
│   │   │   ├── App.css          # App component styles
│   │   │   ├── TodoForm.css     # Form styles
│   │   │   ├── TodoItem.css     # Todo item styles
│   │   │   ├── TodoFilters.css  # Filter styles
│   │   │   └── TodoStats.css    # Stats styles
│   │   ├── App.js               # Main App component
│   │   └── index.js             # React entry point
│   ├── public/
│   │   └── index.html           # HTML template
│   └── package.json             # Frontend dependencies
```

---

## 🎨 UI/UX Features

### Modern Design

- **Gradient Background** - Beautiful purple gradient theme
- **Smooth Animations** - Slide, fade, and scale animations
- **Responsive Grid** - Mobile-first responsive design
- **Icon Support** - Emoji and meaningful icons
- **Dark Elements** - Semi-transparent components with blur effect

### User Experience

- **Toast Notifications** - User feedback for all actions
- **Loading States** - Visual feedback during data fetching
- **Empty States** - Helpful messages when no tasks exist
- **Hover Effects** - Interactive visual feedback
- **Form Validation** - Real-time input validation

### Accessibility

- **Semantic HTML** - Proper heading and form structure
- **Color Contrast** - WCAG compliant text contrast
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Support** - ARIA labels and descriptions

---

## 🧪 Testing the Application

### 1. Test Adding a Task

- Click "Add a new task..."
- Expand the form with additional details
- Set category, priority, due date
- Add tags
- Click "Create Task"

### 2. Test Filtering

- Use the filter buttons to show Active/Completed tasks
- Use category buttons to filter by type
- Use priority buttons to sort by urgency
- Use search to find specific tasks

### 3. Test Editing

- Click the pencil icon on any task
- Modify the title and description
- Click Save to apply changes

### 4. Test Completion

- Click checkbox to mark task complete/incomplete
- Completed tasks get strikethrough styling

### 5. Test Deletion

- Click delete button (trash icon)
- Confirm deletion
- Clear all completed tasks at once

---

## 🔧 Troubleshooting

### MongoDB Connection Issues

```
Error: "connect ECONNREFUSED"
Solution: Ensure MongoDB is running
Windows: mongod (from MongoDB bin folder)
Mac: brew services start mongodb-community
Linux: sudo systemctl start mongod
```

### CORS Errors

```
Solution: Ensure backend is running on port 5000
Check proxy setting in frontend/package.json
```

### Port Already in Use

```
Backend (5000): lsof -ti:5000 | xargs kill -9
Frontend (3000): lsof -ti:3000 | xargs kill -9
```

### Dependencies Not Installing

```
npm install
npm cache clean --force
npm install
```

---

## 📚 Learning Resources

### Documentation

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [React Hooks API](https://react.dev/reference/react)
- [MongoDB Documentation](https://docs.mongodb.com/)

### Video Resources

- [MERN Stack Tutorial](https://www.youtube.com/results?search_query=mern+todo+tutorial)
- [React Hooks Deep Dive](https://www.youtube.com/results?search_query=react+hooks+tutorial)
- [MongoDB + Node.js](https://www.youtube.com/results?search_query=mongodb+nodejs+tutorial)

### Books

- Full Stack React by Anthony Accomazzo
- MERN Stack Mastery
- MongoDB for JavaScript Developers

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

```bash
cd frontend
npm run build
# Upload 'build' folder to Vercel/Netlify
```

### Backend Deployment (Heroku/Railway)

```bash
cd backend
# Add Procfile
# Update MONGODB_URI to Atlas connection string
# git push to deploy
```

---

## 📝 Course Outcomes Mapped

✅ **CO1**: Fundamental concepts of full-stack development - CRUD operations with Node.js, Express, MongoDB
✅ **CO2**: Interactive and responsive front-end - React UI with Bootstrap
✅ **CO3**: RESTful APIs and database integration - Complete API with MongoDB
✅ **CO4**: Debug, test, and optimize - Error handling, validation, performance
✅ **CO5**: Full-stack application design - Complete integration of frontend, backend, database

---

## 📄 License

Educational Project - Full Stack Development Course

---

## 👨‍💻 Author

**Your Name**
**Course:** Full Stack Development - Unit 3.4
**Date:** April 2026

---

## ✨ Advanced Features (Optional Enhancements)

Consider adding:

- [ ] User Authentication (JWT)
- [ ] User Profiles
- [ ] Shared Todos
- [ ] Recurring Tasks
- [ ] Task Reminders/Notifications
- [ ] Dark Mode Toggle
- [ ] Export to PDF/CSV
- [ ] Drag & Drop Reordering
- [ ] Task Templates
- [ ] Analytics Dashboard

---

**Happy Task Management! 🎉**
