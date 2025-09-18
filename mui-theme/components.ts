// src/theme/components.ts
import { Components, Theme } from "@mui/material/styles";

const components: Components<Omit<Theme, "components">> = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "0.75rem",
        padding: "0.5rem 1.25rem",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
      },
    },
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: "1rem",
      },
    },
  },
};

export default components;
