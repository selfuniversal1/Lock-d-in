// BookingForm.jsx
import React, { useState } from 'react';

const BookingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    customer_id: '',
    service_provider_id: '',
    appointment_date: '',
    appointment_time: '',
    services: [],
    is_recurring: false,
    recurrence_rule: 'weekly',
    recurrence_end_date: ''
  });

  const serviceOptions = [
    'Haircut',
    'Beard Trim',
    'Shave',
    'Facial',
    'Shampoo & Style'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData((prev) => {
      const services = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="customer_id" placeholder="Customer ID" value={formData.customer_id} onChange={handleChange} required />
      <input type="text" name="service_provider_id" placeholder="Service Provider ID" value={formData.service_provider_id} onChange={handleChange} required />
      <input type="date" name="appointment_date" value={formData.appointment_date} onChange={handleChange} required />
      <input type="time" name="appointment_time" value={formData.appointment_time} onChange={handleChange} required />

      <fieldset>
        <legend>Select Services:</legend>
        {serviceOptions.map((service) => (
          <label key={service}>
            <input
              type="checkbox"
              checked={formData.services.includes(service)}
              onChange={() => handleServiceToggle(service)}
            />
            {service}
          </label>
        ))}
      </fieldset>

      <label>
        <input type="checkbox" name="is_recurring" checked={formData.is_recurring} onChange={handleChange} />
        Repeat Appointment?
      </label>

      {formData.is_recurring && (
        <>
          <select name="recurrence_rule" value={formData.recurrence_rule} onChange={handleChange}>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>

          <input
            type="date"
            name="recurrence_end_date"
            value={formData.recurrence_end_date}
            onChange={handleChange}
            required
          />
        </>
      )}

      <button type="submit">Lock it In</button>
    </form>
  );
};

export default BookingForm;
