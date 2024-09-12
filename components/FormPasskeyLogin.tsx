"use client";

import { get } from "@github/webauthn-json";

import { redirect, useRouter } from "next/navigation";
import { finishServerPasskeyLogin, startServerPasskeyLogin } from "../actions";
import React from "react";

export default function FormPasskeyLogin() {
	const router = useRouter();
	async function signIn() {
		const credentialRequestOptions = await startServerPasskeyLogin();
		console.log(credentialRequestOptions);
		const assertion = await get(credentialRequestOptions as any);

		console.log(assertion);

		const sessionID = await finishServerPasskeyLogin(assertion);
		console.log(sessionID);
		alert("login successfull");
	}
	return (
		<button className='btn' onClick={signIn}>
			login with passkey
		</button>
	);
}
