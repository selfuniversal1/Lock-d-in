// BookingForm.jsx
import React, { useState } from 'react';

const BookingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    service: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    // Optionally reset:
    setFormData({ name: '', email: '', date: '', service: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
      <h2>Book an Appointment</h2>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input name="date" type="datetime-local" value={formData.date} onChange={handleChange} />
      <input name="service" placeholder="Service Type" value={formData.service} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookingForm;


