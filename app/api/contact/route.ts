import { contactFormType } from "@/lib/schema/contact";

export async function POST(request: Request) {
  const body = await request.json();
  const { contactDTO }: { contactDTO: contactFormType } = body;

  if (!contactDTO) {
    return new Response(
      JSON.stringify({ message: "The Contact Submission was Empty or Null" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(JSON.stringify({ contactDTO }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
