"use server";
// Only required because of a NextAuth limitation
import { tenant } from "@teamhanko/passkeys-next-auth-provider";
import { createUserSession, decodeToken, getSession } from "../auth";
import { PublicKeyCredentialWithAttestationJSON } from "@github/webauthn-json";

const passkeyApi = tenant({
	apiKey: process.env.HANKO_API_KEY || "",
	tenantId: process.env.HANKO_TENANT_ID || "",
});

export async function startServerPasskeyRegistration() {
	const userData = await getSession();

	const createOptions = await passkeyApi.registration.initialize({
		userId: userData.id,
		username: userData.email,
	});

	return createOptions;
}

export async function finishServerPasskeyRegistration(attestationResponse: PublicKeyCredentialWithAttestationJSON) {
	await getSession();
	const res = await passkeyApi.registration.finalize(attestationResponse);

	console.log("===reg complete");
	console.log(res.token);
}

export async function startServerPasskeyLogin() {
	const options = await passkeyApi.login.initialize();
	console.log(options);
	return options;
}

export async function finishServerPasskeyLogin(options: any) {
	const response = await passkeyApi.login.finalize(options);
	if (!response.token) {
		throw new Error("authentication failed");
	}

	console.log(response.token);
	const tokenContents = await decodeToken(response.token);
	const sessionId = await createUserSession(tokenContents.sub);

	return sessionId;

	return response;
}
