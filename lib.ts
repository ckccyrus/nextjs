import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Key to verify the JWT
const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

/**
 * 
 * @param payload 
 * @returns JWT token
 */
export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("10 sec from now")
        .sign(key);
}

/**
 * 
 * @param input 
 * @returns a promise of payload of input JWT
 */
export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    })
    return payload;
}


export async function login(formData: FormData) {
    console.log('cLog MVC: [func] formData :>>', formData.entries());

    // Get the user and email
    const _user = { email: formData.get("email"), name: "Tom" };

    // Create the session
    const _expires = new Date(Date.now() + 10 * 1000);
    const _session = await encrypt({ _user, _expires });

    // Save the session in a cookie
    // httpOnly => only can read on server
    cookies().set("session", _session, { expires: _expires, httpOnly: true });
}

export async function logout() {
    cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
    const _session = cookies().get("session")?.value;
    if (!_session) return null;
    // Return readable session
    return await decrypt(_session);
}

export async function updateSession(request: NextRequest) {
    const _session = cookies().get("session")?.value;
    if (!_session) return;

    // Refresh the session so it doesn't expire
    const _parsed = await decrypt(_session);

    // Extend the expiration time
    _parsed.expires = new Date(Date.now() + 10 * 1000);
    const _res = NextResponse.next();
    _res.cookies.set({
        name: "session",
        value: await encrypt(_parsed),
        httpOnly: true,
        expires: _parsed.expires
    })

    return _res;
}