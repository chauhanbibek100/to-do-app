import React, { useState } from "react";
import "../styles/TodoFilters.css";

function TodoFilters({ onFilterChange, currentFilters }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...currentFilters,
      [filterType]: currentFilters[filterType] === value ? "" : value,
    });
  };

  const handleSearchChange = (e) => {
    onFilterChange({
      ...currentFilters,
      search: e.target.value,
    });
  };

  const handleSortChange = (e) => {
    onFilterChange({
      ...currentFilters,
      sort: e.target.value,
    });
  };

  const handleReset = () => {
    onFilterChange({
      status: "",
      category: "",
      priority: "",
      search: "",
      sort: "",
    });
  };

  const hasActiveFilters = Object.values(currentFilters).some((v) => v);

  return (
    <div className="filters-container">
      <div className="filters-header">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search tasks..."
            value={currentFilters.search || ""}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <button
          className={`btn btn-filter ${isExpanded ? "active" : ""}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <i className="bi bi-funnel"></i> Filters
        </button>

        {hasActiveFilters && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={handleReset}
          >
            Clear All
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="filters-body animate-in">
          <div className="filter-group">
            <label className="filter-label">Status</label>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${currentFilters.status === "active" ? "active" : ""}`}
                onClick={() => handleFilterChange("status", "active")}
              >
                ⏳ Active
              </button>
              <button
                className={`filter-btn ${currentFilters.status === "completed" ? "active" : ""}`}
                onClick={() => handleFilterChange("status", "completed")}
              >
                ✅ Completed
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Priority</label>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${currentFilters.priority === "low" ? "active" : ""}`}
                onClick={() => handleFilterChange("priority", "low")}
              >
                🟢 Low
              </button>
              <button
                className={`filter-btn ${currentFilters.priority === "medium" ? "active" : ""}`}
                onClick={() => handleFilterChange("priority", "medium")}
              >
                🟡 Medium
              </button>
              <button
                className={`filter-btn ${currentFilters.priority === "high" ? "active" : ""}`}
                onClick={() => handleFilterChange("priority", "high")}
              >
                🔴 High
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Category</label>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${currentFilters.category === "work" ? "active" : ""}`}
                onClick={() => handleFilterChange("category", "work")}
              >
                💼 Work
              </button>
              <button
                className={`filter-btn ${currentFilters.category === "personal" ? "active" : ""}`}
                onClick={() => handleFilterChange("category", "personal")}
              >
                👤 Personal
              </button>
              <button
                className={`filter-btn ${currentFilters.category === "shopping" ? "active" : ""}`}
                onClick={() => handleFilterChange("category", "shopping")}
              >
                🛒 Shopping
              </button>
              <button
                className={`filter-btn ${currentFilters.category === "health" ? "active" : ""}`}
                onClick={() => handleFilterChange("category", "health")}
              >
                🏥 Health
              </button>
              <button
                className={`filter-btn ${currentFilters.category === "other" ? "active" : ""}`}
                onClick={() => handleFilterChange("category", "other")}
              >
                📌 Other
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select
              className="form-select"
              value={currentFilters.sort || ""}
              onChange={handleSortChange}
            >
              <option value="">Default</option>
              <option value="date-asc">📅 Oldest First</option>
              <option value="date-desc">📅 Newest First</option>
              <option value="priority">🔴 Priority</option>
              <option value="duedate">⏰ Due Date</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoFilters;
