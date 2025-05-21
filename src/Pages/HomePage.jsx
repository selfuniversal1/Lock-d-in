// ✅ HomePage.jsx
import React from 'react';
import { colors, spacing } from '../styleConfig';
import { pad, text } from '../styleUtils';

export default function HomePage() {
  return (
    <div style={{ ...pad('lg'), backgroundColor: colors.background, minHeight: '100vh', textAlign: 'center' }}>
      <h1 style={{ ...text('xxl', 'bold'), marginBottom: spacing.md }}>
        Welcome to Lock’d In
      </h1>
      <p style={{ ...text('base', 'normal', colors.muted) }}>
        Your trusted place to book professional appointments.
      </p>
    </div>
  );
}

// ✅ ProviderLogin.jsx
import React from 'react';
import { colors, spacing, fontSizes } from '../../styleConfig';
import { pad, text, button } from '../../styleUtils';

export default function ProviderLogin() {
  return (
    <div style={{ ...pad('lg'), backgroundColor: colors.background, minHeight: '100vh' }}>
      <h1 style={{ ...text('xl', 'bold'), marginBottom: spacing.md }}>
        Provider Login
      </h1>

      <form style={{ maxWidth: '400px', margin: '0 auto' }}>
        <FormField label="Email" name="email" type="email" />
        <FormField label="Password" name="password" type="password" />

        <button type="submit" style={{ ...button('primary'), width: '100%', marginTop: spacing.md }}>
          Login
        </button>
      </form>
    </div>
  );
}

function FormField({ label, name, type }) {
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

// ✅ ProviderDashboard.jsx
import React from 'react';
import { colors, spacing } from '../../styleConfig';
import { pad, text } from '../../styleUtils';

export default function ProviderDashboard() {
  return (
    <div style={{ ...pad('lg'), backgroundColor: colors.background, minHeight: '100vh' }}>
      <h1 style={{ ...text('xl', 'bold'), marginBottom: spacing.md }}>
        Provider Dashboard
      </h1>
      <p style={{ ...text('base', 'normal', colors.muted) }}>
        View and manage your upcoming appointments.
      </p>
    </div>
  );
}

