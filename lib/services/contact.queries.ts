import { prisma } from "../prisma";
import {contactFormType, reviewFormType} from "../schema/contact";

export const GetAllContactSubmissions = async () => {
  const result = await prisma.contactSubmission.findMany();
  console.log("DB RESULT:", result);

  return result;
};

export const createContactSubmission = async (data: contactFormType) => {
  const newContact = await prisma.contactSubmission.create({
    data
  });

  return JSON.stringify(newContact);
};

export const GetAllReviewSubmissions = async () => {
  const result = await prisma.contactSubmission.findMany();
  console.log("DB RESULT:", result);

  return result;
};

export const createReviewSubmission = async (data: reviewFormType) => {
  // const newReview = await prisma.contactSubmission.create({
  //   data
  // });

  return JSON.stringify(data);
};
