import { useState } from 'react';

export default function CapturePaymentButton({ appointmentId }) {
  const [tip, setTip] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleCapture = async () => {
    if (!tip || isNaN(tip)) {
      setMessage('Please enter a valid tip amount.');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/update-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentId,
          tipAmount: parseFloat(tip),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('✅ Payment successfully captured with tip!');
        setTip('');
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <input
        type="number"
        placeholder="Enter tip amount ($)"
        value={tip}
        onChange={(e) => setTip(e.target.value)}
        disabled={loading}
        style={{ marginRight: '0.5rem', padding: '0.3rem' }}
      />
      <button onClick={handleCapture} disabled={loading} style={{ padding: '0.4rem 0.8rem' }}>
        {loading ? 'Processing...' : 'Capture & Tip'}
      </button>
      {message && <div style={{ marginTop: '0.5rem' }}>{message}</div>}
    </div>
  );
}
