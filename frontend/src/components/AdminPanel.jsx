import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/contacts"
        );
        setContacts(response.data);
      } catch (error) {
        console.log("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className="container mt-5">
      <a href="/">Contact Form</a>
      <h2 className="text-center mb-4">Admin Panel</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
