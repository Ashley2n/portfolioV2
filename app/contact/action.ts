"use server"
import {contactFormType, contactSchema, reviewFormType, reviewSchema} from "@/lib/schema/contact";
import {createContactSubmission, createReviewSubmission} from "@/lib/services/contact.queries";
import {getClientIp, rateLimit} from "@/lib/rate-limit";

export const submitContact = async (data: contactFormType) => {
    try {
        // const ip = await getClientIp();
        // const {success} = rateLimit(`contact:${ip}`, {limit: 5, windowMs: 10 * 60 * 1000}); // 5 per 10 min per IP
        //
        // if (!success) {
        //     return {
        //         success: false,
        //         message: "You're sending messages too quickly. Please wait a few minutes and try again.",
        //     };
        // }

        const validated = contactSchema.safeParse(data);

        if (!validated.success) {
            return {
                success: false,
                message: "Your input is invalid",
                error: validated.error.flatten()
            };
        }

        validated.data.subject = "New Portfolio Inquiry";

        await createContactSubmission(validated.data);
        return {
            success: true,
            message: "Message sent successfully",
        };
    } catch (error) {

        return {
            success: false,
            message: "Something went wrong in contact server action.ts",
            error: error
        };
    }
};

export const submitReview = async (data: reviewFormType) => {
    try {
        const ip = await getClientIp();
        const {success} = rateLimit(`review:${ip}`, {limit: 3, windowMs: 10 * 60 * 1000}); // 3 per 10 min per IP

        if (!success) {
            return {
                success: false,
                message: "You're submitting too quickly. Please wait a few minutes and try again.",
            };
        }

        const validated = reviewSchema.safeParse(data);

        if (!validated.success) {
            return {
              success: false,
              message: "You're inputs are invalid",
              error: validated.error.flatten()
            };
        }


        await createReviewSubmission(validated.data);
        return {
            success: true,
            message: "Message sent successfully",
            error: validated.error
        };
    } catch (error) {

        return {
            success: false,
            message: "Something went wrong in contact server action.ts",
            error: error
        };
    }
};
