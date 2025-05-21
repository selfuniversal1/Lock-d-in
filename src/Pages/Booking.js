document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = form.elements['name'].value.trim();
    const phone = form.elements['phone'].value.trim();
    const email = form.elements['email'].value.trim();
    const dob = form.elements['dob'].value;
    const service = form.elements['service'].value.trim();
    const appointment_time = form.elements['appointment_time'].value;
    const provider_id = form.elements['provider_id'].value.trim();

    const SUPABASE_URL = 'https://jdnpnffolxqmhbinmxav.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Replace with full key

    // Validation
    if (!name || !phone || !email || !dob || !service || !appointment_time || !provider_id) {
      alert('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (new Date(appointment_time) < new Date()) {
      alert('Appointment time must be in the future.');
      return;
    }

    // Show loading
    document.getElementById('loading').style.display = 'block';

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          dob,
          service,
          appointment_time,
          provider_id,
        }),
      });

      if (response.ok) {
        // Store booking in sessionStorage for PDF generation
        sessionStorage.setItem('lastBooking', JSON.stringify({
          name,
          phone,
          email,
          dob,
          service,
          appointment_time,
          provider_id,
        }));

        // Redirect to success
        window.location.href = `/success?name=${encodeURIComponent(name)}`;
      } else {
        console.error(await response.text());
        document.getElementById('loading').style.display = 'none';
        window.location.href = '/failure';
      }
    } catch (err) {
      console.error('❌ Booking error:', err);
      document.getElementById('loading').style.display = 'none';
      window.location.href = '/failure';
    }
  });
});

