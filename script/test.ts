import "dotenv/config";
import { prisma } from "../lib/prisma";

console.log(process.env.DIRECT_URL);

// async function main() {
//   const result = await prisma.contactSubmission.findMany();
//   console.log("DB RESULT:", result);
// }
const main = async () => {
//   const newUser = await prisma.contactSubmission.create({
//     data: {
//       name: "Admin",
//       email: "admin@aa.dev",
//       subject: "Test Entry",
//       message: "Testing to See Connectiong working",
//     },
//   });


  const result = await prisma.contactSubmission.findMany();
  console.log("DB RESULT:", result);
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
