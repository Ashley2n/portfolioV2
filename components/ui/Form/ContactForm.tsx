"use client";

import {contactFormType, contactSchema} from "@/lib/schema/contact";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import ActionButton from "@/components/ui/Buttons/actionButton";
import {Mail, User} from "lucide-react";
import {motion} from "framer-motion";
import {GeneralModal} from "@/components/ui/modals/GeneralModal";
import {ReviewForm} from "@/components/ui/ReviewForm";
import {useToast} from "@/hooks/useToast";
import {submitContact} from "@/app/contact/action";
import dynamic from "next/dynamic";

const DarkVeil = dynamic(() => import("@/components/Backgrounds/DarkVeil"), {
    ssr: false,
});
export default function ContactForm() {

    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const {loading, update} = useToast()
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},

    } = useForm<contactFormType>({resolver: zodResolver(contactSchema), reValidateMode:'onBlur'});


    const onSubmit = async (data: contactFormType) => {
        const id = loading("Sending message...")
        const result = await submitContact(data);

        if (result.success) {
            reset();
            update(id, {type: "success", message: "Message sent!"});
        } else {
            update(id, {type: "error", message: "Something went wrong."});
        }
    };

    /*TODO:
    * - [ ] Modal for Resume preview and download
    * - [ ] Optomize loading
    * - [ ] Finding loading from framer motion
    * - [ ]
    *
    * npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths

    * */

    return (
        <>
            <section className="page-container h-screen pt-20  md:pt-24">
                <div className="relative isolate h-full w-full overflow-hidden rounded-md">
                    <div className="absolute inset-0 z-10">
                        <DarkVeil
                            hueShift={50}
                            noiseIntensity={0.1}
                            scanlineIntensity={0}
                            speed={0.6}
                            scanlineFrequency={0.5}
                            warpAmount={5}
                            resolutionScale={1.25}
                        />
                    </div>

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 z-40 rounded-2xl bg-gradient-to-b from-black via-black/80 to-transparent"/>

                    {/*Form and Header*/}
                    <div
                        className="absolute inset-0 bottom-0 z-50 py-10 px-5 text-center "
                    >
                        <motion.div
                            initial={{opacity: 0, y: 24}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true, amount: 0.3}}
                            transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
                        >
                            <div className="text-start mb-2 max-w-lg mx-auto ">
                                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-text-faint">
                                    Get In Touch
                                </p>
                                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                    Contact Me
                                </h2>
                                <p className="text-xs text-text-muted">
                                    Anything thing you like or didn&apos;t like about my portfolio please
                                    do leave a review.
                                    <br/>
                                    Have any question or need to reach out please do leave a message
                                    below.
                                </p>
                                <button
                                    className="underline text-text-muted text-xs py-2 cursor-pointer transition-colors hover:text-foreground"
                                    onClick={() => setReviewModalOpen(true)}
                                >

                                    Leave a review...
                                </button>

                            </div>
                        </motion.div>
                        <motion.div
                            initial={{opacity: 0, y: 24}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true, amount: 0.3}}
                            transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
                        >
                            <form
                                className="max-w-lg lg:w-full mx-auto mt-4 text-start"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                {/* Name Input */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="input-group-1"
                                        className="block mb-2.5 text-sm font-medium text-foreground"
                                    >
                                        Name
                                    </label>
                                    <div className="relative ">
                                        <div
                                            className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <User className="w-4 h-4 text-text-faint"/>
                                        </div>
                                        <input
                                            type="text"
                                            id="input-group-1"
                                            {...register("name")}
                                            className="block w-full ps-9 pe-3 py-2.5 bg-surface-chip border border-border-subtle text-foreground text-sm rounded-lg shadow-xs placeholder:text-text-faint transition-colors duration-300 focus:border-border-strong focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                                            placeholder="John Doe"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-red-400 text-xs font-medium mt-2">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email Input */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="input-group-2"
                                        className="block mb-2.5 text-sm font-medium text-foreground"
                                    >
                                        Email
                                    </label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <Mail className="w-4 h-4 text-text-faint"/>
                                        </div>
                                        <input
                                            type="text"
                                            {...register("email")}
                                            id="input-group-2"
                                            className="block w-full ps-9 pe-3 py-2.5 bg-surface-chip border border-border-subtle text-foreground text-sm rounded-lg shadow-xs placeholder:text-text-faint transition-colors duration-300 focus:border-border-strong focus:outline-none  disabled:opacity-70 disabled:cursor-not-allowed"
                                            placeholder="john@doe.com"
                                            disabled={isSubmitting}

                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-400 text-xs font-medium mt-2">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block mb-2.5 text-sm font-medium text-foreground">
                                        Your message
                                    </label>
                                    <textarea
                                        id="message"
                                        {...register("message")}
                                        rows={5}
                                        className="block w-full ps-3 pe-3 py-2.5 bg-surface-chip border border-border-subtle text-foreground text-sm rounded-lg shadow-xs placeholder:text-text-faint transition-colors duration-300 focus:border-border-strong focus:outline-none resize-none  disabled:opacity-70 disabled:cursor-not-allowed"
                                        disabled={isSubmitting}
                                        placeholder="Write your thoughts here..."
                                    ></textarea>

                                    {errors.message && (
                                        <p className="text-red-400 text-xs font-medium mt-2">
                                            {errors.message.message}
                                        </p>
                                    )}
                                </div>
                                <ActionButton
                                    title={isSubmitting ? "Sending" : "Submit"}
                                    isSubmitting={isSubmitting}
                                    otherStyles="text-sm py-3! w-full mt-8  disabled:opacity-70 disabled:cursor-not-allowed"
                                />
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            <GeneralModal isOpen={reviewModalOpen} onClose={() => setReviewModalOpen(false)}>
                <ReviewForm/>
            </GeneralModal>
        </>
    );
}
