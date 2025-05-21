import { useEffect, useLocation } from 'react-router-dom';
import { generateReceipt } from '../utils/generateReceipt';

export default function SuccessPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');

  useEffect(() => {
    const storedData = sessionStorage.getItem('lastBooking');
    if (storedData) {
      const booking = JSON.parse(storedData);
      generateReceipt(booking);
      sessionStorage.removeItem('lastBooking');
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' }}>
        🎉 Appointment is Locked In{ name && `, ${name}` }!
      </h1>
      <p>Check your email for confirmation.</p>
    </div>
  );
}





