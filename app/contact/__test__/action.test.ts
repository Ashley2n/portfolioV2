import { vi, describe, it, expect, beforeEach } from 'vitest'
import {contactFormType, reviewFormType} from "@/lib/schema/contact";
import {createContactSubmission, createReviewSubmission} from "@/lib/services/contact.queries";
import {submitContact, submitReview} from "../action";

// Mock a module
vi.mock("@/lib/services/contact.queries", () => ({
    createContactSubmission: vi.fn(),
    createReviewSubmission: vi.fn()
}))

vi.mock("@/lib/rate-limit", () => ({
    getClientIp: vi.fn().mockResolvedValue("127.0.0.1"),
    rateLimit: vi.fn().mockReturnValue({ success: true, remaining: 3, resetAt: Date.now() + 600_000 }),
}))

describe('Contact', () => {
    beforeEach(() => { vi.clearAllMocks()})

    it('GivenCorrectInput_WhenSubmitting_ReturnsContact', async () => {
        const result = await submitContact({
            name: "John",
            subject: "New",
            email: "h@gmail.com",
            message: "Hello World!"
        } as contactFormType)

        expect(result.success).toBe(true)
        expect(createContactSubmission).toHaveBeenCalled();

    })

    it('GivenIncorrectInput_WhenSubmitting_ReturnsError', async () => {
        const result = await submitContact({
            name: "",
            subject: "New",
            email: "h@gmail.com",
            message: "Hello World!"
        } as contactFormType)

        expect(result.success).toBe(false)
        expect(result.message).toBe("Your input is invalid")
        expect(createContactSubmission).not.toHaveBeenCalled();

    })

})

describe('Review', async () => {
    beforeEach(() => { vi.clearAllMocks()})

    it('GivenCorrectInput_WhenSubmitting_ReturnsReview', async () => {


        const result = await submitReview({
            rating: 3,
            message: "Hello World!"
        } as reviewFormType)

        expect(result.success).toBe(true)
        expect(createReviewSubmission).toHaveBeenCalled();

    })
    it('GivenInvalidInput_WhenSubmitting_ReturnsFalse', async () => {

        const result = await submitReview({
            rating: 0,
            message: "Hello World!"
        } as reviewFormType)

        expect(result.success).toBe(false)
        expect(createReviewSubmission).not.toHaveBeenCalled();

    })
})