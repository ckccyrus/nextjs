import { redirect } from "next/navigation";
import { getSession, login, logout } from "@/lib";

export default async function Page() {
  const _session = await getSession();
  return (
    <section>

      <form
        action={async (formData) => {
          "use server";
          await login(formData);
          redirect("/");
        }}
      >
        <input type="email" placeholder="Email" />
        <br />
        <button type="submit">Login</button>
      </form>

      <form
        action={async () => {
          "use server";
          await logout();
          redirect("/");
        }}
      >
        <button type="submit">Logout</button>
      </form>

      <pre>{JSON.stringify(_session, null, 2)}</pre>

    </section>
  );
}
