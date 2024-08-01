import { signIn, auth, providerMap } from "@/auth"

export default async function SignInPage() {
    return (
        <div className="flex flex-col gap-2">
            {Object.values(providerMap).map((provider) => (
                <form
                    key={provider.id}
                    action={async () => {
                        "use server"
                        // console.log('provider', provider)
                        await signIn(provider.id)
                    }}
                    className="bg-neutral-600 rounded-md w-fit px-4 py-2 hover:bg-neutral-400 cursor-pointer"
                >
                    <button type="submit">
                        <span>Sign in with {provider.name}</span>
                    </button>
                </form>
            ))}
        </div>
    )
}