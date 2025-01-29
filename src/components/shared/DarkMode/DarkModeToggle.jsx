import { useEffect, useState } from "react";
import { Switch } from "@material-tailwind/react";
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
    <div className="flex items-center space-x-2">
      <SunIcon className="h-5 w-5 text-yellow-400 dark:text-gray-500" />
      <Switch
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        ripple={true}
        color="blue"
      />
      <MoonIcon className="h-5 w-5 text-gray-900 dark:text-white" />
    </div>
  );
};

export default DarkModeToggle;
