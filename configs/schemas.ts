import * as zod from "zod"

export const SignInSchema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod.string(),
})

export const SignUpSchema = zod
  .object({
    firstName: zod
      .string({ required_error: "First name is required" })
      .min(2, {
        message: "First name must be at least 2 characters",
      })
      .max(50, {
        message: "First name must be at most 50 characters",
      }),
    lastName: zod
      .string({ required_error: "Last name is required" })
      .min(2, {
        message: "Last name must be at least 2 characters",
      })
      .max(50, {
        message: "Last name must be at most 50 characters",
      }),
    email: zod.string({ required_error: "Valid email is required" }).email({ message: "Invalid email address" }),
    password: zod.string({ required_error: "Password is required" }).min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: zod.string({ required_error: "Confirm password is required" }),
    role: zod.string({ required_error: "Role is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const StudentPersonalDetailsSchema = zod
  .object({
    first_name: zod
      .string({ required_error: "First Name is required" })
      .min(3, { message: "First Name is too short" })
      .max(50, { message: "First Name is too long" }),
    last_name: zod.string(),
    email: zod.string().email({ message: "Invalid email address" }),
    phone: zod.string(),
    birth_date: zod.date(),
    gender: zod.string({ required_error: "Gender is required" }).min(1, { message: "Gender is required" }),
    house_details: zod.string(),
    area_details: zod.string(),
    pincode: zod.string({ required_error: "Pincode is required" }).length(6, { message: "Pincode must be 6 digits" }),
    location: zod.string(),
    state: zod.string(),
  })
  .refine((fieldsData) => fieldsData.phone.length === 10 && fieldsData.phone.match(/^[0-9]+$/) !== null, {
    message: "Please give a valid mobile number",
    path: ["phone"],
  })
  .refine((fieldsData) => fieldsData.pincode.length === 6 && fieldsData.pincode.match(/^[0-9]+$/) !== null, {
    message: "Pincode must be numeric",
    path: ["pincode"],
  })

export const StudentAcademicDetailsSchema = zod.object({
  degree_branch: zod.string({ required_error: "Degree Branch is required" }),
  degree_joining_year: zod.date({ required_error: "Degree Joining Year is required" }),
  degree_passing_year: zod.date({ required_error: "Degree Passing Year is required" }),
  degree_marking_system: zod.string().optional(),
  degree_percentage: zod.number().optional(),
  degree_cgpa: zod.number().optional(),
  hsc_or_diploma: zod.string().optional(),
  hsc_board_name: zod.string().optional(),
  hsc_passing_year: zod.date().optional(),
  hsc_marking_system: zod.string().optional(),
  hsc_percentage: zod.number().optional(),
  hsc_cgpa: zod.number().optional(),
  diploma_passing_year: zod.date().optional(),
  diploma_branch: zod.string().optional(),
  diploma_marking_system: zod.string().optional(),
  diploma_percentage: zod.number().optional(),
  diploma_cgpa: zod.number().optional(),
  ssc_board_name: zod.string({ required_error: "SSC Board Name is required" }),
  ssc_passing_year: zod.date({ required_error: "SSC Passing Year is required" }),
  ssc_marking_system: zod.string().optional(),
  ssc_percentage: zod.number().optional(),
  ssc_cgpa: zod.number().optional(),
})

export const AluminiDetailsSchema = zod
  .object({
    first_name: zod
      .string({ required_error: "First Name is required" })
      .min(3, { message: "First Name is too short" })
      .max(50, { message: "First Name is too long" }),
    last_name: zod.string(),
    email: zod.string().email({ message: "Invalid email address" }),
    phone: zod.string(),
    birth_date: zod.date(),
    gender: zod.string({ required_error: "Gender is required" }).min(1, { message: "Gender is required" }),
    branch: zod.string({ required_error: "Branch is required" }).min(1, { message: "Branch is required" }),
    joining_year: zod
      .string({ required_error: "Joining Year is required" })
      .min(1, { message: "Joining Year is required" }),
    passing_year: zod
      .string({ required_error: "Passing Year is required" })
      .min(1, { message: "Passing Year is required" }),
    linkedin_url: zod
      .string({ required_error: "LinkedIn profile URL is required" })
      .url({ message: "Invalid LinkedIn profile URL" }),
  })
  .refine((fieldsData) => fieldsData.phone.length === 10 && fieldsData.phone.match(/^[0-9]+$/) !== null, {
    message: "Please give a valid mobile number",
    path: ["phone"],
  })
