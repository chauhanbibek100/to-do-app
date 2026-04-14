import React from "react";
import "../styles/TodoStats.css";

function TodoStats({ stats, loading }) {
  if (loading) {
    return <div className="stats-skeleton"></div>;
  }

  return (
    <div className="stats-container">
      <div className="stat-card total">
        {/* <div className="stat-icon">📊</div> */}
        <div className="stat-content">
          <div className="stat-label">Total Tasks</div>
          <div className="stat-value">{stats?.total || 0}</div>
        </div>
      </div>

      <div className="stat-card active">
        {/* <div className="stat-icon">⏳</div> */}
        <div className="stat-content">
          <div className="stat-label">Active</div>
          <div className="stat-value">{stats?.active || 0}</div>
        </div>
      </div>

      <div className="stat-card completed">
        {/* <div className="stat-icon">✅</div> */}
        <div className="stat-content">
          <div className="stat-label">Completed</div>
          <div className="stat-value">{stats?.completed || 0}</div>
        </div>
      </div>

      <div className="stat-card overdue">
        {/* <div className="stat-icon">⚠️</div> */}
        <div className="stat-content">
          <div className="stat-label">Overdue</div>
          <div className="stat-value">{stats?.overdue || 0}</div>
        </div>
      </div>
    </div>
  );
}

export default TodoStats;
