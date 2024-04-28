import { useCallback, useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState<string>("light");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const currentTheme = localStorage.getItem("current-theme");

    if (currentTheme) {
      setTheme(currentTheme);
    } else {
      localStorage.setItem("current-theme", theme);
    }

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    console.log('clicked')
    setTheme((currentTheme) => {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      localStorage.setItem("current-theme", newTheme);
      return newTheme;
    });
  }, []);

  return {
    theme,
    loading,
    toggleTheme,
  };
};
