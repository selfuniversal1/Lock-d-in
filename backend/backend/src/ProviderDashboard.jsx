import React, { useState } from 'react';

export default function CapturePaymentButton({ appointmentId }) {
  const [tipAmount, setTipAmount] = useState('');

  const handleCapturePayment = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/update-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appointmentId,
        tipAmount: parseFloat(tipAmount) || 0, // default to 0 if empty
      }),
    });

    const result = await res.json();
    alert(result.success ? '✅ Payment captured!' : '❌ Failed to capture payment.');
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="tip-input">Tip Amount ($):</label>
      <input
        id="tip-input"
        type="number"
        min="0"
        step="0.01"
        value={tipAmount}
        onChange={(e) => setTipAmount(e.target.value)}
        style={{ marginLeft: '8px', marginRight: '12px', padding: '4px' }}
        placeholder="0.00"
      />
      <button onClick={handleCapturePayment}>Capture & Tip</button>
    </div>
  );
}


