import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Aside from "./Aside";

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("dueDate");
  const [order, setOrder] = useState("asc");
  const [filters, setFilters] = useState({ title: "" });

  useEffect(() => {
    fetchTasks();
  }, [page, sortBy, order, filters]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: { page, limit, sortBy, order, ...filters },
      });

      setTasks(response.data.tasks || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load tasks.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task.");
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid ">
      <div className="row">
        <Aside />
        <div className="col-md-9 ms-auto">
          <div className="py-4">
            <header className="mb-4">
              <h4 className="text-center">View Tasks</h4>
            </header>

            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <input
                    type="text"
                    name="title"
                    placeholder="Search by Title"
                    value={filters.title}
                    onChange={handleFilterChange}
                    className="form-control w-50 me-3"
                  />
                  <div className="d-flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="form-select"
                    >
                      <option value="title">Title</option>
                      <option value="dueDate">Due Date</option>
                    </select>
                    <select
                      value={order}
                      onChange={(e) => setOrder(e.target.value)}
                      className="form-select"
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </div>
                </div>

                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Due Date</th>
                      <th>Priority</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table table-striped text-center">
                    {tasks.length > 0 ? (
                      tasks.map((task) => (
                        <tr key={task._id}>
                          <td>{task.title}</td>
                          <td>{task.description}</td>
                          <td>{task.status}</td>
                          <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                          <td>{task.priority}</td>
                          <td>
                            {new Date(task.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                to={`/task/edit/${task._id}`}
                                className="btn btn-sm btn-success  rounded rounded-4"
                              >
                                <i className="fa fa-pencil me-1"></i> Edit
                              </Link>
                              <button
                                onClick={() => deleteTask(task._id)}
                                className="btn btn-sm btn-danger rounded rounded-4 "
                              >
                                <i className="fa fa-trash me-1"></i> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No tasks found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <nav>
                  <ul className="pagination justify-content-center">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          page === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTasks;
