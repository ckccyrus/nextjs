import { signIn, signOut } from "@/auth";
import { Button } from "./ui/button";

// Sign in with a provider
// If no provider is specified, the user will be redirected to the sign in page. [domain]/api/auth/signin
export function SignIn({
    provider, ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
    return (
        <form
            action={async () => {
                "use server"
                await signIn(provider)
            }}
        >
            <Button {...props}>Sign In</Button>
        </form>
    )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
            className="w-full"
        >
            <Button variant="ghost" className="w-full p-0" {...props}>
                Sign Out
            </Button>

        </form>
    )
}