import React from 'react';

export default function CapturePaymentButton({ appointmentId }) {
  const handleCapturePayment = async () => {
    const tipAmount = parseFloat(prompt("Enter tip amount (e.g., 5 for $5):"));
    if (isNaN(tipAmount)) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/update-payment`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appointmentId, tipAmount }),
    });

    const result = await res.json();
    alert(result.success ? "💸 Payment captured!" : "❌ Failed to capture payment.");
  };

  return (
    <button onClick={handleCapturePayment}>
      Capture & Tip
    </button>
  );
}

