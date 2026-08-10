import { error } from "console";
import { contactFormType } from "../lib/schema/contact";

const getData = async () => {
  const res = await fetch("http://localhost:3000/contact");
  const data: contactFormType = await res.json();

  console.log(data.name);
};

const main = async () => {
  await getData();
};

main().catch((error) => console.log("Main Func: " + error));
