'use client'

import { useEffect, useState } from 'react';
import Icon from "../general/Icon";
import { VscColorMode } from "react-icons/vsc";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState('userSystem');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else {
      setTheme('userSystem');
      applySystemTheme();
    }
  }, []);

  useEffect(() => {
    if (theme === 'userSystem') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        document.documentElement.classList.toggle('dark', mediaQuery.matches);
      };
      handleChange();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const applySystemTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
  };

  const toggleTheme = () => {
    let newTheme;
    if (theme === 'light') {
      newTheme = 'dark';
    } else if (theme === 'dark') {
      newTheme = 'userSystem';
    } else {
      newTheme = 'light';
    }

    setTheme(newTheme);
    if (newTheme === 'userSystem') {
      localStorage.removeItem('theme');
      applySystemTheme();
    } else {
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  return (
    <div
      className='cursor-pointer select-none'
      onClick={toggleTheme}
    >
      {theme === 'light' && <Icon name={"moon"} className="w-8 h-8" />}
      {theme === 'dark' && <VscColorMode className="w-7 h-7" />}
      {theme === 'userSystem' && <Icon name={"sun"} className="w-8 h-8" />}
    </div>
  );
}
