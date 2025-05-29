
import { loadStripe } from '@stripe/stripe-js';
import { pad, text, button } from './styleUtils';
import { spacing, colors } from './styleConfig';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); // ✅ use env var securely

export default function StripeRecurring() {
  const handleSubscribe = async () => {
    try {
      const providerEmail = prompt('Please enter your email (for receipt & account match):');
      if (!providerEmail) return;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: providerEmail }),
      });

      if (!response.ok) throw new Error('Failed to create Stripe session');
      const { sessionId } = await response.json();

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (err) {
      console.error('Subscription error:', err);
      alert('Something went wrong while subscribing.');
    }
  };

  return (
    <div style={{ ...pad('lg'), backgroundColor: colors.background, minHeight: '100vh' }}>
      <h1 style={{ ...text('xl', 'bold'), marginBottom: spacing.md }}>
        Subscribe to Lock’d In Pro
      </h1>
      <p style={{ ...text('base', 'normal', colors.muted), marginBottom: spacing.md }}>
        Unlock premium booking tools and dashboard access. Billed monthly.
      </p>
      <button onClick={handleSubscribe} style={button('accent')}>
        Subscribe Now
      </button>
    </div>
  );
}
