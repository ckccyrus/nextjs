import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">NextAuth.js Example</h1>

        <SignIn />
        <SignOut />

        <pre className="py-6 px-4 whitespace-pre-wrap break-all">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
}
