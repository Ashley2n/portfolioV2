import {createContactSubmission} from "@/lib/services/contact.queries";
import {contactFormType} from "@/lib/schema/contact";
import {submitContact} from "@/app/contact/action";

const getData = async () => {
  const contact: contactFormType = {
    name: "1234",
    email: "t@gmail.com",
    message: "Test",
  }
  return submitContact(contact)

};

getData()
    .then(contact => console.log(contact))
    .catch((error) => console.log("Main Func: " + error));
