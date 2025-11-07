import { UserAddAction } from "@/app/actions/settings/user-add";

export async function POST(req: Request) {
  const { fullName, email } = await req.json();
  const result = await UserAddAction({ fullName, email });
  return Response.json(result);
}
