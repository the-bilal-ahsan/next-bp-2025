'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// TypeScript interfaces for form data
interface FormData {
  // Text inputs
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  website: string;
  password: string;
  confirmPassword: string;
  
  // Numbers
  age: number | '';
  salary: number | '';
  
  // Dates
  birthDate: string;
  startDate: string;
  
  // Selections
  country: string;
  state: string;
  gender: string;
  maritalStatus: string;
  
  // Multiple selections
  skills: string[];
  languages: string[];
  
  // Boolean
  newsletter: boolean;
  terms: boolean;
  
  // Text areas
  bio: string;
  comments: string;
  
  // File
  resume: File | null;
  profilePicture: File | null;
  
  // Color and range
  favoriteColor: string;
  experience: number;
  
  // Time
  preferredTime: string;
}

// Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .required('First name is required'),
    
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .required('Last name is required'),
    
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
    
  phone: Yup.string()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number')
    .required('Phone number is required'),
    
  website: Yup.string()
    .url('Invalid website URL')
    .nullable(),
    
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain uppercase, lowercase, number and special character')
    .required('Password is required'),
    
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
    
  age: Yup.number()
    .min(18, 'Age must be at least 18')
    .max(100, 'Age must be less than 100')
    .required('Age is required'),
    
  salary: Yup.number()
    .min(0, 'Salary cannot be negative')
    .required('Salary is required'),
    
  birthDate: Yup.date()
    .max(new Date(), 'Birth date cannot be in the future')
    .required('Birth date is required'),
    
  startDate: Yup.date()
    .min(new Date(), 'Start date must be in the future')
    .required('Start date is required'),
    
  country: Yup.string()
    .required('Country is required'),
    
  state: Yup.string()
    .required('State is required'),
    
  gender: Yup.string()
    .required('Gender is required'),
    
  maritalStatus: Yup.string()
    .required('Marital status is required'),
    
  skills: Yup.array()
    .min(1, 'Please select at least one skill')
    .required('Skills are required'),
    
  languages: Yup.array()
    .min(1, 'Please select at least one language')
    .required('Languages are required'),
    
  newsletter: Yup.boolean(),
  
  terms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('Terms acceptance is required'),
    
  bio: Yup.string()
    .min(10, 'Bio must be at least 10 characters')
    .max(500, 'Bio must be less than 500 characters')
    .required('Bio is required'),
    
  comments: Yup.string()
    .max(1000, 'Comments must be less than 1000 characters'),
    
  resume: Yup.mixed()
    .required('Resume is required')
    .test('fileSize', 'File size too large (max 5MB)', (value) => {
      if (!value) return true;
      return (value as File).size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Invalid file type (PDF only)', (value) => {
      if (!value) return true;
      return (value as File).type === 'application/pdf';
    }),
    
  profilePicture: Yup.mixed()
    .test('fileSize', 'File size too large (max 2MB)', (value) => {
      if (!value) return true;
      return (value as File).size <= 2 * 1024 * 1024;
    })
    .test('fileType', 'Invalid file type (JPG, PNG only)', (value) => {
      if (!value) return true;
      return ['image/jpeg', 'image/jpg', 'image/png'].includes((value as File).type);
    }),
    
  favoriteColor: Yup.string()
    .required('Favorite color is required'),
    
  experience: Yup.number()
    .min(0, 'Experience cannot be negative')
    .max(50, 'Experience cannot exceed 50 years')
    .required('Experience is required'),
    
  preferredTime: Yup.string()
    .required('Preferred time is required')
});

const ProfessionalForm: React.FC = () => {
  const formik = useFormik<FormData>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      website: '',
      password: '',
      confirmPassword: '',
      age: '',
      salary: '',
      birthDate: '',
      startDate: '',
      country: '',
      state: '',
      gender: '',
      maritalStatus: '',
      skills: [],
      languages: [],
      newsletter: false,
      terms: false,
      bio: '',
      comments: '',
      resume: null,
      profilePicture: null,
      favoriteColor: '#000000',
      experience: 0,
      preferredTime: ''
    },
    validationSchema,
    validate: (values) => {
      // Real-time validation for dependent fields
      const errors: any = {};
      
      // Custom validation for state based on country
      if (values.country === 'US' && !values.state) {
        errors.state = 'State is required for US residents';
      }
      
      return errors;
    },
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        setStatus(null);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('Form submitted:', values);
        setStatus({ type: 'success', message: 'Form submitted successfully!' });
      } catch (error) {
        setStatus({ type: 'error', message: 'Failed to submit form. Please try again.' });
      } finally {
        setSubmitting(false);
      }
    }
  });

  // Helper function to get error message
  const getError = (fieldName: keyof FormData) => {
    return formik.touched[fieldName] && formik.errors[fieldName] 
      ? String(formik.errors[fieldName]) 
      : '';
  };

  // Helper function to check if field has error
  const hasError = (fieldName: keyof FormData) => {
    return Boolean(formik.touched[fieldName] && formik.errors[fieldName]);
  };

  // Handle file uploads
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: 'resume' | 'profilePicture') => {
    const file = event.target.files?.[0] || null;
    formik.setFieldValue(fieldName, file);
  };

  // Handle checkbox arrays
  const handleCheckboxChange = (value: string, fieldName: 'skills' | 'languages') => {
    const currentArray = formik.values[fieldName] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    formik.setFieldValue(fieldName, newArray);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Professional Registration Form
      </h1>
      
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('firstName') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your first name"
              />
              {getError('firstName') && (
                <p className="mt-1 text-sm text-red-600">{getError('firstName')}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('lastName') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your last name"
              />
              {getError('lastName') && (
                <p className="mt-1 text-sm text-red-600">{getError('lastName')}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('email') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your email address"
              />
              {getError('email') && (
                <p className="mt-1 text-sm text-red-600">{getError('email')}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('phone') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="+1234567890"
              />
              {getError('phone') && (
                <p className="mt-1 text-sm text-red-600">{getError('phone')}</p>
              )}
            </div>

            {/* Website */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                id="website"
                name="website"
                type="url"
                value={formik.values.website}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('website') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="https://example.com"
              />
              {getError('website') && (
                <p className="mt-1 text-sm text-red-600">{getError('website')}</p>
              )}
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age *
              </label>
              <input
                id="age"
                name="age"
                type="number"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('age') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                min="18"
                max="100"
                placeholder="Enter your age"
              />
              {getError('age') && (
                <p className="mt-1 text-sm text-red-600">{getError('age')}</p>
              )}
            </div>

            {/* Birth Date */}
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                Birth Date *
              </label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('birthDate') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {getError('birthDate') && (
                <p className="mt-1 text-sm text-red-600">{getError('birthDate')}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('gender') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {getError('gender') && (
                <p className="mt-1 text-sm text-red-600">{getError('gender')}</p>
              )}
            </div>
          </div>

          {/* Marital Status - Radio buttons */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marital Status *
            </label>
            <div className="flex flex-wrap gap-4">
              {['single', 'married', 'divorced', 'widowed'].map((status) => (
                <label key={status} className="flex items-center">
                  <input
                    type="radio"
                    name="maritalStatus"
                    value={status}
                    checked={formik.values.maritalStatus === status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mr-2"
                  />
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </label>
              ))}
            </div>
            {getError('maritalStatus') && (
              <p className="mt-1 text-sm text-red-600">{getError('maritalStatus')}</p>
            )}
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Location</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>
              <select
                id="country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('country') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="IN">India</option>
                <option value="JP">Japan</option>
              </select>
              {getError('country') && (
                <p className="mt-1 text-sm text-red-600">{getError('country')}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State {formik.values.country === 'US' && '*'}
              </label>
              <input
                id="state"
                name="state"
                type="text"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('state') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your state"
                disabled={!formik.values.country}
              />
              {getError('state') && (
                <p className="mt-1 text-sm text-red-600">{getError('state')}</p>
              )}
            </div>
          </div>
        </div>

        {/* Professional Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Professional Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Salary */}
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                Expected Salary (USD) *
              </label>
              <input
                id="salary"
                name="salary"
                type="number"
                value={formik.values.salary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('salary') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                min="0"
                placeholder="Enter expected salary"
              />
              {getError('salary') && (
                <p className="mt-1 text-sm text-red-600">{getError('salary')}</p>
              )}
            </div>

            {/* Start Date */}
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Start Date *
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('startDate') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {getError('startDate') && (
                <p className="mt-1 text-sm text-red-600">{getError('startDate')}</p>
              )}
            </div>

            {/* Preferred Time */}
            <div>
              <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Interview Time *
              </label>
              <input
                id="preferredTime"
                name="preferredTime"
                type="time"
                value={formik.values.preferredTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('preferredTime') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {getError('preferredTime') && (
                <p className="mt-1 text-sm text-red-600">{getError('preferredTime')}</p>
              )}
            </div>

            {/* Favorite Color */}
            <div>
              <label htmlFor="favoriteColor" className="block text-sm font-medium text-gray-700 mb-1">
                Favorite Color *
              </label>
              <input
                id="favoriteColor"
                name="favoriteColor"
                type="color"
                value={formik.values.favoriteColor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full h-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('favoriteColor') ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {getError('favoriteColor') && (
                <p className="mt-1 text-sm text-red-600">{getError('favoriteColor')}</p>
              )}
            </div>
          </div>

          {/* Experience Range */}
          <div className="mt-4">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience: {formik.values.experience} years *
            </label>
            <input
              id="experience"
              name="experience"
              type="range"
              min="0"
              max="50"
              value={formik.values.experience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            {getError('experience') && (
              <p className="mt-1 text-sm text-red-600">{getError('experience')}</p>
            )}
          </div>

          {/* Skills - Multiple checkboxes */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills * (Select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'Go'].map((skill) => (
                <label key={skill} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formik.values.skills.includes(skill)}
                    onChange={() => handleCheckboxChange(skill, 'skills')}
                    className="mr-2"
                  />
                  {skill}
                </label>
              ))}
            </div>
            {getError('skills') && (
              <p className="mt-1 text-sm text-red-600">{getError('skills')}</p>
            )}
          </div>

          {/* Languages - Multiple select */}
          <div className="mt-4">
            <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-1">
              Languages * (Hold Ctrl/Cmd for multiple)
            </label>
            <select
              id="languages"
              name="languages"
              multiple
              value={formik.values.languages}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                formik.setFieldValue('languages', selectedOptions);
              }}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 ${
                hasError('languages') ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="chinese">Chinese</option>
              <option value="japanese">Japanese</option>
              <option value="arabic">Arabic</option>
              <option value="russian">Russian</option>
            </select>
            {getError('languages') && (
              <p className="mt-1 text-sm text-red-600">{getError('languages')}</p>
            )}
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Security</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('password') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter a strong password"
              />
              {getError('password') && (
                <p className="mt-1 text-sm text-red-600">{getError('password')}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('confirmPassword') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Confirm your password"
              />
              {getError('confirmPassword') && (
                <p className="mt-1 text-sm text-red-600">{getError('confirmPassword')}</p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Additional Information</h2>
          
          {/* Bio */}
          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Bio * (10-500 characters)
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                hasError('bio') ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Tell us about yourself..."
            />
            <div className="flex justify-between items-center mt-1">
              {getError('bio') ? (
                <p className="text-sm text-red-600">{getError('bio')}</p>
              ) : (
                <p className="text-sm text-gray-500">
                  {formik.values.bio.length}/500 characters
                </p>
              )}
            </div>
          </div>

          {/* Comments */}
          <div className="mb-4">
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Comments (Optional)
            </label>
            <textarea
              id="comments"
              name="comments"
              rows={3}
              value={formik.values.comments}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                hasError('comments') ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Any additional comments..."
            />
            <div className="flex justify-between items-center mt-1">
              {getError('comments') ? (
                <p className="text-sm text-red-600">{getError('comments')}</p>
              ) : (
                <p className="text-sm text-gray-500">
                  {formik.values.comments.length}/1000 characters
                </p>
              )}
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">File Uploads</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Resume Upload */}
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                Resume * (PDF only, max 5MB)
              </label>
              <input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'resume')}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('resume') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {formik.values.resume && (
                <p className="mt-1 text-sm text-green-600">
                  Selected: {formik.values.resume.name}
                </p>
              )}
              {getError('resume') && (
                <p className="mt-1 text-sm text-red-600">{getError('resume')}</p>
              )}
            </div>

            {/* Profile Picture Upload */}
            <div>
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture (JPG/PNG only, max 2MB)
              </label>
              <input
                id="profilePicture"
                name="profilePicture"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e, 'profilePicture')}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  hasError('profilePicture') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {formik.values.profilePicture && (
                <p className="mt-1 text-sm text-green-600">
                  Selected: {formik.values.profilePicture.name}
                </p>
              )}
              {getError('profilePicture') && (
                <p className="mt-1 text-sm text-red-600">{getError('profilePicture')}</p>
              )}
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Preferences</h2>
          
          <div className="space-y-4">
            {/* Newsletter Subscription */}
            <div className="flex items-center">
              <input
                id="newsletter"
                name="newsletter"
                type="checkbox"
                checked={formik.values.newsletter}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="newsletter" className="text-sm text-gray-700">
                Subscribe to our newsletter for updates and job opportunities
              </label>
            </div>

            {/* Terms and Conditions */}
            <div>
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={formik.values.terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5 ${
                    hasError('terms') ? 'border-red-500' : ''
                  }`}
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                    Privacy Policy
                  </a>{' '}
                  *
                </label>
              </div>
              {getError('terms') && (
                <p className="mt-1 ml-7 text-sm text-red-600">{getError('terms')}</p>
              )}
            </div>
          </div>
        </div>

        {/* Form Status Messages */}
        {formik.status && (
          <div className={`p-4 rounded-md ${
            formik.status.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <div className="flex">
              <div className={`flex-shrink-0 ${
                formik.status.type === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {formik.status.type === 'success' ? (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{formik.status.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Summary */}
        {Object.keys(formik.errors).length > 0 && formik.submitCount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  There are {Object.keys(formik.errors).length} error(s) with your submission
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>Please review and correct the highlighted fields above.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`px-8 py-3 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              formik.isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            } transition-colors duration-200`}
          >
            {formik.isSubmitting ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </div>
            ) : (
              'Submit Application'
            )}
          </button>
        </div>

        {/* Development Info */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">Development Info:</h3>
          <div className="text-xs text-yellow-700 space-y-1">
            <p><strong>Form Valid:</strong> {formik.isValid ? 'Yes' : 'No'}</p>
            <p><strong>Touched Fields:</strong> {Object.keys(formik.touched).length}</p>
            <p><strong>Error Count:</strong> {Object.keys(formik.errors).length}</p>
            <p><strong>Is Submitting:</strong> {formik.isSubmitting ? 'Yes' : 'No'}</p>
            <p><strong>Submit Count:</strong> {formik.submitCount}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfessionalForm;