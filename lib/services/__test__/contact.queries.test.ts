import {vi, describe, it, expect, beforeEach} from 'vitest'
import {prisma} from "../../prisma";
import {createContactSubmission, createReviewSubmission} from "@/lib/services/contact.queries";

vi.mock("../../prisma", () => ({
    prisma: {
        contactSubmission: {
            create: vi.fn()
        },
        reviewSubmission: {
            create: vi.fn()
        },
    }
}))

describe("Contact Queries", () => {
    beforeEach(() => vi.clearAllMocks())

    it("GivenValidData_WhenCreateIsCalled_ReturnsData", async () => {
        vi.mocked(prisma.contactSubmission.create).mockResolvedValue({
            id: '1',
            name: 'John Doe',
            email: "j@gmail.com",
            subject: 'John Doe',
            message: 'John Doe Message',
            isRead: false,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const contact = await createContactSubmission({
            name: "John Doe",
            subject: "John Doe",
            message: "John Doe Message",
            email: "j@gmail.com"
        })

        expect(contact.id).toBe('1')
        expect(prisma.contactSubmission.create).toHaveBeenCalledWith({
            data: expect.objectContaining({
                name: 'John Doe',
                subject: 'John Doe',
            })
        })
    })

    it("GivenValidData_WhenCreateIsCalled_DoesNotCallReview", async () => {
        vi.mocked(prisma.contactSubmission.create).mockResolvedValue({
            id: '1',
            name: 'John Doe',
            email: "j@gmail.com",
            subject: 'John Doe',
            message: 'John Doe Message',
            isRead: false,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        await createContactSubmission({
            name: "John Doe",
            subject: "John Doe",
            message: "John Doe Message",
            email: "j@gmail.com"
        })

        expect(prisma.reviewSubmission.create).not.toHaveBeenCalled()
    })

})

describe("Review Queries", () => {
    beforeEach(() => vi.clearAllMocks())

    it("GivenValidData_WhenCreateIsCalled_ReturnsData", async () => {
        vi.mocked(prisma.reviewSubmission.create).mockResolvedValue({
            id: '1',
            rating: 2,
            message: 'John Doe Message',
            createdAt: new Date(),
        })

        const contact = await createReviewSubmission({
            rating: 2,
            message: "John Doe Message",
        })

        expect(contact.id).toBe('1')
        expect(prisma.reviewSubmission.create).toHaveBeenCalledWith({
            data: expect.objectContaining({
                rating: 2,
                message: 'John Doe Message',
            })
        })
    })

    it("GivenValidData_WhenCreateIsCalled_DoesNotCallReview", async () => {
        vi.mocked(prisma.reviewSubmission.create).mockResolvedValue({
            id: '1',
            rating: 2,
            message: 'John Doe Message',
            createdAt: new Date(),
        })

        await createReviewSubmission({
            rating: 2,
            message: "John Doe Message",
        })

        expect(prisma.contactSubmission.create).not.toHaveBeenCalled()
    })

})