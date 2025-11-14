/**
 * Theme Management System
 * Handles theme switching and persistence
 */

document.addEventListener('DOMContentLoaded', () => {
  // Create theme toggle button if it doesn't exist
  let themeToggle = document.querySelector('.theme-toggle');
  
  if (!themeToggle) {
    themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
    themeToggle.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    
    // Add to header or another appropriate container
    const header = document.querySelector('header') || document.body;
    header.insertBefore(themeToggle, header.firstChild);
  }

  // Initialize theme
  initTheme();
  
  // Add click event listener
  themeToggle.addEventListener('click', toggleTheme);
});

// Initialize theme based on user preference or system preference
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  updateThemeIcon();
}

// Toggle between light and dark theme
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Update theme attribute
  document.documentElement.setAttribute('data-theme', newTheme);
  
  // Save preference
  localStorage.setItem('theme', newTheme);
  
  // Update toggle button
  updateThemeIcon();
}

// Update the theme toggle icon based on current theme
function updateThemeIcon() {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return;
  
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const isDark = currentTheme === 'dark';
  
  // Update button title
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
  
  // Update icon
  const icon = themeToggle.querySelector('.theme-icon');
  if (icon) {
    icon.innerHTML = isDark ? 
      // Sun icon for dark mode (switch to light)
      '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>' :
      // Moon icon for light mode (switch to dark)
      '<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>';
  }
}

// Expose to global scope for manual theme control if needed
window.theme = {
  toggle: toggleTheme,
  set: (theme) => {
    if (['light', 'dark'].includes(theme)) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateThemeIcon();
    }
  },
  get: () => document.documentElement.getAttribute('data-theme') || 'light'
};
