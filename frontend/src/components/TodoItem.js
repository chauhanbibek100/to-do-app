import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import "../styles/TodoItem.css";

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleToggle = async () => {
    try {
      await onToggle(todo._id, !todo.completed);
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await onDelete(todo._id);
        toast.success("Task deleted successfully");
      } catch (error) {
        toast.error("Failed to delete task");
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!editedTitle.trim()) {
      toast.error("Task title cannot be empty");
      return;
    }

    try {
      await onUpdate(todo._id, {
        title: editedTitle.trim(),
        description: editedDescription.trim(),
      });
      setIsEditing(false);
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return "🔴";
      case "medium":
        return "🟡";
      case "low":
        return "🟢";
      default:
        return "⚪";
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      work: "💼",
      personal: "👤",
      shopping: "🛒",
      health: "🏥",
      other: "📌",
    };
    return icons[category] || "📌";
  };

  const isOverdue =
    todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div
      className={`todo-item ${todo.completed ? "completed" : ""} ${isOverdue ? "overdue" : ""}`}
    >
      <div className="todo-item-content">
        <div className="todo-checkbox-wrapper">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="todo-checkbox"
          />
        </div>

        {isEditing ? (
          <div className="todo-edit-form" style={{ flex: 1 }}>
            <input
              type="text"
              className="form-control mb-2"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              className="form-control form-control-sm mb-2"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows="2"
            ></textarea>
            <div className="edit-actions">
              <button
                className="btn btn-sm btn-success"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  setIsEditing(false);
                  setEditedTitle(todo.title);
                  setEditedDescription(todo.description);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="todo-main-content" style={{ flex: 1 }}>
            <div className="todo-title">
              <span className="priority-icon">
                {getPriorityIcon(todo.priority)}
              </span>
              <span className="category-icon">
                {getCategoryIcon(todo.category)}
              </span>
              <span
                className={`title-text ${todo.completed ? "strikethrough" : ""}`}
              >
                {todo.title}
              </span>
              {isOverdue && (
                <span className="badge bg-danger ms-2">Overdue</span>
              )}
            </div>

            {todo.description && (
              <div className="todo-description">{todo.description}</div>
            )}

            <div className="todo-meta">
              {todo.dueDate && (
                <span className="meta-item">
                  📅{" "}
                  {formatDistanceToNow(new Date(todo.dueDate), {
                    addSuffix: true,
                  })}
                </span>
              )}
              {todo.tags && todo.tags.length > 0 && (
                <div className="tags-container">
                  {todo.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <span className="meta-item text-muted">
                Created{" "}
                {formatDistanceToNow(new Date(todo.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="todo-actions">
        {!isEditing && (
          <>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => setIsEditing(true)}
              title="Edit task"
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={handleDelete}
              title="Delete task"
            >
              <i className="bi bi-trash"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
