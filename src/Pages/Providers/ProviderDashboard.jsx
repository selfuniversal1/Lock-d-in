// ✅ ProviderDashboard.jsx — With Subscription Status
import React, { useEffect, useState } from 'react';
import { colors, spacing } from '../../styleConfig';
import { pad, text, button } from '../../styleUtils';

const SUPABASE_URL = 'https://jdnpnffolxqmhbinmxav.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Use full anon key

export default function ProviderDashboard() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const providerId = sessionStorage.getItem('provider_id');
  const providerEmail = sessionStorage.getItem('provider_email');

  useEffect(() => {
    fetchBookings();
    fetchSubscriptionStatus();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/bookings?select=*`, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      });
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error('Failed to load bookings', err);
    }
  };

  const fetchSubscriptionStatus = async () => {
    if (!providerEmail) return;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/providers?email=eq.${providerEmail}`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    const data = await res.json();
    if (data.length > 0) setSubscriptionStatus(data[0].subscription_status);
  };

  const deleteBooking = async (id) => {
    const confirmed = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmed) return;

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/bookings?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Canceled' }),
      });
      setBookings(prev =>
        prev.map(b => (b.id === id ? { ...b, status: 'Canceled' } : b))
      );
    } catch (err) {
      console.error('Failed to update booking', err);
    }
  };

  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Service', 'Provider', 'Date', 'Status'];
    const rows = filtered.map(b => [
      b.name,
      b.phone,
      b.email,
      b.service,
      b.provider_id,
      new Date(b.appointment_time).toLocaleString(),
      b.status || 'Confirmed'
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lockd_in_bookings.csv';
    a.click();
  };

  const filtered = bookings
    .filter(b => providerId ? b.provider_id === providerId : true)
    .filter(b => {
      const matchSearch =
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.provider_id.toLowerCase().includes(search.toLowerCase());
      const matchDate = filterDate ? b.appointment_time.startsWith(filterDate) : true;
      return matchSearch && matchDate;
    });

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const pageCount = Math.ceil(filtered.length / perPage);

  return (
    <div style={{ ...pad('lg'), backgroundColor: colors.background, minHeight: '100vh' }}>
      <h1 style={{ ...text('xl', 'bold'), marginBottom: spacing.md }}>Provider Dashboard</h1>

      {subscriptionStatus && (
        <p style={{ ...text('sm', 'medium', colors.muted), marginBottom: spacing.sm }}>
          Subscription Status: <strong>{subscriptionStatus}</strong>
        </p>
      )}

      <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.md }}>
        <input
          type="text"
          placeholder="Search name or provider"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: spacing.sm }}
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          style={{ padding: spacing.sm }}
        />
        <button onClick={exportCSV} style={{ ...button('primary') }}>Export CSV</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: colors.overlay }}>
            <th style={thStyle}>Client</th>
            <th style={thStyle}>Service</th>
            <th style={thStyle}>Date/Time</th>
            <th style={thStyle}>Provider</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((b) => (
            <tr key={b.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
              <td style={tdStyle}>{b.name}</td>
              <td style={tdStyle}>{b.service}</td>
              <td style={tdStyle}>{new Date(b.appointment_time).toLocaleString()}</td>
              <td style={tdStyle}>{b.provider_id}</td>
              <td style={tdStyle}>{b.status || 'Confirmed'}</td>
              <td style={tdStyle}>
                {b.status !== 'Canceled' && (
                  <button
                    onClick={() => deleteBooking(b.id)}
                    style={{ ...button('danger'), padding: '4px 8px' }}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
          {paginated.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: spacing.md }}>
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {pageCount > 1 && (
        <div style={{ marginTop: spacing.md, textAlign: 'center' }}>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                ...button(p === page ? 'accent' : 'primary'),
                margin: '0 4px',
                padding: '4px 12px'
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const thStyle = {
  textAlign: 'left',
  padding: '8px',
  fontWeight: 'bold',
};

const tdStyle = {
  padding: '8px',
};


