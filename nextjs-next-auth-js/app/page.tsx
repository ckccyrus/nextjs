import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";

export default async function Page() {
  const session = await auth();

  console.log('session', session)

  return (
    <div>
      <SignIn />

      <pre className="py-6 px-4 whitespace-pre-wrap break-all">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
