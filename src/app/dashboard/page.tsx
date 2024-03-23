import { fetchClient } from "@/lib/fetch-instance";
import Dashboard from "./dashboard";

export default async function Page() {
	const response = await fetchClient("/api/boards");
	const { data } = await response.json();

	return <Dashboard data={data} />;
}
