import React, { useEffect, useState } from "react";

const UserManager = () => {
  const [state, setState] = useState({ name: "", email: "" });
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cleanUsers"));
    setData(stored || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("cleanUsers", JSON.stringify(data));
  }, [data]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.name || !state.email) return;

    if (editIndex !== null) {
      setData(data.map((item, i) => (i === editIndex ? state : item)));
      setEditIndex(null);
    } else {
      setData([...data, state]);
    }

    setState({ name: "", email: "" });
  };

  const handleEdit = (index) => {
    setState(data[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <h2>User Manager</h2>

      <div className="layout">
        {/* Form */}
        <div className="card">
          <h3>{editIndex !== null ? "Edit User" : "Add User"}</h3>

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
              placeholder="Enter name"
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              placeholder="Enter email"
            />

            <button type="submit">
              {editIndex !== null ? "Update User" : "Add User"}
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="card">
          <h3>User List</h3>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      className="btn-outline"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No users added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManager;