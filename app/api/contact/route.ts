import { contactFormType } from "@/lib/schema/contact";
import { GetAllContactSubmissions } from "@/lib/services/contact.queries";

export async function GET(request: Request) {
  const results = await GetAllContactSubmissions();

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

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
