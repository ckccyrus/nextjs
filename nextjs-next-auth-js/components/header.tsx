import CustomLink from "./custom-link";
import UserInfo from "./user-info";

export default function Header() {
    return (
        <header className="sticky flex justify-center border-b">
            <div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
                <CustomLink href="/">
                    <h1 className="font-bold text-xl">Next-Auth</h1>
                </CustomLink>
                <UserInfo />
            </div>
        </header>
    )
}