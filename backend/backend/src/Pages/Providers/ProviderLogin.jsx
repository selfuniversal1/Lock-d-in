// src/Pages/Providers/ProviderLogin.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient.js';
import { colors, spacing, fontSizes } from '../../styleConfig.js';
import { pad, text, button } from '../../styleUtils.js';
import { motion } from 'framer-motion';

export default function ProviderLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate('/provider/dashboard');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        ...pad('lg'),
        backgroundColor: colors.background,
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <h1 style={{ ...text('xl', 'bold'), marginBottom: spacing.md }}>Provider Login</h1>

      <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <FormField label="Email" name="email" type="email" value={email} onChange={setEmail} />
        <FormField label="Password" name="password" type="password" value={password} onChange={setPassword} />

        {errorMsg && (
          <p style={{ color: 'red', ...text('sm', 'medium'), marginTop: spacing.sm }}>{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            ...button('primary'),
            width: '100%',
            marginTop: spacing.md,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </motion.div>
  );
}

function FormField({ label, name, type, value, onChange }) {
  return (
    <div style={{ marginBottom: spacing.md }}>
      <label htmlFor={name} style={{ display: 'block', ...text('sm', 'medium'), marginBottom: spacing.xs }}>
        {label}:
      </label>
      <input
        type={type}
        name={name}
        id={name}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: spacing.sm,
          fontSize: fontSizes.base,
          border: `1px solid ${colors.border}`,
          borderRadius: 4,
          outline: 'none',
        }}
      />
    </div>
  );
}



