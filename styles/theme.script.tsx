"use client";

export function ThemeScript() {
  const script = `
    (function() {
      try {
        var theme = localStorage.getItem('app-theme') || 'light';
        var root = document.documentElement;
        
        if (theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        
        root.setAttribute('data-amplify-theme', theme);
        root.style.colorScheme = theme;
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
