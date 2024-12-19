import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Aside from "./Aside";

const CreateEvent = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    category: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Task created successfully!");
      setTaskData({
        title: "",
        description: "",
        priority: "Low",
        dueDate: "",
        category: "",
        status: "Pending",
      });
    } catch (error) {
      console.error("Error:", error.response || error.message);
      toast.error(error.response?.data?.message || "Failed to create task.");
    }
  };

  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-md-3">
          <Aside />
        </div>
        <div className="col-md-9">
          <div className="py-4">
            <h4 className="text-center">Create Task</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Task Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={taskData.title}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Task Title"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description*
                </label>
                <textarea
                  name="description"
                  value={taskData.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                  placeholder="Event Description"
                  required
                ></textarea>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="dueDate" className="form-label">
                    Due Date*
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={taskData.dueDate}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="priority" className="form-label">
                    Priority*
                  </label>
                  <select
                    name="priority"
                    value={taskData.priority}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="category" className="form-label">
                    Category*
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={taskData.category}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Task Category"
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status*
                </label>
                <select
                  name="status"
                  value={taskData.status}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <button type="submit" className="btn btn-success">
                Add Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
