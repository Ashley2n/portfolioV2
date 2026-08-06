"use server"
import { contactSchema } from "@/lib/schema/contact";
import { createContactSubmission } from "@/lib/services/contact.queries";

export const submitContact = async (data: unknown) => {
  try {
    const validated = contactSchema.safeParse(data);

    if (!validated.success) {
      return { error: validated.error.flatten };
    }

    validated.data.subject = "New Portfolio Inquiry";

    await createContactSubmission(validated.data);
    return {
      success: true,
      message: "Message sent successfully",
    };
  } catch (error) {
    console.error("Somthing went wrong in the Server Action: " + error);

    return {
      success: false,
      message: "Something went wrong in contact server action.ts",
    };
  }
};
