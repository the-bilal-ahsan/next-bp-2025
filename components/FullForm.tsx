// npm install @mui/x-date-pickers date-fns
// src/components/FullForm.tsx
"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";

// ✅ Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
  age: Yup.number().positive().integer().required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  country: Yup.string().required("Country is required"),
  terms: Yup.boolean().oneOf([true], "You must accept the terms"),
  date: Yup.date().required("Date is required"),
  bio: Yup.string().max(200, "Max 200 characters"),
});

const countries = ["Pakistan", "USA", "UK", "Germany", "Canada"];

export default function FullForm() {
  const [submittedData, setSubmittedData] = useState<any>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ maxWidth: 500, margin: "auto", padding: "2rem" }}>
        <Typography variant="h5" gutterBottom>
          Full Form Example
        </Typography>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            age: "",
            gender: "",
            country: "",
            terms: false,
            date: null,
            bio: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            setSubmittedData(values);
            resetForm();
          }}
        >
          {({ values, setFieldValue }) => (
            <Form style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {/* Name */}
              <Field
                as={TextField}
                name="name"
                label="Name"
                fullWidth
                helperText={<ErrorMessage name="name" />}
              />

              {/* Email */}
              <Field
                as={TextField}
                name="email"
                label="Email"
                type="email"
                fullWidth
                helperText={<ErrorMessage name="email" />}
              />

              {/* Password */}
              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                fullWidth
                helperText={<ErrorMessage name="password" />}
              />

              {/* Age */}
              <Field
                as={TextField}
                name="age"
                label="Age"
                type="number"
                fullWidth
                helperText={<ErrorMessage name="age" />}
              />

              {/* Gender */}
              <div>
                <InputLabel>Gender</InputLabel>
                <Field name="gender">
                  {({ field }: any) => (
                    <RadioGroup {...field} row>
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </RadioGroup>
                  )}
                </Field>
                <Typography color="error">
                  <ErrorMessage name="gender" />
                </Typography>
              </div>

              {/* Country Select */}
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Field
                  as={Select}
                  name="country"
                  value={values.country}
                  onChange={(e: any) => setFieldValue("country", e.target.value)}
                >
                  {countries.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Field>
                <Typography color="error">
                  <ErrorMessage name="country" />
                </Typography>
              </FormControl>

              {/* Date Picker */}
              <DatePicker
                label="Select Date"
                value={values.date}
                onChange={(val) => setFieldValue("date", val)}
              />
              <Typography color="error">
                <ErrorMessage name="date" />
              </Typography>

              {/* Bio */}
              <Field
                as={TextField}
                name="bio"
                label="Bio"
                multiline
                rows={3}
                fullWidth
                helperText={<ErrorMessage name="bio" />}
              />

              {/* Terms */}
              <FormControlLabel
                control={
                  <Field as={Checkbox} name="terms" checked={values.terms} color="primary" />
                }
                label="I agree to the terms & conditions"
              />
              <Typography color="error">
                <ErrorMessage name="terms" />
              </Typography>

              {/* Submit */}
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>

        {/* Submitted Data Preview */}
        {submittedData && (
          <div style={{ marginTop: "2rem" }}>
            <Typography variant="h6">Submitted Data:</Typography>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
}





// Great question 👍 — **Formik + Yup** doesn’t come with file upload out of the box, but you can easily handle it with `type="file"` input. The trick is that file inputs don’t bind directly like text fields, so you need to use `setFieldValue`.

// Here’s how you can add a **file upload field** with validation to your Next.js + TS + Formik form:

// ---

// ### ✅ File Upload with Formik + Yup

// ```tsx
// "use client";

// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// interface FormValues {
//   name: string;
//   email: string;
//   file: File | null;
// }

// const validationSchema = Yup.object({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   file: Yup.mixed()
//     .required("File is required")
//     .test("fileSize", "File too large", (value) => {
//       return value && value.size <= 2 * 1024 * 1024; // 2 MB
//     })
//     .test("fileType", "Unsupported file format", (value) => {
//       return (
//         value &&
//         ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
//       );
//     }),
// });

// export default function FileUploadForm() {
//   const formik = useFormik<FormValues>({
//     initialValues: {
//       name: "",
//       email: "",
//       file: null,
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       console.log("Form Data:", values);

//       // Example: send with FormData
//       const formData = new FormData();
//       formData.append("name", values.name);
//       formData.append("email", values.email);
//       if (values.file) {
//         formData.append("file", values.file);
//       }

//       // Call API here
//     },
//   });

//   return (
//     <form
//       onSubmit={formik.handleSubmit}
//       className="space-y-4 p-4 border rounded-lg w-full max-w-md"
//     >
//       <div>
//         <label className="block">Name</label>
//         <input
//           type="text"
//           name="name"
//           value={formik.values.name}
//           onChange={formik.handleChange}
//           className="border p-2 w-full rounded"
//         />
//         {formik.touched.name && formik.errors.name && (
//           <p className="text-red-500 text-sm">{formik.errors.name}</p>
//         )}
//       </div>

//       <div>
//         <label className="block">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           className="border p-2 w-full rounded"
//         />
//         {formik.touched.email && formik.errors.email && (
//           <p className="text-red-500 text-sm">{formik.errors.email}</p>
//         )}
//       </div>

//       <div>
//         <label className="block">Upload File</label>
//         <input
//           type="file"
//           name="file"
//           onChange={(event) => {
//             if (event.currentTarget.files) {
//               formik.setFieldValue("file", event.currentTarget.files[0]);
//             }
//           }}
//           className="border p-2 w-full rounded"
//         />
//         {formik.touched.file && formik.errors.file && (
//           <p className="text-red-500 text-sm">{formik.errors.file}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Submit
//       </button>
//     </form>
//   );
// }
// ```

// ---

// ### 📌 Features here:

// * ✅ Validates **required** file
// * ✅ Restricts size (≤ 2MB)
// * ✅ Restricts type (JPG, PNG, PDF)
// * ✅ Uses `FormData` for backend compatibility

// ---

// 👉 Do you want me to **merge this file upload field into your full Formik form** (the one with DatePicker, text fields, etc.) so you have a **complete professional example**?

