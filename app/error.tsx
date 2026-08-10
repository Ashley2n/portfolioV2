'use client'

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="grid min-h-screen place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-foreground">Error</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl">Something Went Wrong</h1>
                <p className="mt-6 text-lg font-medium text-pretty text-text-muted sm:text-xl/8">Might be a network error please try again later</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button
                       onClick={() => reset()}
                       className="rounded-md bg-foreground px-3.5 py-2.5 text-sm font-semibold text-background shadow-xs hover:bg-foreground/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Try
                        again</button>
                    <Link href="/"
                       className="text-sm font-semibold text-foreground">Go back home</Link>
                    <Link href="/contact" className="text-sm font-semibold text-foreground">Report Issue <span
                        aria-hidden="true">&rarr;</span></Link>
                </div>
            </div>
        </main>
    );
}
