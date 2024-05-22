import { auth } from "@/auth";
import SessionData from "@/components/session-data";

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">NextAuth.js Example</h1>
        <SessionData session={session}></SessionData>
      </div>
    </div>
  );
}
