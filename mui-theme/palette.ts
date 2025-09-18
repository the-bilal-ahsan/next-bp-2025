// // src/theme/palette.ts
// import { PaletteOptions } from "@mui/material/styles";

// const palette: PaletteOptions = {
//   mode: "light", // or "dark"
//   primary: {
//     main: "#1976d2",
//     light: "#63a4ff",
//     dark: "#004ba0",
//     contrastText: "#fff",
//   },
//   secondary: {
//     main: "#9c27b0",
//     light: "#d05ce3",
//     dark: "#6a0080",
//     contrastText: "#fff",
//   },
//   error: {
//     main: "#d32f2f",
//   },
//   background: {
//     default: "#f9fafb",
//     paper: "#ffffff",
//   },
//   text: {
//     primary: "#1e293b",
//     secondary: "#64748b",
//   },
// };

// export default palette;



// src/theme/palette.ts
import { PaletteOptions } from "@mui/material/styles";

export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: { main: "#1976d2" },
  secondary: { main: "#9c27b0" },
  background: { default: "#f9fafb", paper: "#ffffff" },
  text: { primary: "#1e293b", secondary: "#64748b" },
};

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: { main: "#90caf9" },
  secondary: { main: "#ce93d8" },
  background: { default: "#121212", paper: "#1e1e1e" },
  text: { primary: "#ffffff", secondary: "#94a3b8" },
};
