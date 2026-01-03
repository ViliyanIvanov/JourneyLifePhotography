/**
 * Centralized Design Tokens
 * 
 * STRICT COLOR RULES:
 * - Black: #0A0A0A (default background for ALL sections)
 * - White: #FFFFFF (primary text)
 * - Brand Accent (Emerald): #0F3D2E (used sparingly)
 * 
 * Opacity variations are allowed (e.g. rgba/hex alpha of black/white/emerald).
 * No other colors (no gray, beige, warm tones, etc.)
 */

export const theme = {
  colors: {
    // Primary colors
    black: '#0A0A0A',
    white: '#FFFFFF',
    emerald: '#0F3D2E',
    
    // Semantic color mappings
    bg: '#0A0A0A',
    text: '#FFFFFF',
    accent: '#0F3D2E',
    
    // Opacity variations (for overlays, borders, etc.)
    blackOverlay: {
      light: 'rgba(10, 10, 10, 0.55)', // ~55% opacity
      medium: 'rgba(10, 10, 10, 0.70)', // ~70% opacity
      heavy: 'rgba(10, 10, 10, 0.85)', // ~85% opacity
    },
    whiteOverlay: {
      light: 'rgba(255, 255, 255, 0.10)',
      medium: 'rgba(255, 255, 255, 0.20)',
      heavy: 'rgba(255, 255, 255, 0.30)',
    },
    emeraldOverlay: {
      light: 'rgba(15, 61, 46, 0.10)',
      medium: 'rgba(15, 61, 46, 0.20)',
      heavy: 'rgba(15, 61, 46, 0.30)',
    },
    
    // Border colors
    border: 'rgba(255, 255, 255, 0.10)',
    borderEmerald: 'rgba(15, 61, 46, 0.20)',
  },
  
  // Typography scale (optional but recommended)
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
  
  // Spacing scale (optional but recommended)
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

