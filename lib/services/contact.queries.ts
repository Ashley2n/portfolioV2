import {prisma} from "../prisma";
import {contactFormType, reviewFormType} from "../schema/contact";

export const createContactSubmission = async (data: contactFormType) => {
    return await prisma.contactSubmission.create({
        data
    });

};

export const createReviewSubmission = async (data: reviewFormType) => {
    return await prisma.reviewSubmission.create({
        data
    });

};
