/**
 * Application Configuration
 * Centralized configuration from environment variables
 */

export const config = {
  // Admin route slug - configurable via environment variable
  adminSlug: import.meta.env.VITE_ADMIN_SLUG || 'admin',
  
  // API configuration
  apiUrl: import.meta.env.VITE_API_URL || '/api/v1',
  
  // App configuration
  appName: import.meta.env.VITE_APP_NAME || 'ProCollector',
  
  // Get admin route path
  getAdminPath: (path: string = '') => {
    const base = `/${config.adminSlug}`;
    return path ? `${base}/${path}` : base;
  },
  
  // Check if current path is admin path
  isAdminPath: (path: string) => {
    return path.startsWith(`/${config.adminSlug}`);
  }
};

export default config;
