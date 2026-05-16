// Dynamic URL detection for different environments
const getBaseUrl = () => {
  // Check if we're in production or development
  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;

    // If on localhost, use localhost URLs
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000';
    }

    // For other environments (including IP addresses), use the current hostname
    return `${protocol}//${hostname}:5000`;
  }

  // Fallback for server-side rendering
  return 'http://localhost:5000';
};

export const BASE_URL = getBaseUrl();
export const SOCKET_URL = getBaseUrl();

export const COLORS = {
  primary: '#B5451B',
  secondary: '#8B3210',
  light: {
    primary: '#B5451B',
    background: '#FFFFFF',
    surface: '#FDF5EF',
    text: '#1A1A1A',
    muted: '#888888',
    tickerBg: '#8B3210',
    tickerText: '#FFD4B8',
  },
  dark: {
    primary: '#F5A67D',
    background: '#0F0F0F',
    surface: '#1E1E1E',
    card: '#1A1A1A',
    text: '#E8E8E8',
    headerBg: '#1A0800',
    tickerBg: '#1A0800',
    tickerText: '#FFD4B8',
  }
};