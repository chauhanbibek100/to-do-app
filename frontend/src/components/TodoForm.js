import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import "../styles/TodoForm.css";

function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("personal");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    try {
      const newTodo = {
        title: title.trim(),
        description: description.trim(),
        priority,
        category,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        tags: tags
          .split(",")
          .filter((tag) => tag.trim())
          .map((tag) => tag.trim()),
      };

      await onAddTodo(newTodo);

      // Reset form
      setTitle("");
      setDescription("");
      setPriority("medium");
      setCategory("personal");
      setDueDate("");
      setTags("");
      setIsExpanded(false);
      toast.success("Task added successfully! ✓");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add task");
    }
  };

  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit} ref={formRef} className="todo-form">
        <div className="form-header">
          <input
            type="text"
            className="form-control todo-title-input"
            placeholder="✨ Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
          />
          <button
            type="submit"
            className="btn btn-primary btn-add"
            title="Add task"
          >
            <i className="bi bi-plus-circle"></i> Add
          </button>
        </div>

        {isExpanded && (
          <div className="form-body animate-in">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  placeholder="Add details about your task..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="2"
                ></textarea>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="work">💼 Work</option>
                  <option value="personal">👤 Personal</option>
                  <option value="shopping">🛒 Shopping</option>
                  <option value="health">🏥 Health</option>
                  <option value="other">📌 Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label className="form-label">Tags</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter tags separated by commas (e.g. urgent, important)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Create Task
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setIsExpanded(false);
                  setTitle("");
                  setDescription("");
                  setTags("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default TodoForm;
