import { cookies } from "next/headers";

export default async function Home() {
	let response = await fetch(`${process.env.API_URL}/auth/profile`, {
		headers: {
			Authorization: `${cookies().get("Authorization")?.value}`,
		},
	});

	response = await response.json();

	return (
		<main>
			<pre>{JSON.stringify(response, null, 2)}</pre>
		</main>
	);
}
