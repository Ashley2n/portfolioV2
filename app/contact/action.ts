"use server"
import {contactFormType, contactSchema, reviewFormType, reviewSchema} from "@/lib/schema/contact";
import {createContactSubmission, createReviewSubmission} from "@/lib/services/contact.queries";

export const submitContact = async (data: contactFormType) => {
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
    console.error("Something went wrong in the Server Action: " + error);

    return {
      success: false,
      message: "Something went wrong in contact server action.ts",
    };
  }
};

export const submitReview = async (data: reviewFormType) => {
  try {
    const validated = reviewSchema.safeParse(data);

    if (!validated.success) {
      return { error: validated.error.flatten };
    }


    await createReviewSubmission(validated.data);
    return {
      success: true,
      message: "Message sent successfully",
    };
  } catch (error) {
    console.error("Something went wrong in the Server Action: " + error);

    return {
      success: false,
      message: "Something went wrong in contact server action.ts",
    };
  }
};
