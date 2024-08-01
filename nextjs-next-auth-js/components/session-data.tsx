import type { Session } from "next-auth";

export default function SessionData({ session }: { session: Session | null }) {
    if (session?.user) {
        return (
            <div className="flex flex-col gap-4 p-4 w-full rounded-md">
                <div className="flex flex-col rounded-md bg-neutral-700">
                    <div className="text-xl p-4 font-bold rounded-t-md bg-neutral-600">
                        Current Session Data
                    </div>
                    <pre className="py-6 px-4 whitespace-pre-wrap break-all">
                        {JSON.stringify(session, null, 2)}
                    </pre>
                </div>
            </div>
        )
    }

    return (
        <p className="text-xl p-4 font-bold w-full bg-neutral-600 rounded-md">
            No session data, please <em>Sign In</em> first.
        </p>
    )
}