import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {reviewFormType, reviewSchema} from "@/lib/schema/contact";
import {zodResolver} from "@hookform/resolvers/zod";
import {motion} from "framer-motion";
import ActionButton from "@/components/ui/Buttons/actionButton";
import {submitReview} from "@/app/contact/action";
import {StarRating} from "@/components/ui/Form/StarRating";
import {useToast} from "@/hooks/useToast";

export const ReviewForm = () => {

    const { loading, update} = useToast()
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},

    } = useForm<reviewFormType>({
        resolver: zodResolver(reviewSchema),
        reValidateMode: 'onBlur',
        defaultValues: {rating: 0, message: ""},
    });

    const onSubmit = async (data: reviewFormType) => {
        const id = loading("Sending Review...")
        const result = await submitReview(data);
        if (result.success) {
            reset();
            update(id, {type: "success", message: "Message sent!"});
        } else {
            update(id, {type: "error", message: "Something went wrong."});
        }
    };

    return (
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
                {/* Rating */}
                <div className="mb-4">
                    <label className="block mb-2.5 text-sm font-medium text-foreground">
                        Rating
                    </label>
                    <Controller
                        name="rating"
                        control={control}
                        render={({field}) => (
                            <StarRating value={field.value} onChange={field.onChange}/>
                        )}
                    />
                    {errors.rating && (
                        <p className="text-red-400 text-xs font-medium mt-2">
                            {errors.rating.message}
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
    );
};

