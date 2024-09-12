"use client";

import React, { useState } from "react";
import { create, get } from "@github/webauthn-json";
import { finishServerPasskeyRegistration, startServerPasskeyRegistration } from "../actions";

function FormRegisterPasskey() {
	const [loading, setLoading] = useState(false);
	async function handlePasskeyRegistration() {
		try {
			setLoading(true);
			const result = await startServerPasskeyRegistration();
			console.log(result);
			const attestationResponse = await create(result);
			await finishServerPasskeyRegistration(attestationResponse);
		} catch (error) {
			alert("error  occured while handling passskey registration");
		} finally {
			setLoading(false);
		}
	}
	return (
		<button disabled={loading} className='btn' onClick={handlePasskeyRegistration}>
			{loading ? "processing..." : "Register"}
		</button>
	);
}

export default FormRegisterPasskey;
