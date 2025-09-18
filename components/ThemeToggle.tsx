// // src/components/ThemeToggle.tsx
// "use client";

// import { IconButton } from "@mui/material";
// import { useThemeMode } from "@/context/ThemeContext"; 
// import { MdOutlineDarkMode as DarkMode,MdOutlineLightMode as LightMode} from "react-icons/md";


// const ThemeToggle = () => {
//   const { mode, toggleTheme } = useThemeMode();

//   return (
//     <IconButton onClick={toggleTheme} color="inherit">
//       {mode === "light" ? <DarkMode /> : <LightMode />}
//     </IconButton>
//   );
// };

// export default ThemeToggle;


// src/components/ThemeToggle.tsx

"use client";

import { IconButton } from "@mui/material";
import { useThemeMode } from "@/context/ThemeContext";
import { MdOutlineDarkMode as DarkMode,MdOutlineLightMode as LightMode} from "react-icons/md";


const ThemeToggle = () => {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === "light" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};

export default ThemeToggle;
