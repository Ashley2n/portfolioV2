import ContactForm from "@/components/ui/Form/ContactForm";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Full-stack developer recent graduate in Software Development — background, interests, and skills.",
};

export default function ContactPage() {
    return <ContactForm/>
}
