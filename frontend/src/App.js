import React, { useState, useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import TodoForm from "./components/TodoForm";
import TodoFilters from "./components/TodoFilters";
import TodoItem from "./components/TodoItem";
import TodoStats from "./components/TodoStats";
import Login from "./components/Login";
import Register from "./components/Register";
import * as todoService from "./services/todoService";
import "./styles/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    priority: "",
    search: "",
    sort: "",
  });
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    overdue: 0,
  });

  // Check authentication on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token && userStr) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userStr));
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  // Fetch todos function wrapped in useCallback
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await todoService.getTodos({
        status: filters.status,
        category: filters.category,
        priority: filters.priority,
        search: filters.search,
        sort: filters.sort,
      });
      setTodos(data);
    } catch (error) {
      toast.error("Failed to load tasks");
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch todos when authenticated or filters change
  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [filters, isAuthenticated, fetchTodos]);

  const fetchStats = async () => {
    try {
      const data = await todoService.getStats();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAddTodo = async (newTodo) => {
    try {
      await todoService.createTodo(newTodo);
      await fetchTodos();
      await fetchStats();
    } catch (error) {
      console.error("Error adding todo:", error);
      throw error;
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      await todoService.updateTodo(id, { completed });
      await fetchTodos();
      await fetchStats();
    } catch (error) {
      console.error("Error toggling todo:", error);
      throw error;
    }
  };

  const handleUpdateTodo = async (id, updates) => {
    try {
      await todoService.updateTodo(id, updates);
      await fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      await fetchTodos();
      await fetchStats();
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  };

  const handleClearCompleted = async () => {
    if (
      window.confirm("Are you sure you want to delete all completed tasks?")
    ) {
      try {
        await todoService.deleteCompletedTodos();
        await fetchTodos();
        await fetchStats();
        toast.success("Completed tasks cleared");
      } catch (error) {
        toast.error("Failed to clear completed tasks");
      }
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleLoginSuccess = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    setAuthMode("login");
    setTodos([]);
    setStats({
      total: 0,
      active: 0,
      completed: 0,
      overdue: 0,
    });
  };

  const handleRegisterSuccess = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    setAuthMode("login");
    setTodos([]);
    setStats({
      total: 0,
      active: 0,
      completed: 0,
      overdue: 0,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    setTodos([]);
    setStats({
      total: 0,
      active: 0,
      completed: 0,
      overdue: 0,
    });
    setAuthMode("login");
    toast.success("Logged out successfully");
  };

  // Show loading screen
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  // Show authentication forms if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Toaster position="top-right" />
        {authMode === "login" ? (
          <Login
            onSwitchToRegister={() => setAuthMode("register")}
            onLoginSuccess={handleLoginSuccess}
          />
        ) : (
          <Register
            onSwitchToLogin={() => setAuthMode("login")}
            onRegisterSuccess={handleRegisterSuccess}
          />
        )}
      </>
    );
  }

  return (
    <div className="app-container">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            {/* <div className="app-logo">✓</div> */}
            <div>
              <h1>TaskMaster Pro</h1>
              {/* <p>Your Advanced Task Management System</p> */}
            </div>
          </div>
          {user && (
            <div className="header-user">
              <span className="user-name">Welcome, {user.fullName}!</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="container-fluid">
          {/* Stats Dashboard */}
          <section className="stats-section">
            <TodoStats stats={stats} loading={loading} />
          </section>

          {/* Add Task Section */}
          <section className="add-task-section">
            <TodoForm onAddTodo={handleAddTodo} />
          </section>

          {/* Filters Section */}
          <section className="filters-section">
            <TodoFilters
              onFilterChange={handleFilterChange}
              currentFilters={filters}
            />
          </section>

          {/* Tasks Section */}
          <section className="tasks-section">
            {loading ? (
              <div className="loading-container">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading your tasks...</p>
              </div>
            ) : (
              <>
                {todos.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon"></div>
                    <p>No tasks found</p>
                    <small>
                      {filters.status ||
                      filters.category ||
                      filters.priority ||
                      filters.search
                        ? "Try adjusting your filters"
                        : "Create your first task to get started!"}
                    </small>
                  </div>
                ) : (
                  <>
                    <div className="todos-list">
                      {todos.map((todo) => (
                        <TodoItem
                          key={todo._id}
                          todo={todo}
                          onToggle={handleToggleTodo}
                          onDelete={handleDeleteTodo}
                          onUpdate={handleUpdateTodo}
                        />
                      ))}
                    </div>

                    {stats.completed > 0 && (
                      <div className="clear-completed-section">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={handleClearCompleted}
                        >
                          <i className="bi bi-trash"></i> Clear All Completed
                          Tasks
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>TaskMaster Pro © 2026 | Developer, Bibek Chauhan</p>
      </footer>
    </div>
  );
}

export default App;
