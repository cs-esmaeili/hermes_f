import '@/styles/globals.css';
import 'react-image-crop/dist/ReactCrop.css';
import translation from '@/translation/translation';

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
};

export default function RootLayout({ children }) {
  const setInitialTheme = `
    (function() {
      try {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark' || storedTheme === 'light') {
          document.documentElement.classList.toggle('dark', storedTheme === 'dark');
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.classList.toggle('dark', prefersDark);
        }
      } catch (e) {
        console.error('Error reading theme from localStorage:', e);
      }
    })();
  `;

  return (
    <html
      className="font-yekanBakh"
      lang={translation.getCurrentLanguage()}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
