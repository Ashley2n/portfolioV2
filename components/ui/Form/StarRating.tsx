"use client";

import {Star} from "lucide-react";
import React, {useState} from "react";

type StarRatingProps = {
    value: number;
    onChange: (value: number) => void;
    max?: number;
};

export const StarRating = ({value, onChange, max = 5}: StarRatingProps) => {
    const [hovered, setHovered] = useState<number | null>(null);
    const displayValue = hovered ?? value;
    const stars = Array.from({length: max}, (_, i) => i + 1);

    return (
        <div
            className="flex items-center gap-1"
            role="radiogroup"
            aria-label="Rating"
            onMouseLeave={() => setHovered(null)}
        >
            {stars.map((star) => {
                const filled = star <= displayValue;

                return (
                    <button
                        key={star}
                        type="button"
                        role="radio"
                        aria-checked={star === value}
                        aria-label={`${star} star${star > 1 ? "s" : ""}`}
                        onClick={() => onChange(star)}
                        onMouseEnter={() => setHovered(star)}
                        className="cursor-pointer p-0.5 transition-colors"
                    >
                        <Star
                            className={`w-6 h-6 transition-colors ${
                                filled ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-text-faint"
                            }`}
                        />
                    </button>
                );
            })}
        </div>
    );
};
