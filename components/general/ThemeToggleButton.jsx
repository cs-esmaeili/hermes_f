'use client';

import { useEffect, useState } from 'react';
import Icon from "../general/Icon";
import { VscColorMode } from "react-icons/vsc";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState(() => {
    // Get the initial theme from localStorage or system preferences
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
      }
    }
    return 'userSystem'; // Default to system theme
  });

  useEffect(() => {
    if (theme === 'userSystem') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        document.documentElement.classList.toggle('dark', mediaQuery.matches);
      };
      handleChange();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme =
      theme === 'light' ? 'dark' : theme === 'dark' ? 'userSystem' : 'light';
    setTheme(newTheme);
    if (newTheme === 'userSystem') {
      localStorage.removeItem('theme');
    }
  };

  return (
    <div className="cursor-pointer select-none" onClick={toggleTheme}>
      {theme === 'light' && <Icon name={"moon"} className="w-8 h-8" />}
      {theme === 'dark' && <VscColorMode className="w-7 h-7" />}
      {theme === 'userSystem' && <Icon name={"sun"} className="w-8 h-8" />}
    </div>
  );
}
