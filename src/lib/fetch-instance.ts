import { cookies } from "next/headers";

export const fetchClient = (path: string, options?: RequestInit) => {
	const url = new URL(path, process.env.API_URL);

	return fetch(url, {
		...options,
		headers: {
			"Content-Type": "application/json",
			Authorization: cookies().get("Authorization")?.value as string,
		},
	});
};
