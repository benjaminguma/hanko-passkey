"use server";

import { jwtDecode } from "jwt-decode";

type User = {
	id: string;
	email: string;
	full_name: string;
};

const users: User[] = [
	{
		id: "1",
		email: "1@yopmail.com",
		full_name: "john bobo",
	},
];

const sessionStore: Record<string, User> = {
	jklmn: users[0],
};

const FAKE_SESSION_ID = "jklmn";

export async function getSession() {
	return sessionStore[FAKE_SESSION_ID];
}

function getUserById(id: string) {
	return users.find((u) => u.id === id);
}
export async function decodeToken(token: string) {
	const tokenContents = jwtDecode<{ sub: string }>(token);
	return tokenContents;
}

export async function createUserSession(userId: string) {
	const user = getUserById(userId);
	if (!user) {
		throw new Error("user does not exist");
	}
	const sessionID = FAKE_SESSION_ID;

	sessionStore[sessionID] = user;
	return sessionID;
}
