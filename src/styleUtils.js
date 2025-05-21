// src/styleUtils.js
import {
  spacing,
  fontSizes,
  fontWeight,
  colors,
  borderRadius,
  shadows,
} from './styleConfig';

// Shorthand padding
export const pad = (size = 'md') => ({ padding: spacing[size] });

// Shorthand margin
export const margin = (size = 'md') => ({ margin: spacing[size] });

// Horizontal padding only
export const padX = (size = 'md') => ({
  paddingLeft: spacing[size],
  paddingRight: spacing[size],
});

// Vertical padding only
export const padY = (size = 'md') => ({
  paddingTop: spacing[size],
  paddingBottom: spacing[size],
});

// Text styles
export const text = (size = 'base', weight = 'normal', color = colors.primary) => ({
  fontSize: fontSizes[size],
  fontWeight: fontWeight[weight],
  color,
});

// Card styles
export const card = () => ({
  backgroundColor: colors.background,
  borderRadius: borderRadius.md,
  boxShadow: shadows.subtle,
  padding: spacing.md,
});

// Button styles
export const button = (variant = 'primary') => {
  const base = {
    padding: `${spacing.sm}px ${spacing.md}px`,
    borderRadius: borderRadius.sm,
    fontWeight: fontWeight.bold,
    cursor: 'pointer',
    border: 'none',
  };

  const variants = {
    primary: {
      backgroundColor: colors.primary,
      color: '#fff',
    },
    accent: {
      backgroundColor: colors.accent,
      color: '#000',
    },
    danger: {
      backgroundColor: colors.danger,
      color: '#fff',
    },
  };

  return { ...base, ...variants[variant] };
};
