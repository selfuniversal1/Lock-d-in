import { useState } from 'react';

export default function CapturePaymentButton({ appointmentId }) {
  const [tipAmount, setTipAmount] = useState(0);

  const handleCapturePayment = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/update-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appointmentId, tipAmount }),
    });

    const result = await res.json();
    alert(result.success ? '💸 Payment captured!' : '❌ Failed to capture payment.');
  };

  return (
    <button onClick={handleCapturePayment}>
      Capture & Tip
    </button>
  );
}

