// src/app/page.tsx
"use client";
 
import { Typography, Button, Stack } from "@mui/material";
import ThemeToggle from "@/components/ThemeToggle";
import FullForm from "@/components/FullForm";
import Link from "next/link"

export default function HomePage() {
  return (
    <Stack spacing={3} alignItems="center" justifyContent="center" minHeight="100vh">
      <Link href="ai"> ai</Link><br />
      <Link href="full-custom-form"> full-custom-form</Link>
      <Typography variant="h4">Hello with MUI Theme Toggle 🚀</Typography>
      <ThemeToggle />
      <Button variant="contained">Click Me</Button>
      <FullForm />
    </Stack>
  );
}
