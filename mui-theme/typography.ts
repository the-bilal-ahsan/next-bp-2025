// src/theme/typography.ts
// import { TypographyOptions } from "@mui/material/styles/createTypography";

import { TypographyVariantsOptions } from "@mui/material";

const typography: TypographyVariantsOptions = {
  fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  h1: { fontSize: "3rem", fontWeight: 700 },
  h2: { fontSize: "2.25rem", fontWeight: 700 },
  h3: { fontSize: "1.75rem", fontWeight: 600 },
  h4: { fontSize: "1.5rem", fontWeight: 600 },
  h5: { fontSize: "1.25rem", fontWeight: 500 },
  h6: { fontSize: "1rem", fontWeight: 500 },
  body1: { fontSize: "1rem", lineHeight: 1.5 },
  body2: { fontSize: "0.875rem", lineHeight: 1.43 },
  button: { textTransform: "none", fontWeight: 600 },
};

export default typography;
