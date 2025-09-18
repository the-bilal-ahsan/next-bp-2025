// src/app/page.tsx
"use client";

import { Typography, Button, Stack } from "@mui/material";
import ThemeToggle from "@/components/ThemeToggle";
import FullForm from "@/components/FullForm";

export default function HomePage() {
  return (
    <Stack spacing={3} alignItems="center" justifyContent="center" minHeight="100vh">
      <Typography variant="h4">Hello with MUI Theme Toggle 🚀</Typography>
      <ThemeToggle />
      <Button variant="contained">Click Me</Button>
      <FullForm />
    </Stack>
  );
}
