import z from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(50),
  email: z.email("Invalid Email"),
  subject: z.string().max(100).optional(),
  message: z.string().max(1000),
});

export type contactFormType = z.infer<typeof contactSchema>;

export const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  message: z.string().min(1, "Please write a short review").max(1000),
});

export type reviewFormType = z.infer<typeof reviewSchema>;
