import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );
      setStatus(response.data.message);
    } catch (error) {
      setStatus("Error sending message.");
    }
  };

  return (
    <div className="container-fluid min-vh-200 d-flex align-items-center justify-content-center">
      <div className="col-md-6">
        <a href="/admin/">Admin Panel</a>
        <h2 className="text-center mb-4">Contact Us</h2>
        <form
          onSubmit={handleSubmit}
          className="border p-4 shadow-sm rounded bg-light"
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Your Message
            </label>
            <textarea
              name="message"
              id="message"
              className="form-control"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </div>
        </form>
        {status && (
          <div className="mt-3">
            <p
              className={`text-center ${
                status === "Error sending message."
                  ? "text-danger"
                  : "text-success"
              }`}
            >
              {status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
