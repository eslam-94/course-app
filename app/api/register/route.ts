import { RegisterData } from "@/app/lib/definitions";
import registerMail from "@/app/lib/registermail";

export async function POST(request: Request) {

  const formData: RegisterData = await request.json()

  const mail = await registerMail(formData)

  return new Response(JSON.stringify(mail))
}