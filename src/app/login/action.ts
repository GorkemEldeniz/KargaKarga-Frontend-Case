"use server";

import { fetchClient } from "@/lib/fetch-instance";
import { action } from "@/lib/safe-action";
import { formSchema } from "@/schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const safeLoginAction = action(formSchema, async (data) => {
	const response = await fetchClient("/api/auth/login", {
		method: "POST",
		body: JSON.stringify(data),
	});

	const user = await response.json();
	console.log(user);
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
