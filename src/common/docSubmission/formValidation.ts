import { z } from "zod";

// Zod schema for validation
export const formSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().nonempty({ message: "First Name is required" }),
    lastName: z.string().nonempty({ message: "Last Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    dob: z.string().refine(
      (date) => {
        const age = new Date().getFullYear() - new Date(date).getFullYear();
        return age >= 18;
      },
      { message: "You must be at least 18 years old" }
    ),
  }),
  residentialAddress: z.object({
    street1: z
      .string()
      .nonempty({ message: "Residential Street 1 is required" }),
    street2: z.string().optional(),
  }),
  permanentAddress: z.object({
    street1: z.string().optional(),
    street2: z.string().optional(),
  }),
  documents: z
    .array(
      z.object({
        fileName: z.string().nonempty({ message: "File Name is required" }),
        fileType: z.enum(["image", "pdf"], {
          message: "File Type must be image or pdf",
        }),
        file: z
          .any()
          .refine((file) => file !== null, { message: "File is required" }),
      })
    )
    .min(2, { message: "At least 2 documents are required" }),
});
