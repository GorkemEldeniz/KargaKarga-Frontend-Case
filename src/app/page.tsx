import { fetchClient } from "@/lib/fetch-instance";

export default async function Home() {
	const response = await fetchClient("/api/auth/profile");
	const user = await response.json();

	return (
		<main>
			<h1>Welcome {user.data.email}</h1>
		</main>
	);
}
