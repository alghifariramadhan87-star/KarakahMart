/**
 * Design System - Component Library
 * Based on Stitch Design Taste Methodology
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

export const colors = {
  // Primary Brand
  brand: {
    50: '#f0fdfb',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',  // Primary
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  // Neutrals
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  // Semantic
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#0ea5e9',
  }
};

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const typography = {
  family: {
    display: "'Geist Display', system-ui, sans-serif",
    body: "'Geist', system-ui, sans-serif",
    mono: "'Geist Mono', monospace",
  },
  scale: {
    'display-2xl': { size: '72px', lineHeight: '1.2', weight: 700 },
    'display-xl': { size: '56px', lineHeight: '1.2', weight: 700 },
    'display-lg': { size: '48px', lineHeight: '1.2', weight: 700 },
    'h1': { size: '32px', lineHeight: '1.3', weight: 700 },
    'h2': { size: '24px', lineHeight: '1.4', weight: 700 },
    'h3': { size: '20px', lineHeight: '1.4', weight: 600 },
    'body-lg': { size: '18px', lineHeight: '1.6', weight: 400 },
    'body': { size: '16px', lineHeight: '1.6', weight: 400 },
    'body-sm': { size: '14px', lineHeight: '1.5', weight: 400 },
    'caption': { size: '12px', lineHeight: '1.4', weight: 500 },
  }
};

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '40px',
  '4xl': '60px',
  '5xl': '80px',
  '6xl': '120px',
  gutter: '40px',
  section: '80px',
};

// ============================================================================
// SHADOW TOKENS
// ============================================================================

export const shadows = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 2px 8px rgba(0, 0, 0, 0.05)',
  md: '0 4px 12px rgba(20, 184, 166, 0.2)',
  lg: '0 12px 32px rgba(0, 0, 0, 0.08)',
  xl: '0 20px 48px rgba(0, 0, 0, 0.1)',
};

// ============================================================================
// RADIUS TOKENS
// ============================================================================

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

// ============================================================================
// COMPONENT VARIANTS
// ============================================================================

export const components = {
  button: {
    primary: {
      bg: colors.brand[600],
      text: '#ffffff',
      hover: colors.brand[700],
      active: colors.brand[800],
      padding: '12px 24px',
      radius: radius.lg,
      fontSize: '16px',
      fontWeight: 600,
    },
    secondary: {
      bg: 'transparent',
      border: `2px solid ${colors.brand[600]}`,
      text: colors.brand[600],
      hover: colors.brand[50],
      padding: '10px 24px',
      radius: radius.lg,
    },
    ghost: {
      bg: 'transparent',
      text: colors.brand[600],
      hover: colors.brand[50],
      padding: '12px 24px',
      radius: radius.lg,
    },
  },
  card: {
    bg: '#ffffff',
    border: `1px solid ${colors.slate[200]}`,
    radius: radius.lg,
    shadow: shadows.sm,
    padding: '24px',
  },
  input: {
    bg: '#ffffff',
    border: `1px solid ${colors.slate[200]}`,
    text: colors.slate[900],
    placeholder: colors.slate[400],
    padding: '10px 16px',
    radius: radius.lg,
    focus: `2px solid ${colors.brand[500]}`,
  },
  badge: {
    bg: colors.brand[100],
    text: colors.brand[700],
    padding: '4px 12px',
    radius: radius.full,
    fontSize: '12px',
    fontWeight: 600,
  },
};

// ============================================================================
// MOTION TOKENS
// ============================================================================

export const motion = {
  duration: {
    instant: '0ms',
    fast: '100ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  hide: '-1',
  base: '0',
  dropdown: '1000',
  sticky: '1020',
  fixed: '1030',
  backdrop: '1040',
  modal: '1060',
  popover: '1070',
  tooltip: '1080',
};
