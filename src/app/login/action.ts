"use server";

import { action } from "@/lib/safe-action";
import { formSchema } from "@/schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginResponseType } from "./types";

export const safeLoginAction = action(formSchema, async (data) => {
	const apiUrl = process.env.API_URL;

	const response = await fetch(`${apiUrl}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	const user = (await response.json()) satisfies LoginResponseType;

	if (response.status === 201) {
		cookies().set({
			name: "Authorization",
			value: user.data.token,
			httpOnly: true,
			path: "/",
		});

		redirect("/");
	}

	if (response.status === 401) {
		return user.messages[0];
	}

	if (user?.statusCode === 500) {
		return user.message;
	}
});
