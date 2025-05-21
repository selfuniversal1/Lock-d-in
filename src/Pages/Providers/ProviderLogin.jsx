import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { spacing, colors } from '../../styleConfig';
import { pad, text, button } from '../../styleUtils';

export default function ProviderLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Login failed: ' + error.message);
      return;
    }

    const user = data.user;
    const role = user.user_metadata?.role;
    const providerId = user.user_metadata?.provider_id;

    // Store in session
    sessionStorage.setItem('role', role);
    if (providerId) sessionStorage.setItem('provider_id', providerId);

    // Redirect based on role
    if (role === 'admin' || role === 'provider') {
      navigate('/provider-dashboard');
    } else {
      setError('Access denied: no role assigned.');
    }
  };

  return (
    <div style={{ ...pad('lg'), minHeight: '100vh', backgroundColor: colors.background }}>
      <h1 style={{ ...text('xl', 'bold'), marginBottom: spacing.md }}>Provider/Admin Login</h1>

      <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <FormField label="Email" type="email" value={email} onChange={setEmail} />
        <FormField label="Password" type="password" value={password} onChange={setPassword} />

        {error && <p style={{ color: colors.danger }}>{error}</p>}

        <button type="submit" style={{ ...button('primary'), width: '100%', marginTop: spacing.md }}>
          Log In
        </button>
      </form>
    </div>
  );
}

function FormField({ label, type, value, onChange }) {
  return (
    <div style={{ marginBottom: spacing.md }}>
      <label style={{ display: 'block', ...text('sm', 'medium'), marginBottom: spacing.xs }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: spacing.sm,
          fontSize: 16,
          border: `1px solid ${colors.border}`,
          borderRadius: 4,
        }}
      />
    </div>
  );
}

