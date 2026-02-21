/**
 * Centralized Design Tokens
 *
 * COLOR RULES:
 * - Black: #0A0A0A (default background)
 * - Dark tones: #111111, #141414, #1A1A1A (section rhythm)
 * - White: #FFFFFF (primary text)
 * - Brand Accent (Dusty Rose): #C4898A (used sparingly)
 *
 * Opacity variations are allowed (e.g. rgba/hex alpha).
 */

export const theme = {
  colors: {
    // Primary colors
    black: '#0A0A0A',
    white: '#FFFFFF',
    accent: '#C4898A',

    // Dark tones for section rhythm
    'dark-1': '#111111',
    'dark-2': '#141414',
    'dark-3': '#1A1A1A',

    // Semantic color mappings
    bg: '#0A0A0A',
    text: '#FFFFFF',

    // Opacity variations (for overlays, borders, etc.)
    blackOverlay: {
      light: 'rgba(10, 10, 10, 0.55)',
      medium: 'rgba(10, 10, 10, 0.70)',
      heavy: 'rgba(10, 10, 10, 0.85)',
    },
    whiteOverlay: {
      light: 'rgba(255, 255, 255, 0.10)',
      medium: 'rgba(255, 255, 255, 0.20)',
      heavy: 'rgba(255, 255, 255, 0.30)',
    },
    accentOverlay: {
      light: 'rgba(196, 137, 138, 0.10)',
      medium: 'rgba(196, 137, 138, 0.20)',
      heavy: 'rgba(196, 137, 138, 0.30)',
    },

    // Border colors
    border: 'rgba(255, 255, 255, 0.10)',
    borderAccent: 'rgba(196, 137, 138, 0.20)',
  },

  typography: {
    fontFamily: {
      serif: 'var(--font-serif)',
      sans: 'var(--font-sans)',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
    },
  },

  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
    '4xl': '8rem',
  },
} as const;

// Export individual color values for easy access
export const colors = theme.colors;
export const typography = theme.typography;
export const spacing = theme.spacing;
