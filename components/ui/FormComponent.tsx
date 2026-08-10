import { Mail, User } from "lucide-react";
import React from "react";
import ActionButton from "./Buttons/actionButton";
import Image from "next/image";
import ContactImage from "../../public/images/bg7.jpg";
import { submitContact } from "@/app/contact/action";

export const FormComponent = () => {
  return (
    <div className="h-fill min-h-screen w-full pt-30 px-10 pb-20 md:px-[10%] lg:flex flex-row lg:gap-10 xl:gap-0">
      <div className=" text-start mb-12 max-w-lg mx-auto">
        <h2 className="text-3xl font-medium font-titan mx-auto mb-4">
          Contact Me
        </h2>
        <p className="text-xs text-zinc-400">
          Have any question or need to reach out please do leave a message
          below.
          <br />
          Anything thing you like or didn&apos;t like about my portfolio please
          do leave a review.
        </p>
        <button className="underline text-zinc-300 text-xs py-2 cursor-pointer">
          Leave a review...
        </button>
        <Image
          src={ContactImage}
          alt="Contact page Image"
          width={600}
          height={100}
          className="w-full rounded-2xl hidden lg:block"
        />
      </div>
      <form className="max-w-lg lg:w-full mx-auto lg:mt-[5%]" >
        <label
          htmlFor="input-group-1"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Name
        </label>
        {/* Username */}
        <div className="relative ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <User className="w-4 h-4 " color="#9f9fa9" />
          </div>
          <input
            type="text"
            id="input-group-1"
            name="name"
            className="block w-full ps-9 pe-3 py-2.5 bg-zinc-900 border border-zinc-500 text-heading text-sm rounded-lg focus:ring-zinc-300 focus:border-zinc-300 shadow-xs placeholder:text-zinc-400 mb-8"
            placeholder="John Doe"
          />
        </div>

        {/* Email Input */}
        <label
          htmlFor="input-group-1"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Mail className="w-4 h-4 " color="#9f9fa9" />
          </div>
          <input
            type="text"
            name="email"
            id="input-group-1"
            className="block w-full ps-9 pe-3 py-2.5 bg-zinc-900 border border-zinc-500 text-heading text-sm rounded-lg focus:ring-zinc-300 focus:border-zinc-300 shadow-xs placeholder:text-zinc-400 mb-8"
            placeholder="john@doe.com"
          />
        </div>

        {/* Message */}
        <label htmlFor="message" className="block mb-2.5 text-sm font-medium">
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="block w-full ps-6 py-2.5 bg-zinc-900 border border-zinc-500 text-heading text-sm rounded-lg focus:ring-zinc-300 focus:border-zinc-300 shadow-xs placeholder:text-zinc-400  resize-none"
          placeholder="Write your thoughts here..."
        ></textarea>

        <ActionButton
          title="Submit"
          otherStyles="text-sm font-semibold! rounded-md! py-3! w-full mt-8"
        />
      </form>
    </div>
  );
};
