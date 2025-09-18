// // src/theme/index.ts
// import { createTheme, ThemeOptions } from "@mui/material/styles";
// import palette from "./palette";
// import typography from "./typography";
// import components from "./components";

// const themeOptions: ThemeOptions = {
//   palette,
//   typography,
//   components,
//   shape: {
//     borderRadius: 12,
//   },
//   spacing: 8,
// };

// const theme = createTheme(themeOptions);

// export default theme;



// src/theme/index.ts
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { lightPalette, darkPalette } from "./palette";
import typography from "./typography";
import components from "./components";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: mode === "light" ? lightPalette : darkPalette,
    typography,
    components,
    shape: { borderRadius: 12 },
    spacing: 8,
  } as ThemeOptions);
