import z from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(50),
  email: z.email("Invalid Email"),
  subject: z.string().max(100).optional(),
  message: z.string().max(1000),
});

export type contactFormType = z.infer<typeof contactSchema>;
