import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

const API_URL = "http://localhost:5000/api/users";

const [users, setUsers] = useState([]);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [editId, setEditId] = useState(null);

// Fetch users from backend
const fetchUsers = async () => {
try {
const response = await axios.get(API_URL);
setUsers(response.data);
} catch (error) {
console.error("Error fetching users:", error);
}
};

useEffect(() => {
fetchUsers();
}, []);

// Add or Update user
const handleSubmit = async (e) => {
e.preventDefault();


try {

  if (editId) {
    // Update existing user
    await axios.put(`${API_URL}/${editId}`, {
      name: name,
      email: email
    });
    setEditId(null);
  } else {
    // Add new user
    await axios.post(API_URL, {
      name: name,
      email: email
    });
  }

  setName("");
  setEmail("");

  fetchUsers();

} catch (error) {
  console.error("Error saving user:", error);
}

};

// Delete user
const handleDelete = async (id) => {
try {
await axios.delete(`${API_URL}/${id}`);
fetchUsers();
} catch (error) {
console.error("Error deleting user:", error);
}
};

// Edit user
const handleEdit = (user) => {
setName(user.name);
setEmail(user.email);
setEditId(user.id);
};

return (
<div style={{ padding: "40px", fontFamily: "Arial" }}>
  <h2>User Management System</h2>

  <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>

    <input
      type="text"
      placeholder="Enter Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
      style={{ marginRight: "10px" }}
    />

    <input
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      style={{ marginRight: "10px" }}
    />

    <button type="submit">
      {editId ? "Update User" : "Add User"}
    </button>

  </form>

  <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>

    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>

      {users.map((user) => (
        <tr key={user.id}>

          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>

          <td>

            <button
              onClick={() => handleEdit(user)}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>

          </td>

        </tr>
      ))}

    </tbody>

  </table>

</div>
);
}

export default App;
