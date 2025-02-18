import { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <IconButton
      size="sm"
      variant="text"
      className="text-yellow-800 rounded-full dark:text-white"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? <MoonIcon className="h-5 w-5" strokeWidth={2} /> : <SunIcon className="h-5 w-5" strokeWidth={2} />}
    </IconButton>
  );
};

export default DarkModeToggle;
